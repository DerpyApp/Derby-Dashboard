import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./Team.module.css";

export default function Team({ team, loading }) {
  return (
    <section className={styles.section}>
      <Container>
        <h2 className={`text-center mb-5 ${styles.heading}`}>
          The Minds Behind the Game
        </h2>
        <Row className="g-4">
          {team.map((member, idx) => (
            <Col md={4} key={idx}>
              <div className={styles.card}>
                <div className={styles.avatar}>
                  {member.avatar ? (
                    <img src={member.avatar} alt={member.name} />
                  ) : null}
                </div>
                <h3 className={styles.name}>{member.name}</h3>
                <div className={styles.role}>{member.role}</div>
                <p className={styles.bio}>{member.bio}</p>
              </div>
            </Col>
          ))}
        </Row>
        {loading && <p className={`text-center ${styles.loadingNote}`}>Loading team…</p>}
      </Container>
    </section>
  );
}
