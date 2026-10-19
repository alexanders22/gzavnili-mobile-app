// The landing hero scene: photo base with the hand, plane, paper plane and the flying logo mark layered
// at the same positions as on the landing (710x488 stage), scaled to the given width.
import React, { useRef, useEffect } from "react";
import { Animated, Easing, Image, Platform, View, type StyleProp, type ViewStyle } from "react-native";
import { FlyingMark } from "@/ui/Brand";
import { useTokens } from "@/ui";

const BASE = require("../../assets/art/hero-base.webp");
const HAND = require("../../assets/art/hero-hand.png");
const PLANE = require("../../assets/art/hero-plane.png");
const PAPER = require("../../assets/art/hero-paper.png");
const STAGE = { w: 710, h: 488 };

export function HeroArt({ width, style }: { width: number; style?: StyleProp<ViewStyle> }) {
  const { isDark } = useTokens();
  const k = width / STAGE.w;
  const height = STAGE.h * k;
  const plane = useRef(new Animated.Value(0)).current;
  const paper = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = (v: Animated.Value, ms: number) => Animated.loop(Animated.sequence([
      Animated.timing(v, { toValue: 1, duration: ms / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
      Animated.timing(v, { toValue: 0, duration: ms / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
    ]));
    const a = loop(plane, 5500), b = loop(paper, 6500);
    a.start(); b.start();
    return () => { a.stop(); b.stop(); };
  }, [plane, paper]);
  const at = (x: number, y: number, w: number, h: number) => ({ position: "absolute" as const, left: x * k, top: y * k, width: w * k, height: h * k });
  const layers = (
    <>
      <Image source={BASE} style={{ width, height, borderRadius: 24 }} resizeMode="cover" />
      <Image source={HAND} style={at(150, 280, 230, 155)} resizeMode="contain" />
      <Animated.Image source={PLANE} style={[at(503, 100, 149, 136), { transform: [{ rotate: plane.interpolate({ inputRange: [0, 1], outputRange: ["-2.4deg", "1.2deg"] }) }] }]} resizeMode="contain" />
      <Animated.Image source={PAPER} style={[at(606, 305, 96, 73), { transform: [{ translateX: paper.interpolate({ inputRange: [0, 1], outputRange: [-9 * k, 5 * k] }) }, { translateY: paper.interpolate({ inputRange: [0, 1], outputRange: [6 * k, -5 * k] }) }, { rotate: paper.interpolate({ inputRange: [0, 1], outputRange: ["-5deg", "3deg"] }) }] }]} resizeMode="contain" />
    </>
  );
  // Dark theme, as on the landing: the photo layers become a chalk-like negative blended with the page
  // (invert + hue-rotate, screen blend); the logo mark stays true green on top.
  const inverted = Platform.OS === "web" && isDark;
  return (
    <View style={[{ width, height }, style]}>
      {inverted
        ? React.createElement("div", { style: { position: "absolute", left: 0, top: 0, width, height, filter: "invert(1) hue-rotate(180deg) brightness(.84) drop-shadow(0 0 6px rgba(255,255,255,.16))", mixBlendMode: "screen" } }, layers)
        : layers}
      <View style={{ position: "absolute", left: 80 * k, top: 12 * k }}><FlyingMark size={56 * 1.55 * k} float /></View>
    </View>
  );
}
