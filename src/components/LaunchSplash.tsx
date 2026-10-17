import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { Body } from "@/ui";
import { BirdMark } from "@/ui/Brand";

const DURATION = 1400;
const BG = "#6AD67D";
const INK = "#2A5632";

/** Green launch screen: bird flies in, progress bar fills, then fades out once fonts are ready. */
export function LaunchSplash({ ready, onDone }: { ready: boolean; onDone: () => void }) {
  const inAnim = useRef(new Animated.Value(0)).current;
  const flap = useRef(new Animated.Value(0)).current;
  const bar = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;
  const [elapsed, setElapsed] = useState(false);
  useEffect(() => {
    Animated.timing(inAnim, { toValue: 1, duration: 700, easing: Easing.out(Easing.back(1.4)), useNativeDriver: false }).start();
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(flap, { toValue: 1, duration: 420, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
      Animated.timing(flap, { toValue: 0, duration: 420, easing: Easing.inOut(Easing.sin), useNativeDriver: false }),
    ]));
    loop.start();
    Animated.timing(bar, { toValue: 1, duration: DURATION, easing: Easing.inOut(Easing.quad), useNativeDriver: false }).start();
    const t = setTimeout(() => setElapsed(true), DURATION);
    return () => { loop.stop(); clearTimeout(t); };
  }, []);
  useEffect(() => {
    if (ready && elapsed) Animated.timing(fade, { toValue: 0, duration: 380, easing: Easing.out(Easing.quad), useNativeDriver: false }).start(({ finished }) => finished && onDone());
  }, [ready, elapsed]);
  return (
    <Animated.View pointerEvents={ready && elapsed ? "none" : "auto"} style={[StyleSheet.absoluteFill, { zIndex: 2000, backgroundColor: BG, opacity: fade }]}>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Animated.View style={{ opacity: inAnim, transform: [
          { translateX: inAnim.interpolate({ inputRange: [0, 1], outputRange: [-120, 0] }) },
          { translateY: flap.interpolate({ inputRange: [0, 1], outputRange: [0, -10] }) },
          { rotate: inAnim.interpolate({ inputRange: [0, 1], outputRange: ["-18deg", "0deg"] }) },
          { scaleY: flap.interpolate({ inputRange: [0, 1], outputRange: [1, 0.9] }) },
        ] }}>
          <BirdMark size={96} color={INK} />
        </Animated.View>
        <Animated.View style={{ alignItems: "center", marginTop: 18, opacity: inAnim, transform: [{ translateY: inAnim.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }] }}>
          <Body weight="800" size={32} style={{ color: INK, letterSpacing: -0.5 }}>Gzavnili</Body>
          <Body size={13} weight="600" style={{ color: INK, opacity: 0.75, marginTop: 2 }}>Parcels to and from Georgia</Body>
        </Animated.View>
        <View style={{ width: 120, height: 4, borderRadius: 2, backgroundColor: "rgba(42,86,50,0.2)", marginTop: 28, overflow: "hidden" }}>
          <Animated.View style={{ height: 4, borderRadius: 2, backgroundColor: INK, width: bar.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }} />
        </View>
      </View>
    </Animated.View>
  );
}
