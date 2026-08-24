import { useNavigate } from "react-router-dom";
import { BsAwardFill, BsLightbulbFill, BsPeopleFill } from "react-icons/bs";

import heroImage from "../../assets/hero-players.png";
import missionImage from "../../assets/AboutSmall.jpg";
import styles from "./AboutUs.module.css";
import "./theme.css";

const values = [
  {
    icon: BsLightbulbFill,
    title: "Innovation",
    text: "Pushing boundaries to deliver a seamless, high-tech experience for every user.",
  },
  {
    icon: BsPeopleFill,
    title: "Community",
    text: "Fostering connections and building a global network of passionate athletes.",
  },
  {
    icon: BsAwardFill,
    title: "Excellence",
    text: "Committing to the highest standards in every facility and every match we facilitate.",
  },
];

const stats = [
  { value: "50K+", label: "ACTIVE PLAYERS" },
  { value: "1,500+", label: "SPORTS FACILITIES" },
  { value: "10+", label: "SPORTS COVERED" },
];

const team = [
  {
    name: "Name",
    role: "FOUNDER & CEO",
    bio: "A sports enthusiast with a vision to digitize the athlete journey in the region.",
  },
  {
    name: "Name",
    role: "HEAD OF PARTNERSHIPS",
    bio: "Connecting Derby with world-class facilities and global sports brands.",
  },
  {
    name: "Name",
    role: "LEAD PRODUCT DESIGNER",
    bio: "Crafting seamless experiences for athletes and venue owners alike.",
  },
];

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <section className={styles.heroSection}>
        <div className={styles.heroImageWrap}>
          <img
            src={heroImage}
            alt="Aerial stadium with pitch lights"
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1>Redefining the Game</h1>
            <p>
              We are on a mission to make professional-grade sports facilities
              and competitive play accessible to everyone, everywhere.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.missionSection}>
        <div className={styles.missionGrid}>
          <div className={styles.missionImageWrap}>
            <img
              src={missionImage}
              alt="Two padel players on a black-fenced court"
              className={styles.missionImage}
            />
          </div>
          <div className={styles.missionCopy}>
            <h2>More Than a Booking App</h2>
            <p>
              Derby Sports isn't just about reserving a pitch. We are building
              a global community of passionate athletes. We believe that sports
              have the power to connect people, foster excellence, and
              transform lives. Our platform is designed to seamlessly integrate
              the thrill of the game with the efficiency of modern technology.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.deepSection}>
        <div className={styles.contentWrap}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          <div className={styles.valueGrid}>
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article className={styles.valueCard} key={value.title}>
                  <div className={styles.iconCircle}>
                    <Icon />
                  </div>
                  <h3>{value.title}</h3>
                  <p>{value.text}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className={styles.statsBand}>
          {stats.map((stat) => (
            <div className={styles.statItem} key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className={styles.contentWrap}>
          <h2 className={styles.teamTitle}>The Minds Behind the Game</h2>
          <div className={styles.teamGrid}>
            {team.map((member) => (
              <article className={styles.teamCard} key={member.role}>
                <div className={styles.avatar} />
                <h3>{member.name}</h3>
                <div>{member.role}</div>
                <p>{member.bio}</p>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.cta}>
          <h2>Join the Community</h2>
          <div className={styles.ctaActions}>
            <button type="button" onClick={() => navigate("/pricing")}>
              Book a Court
            </button>
            <button type="button" onClick={() => navigate("/tournaments")}>
              Join a Match
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
