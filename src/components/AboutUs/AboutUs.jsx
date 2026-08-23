import React, { useEffect, useState } from "react";
import { fetchAboutData } from "../../api/aboutApi";
import { DEFAULT_STATS, DEFAULT_TEAM, CORE_VALUES } from "../../data/aboutData";

import Hero from "./Hero";
import Intro from "./Intro";
import CoreValues from "./CoreValues";
import Stats from "./Stats";
import Team from "./Team";
import JoinCommunity from "./JoinCommunity";

import "./theme.css";

export default function AboutUs() {
  const [stats, setStats] = useState(DEFAULT_STATS);
  const [team, setTeam] = useState(DEFAULT_TEAM);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    fetchAboutData()
      .then(({ stats, team }) => {
        if (!isMounted) return;
        if (stats?.length) setStats(stats);
        if (team?.length) setTeam(team);
      })
      .catch((err) => {
        // Backend not reachable yet — keep the static fallback content
        console.warn("Falling back to static About Us content:", err.message);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Hero />
      <Intro />
      <CoreValues values={CORE_VALUES} />
      <Stats stats={stats} />
      <Team team={team} loading={loading} />
      <JoinCommunity />
    </div>
  );
}
