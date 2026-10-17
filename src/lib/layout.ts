import { useWindowDimensions } from "react-native";

export const DESKTOP_BREAKPOINT = 1000;
export const SIDEBAR_WIDTH = 260;
export const CONTENT_MAX = 980;

export function useIsDesktop() {
  return useWindowDimensions().width >= DESKTOP_BREAKPOINT;
}

export function useColumns() {
  const { width } = useWindowDimensions();
  if (width >= 1500) return 4;
  if (width >= DESKTOP_BREAKPOINT) return 3;
  return 2;
}
