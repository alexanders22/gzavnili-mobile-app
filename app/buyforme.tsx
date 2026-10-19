import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { DrawnBand } from "@/components/Drawing";
import { NewBadge } from "@/components/ModuleTile";

// Demo requests, as in the original (the service is not backed by the API yet).
const REQUESTS = [
  { id: "b1", title: "Dyson Airwrap", store: "amazon.com", price: "$549", state: "bought", emoji: "💨" },
  { id: "b2", title: "Nike Air Max 90", store: "nike.com", price: "$129", state: "quoted", emoji: "👟" },
  { id: "b3", title: "Sony WH-1000XM5", store: "bestbuy.com", price: "—", state: "review", emoji: "🎧" },
] as const;
const STATE = {
  review: { ka: "მოწმდება", en: "In review", tone: "info" as const },
  quoted: { ka: "ფასი მზადაა", en: "Quote ready", tone: "warn" as const },
  bought: { ka: "შეძენილია", en: "Purchased", tone: "ok" as const },
};

export default function BuyForMe() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const [link, setLink] = useState("");
  const [notes, setNotes] = useState("");
  const [sent, setSent] = useState(false);
  const steps = ka
    ? ["გამოგვიგზავნე ბმული", "ვამოწმებთ და ვაფასებთ", "ადასტურებ, ჩვენ ვყიდულობთ", "ამანათი მოდის შენთან"]
    : ["Send us the product link", "We check it and quote a price", "You approve, we buy it", "The parcel ships to you"];
  const input = { backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 13, color: theme.ink, fontSize: font.s13 } as const;

  return (
    <Screen>
      <View style={styles.between}>
        <View style={[styles.row, { gap: space.md, flexShrink: 1, minWidth: 0 }]}>
          <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
          <Title>{ka ? "იყიდე ჩემთვის" : "Buy For Me"}</Title>
        </View>
        <NewBadge />
      </View>
      <DrawnBand name="shop" width={96} bg={theme.pinkTint} note={ka ? "შენ ირჩევ —\nჩვენ ვყიდულობთ." : "You pick —\nwe buy it."} style={{ marginTop: space.lg }} />

      {sent ? (
        <Card style={{ marginTop: space.lg, alignItems: "center", paddingVertical: 30 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="checkmark" size={30} color={theme.brandText} />
          </View>
          <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{ka ? "მოთხოვნა გაიგზავნა" : "Request sent"}</Body>
          <Body muted size={font.s12} style={{ marginTop: 4, textAlign: "center" }}>{ka ? "ფასს გამოგიგზავნით 24 საათში" : "We'll send you a quote within 24 hours"}</Body>
          <Btn label={ka ? "კარგი" : "Done"} variant="outline" onPress={() => { setSent(false); setLink(""); setNotes(""); }} style={{ marginTop: space.xl, alignSelf: "stretch" }} />
        </Card>
      ) : (
        <>
          <Card style={{ marginTop: space.lg }}>
            <Body weight="700">{ka ? "პროდუქტის ბმული" : "Product link"}</Body>
            <TextInput value={link} onChangeText={setLink} placeholder="https://amazon.com/..." placeholderTextColor={theme.faint} autoCapitalize="none" style={{ ...input, marginTop: space.md }} />
            <TextInput value={notes} onChangeText={setNotes} placeholder={ka ? "ზომა, ფერი, რაოდენობა..." : "Size, colour, quantity…"} placeholderTextColor={theme.faint} multiline style={{ ...input, marginTop: space.sm, minHeight: 72, textAlignVertical: "top" }} />
            <Btn label={ka ? "ფასის მოთხოვნა" : "Request a quote"} icon="pricetag-outline" disabled={link.trim().length < 8} onPress={() => setSent(true)} style={{ marginTop: space.md }} />
          </Card>
          <SectionLabel>{ka ? "როგორ მუშაობს" : "How it works"}</SectionLabel>
          <Card>
            {steps.map((s, i) => (
              <View key={s} style={[styles.row, { gap: space.md, paddingVertical: 9 }]}>
                <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
                  <Body size={font.s11} weight="800" style={{ color: theme.brandText }}>{i + 1}</Body>
                </View>
                <Body size={font.s13} style={{ flex: 1, minWidth: 0 }}>{s}</Body>
              </View>
            ))}
          </Card>
        </>
      )}

      <SectionLabel>{ka ? "ჩემი მოთხოვნები" : "My requests"}</SectionLabel>
      <Card style={{ paddingVertical: 0 }}>
        {REQUESTS.map((r, i) => {
          const st = STATE[r.state];
          return (
            <View key={r.id}>
              {i > 0 ? <Divider /> : null}
              <View style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                <View style={{ width: 40, height: 40, borderRadius: radius.sm, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center" }}>
                  <Body size={font.s18}>{r.emoji}</Body>
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body weight="600" numberOfLines={1}>{r.title}</Body>
                  <Body muted size={font.s12} numberOfLines={1}>{r.store} · {r.price}</Body>
                </View>
                <Pill text={ka ? st.ka : st.en} tone={st.tone} />
              </View>
            </View>
          );
        })}
      </Card>
    </Screen>
  );
}
