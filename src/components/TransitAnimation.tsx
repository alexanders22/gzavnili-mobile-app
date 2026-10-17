import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, View } from "react-native";
import { Body } from "@/ui";

const ICONS = ["🚶", "🚚", "🚢", "✈️"];

/** A tiny vehicle slides across and swaps each lap. */
export function TransitAnimation({ size = 18, width = 64 }: { size?: number; width?: number }) {
  const [i, setI] = useState(0);
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    let stopped = false;
    const run = () => {
      v.setValue(0);
      Animated.timing(v, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }).start(({ finished }) => {
        if (finished && !stopped) { setI((n) => (n + 1) % ICONS.length); run(); }
      });
    };
    run();
    return () => { stopped = true; v.stopAnimation(); };
  }, [v]);
  const translateX = v.interpolate({ inputRange: [0, 1], outputRange: [-6, width - 22] });
  const opacity = v.interpolate({ inputRange: [0, 0.15, 0.85, 1], outputRange: [0, 1, 1, 0] });
  return (
    <View style={{ width, height: size + 6, justifyContent: "center" }}>
      <Animated.View style={{ transform: [{ translateX }], opacity }}>
        <Body size={size}>{ICONS[i]}</Body>
      </Animated.View>
    </View>
  );
}
