import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./tournament.css";

import basket from "../../assets/tournament/Basket.png";
import football from "../../assets/tournament/football.png";
import padel from "../../assets/tournament/padel.png";
import topRankedIcon from "../../assets/tournament/top ranked_icon.png";

const tournaments = [
  {
    id: "zamalek-club",
    title: "Zamalek Club",
    sport: "Padel",
    status: "Upcoming",
    image: padel,
    prize: "50,000 EGP",
    date: "Oct 15 - Oct 20, 2026",
    location: "Zamalek, Cairo",
    teams: "24/32 Teams Registered",
  },
  {
    id: "cairo-football-league",
    title: "Cairo Football League",
    sport: "Football",
    status: "Ongoing",
    image: football,
    prize: "100,000 EGP",
    date: "Nov 1 - Dec 15, 2026",
    location: "Multiple Venues",
    teams: "14/16 Teams Registered",
  },
];

const sportsFilters = ["All Sports", "Football", "Padel", "Tennis"];
const statusFilters = ["Upcoming", "Ongoing", "Completed"];

export default function Tournament() {
  const navigate = useNavigate();
  const [selectedSport, setSelectedSport] = useState("All Sports");
  const [selectedStatus, setSelectedStatus] = useState("Upcoming");

  const filteredTournaments = useMemo(() => {
    return tournaments.filter((tournament) => {
      const matchesSport =
        selectedSport === "All Sports" || tournament.sport === selectedSport;
      const matchesStatus = tournament.status === selectedStatus;

      return matchesSport && matchesStatus;
    });
  }, [selectedSport, selectedStatus]);

  return (
    <div className="tournament-page">
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
              <button
                type="button"
                className="join-now"
                onClick={() => navigate("/details/zamalek-club")}
              >
                Join Now
              </button>

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
                {sportsFilters.map((sport) => (
                  <button
                    key={sport}
                    type="button"
                    className={selectedSport === sport ? "selected" : ""}
                    onClick={() => setSelectedSport(sport)}
                  >
                    {sport}
                  </button>
                ))}
              </div>

              <div className="status">
                {statusFilters.map((status) => (
                  <button
                    key={status}
                    type="button"
                    className={
                      selectedStatus === status ? "selected-status" : ""
                    }
                    onClick={() => setSelectedStatus(status)}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* CARDS */}
            <div className="cards">
              {filteredTournaments.map((tournament) => (
                <div className="tournament-card" key={tournament.id}>
                  <div className="image-container">
                    <img
                      src={tournament.image}
                      alt={tournament.title}
                      className="card-image"
                    />
                  </div>

                  <div className="card-content">
                    <h2>{tournament.title}</h2>

                    <div className="prize">PRIZE: {tournament.prize}</div>

                    <div className="details">
                      <p>▣ {tournament.date}</p>
                      <p>⌖ {tournament.location}</p>
                      <p>♙ {tournament.teams}</p>
                    </div>

                    <button
                      type="button"
                      className="view-details"
                      onClick={() => navigate(`/details/${tournament.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
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

            <button
              type="button"
              className="leaderboard-button"
              onClick={() => navigate("/dashboard")}
            >
              View Full Leaderboards →
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
}
