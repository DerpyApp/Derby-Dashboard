import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <section className={styles.section}>
      <Container>
        <Row className="align-items-center g-4">
          <Col lg={6}>
            <div className={styles.imageWrap}>
              <img
                src="/images/derby-highfive.jpg"
                alt="Two athletes high-fiving on a padel court"
                className={styles.image}
              />
            </div>
          </Col>
          <Col lg={6}>
            <h2 className={styles.heading}>More Than a Booking App</h2>
            <p className={styles.text}>
              Derby Sports isn't just about reserving a pitch. We are building
              a global community of passionate athletes. We believe that
              sports have the power to connect people, foster excellence, and
              transform lives. Our platform is designed to seamlessly
              integrate the thrill of the game with the efficiency of modern
              technology.
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
