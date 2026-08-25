import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import TopBar from "../../../TopBar/TopBar";
import Stepper from "../../../Stepper/Stepper";
import InformationStep from "./InformationStep";
import PaymentStep from "./PaymentStep";
import ReviewStep from "./ReviewStep";
import VerifyingPayment from "./VerifyingPayment";
import ConfirmationStep from "./ConfirmationStep";

import { fetchBooking, createPaymentIntent, getPaymentDetails } from "../../../../api/paymentApi";
import { DEFAULT_BOOKING, DEFAULT_USER_INFO, mapBookingResponse } from "../../../../data/bookingData";
import { estimateTotals } from "../../../../utils/pricing";
import { useAuth } from "../../../../features/auth/hooks/useAuth";
import "../../../theme.css";
import styles from "./PaymentPage.module.css";

// ── Step labels ─────────────────────────────────────────────
const STEP_LABELS = ["Information", "Payment", "Review", "Confirmation"];
const PAYMENT_STATE_KEY = "derby_payment_state"; // { bookingId, paymentId }
const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 30000;

const PAYMOB_PUBLIC_KEY = import.meta.env.VITE_PAYMOB_PUBLIC_KEY || "";

function stepsFor(currentStep) {
  return STEP_LABELS.map((label, idx) => {
    const stepNumber = idx + 1;
    const status =
      stepNumber < currentStep
        ? "done"
        : stepNumber === currentStep
        ? "active"
        : "upcoming";
    return { label, status };
  });
}

function getBookingIdFromUrl() {
  return new URLSearchParams(window.location.search).get("bookingId");
}

function savePaymentState(state) {
  sessionStorage.setItem(PAYMENT_STATE_KEY, JSON.stringify(state));
}

function loadPaymentState() {
  try {
    return JSON.parse(sessionStorage.getItem(PAYMENT_STATE_KEY) || "null");
  } catch {
    return null;
  }
}

function clearPaymentState() {
  sessionStorage.removeItem(PAYMENT_STATE_KEY);
}

function normalizeStatus(raw) {
  const s = String(raw || "").toLowerCase();
  if (["paid", "succeeded", "success", "completed"].includes(s)) return "paid";
  if (["failed", "cancelled", "canceled", "declined"].includes(s)) return "failed";
  return "pending";
}

/**
 * 4-step checkout wizard:
 *  1 Information → 2 Payment → 3 Review → 4 Confirmation
 */
