import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import TopBar from "../../../TopBar/TopBar";
import Stepper from "../../../Stepper/Stepper";
import InformationStep from "./InformationStep";
import PaymentStep from "./PaymentStep";
import VerifyingPayment from "./VerifyingPayment";
import ConfirmationStep from "./ConfirmationStep";

import { fetchBooking, createPaymentIntent, getPaymentDetails } from "../../../../api/paymentApi";
import { DEFAULT_BOOKING, DEFAULT_USER_INFO, mapBookingResponse } from "../../../../data/bookingData";
import { estimateTotals } from "../../../../utils/pricing";
import "../../../theme.css";
import styles from "./PaymentPage.module.css";

const STEP_LABELS = ["Information", "Payment", "Confirmation"];
const PAYMENT_STATE_KEY = "derby_payment_state"; // { bookingId, paymentId }
const POLL_INTERVAL_MS = 1500;
const POLL_TIMEOUT_MS = 30000;

// Paymob's public key is safe to ship to the browser (it's what the Pixel
// SDK uses to identify the merchant integration, not a secret). PadelBooking's
// POST /api/Payments/intent only returns clientSecret + paymentUrl (see
// API_FLOW.md), so the public key still needs to live in the frontend env.
const PAYMOB_PUBLIC_KEY = import.meta.env.VITE_PAYMOB_PUBLIC_KEY || "";

