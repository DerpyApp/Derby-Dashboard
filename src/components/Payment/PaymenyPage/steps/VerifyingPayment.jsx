import React from "react";
import { Container } from "react-bootstrap";
import { BsArrowRepeat, BsShieldLock } from "react-icons/bs";
import styles from "./VerifyingPayment.module.css";

export default function VerifyingPayment() {
  return (
    <Container className={styles.content}>
      <div className={styles.wrap}>
        <BsShieldLock className={styles.icon} />
        <BsArrowRepeat className={styles.spinner} />
        <h2 className={styles.title}>Verifying your payment…</h2>
        <p className={styles.subtitle}>
          We're confirming your transaction with Paymob. This only takes a few seconds — please
          don't close this page.
        </p>
      </div>
    </Container>
  );
}
