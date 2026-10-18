import React from "react";
import { Animated, View } from "react-native";
import Svg, { Circle, Ellipse, Path, Rect } from "react-native-svg";
import { INK, useFloat } from "./Drawing";

const ink = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Leather wallet with a green card and a floating coin. */
export function WalletArt({ size = 110 }: { size?: number }) {
  const anim = useFloat(3, 3800);
  const h = size * 0.8;
  return (
    <View style={{ width: size, height: h }}>
      <Svg width={size} height={h} viewBox="0 0 200 160">
        <Ellipse cx={100} cy={150} rx={70} ry={7} fill="#0D1A14" opacity={0.08} />
        <Rect x={46} y={26} width={104} height={64} rx={10} fill="#6AD67D" {...ink} transform="rotate(-8 98 58)" />
        <Path d="M56 46 L146 34" stroke={INK} strokeWidth={6} opacity={0.85} />
        <Rect x={28} y={52} width={144} height={92} rx={18} fill="#C48C57" {...ink} />
        <Path d="M28 76 H172" {...ink} strokeWidth={2.4} opacity={0.5} />
        <Rect x={128} y={84} width={56} height={34} rx={12} fill="#DBA871" {...ink} />
        <Circle cx={146} cy={101} r={6} fill="#F6EBD9" stroke={INK} strokeWidth={2} />
      </Svg>
      <Animated.View style={[{ position: "absolute", left: 0, top: 0 }, anim]} pointerEvents="none">
        <Svg width={size} height={h} viewBox="0 0 200 160">
          <Circle cx={44} cy={36} r={22} fill="#F5C451" {...ink} />
          <Path d="M38 26 v18 h14 M44 24 v-4 M50 24 v-4 M36 34 a10 10 0 1 1 16 8" fill="none" stroke={INK} strokeWidth={2.6} strokeLinecap="round" />
        </Svg>
      </Animated.View>
    </View>
  );
}
