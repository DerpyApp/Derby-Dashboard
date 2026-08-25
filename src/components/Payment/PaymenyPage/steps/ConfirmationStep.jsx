import { Container } from "react-bootstrap";
import {
  BsCheckCircleFill,
  BsGeoAlt,
  BsCalendar3,
  BsClock,
  BsTicketPerforated,
  BsDownload,
  BsHouseDoor,
  BsController,
} from "react-icons/bs";

import { formatCurrency } from "../../../../utils/pricing";
import { buildReceiptText, downloadReceipt } from "../../../../utils/receipt";
import styles from "./ConfirmationStep.module.css";

/**
 * Step 4 — Booking Confirmed!
 *
 * Displays a success screen with:
 *  - Large lime-green check icon
 *  - "Booking Confirmed!" heading
 *  - 4 detail cards: Venue, Date & Time, Sport, Booking Ref
 *  - Action buttons: Download Receipt | Back to Home
 */
export default function ConfirmationStep({
  booking,
  bookingRef,
  transactionId,
  method,
  cardLast4,
  totals,
  onBackToHome,
}) {
  function handleDownloadReceipt() {
    const text = buildReceiptText({
      bookingRef,
      booking,
      totals,
      transactionId,
      method,
      cardLast4,
    });
    downloadReceipt(`${bookingRef}-receipt.txt`, text);
  }

  return (
    <Container className={styles.content}>
      <div className={styles.wrap}>
        {/* ── Success icon ─────────────────────────────────── */}
        <div className={styles.iconWrap}>
          <BsCheckCircleFill className={styles.successIcon} />
          <div className={styles.iconRing} />
        </div>

        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subtitle}>
          Your match is locked in. Get ready to dominate the pitch.
          <br />
          A confirmation has been sent to your email.
        </p>

        {/* ── 4 detail cards ───────────────────────────────── */}
        <div className={styles.detailGrid}>
          {/* Venue */}
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>
              <BsGeoAlt /> Venue
            </div>
            <div className={styles.detailValue}>{booking.venueName || "—"}</div>
            <div className={styles.detailSub}>{booking.location}</div>
          </div>

          {/* Date & Time */}
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>
              <BsCalendar3 /> Date &amp; Time
            </div>
            <div className={styles.detailValue}>{booking.date || "—"}</div>
            <div className={styles.detailSub}>{booking.time}</div>
          </div>

          {/* Sport */}
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>
              <BsController /> Sport
            </div>
            <div className={styles.detailValue}>{booking.sport || "—"}</div>
            <div className={styles.detailSub}>{booking.duration}</div>
          </div>

          {/* Booking Ref */}
          <div className={styles.detailCard}>
            <div className={styles.detailLabel}>
              <BsTicketPerforated /> Booking Ref
            </div>
            <div className={styles.detailValue}>{bookingRef || "—"}</div>
            <div className={styles.detailSub}>
              Paid in full · {formatCurrency(totals?.total, booking.currency)}
            </div>
          </div>
        </div>

        {/* ── Status strip ─────────────────────────────────── */}
        <div className={styles.statusStrip}>
          <span>
            Status: <strong className={styles.statusGreen}>Confirmed</strong>
          </span>
          <span>
            Payment: <strong className={styles.statusGreen}>Paid in full</strong>
          </span>
          {transactionId && (
            <span>
              Txn: <strong className={styles.statusGreen}>{transactionId}</strong>
            </span>
          )}
        </div>

        {/* ── Actions ──────────────────────────────────────── */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.btnPrimary}
            onClick={handleDownloadReceipt}
          >
            <BsDownload /> Download Receipt
          </button>
          <button
            type="button"
            className={styles.btnGhost}
            onClick={onBackToHome}
          >
            <BsHouseDoor /> Back to Home
          </button>
        </div>
      </div>
    </Container>
  );
}
