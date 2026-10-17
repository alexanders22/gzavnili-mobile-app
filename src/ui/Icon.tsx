import React from "react";
import { View, StyleProp, TextStyle } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Ionicons as Base } from "@expo/vector-icons";
import { ICON_STROKES } from "@/drawings/iconStrokes";

type BaseProps = React.ComponentProps<typeof Base>;
type Props = { name: BaseProps["name"]; size?: number; color?: string; style?: StyleProp<TextStyle> };

/**
 * Icons as in the original app: a hand-drawn sketch of the Ionicons glyph when one
 * exists in the set, otherwise the regular Ionicons font glyph.
 */
function SketchIcon({ name, size = 20, color = "#121D25", style }: Props) {
  const strokes = ICON_STROKES[String(name)];
  if (!strokes) return <Base name={name} size={size} color={color} style={style as any} />;
  return (
    <View style={[{ width: size, height: size }, style as any]} pointerEvents="none">
      <Svg width={size} height={size} viewBox="0 0 512 512">
        {strokes.map(([kind, width, d], i) =>
          kind === "f" ? (
            <Path key={i} d={d} fill={color} />
          ) : (
            <Path key={i} d={d} fill="none" stroke={color} strokeWidth={kind === "h" ? width : Math.max(width, 30)} strokeOpacity={kind === "h" ? 0.45 : 1} strokeLinecap="round" strokeLinejoin="round" />
          ),
        )}
      </Svg>
    </View>
  );
}

export const Ionicons = Object.assign(SketchIcon, { glyphMap: Base.glyphMap });
