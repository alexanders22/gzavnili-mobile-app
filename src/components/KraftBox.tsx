import React from "react";
import { Animated, View } from "react-native";
import Svg, { Ellipse, G, Path } from "react-native-svg";
import { INK, useFloat } from "./Drawing";

const BIRD =
  "M52.8623 16.9605C52.8623 17.0807 52.7806 17.1718 52.662 17.1931L39.6778 19.023C40.3875 21.3258 41.1905 24.8421 40.2358 29.0058C39.4328 32.4988 37.4827 35.3929 34.5934 37.3759C31.5544 39.4578 28.2782 40.0451 25.9761 39.9598L11.0554 54.8411H3L19.3732 38.5138C16.8397 37.5 14.3918 35.9822 12.2667 34.0612C2.25532 25.0321 2.28254 12.1765 4.14521 3L27.9768 23.9756V31.3222L8.89909 14.5317C9.08964 18.8834 10.4857 25.0301 15.9628 29.9808C19.6104 33.2742 24.2301 34.9529 28.0235 34.3481C31.4941 33.7995 34.1073 31.3125 34.8423 27.8602C35.6569 24.0299 34.4592 20.5698 31.2978 17.8657L34.9492 14.2293L52.664 16.7318C52.7826 16.7473 52.8643 16.8422 52.8643 16.9605H52.8623Z";
const ink = { stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

/** Kraft cardboard box with the bird stamp; optional floating cloud for empty states. */
export function KraftBox({ size = 120, cloud = false }: { size?: number; cloud?: boolean }) {
  const anim = useFloat(cloud ? 3 : 0, 3200);
  const h = size * 0.9;
  return (
    <View style={{ width: size, height: h }}>
      <Svg width={size} height={h} viewBox="0 0 200 180">
        <Ellipse cx={104} cy={166} rx={74} ry={8} fill="#0D1A14" opacity={0.08} />
        <Path d="M30 62 L110 36 L178 58 L98 86 Z" fill="#EBCB9C" {...ink} />
        <Path d="M62 52 L80 46 L146 68 L128 75 Z" fill="#fff" opacity={0.45} />
        <Path d="M70 49 L138 72" {...ink} strokeWidth={2} opacity={0.55} />
        <Path d="M30 62 L98 86 L98 164 L30 138 Z" fill="#DBA871" {...ink} />
        <Path d="M98 86 L178 58 L178 134 L98 164 Z" fill="#C48C57" {...ink} />
        <Path d="M118 104 L152 92 L152 112 L118 124 Z" fill="#F6EBD9" stroke={INK} strokeWidth={1.6} strokeLinejoin="round" />
        <Path d="M124 108 L144 101 M124 114 L140 108" stroke={INK} strokeWidth={1.6} strokeLinecap="round" opacity={0.6} />
        <G transform="translate(44 98) skewY(19.4) scale(.62)">
          <Path d={BIRD} fill={INK} />
        </G>
      </Svg>
      {cloud ? (
        <Animated.View style={[{ position: "absolute", left: 0, top: 0 }, anim]} pointerEvents="none">
          <Svg width={size} height={h} viewBox="0 0 200 180">
            <Path d="M60 50 C46 50 42 34 54 28 C54 12 76 8 84 20 C90 4 118 6 120 24 C134 22 140 40 128 48 C110 56 76 58 60 50 Z" fill="#fff" {...ink} />
            <Path d="M84 38 C88 44 98 44 102 38" fill="none" {...ink} strokeWidth={2.4} />
          </Svg>
        </Animated.View>
      ) : null}
    </View>
  );
}
