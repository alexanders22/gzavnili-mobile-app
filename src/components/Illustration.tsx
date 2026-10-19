// Page illustrations shared with the landing (assets/ill/*.svg, animated; dark twins in assets/ill/dark/).
// Web renders the SVG file itself so its CSS animations run; native shows a static SvgXml.
import React, { useEffect, useState } from "react";
import { Animated, Platform, View, type StyleProp, type ViewStyle } from "react-native";
import { Asset } from "expo-asset";
import { SvgXml } from "react-native-svg";
import { useTokens } from "@/ui";
import { useFloat } from "./Drawing";

const ILL = {
  parcels: { light: require("../../assets/ill/parcels.svg"), dark: require("../../assets/ill/dark/parcels.svg"), ratio: 1220 / 1080 },
  shop: { light: require("../../assets/ill/shop.svg"), dark: require("../../assets/ill/dark/shop.svg"), ratio: 700 / 690 },
  money: { light: require("../../assets/ill/money.svg"), dark: require("../../assets/ill/dark/money.svg"), ratio: 1170 / 900 },
  prices: { light: require("../../assets/ill/prices.svg"), dark: require("../../assets/ill/dark/prices.svg"), ratio: 950 / 625 },
  how: { light: require("../../assets/ill/how.svg"), dark: require("../../assets/ill/dark/how.svg"), ratio: 1080 / 810 },
  support: { light: require("../../assets/ill/support.svg"), dark: require("../../assets/ill/dark/support.svg"), ratio: 870 / 850 },
} as const;
export type IllustrationName = keyof typeof ILL;

const uriOf = (mod: number) => Asset.fromModule(mod).uri;

/** Native fallback: the SVG text with its <style> block removed (static pose). */
function useSvgText(mod: number) {
  const [xml, setXml] = useState<string | null>(null);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const a = Asset.fromModule(mod);
        await a.downloadAsync();
        const txt = await (await fetch(a.localUri ?? a.uri)).text();
        if (alive) setXml(txt.replace(/<style>[\s\S]*?<\/style>/, ""));
      } catch { /* leave empty */ }
    })();
    return () => { alive = false; };
  }, [mod]);
  return xml;
}

export function Illustration({ name, width, float = false, style }: { name: IllustrationName; width: number; float?: boolean; style?: StyleProp<ViewStyle> }) {
  const { isDark } = useTokens();
  const def = ILL[name];
  const mod = isDark ? def.dark : def.light;
  const height = width / def.ratio;
  const anim = useFloat(float ? 5 : 0);
  return (
    <Animated.View style={[{ width, height }, float ? anim : null, style]}>
      {Platform.OS === "web" ? (
        React.createElement("img", { src: uriOf(mod), alt: "", draggable: false, style: { width, height, display: "block", objectFit: "contain", pointerEvents: "none" } })
      ) : (
        <NativeSvg mod={mod} width={width} height={height} />
      )}
    </Animated.View>
  );
}

function NativeSvg({ mod, width, height }: { mod: number; width: number; height: number }) {
  const xml = useSvgText(mod);
  return xml ? <SvgXml xml={xml} width={width} height={height} /> : <View style={{ width, height }} />;
}
