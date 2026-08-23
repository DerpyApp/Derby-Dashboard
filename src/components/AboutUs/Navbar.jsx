import React from "react";
import { Navbar as BsNavbar, Nav, Container, Button } from "react-bootstrap";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <BsNavbar expand="lg" variant="dark" className={styles.navbar}>
      <Container>
        <BsNavbar.Brand href="/" className={styles.brand}>
          <span className={styles.brandIcon}>D</span> DERBY
        </BsNavbar.Brand>

        <BsNavbar.Toggle aria-controls="derby-nav" />
        <BsNavbar.Collapse id="derby-nav">
          <Nav className={`mx-auto ${styles.links}`}>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/tournaments">Tournaments</Nav.Link>
            <Nav.Link href="/pricing">Pricing</Nav.Link>
            <Nav.Link href="/contact">Contact</Nav.Link>
            <Nav.Link href="/about" className={styles.activeLink}>
              About us
            </Nav.Link>
          </Nav>

          <Nav className={styles.auth}>
            <Nav.Link href="/signin" className={styles.signinLink}>
              Sign in
            </Nav.Link>
            <Button className={styles.signupBtn}>Sign up</Button>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}
