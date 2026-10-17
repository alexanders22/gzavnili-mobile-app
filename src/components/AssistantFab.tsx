import React from "react";
import { Pressable, View } from "react-native";
import { router, usePathname } from "expo-router";
import { useSettings } from "@/lib/settings";
import { useIsDesktop } from "@/lib/layout";
import { useTokens } from "@/ui";
import { DrawnBird } from "./DrawnBird";

const HIDDEN_ON = ["/assistant", "/sign-in"];

/** Floating green button with the bird: opens the AI assistant. */
export function AssistantFab() {
  const { theme } = useTokens();
  const isEnabled = useSettings((s) => s.isEnabled);
  const pathname = usePathname();
  const desktop = useIsDesktop();
  if (!isEnabled("ai") || HIDDEN_ON.some((p) => pathname.startsWith(p))) return null;
  return (
    <Pressable
      onPress={() => router.push("/assistant" as any)}
      accessibilityLabel="Gzavnili assistant"
      style={({ pressed }) => ({ position: "absolute", right: desktop ? 28 : 18, bottom: desktop ? 28 : 96, width: 58, height: 58, borderRadius: 29, backgroundColor: theme.green, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOpacity: 0.2, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 6, zIndex: 900, transform: [{ scale: pressed ? 0.94 : 1 }] })}
    >
      <DrawnBird size={30} fill="#FFFFFF" />
      <View style={{ position: "absolute", top: 4, right: 6, width: 10, height: 10, borderRadius: 5, backgroundColor: theme.red }} />
    </Pressable>
  );
}
