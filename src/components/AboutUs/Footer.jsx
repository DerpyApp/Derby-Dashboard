import { Link } from "react-router-dom";
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
              <li><Link to="/legal?tab=privacy">Privacy Policy</Link></li>
              <li><Link to="/legal?tab=terms">Terms of Service</Link></li>
              <li><Link to="/contact">Contact Support</Link></li>
              <li><Link to="/contact">Partner with Us</Link></li>
              <li><Link to="/contact">Careers</Link></li>
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
