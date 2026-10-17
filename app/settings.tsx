import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang, useT } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import { OPTIONAL_MODULES } from "@/lib/modules";
import { useCustomer, useSignOut } from "@/lib/hooks";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, ToggleRow, styles, useTokens } from "@/ui";

const LANGS = [
  { code: "ka" as const, label: "ქართული", flag: "🇬🇪" },
  { code: "en" as const, label: "English", flag: "🇬🇧" },
];

export default function Settings() {
  const { theme } = useTokens();
  const t = useT();
  const lang = useLang();
  const ka = lang === "ka";
  const settings = useSettings();
  const { data: customer } = useCustomer();
  const signOut = useSignOut();
  const initials = (customer?.first_name?.[0] ?? "V") + (customer?.last_name?.[0] ?? "B");

  return (
    <Screen>
      <View style={[styles.row, { gap: space.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{t("settings")}</Title>
      </View>

      <Card style={{ marginTop: space.lg }} onPress={() => router.push("/profile" as any)}>
        <View style={[styles.row, { gap: space.md }]}>
          <View style={{ width: 52, height: 52, borderRadius: 26, backgroundColor: theme.green, alignItems: "center", justifyContent: "center" }}>
            <Body weight="700" size={font.s16} style={{ color: theme.greenDeep }}>{initials}</Body>
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Body weight="700" size={font.s16} numberOfLines={1}>{customer?.first_name ?? "Vasil"} {customer?.last_name ?? ""}</Body>
            <Body muted size={font.s12} numberOfLines={1}>{ka ? "პროფილის რედაქტირება" : "View and edit profile"}</Body>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.faint} />
        </View>
      </Card>

      <SectionLabel>{t("appearance")}</SectionLabel>
      <View style={{ flexDirection: "row", gap: space.md }}>
        {(["light", "dark"] as const).map((m) => {
          const on = settings.mode === m;
          return (
            <Card key={m} style={{ flex: 1, borderColor: on ? theme.green : theme.line, borderWidth: on ? 2 : 1 }} onPress={() => settings.setMode(m)}>
              <View style={{ height: 48, borderRadius: radius.sm, backgroundColor: m === "dark" ? "#16222B" : "#F3F1EC", marginBottom: space.md, justifyContent: "center", paddingHorizontal: 10, gap: 5 }}>
                <View style={{ height: 5, width: "65%", borderRadius: 3, backgroundColor: theme.green }} />
                <View style={{ height: 5, width: "40%", borderRadius: 3, backgroundColor: m === "dark" ? "#2C3E4B" : "#DEDCD5" }} />
              </View>
              <Body weight="600" size={font.s13}>{m === "dark" ? `🌙 ${t("dark")}` : `☀️ ${t("light")}`}</Body>
            </Card>
          );
        })}
      </View>
      <Card style={{ marginTop: space.md, paddingVertical: 0 }}>
        <ToggleRow title={t("matchDevice")} value={settings.mode === "system"} onValueChange={(v) => settings.setMode(v ? "system" : "light")} />
      </Card>

      <SectionLabel>{t("language")}</SectionLabel>
      <Card style={{ paddingVertical: 0 }}>
        {LANGS.map((l, i) => (
          <View key={l.code}>
            {i > 0 ? <Divider /> : null}
            <Pressable onPress={() => settings.setLang(l.code)} style={{ flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: 14 }}>
              <Body size={font.s18}>{l.flag}</Body>
              <Body weight="600" style={{ flex: 1 }}>{l.label}</Body>
              {settings.lang === l.code ? <Ionicons name="checkmark-circle" size={20} color={theme.green} /> : null}
            </Pressable>
          </View>
        ))}
      </Card>

      <SectionLabel>{t("modules")}</SectionLabel>
      <Body muted size={font.s12} style={{ marginBottom: space.md, marginTop: -4 }}>{t("modulesSub")}</Body>
      <Card style={{ paddingVertical: 0 }}>
        {OPTIONAL_MODULES.map((m, i) => (
          <View key={m.id}>
            {i > 0 ? <Divider /> : null}
            <ToggleRow icon={`${m.icon}-outline` as any} title={ka ? m.titleKa : m.titleEn} subtitle={ka ? m.blurbKa : m.blurbEn} value={settings.enabled[m.id] !== false} onValueChange={() => settings.toggleModule(m.id)} />
          </View>
        ))}
      </Card>

      <SectionLabel>{t("notifications")}</SectionLabel>
      <Card style={{ paddingVertical: 0 }}>
        <ToggleRow title={t("notifParcels")} value={settings.notifications.parcels} onValueChange={() => settings.toggleNotification("parcels")} />
        <Divider />
        <ToggleRow title={t("notifPromos")} value={settings.notifications.promos} onValueChange={() => settings.toggleNotification("promos")} />
        <Divider />
        <ToggleRow title={t("notifLoyalty")} value={settings.notifications.loyalty} onValueChange={() => settings.toggleNotification("loyalty")} />
      </Card>

      <SectionLabel>{ka ? "ხმები" : "Sounds"}</SectionLabel>
      <Card style={{ paddingVertical: 0 }}>
        <ToggleRow icon="volume-high-outline" title={ka ? "ჩატის ხმები" : "Chat sounds"} subtitle={ka ? "შეტყობინების გაგზავნა და მიღება" : "When a message is sent and received"} value={settings.sounds} onValueChange={settings.toggleSounds} />
      </Card>

      <Btn label={t("signOut")} variant="outline" icon="log-out-outline" style={{ marginTop: space.xxl }} onPress={async () => { await signOut(); router.replace("/sign-in"); }} />
      <View style={{ alignItems: "center", marginTop: space.lg }}>
        <Pill text="v1.0.0 · demo build" />
      </View>
    </Screen>
  );
}
