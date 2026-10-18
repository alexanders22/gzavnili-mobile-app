// Pickup-office helpers (ported from the original bundle, module 1165).
import type { Order, PickupLocation } from "./hooks";

export const PICKUP_STAGES = [
  { status: null, en: "At the warehouse", ka: "საწყობშია" },
  { status: "OFFICE PICKED UP", en: "On the way to the office", ka: "ოფისისკენ მიდის" },
  { status: "OFFICE CHECKED", en: "Checked in at the office", ka: "ოფისში მიღებულია" },
  { status: "READY FOR OFFICE PICK UP", en: "Ready for pickup", ka: "მზადაა გასატანად" },
];

export function pickupStage(o: Order) {
  if (o.status === "DELIVERED") return PICKUP_STAGES.length;
  const i = PICKUP_STAGES.findIndex((s) => s.status === (o.pickup_status ?? null));
  return Math.max(0, i);
}

const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

export function hoursSummary(l: PickupLocation) {
  const first = (days: string[]) => days.map((d) => l.working_hours.find((h) => h.day === d)).find((h) => h?.is_active && h.opens_at && h.closes_at);
  const fmt = (h?: { opens_at?: string | null; closes_at?: string | null }) => (h ? `${h.opens_at}–${h.closes_at}` : null);
  return { weekdays: fmt(first(["monday", "tuesday", "wednesday", "thursday", "friday"])), weekend: fmt(first(["saturday", "sunday"])) };
}

/** Open right now in Tbilisi time (UTC+4). */
export function openNow(l: PickupLocation, now = new Date()) {
  const tbs = new Date(now.getTime() + 60_000 * (now.getTimezoneOffset() + 240));
  const h = l.working_hours.find((x) => x.day === DAYS[tbs.getDay()]);
  if (!h?.is_active || !h.opens_at || !h.closes_at) return false;
  const hhmm = `${String(tbs.getHours()).padStart(2, "0")}:${String(tbs.getMinutes()).padStart(2, "0")}`;
  return hhmm >= h.opens_at && hhmm < h.closes_at;
}

export const locationName = (l: PickupLocation, ka: boolean) => (ka && l.alias_ka) || l.alias || l.address;
export const locationAddress = (l: PickupLocation, ka: boolean) => (ka && l.address_ka) || l.address;
export const mapsUrl = (l: PickupLocation) => `https://www.google.com/maps/search/?api=1&query=${l.latitude},${l.longitude}`;
