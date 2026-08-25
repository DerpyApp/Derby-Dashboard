import { apiClient } from "./apiClient";

/**
 * GET /api/Club
 * Retrieves list of clubs with optional filtering (Sport, City, SearchTerm, MinPrice, MaxPrice)
 */
export async function fetchClubs(params = {}) {
  const res = await apiClient.get("/Club", { params });
  return res.data;
}

/**
 * GET /api/Club/{id}
 * Retrieves specific club details including its courts list
 */
export async function fetchClubDetails(id) {
  const res = await apiClient.get(`/Club/${id}`);
  return res.data;
}

/**
 * GET /api/Club/{id}/courts
 * Retrieves all courts for a specific club
 */
export async function fetchClubCourts(id) {
  const res = await apiClient.get(`/Club/${id}/courts`);
  return res.data;
}

/**
 * GET /api/Club/{id}/availability?date=...
 * Retrieves availability schedule and time slots for a club on a given date
 * @param {number|string} id - Club ID
 * @param {string} date - ISO Date string (e.g. "2026-08-25T00:00:00Z" or "2026-08-25")
 */
export async function fetchClubAvailability(id, date) {
  const params = date ? { date } : {};
  const res = await apiClient.get(`/Club/${id}/availability`, { params });
  return res.data;
}
