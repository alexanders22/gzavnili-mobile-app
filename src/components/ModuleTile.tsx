import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { isNewModule, type AppModule } from "@/lib/modules";
import { Body, Card, useTokens } from "@/ui";

export const TILE_HEIGHT = 138;

export function NewBadge() {
  const { theme } = useTokens();
  return (
    <View style={{ backgroundColor: theme.green, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 3 }}>
      <Body size={10} weight="800" style={{ color: theme.greenDeep, letterSpacing: 0.5 }}>NEW</Body>
    </View>
  );
}

/** Square-ish card for a service module (used on More and the module grid). */
export function ModuleTile({ module }: { module: AppModule }) {
  const { theme } = useTokens();
  const lang = useLang();
  return (
    <Card style={{ height: TILE_HEIGHT, justifyContent: "flex-start" }} onPress={() => router.push(module.route as any)}>
      <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
        <View style={{ width: 34, height: 34, borderRadius: radius.sm, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name={`${module.icon}-outline` as any} size={17} color={theme.greenDeep} />
        </View>
        <View style={{ flex: 1 }} />
        {isNewModule(module) ? <NewBadge /> : null}
      </View>
      <Body weight="700" size={font.s13} numberOfLines={1} style={{ marginTop: space.md }}>{lang === "ka" ? module.titleKa : module.titleEn}</Body>
      <Body muted size={font.s12} numberOfLines={2} style={{ marginTop: 2 }}>{lang === "ka" ? module.blurbKa : module.blurbEn}</Body>
    </Card>
  );
}
