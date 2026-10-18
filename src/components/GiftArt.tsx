import React from "react";
import { Animated } from "react-native";
import Svg, { Ellipse, Path, Rect } from "react-native-svg";
import { INK, useFloat } from "./Drawing";

const ink = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Green gift box with a red ribbon and sparkles. */
export function GiftArt({ size = 110 }: { size?: number }) {
  const anim = useFloat(3, 3400);
  const h = size * 0.9;
  return (
    <Animated.View style={[{ width: size, height: h }, anim]}>
      <Svg width={size} height={h} viewBox="0 0 200 180">
        <Ellipse cx={100} cy={170} rx={70} ry={7} fill="#0D1A14" opacity={0.08} />
        <Rect x={40} y={84} width={120} height={80} rx={8} fill="#6AD67D" {...ink} />
        <Rect x={30} y={60} width={140} height={30} rx={8} fill="#88DE97" {...ink} />
        <Rect x={90} y={60} width={20} height={104} fill="#E5484D" {...ink} />
        <Path d="M100 60 C80 30 50 34 58 52 C64 64 88 62 100 60 Z" fill="#E5484D" {...ink} />
        <Path d="M100 60 C120 30 150 34 142 52 C136 64 112 62 100 60 Z" fill="#E5484D" {...ink} />
        <Path d="M150 30 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z M40 26 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z" fill="#F5C451" />
      </Svg>
    </Animated.View>
  );
}
