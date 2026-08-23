import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BsLightbulb, BsPeopleFill, BsAwardFill } from "react-icons/bs";
import styles from "./CoreValues.module.css";

const ICONS = {
  lightbulb: <BsLightbulb size={22} />,
  people: <BsPeopleFill size={22} />,
  award: <BsAwardFill size={22} />,
};

export default function CoreValues({ values }) {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={`text-center mb-5 ${styles.heading}`}>
          Our Core Values
        </h2>
        <Row className="g-4">
          {values.map((value) => (
            <Col md={4} key={value.title}>
              <div className={styles.card}>
                <div className={styles.icon}>{ICONS[value.icon]}</div>
                <h3 className={styles.title}>{value.title}</h3>
                <p className={styles.text}>{value.text}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
