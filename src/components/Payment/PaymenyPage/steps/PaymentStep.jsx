import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  BsTicketPerforated,
  BsCreditCard2Front,
  BsCalendar3,
  BsClock,
  BsLock,
  BsArrowLeft,
  BsShieldCheck,
  BsExclamationTriangle,
  BsArrowRepeat,
} from "react-icons/bs";

import "paymob-pixel"; // side-effect import — registers window.Pixel
import { formatCurrency } from "../../../../utils/pricing";
import shared from "./shared.module.css";
import styles from "./PaymentStep.module.css";

const PIXEL_ELEMENT_ID = "paymob-pixel-checkout";

// Styles Paymob's embedded card fields to match DERBY's dark/neon theme.
// (Colors mirror src/components/Payment/theme.css.)
const PIXEL_CUSTOM_STYLE = {
  Direction: "ltr",
  HideCardIcons: false,
  Font_Family: "Poppins, Inter, system-ui, sans-serif",
  Font_Size_Label: "12",
  Font_Size_Input_Fields: "15",
  Font_Weight_Label: 600,
  Color_Container: "#0e0f0c",
  Color_Border_Input_Fields: "rgba(255,255,255,0.08)",
  Color_Primary: "#b6ff1a",
  Color_Error: "#ff8080",
  Color_Input_Fields: "#0e0f0c",
  Text_Color_For_Label: "#a9aca3",
  Text_Color_For_Input_Fields: "#f5f5f2",
  Color_For_Text_Placeholder: "#6b6e64",
  Radius_Border: "8",
  Width_of_Container: "100%",
  Vertical_Spacing_between_components: "14",
};

/**
 * Payment is processed by Paymob's embedded Pixel SDK — a real card form
 * that Paymob renders and owns inside a Shadow DOM. Card number/expiry/CVV
 * are never readable by our own JS or sent to our backend; only Paymob's
 * SDK talks to Paymob directly. Our own "Pay Now" button just tells the
 * SDK to submit (disablePay + payFromOutside), so the existing layout and
 * button styling stay exactly as designed.
 */