export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  const bookingIdRef = useRef(
    getBookingIdFromUrl() || loadPaymentState()?.bookingId || null
  );
  const paymentIdRef = useRef(loadPaymentState()?.paymentId || null);

  const navBookingState = location.state?.booking || null;

  const buildInitialBooking = () => {
    if (navBookingState) {
      return {
        id: navBookingState.id ?? bookingIdRef.current,
        image: navBookingState.courtImage || navBookingState.image || DEFAULT_BOOKING.image,
        venueName: navBookingState.venueName || navBookingState.courtName || "Booking",
        location: navBookingState.location || "",
        sport: navBookingState.tag || navBookingState.sport || "",
        sportMeta: navBookingState.courtName || "",
        date: navBookingState.date || "",
        time: navBookingState.time || "",
        duration: navBookingState.duration || "",
        currency: navBookingState.currency || "EGP",
        pricing: {
          pitchFee: navBookingState.amount || navBookingState.pricing?.pitchFee || 0,
          serviceFee: 0,
          taxRate: 0,
        },
      };
    }
    return DEFAULT_BOOKING;
  };

  const [booking, setBooking] = useState(buildInitialBooking);
  const [bookingLoadError, setBookingLoadError] = useState(null);
  
  // Prefill user details if logged in
  const [userInfo, setUserInfo] = useState(() => ({
    fullName: user?.fullName || user?.name || "",
    email: user?.email || "",
    phone: user?.phoneNumber || user?.phone || "",
  }));

  // Update userInfo when user object becomes available
  useEffect(() => {
    if (user) {
      setUserInfo((prev) => ({
        fullName: prev.fullName || user.fullName || user.name || "",
        email: prev.email || user.email || "",
        phone: prev.phone || user.phoneNumber || user.phone || "",
      }));
    }
  }, [user]);

  // Intention/Pixel setup
  const [setupPhase, setSetupPhase] = useState("idle"); // idle | preparing | ready | error
  const [setupError, setSetupError] = useState(null);
  const [paymentSetup, setPaymentSetup] = useState(null);
  const [setupAttempt, setSetupAttempt] = useState(0);

  // Payment attempt lifecycle
  const [paymentPhase, setPaymentPhase] = useState("idle"); // idle | starting | verifying | failed
  const [failureMessage, setFailureMessage] = useState(null);

  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const pollTimerRef = useRef(null);
  const pollDeadlineRef = useRef(null);

  const displayTotals = estimateTotals(booking.pricing, null);

  // ── Load live booking details via GET /api/Booking/{id} ───────────
  useEffect(() => {
    const rawId = bookingIdRef.current;
    if (!rawId) {
      if (!navBookingState) {
        setBookingLoadError("No booking selected. Go back and choose a court to book.");
      }
      return;
    }

    let cancelled = false;
    fetchBooking(rawId)
      .then((data) => {
        if (cancelled) return;
        setBooking(mapBookingResponse(data));
      })
      .catch((err) => {
        if (cancelled) return;
        // If we have navBookingState, fallback gracefully
        if (!navBookingState) {
          const serverMsg = err?.response?.data?.error || err?.response?.data?.message || err?.message;
          setBookingLoadError(
            serverMsg || "Could not load this booking. Please go back and try again."
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, [navBookingState]);

  // ── Create Paymob intention when entering step 2 ──────────
  useEffect(() => {
    if (currentStep !== 2 || !bookingIdRef.current) return;

    let cancelled = false;
    setSetupPhase("preparing");
    setSetupError(null);
    setPaymentSetup(null);

    createPaymentIntent(bookingIdRef.current)
      .then((result) => {
        if (cancelled) return;
        if (!result.clientSecret) {
          setSetupPhase("error");
          setSetupError("Payment gateway did not return the data needed to start checkout.");
          return;
        }
        const paymentId = result.paymentId ?? result.id ?? result.clientSecret;
        paymentIdRef.current = paymentId;
        savePaymentState({ bookingId: bookingIdRef.current, paymentId });
        setPaymentSetup({ clientSecret: result.clientSecret, publicKey: PAYMOB_PUBLIC_KEY });
        setSetupPhase("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        const serverMessage = err?.response?.data?.message || err?.response?.data?.error;
        setSetupPhase("error");
        setSetupError(serverMessage || "Could not start secure checkout. Please try again.");
      });

    return () => { cancelled = true; };
  }, [currentStep, setupAttempt]);

  // ── Defensive return-from-3DS handler ──────────────────────
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "return" && paymentIdRef.current) {
      window.history.replaceState({}, "", window.location.pathname);
      setCurrentStep(2);
      startPolling();
    }
    return stopPolling;
  }, []);

  function stopPolling() {
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }

  function startPolling() {
    setPaymentPhase("verifying");
    setFailureMessage(null);
    pollDeadlineRef.current = Date.now() + POLL_TIMEOUT_MS;
    poll();
  }

  async function poll() {
    try {
      const details = await getPaymentDetails(paymentIdRef.current);
      const status = normalizeStatus(details.status);

      if (status === "paid") {
        stopPolling();
        clearPaymentState();
        setConfirmedOrder(details);
        setPaymentPhase("idle");
        setCurrentStep(4);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      if (status === "failed") {
        stopPolling();
        setPaymentPhase("failed");
        setFailureMessage("Your payment didn't go through. You can try again below.");
        return;
      }

      if (Date.now() >= pollDeadlineRef.current) {
        stopPolling();
        setPaymentPhase("failed");
        setFailureMessage(
          "We couldn't confirm your payment yet. If money left your account it will be confirmed shortly — otherwise please try again."
        );
        return;
      }

      pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
    } catch {
      if (Date.now() >= pollDeadlineRef.current) {
        stopPolling();
        setPaymentPhase("failed");
        setFailureMessage("We couldn't verify your payment status. Please try again.");
        return;
      }
      pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
    }
  }

  function goToStep(step) {
    setCurrentStep(step);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToPayment() { goToStep(2); }
  function goToReview() { goToStep(3); }

  function goToInformation() {
    setSetupPhase("idle");
    setPaymentSetup(null);
    setPaymentPhase("idle");
    setFailureMessage(null);
    goToStep(1);
  }

  function goBackToPayment() {
    setPaymentPhase("idle");
    setFailureMessage(null);
    goToStep(2);
  }

  function handleConfirmAndPay() {
    setPaymentPhase("starting");
    setFailureMessage(null);
    window.dispatchEvent(new Event("payFromOutside"));
    startPolling();
  }

  function handleRetrySetup() {
    setPaymentSetup(null);
    setPaymentPhase("idle");
    setFailureMessage(null);
    setSetupAttempt((n) => n + 1);
  }

  function handleBackToHome() {
    clearPaymentState();
    setCurrentStep(1);
    setUserInfo(DEFAULT_USER_INFO);
    setSetupPhase("idle");
    setPaymentSetup(null);
    setPaymentPhase("idle");
    setFailureMessage(null);
    setConfirmedOrder(null);
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const showVerifying = currentStep === 3 && paymentPhase === "verifying";

  if (bookingLoadError) {
    return (
      <div className={styles.page}>
        <TopBar variant="checkout" cancelLabel="Cancel" onCancel={handleBackToHome} />
        <div className={styles.stepWrap}>
          <p style={{ color: "#f5f5f2", textAlign: "center", padding: "48px 16px" }}>
            {bookingLoadError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <TopBar
        variant={currentStep === 4 ? "app" : "checkout"}
        cancelLabel="Cancel Checkout"
        onCancel={() =>
          window.confirm("Cancel this checkout?") && handleBackToHome()
        }
      />

      {currentStep < 4 && <Stepper steps={stepsFor(currentStep)} />}

      <div className={styles.stepWrap} key={currentStep}>
        {/* Step 1: Information */}
        {currentStep === 1 && (
          <InformationStep
            booking={booking}
            userInfo={userInfo}
            onChangeUserInfo={setUserInfo}
            onContinue={goToPayment}
          />
        )}

        {/* Step 2: Payment */}
        {currentStep === 2 && (
          <PaymentStep
            booking={booking}
            displayTotals={displayTotals}
            clientSecret={paymentSetup?.clientSecret}
            publicKey={paymentSetup?.publicKey}
            setupPhase={setupPhase}
            setupError={setupError}
            phase={paymentPhase}
            failureMessage={failureMessage}
            onBack={goToInformation}
            onProceedToReview={goToReview}
            onRetrySetup={handleRetrySetup}
          />
        )}

        {/* Step 3: Review */}
        {currentStep === 3 && showVerifying && <VerifyingPayment />}
        {currentStep === 3 && !showVerifying && (
          <ReviewStep
            booking={booking}
            userInfo={userInfo}
            displayTotals={displayTotals}
            isConfirming={paymentPhase === "starting"}
            onConfirm={handleConfirmAndPay}
            onBack={goBackToPayment}
          />
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 4 && (
          <ConfirmationStep
            booking={booking}
            bookingRef={
              confirmedOrder?.transactionId
                ? `DRB-${confirmedOrder.transactionId}`
                : `DRB-${booking.id || bookingIdRef.current}`
            }
            transactionId={confirmedOrder?.transactionId}
            method={confirmedOrder?.paymentMethodType || "Credit Card (Online)"}
            cardLast4={confirmedOrder?.cardLast4}
            totals={displayTotals}
            onBackToHome={handleBackToHome}
          />
        )}
      </div>
    </div>
  );
}
