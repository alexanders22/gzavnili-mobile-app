import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View, StyleProp, ViewStyle } from "react-native";
import Svg, { Path, SvgXml } from "react-native-svg";
import { noteFont } from "@/lib/fonts";
import { useLang } from "@/lib/i18n";
import { useTokens } from "@/ui";
import { HERO_XML } from "@/drawings/hero";
import { PARCELS_XML } from "@/drawings/parcels";
import { SHOP_XML } from "@/drawings/shop";
import { MONEY_XML } from "@/drawings/money";
import { SUPPORT_XML } from "@/drawings/support";
import { HOW_XML } from "@/drawings/how";

export const INK = "#16202A";

const DRAWINGS: Record<string, { xml: string; ratio: number }> = {
  hero: { xml: HERO_XML, ratio: 1.7567567567567568 },
  parcels: { xml: PARCELS_XML, ratio: 0.8743169398907104 },
  shop: { xml: SHOP_XML, ratio: 0.8518518518518519 },
  money: { xml: MONEY_XML, ratio: 0.966183574879227 },
  support: { xml: SUPPORT_XML, ratio: 0.9807692307692307 },
  how: { xml: HOW_XML, ratio: 0.6479591836734694 },
};

/** Gentle up/down float used by every illustration. */
export function useFloat(amplitude = 5, period = 3600) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: period / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: period / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v, period]);
  return { transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -amplitude] }) }] };
}

/** In dark mode the sketches sit on a light paper card so the ink stays readable. */
function Paper({ children, style }: { children: React.ReactNode; style?: StyleProp<ViewStyle> }) {
  const { isDark } = useTokens();
  return <View style={[isDark ? { backgroundColor: "#F3F1EC", borderRadius: 20, padding: 6 } : null, style]}>{children}</View>;
}

export function Drawing({ name, width, float = false, style }: { name: keyof typeof DRAWINGS; width: number; float?: boolean; style?: StyleProp<ViewStyle> }) {
  const { xml, ratio } = DRAWINGS[name];
  const anim = useFloat(float ? 5 : 0);
  return (
    <Paper style={style}>
      <Animated.View style={float ? anim : undefined}>
        <SvgXml xml={xml} width={width} height={width / ratio} />
      </Animated.View>
    </Paper>
  );
}

type NoteProps = { children: React.ReactNode; align?: "left" | "right"; size?: number; tilt?: number; color?: string; heart?: boolean; style?: StyleProp<ViewStyle> };

/** Handwritten note (serif italic / Georgian serif) with a small heart. */
export function Note({ children, align = "right", size = 18, tilt = -5, color, heart = true, style }: NoteProps) {
  const { theme } = useTokens();
  const lang = useLang();
  const ink = color ?? theme.ink;
  const fs = lang === "ka" ? size * 0.78 : size;
  return (
    <View style={[{ transform: [{ rotate: `${tilt}deg` }], alignItems: align === "right" ? "flex-end" : "flex-start" }, style]}>
      <Text style={[noteFont(lang), { color: ink, fontSize: fs, lineHeight: fs * 1.18, textAlign: align }]}>{children}</Text>
      {heart ? (
        <Svg width={22} height={22} viewBox="0 0 24 24" style={{ marginTop: 4 }}>
          <Path d="M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z" fill="none" stroke={color ?? theme.brandText} strokeWidth={1.7} strokeLinejoin="round" />
        </Svg>
      ) : null}
    </View>
  );
}

type BandProps = { name: keyof typeof DRAWINGS; note: string; bg?: string; ink?: string; width?: number; style?: StyleProp<ViewStyle> };

/** Tinted band: handwritten note on the left, floating sketch on the right. */
export function DrawnBand({ name, note, bg, ink, width = 150, style }: BandProps) {
  const { theme } = useTokens();
  return (
    <View style={[{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8, backgroundColor: bg ?? theme.tint, borderRadius: 24, paddingLeft: 18, paddingRight: 10, paddingVertical: 12, overflow: "hidden" }, style]}>
      <Note align="left" size={21} tilt={-6} color={ink} style={{ flex: 1, minWidth: 0 }}>{note}</Note>
      <Drawing name={name} width={width} float />
    </View>
  );
}
