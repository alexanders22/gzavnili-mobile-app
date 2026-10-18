import React from "react";
import { Pressable, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { Body, Btn, Card, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { PlaneArt } from "@/components/PlaneArt";

const ROUTES = [
  { id: "us", flag: "🇺🇸", en: "USA", ka: "აშშ", via: "air", price: 6, days: "7–10" },
  { id: "cn-air", flag: "🇨🇳", en: "China", ka: "ჩინეთი", via: "air", price: 5, days: "10–14" },
  { id: "cn-sea", flag: "🇨🇳", en: "China", ka: "ჩინეთი", via: "sea", price: 3, days: "25–35" },
] as const;
const BEST = Math.min(...ROUTES.map((r) => r.price));

export default function Rates() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const perks: { icon: React.ComponentProps<typeof Ionicons>["name"]; text: string }[] = [
    { icon: "shield-checkmark-outline", text: ka ? "დაზღვევა ყველა ამანათზე" : "Insurance on every parcel" },
    { icon: "cube-outline", text: ka ? "უფასო გადაფუთვა" : "Free repacking" },
    { icon: "car-outline", text: ka ? "მიწოდება თბილისში 5₾" : "Delivery in Tbilisi 5₾" },
    { icon: "time-outline", text: ka ? "30 დღე უფასო შენახვა" : "30 days free storage" },
  ];
  return (
    <Screen>
      <View style={[styles.row, { gap: space.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "ტარიფები" : "Rates"}</Title>
      </View>

      {/* Hero banner */}
      <View style={{ marginTop: space.lg, borderRadius: radius.lg, backgroundColor: theme.green, padding: space.lg }}>
        <View style={[styles.row, { gap: space.sm }]}>
          <Body size={font.s28}>🇺🇸</Body>
          <Body size={font.s28}>🇨🇳</Body>
          <View style={{ flex: 1, alignItems: "center" }}><PlaneArt size={110} color={theme.greenDeep} /></View>
          <Body size={font.s28}>🇬🇪</Body>
        </View>
        <Body size={font.s28} weight="800" style={{ color: theme.greenDeep, marginTop: space.md }}>{ka ? "$3/კგ-დან" : "From $3 / kg"}</Body>
        <Body size={font.s13} weight="600" style={{ color: theme.greenDeep, opacity: 0.8 }}>{ka ? "დაზღვევა და გადაფუთვა ფასში" : "Insurance and repacking included"}</Body>
        <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, marginTop: space.lg, backgroundColor: theme.greenDeep, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 11 }}>
          <Ionicons name="paper-plane" size={15} color={theme.green} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Body size={10} weight="700" style={{ color: theme.greenSoft, letterSpacing: 0.6 }}>{(ka ? "შემდეგი რეისი" : "Next flight").toUpperCase()}</Body>
            <Body size={font.s13} weight="700" numberOfLines={1} style={{ color: "#fff" }}>GZ-0832 · 22 Aug · {ka ? "აშშ → საქართველო" : "USA → Georgia"}</Body>
          </View>
        </View>
      </View>

      <SectionLabel>{ka ? "ფასი კილოგრამზე" : "Price per kilogram"}</SectionLabel>
      <View style={{ gap: space.sm }}>
        {ROUTES.map((r) => {
          const best = r.price === BEST;
          const air = r.via === "air";
          return (
            <Card key={r.id} style={{ paddingVertical: space.md, borderColor: best ? theme.green : theme.line, borderWidth: best ? 1.5 : 1 }}>
              <View style={[styles.row, { gap: space.md }]}>
                <View style={{ width: 46, height: 46, borderRadius: radius.md, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
                  <Body size={font.s22}>{r.flag}</Body>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <View style={[styles.row, { gap: 6, flexWrap: "wrap" }]}>
                    <Body weight="700" size={font.s14} numberOfLines={1}>{ka ? r.ka : r.en}</Body>
                    <Body size={font.s12}>→</Body>
                    <Body size={font.s13}>🇬🇪</Body>
                    {best ? <Pill text={ka ? "საუკეთესო ფასი" : "Best price"} tone="ok" /> : null}
                  </View>
                  <View style={[styles.row, { gap: 6, marginTop: 4 }]}>
                    <Ionicons name={air ? "airplane-outline" : "boat-outline"} size={12} color={theme.faint} />
                    <Body muted size={font.s11} numberOfLines={1}>{air ? (ka ? "საჰაერო" : "Air") : ka ? "საზღვაო" : "Sea"} · {r.days} {ka ? "დღე" : "days"}</Body>
                  </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <Body size={font.s22} weight="800" style={{ color: best ? theme.greenDeep : theme.ink }}>${r.price}</Body>
                  <Body muted size={10} weight="700">/ kg</Body>
                </View>
              </View>
            </Card>
          );
        })}
      </View>

      <SectionLabel>{ka ? "ფასში შედის" : "Included in the price"}</SectionLabel>
      <Card style={{ paddingVertical: space.md }}>
        {perks.map((p) => (
          <View key={p.text} style={[styles.row, { gap: space.md, paddingVertical: 9 }]}>
            <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={p.icon} size={15} color={theme.greenDeep} />
            </View>
            <Body size={font.s13} style={{ flex: 1, minWidth: 0 }}>{p.text}</Body>
          </View>
        ))}
      </Card>

      <Btn label={ka ? "გამოთვალე ფასი" : "Calculate my price"} icon="calculator-outline" onPress={() => router.push("/calculator" as any)} style={{ marginTop: space.lg }} />
      <View style={{ alignItems: "center", marginTop: space.lg }}>
        <Pill text={ka ? "სადემონსტრაციო ფასები" : "Demo pricing"} tone="info" />
      </View>
    </Screen>
  );
}
