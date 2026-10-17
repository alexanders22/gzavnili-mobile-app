import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { MODULES } from "./modules";

export type Lang = "ka" | "en";
export type Mode = "light" | "dark" | "system";

type Settings = {
  lang: Lang;
  mode: Mode;
  enabled: Record<string, boolean>;
  notifications: { parcels: boolean; promos: boolean; loyalty: boolean };
  sounds: boolean;
  setLang: (l: Lang) => void;
  setMode: (m: Mode) => void;
  toggleModule: (id: string) => void;
  isEnabled: (id: string) => boolean;
  toggleNotification: (k: keyof Settings["notifications"]) => void;
  toggleSounds: () => void;
};

const defaultEnabled = Object.fromEntries(MODULES.filter((m) => !m.core).map((m) => [m.id, true]));

export const useSettings = create<Settings>()(
  persist(
    (set, get) => ({
      lang: "ka",
      mode: "light",
      enabled: defaultEnabled,
      notifications: { parcels: true, promos: true, loyalty: false },
      sounds: true,
      setLang: (lang) => set({ lang }),
      setMode: (mode) => set({ mode }),
      toggleModule: (id) => set((s) => ({ enabled: { ...s.enabled, [id]: !s.enabled[id] } })),
      isEnabled: (id) => {
        const m = MODULES.find((x) => x.id === id);
        return !!m && (!!m.core || get().enabled[id] !== false);
      },
      toggleNotification: (k) => set((s) => ({ notifications: { ...s.notifications, [k]: !s.notifications[k] } })),
      toggleSounds: () => set((s) => ({ sounds: !s.sounds })),
    }),
    {
      name: "gz.settings",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (s) => ({ lang: s.lang, mode: s.mode, enabled: s.enabled, notifications: s.notifications, sounds: s.sounds }),
    },
  ),
);

/** Tab modules the user has switched on (core ones are always on). */
export function useTabModules() {
  const enabled = useSettings((s) => s.enabled);
  return MODULES.filter((m) => m.tab && (m.core || enabled[m.id] !== false));
}

/** Dark or light after resolving the "system" mode against the device scheme. */
export function useIsDark() {
  const mode = useSettings((s) => s.mode);
  const scheme = useColorScheme();
  return mode === "system" ? scheme === "dark" : mode === "dark";
}
