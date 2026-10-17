import React from "react";
import { Animated } from "react-native";
import Svg, { Path } from "react-native-svg";
import { BIRD_STROKES } from "@/drawings/birdStrokes";
import { INK, useFloat } from "./Drawing";

/** The hand-drawn bird: green fill, ink outline, light hatching. */
export function DrawnBird({ size = 56, float = false, fill = "#6AD67D" }: { size?: number; float?: boolean; fill?: string }) {
  const anim = useFloat(float ? 5 : 0, 3400);
  const h = size * 1.0357142857142858;
  return (
    <Animated.View style={[{ width: size, height: h }, float ? anim : null]}>
      <Svg width={size} height={h} viewBox="-20 -20 560 580">
        {BIRD_STROKES.map(([kind, d], i) =>
          kind === "f" ? (
            <Path key={i} d={d} fill={fill} />
          ) : (
            <Path key={i} d={d} fill="none" stroke={INK} strokeWidth={kind === "h" ? 9 : 13} strokeOpacity={kind === "h" ? 0.55 : 1} strokeLinecap="round" strokeLinejoin="round" />
          ),
        )}
      </Svg>
    </Animated.View>
  );
}
