// DEFAULT_BOOKING is now only a loading-state skeleton, shown for the
// instant before the real booking loads from PadelBooking's
// GET /api/Booking/{bookingId} (see src/api/paymentApi.js). It is never the
// source of truth for price — that always comes from the API response.
export const DEFAULT_BOOKING = {
  id: null,
  image: "/images/booking-zamalek-pitch.jpg",
  venueName: "Loading booking…",
  location: "",
  sport: "",
  sportMeta: "",
  date: "",
  time: "",
  duration: "",
  currency: "EGP",
  pricing: {
    pitchFee: 0,
    serviceFee: 0,
    taxRate: 0,
  },
};

export const DEFAULT_USER_INFO = {
  fullName: "",
  email: "",
  phone: "",
};

// PadelBooking's GET /api/Booking/{bookingId} response shape for
// venue/date/price fields isn't spelled out in API_FLOW.md (its example
// response is just `{ "bookingId": 101, "status": "Pending", ... }`), so
// this reads a handful of likely field names defensively and falls back
// gracefully. Adjust the field names on the right if your real payload
// uses different ones.
export function mapBookingResponse(apiBooking) {
  if (!apiBooking) return DEFAULT_BOOKING;

  const pricing = apiBooking.pricing || apiBooking.priceBreakdown || {};
  const pitchFee =
    pricing.pitchFee ?? apiBooking.pitchFee ?? apiBooking.price ?? apiBooking.courtPrice ?? 0;
  const serviceFee = pricing.serviceFee ?? apiBooking.serviceFee ?? 0;
  const taxRate = pricing.taxRate ?? apiBooking.taxRate ?? 0;

  return {
    id: apiBooking.bookingId ?? apiBooking.id,
    image: apiBooking.image || apiBooking.venueImage || DEFAULT_BOOKING.image,
    venueName: apiBooking.venueName || apiBooking.facilityName || apiBooking.clubName || "Booking",
    location: apiBooking.location || apiBooking.address || "",
    sport: apiBooking.sport || apiBooking.sportType || "",
    sportMeta: apiBooking.sportMeta || "",
    date: apiBooking.date || "",
    time:
      apiBooking.time ||
      (apiBooking.startTime && apiBooking.endTime
        ? `${apiBooking.startTime} - ${apiBooking.endTime}`
        : ""),
    duration: apiBooking.duration || "",
    currency: apiBooking.currency || "EGP",
    pricing: { pitchFee, serviceFee, taxRate },
    status: apiBooking.status,
  };
}
