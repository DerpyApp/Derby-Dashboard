import { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import {
  BsPerson,
  BsEnvelope,
  BsTelephone,
  BsGeoAlt,
  BsCalendar3,
  BsClock,
  BsArrowRight,
} from "react-icons/bs";

import { isValidFullName, isValidEmail, isValidPhone } from "../../../../utils/validation";
import { formatCurrency, estimateTotals } from "../../../../utils/pricing";
import shared from "./shared.module.css";
import styles from "./InformationStep.module.css";

export default function InformationStep({ booking, userInfo, onChangeUserInfo, onContinue }) {
  const [errors, setErrors] = useState({});

  const totals = estimateTotals(booking.pricing, null);

  function validate() {
    const nextErrors = {};
    if (!isValidFullName(userInfo.fullName)) {
      nextErrors.fullName = "Please enter your full name (at least 2 characters).";
    }
    if (!isValidEmail(userInfo.email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!isValidPhone(userInfo.phone)) {
      nextErrors.phone = "Please enter a valid phone number.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function handleField(field, value) {
    onChangeUserInfo({ ...userInfo, [field]: value });
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      onContinue();
    }
  }

  return (
    <Container className={styles.content}>
      <Form onSubmit={handleSubmit} noValidate>
        <Row className="g-4">
          <Col lg={7}>
            <div className={shared.card}>
              <h3 className={shared.cardTitle}>
                <BsPerson className={shared.cardTitleIcon} /> Your Information
              </h3>
              <p className={styles.subtitle}>Please enter your details to confirm your booking.</p>

              <Form.Group className="mb-3">
                <Form.Label className={shared.label}>Full Name</Form.Label>
                <div className={shared.inputWrap}>
                  <BsPerson className={shared.inputIcon} />
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    value={userInfo.fullName}
                    onChange={(e) => handleField("fullName", e.target.value)}
                    className={`${shared.input} ${errors.fullName ? shared.inputInvalid : ""}`}
                    isInvalid={!!errors.fullName}
                  />
                </div>
                {errors.fullName && <div className={shared.errorText}>{errors.fullName}</div>}
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className={shared.label}>Email Address</Form.Label>
                <div className={shared.inputWrap}>
                  <BsEnvelope className={shared.inputIcon} />
                  <Form.Control
                    type="email"
                    placeholder="john@example.com"
                    value={userInfo.email}
                    onChange={(e) => handleField("email", e.target.value)}
                    className={`${shared.input} ${errors.email ? shared.inputInvalid : ""}`}
                    isInvalid={!!errors.email}
                  />
                </div>
                {errors.email && <div className={shared.errorText}>{errors.email}</div>}
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label className={shared.label}>Phone Number</Form.Label>
                <div className={shared.inputWrap}>
                  <BsTelephone className={shared.inputIcon} />
                  <Form.Control
                    type="tel"
                    placeholder="+20 100 123 4567"
                    value={userInfo.phone}
                    onChange={(e) => handleField("phone", e.target.value)}
                    className={`${shared.input} ${errors.phone ? shared.inputInvalid : ""}`}
                    isInvalid={!!errors.phone}
                  />
                </div>
                {errors.phone && <div className={shared.errorText}>{errors.phone}</div>}
              </Form.Group>
            </div>

            <button type="submit" className={`${shared.btnPrimary} ${styles.continueBtn}`}>
              Continue to Payment <BsArrowRight />
            </button>
          </Col>

          <Col lg={5}>
            <div className={styles.summaryCard}>
              <div className={styles.imageWrap}>
                <img
                  src={booking.image}
                  alt={booking.venueName}
                  className={styles.image}
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
              <h3 className={styles.venueName}>{booking.venueName}</h3>
              <div className={styles.venueMeta}>
                <BsGeoAlt /> {booking.location}
              </div>
              <div className={styles.sportBadge}>{booking.sport}</div>

              <Row className={styles.scheduleGrid}>
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

              <div className={styles.divider} />

              <div className={styles.summaryRow}>
                <span>Pitch Rental</span>
                <span>{formatCurrency(totals.pitchFee, booking.currency)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Service Fee</span>
                <span>{formatCurrency(totals.serviceFee, booking.currency)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Tax ({Math.round(booking.pricing.taxRate * 100)}%)</span>
                <span>{formatCurrency(totals.tax, booking.currency)}</span>
              </div>

              <div className={styles.divider} />

              <div className={styles.totalRow}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>{formatCurrency(totals.total, booking.currency)}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
