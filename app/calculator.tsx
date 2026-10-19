import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useSettings } from "@/lib/settings";
import { useIsDesktop } from "@/lib/layout";
import { useCalculatorMeta, useCalculatorQuote, type CalcCountry, type CalcOrigin } from "@/lib/hooks";
import { Body, Btn, Card, Pill, Screen, SectionLabel, Title, ToggleRow, styles, useTokens } from "@/ui";
import { TourTarget } from "@/lib/tour";
import { KraftBox } from "@/components/KraftBox";

// Fallbacks until /calculator/meta answers (same values the backend ships).
const ORIGINS: CalcOrigin[] = [
  { code: "usa", name: "USA", nameKa: "აშშ", flag: "🇺🇸", days: "7–10", currency: "USD" },
  { code: "china", name: "China", nameKa: "ჩინეთი", flag: "🇨🇳", days: "10–14", currency: "CNY" },
];
const COUNTRIES: CalcCountry[] = [
  { code: "US", name: "USA", nameKa: "აშშ", flag: "🇺🇸", days: "5–8", perKg: 24 },
  { code: "DE", name: "Germany", nameKa: "გერმანია", flag: "🇩🇪", days: "4–6", perKg: 19 },
  { code: "GB", name: "United Kingdom", nameKa: "დიდი ბრიტანეთი", flag: "🇬🇧", days: "4–7", perKg: 21 },
  { code: "TR", name: "Türkiye", nameKa: "თურქეთი", flag: "🇹🇷", days: "2–4", perKg: 12 },
];
const FEES = { delivery: 5, repack: 5, pickup: 5, customs_threshold: 300, customs_rate: 0.18 };
const LINE_LABELS: Record<string, { ka: string; en: string }> = {
  freight: { ka: "ტრანსპორტირება", en: "Freight" },
  insurance: { ka: "დაზღვევა", en: "Insurance" },
  service: { ka: "მომსახურება", en: "Service fee" },
  repack: { ka: "გადაფუთვა", en: "Repacking" },
  delivery: { ka: "კურიერი კარამდე", en: "Courier to your door" },
  customs: { ka: "საბაჟო გადასახადი", en: "Customs duty" },
  handling: { ka: "დამუშავება", en: "Handling" },
  pickup: { ka: "კურიერის გამოძახება", en: "Courier pickup" },
};
const SYMBOL: Record<string, string> = { USD: "$", CNY: "¥", GEL: "₾" };
const WEIGHT_PRESETS = [0.5, 1, 2, 5, 10, 20];
const gel = (n: number) => `₾${n.toFixed(2)}`;

