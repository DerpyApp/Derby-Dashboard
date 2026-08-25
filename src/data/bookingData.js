import defaultBookingImage from "../assets/details/football-court.png";

export const DEFAULT_BOOKING = {
  id: null,
  image: defaultBookingImage,
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

function formatTimeSlot(timeStr) {
  if (!timeStr) return "";
  const parts = String(timeStr).split(":");
  if (parts.length < 2) return timeStr;
  let h = parseInt(parts[0], 10);
  const m = parts[1];
  const ampm = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${m} ${ampm}`;
}

function calculateDurationMinutes(startTime, endTime) {
  if (!startTime || !endTime) return "60 mins";
  const [h1, m1] = startTime.split(":").map(Number);
  const [h2, m2] = endTime.split(":").map(Number);
  if (isNaN(h1) || isNaN(h2)) return "60 mins";
  let mins = (h2 * 60 + (m2 || 0)) - (h1 * 60 + (m1 || 0));
  if (mins <= 0) mins += 24 * 60;
  return `${mins} mins`;
}

function formatDateString(dateStr) {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Maps raw backend GET /api/Booking/{id} or creation response to frontend view model
 */
export function mapBookingResponse(apiBooking) {
  if (!apiBooking) return DEFAULT_BOOKING;

  const pricing = apiBooking.pricing || apiBooking.priceBreakdown || {};
  const pitchFee =
    pricing.pitchFee ??
    apiBooking.totalPrice ??
    apiBooking.pitchFee ??
    apiBooking.price ??
    apiBooking.courtPrice ??
    0;
  const serviceFee = pricing.serviceFee ?? apiBooking.serviceFee ?? 0;
  const taxRate = pricing.taxRate ?? apiBooking.taxRate ?? 0;

  const rawDate = apiBooking.bookingDate || apiBooking.date;
  const formattedDate = formatDateString(rawDate);

  const rawStartTime = apiBooking.startTime;
  const rawEndTime = apiBooking.endTime;

  let formattedTime = apiBooking.time;
  if (!formattedTime && rawStartTime && rawEndTime) {
    formattedTime = `${formatTimeSlot(rawStartTime)} - ${formatTimeSlot(rawEndTime)}`;
  } else if (!formattedTime && rawStartTime) {
    formattedTime = formatTimeSlot(rawStartTime);
  }

  const duration =
    apiBooking.duration ||
    calculateDurationMinutes(rawStartTime, rawEndTime);

  const sportName =
    apiBooking.sport ||
    (apiBooking.courtName?.toLowerCase().includes("padel")
      ? "Padel"
      : apiBooking.courtName?.toLowerCase().includes("football")
      ? "Football"
      : "Sports");

  return {
    id: apiBooking.id ?? apiBooking.bookingId,
    image: apiBooking.coverImage || apiBooking.image || apiBooking.venueImage || defaultBookingImage,
    venueName:
      apiBooking.clubName ||
      apiBooking.venueName ||
      apiBooking.facilityName ||
      "Derby Club",
    location: apiBooking.location || apiBooking.address || "Cairo, Egypt",
    sport: sportName,
    sportMeta: apiBooking.courtName || apiBooking.sportMeta || "",
    courtName: apiBooking.courtName || "",
    date: formattedDate || "",
    time: formattedTime || "",
    rawDate,
    rawStartTime,
    rawEndTime,
    duration,
    currency: apiBooking.currency || "EGP",
    pricing: { pitchFee, serviceFee, taxRate },
    status: apiBooking.status || "Pending",
    paymentStatus: apiBooking.paymentStatus,
    userId: apiBooking.userId,
    facilityId: apiBooking.facilityId,
    courtId: apiBooking.courtId,
  };
}
