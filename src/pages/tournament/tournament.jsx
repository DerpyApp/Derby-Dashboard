import { useNavigate } from "react-router-dom";
import "./tournament.css";

import logo from "../../assets/tournament/logo.png";
import basket from "../../assets/tournament/Basket.png";
import football from "../../assets/tournament/football.png";
import padel from "../../assets/tournament/padel.png";
import topRankedIcon from "../../assets/tournament/top ranked_icon.png";

export default function Tournament() {
  const navigate = useNavigate();

  return (
    <div className="tournament-page">
      {/* HEADER */}
      <header className="header">
        <img src={logo} alt="Derby" className="logo" />

        <nav className="nav">
          <button onClick={() => navigate("/")}>Home</button>

          <button className="active" onClick={() => navigate("/tournament")}>
            Tournaments
          </button>

          <button onClick={() => navigate("/pricing")}>Pricing</button>

          <button onClick={() => navigate("/contact")}>Contact</button>

          <button onClick={() => navigate("/about")}>About us</button>
        </nav>

        <div className="header-buttons">
          <button className="sign-in" onClick={() => navigate("/login")}>
            Sign in
          </button>

          <button className="sign-up" onClick={() => navigate("/register")}>
            Sign up
          </button>
        </div>
      </header>

      <main className="main">
        {/* HERO */}
        <section className="hero" style={{ backgroundImage: `url(${basket})` }}>
          <div className="hero-content">
            <span className="featured">FEATURED MAJOR</span>

            <h1>Compete with the Best</h1>

            <p>
              The Derby Padel Cup is back. Gather your team, hit the court, and
              fight for the ultimate prize pool.
            </p>

            <div className="hero-actions">
              <button className="join-now">Join Now</button>

              <div className="countdown">⏱ 03 D 14 H 42 M</div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="content-grid">
          {/* LEFT */}
          <div className="tournaments-section">
            {/* FILTERS */}
            <div className="filters">
              <div className="sports">
                <button className="selected">All Sports</button>
                <button>Football</button>
                <button>Padel</button>
                <button>Tennis</button>
              </div>

              <div className="status">
                <button className="selected-status">Upcoming</button>
                <button>Ongoing</button>
                <button>Completed</button>
              </div>
            </div>

            {/* CARDS */}
            <div className="cards">
              {/* ZAMALEK */}
              <div className="tournament-card">
                <div className="image-container">
                  <img src={padel} alt="Zamalek Club" className="card-image" />
                </div>

                <div className="card-content">
                  <h2>Zamalek Club</h2>

                  <div className="prize">PRIZE: 50,000 EGP</div>

                  <div className="details">
                    <p>▣ Oct 15 - Oct 20, 2026</p>
                    <p>⌖ Zamalek, Cairo</p>
                    <p>♙ 24/32 Teams Registered</p>
                  </div>

                  <button
                    className="view-details"
                    onClick={() => navigate("/details")}
                  >
                    View Details
                  </button>
                </div>
              </div>

              {/* FOOTBALL */}
              <div className="tournament-card">
                <div className="image-container">
                  <img
                    src={football}
                    alt="Cairo Football League"
                    className="card-image"
                  />
                </div>

                <div className="card-content">
                  <h2>Cairo Football League</h2>

                  <div className="prize">PRIZE: 100,000 EGP</div>

                  <div className="details">
                    <p>▣ Nov 1 - Dec 15, 2026</p>
                    <p>⌖ Multiple Venues</p>
                    <p>♙ 14/16 Teams Registered</p>
                  </div>

                  <button
                    className="view-details"
                    onClick={() => navigate("/details")}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* LEADERBOARD */}
          <aside className="leaderboard">
            <div className="leaderboard-title">
              <h2>Top Ranked</h2>

              <img src={topRankedIcon} alt="Top Ranked" />
            </div>

            <div className="rank-card first">
              <div className="rank-number">1</div>

              <div>
                <h3>Team Alpha</h3>
                <span>Padel Pro Division</span>
              </div>

              <strong>2450</strong>
            </div>

            <div className="rank-card">
              <div className="rank-number">2</div>

              <div>
                <h3>Desert Foxes</h3>
                <span>Football League</span>
              </div>

              <strong>2100</strong>
            </div>

            <div className="rank-card">
              <div className="rank-number">3</div>

              <div>
                <h3>Smash Bros</h3>
                <span>Tennis Singles</span>
              </div>

              <strong>1950</strong>
            </div>

            <button className="leaderboard-button">
              View Full Leaderboards →
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
}
