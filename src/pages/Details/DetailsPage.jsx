import { useNavigate } from "react-router-dom";
import "./DetailsPage.css";

// ================= IMAGES =================

import logo from "../../assets/logo.png";

import mainContent from "../../assets/details/Main Content.png";

import wifiIcon from "../../assets/details/wifi-icon.png";
import parkingIcon from "../../assets/details/parking-icon.png";
import showerIcon from "../../assets/details/shower-icon.png";
import lockerIcon from "../../assets/details/locker-icon.png";
import cafeIcon from "../../assets/details/cafe-icon.png";
import viewingAreaIcon from "../../assets/details/viewing area-icon.png";

import locationImage from "../../assets/details/location.png";
import clockIcon from "../../assets/details/clock-icon.png";

import footballCourt from "../../assets/details/football-court.png";
import padelCourt from "../../assets/details/padel-court.png";

import lockerRoom from "../../assets/details/locker-room.png";
import pitchNight from "../../assets/details/pitch-night.png";
import sportsCafe from "../../assets/details/sports-cafe.png";

export default function DetailsPage() {
  const navigate = useNavigate();

  const handleGetDirections = () => {
    window.open(
      "https://www.google.com/maps/search/?api=1&query=26+July+Corridor,+Zamalek,+Cairo",
      "_blank",
    );
  };

  const handleCallClub = () => {
    window.location.href = "tel:+201000000000";
  };

  const handleBookAlpha = () => {
    alert("Booking 5-a-Side Pitch Alpha");
  };

  const handleBookCourt = () => {
    alert("Booking Padel Court 1");
  };

  return (
    <div className="details-page">
      {/* ================= HEADER ================= */}

      <header className="details-header">
        <img src={logo} alt="Derby" className="details-logo" />

        <nav className="details-nav">
          <button onClick={() => navigate("/")}>Home</button>

          <button className="active" onClick={() => navigate("/tournament")}>
            Tournaments
          </button>

          <button onClick={() => navigate("/pricing")}>Pricing</button>

          <button onClick={() => navigate("/contact")}>Contact</button>

          <button onClick={() => navigate("/about")}>About us</button>
        </nav>

        <div className="details-auth">
          <button className="signin" onClick={() => navigate("/login")}>
            Sign in
          </button>

          <button className="signup" onClick={() => navigate("/register")}>
            Sign up
          </button>
        </div>
      </header>

      {/* ================= HERO ================= */}

      <section
        className="details-hero"
        style={{
          backgroundImage: `url(${mainContent})`,
        }}
      ></section>

      {/* ================= MAIN CONTENT ================= */}

      <main className="details-main">
        {/* ================= LEFT SIDE ================= */}

        <div className="left-column">
          {/* CLUB OVERVIEW */}

          <section className="details-card overview-card">
            <h2>Club Overview</h2>

            <p>
              Experience premier athletic facilities at the heart of the city.
              The Zamalek Club Elite Pitch offers meticulously maintained
              5-a-side and 7-a-side football pitches alongside
              professional-grade Padel courts. Built for athletes who demand the
              best, our venue features FIFA-certified artificial turf,
              professional stadium lighting, and premium locker rooms.
            </p>

            <p>
              Whether you're organizing a competitive league match or a casual
              game with friends, our state-of-the-art infrastructure ensures an
              unmatched playing experience.
            </p>
          </section>

          {/* FACILITIES */}

          <section className="details-card facilities-card">
            <h2>Facilities & Amenities</h2>

            <div className="facilities-grid">
              <div className="facility-item">
                <img src={wifiIcon} alt="Free WiFi" />
                <span>Free WiFi</span>
              </div>

              <div className="facility-item">
                <img src={parkingIcon} alt="Parking" />
                <span>Parking</span>
              </div>

              <div className="facility-item">
                <img src={showerIcon} alt="Showers" />
                <span>Showers</span>
              </div>

              <div className="facility-item">
                <img src={lockerIcon} alt="Locker Rooms" />
                <span>Locker Rooms</span>
              </div>

              <div className="facility-item">
                <img src={cafeIcon} alt="Sports Cafe" />
                <span>Sports Cafe</span>
              </div>

              <div className="facility-item">
                <img src={viewingAreaIcon} alt="Viewing Area" />
                <span>Viewing Area</span>
              </div>
            </div>
          </section>

          {/* AVAILABLE COURTS */}

          <section>
            <h2 className="available-title">Available Courts</h2>

            <div className="courts-list">
              {/* FOOTBALL COURT */}

              <div className="court-card">
                <img
                  src={footballCourt}
                  alt="5-a-Side Pitch Alpha"
                  className="court-image"
                />

                <div className="court-info">
                  <div className="court-top">
                    <div>
                      <h3>5-a-Side Pitch Alpha</h3>

                      <p className="court-description">
                        Premium FIFA-certified turf, ideal for fast-paced 5v5
                        matches. Includes bibs and ball.
                      </p>
                    </div>

                    <span className="court-tag">Football</span>
                  </div>

                  <div className="prices">
                    <div className="price-box">
                      <span>60 MINS</span>
                      <strong>EGP 400</strong>
                    </div>

                    <div className="price-box">
                      <span>90 MINS</span>
                      <strong>EGP 550</strong>
                    </div>
                  </div>

                  <button className="book-button" onClick={handleBookAlpha}>
                    Book Alpha
                  </button>
                </div>
              </div>

              {/* PADEL COURT */}

              <div className="court-card">
                <img
                  src={padelCourt}
                  alt="Padel Court 1"
                  className="court-image"
                />

                <div className="court-info">
                  <div className="court-top">
                    <div>
                      <h3>Padel Court 1 (Panoramic)</h3>

                      <p className="court-description">
                        Full panoramic glass court with WPT standard blue
                        carpet. Racket rental available.
                      </p>
                    </div>

                    <span className="court-tag">Padel</span>
                  </div>

                  <div className="prices">
                    <div className="price-box">
                      <span>60 MINS</span>
                      <strong>EGP 350</strong>
                    </div>

                    <div className="price-box">
                      <span>90 MINS</span>
                      <strong>EGP 500</strong>
                    </div>
                  </div>

                  <button className="book-button" onClick={handleBookCourt}>
                    Book Court 1
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* GALLERY */}

          <section>
            <h2 className="gallery-title">Gallery</h2>

            <div className="gallery">
              <img src={lockerRoom} alt="Locker Room" />

              <img src={pitchNight} alt="Pitch at Night" />

              <img src={sportsCafe} alt="Sports Cafe" />
            </div>
          </section>
        </div>

        {/* ================= RIGHT SIDE ================= */}

        <aside className="right-column">
          {/* LOCATION */}

          <section className="details-card map-card">
            <img src={locationImage} alt="Location Map" className="map-image" />

            <div className="location-content">
              <h2>Location</h2>

              <p>
                26 July Corridor, Zamalek
                <br />
                Cairo, Egypt
              </p>

              <div className="location-buttons">
                <button onClick={handleGetDirections}>◈ Get Directions</button>

                <button onClick={handleCallClub}>☎ Call Club</button>
              </div>
            </div>
          </section>

          {/* HOURS */}

          <section className="details-card hours-card">
            <h2>
              <span className="hours-icon">
                <img src={clockIcon} alt="Clock" />
              </span>
              Hours
            </h2>

            <div className="hours-row">
              <span>Monday - Thursday</span>
              <span>08:00 - 02:00</span>
            </div>

            <div className="hours-row">
              <span>Friday</span>
              <span>08:00 - 04:00</span>
            </div>

            <div className="hours-row">
              <span>Saturday</span>
              <span>07:00 - 04:00</span>
            </div>

            <div className="hours-row">
              <span>Sunday</span>
              <span>08:00 - 02:00</span>
            </div>
          </section>
        </aside>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="details-footer">
        <div className="footer-left">
          <img src={logo} alt="Derby" className="footer-logo" />

          <p>© 2026 Derby Sports Ecosystem. All Rights Reserved.</p>
        </div>

        <div className="footer-links">
          <span className="footer-privacy">Privacy Policy</span>

          <span className="footer-terms">Terms of Service</span>

          <span className="footer-contact">Contact Support</span>

          <span className="footer-partner">Partner with Us</span>

          <span className="footer-careers">Careers</span>
        </div>
      </footer>
    </div>
  );
}
