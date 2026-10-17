import React from "react";
import { Tabs } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { useT, useLang } from "@/lib/i18n";
import { useTokens } from "@/ui";

const icon = (name: keyof typeof Ionicons.glyphMap) => ({ color, size }: { color: any; size: number }) => <Ionicons name={name} size={size} color={color} />;

/** The native tab bar is hidden; AppBottomNav (floating pill) does the navigation. */
export default function TabsLayout() {
  const { theme } = useTokens();
  const t = useT();
  const ka = useLang() === "ka";
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.green,
        tabBarInactiveTintColor: theme.faint,
        tabBarStyle: { display: "none" },
        tabBarLabelStyle: { fontSize: 10, lineHeight: 14, fontWeight: "600", letterSpacing: 0.1 },
        tabBarIconStyle: { marginBottom: 2 },
      }}
    >
      <Tabs.Screen name="index" options={{ title: t("home"), tabBarIcon: icon("home-outline") }} />
      <Tabs.Screen name="parcels" options={{ title: t("parcels"), tabBarIcon: icon("cube-outline") }} />
      <Tabs.Screen name="add-tracking" options={{ title: ka ? "დამატება" : "Add", tabBarIcon: icon("add-circle") }} />
      <Tabs.Screen name="address" options={{ title: ka ? "მისამართი" : "Address", tabBarIcon: icon("location-outline") }} />
      <Tabs.Screen name="more" options={{ title: t("more"), tabBarIcon: icon("ellipsis-horizontal") }} />
      {/* Tab bar is hidden, so these stay linkable (/shop, /send) without appearing anywhere. */}
      <Tabs.Screen name="shop" options={{ title: t("shop"), tabBarIcon: icon("bag-outline") }} />
      <Tabs.Screen name="send" options={{ title: t("send"), tabBarIcon: icon("cash-outline") }} />
    </Tabs>
  );
}
