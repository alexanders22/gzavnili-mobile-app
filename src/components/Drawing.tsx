import React, { useEffect, useRef } from "react";
import { Animated, Easing, Text, View, StyleProp, ViewStyle } from "react-native";
import Svg, { Path, SvgXml } from "react-native-svg";
import { noteFont } from "@/lib/fonts";
import { useLang } from "@/lib/i18n";
import { useTokens } from "@/ui";
import { HERO_XML } from "@/drawings/hero";

export const INK = "#16202A";

const DRAWINGS: Record<string, { xml: string; ratio: number }> = {
  hero: { xml: HERO_XML, ratio: 1.7567567567567568 },
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
