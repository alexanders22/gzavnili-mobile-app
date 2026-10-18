import { create } from "zustand";
import { TOURS } from "@/data/tours";

type TourState = { activeId: string | null; step: number; start: (id: string) => void; stop: () => void };

/**
 * Tour state. The original highlights targets with a TourOverlay and taps through the
 * steps; that overlay is not ported yet, so starting a tour only records it for now.
 */
export const useTour = create<TourState>()((set) => ({
  activeId: null,
  step: 0,
  start: (id) => { if (TOURS.some((t) => t.id === id)) set({ activeId: id, step: 0 }); },
  stop: () => set({ activeId: null, step: 0 }),
}));
