import React from "react";
import { View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { Body, Card, Screen, Title, useTokens } from "@/ui";

/** Temporary screen body while the real one is being rebuilt. */
export function Placeholder({ title, icon = "construct-outline", back = true }: { title: string; icon?: keyof typeof Ionicons.glyphMap; back?: boolean }) {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  return (
    <Screen title={title} back={back}>
      <Card style={{ alignItems: "center", paddingVertical: space.xxl, marginTop: space.lg }}>
        <View style={{ width: 56, height: 56, borderRadius: radius.md, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center", marginBottom: space.md }}>
          <Ionicons name={icon} size={26} color={theme.greenDeep} />
        </View>
        <Title>{title}</Title>
        <Body muted size={font.s13} style={{ marginTop: 6, textAlign: "center" }}>{ka ? "ეკრანი მალე დაემატება" : "This screen is being rebuilt"}</Body>
      </Card>
    </Screen>
  );
}
