import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Container>
        <Row className="align-items-center">
          <Col md={3} className={styles.brand}>
            <span className={styles.brandIcon}>D</span> DERBY
          </Col>
          <Col md={6}>
            <ul className={styles.links}>
              <li><a href="/privacy">Privacy Policy</a></li>
              <li><a href="/terms">Terms of Service</a></li>
              <li><a href="/support">Contact Support</a></li>
              <li><a href="/partners">Partner with Us</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </Col>
          <Col md={3} className={styles.copy}>
            © 2026 Derby Sports Ecosystem. All Rights Reserved.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
