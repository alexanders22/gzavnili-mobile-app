import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang, useT } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import { MODULES, isNewModule, type AppModule } from "@/lib/modules";
import { useCustomer } from "@/lib/hooks";
import { Body, Card, Divider, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { DrawnBand } from "@/components/Drawing";
import { NewBadge } from "@/components/ModuleTile";

export default function More() {
  const { theme } = useTokens();
  const t = useT();
  const lang = useLang();
  const enabled = useSettings((s) => s.enabled);
  const { data: customer } = useCustomer();
  const visible = MODULES.filter((m) => m.core || enabled[m.id] !== false);
  const core = visible.filter((m) => m.core);
  const extra = visible.filter((m) => !m.core);
  const initials = (customer?.first_name?.[0] ?? "V") + (customer?.last_name?.[0] ?? "B");

  const Row = ({ m }: { m: AppModule }) => (
    <>
      <Card style={{ borderWidth: 0, backgroundColor: "transparent", paddingHorizontal: 0, paddingVertical: 13 }} onPress={() => router.push(m.route as any)}>
        <View style={[styles.row, { gap: space.md }]}>
          <View style={{ width: 36, height: 36, borderRadius: radius.sm, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name={`${m.icon}-outline` as any} size={17} color={theme.greenDeep} />
          </View>
          <View style={{ flex: 1 }}>
            <Body weight="600">{lang === "ka" ? m.titleKa : m.titleEn}</Body>
            <Body muted size={font.s12}>{lang === "ka" ? m.blurbKa : m.blurbEn}</Body>
          </View>
          {isNewModule(m) ? <NewBadge /> : null}
          <Ionicons name="chevron-forward" size={17} color={theme.faint} />
        </View>
      </Card>
      <Divider />
    </>
  );

  return (
    <Screen>
      <Title>{t("more")}</Title>
      <Card style={{ marginTop: space.lg }} onPress={() => router.push("/settings" as any)}>
        <View style={[styles.row, { gap: space.md }]}>
          <View style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: theme.green, alignItems: "center", justifyContent: "center" }}>
            <Body weight="700" style={{ color: theme.greenDeep }}>{initials}</Body>
          </View>
          <View style={{ flex: 1 }}>
            <Body weight="700">{customer?.first_name ?? "Vasil"} {customer?.last_name ?? ""}</Body>
            <Body muted size={font.s12}>{t("room")} {customer?.room_number ?? "—"}</Body>
          </View>
          <Ionicons name="settings-outline" size={19} color={theme.faint} />
        </View>
      </Card>
      <SectionLabel>Gzavnili</SectionLabel>
      <Card style={{ paddingVertical: 0 }}>{core.map((m) => <Row key={m.id} m={m} />)}</Card>
      {extra.length ? (
        <>
          <SectionLabel>{t("modules")}</SectionLabel>
          <Card style={{ paddingVertical: 0 }}>{extra.map((m) => <Row key={m.id} m={m} />)}</Card>
        </>
      ) : null}
      <DrawnBand name="support" width={130} bg={theme.paper} note={lang === "ka" ? "კითხვები?\nაქ ვართ." : "Questions?\nWe’re here."} style={{ marginTop: space.xl }} />
    </Screen>
  );
}
