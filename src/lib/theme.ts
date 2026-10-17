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

export const darkTheme: Theme = {
  ...palette,
  tint: "#15291D",
  tint2: "#1B3524",
  navy: "#070D12",
  navySoft: "#101A21",
  cream: "#0E161C",
  paper: "#16222B",
  card: "#16222B",
  line: "#263844",
  lineSoft: "#1D2C36",
  ink: "#EDF2F5",
  mut: "#A0B1BD",
  faint: "#71838F",
  brandText: "#88DE97",
  pinkTint: "#2B1F22",
  pinkInk: "#F2A39C",
  skyTint: "#17263A",
  skyInk: "#9CC3F2",
};

export type Theme = typeof lightTheme;

export const radius = { sm: 12, md: 16, lg: 24, pill: 999 } as const;
export const space = { xs: 4, sm: 8, md: 12, lg: 16, xl: 20, xxl: 28 } as const;
export const font = { s11: 11, s12: 12, s13: 13, s14: 14, s16: 16, s18: 18, s22: 22, s28: 28 } as const;
