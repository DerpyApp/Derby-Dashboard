import { Container, Row, Col } from "react-bootstrap";
import {
  BsCheckCircleFill,
  BsGeoAlt,
  BsCalendar3,
  BsClock,
  BsTicketPerforated,
  BsDownload,
  BsGrid,
} from "react-icons/bs";

import { formatCurrency } from "../../../../utils/pricing";
import { buildReceiptText, downloadReceipt } from "../../../../utils/receipt";
import shared from "./shared.module.css";
import styles from "./ConfirmationStep.module.css";

export default function ConfirmationStep({
  booking,
  bookingRef,
  transactionId,
  method,
  cardLast4,
  totals,
  onBackToDashboard,
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
        <BsCheckCircleFill className={styles.successIcon} />
        <h1 className={styles.title}>Booking Confirmed!</h1>
        <p className={styles.subtitle}>
          Your match is locked in. Get ready to dominate the pitch. We've sent a confirmation
          email with all the details.
        </p>

        <Row className="g-3 mb-2">
          <Col xs={6}>
            <div className={styles.detailCard}>
              <div className={styles.detailLabel}>
                <BsGeoAlt /> Venue
              </div>
              <div className={styles.detailValue}>{booking.venueName}</div>
              <div className={styles.detailSub}>{booking.location}</div>
            </div>
          </Col>
          <Col xs={6}>
            <div className={styles.detailCard}>
              <div className={styles.detailLabel}>
                <BsCalendar3 /> Date &amp; Time
              </div>
              <div className={styles.detailValue}>{booking.date}</div>
              <div className={styles.detailSub}>{booking.time}</div>
            </div>
          </Col>
          <Col xs={6}>
            <div className={styles.detailCard}>
              <div className={styles.detailLabel}>
                <BsClock /> Sport
              </div>
              <div className={styles.detailValue}>{booking.sport}</div>
              <div className={styles.detailSub}>{booking.sportMeta}</div>
            </div>
          </Col>
          <Col xs={6}>
            <div className={styles.detailCard}>
              <div className={styles.detailLabel}>
                <BsTicketPerforated /> Booking Ref
              </div>
              <div className={styles.detailValue}>{bookingRef}</div>
              <div className={styles.detailSub}>Paid in full · {formatCurrency(totals.total, booking.currency)}</div>
            </div>
          </Col>
        </Row>

        <div className={styles.statusRow}>
          <span>Booking Status: <strong className={styles.statusGreen}>Confirmed</strong></span>
          <span>Payment: <strong className={styles.statusGreen}>Paid in full</strong></span>
          {transactionId && (
            <span>Transaction ID: <strong className={styles.statusGreen}>{transactionId}</strong></span>
          )}
        </div>

        <div className={styles.actions}>
          <button type="button" className={shared.btnPrimary} onClick={handleDownloadReceipt}>
            <BsDownload /> Download Receipt
          </button>
          <button type="button" className={shared.btnGhost} onClick={onBackToDashboard}>
            <BsGrid /> Back to Dashboard
          </button>
        </div>
      </div>
    </Container>
  );
}
