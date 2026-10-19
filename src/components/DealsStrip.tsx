import React, { useMemo } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { router } from "expo-router";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { categoryById, discountOf, recommendedDeals, USD_TO_GEL } from "@/data/shop";
import { Body, styles, useTokens } from "@/ui";

/** "Recommended for you": today's best-discount category from US stores. */
export function DealsStrip() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { cat, products } = useMemo(() => recommendedDeals(8), []);
  const category = categoryById(cat);
  if (!products.length || !category) return null;
  const openShop = () => router.push(`/shop?cat=${cat}` as any);
  return (
    <View style={{ marginTop: space.xl }}>
      <View style={[styles.between, { marginBottom: space.md, gap: space.sm }]}>
        <View style={[styles.row, { gap: space.sm, flexShrink: 1, minWidth: 0 }]}>
          <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="sparkles" size={13} color={theme.brandText} />
          </View>
          <Body weight="700" size={font.s16} numberOfLines={1} style={{ flexShrink: 1, minWidth: 0 }}>{ka ? "შენთვის შერჩეული" : "Recommended for you"}</Body>
        </View>
        <Pressable onPress={openShop} hitSlop={8} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: theme.tint2, borderRadius: radius.pill, paddingLeft: 12, paddingRight: 9, paddingVertical: 6, opacity: pressed ? 0.75 : 1 })}>
          <Body size={font.s12} weight="700" style={{ color: theme.brandText }}>{ka ? "ყველა" : "View all"}</Body>
          <Ionicons name="arrow-forward" size={13} color={theme.brandText} />
        </Pressable>
      </View>
      <Body muted size={font.s12} style={{ marginBottom: space.md }}>
        {ka ? `${category.ka} — საუკეთესო ფასდაკლებები აშშ-ს მაღაზიებში` : `${category.en} — the biggest drops in US stores right now`}
      </Body>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginHorizontal: -space.lg }} contentContainerStyle={{ paddingHorizontal: space.lg, gap: space.sm }}>
        {products.map((p) => {
          const off = discountOf(p);
          return (
            <Pressable key={p.id} onPress={openShop} style={({ pressed }) => ({ width: 138, borderRadius: radius.lg, borderWidth: 1, borderColor: theme.line, backgroundColor: theme.card, padding: space.md, opacity: pressed ? 0.8 : 1 })}>
              <View style={{ height: 58, borderRadius: radius.md, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center" }}>
                <Body size={28}>{p.emoji}</Body>
                {off ? (
                  <View style={{ position: "absolute", top: 6, right: 6, backgroundColor: theme.red, borderRadius: radius.pill, paddingHorizontal: 7, paddingVertical: 2 }}>
                    <Body size={10} weight="800" style={{ color: "#fff" }}>-{off}%</Body>
                  </View>
                ) : null}
              </View>
              <Body muted size={font.s11} numberOfLines={1} style={{ marginTop: space.sm }}>{p.store}</Body>
              <Body weight="700" size={font.s12} numberOfLines={2} style={{ minHeight: 32 }}>{p.name}</Body>
              <View style={[styles.row, { gap: 5, flexWrap: "wrap" }]}>
                <Body weight="800" size={font.s14} style={{ color: off ? theme.red : theme.ink }}>${p.price}</Body>
                {p.was ? <Body muted size={font.s11} style={{ textDecorationLine: "line-through" }}>${p.was}</Body> : null}
              </View>
              <Body muted size={font.s11}>≈ ₾{Math.round(p.price * USD_TO_GEL)}</Body>
            </Pressable>
          );
        })}
        <Pressable onPress={openShop} style={({ pressed }) => ({ width: 116, borderRadius: radius.lg, backgroundColor: theme.navy, padding: space.md, alignItems: "center", justifyContent: "center", gap: 6, opacity: pressed ? 0.8 : 1 })}>
          <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.greenDeep, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="arrow-forward" size={17} color={theme.green} />
          </View>
          <Body size={font.s12} weight="700" numberOfLines={2} style={{ color: "#fff", textAlign: "center" }}>{ka ? `${category.ka} — ყველა` : `All ${category.en.toLowerCase()}`}</Body>
        </Pressable>
      </ScrollView>
    </View>
  );
}
