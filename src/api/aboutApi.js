import axios from "axios";

// Adjust this to your real backend, or set VITE_API_URL in your .env
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 8000,
});

export async function fetchStats() {
  const res = await client.get("/stats");
  return res.data;
}

export async function fetchTeam() {
  const res = await client.get("/team");
  return res.data;
}

export async function fetchAboutData() {
  const [stats, team] = await Promise.all([fetchStats(), fetchTeam()]);
  return { stats, team };
}
