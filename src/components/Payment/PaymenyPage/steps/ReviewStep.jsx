import { Container, Row, Col } from "react-bootstrap";
import {
  BsGeoAlt,
  BsCalendar3,
  BsClock,
  BsStopwatch,
  BsPerson,
  BsEnvelope,
  BsTelephone,
  BsShieldCheck,
  BsArrowLeft,
  BsLock,
} from "react-icons/bs";

import { formatCurrency } from "../../../../utils/pricing";
import styles from "./ReviewStep.module.css";

/**
 * Step 3 — Checkout Review
 *
 * Displays a full summary of the booking + player details before the user
 * triggers the actual Paymob payment by clicking "Confirm & Pay".
 *
 * Props:
 *   booking      – normalised booking object
 *   userInfo     – { fullName, email, phone }
 *   displayTotals– from estimateTotals()
 *   isConfirming – bool — true while payment is being processed
 *   onConfirm    – () => void — fires Pixel / triggers the charge
 *   onBack       – () => void — returns to Payment step
 */
export default function ReviewStep({
  booking,
  userInfo,
  displayTotals,
  isConfirming,
  onConfirm,
  onBack,
}) {
  return (
    <Container className={styles.content}>
      <Row className="g-4">
        {/* ── Left column ─────────────────────────────────────── */}
        <Col lg={7}>
          {/* Venue cover photo */}
          <div className={styles.coverWrap}>
            {booking.image ? (
              <img
                src={booking.image}
                alt={booking.venueName}
                className={styles.coverImg}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className={styles.coverFallback}>No image available</div>
            )}
          </div>

          {/* Venue header */}
          <div className={styles.venueHeader}>
            <h2 className={styles.venueTitle}>
              {booking.venueName || "Zamalek Club Main Pitch"}
            </h2>
            {booking.location && (
              <div className={styles.venueMeta}>
                <BsGeoAlt />
                {booking.location}
              </div>
            )}
            {booking.sport && (
              <span className={styles.sportBadge}>{booking.sport}</span>
            )}
          </div>

          {/* Schedule card */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle}>
              <BsCalendar3 /> Schedule
            </div>
            <div className={styles.scheduleGrid}>
              <div className={styles.scheduleCell}>
                <div className={styles.scheduleCellLabel}>
                  <BsCalendar3 /> Date
                </div>
                <div className={styles.scheduleCellValue}>
                  {booking.date || "—"}
                </div>
              </div>
              <div className={styles.scheduleCell}>
                <div className={styles.scheduleCellLabel}>
                  <BsClock /> Time
                </div>
                <div className={styles.scheduleCellValue}>
                  {booking.time || "—"}
                </div>
              </div>
              <div className={styles.scheduleCell}>
                <div className={styles.scheduleCellLabel}>
                  <BsStopwatch /> Duration
                </div>
                <div className={styles.scheduleCellValue}>
                  {booking.duration || "—"}
                </div>
              </div>
            </div>
          </div>

          {/* Player details card */}
          <div className={styles.infoCard}>
            <div className={styles.infoCardTitle}>
              <BsPerson /> Player Details
            </div>
            <div className={styles.playerRow}>
              <BsPerson className={styles.playerRowIcon} />
              <span>{userInfo.fullName || "—"}</span>
            </div>
            <div className={styles.playerRow}>
              <BsEnvelope className={styles.playerRowIcon} />
              <span>{userInfo.email || "—"}</span>
            </div>
            {userInfo.phone && (
              <div className={styles.playerRow}>
                <BsTelephone className={styles.playerRowIcon} />
                <span>{userInfo.phone}</span>
              </div>
            )}
          </div>
        </Col>

        {/* ── Right column — Order Summary ─────────────────────── */}
        <Col lg={5}>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>Order Summary</h3>

            <div className={styles.summaryRow}>
              <span>Pitch Rental ({booking.duration})</span>
              <span className={styles.summaryRowValue}>
                {formatCurrency(displayTotals.pitchFee, booking.currency)}
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span>Service Fee</span>
              <span className={styles.summaryRowValue}>
                {formatCurrency(displayTotals.serviceFee, booking.currency)}
              </span>
            </div>

            {displayTotals.discount > 0 && (
              <div className={styles.summaryRow}>
                <span>Discount</span>
                <span className={styles.summaryRowValue} style={{ color: "var(--derby-green)" }}>
                  -{formatCurrency(displayTotals.discount, booking.currency)}
                </span>
              </div>
            )}

            <div className={styles.summaryRow}>
              <span>Tax ({Math.round((booking.pricing?.taxRate ?? 0) * 100)}%)</span>
              <span className={styles.summaryRowValue}>
                {formatCurrency(displayTotals.tax, booking.currency)}
              </span>
            </div>

            <hr className={styles.divider} />

            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total</span>
              <span className={styles.totalValue}>
                {formatCurrency(displayTotals.total, booking.currency)}
              </span>
            </div>

            <button
              type="button"
              className={styles.confirmBtn}
              onClick={onConfirm}
              disabled={isConfirming}
            >
              <BsLock />
              {isConfirming ? "Processing payment…" : "Confirm & Pay"}
            </button>

            <button
              type="button"
              className={styles.backBtn}
              onClick={onBack}
              disabled={isConfirming}
            >
              <BsArrowLeft /> Back to Payment
            </button>

            <p className={styles.secureNote}>
              <BsShieldCheck /> Secured by Paymob — card details never touch our servers
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
