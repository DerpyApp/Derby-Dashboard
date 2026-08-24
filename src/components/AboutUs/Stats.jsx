import { Container, Row, Col } from "react-bootstrap";
import styles from "./Stats.module.css";

export default function Stats({ stats }) {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.bar}>
          <Row className="text-center">
            {stats.map((stat) => (
              <Col xs={4} key={stat.label}>
                <div className={styles.value}>{stat.value}</div>
                <div className={styles.label}>{stat.label}</div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
}
