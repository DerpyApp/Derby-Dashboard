import { Container } from "react-bootstrap";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={`text-center ${styles.content}`}>
        <h1 className={styles.title}>Redefining the Game</h1>
        <p className={styles.subtitle}>
          We are on a mission to make professional-grade sports facilities and
          competitive play accessible to everyone, everywhere.
        </p>
      </Container>
    </section>
  );
}
