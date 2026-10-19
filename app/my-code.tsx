import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Easing, Pressable, View, ViewStyle } from "react-native";
import * as Clipboard from "expo-clipboard";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useCustomer, useDemoTracking, type DemoTracking } from "@/lib/hooks";
import { Body, Btn, Card, Pill, Screen, Title, styles, useTokens } from "@/ui";
import { Barcode } from "@/ui/Barcode";

export default function MyCode() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const params = useLocalSearchParams<{ tab?: string }>();
  const [tab, setTab] = useState<"code" | "scan">(params.tab === "scan" ? "scan" : "code");
  const tabs = [
    { id: "code" as const, icon: "barcode-outline" as const, label: ka ? "ოთახის ნომერი" : "Room number" },
    { id: "scan" as const, icon: "scan-outline" as const, label: ka ? "სკანერი" : "Scan a label" },
  ];
  return (
    <Screen>
      <View style={[styles.row, { gap: space.md }]}>
        <Pressable onPress={() => (router.canGoBack() ? router.back() : router.replace("/"))} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "ჩემი კოდი" : "My code"}</Title>
      </View>
      <View style={{ flexDirection: "row", gap: space.sm, backgroundColor: theme.paper, padding: 4, borderRadius: radius.pill, marginTop: space.lg }}>
        {tabs.map((t) => {
          const on = tab === t.id;
          return (
            <Pressable key={t.id} onPress={() => setTab(t.id)} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: radius.pill, backgroundColor: on ? theme.card : "transparent" }}>
              <Ionicons name={t.icon} size={16} color={on ? theme.brandText : theme.mut} />
              <Body size={font.s13} weight={on ? "700" : "500"} style={{ color: on ? theme.brandText : theme.mut }}>{t.label}</Body>
            </Pressable>
          );
        })}
      </View>
      {tab === "code" ? <RoomCode /> : <Scanner />}
    </Screen>
  );
}

