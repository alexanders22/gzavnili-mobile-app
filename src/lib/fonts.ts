import { Platform, TextStyle } from "react-native";
import type { Lang } from "./settings";

export const FONT_ASSETS = { BOG: require("../../assets/fonts/BOG-UltraBold.ttf"), "DM Maro": require("../../assets/fonts/DM-Maro.ttf") };

const WEIGHT: Record<string, 400 | 500 | 600 | 700 | 800> = {
  normal: 400, "100": 400, "200": 400, "300": 400, "400": 400, "500": 500, "600": 600,
  bold: 700, "700": 700, "800": 800, "900": 800,
};
const LATIN = {
  400: "Geist_400Regular", 500: "Geist_500Medium", 600: "Geist_600SemiBold", 700: "Geist_700Bold", 800: "Geist_800ExtraBold",
};
const GEO = {
  400: "NotoSansGeorgian_400Regular", 500: "NotoSansGeorgian_500Medium", 600: "NotoSansGeorgian_600SemiBold",
  700: "NotoSansGeorgian_700Bold", 800: "NotoSansGeorgian_800ExtraBold",
};

// On web a comma-separated family list gives per-glyph fallback (Latin ↔ Georgian).
// Native only accepts one family, so take the primary one there.
const stack = (a: string, b: string) => (Platform.OS === "web" ? `${a}, ${b}` : a);

export function textFont(lang: Lang, weight: TextStyle["fontWeight"] | string = "400"): TextStyle {
  const w = WEIGHT[String(weight ?? "400")] ?? 400;
  return { fontFamily: lang === "ka" ? stack(GEO[w], LATIN[w]) : stack(LATIN[w], GEO[w]), fontWeight: undefined };
}

export function displayFont(lang: Lang): TextStyle {
  return lang === "ka"
    ? { fontFamily: stack("BOG", GEO[800]), fontWeight: undefined, letterSpacing: -0.2 }
    : { fontFamily: stack(LATIN[700], GEO[800]), fontWeight: undefined, letterSpacing: -0.8 };
}

/** Handwritten notes: Caveat for Latin, the Georgian handwriting DM Maro for ka (as on the landing). */
export function noteFont(lang: Lang): TextStyle {
  return lang === "ka"
    ? { fontFamily: stack("DM Maro", "Caveat_500Medium"), fontWeight: undefined }
    : { fontFamily: stack("Caveat_500Medium", "DM Maro"), fontWeight: undefined };
}

/** Eyebrows, labels and numbers: Geist Mono. */
export function monoFont(): TextStyle {
  return { fontFamily: stack("GeistMono_500Medium", GEO[500]), fontWeight: undefined };
}

/** Accent words in titles: Instrument Serif italic (Latin) / BOG (ka). */
export function accentFont(lang: Lang): TextStyle {
  return lang === "ka" ? { fontFamily: stack("BOG", GEO[800]), fontWeight: undefined } : { fontFamily: stack("InstrumentSerif_400Regular_Italic", GEO[500]), fontWeight: undefined };
}
