import { formatCurrency } from "./pricing";

/**
 * Builds a plain-text receipt from data verified by the backend (server
 * totals + Paymob transaction id) — never from client-only figures.
 */
export function buildReceiptText({ bookingRef, booking, totals, transactionId, method, cardLast4 }) {
  const methodLabel =
    method === "card"
      ? `Card ending in ${cardLast4 || "----"}`
      : method
      ? method.charAt(0).toUpperCase() + method.slice(1)
      : "Paymob";

  const lines = [
    "==============================",
    "        DERBY — RECEIPT",
    "==============================",
    "",
    `Booking Reference: ${bookingRef}`,
    `Status: Confirmed`,
    `Payment: Paid in full`,
    transactionId ? `Paymob Transaction ID: ${transactionId}` : null,
    "",
    "--- Booking Details ---",
    `Venue: ${booking.venueName}`,
    `Location: ${booking.location}`,
    `Sport: ${booking.sport}${booking.sportMeta ? " • " + booking.sportMeta : ""}`,
    `Date: ${booking.date}`,
    `Time: ${booking.time}`,
    `Duration: ${booking.duration}`,
    "",
    "--- Payment ---",
    `Method: ${methodLabel}`,
    "",
    "--- Price Breakdown ---",
    `Pitch Fee: ${formatCurrency(totals.pitchFee, booking.currency)}`,
    `Service Fee: ${formatCurrency(totals.serviceFee, booking.currency)}`,
    totals.discount > 0 ? `Discount: -${formatCurrency(totals.discount, booking.currency)}` : null,
    `Tax: ${formatCurrency(totals.tax, booking.currency)}`,
    `Total Paid: ${formatCurrency(totals.total, booking.currency)}`,
    "",
    "Thank you for booking with DERBY.",
    "==============================",
  ].filter(Boolean);

  return lines.join("\n");
}

export function downloadReceipt(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}
