import React from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { router, usePathname } from "expo-router";
import { font, glass, radius, space } from "@/lib/theme";
import { useSettings } from "@/lib/settings";
import { useLang, useT } from "@/lib/i18n";
import { Body, glassStyle, useTokens } from "./index";
import { BrandLogo } from "./Brand";

export const HEADER_HEIGHT = 56;
export const BOTTOM_NAV_SPACE = 104;

export function LangToggle() {
  const { theme } = useTokens();
  const lang = useSettings((s) => s.lang);
  const setLang = useSettings((s) => s.setLang);
  return (
    <Pressable
      onPress={() => setLang(lang === "ka" ? "en" : "ka")}
      accessibilityLabel={lang === "ka" ? "Switch to English" : "ქართულზე გადართვა"}
      hitSlop={6}
      style={({ pressed }) => ({ flexDirection: "row", backgroundColor: theme.paper, borderRadius: radius.pill, padding: 3, opacity: pressed ? 0.8 : 1 })}
    >
      {(["ka", "en"] as const).map((l) => {
        const on = lang === l;
        return (
          <View key={l} style={{ paddingHorizontal: 8, paddingVertical: 4, borderRadius: radius.pill, backgroundColor: on ? theme.card : "transparent" }}>
            <Body size={11} weight="700" style={{ color: on ? theme.ink : theme.faint }}>{l === "ka" ? "ქა" : "EN"}</Body>
          </View>
        );
      })}
    </Pressable>
  );
}

export function AppHeader({ title, back }: { title?: string; back?: boolean }) {
  const { theme, isDark } = useTokens();
  return (
    <View style={[{ height: HEADER_HEIGHT, flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: space.lg, backgroundColor: isDark ? glass.navBg : theme.cream, borderBottomWidth: 1, borderBottomColor: theme.lineSoft, zIndex: 5 }, isDark ? glassStyle(true) : null, isDark ? { borderTopWidth: 0 } : null]}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, flexShrink: 1, minWidth: 0 }}>
        {back ? (
          <Pressable onPress={() => router.back()} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={theme.ink} />
          </Pressable>
        ) : null}
        {title ? <Body size={font.s18} weight="700" numberOfLines={1}>{title}</Body> : <BrandLogo size={24} />}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm }}>
        <LangToggle />
        <Pressable onPress={() => router.push("/my-code")} hitSlop={8} accessibilityLabel="Room number and barcode scanner">
          <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="barcode-outline" size={18} color={theme.ink} />
          </View>
        </Pressable>
        <Pressable onPress={() => router.push("/settings")} hitSlop={10}>
          <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="person-outline" size={17} color={theme.brandText} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

type Item = { route: string; icon: keyof typeof Ionicons.glyphMap; on: keyof typeof Ionicons.glyphMap; label: string };

/** Floating navy pill nav (the native tab bar is hidden). */
export function AppBottomNav() {
  const { theme, isDark } = useTokens();
  const t = useT();
  const ka = useLang() === "ka";
  const pathname = usePathname();
  const items: Item[] = [
    { route: "/", icon: "home-outline", on: "home", label: t("home") },
    { route: "/parcels", icon: "cube-outline", on: "cube", label: t("parcels") },
    { route: "/shop", icon: "bag-outline", on: "bag", label: ka ? "შოპინგი" : "Shop" },
    { route: "/send", icon: "logo-usd", on: "logo-usd", label: ka ? "გზავნილი" : "Transfer" },
    { route: "/more", icon: "grid-outline", on: "grid", label: ka ? "მეტი" : "More" },
  ];
  const active = (r: string) => (r === "/" ? pathname === "/" : pathname.startsWith(r));
  return (
    <View style={[{ position: "absolute", left: 14, right: 14, bottom: 14, height: 74, borderRadius: 28, backgroundColor: isDark ? "rgba(16,20,26,0.72)" : theme.navy, flexDirection: "row", alignItems: "stretch", paddingHorizontal: space.sm, shadowColor: "#000", shadowOpacity: isDark ? 0.7 : 0.25, shadowRadius: 18, shadowOffset: { width: 0, height: 8 }, elevation: 12 }, isDark ? { borderWidth: 1, borderColor: glass.border, ...glassStyle(true) } : null]}>
      {items.map((it) => {
        const on = active(it.route);
        return (
          <Pressable key={it.route} onPress={() => router.push(it.route as any)} style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 3, paddingVertical: 8 }}>
            <View style={{ height: 34, justifyContent: "center" }}>
              <Ionicons name={on ? it.on : it.icon} size={22} color={on ? theme.green : theme.faint} />
            </View>
            <Body size={10} weight="600" numberOfLines={1} style={{ color: on ? theme.green : theme.faint }}>{it.label}</Body>
          </Pressable>
        );
      })}
    </View>
  );
}
