
import { apiClient } from "./apiClient";

// This page now talks directly to the PadelBooking .NET API described in
// API_FLOW.md (Step 3 — Booking, Step 4 — Payment). The old local
// Express/Paymob server is gone: PadelBooking creates the Paymob Intention
// itself server-side and hands back what we need to render checkout.

/**
 * GET /api/Booking/{bookingId} — used to populate the summary shown in the
 * Information and Payment steps (venue, date/time, price).
 */
export async function fetchBooking(bookingId) {
  const res = await apiClient.get(`/Booking/${bookingId}`);
  return res.data;
}

/**
 * POST /api/Payments/intent — creates the Paymob Intention for this booking.
 * Response includes `clientSecret` (for the embedded Pixel form) and
 * `paymentUrl` (hosted fallback). Any extra fields the backend adds (e.g. a
 * payment id to use with getPaymentDetails below) are passed through as-is.
 */
export async function createPaymentIntent(bookingId) {
  const res = await apiClient.post("/Payments/intent", { bookingId });
  return res.data;
}

/**
 * GET /api/Payments/{paymentId} — polled after the user completes the Pixel
 * form (or returns from the hosted Paymob page) to check the verified status.
 */
export async function getPaymentDetails(paymentId) {
  const res = await apiClient.get(`/Payments/${paymentId}`);
  return res.data;
}
