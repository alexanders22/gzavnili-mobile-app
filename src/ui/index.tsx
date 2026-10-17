import React from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Switch, Text, TextStyle, View, ViewStyle, StyleProp } from "react-native";
import { SafeAreaView, type Edge } from "react-native-safe-area-context";
import { Ionicons } from "@/ui/Icon";
import { darkTheme, font, lightTheme, radius, space, type Theme } from "@/lib/theme";
import { useIsDark, useSettings } from "@/lib/settings";
import { displayFont, textFont } from "@/lib/fonts";
import { CONTENT_MAX, useIsDesktop } from "@/lib/layout";
import { AppBottomNav, AppHeader, BOTTOM_NAV_SPACE } from "./AppChrome";

export function useTokens(): { theme: Theme; isDark: boolean } {
  const isDark = useIsDark();
  return { theme: isDark ? darkTheme : lightTheme, isDark };
}

export const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center" },
  between: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});

type ScreenProps = {
  children: React.ReactNode; scroll?: boolean; edges?: Edge[]; maxWidth?: number; title?: string; back?: boolean; chrome?: boolean;
};

/** Page shell: safe area, cream background, optional header + floating bottom nav. */
export function Screen({ children, scroll = true, edges = ["top"], maxWidth = CONTENT_MAX, title, back, chrome = true }: ScreenProps) {
  const { theme } = useTokens();
  const desktop = useIsDesktop();
  const pad = desktop ? 32 : space.lg;
  const showChrome = chrome && !desktop;
  const Body = scroll ? ScrollView : View;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.cream }} edges={desktop ? [] : edges}>
      {showChrome ? <AppHeader title={title} back={back} /> : null}
      <Body
        style={{ flex: 1 }}
        {...(scroll
          ? { contentContainerStyle: { padding: pad, paddingBottom: desktop ? 48 : showChrome ? BOTTOM_NAV_SPACE : 32, width: "100%", maxWidth: desktop ? maxWidth : undefined, alignSelf: "center" } }
          : {})}
      >
        {scroll ? children : <View style={{ flex: 1, width: "100%", maxWidth: desktop ? maxWidth : undefined, alignSelf: "center" }}>{children}</View>}
      </Body>
      {showChrome ? <AppBottomNav /> : null}
    </SafeAreaView>
  );
}

export function Title({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  const { theme } = useTokens();
  const lang = useSettings((s) => s.lang);
  return <Text style={[{ fontSize: font.s22, color: theme.ink, lineHeight: font.s22 * 1.25 }, displayFont(lang), style]}>{children}</Text>;
}

type BodyProps = { children?: React.ReactNode; muted?: boolean; size?: number; weight?: TextStyle["fontWeight"] | string; style?: StyleProp<TextStyle>; numberOfLines?: number };
export function Body({ children, muted, size = font.s14, weight = "400", style, numberOfLines }: BodyProps) {
  const { theme } = useTokens();
  const lang = useSettings((s) => s.lang);
  const flat = StyleSheet.flatten(style) as TextStyle | undefined;
  const w = flat?.fontWeight ?? weight;
  return (
    <Text numberOfLines={numberOfLines} style={[{ fontSize: size, color: muted ? theme.mut : theme.ink }, style, textFont(lang, w)]}>
      {children}
    </Text>
  );
}

export function Card({ children, style, onPress }: { children: React.ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void }) {
  const { theme } = useTokens();
  const base: ViewStyle = {
    backgroundColor: theme.card, borderRadius: radius.lg, borderWidth: 1, borderColor: theme.line, padding: space.lg,
    shadowColor: "#121D25", shadowOpacity: 0.06, shadowRadius: 18, shadowOffset: { width: 0, height: 8 },
  };
  if (onPress) return <Pressable onPress={onPress} style={({ pressed }) => [base, style, { opacity: pressed ? 0.7 : 1 }]}>{children}</Pressable>;
  return <View style={[base, style]}>{children}</View>;
}

type BtnProps = { label: string; onPress?: () => void; variant?: "primary" | "dark" | "outline" | "danger"; disabled?: boolean; loading?: boolean; icon?: keyof typeof Ionicons.glyphMap; style?: StyleProp<ViewStyle> };
export function Btn({ label, onPress, variant = "primary", disabled, loading, icon, style }: BtnProps) {
  const { theme } = useTokens();
  const lang = useSettings((s) => s.lang);
  const bg = { primary: theme.green, dark: theme.navy, outline: "transparent", danger: theme.red }[variant];
  const fg = { primary: "#121D25", dark: "#FFFFFF", outline: theme.ink, danger: "#FFFFFF" }[variant];
  return (
    <Pressable
      onPress={disabled || loading ? undefined : onPress}
      style={({ pressed }) => [
        { backgroundColor: bg, borderRadius: radius.pill, paddingVertical: 15, paddingHorizontal: space.xl, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: space.sm, borderWidth: variant === "outline" ? 1 : 0, borderColor: theme.line, opacity: disabled ? 0.45 : pressed ? 0.85 : 1 },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon ? <Ionicons name={icon} size={17} color={fg} /> : null}
          <Text style={[{ color: fg, fontSize: font.s14 }, lang === "ka" ? displayFont(lang) : textFont(lang, "600"), { letterSpacing: 0 }]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}

export function Pill({ text, tone = "neutral" }: { text: string; tone?: "neutral" | "ok" | "warn" | "info" }) {
  const { theme } = useTokens();
  const lang = useSettings((s) => s.lang);
  const tones = {
    neutral: { bg: theme.lineSoft, fg: theme.mut }, ok: { bg: theme.tint2, fg: theme.greenDeep },
    warn: { bg: "#FFF1E7", fg: theme.orange }, info: { bg: "#E7F1FF", fg: theme.blue },
  }[tone];
  return (
    <View style={{ backgroundColor: tones.bg, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 5 }}>
      <Text style={[{ color: tones.fg, fontSize: font.s11 }, textFont(lang, "700")]}>{text}</Text>
    </View>
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  const { theme } = useTokens();
  const lang = useSettings((s) => s.lang);
  return (
    <Text style={[{ color: theme.faint, fontSize: font.s11, letterSpacing: 0.8, textTransform: "uppercase", marginBottom: space.sm, marginTop: space.xl }, lang === "ka" ? displayFont(lang) : textFont(lang, "600"), { letterSpacing: lang === "ka" ? 0.4 : 1.2 }]}>
      {children}
    </Text>
  );
}

export function ToggleRow({ title, subtitle, value, onValueChange, icon, disabled }: { title: string; subtitle?: string; value: boolean; onValueChange: (v: boolean) => void; icon?: keyof typeof Ionicons.glyphMap; disabled?: boolean }) {
  const { theme } = useTokens();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: 13, opacity: disabled ? 0.55 : 1 }}>
      {icon ? (
        <View style={{ width: 34, height: 34, borderRadius: radius.sm, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name={icon} size={17} color={theme.greenDeep} />
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <Body weight="600">{title}</Body>
        {subtitle ? <Body muted size={font.s12} style={{ marginTop: 2 }}>{subtitle}</Body> : null}
      </View>
      <Switch value={value} onValueChange={onValueChange} disabled={disabled} trackColor={{ true: theme.green, false: theme.line }} thumbColor="#fff" />
    </View>
  );
}

export function Divider() {
  const { theme } = useTokens();
  return <View style={{ height: 1, backgroundColor: theme.lineSoft }} />;
}
