import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  CircleDot,
  Grid3X3,
  Heart,
  Map,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  Trophy,
} from "lucide-react";

const initialVenues = [
  {
    id: "zamalek-club",
    name: "Zamalek Club",
    rating: "4.9",
    location: "Zamalek, Cairo",
    city: "Cairo",
    price: "250 EGP",
    live: true,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=900&q=85",
    sports: ["football", "padel"],
  },
  {
    id: "smash-club",
    name: "Smash Club",
    rating: "4.7",
    location: "Smouha, Alexandria",
    city: "Alexandria",
    price: "400 EGP",
    image:
      "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=85",
    sports: ["padel"],
  },
  {
    id: "victory-field",
    name: "Victory Field",
    rating: "4.8",
    location: "Maadi, Cairo",
    city: "Cairo",
    price: "300 EGP",
    image:
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=900&q=85",
    sports: ["padel", "football"],
  },
];

const moreVenues = [
  {
    id: "giza-arena",
    name: "Giza Arena",
    rating: "4.6",
    location: "Dokki, Giza",
    city: "Giza",
    price: "280 EGP",
    image:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=900&q=85",
    sports: ["football"],
  },
  {
    id: "cairo-padel-house",
    name: "Cairo Padel House",
    rating: "4.8",
    location: "Heliopolis, Cairo",
    city: "Cairo",
    price: "350 EGP",
    image:
      "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?auto=format&fit=crop&w=900&q=85",
    sports: ["padel"],
  },
  {
    id: "alex-sports-yard",
    name: "Alex Sports Yard",
    rating: "4.5",
    location: "Stanley, Alexandria",
    city: "Alexandria",
    price: "220 EGP",
    live: true,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=900&q=85",
    sports: ["football", "padel"],
  },
];

const sportIcons = {
  football: CircleDot,
  padel: Trophy,
};

const cityOptions = ["All Cities", "Cairo", "Giza", "Alexandria"];
const sportOptions = ["All Sports", "Football", "Padel"];

