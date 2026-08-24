import { Link } from "react-router-dom";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <BsNavbar expand="lg" variant="dark" className={styles.navbar}>
      <Container>
        <BsNavbar.Brand as={Link} to="/" className={styles.brand}>
          <span className={styles.brandIcon}>D</span> DERBY
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="derby-nav" />
        <BsNavbar.Collapse id="derby-nav">
          <Nav className={`mx-auto ${styles.links}`}>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/tournaments">Tournaments</Nav.Link>
            <Nav.Link as={Link} to="/pricing">Pricing</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            <Nav.Link as={Link} to="/about" className={styles.activeLink}>
              About us
            </Nav.Link>
          </Nav>

          <Nav className={styles.auth}>
            <Nav.Link as={Link} to="/login" className={styles.signinLink}>
              Sign in
            </Nav.Link>
            <Button as={Link} to="/register" className={styles.signupBtn}>Sign up</Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
