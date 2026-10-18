// "Parcel" tab (module 898): pick the direction with a swap button, then go to the incoming or outgoing form.
import React, { useRef, useState } from "react";
import { Animated, Easing, Pressable, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { Body, Btn, Card, Screen, Title, styles, useTokens } from "@/ui";
import { Drawing, Note } from "@/components/Drawing";
import { NewBadge } from "@/components/ModuleTile";

type Point = { code: string; city: string; flag: string };

function Endpoint({ label, point, align = "left" }: { label: string; point: Point; align?: "left" | "right" }) {
  const { theme } = useTokens();
  const items = align === "right" ? "flex-end" : "flex-start";
  return (
    <View style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0, alignItems: items }}>
      <Body size={font.s11} weight="700" style={{ color: theme.faint, letterSpacing: 0.6 }}>{label}</Body>
      <View style={[styles.row, { gap: 6, marginTop: 6 }]}>
        <Body size={font.s16}>{point.flag}</Body>
        <Body size={font.s22} weight="700" numberOfLines={1} style={{ color: "#fff" }}>{point.code}</Body>
      </View>
      <Body size={font.s12} numberOfLines={1} style={{ color: theme.faint, marginTop: 2 }}>{point.city}</Body>
    </View>
  );
}

export default function AddTracking() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const [out, setOut] = useState(false);
  const spin = useRef(new Animated.Value(0)).current;
  const turns = useRef(0);
  const rotate = spin.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] });
  const abroad: Point = { code: ka ? "აშშ" : "USA", city: ka ? "საზღვარგარეთი" : "Abroad", flag: "🌍" };
  const tbilisi: Point = { code: "TBS", city: ka ? "თბილისი" : "Tbilisi", flag: "🇬🇪" };
  const from = out ? tbilisi : abroad;
  const to = out ? abroad : tbilisi;
  const swap = () => {
    turns.current += 1;
    Animated.timing(spin, { toValue: turns.current, duration: 380, easing: Easing.inOut(Easing.cubic), useNativeDriver: true }).start();
    setOut((v) => !v);
  };
  return (
    <Screen>
      <Title>{ka ? "ამანათი" : "Parcel"}</Title>
      <Body muted style={{ marginTop: 4 }}>{ka ? "რა გინდა გააკეთო?" : "What would you like to do?"}</Body>
      <Card style={{ marginTop: space.lg, backgroundColor: theme.navy, borderColor: theme.navy, paddingVertical: space.xl }}>
        <View style={styles.row}>
          <Endpoint label={ka ? "საიდან" : "FROM"} point={from} />
          <Pressable onPress={swap} hitSlop={14} style={{ paddingHorizontal: space.sm }}>
            <Animated.View style={{ width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: theme.green, backgroundColor: theme.navySoft, alignItems: "center", justifyContent: "center", transform: [{ rotate }] }}>
              <Ionicons name="swap-horizontal" size={20} color={theme.green} />
            </Animated.View>
          </Pressable>
          <Endpoint label={ka ? "სად" : "TO"} point={to} align="right" />
        </View>
        <View style={{ height: 1, backgroundColor: theme.navySoft, marginTop: space.xl, marginBottom: space.md }} />
        <View style={[styles.row, { gap: space.sm }]}>
          <Ionicons name={out ? "paper-plane-outline" : "cube-outline"} size={15} color={theme.green} />
          <Body size={font.s12} style={{ color: theme.faint, flex: 1, minWidth: 0 }}>{out ? (ka ? "გზავნილი საქართველოდან" : "Shipping out of Georgia") : ka ? "ამანათი შენს მისამართზე" : "A parcel coming to you"}</Body>
          {out ? <NewBadge /> : null}
        </View>
      </Card>
      <Btn
        label={out ? (ka ? "გაგზავნის დაწყება" : "Start a shipment") : ka ? "თრექინგის დამატება" : "Add a tracking code"}
        icon={out ? "paper-plane-outline" : "add"}
        onPress={() => router.push((out ? "/add-outgoing" : "/add-incoming") as any)}
        style={{ marginTop: space.lg }}
      />
      <Body muted size={font.s11} style={{ marginTop: space.md, textAlign: "center" }}>{ka ? "მიმართულების შესაცვლელად შეეხე ისარს" : "Tap the arrows to switch direction"}</Body>
      <View style={[styles.row, { justifyContent: "center", alignItems: "flex-start", gap: space.md, marginTop: space.xl }]}>
        <Note align="left" size={20} tilt={-5} style={{ marginTop: space.lg, flexShrink: 1 }}>
          {out ? (ka ? "საქართველოდან —\nმსოფლიოში." : "From Georgia\nto the world.") : ka ? "ნებისმიერი ადგილიდან —\nსაქართველოში." : "From anywhere\nto Georgia."}
        </Note>
        <Drawing name={out ? "how" : "parcels"} width={out ? 110 : 130} float />
      </View>
    </Screen>
  );
}
