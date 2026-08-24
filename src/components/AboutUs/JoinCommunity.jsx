import { useNavigate } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import styles from "./JoinCommunity.module.css";

export default function JoinCommunity() {
  const navigate = useNavigate();

  return (
    <section className={`text-center ${styles.section}`}>
      <Container>
        <h2 className={`mb-4 ${styles.heading}`}>Join the Community</h2>
        <div className={styles.buttons}>
          <Button
            className={styles.btnCourt}
            onClick={() => navigate("/pricing")}
          >
            Book a Court
          </Button>
          <Button
            className={styles.btnMatch}
            variant="outline"
            onClick={() => navigate("/tournaments")}
          >
            Join a Match
          </Button>
        </div>
      </Container>
    </section>
  );
}
