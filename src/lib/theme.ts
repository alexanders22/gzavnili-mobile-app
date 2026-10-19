export const palette = {
  green: "#6AD67D",
  greenStrong: "#5FC170",
  greenDeep: "#2A5632",
  greenSoft: "#C3EFCB",
  blue: "#0081F1",
  orange: "#F76808",
  red: "#E5484D",
  ok: "#49A65D",
};

export const lightTheme = {
  ...palette,
  tint: "#F0FBF2",
  tint2: "#E1F7E5",
  navy: "#121D25",
  navySoft: "#1C2A35",
  cream: "#FFFDFA",
  paper: "#F3F1EC",
  card: "#FFFFFF",
  line: "#E3E1DC",
  lineSoft: "#EFEDE7",
  ink: "#121D25",
  mut: "#525C63",
  faint: "#98948A",
  brandText: "#40804B",
  pinkTint: "#FBEFEC",
  pinkInk: "#B4382F",
  skyTint: "#E9F1FA",
  skyInk: "#1F4E8C",
};

// Dark = the landing's liquid-glass look: near-black page, translucent white surfaces, glowing green.
export const darkTheme: Theme = {
  ...palette,
  tint: "rgba(106,214,125,0.07)",
  tint2: "rgba(106,214,125,0.16)",
  navy: "rgba(255,255,255,0.12)",
  navySoft: "rgba(255,255,255,0.18)",
  cream: "#06080C",
  paper: "rgba(255,255,255,0.035)",
  card: "rgba(255,255,255,0.055)",
  line: "rgba(255,255,255,0.09)",
  lineSoft: "rgba(255,255,255,0.06)",
  ink: "#F3F5F8",
  mut: "#949DA9",
  faint: "#66707C",
  brandText: "#8BDF9A",
  pinkTint: "rgba(255,130,120,0.07)",
  pinkInk: "#FF9C93",
  skyTint: "rgba(120,165,255,0.07)",
  skyInk: "#9CC0FF",
};

/** Glass edge highlight and glow used by dark-theme surfaces. */
export const glass = { edge: "rgba(255,255,255,0.22)", border: "rgba(255,255,255,0.10)", blur: "blur(22px) saturate(170%)", navBg: "rgba(10,12,16,0.55)" } as const;

export type Theme = typeof lightTheme;

export const radius = { sm: 12, md: 16, lg: 24, pill: 999 } as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 } as const;
export const font = { s11: 11, s12: 12, s13: 13, s14: 14, s16: 16, s18: 18, s22: 22, s28: 28 } as const;