/** The room number as a printable card with a Code 128 barcode. */
function RoomCode() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { data: customer } = useCustomer();
  const [copied, setCopied] = useState(false);
  const room = customer?.room_number ?? "";
  const p = customer?.profile;
  const name = (ka ? [p?.first_name_ka, p?.last_name_ka] : [p?.first_name_en, p?.last_name_en]).filter(Boolean).join(" ");
  const copy = async () => { await Clipboard.setStringAsync(room); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const tips: { icon: React.ComponentProps<typeof Ionicons>["name"]; text: string }[] = [
    { icon: "business-outline", text: ka ? "აჩვენე ფილიალში ამანათის გასატანად" : "Show it at a branch to collect your parcels" },
    { icon: "bicycle-outline", text: ka ? "კურიერი სკანირს ამანათის გადაცემისას" : "Couriers scan it when they hand a parcel over" },
    { icon: "home-outline", text: ka ? "აშშ და ჩინეთის მისამართში — Suite / ოთახი" : "It is the Suite in your USA and China addresses" },
  ];
  return (
    <>
      <Body muted size={font.s13} style={{ marginTop: space.lg }}>
        {ka ? "ოთახის ნომერი — შენი პირადი Gzavnili ნომერი. ის შენი აშშ და ჩინეთის მისამართშია, რომ საწყობმა ამანათი შენ მიაკუთვნოს." : "Your room number is your personal Gzavnili number. It is part of your USA and China warehouse addresses, so the warehouse knows a parcel is yours."}
      </Body>
      {/* Always white: it is meant to be scanned, even in dark mode. */}
      <View style={{ marginTop: space.lg, backgroundColor: "#FFFFFF", borderRadius: radius.lg, borderWidth: 1, borderColor: theme.line, padding: space.xl, alignItems: "center" }}>
        <Body size={font.s11} weight="700" style={{ color: "#5C594F", letterSpacing: 1 }}>GZAVNILI · {(ka ? "ოთახი" : "Room").toUpperCase()}</Body>
        {room ? (
          <>
            <Body weight="700" style={{ color: "#121D25", fontSize: 34, letterSpacing: 2, marginTop: 6 }}>{room}</Body>
            {name ? <Body size={font.s13} style={{ color: "#5C594F", marginTop: 2 }}>{name}</Body> : null}
            <View style={{ alignSelf: "stretch", marginTop: space.lg }}><Barcode value={room} height={84} /></View>
            <Body size={font.s12} style={{ color: "#98948A", marginTop: 6, letterSpacing: 3 }}>{room}</Body>
          </>
        ) : (
          <ActivityIndicator color={theme.green} style={{ marginVertical: 40 }} />
        )}
      </View>
      <Btn label={copied ? (ka ? "დაკოპირდა" : "Copied") : ka ? "ოთახის ნომრის კოპირება" : "Copy room number"} icon={copied ? "checkmark" : "copy-outline"} variant="outline" onPress={copy} disabled={!room} style={{ marginTop: space.md }} />
      <Card style={{ marginTop: space.lg, gap: space.md }}>
        {tips.map((t) => (
          <View key={t.icon} style={[styles.row, { gap: space.md }]}>
            <View style={{ width: 32, height: 32, borderRadius: radius.sm, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name={t.icon} size={16} color={theme.brandText} />
            </View>
            <Body size={font.s13} style={{ flex: 1, minWidth: 0 }}>{t.text}</Body>
          </View>
        ))}
      </Card>
    </>
  );
}

/** Simulated camera: a scan line sweeps a label, then a demo tracking number "is read". */
function Scanner() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const demo = useDemoTracking();
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<DemoTracking | null>(null);
  const line = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!scanning) return;
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(line, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
      Animated.timing(line, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: false }),
    ]));
    loop.start();
    const t = setTimeout(() => demo.mutate(undefined, { onSuccess: (r) => { setResult(r); setScanning(false); }, onError: () => setScanning(false) }), 2600);
    return () => { loop.stop(); clearTimeout(t); };
  }, [scanning]);

  const Corner = (s: ViewStyle) => <View style={[{ position: "absolute", width: 34, height: 34, borderColor: theme.green }, s]} />;
  return (
    <>
      <View style={{ marginTop: space.lg, height: 280, borderRadius: radius.lg, backgroundColor: "#0B1116", overflow: "hidden", alignItems: "center", justifyContent: "center" }}>
        <View style={{ width: "70%", backgroundColor: "#F6F3EC", borderRadius: 8, padding: 12, opacity: result ? 1 : 0.85, transform: [{ rotate: "-3deg" }] }}>
          <Body size={10} weight="700" style={{ color: "#121D25" }}>{result?.carrier ?? "UPS"} · SHIP TO GZ</Body>
          <View style={{ marginTop: 6 }}><Barcode value={result?.tracking_number ?? "1Z999AA10123456784"} height={46} /></View>
          <Body size={9} style={{ color: "#5C594F", marginTop: 3 }}>{result?.tracking_number ?? "1Z 999 AA1 01 2345 6784"}</Body>
        </View>
        {Corner({ top: 26, left: 26, borderTopWidth: 3, borderLeftWidth: 3, borderTopLeftRadius: 10 })}
        {Corner({ top: 26, right: 26, borderTopWidth: 3, borderRightWidth: 3, borderTopRightRadius: 10 })}
        {Corner({ bottom: 26, left: 26, borderBottomWidth: 3, borderLeftWidth: 3, borderBottomLeftRadius: 10 })}
        {Corner({ bottom: 26, right: 26, borderBottomWidth: 3, borderRightWidth: 3, borderBottomRightRadius: 10 })}
        {scanning ? (
          <Animated.View style={{ position: "absolute", left: 34, right: 34, top: 0, height: 2, backgroundColor: theme.green, shadowColor: theme.green, shadowOpacity: 0.9, shadowRadius: 8, transform: [{ translateY: line.interpolate({ inputRange: [0, 1], outputRange: [40, 240] }) }] }} />
        ) : null}
        <View style={{ position: "absolute", bottom: 10, left: 0, right: 0, alignItems: "center" }}>
          <Body size={font.s12} weight="600" style={{ color: result ? theme.green : "rgba(255,255,255,0.75)" }}>
            {result ? (ka ? "შტრიხკოდი ამოიკითხდა" : "Barcode read") : scanning ? (ka ? "მიმართე კამერა ამანათის ეტიკეტზე" : "Point the camera at the parcel label") : ka ? "ვერ ამოიკითხდა" : "Couldn't read it"}
          </Body>
        </View>
      </View>
      {result ? (
        <Card style={{ marginTop: space.lg }}>
          <View style={styles.between}>
            <Pill text={result.carrier} tone="info" />
            <Body muted size={font.s11}>{result.origin === "china" ? "🇨🇳 China" : "🇺🇸 USA"}</Body>
          </View>
          <Body weight="700" size={font.s16} style={{ marginTop: space.md }}>{result.tracking_number}</Body>
          <Body muted size={font.s12} style={{ marginTop: 2 }}>{result.name}</Body>
          <Btn label={ka ? "ამანათის დამატება" : "Add as a parcel"} icon="add" onPress={() => router.push(`/add-incoming?tracking=${encodeURIComponent(result.tracking_number)}&name=${encodeURIComponent(result.name)}&origin=${result.origin}` as any)} style={{ marginTop: space.lg }} />
          <Btn label={ka ? "კიდევ სკანირება" : "Scan another"} icon="scan-outline" variant="outline" onPress={() => { setResult(null); setScanning(true); }} style={{ marginTop: space.sm }} />
        </Card>
      ) : scanning ? null : (
        <Btn label={ka ? "თავიდან" : "Try again"} onPress={() => setScanning(true)} style={{ marginTop: space.lg }} />
      )}
      <Body muted size={font.s11} style={{ marginTop: space.md, textAlign: "center" }}>{ka ? "ვებ-დემოში კამერა სიმულირდება" : "The camera is simulated in the web demo"}</Body>
    </>
  );
}
