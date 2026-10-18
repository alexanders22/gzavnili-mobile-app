import React from "react";
import { Animated, View } from "react-native";
import Svg, { G, Path } from "react-native-svg";
import { INK, useFloat } from "./Drawing";

/** Paper plane on a dotted flight path; the plane floats, the path stays. */
export function PlaneArt({ size = 120, color }: { size?: number; color?: string }) {
  const anim = useFloat(4, 3000);
  const ink = color ?? INK;
  const h = size * 0.6;
  return (
    <View style={{ width: size, height: h }}>
      <Svg width={size} height={h} viewBox="0 0 200 120" style={{ position: "absolute" }}>
        <Path d="M8 100 C50 96 80 70 120 64" fill="none" stroke={ink} strokeWidth={2.4} strokeDasharray="6 7" strokeLinecap="round" />
      </Svg>
      <Animated.View style={anim}>
        <Svg width={size} height={h} viewBox="0 0 200 120">
          <G transform="rotate(-18 150 50)">
            <Path d="M100 52 C100 46 106 42 116 42 L178 42 C190 42 196 48 196 52 C196 56 190 62 178 62 L116 62 C106 62 100 58 100 52 Z" fill="#fff" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
            <Path d="M140 44 L122 14 L134 14 L162 44 Z M140 60 L122 90 L134 90 L162 60 Z M104 50 L94 30 L102 30 L114 46 Z" fill="#fff" stroke={ink} strokeWidth={3} strokeLinejoin="round" />
            <Path d="M150 50 h4 M160 50 h4 M170 50 h4" stroke={ink} strokeWidth={2.4} strokeLinecap="round" />
            <Path d="M186 46 C190 48 192 50 192 52" stroke={ink} strokeWidth={4} strokeLinecap="round" />
          </G>
        </Svg>
      </Animated.View>
    </View>
  );
}
