// Dark-theme ambient light behind the page (the landing's blue/green washes behind the glass).
import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { Defs, Ellipse, RadialGradient, Stop } from "react-native-svg";
import { useTokens } from "@/ui";

export function Ambient() {
  const { isDark } = useTokens();
  if (!isDark) return null;
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { overflow: "hidden" }]}>
      <Svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        <Defs>
          <RadialGradient id="amb-blue" cx="50%" cy="50%" r="50%"><Stop offset="0" stopColor="#5680FF" stopOpacity={0.22} /><Stop offset="0.7" stopColor="#5680FF" stopOpacity={0} /></RadialGradient>
          <RadialGradient id="amb-green" cx="50%" cy="50%" r="50%"><Stop offset="0" stopColor="#6AD67D" stopOpacity={0.12} /><Stop offset="0.7" stopColor="#6AD67D" stopOpacity={0} /></RadialGradient>
          <RadialGradient id="amb-blue2" cx="50%" cy="50%" r="50%"><Stop offset="0" stopColor="#5680FF" stopOpacity={0.12} /><Stop offset="0.7" stopColor="#5680FF" stopOpacity={0} /></RadialGradient>
        </Defs>
        <Ellipse cx="82" cy="-5" rx="55" ry="45" fill="url(#amb-blue)" />
        <Ellipse cx="5" cy="18" rx="45" ry="40" fill="url(#amb-green)" />
        <Ellipse cx="50" cy="115" rx="60" ry="50" fill="url(#amb-blue2)" />
      </Svg>
    </View>
  );
}
