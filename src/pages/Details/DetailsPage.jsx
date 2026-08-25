import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DetailsPage.css";

import { fetchClubs, fetchClubDetails, fetchClubCourts, fetchClubAvailability } from "../../api/clubApi";
import { createBooking } from "../../api/paymentApi";
import { useAuth } from "../../features/auth/hooks/useAuth";

// ================= IMAGES & ASSETS =================
import mainContentFallback from "../../assets/details/Main Content.png";
import wifiIcon from "../../assets/details/wifi-icon.png";
import parkingIcon from "../../assets/details/parking-icon.png";
import showerIcon from "../../assets/details/shower-icon.png";
import lockerIcon from "../../assets/details/locker-icon.png";
import cafeIcon from "../../assets/details/cafe-icon.png";
import viewingAreaIcon from "../../assets/details/viewing area-icon.png";

import locationImage from "../../assets/details/location.png";
import clockIcon from "../../assets/details/clock-icon.png";

import footballCourt from "../../assets/details/football-court.png";
import padelCourt from "../../assets/details/padel-court.png";

import lockerRoom from "../../assets/details/locker-room.png";
import pitchNight from "../../assets/details/pitch-night.png";
import sportsCafe from "../../assets/details/sports-cafe.png";

const SURFACE_MAP = {
  1: "Clay",
  2: "Panoramic Glass",
  3: "Acrylic",
  4: "Hard Court",
  5: "Artificial Turf",
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

export default function DetailsPage() {
  const navigate = useNavigate();
  const { id = "3" } = useParams();
  const { isAuthenticated } = useAuth();

  const [clubId, setClubId] = useState(3);
  const [club, setClub] = useState(null);
  const [courts, setCourts] = useState([]);
  const [availability, setAvailability] = useState([]);
  
  // Date selection (default today)
  const todayIso = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(todayIso);

  // Selected time slot map: { [courtId]: slotObject }
  const [selectedSlots, setSelectedSlots] = useState({});

  // Loading & error states
  const [isLoading, setIsLoading] = useState(true);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [bookingCourtId, setBookingCourtId] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // 1. Resolve club ID & fetch club details + courts
  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setErrorMsg("");

    async function loadClub() {
      try {
        let resolvedId = Number(id);

        // If ID is a string slug (e.g. 'zamalek-club'), lookup ID from clubs list
        if (isNaN(resolvedId)) {
          const allClubs = await fetchClubs();
          const matched = allClubs.find((c) =>
            c.name?.toLowerCase().includes("zamalek") ||
            c.name?.toLowerCase().replace(/\s+/g, "-") === id.toLowerCase()
          );
          resolvedId = matched?.id || 3;
        }

        if (cancelled) return;
        setClubId(resolvedId);

        // Fetch club details and courts in parallel
        const [clubData, courtsData] = await Promise.all([
          fetchClubDetails(resolvedId).catch(() => null),
          fetchClubCourts(resolvedId).catch(() => []),
        ]);

        if (cancelled) return;

        if (clubData) {
          setClub(clubData);
          // Combine courts from direct endpoint or club details
          const mergedCourts = courtsData?.length
            ? courtsData
            : clubData.courts || [];
          setCourts(mergedCourts);
        } else {
          // Fallback if club 404
          setClub({
            id: resolvedId,
            name: "Zamalek Padel & Football Complex",
            description: "Professional turf and padel courts with tournament facilities.",
            address: "26th of July St, Zamalek, Giza",
            openTime: "09:00:00",
            closeTime: "23:00:00",
          });
        }
      } catch (err) {
        if (!cancelled) {
          setErrorMsg("Could not load club details from server.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadClub();
    return () => {
      cancelled = true;
    };
  }, [id]);

  // 2. Fetch live court availability whenever clubId or selectedDate changes
  useEffect(() => {
    if (!clubId) return;
    let cancelled = false;
    setLoadingAvailability(true);

    const queryDate = `${selectedDate}T00:00:00Z`;
    fetchClubAvailability(clubId, queryDate)
      .then((availList) => {
        if (cancelled) return;
        const list = Array.isArray(availList) ? availList : [];
        setAvailability(list);

        // Auto-select first available slot for each court if not selected
        setSelectedSlots((prev) => {
          const updated = { ...prev };
          list.forEach((slot) => {
            if (slot.isAvailable && !updated[slot.courtId]) {
              updated[slot.courtId] = slot;
            }
          });
          return updated;
        });
      })
      .catch(() => {
        if (!cancelled) setAvailability([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingAvailability(false);
      });

    return () => {
      cancelled = true;
    };
  }, [clubId, selectedDate]);

  const handleGetDirections = () => {
    const query = encodeURIComponent(club?.address || "26 July Corridor, Zamalek, Cairo");
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
  };

  const handleCallClub = () => {
    window.location.href = `tel:${club?.phoneNumber || "+201200003333"}`;
  };

  // Generate quick date chips for next 5 days
  const dateChips = Array.from({ length: 5 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const iso = d.toISOString().split("T")[0];
    const label = i === 0 ? "Today" : i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short", month: "numeric", day: "numeric" });
    return { iso, label };
  });

  const handleSelectSlot = (courtId, slot) => {
    setSelectedSlots((prev) => ({
      ...prev,
      [courtId]: slot,
    }));
  };

  /**
   * Real Booking Creation:
   * Trigger POST /api/Booking and navigate directly to /payment?bookingId={bookingId}
   */
  const handleBookCourt = async (court) => {
    setErrorMsg("");
    const selectedSlot = selectedSlots[court.id];

    if (!selectedSlot) {
      setErrorMsg(`Please select an available time slot for ${court.name}.`);
      return;
    }

    if (!isAuthenticated) {
      // Store intended booking in sessionStorage and redirect to login
      sessionStorage.setItem(
        "derby_pending_booking",
        JSON.stringify({
          clubId,
          courtId: court.id,
          selectedDate,
          selectedSlot,
        })
      );
      navigate("/login?redirect=" + encodeURIComponent(window.location.pathname));
      return;
    }

    setBookingCourtId(court.id);

    try {
      const payload = {
        facilityId: Number(clubId),
        courtId: Number(court.id),
        date: `${selectedDate}T00:00:00Z`,
        startTime: selectedSlot.startTime,
        endTime: selectedSlot.endTime,
        paymentMethod: "Online",
      };

      const res = await createBooking(payload);
      const bookingId = res.bookingId ?? res.id;

      if (!bookingId) {
        throw new Error("Failed to retrieve booking ID from server response.");
      }

      // Navigate to payment page with bookingId
      navigate(`/payment?bookingId=${bookingId}`, {
        state: {
          booking: {
            id: bookingId,
            venueName: club?.name || "Derby Club",
            courtName: court.name,
            location: club?.address || "Cairo, Egypt",
            date: selectedDate,
            time: `${formatTimeSlot(selectedSlot.startTime)} - ${formatTimeSlot(selectedSlot.endTime)}`,
            duration: "60 mins",
            amount: selectedSlot.price || court.pricePerHour || 300,
            currency: "EGP",
            image: court.isIndoor ? padelCourt : footballCourt,
            sport: court.name?.toLowerCase().includes("padel") ? "Padel" : "Football",
            facilityId: clubId,
            courtId: court.id,
          },
        },
      });
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.title ||
        err?.message ||
        "Failed to create booking. The selected slot may already be reserved.";
      setErrorMsg(msg);
    } finally {
      setBookingCourtId(null);
    }
  };

  const heroImage = club?.coverImage || mainContentFallback;

  return (
    <div className="details-page">
      {/* ================= HERO ================= */}
      <section
        className="details-hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      />

      {/* ================= MAIN CONTENT ================= */}
      <main className="details-main">
        {/* ================= LEFT COLUMN ================= */}
        <div className="left-column">
          {/* Error Banner */}
          {errorMsg && (
            <div className="details-alert-box">
              <span>⚠️ {errorMsg}</span>
              <button onClick={() => setErrorMsg("")}>✕</button>
            </div>
          )}

          {/* CLUB OVERVIEW */}
          <section className="details-card overview-card">
            <h2>{club?.name || "Club Overview"}</h2>
            <p>
              {club?.description ||
                "Experience premier athletic facilities at the heart of the city with meticulously maintained pitches and courts."}
            </p>
          </section>

          {/* FACILITIES */}
          <section className="details-card facilities-card">
            <h2>Facilities &amp; Amenities</h2>
            <div className="facilities-grid">
              <div className="facility-item">
                <img src={wifiIcon} alt="Free WiFi" />
                <span>Free WiFi</span>
              </div>
              <div className="facility-item">
                <img src={parkingIcon} alt="Parking" />
                <span>Parking</span>
              </div>
              <div className="facility-item">
                <img src={showerIcon} alt="Showers" />
                <span>Showers</span>
              </div>
              <div className="facility-item">
                <img src={lockerIcon} alt="Locker Rooms" />
                <span>Locker Rooms</span>
              </div>
              <div className="facility-item">
                <img src={cafeIcon} alt="Sports Cafe" />
                <span>Sports Cafe</span>
              </div>
              <div className="facility-item">
                <img src={viewingAreaIcon} alt="Viewing Area" />
                <span>Viewing Area</span>
              </div>
            </div>
          </section>

          {/* DATE SELECTOR BAR */}
          <section className="details-card date-selection-card">
            <div className="date-picker-header">
              <h2>Select Match Date</h2>
              <input
                type="date"
                className="date-input-field"
                min={todayIso}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
            <div className="date-chips-row">
              {dateChips.map((chip) => (
                <button
                  key={chip.iso}
                  type="button"
                  className={`date-chip ${selectedDate === chip.iso ? "active" : ""}`}
                  onClick={() => setSelectedDate(chip.iso)}
                >
                  {chip.label}
                </button>
              ))}
            </div>
          </section>

          {/* AVAILABLE COURTS */}
          <section>
            <div className="courts-header-row">
              <h2 className="available-title">Available Courts</h2>
              {loadingAvailability && (
                <span className="availability-loading-badge">Refreshing slots…</span>
              )}
            </div>

            {isLoading ? (
              <div className="details-loading-placeholder">Loading live court details…</div>
            ) : courts.length === 0 ? (
              <div className="details-card">
                <p className="text-gray-400">No courts listed for this facility currently.</p>
              </div>
            ) : (
              <div className="courts-list">
                {courts.map((court) => {
                  const courtSlots = availability.filter((s) => s.courtId === court.id);
                  const selectedSlot = selectedSlots[court.id];
                  const isBookingThis = bookingCourtId === court.id;
                  const courtImage = court.isIndoor ? padelCourt : footballCourt;
                  const sportTag = court.name?.toLowerCase().includes("padel") ? "Padel" : "Football";
                  const surface = SURFACE_MAP[court.surfaceType] || "Standard Turf";

                  return (
                    <div className="court-card" key={court.id}>
                      <img
                        src={courtImage}
                        alt={court.name}
                        className="court-image"
                      />

                      <div className="court-info">
                        <div className="court-top">
                          <div>
                            <h3>{court.name}</h3>
                            <p className="court-description">
                              {court.isIndoor ? "Indoor Court" : "Outdoor Pitch"} • {surface} • Capacity: {court.capacity || 4} players
                            </p>
                          </div>
                          <span className="court-tag">{sportTag}</span>
                        </div>

                        {/* Available Time Slots Grid */}
                        <div className="slots-section">
                          <span className="slots-title">Available Time Slots ({selectedDate})</span>
                          {courtSlots.length === 0 ? (
                            <div className="slots-empty-notice">
                              {loadingAvailability ? "Checking slots..." : "No available slots on this date."}
                            </div>
                          ) : (
                            <div className="slots-grid">
                              {courtSlots.map((slot, idx) => {
                                const isSelected =
                                  selectedSlot?.startTime === slot.startTime &&
                                  selectedSlot?.endTime === slot.endTime;
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    disabled={!slot.isAvailable}
                                    className={`slot-chip ${isSelected ? "selected" : ""} ${!slot.isAvailable ? "disabled" : ""}`}
                                    onClick={() => handleSelectSlot(court.id, slot)}
                                  >
                                    {formatTimeSlot(slot.startTime)}
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>

                        {/* Price & Book Action */}
                        <div className="court-bottom-bar">
                          <div className="court-price-display">
                            <span className="price-label">Price per hour</span>
                            <strong className="price-value">
                              EGP {selectedSlot?.price || court.pricePerHour || 300}
                            </strong>
                          </div>

                          <button
                            className="book-button"
                            disabled={isBookingThis || !selectedSlot}
                            onClick={() => handleBookCourt(court)}
                          >
                            {isBookingThis ? "Booking..." : `Book ${court.name}`}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* GALLERY */}
          <section>
            <h2 className="gallery-title">Gallery</h2>
            <div className="gallery">
              <img src={lockerRoom} alt="Locker Room" />
              <img src={pitchNight} alt="Pitch at Night" />
              <img src={sportsCafe} alt="Sports Cafe" />
            </div>
          </section>
        </div>

        {/* ================= RIGHT COLUMN ================= */}
        <aside className="right-column">
          {/* LOCATION */}
          <section className="details-card map-card">
            <img src={locationImage} alt="Location Map" className="map-image" />
            <div className="location-content">
              <h2>Location</h2>
              <p>
                {club?.address || "26 July Corridor, Zamalek, Cairo"}
                <br />
                Egypt
              </p>
              <div className="location-buttons">
                <button onClick={handleGetDirections}>Get Directions</button>
                <button onClick={handleCallClub}>Call Club</button>
              </div>
            </div>
          </section>

          {/* HOURS */}
          <section className="details-card hours-card">
            <h2>
              <span className="hours-icon">
                <img src={clockIcon} alt="Clock" />
              </span>
              Hours
            </h2>
            <div className="hours-row">
              <span>Open - Close</span>
              <span>
                {formatTimeSlot(club?.openTime || "09:00:00")} - {formatTimeSlot(club?.closeTime || "23:00:00")}
              </span>
            </div>
            <div className="hours-row">
              <span>Monday - Sunday</span>
              <span>Daily Operations</span>
            </div>
          </section>
        </aside>
      </main>
    </div>
  );
}
