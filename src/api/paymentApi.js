import { apiClient } from "./apiClient";

/**
 * POST /api/Booking — creates a new booking.
 * Returns the created booking object with bookingId and status.
 *
 * @param {{
 *   facilityId: number,
 *   courtId: number,
 *   date: string,        // ISO date-time e.g. "2026-08-25T00:00:00Z"
 *   startTime: string,   // TimeSpan string e.g. "18:00:00"
 *   endTime: string,     // TimeSpan string e.g. "19:00:00"
 *   paymentMethod?: string
 * }} bookingPayload
 */
export async function createBooking(bookingPayload) {
  const res = await apiClient.post("/Booking", {
    facilityId: Number(bookingPayload.facilityId),
    courtId: Number(bookingPayload.courtId),
    date: bookingPayload.date,
    startTime: bookingPayload.startTime,
    endTime: bookingPayload.endTime,
    paymentMethod: bookingPayload.paymentMethod || "Online",
  });
  return res.data;
}

/**
 * GET /api/Booking/{bookingId} — retrieves the full booking record
 */
export async function fetchBooking(bookingId) {
  const res = await apiClient.get(`/Booking/${bookingId}`);
  return res.data;
}

/**
 * GET /api/Booking/me — retrieves current user's bookings
 */
export async function fetchMyBookings() {
  const res = await apiClient.get("/Booking/me");
  return res.data;
}

/**
 * POST /api/Booking/{bookingId}/cancel — cancels a booking
 */
export async function cancelBooking(bookingId) {
  const res = await apiClient.post(`/Booking/${bookingId}/cancel`);
  return res.data;
}

/**
 * POST /api/Payments/intent — creates the Paymob intention for a booking
 */
export async function createPaymentIntent(bookingId) {
  const res = await apiClient.post("/Payments/intent", { bookingId: Number(bookingId) || bookingId });
  return res.data;
}

/**
 * GET /api/Payments/{paymentId} — retrieves payment details and status
 */
export async function getPaymentDetails(paymentId) {
  const res = await apiClient.get(`/Payments/${paymentId}`);
  return res.data;
}