export default function Calculator() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const desktop = useIsDesktop();
  const loyaltyOn = useSettings((s) => s.isEnabled)("loyalty");
  const params = useLocalSearchParams<{ direction?: string }>();
  const [direction, setDirection] = useState<"in" | "out">(params.direction === "out" ? "out" : "in");
  const [origin, setOrigin] = useState("usa");
  const [country, setCountry] = useState("US");
  const [weight, setWeight] = useState(2);
  const [weightStr, setWeightStr] = useState("2");
  const [valueStr, setValueStr] = useState("");
  const [courier, setCourier] = useState(true);
  const [repack, setRepack] = useState(false);

  const { data: meta } = useCalculatorMeta();
  const origins = meta?.origins ?? ORIGINS;
  const countries = meta?.countries ?? COUNTRIES;
  const fees = meta?.fees ?? FEES;
  const maxWeight = meta?.max_weight ?? 30;
  const from = origins.find((o) => o.code === origin) ?? origins[0];
  const to = countries.find((c) => c.code === country) ?? countries[0];
  const value = Number(valueStr.replace(",", ".")) || 0;

  const { data: quoteRaw, isFetching, isError } = useCalculatorQuote({ direction, origin, country, weight, value: direction === "in" ? value : 0, courier, repack: direction === "in" && repack });
  const quote = quoteRaw?.direction === direction ? quoteRaw : undefined;

  const setW = (w: number) => { const v = Math.min(maxWeight, Math.max(0.1, Math.round(w * 10) / 10)); setWeight(v); setWeightStr(String(v)); };
  const onWeightText = (t: string) => { setWeightStr(t); const n = Number(t.replace(",", ".")); if (n > 0 && n <= maxWeight) setWeight(Math.round(n * 10) / 10); };

  const Chip = ({ on, label, onPress }: { on: boolean; label: string; onPress: () => void }) => (
    <Pressable onPress={onPress} style={{ paddingHorizontal: 13, paddingVertical: 8, borderRadius: radius.pill, borderWidth: 1, borderColor: on ? theme.greenDeep : theme.line, backgroundColor: on ? theme.tint2 : theme.card }}>
      <Body size={font.s12} weight={on ? "700" : "500"} style={{ color: on ? theme.brandText : theme.ink }}>{label}</Body>
    </Pressable>
  );
  const Endpoint = ({ flag, caption, name, align }: { flag: string; caption: string; name: string; align: "left" | "right" }) => (
    <View style={{ flex: 1, minWidth: 0, alignItems: align === "left" ? "flex-start" : "flex-end" }}>
      <Body size={font.s11} weight="700" style={{ color: theme.faint, letterSpacing: 0.6 }}>{caption.toUpperCase()}</Body>
      <Body size={30} style={{ marginTop: 6 }}>{flag}</Body>
      <Body weight="700" size={font.s16} numberOfLines={1} style={{ marginTop: 4 }}>{name}</Body>
    </View>
  );

  const form = (
    <>
      <TourTarget id="calc.dir">
      <View style={{ flexDirection: "row", gap: space.sm, backgroundColor: theme.paper, padding: 4, borderRadius: radius.pill }}>
        {([{ id: "in" as const, icon: "cube-outline" as const, label: ka ? "მიღება" : "Receive" }, { id: "out" as const, icon: "paper-plane-outline" as const, label: ka ? "გაგზავნა" : "Send" }]).map((d) => {
          const on = direction === d.id;
          return (
            <Pressable key={d.id} onPress={() => setDirection(d.id)} style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10, borderRadius: radius.pill, backgroundColor: on ? theme.card : "transparent" }}>
              <Ionicons name={d.icon} size={15} color={on ? theme.brandText : theme.mut} />
              <Body size={font.s13} weight={on ? "700" : "500"} style={{ color: on ? theme.brandText : theme.mut }}>{d.label}</Body>
            </Pressable>
          );
        })}
      </View>
      </TourTarget>

      <TourTarget id="calc.route">
      <Card style={{ marginTop: space.lg }}>
        <View style={[styles.row, { gap: space.md }]}>
          {direction === "in" ? <Endpoint flag={from.flag} caption={ka ? "საიდან" : "From"} name={ka ? from.nameKa : from.name} align="left" /> : <Endpoint flag="🇬🇪" caption={ka ? "საიდან" : "From"} name={ka ? "თბილისი" : "Tbilisi"} align="left" />}
          <View style={{ alignItems: "center", gap: 6 }}>
            <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="airplane" size={18} color={theme.brandText} />
            </View>
            <Body muted size={font.s11}>{direction === "in" ? from.days : to.days} {ka ? "დღე" : "days"}</Body>
          </View>
          {direction === "in" ? <Endpoint flag="🇬🇪" caption={ka ? "სად" : "To"} name={ka ? "თბილისი" : "Tbilisi"} align="right" /> : <Endpoint flag={to.flag} caption={ka ? "სად" : "To"} name={ka ? to.nameKa : to.name} align="right" />}
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.lg }}>
          {direction === "in"
            ? origins.map((o) => <Chip key={o.code} on={o.code === origin} label={`${o.flag} ${ka ? o.nameKa : o.name}`} onPress={() => setOrigin(o.code)} />)
            : countries.map((c) => <Chip key={c.code} on={c.code === country} label={`${c.flag} ${ka ? c.nameKa : c.name}`} onPress={() => setCountry(c.code)} />)}
        </View>
      </Card>
      </TourTarget>

      <SectionLabel>{ka ? "წონა" : "Weight"}</SectionLabel>
      <Card>
        <View style={{ alignItems: "center", height: 118, justifyContent: "flex-end", marginBottom: space.sm }}>
          <KraftBox size={Math.round(78 + 2.2 * Math.min(weight, 30))} />
        </View>
        <View style={[styles.between, { gap: space.md }]}>
          <RoundBtn icon="remove" onPress={() => setW(weight - 0.5)} disabled={weight <= 0.5} />
          <View style={{ flex: 1, minWidth: 0, alignItems: "center" }}>
            <TextInput value={weightStr} onChangeText={onWeightText} onBlur={() => setWeightStr(String(weight))} keyboardType="decimal-pad" selectTextOnFocus style={{ alignSelf: "stretch", textAlign: "center", fontSize: 34, fontWeight: "700", color: theme.ink, padding: 0 }} />
            <Body muted size={font.s12} weight="600">{ka ? "კილოგრამი" : "kilograms"}</Body>
          </View>
          <RoundBtn icon="add" onPress={() => setW(weight + 0.5)} disabled={weight >= maxWeight} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: space.lg, marginHorizontal: -space.lg }} contentContainerStyle={{ flexGrow: 1, justifyContent: "center", gap: space.sm, paddingHorizontal: space.lg }}>
          {WEIGHT_PRESETS.map((w) => <TourTarget key={w} id={`calc.weight.${w}`} onPress={() => setW(w)}><Chip on={weight === w} label={`${w} kg`} onPress={() => setW(w)} /></TourTarget>)}
        </ScrollView>
      </Card>

      {direction === "in" ? (
        <>
          <SectionLabel>{ka ? "ნივთის ღირებულება" : "Item value"}</SectionLabel>
          <Card>
            <View style={[styles.row, { gap: space.sm }]}>
              <Body weight="700" size={font.s18} muted>{SYMBOL[from.currency] ?? from.currency}</Body>
              <TextInput value={valueStr} onChangeText={setValueStr} placeholder="0" placeholderTextColor={theme.faint} keyboardType="decimal-pad" style={{ flex: 1, minWidth: 0, fontSize: font.s18, fontWeight: "700", color: theme.ink, padding: 0 }} />
              <Pill text={from.currency} />
            </View>
            <Body muted size={font.s12} style={{ marginTop: space.md }}>
              {quote?.customs && value > 0 ? `≈ ${gel(quote.customs.value_gel)} · ` : ""}
              {ka ? `საბაჟო ${Math.round(100 * fees.customs_rate)}% — ₾${fees.customs_threshold}-ზე ზემოთ` : `Customs duty ${Math.round(100 * fees.customs_rate)}% applies above ₾${fees.customs_threshold}`}
            </Body>
          </Card>
        </>
      ) : null}

      <SectionLabel>{ka ? "მიწოდება" : "Delivery"}</SectionLabel>
      <TourTarget id="calc.delivery">
      <Card style={{ paddingVertical: space.xs }}>
        {direction === "in" ? (
          <>
            <ToggleRow icon="bicycle-outline" title={ka ? "კურიერი კარამდე" : "Courier to your door"} subtitle={ka ? `+₾${fees.delivery} · სხვაგვარად — ფილიალიდან უფასოდ` : `+₾${fees.delivery} · or collect from a Tbilisi branch for free`} value={courier} onValueChange={setCourier} />
            <ToggleRow icon="cube-outline" title={ka ? "გადაფუთვა" : "Repacking"} subtitle={ka ? `+₾${fees.repack} · მაღაზიის ყუთის გარეშე, ნაკლები წონა` : `+₾${fees.repack} · we drop the shop box to cut the weight`} value={repack} onValueChange={setRepack} />
          </>
        ) : (
          <ToggleRow icon="bicycle-outline" title={ka ? "კურიერის გამოძახება" : "Courier pickup"} subtitle={ka ? `+₾${fees.pickup} · სხვაგვარად ჩააბარე ფილიალში` : `+₾${fees.pickup} · or drop it at a branch`} value={courier} onValueChange={setCourier} />
        )}
      </Card>
      </TourTarget>
    </>
  );

  const total = (
    <>
      <TourTarget id="calc.total">
      <Card style={{ backgroundColor: theme.navy, borderColor: theme.navy, padding: space.xl }}>
        <View style={styles.between}>
          <Body size={font.s11} weight="700" style={{ color: theme.green, letterSpacing: 0.6 }}>{(ka ? "სავარაუდო ფასი" : "Estimated total").toUpperCase()}</Body>
          {isFetching ? <ActivityIndicator size="small" color={theme.green} /> : null}
        </View>
        {quote ? (
          <>
            <Body weight="700" style={{ color: "#fff", fontSize: 40, marginTop: space.sm }}>{gel(quote.total)}</Body>
            <Body size={font.s12} style={{ color: theme.faint, marginTop: 2 }}>{quote.weight} kg × ₾{quote.rate}/kg · {quote.days} {ka ? "დღე" : "days"}</Body>
            <View style={{ height: 1, backgroundColor: "rgba(255,255,255,0.12)", marginVertical: space.lg }} />
            {quote.lines.filter((l) => l.amount > 0).map((l) => (
              <View key={l.key} style={[styles.between, { paddingVertical: 5 }]}>
                <Body size={font.s13} style={{ color: theme.faint }}>{ka ? LINE_LABELS[l.key]?.ka : LINE_LABELS[l.key]?.en}</Body>
                <Body size={font.s13} weight="600" style={{ color: "#fff" }}>{gel(l.amount)}</Body>
              </View>
            ))}
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.md }}>
              {quote.customs ? <Pill tone={quote.customs.required ? "warn" : "ok"} text={quote.customs.required ? (ka ? "საბაჟო გადასახადით" : "Customs duty applies") : ka ? "საბაჟოს გარეშე" : "No customs duty"} /> : null}
              {loyaltyOn ? <Pill tone="ok" text={ka ? `+${quote.points} ქულა` : `+${quote.points} pts on delivery`} /> : null}
            </View>
          </>
        ) : (
          <Body style={{ color: theme.faint, marginTop: space.md }}>{isError ? (ka ? "ფასი ვერ გამოითვლა — შეამოწმე წონა" : "Couldn't price this — check the weight") : ka ? "ითვლება…" : "Calculating…"}</Body>
        )}
      </Card>
      </TourTarget>
      <Body muted size={font.s11} style={{ marginTop: space.sm, textAlign: "center" }}>
        {direction === "in" ? (ka ? "საბოლოო ფასი — საწყობში აწონვის შემდეგ" : "Final price follows the weight measured at the warehouse") : ka ? "ფასი ფიქსირდება გაგზავნის შექმნისას" : "The price is fixed when you create the shipment"}
      </Body>
      <Btn style={{ marginTop: space.lg }} icon={direction === "in" ? "add" : "paper-plane"} label={direction === "in" ? (ka ? "თრექინგის დამატება" : "Add tracking") : ka ? "გაგზავნა" : "Send this parcel"} onPress={() => (direction === "in" ? router.push("/add-incoming" as any) : router.push(`/add-outgoing?country=${country}&weight=${weight}&pickup=${courier ? 1 : 0}` as any))} />
    </>
  );

  return (
    <Screen maxWidth={1040}>
      <View style={[styles.row, { gap: space.md, marginBottom: space.lg }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "ფასის კალკულატორი" : "Price calculator"}</Title>
      </View>
      {desktop ? (
        <View style={{ flexDirection: "row", gap: space.xl, alignItems: "flex-start" }}>
          <View style={{ flex: 1, minWidth: 0 }}>{form}</View>
          <View style={{ width: 380 }}>{total}</View>
        </View>
      ) : (
        <>
          {form}
          <View style={{ marginTop: space.xl }}>{total}</View>
        </>
      )}
    </Screen>
  );
}

function RoundBtn({ icon, onPress, disabled }: { icon: "add" | "remove"; onPress: () => void; disabled?: boolean }) {
  const { theme } = useTokens();
  return (
    <Pressable onPress={disabled ? undefined : onPress} style={({ pressed }) => ({ width: 44, height: 44, borderRadius: 22, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center", opacity: disabled ? 0.4 : pressed ? 0.7 : 1 })}>
      <Ionicons name={icon} size={20} color={theme.ink} />
    </Pressable>
  );
}
