import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Modal, Pressable, View } from "react-native";
import { space } from "@/lib/theme";
import { useTokens } from "./index";

export function BottomSheet({ visible, onClose, children }: { visible: boolean; onClose: () => void; children: React.ReactNode }) {
  const { theme } = useTokens();
  const y = useRef(new Animated.Value(1)).current;
  const [mounted, setMounted] = useState(visible);
  useEffect(() => {
    if (visible) {
      setMounted(true);
      y.setValue(1);
      Animated.timing(y, { toValue: 0, duration: 260, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    } else if (mounted) {
      Animated.timing(y, { toValue: 1, duration: 180, easing: Easing.in(Easing.cubic), useNativeDriver: true }).start(({ finished }) => finished && setMounted(false));
    }
  }, [visible]);
  if (!mounted) return null;
  const translateY = y.interpolate({ inputRange: [0, 1], outputRange: [0, 600] });
  return (
    <Modal visible transparent animationType="none" onRequestClose={onClose}>
      <Pressable onPress={onClose} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "flex-end" }}>
        <Animated.View style={{ transform: [{ translateY }] }}>
          <Pressable style={{ backgroundColor: theme.cream, borderTopLeftRadius: 26, borderTopRightRadius: 26, padding: space.xl, paddingBottom: 34 }}>
            <View style={{ alignSelf: "center", width: 40, height: 4, borderRadius: 2, backgroundColor: theme.line, marginBottom: space.lg }} />
            {children}
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}