function ControlButton({ children, active = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "inline-flex h-8 items-center gap-2 rounded-full px-4 font-mono text-[11px] font-semibold transition",
        active
          ? "bg-[#252a2d] text-white"
          : "text-[#c7c8bd] hover:bg-white/5 hover:text-white",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function VenueCard({ venue, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();

  return (
    <article className="overflow-hidden rounded-[22px] border border-[#455038]/80 bg-[#2a2e32] shadow-[0_18px_38px_rgba(0,0,0,0.28)]">
      <div className="relative h-[190px] overflow-hidden bg-black">
        <img
          src={venue.image}
          alt={venue.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/15" />

        {venue.live && (
          <span className="absolute left-4 top-4 inline-flex h-5 items-center gap-1.5 rounded-full border border-[#b7ff18]/70 bg-[#0f1410]/90 px-2.5 font-mono text-[11px] font-bold text-[#b7ff18]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#b7ff18]" />
            Live
          </span>
        )}

        <button
          type="button"
          aria-label={`${isFavorite ? "Remove" : "Save"} ${venue.name}`}
          aria-pressed={isFavorite}
          onClick={() => onToggleFavorite(venue.id)}
          className={[
            "absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border bg-[#101317]/70 transition hover:border-[#b7ff18] hover:text-[#b7ff18]",
            isFavorite
              ? "border-[#b7ff18] text-[#b7ff18]"
              : "border-white/25 text-white",
          ].join(" ")}
        >
          <Heart size={19} className={isFavorite ? "fill-[#b7ff18]" : ""} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-normal text-[#f0f1ee]">
              {venue.name}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-sm text-[#c4c5b8]">
              <MapPin size={14} className="text-[#b9bda7]" />
              {venue.location}
            </p>
          </div>

          <span className="mt-1 inline-flex h-6 items-center gap-1.5 rounded bg-[#101318] px-2 font-mono text-[11px] font-bold text-white">
            <Star size={12} className="fill-[#b7ff18] text-[#b7ff18]" />
            {venue.rating}
          </span>
        </div>

        <div className="mt-6 flex gap-3">
          {venue.sports.map((sport) => {
            const Icon = sportIcons[sport];
            return (
              <span
                key={sport}
                className="flex h-8 w-8 items-center justify-center rounded border border-[#6c745d]/70 bg-[#15181b] text-[#d7dcc9]"
              >
                <Icon size={17} />
              </span>
            );
          })}
        </div>

        <div className="mt-9 flex items-end justify-between gap-4 border-t border-[#566044]/70 pt-5">
          <div>
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a6a99a]">
              Starting From
            </p>
            <p className="text-2xl font-extrabold leading-none text-[#b7ff18]">
              {venue.price}
              <span className="ml-1 text-sm font-bold text-white">/hr</span>
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/details/${venue.id}`)}
            className="h-8 shrink-0 rounded-full border border-[#b7ff18] px-5 font-mono text-[11px] font-bold text-[#b7ff18] transition hover:bg-[#b7ff18] hover:text-black"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PricingPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("Cairo");
  const [selectedSport, setSelectedSport] = useState("Football");
  const [liveOnly, setLiveOnly] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [loadedVenues, setLoadedVenues] = useState(initialVenues);
  const [favoriteIds, setFavoriteIds] = useState([]);

  const filteredVenues = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    const activeSport = selectedSport.toLowerCase();

    return loadedVenues.filter((venue) => {
      const matchesSearch =
        !query ||
        venue.name.toLowerCase().includes(query) ||
        venue.location.toLowerCase().includes(query);
      const matchesCity =
        selectedCity === "All Cities" || venue.city === selectedCity;
      const matchesSport =
        selectedSport === "All Sports" || venue.sports.includes(activeSport);
      const matchesLive = !liveOnly || venue.live;

      return matchesSearch && matchesCity && matchesSport && matchesLive;
    });
  }, [loadedVenues, liveOnly, searchTerm, selectedCity, selectedSport]);

  const activeChips = [
    selectedCity !== "All Cities" ? { label: selectedCity, type: "city" } : null,
    selectedSport !== "All Sports"
      ? { label: selectedSport, type: "sport" }
      : null,
    liveOnly ? { label: "Live", type: "live" } : null,
  ].filter(Boolean);

  const handleRemoveChip = (type) => {
    if (type === "city") setSelectedCity("All Cities");
    if (type === "sport") setSelectedSport("All Sports");
    if (type === "live") setLiveOnly(false);
  };

  const handleToggleFavorite = (venueId) => {
    setFavoriteIds((current) =>
      current.includes(venueId)
        ? current.filter((id) => id !== venueId)
        : [...current, venueId]
    );
  };

  const handleLoadMore = () => {
    setLoadedVenues((current) => {
      const currentIds = new Set(current.map((venue) => venue.id));
      return [
        ...current,
        ...moreVenues.filter((venue) => !currentIds.has(venue.id)),
      ];
    });
  };

  const hasMoreVenues = loadedVenues.length < initialVenues.length + moreVenues.length;

  return (
    <section className="bg-[#111418] px-4 pb-14 pt-7 text-white sm:px-6 lg:pb-16">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-5 border-b border-white/5 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-normal text-[#f2f3ef] sm:text-5xl">
              Venues in Egypt
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#c8c9bb] sm:text-lg">
              Discover and book top-tier sports facilities across Cairo, Giza,
              and Alexandria. High-energy arenas await.
            </p>
          </div>

          <div className="flex w-fit items-center rounded-full border border-[#515846] bg-[#292d31] p-1">
            <ControlButton
              active={viewMode === "grid"}
              onClick={() => setViewMode("grid")}
            >
              <Grid3X3 size={13} />
              Grid
            </ControlButton>
            <ControlButton
              active={viewMode === "map"}
              onClick={() => setViewMode("map")}
            >
              <Map size={13} />
              Map
            </ControlButton>
          </div>
        </div>

        <div className="mt-6 rounded-[22px] border border-[#515846] bg-[#202428] p-4">
          <div className="grid gap-3 lg:grid-cols-[1fr_auto_auto_auto]">
            <label className="flex h-12 min-w-0 items-center gap-3 rounded-full border border-[#59614d] bg-[#101318] px-5 text-[#c8c9bb] focus-within:border-[#b7ff18] focus-within:ring-2 focus-within:ring-[#b7ff18]/20">
              <Search size={18} />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search venues by name..."
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-[#a7aa9c]"
              />
            </label>

            <label className="relative flex h-12 items-center rounded-full border border-[#59614d] bg-[#101318] text-sm text-[#e6e7dc] transition hover:border-[#b7ff18]">
              <select
                value={selectedCity}
                onChange={(event) => setSelectedCity(event.target.value)}
                className="h-full appearance-none rounded-full bg-transparent px-5 pr-12 text-sm text-[#e6e7dc] outline-none"
                aria-label="Filter by city"
              >
                {cityOptions.map((city) => (
                  <option key={city} value={city} className="bg-[#101318]">
                    {city}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-5"
              />
            </label>

            <label className="relative flex h-12 items-center rounded-full border border-[#59614d] bg-[#101318] text-sm text-[#e6e7dc] transition hover:border-[#b7ff18]">
              <select
                value={selectedSport}
                onChange={(event) => setSelectedSport(event.target.value)}
                className="h-full appearance-none rounded-full bg-transparent px-5 pr-12 text-sm text-[#e6e7dc] outline-none"
                aria-label="Filter by sport"
              >
                {sportOptions.map((sport) => (
                  <option key={sport} value={sport} className="bg-[#101318]">
                    {sport}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute right-5"
              />
            </label>

            <button
              type="button"
              aria-pressed={liveOnly}
              onClick={() => setLiveOnly((current) => !current)}
              className={[
                "flex h-12 items-center justify-center gap-2 rounded-full border bg-[#101318] px-6 text-sm transition hover:border-[#b7ff18] hover:text-white",
                liveOnly
                  ? "border-[#b7ff18] text-[#b7ff18]"
                  : "border-[#59614d] text-[#e6e7dc]",
              ].join(" ")}
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2">
          {activeChips.map((chip) => (
            <button
              key={chip.type}
              type="button"
              onClick={() => handleRemoveChip(chip.type)}
              aria-label={`Remove ${chip.label} filter`}
              className="rounded-full bg-[#3a3f40] px-3 py-1 font-mono text-[11px] font-semibold text-[#d1d3c7] transition hover:text-white"
            >
              {chip.label} x
            </button>
          ))}
        </div>

        {viewMode === "grid" ? (
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                isFavorite={favoriteIds.includes(venue.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 overflow-hidden rounded-[22px] border border-[#455038]/80 bg-[#171b1f] p-6 shadow-[0_18px_38px_rgba(0,0,0,0.28)]">
            <div className="relative min-h-[420px] rounded-[18px] border border-[#515846] bg-[#101318]">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(183,255,24,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(183,255,24,0.06)_1px,transparent_1px)] bg-[size:44px_44px]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_30%,rgba(183,255,24,0.16),transparent_22%),radial-gradient(circle_at_68%_58%,rgba(22,67,109,0.32),transparent_28%)]" />

              <div className="relative flex min-h-[420px] flex-col justify-between p-6">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-[#b7ff18]">
                    Map View
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {filteredVenues.length} venues matched
                  </h2>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#c8c9bb]">
                    Explore the filtered venues across Cairo, Giza, and
                    Alexandria.
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-3">
                  {filteredVenues.map((venue) => (
                    <button
                      key={venue.id}
                      type="button"
                      onClick={() => navigate(`/details/${venue.id}`)}
                      className="rounded-xl border border-[#515846] bg-[#202428]/90 p-4 text-left transition hover:border-[#b7ff18]"
                    >
                      <span className="flex items-center gap-2 text-sm font-bold text-white">
                        <MapPin size={15} className="text-[#b7ff18]" />
                        {venue.name}
                      </span>
                      <span className="mt-2 block text-xs text-[#c8c9bb]">
                        {venue.location}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {filteredVenues.length === 0 && (
          <div className="mt-12 rounded-[22px] border border-[#455038]/80 bg-[#2a2e32] p-10 text-center">
            <h2 className="text-2xl font-bold text-white">No venues found</h2>
            <p className="mt-2 text-sm text-[#c8c9bb]">
              Try removing a chip or searching for another venue.
            </p>
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button
            type="button"
            onClick={handleLoadMore}
            disabled={!hasMoreVenues}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#515846] px-9 font-mono text-[11px] font-bold text-[#d5d7ca] transition hover:border-[#b7ff18] hover:text-[#b7ff18] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {hasMoreVenues ? "Load More Venues" : "All Venues Loaded"}
            <ChevronDown size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}