export default function PaymentStep({
  booking,
  displayTotals,
  clientSecret,
  publicKey,
  setupPhase, // "idle" | "preparing" | "ready" | "error"
  setupError,
  phase, // "idle" | "starting" | "failed"
  failureMessage,
  onBack,
  onPayAttemptStart,
  onPixelComplete,
  onRetrySetup,
}) {
  const [isCardValid, setIsCardValid] = useState(false);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (setupPhase !== "ready" || !clientSecret || !publicKey) return;
    if (mountedRef.current) return; // guard against React StrictMode double-invoke
    mountedRef.current = true;

    // eslint-disable-next-line no-undef
    new window.Pixel({
      publicKey,
      clientSecret,
      paymentMethods: ["card"],
      elementId: PIXEL_ELEMENT_ID,
      disablePay: true, // we use our own "Pay Now" button below
      showSaveCard: false,
      cardValidationChanged: (valid) => setIsCardValid(!!valid),
      afterPaymentComplete: (res) => {
        onPixelComplete(res);
      },
      customStyle: PIXEL_CUSTOM_STYLE,
    });

    return () => {
      mountedRef.current = false;
      const el = document.getElementById(PIXEL_ELEMENT_ID);
      if (el) el.innerHTML = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setupPhase, clientSecret, publicKey]);

  const isBusy = phase === "starting";
  const payDisabled = isBusy || setupPhase !== "ready" || !isCardValid;

  function handleSubmit(e) {
    e.preventDefault();
    if (payDisabled) return;
    // Tell the parent we're starting (busy state), then hand off to Pixel —
    // disablePay:true means Pixel does nothing until this event fires. Card
    // data itself is read and submitted entirely inside Paymob's SDK; we
    // never see it.
    onPayAttemptStart();
    window.dispatchEvent(new Event("payFromOutside"));
  }

  return (
    <Container className={styles.content}>
      <Form onSubmit={handleSubmit} noValidate>
        <Row className="g-4">
          <Col lg={7}>
            {/* Order Details */}
            <div className={shared.card}>
              <h3 className={shared.cardTitle}>
                <BsTicketPerforated className={shared.cardTitleIcon} /> Order Details
              </h3>
              <div className={styles.orderRow}>
                <div className={styles.orderImageWrap}>
                  <img
                    src={booking.image}
                    alt={booking.venueName}
                    className={styles.orderImage}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <div className={styles.orderVenue}>{booking.venueName}</div>
                  <div className={styles.orderMeta}>{booking.location}</div>
                </div>
              </div>
              <Row className={styles.orderGrid}>
                <Col xs={4}>
                  <div className={shared.gridLabel}>
                    <BsCalendar3 /> Date
                  </div>
                  <div className={shared.gridValue}>{booking.date}</div>
                </Col>
                <Col xs={4}>
                  <div className={shared.gridLabel}>
                    <BsClock /> Time
                  </div>
                  <div className={shared.gridValue}>{booking.time}</div>
                </Col>
                <Col xs={4}>
                  <div className={shared.gridLabel}>Duration</div>
                  <div className={shared.gridValue}>{booking.duration}</div>
                </Col>
              </Row>
            </div>

            {/* Card Details — real Paymob Pixel embedded checkout */}
            <div className={shared.card}>
              <h3 className={shared.cardTitle}>
                <BsCreditCard2Front className={shared.cardTitleIcon} /> Card Details
              </h3>

              {setupPhase === "preparing" && (
                <p className={styles.preparingText}>Preparing secure checkout…</p>
              )}

              {setupPhase === "error" && (
                <div className={styles.failureBanner}>
                  <BsExclamationTriangle />
                  <span>{setupError || "Could not start secure checkout. Please try again."}</span>
                  <button type="button" className={styles.retryBtn} onClick={onRetrySetup}>
                    <BsArrowRepeat /> Retry
                  </button>
                </div>
              )}

              {/* Paymob mounts its own card form here (Shadow DOM) — we never
                  read or touch the values inside it. */}
              <div id={PIXEL_ELEMENT_ID} className={styles.pixelContainer} />

              {phase === "failed" && (
                <div className={styles.failureBanner}>
                  <BsExclamationTriangle />
                  <span>{failureMessage || "Payment failed or was cancelled. Please try again."}</span>
                  <button type="button" className={styles.retryBtn} onClick={onRetrySetup}>
                    <BsArrowRepeat /> Try Again
                  </button>
                </div>
              )}
            </div>

            <div className={shared.actionsRow}>
              <button type="button" className={shared.btnGhost} onClick={onBack} disabled={isBusy}>
                <BsArrowLeft /> Back
              </button>
            </div>
          </Col>

          <Col lg={5}>
            <div className={styles.summaryCard}>
              <h3 className={styles.summaryTitle}>Summary</h3>

              <div className={styles.summaryRow}>
                <span>Court Fee ({booking.duration})</span>
                <span>{formatCurrency(displayTotals.pitchFee, booking.currency)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Service Fee</span>
                <span>{formatCurrency(displayTotals.serviceFee, booking.currency)}</span>
              </div>
              {displayTotals.discount > 0 && (
                <div className={`${styles.summaryRow} ${styles.discountRow}`}>
                  <span>Discount</span>
                  <span>-{formatCurrency(displayTotals.discount, booking.currency)}</span>
                </div>
              )}
              <div className={styles.summaryRow}>
                <span>Tax ({Math.round(booking.pricing.taxRate * 100)}%)</span>
                <span>{formatCurrency(displayTotals.tax, booking.currency)}</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.totalRow}>
                <div>
                  <div className={styles.totalLabel}>Estimated Total</div>
                  <div className={styles.totalNote}>Including Taxes</div>
                </div>
                <div className={styles.totalValue}>{formatCurrency(displayTotals.total, booking.currency)}</div>
              </div>

              <button type="submit" className={`${shared.btnPrimary} ${styles.payBtn}`} disabled={payDisabled}>
                <BsLock /> {isBusy ? "Processing…" : "Pay Now"}
              </button>
              <p className={styles.secureNote}>
                <BsShieldCheck /> Secured by Paymob — your card details never touch our servers
              </p>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