function stepsFor(currentStep) {
  return STEP_LABELS.map((label, idx) => {
    const stepNumber = idx + 1;
    const status = stepNumber < currentStep ? "done" : stepNumber === currentStep ? "active" : "upcoming";
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

// Normalizes whatever status string PadelBooking's Payments API returns
// ("Paid", "Succeeded", "Pending", "Failed", ...) — the exact enum isn't
// spelled out in API_FLOW.md, so this matches case-insensitively on intent.
function normalizeStatus(raw) {
  const s = String(raw || "").toLowerCase();
  if (["paid", "succeeded", "success", "completed"].includes(s)) return "paid";
  if (["failed", "cancelled", "canceled", "declined"].includes(s)) return "failed";
  return "pending";
}

/**
 * Single-page checkout wizard: Information -> Payment (Paymob Pixel embedded
 * IN this page, no redirect) -> verifying -> Confirmation. All step state
 * lives here so nothing is lost moving back and forth.
 *
 * Booking data and the Paymob Intention both come straight from the
 * PadelBooking API (see API_FLOW.md, Steps 3 & 4) — there is no local
 * Node/Paymob server anymore. `bookingId` is read from the `?bookingId=`
 * query param, i.e. this page is entered right after
 * `POST /api/Booking` elsewhere in the app.
 */
export default function PaymentPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const bookingIdRef = useRef(getBookingIdFromUrl() || loadPaymentState()?.bookingId || null);
  const paymentIdRef = useRef(loadPaymentState()?.paymentId || null);

  const [booking, setBooking] = useState(DEFAULT_BOOKING);
  const [bookingLoadError, setBookingLoadError] = useState(null);
  const [userInfo, setUserInfo] = useState(DEFAULT_USER_INFO);

  // Intention/Pixel setup lifecycle for the current Payment step visit.
  const [setupPhase, setSetupPhase] = useState("idle"); // idle | preparing | ready | error
  const [setupError, setSetupError] = useState(null);
  const [paymentSetup, setPaymentSetup] = useState(null); // { clientSecret, publicKey }
  const [setupAttempt, setSetupAttempt] = useState(0); // bump to force a fresh intention fetch

  // Payment attempt lifecycle (after the user clicks Pay Now).
  const [paymentPhase, setPaymentPhase] = useState("idle"); // idle | starting | verifying | failed
  const [failureMessage, setFailureMessage] = useState(null);

  const [confirmedOrder, setConfirmedOrder] = useState(null); // server-verified payment once paid
  const pollTimerRef = useRef(null);
  const pollDeadlineRef = useRef(null);

  const displayTotals = estimateTotals(booking.pricing, null);

  // Load the real booking (venue, date/time, price) as soon as we know
  // which one we're paying for.
  useEffect(() => {
    if (!bookingIdRef.current) {
      setBookingLoadError("No booking selected. Go back and pick a booking to pay for.");
      return;
    }
    let cancelled = false;
    fetchBooking(bookingIdRef.current)
      .then((data) => {
        if (cancelled) return;
        setBooking(mapBookingResponse(data));
      })
      .catch((err) => {
        if (cancelled) return;
        setBookingLoadError(
          err?.response?.data?.error || "Could not load this booking. Please go back and try again."
        );
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // Create the Paymob intention as soon as the Payment step is entered, so
  // the embedded card fields are ready before the user even reaches for
  // "Pay Now". IMPORTANT: this effect must NOT depend on setupPhase, since
  // it sets setupPhase itself — doing so would re-run the effect's cleanup
  // (cancelling the very request it just started) the instant it flips to
  // "preparing", silently discarding the result when it later resolves.
  // setupAttempt is the only thing that forces a fresh fetch while already
  // on step 2 (e.g. a manual retry).
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
          setSetupError("PadelBooking did not return the data needed to start checkout.");
          return;
        }

        // The backend may or may not include an id to poll status with;
        // fall back to the intention/clientSecret itself if not.
        const paymentId = result.paymentId ?? result.id ?? result.clientSecret;
        paymentIdRef.current = paymentId;
        savePaymentState({ bookingId: bookingIdRef.current, paymentId });

        setPaymentSetup({ clientSecret: result.clientSecret, publicKey: PAYMOB_PUBLIC_KEY });
        setSetupPhase("ready");
      })
      .catch((err) => {
        if (cancelled) return;
        const serverMessage = err?.response?.data?.error;
        setSetupPhase("error");
        setSetupError(serverMessage || "Could not start secure checkout with Paymob. Please try again.");
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, setupAttempt]);

  // Defensive fallback: some payment methods/3-D-Secure paths can still
  // involve a full-page hand-off and back. If we ever land back with this
  // query param, resume verification instead of leaving the user stuck.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("checkout") === "return" && paymentIdRef.current) {
      window.history.replaceState({}, "", window.location.pathname);
      setCurrentStep(2);
      startPolling();
    }
    return stopPolling;
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        setCurrentStep(3);
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
          "We couldn't confirm your payment yet. If money left your account, it will be confirmed shortly — otherwise, please try again."
        );
        return;
      }

      pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
    } catch (err) {
      if (Date.now() >= pollDeadlineRef.current) {
        stopPolling();
        setPaymentPhase("failed");
        setFailureMessage("We couldn't verify your payment status. Please try again.");
        return;
      }
      pollTimerRef.current = setTimeout(poll, POLL_INTERVAL_MS);
    }
  }

  function goToPayment() {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function goToInformation() {
    // Reset the Payment step's setup so re-entering it creates a fresh
    // intention (Paymob client secrets are single-use / time-limited).
    setSetupPhase("idle");
    setPaymentSetup(null);
    setPaymentPhase("idle");
    setFailureMessage(null);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Called by PaymentStep the instant it dispatches the payment to Pixel.
  function handlePayAttemptStart() {
    setPaymentPhase("starting");
    setFailureMessage(null);
  }

  // Called by PaymentStep's Pixel afterPaymentComplete callback. We never
  // trust this alone — it only tells us an attempt finished; PadelBooking's
  // own verified status (backed by Paymob's webhook) is what actually
  // confirms the booking.
  function handlePixelComplete() {
    startPolling();
  }

  function handleRetrySetup() {
    setPaymentSetup(null);
    setPaymentPhase("idle");
    setFailureMessage(null);
    setSetupAttempt((n) => n + 1); // forces the intention-creation effect to re-run
  }

  function handleBackToDashboard() {
    if (typeof window !== "undefined" && typeof window.derbyNavigateToDashboard === "function") {
      window.derbyNavigateToDashboard();
      return;
    }
    clearPaymentState();
    setCurrentStep(1);
    setUserInfo(DEFAULT_USER_INFO);
    setSetupPhase("idle");
    setPaymentSetup(null);
    setPaymentPhase("idle");
    setFailureMessage(null);
    setConfirmedOrder(null);
    navigate("/dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const showVerifying = currentStep === 2 && paymentPhase === "verifying";

  if (bookingLoadError) {
    return (
      <div className={styles.page}>
        <TopBar variant="checkout" cancelLabel="Cancel Checkout" onCancel={handleBackToDashboard} />
        <div className={styles.stepWrap}>
          <p style={{ color: "#f5f5f2", textAlign: "center", padding: "48px 16px" }}>{bookingLoadError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <TopBar
        variant={currentStep === 3 ? "app" : "checkout"}
        cancelLabel="Cancel Checkout"
        onCancel={() => window.confirm("Cancel this checkout?") && handleBackToDashboard()}
      />

      {currentStep < 3 && <Stepper steps={stepsFor(currentStep)} />}

      <div className={styles.stepWrap}>
        {currentStep === 1 && (
          <InformationStep
            booking={booking}
            userInfo={userInfo}
            onChangeUserInfo={setUserInfo}
            onContinue={goToPayment}
          />
        )}

        {currentStep === 2 && showVerifying && <VerifyingPayment />}

        {currentStep === 2 && !showVerifying && (
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
            onPayAttemptStart={handlePayAttemptStart}
            onPixelComplete={handlePixelComplete}
            onRetrySetup={handleRetrySetup}
          />
        )}

        {currentStep === 3 && confirmedOrder && (
          <ConfirmationStep
            booking={booking}
            bookingRef={confirmedOrder.transactionId ? `DRB-${confirmedOrder.transactionId}` : `DRB-${bookingIdRef.current}`}
            transactionId={confirmedOrder.transactionId}
            method={confirmedOrder.paymentMethodType}
            cardLast4={confirmedOrder.cardLast4}
            totals={displayTotals}
            onBackToDashboard={handleBackToDashboard}
          />
        )}
      </div>
    </div>
  );
}
