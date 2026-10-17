import React, { useState } from "react";
import { Pressable, TextInput, View, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useCustomer, useWallet } from "@/lib/hooks";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { Picker, type PickerOption } from "@/ui/Picker";
import { DrawnBand } from "@/components/Drawing";
import { NewBadge } from "@/components/ModuleTile";

// Demo remittance flow: amount → recipient → confirm → done. Rates are illustrative.
const CURRENCIES = [
  { id: "USD", flag: "🇺🇸", en: "US Dollar", ka: "აშშ დოლარი", symbol: "$", perUsd: 1 },
  { id: "GEL", flag: "🇬🇪", en: "Georgian Lari", ka: "ქართული ლარი", symbol: "₾", perUsd: 2.71 },
  { id: "EUR", flag: "🇪🇺", en: "Euro", ka: "ევრო", symbol: "€", perUsd: 0.92 },
  { id: "GBP", flag: "🇬🇧", en: "British Pound", ka: "ბრიტანული ფუნტი", symbol: "£", perUsd: 0.79 },
] as const;
type Ccy = (typeof CURRENCIES)[number]["id"];
const ccy = (id: Ccy) => CURRENCIES.find((c) => c.id === id)!;
const convert = (amount: number, from: Ccy, to: Ccy) => (amount / ccy(from).perUsd) * ccy(to).perUsd;
const FEE_RATE = 0.01;
const PRESETS_USD = [50, 100, 250, 500];
const presetsFor = (c: Ccy) =>
  PRESETS_USD.map((usd) => {
    const v = convert(usd, "USD", c);
    const step = v >= 500 ? 100 : v >= 100 ? 50 : 10;
    return Math.max(step, Math.round(v / step) * step);
  });
const money = (n: number, c: Ccy) => `${ccy(c).symbol}${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const RECIPIENTS = [
  { id: "r1", name: "Nino B.", bank: "TBC", last4: "4821", flag: "🇬🇪", ccy: "GEL" as Ccy },
  { id: "r2", name: "Giorgi K.", bank: "BOG", last4: "7734", flag: "🇬🇪", ccy: "GEL" as Ccy },
  { id: "r3", name: "Mariam T.", bank: "Revolut", last4: "1190", flag: "🇬🇧", ccy: "GBP" as Ccy },
];
type Recipient = (typeof RECIPIENTS)[number];
type Step = "amount" | "recipient" | "confirm" | "done";
const STEPS: Step[] = ["amount", "recipient", "confirm", "done"];

export default function Send() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { data: customer } = useCustomer();
  const { data: wallet } = useWallet();
  const [step, setStep] = useState<Step>("amount");
  const [amountStr, setAmountStr] = useState("250");
  const [from, setFrom] = useState<Ccy>("USD");
  const [to, setTo] = useState<Ccy>("GEL");
  const [recipient, setRecipient] = useState<Recipient | null>(null);

  const amount = Number(amountStr.replace(",", ".") || 0);
  const fee = amount * FEE_RATE;
  const received = convert(amount, from, to);
  const rate = convert(1, from, to);
  const balanceGel = Number(customer?.wallet_balance ?? wallet?.balance ?? 0);
  const available = convert(balanceGel, "GEL", from);
  const options: PickerOption[] = CURRENCIES.map((c) => ({ id: c.id, label: c.id, sub: ka ? c.ka : c.en, detail: c.id === "USD" ? undefined : `1 USD = ${c.perUsd} ${c.id}`, emoji: c.flag }));
  const swap = () => { setFrom(to); setTo(from); setAmountStr(received ? received.toFixed(2) : amountStr); };
  const back = () => {
    if (step === "recipient") setStep("amount");
    else if (step === "confirm") setStep("recipient");
    else if (step === "done") { setStep("amount"); setRecipient(null); }
  };

  return (
    <Screen>
      <View style={styles.between}>
        <View style={[styles.row, { gap: space.sm }]}>
          {step !== "amount" ? (
            <Pressable onPress={back} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
          ) : null}
          <View style={{ width: 30, height: 30, borderRadius: 15, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="logo-usd" size={16} color={theme.greenDeep} />
          </View>
          <Title>{ka ? "ფულის გაგზავნა" : "Send Money"}</Title>
        </View>
        <NewBadge />
      </View>
      <StepBar step={step} />

      {step === "amount" ? (
        <>
          <DrawnBand name="money" width={140} bg={theme.skyTint} ink={theme.skyInk} note={ka ? "უფრო ახლოს\nმათთან, ვინც გიყვარს." : "Closer\nto what matters."} style={{ marginTop: space.lg }} />
          <AmountCard label={ka ? "აგზავნი" : "You send"} currency={from} options={options} onCurrency={(c) => (c === to ? swap() : setFrom(c))} value={amountStr} onChangeText={(t) => setAmountStr(t.replace(/[^0-9.,]/g, ""))} note={`${money(available, from)} ${ka ? "ხელმისაწვდომი" : "available"}`} noteIcon="wallet-outline" style={{ marginTop: space.lg }} />
          <Pressable onPress={swap} accessibilityLabel={ka ? "ვალუტების შეცვლა" : "Swap currencies"} style={({ pressed }) => ({ alignSelf: "center", zIndex: 2, marginTop: -19, marginBottom: -19, width: 44, height: 44, borderRadius: 22, backgroundColor: theme.navy, borderWidth: 3, borderColor: theme.cream, alignItems: "center", justifyContent: "center", opacity: pressed ? 0.85 : 1 })}>
            <Ionicons name="swap-vertical" size={19} color={theme.green} />
          </Pressable>
          <AmountCard label={ka ? "მიიღებს" : "They receive"} currency={to} options={options} onCurrency={(c) => (c === from ? swap() : setTo(c))} value={received ? received.toFixed(2) : ""} readOnly note={`${money(fee, from)} ${ka ? "საკომისიო" : "fee"}`} noteIcon="pricetag-outline" accent />
          <View style={[styles.row, { gap: 6, marginTop: space.md, justifyContent: "center" }]}>
            <Ionicons name="trending-up-outline" size={13} color={theme.faint} />
            <Body muted size={font.s12} numberOfLines={1}>1 {from} = {rate.toFixed(4).replace(/0+$/, "").replace(/\.$/, "")} {to}</Body>
            <Pill text={ka ? "ფიქსირდება 30 წთ" : "locked 30 min"} tone="ok" />
          </View>
          <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg }}>
            {presetsFor(from).map((p) => {
              const on = amount === p;
              return (
                <Pressable key={p} onPress={() => setAmountStr(String(p))} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, alignItems: "center", paddingVertical: 11, borderRadius: radius.pill, backgroundColor: on ? theme.navy : theme.card, borderWidth: 1, borderColor: on ? theme.navy : theme.line }}>
                  <Body size={font.s12} weight="700" numberOfLines={1} style={{ color: on ? "#fff" : theme.mut }}>{ccy(from).symbol}{p}</Body>
                </Pressable>
              );
            })}
          </View>
          <Btn label={ka ? "გაგრძელება" : "Continue"} onPress={() => setStep("recipient")} disabled={amount <= 0} style={{ marginTop: space.xl }} />
        </>
      ) : null}

      {step === "recipient" ? (
        <>
          <SectionLabel>{ka ? "ვის უგზავნი" : "Who are you sending to"}</SectionLabel>
          <Card style={{ paddingVertical: 0 }}>
            {RECIPIENTS.map((r, i) => (
              <View key={r.id}>
                {i > 0 ? <Divider /> : null}
                <Pressable onPress={() => { setRecipient(r); if (r.ccy !== from) setTo(r.ccy); setStep("confirm"); }} style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                  <Avatar emoji={r.flag} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Body weight="600" numberOfLines={1}>{r.name}</Body>
                    <Body muted size={font.s12} numberOfLines={1}>{r.bank} · ·· {r.last4} · {r.ccy}</Body>
                  </View>
                  <Ionicons name="chevron-forward" size={17} color={theme.faint} />
                </Pressable>
              </View>
            ))}
          </Card>
          <Btn label={ka ? "ახალი მიმღები" : "New recipient"} variant="outline" icon="add" style={{ marginTop: space.md }} />
        </>
      ) : null}

      {step === "confirm" && recipient ? (
        <>
          <Card style={{ marginTop: space.lg, alignItems: "center", paddingVertical: 26 }}>
            <Avatar emoji={recipient.flag} size={54} />
            <Body weight="700" size={font.s16} style={{ marginTop: space.md }}>{recipient.name}</Body>
            <Body muted size={font.s12}>{recipient.bank} · ·· {recipient.last4}</Body>
            <Body size={font.s28} weight="700" style={{ marginTop: space.lg }}>{money(received, to)}</Body>
            <Body muted size={font.s12}>{money(amount, from)} · 1 {from} = {rate.toFixed(2)} {to}</Body>
          </Card>
          <Card style={{ marginTop: space.md, paddingVertical: 0 }}>
            <Row label={ka ? "თანხა" : "Amount"} value={money(amount, from)} />
            <Divider />
            <Row label={ka ? "საკომისიო" : "Fee"} value={money(fee, from)} />
            <Divider />
            <Row label={ka ? "ჩამოიჭრება" : "Total charged"} value={money(amount + fee, from)} />
            <Divider />
            <Row label={ka ? "ჩარიცხვა" : "Arrives"} value={ka ? "წუთებში" : "in minutes"} />
          </Card>
          <Btn label={ka ? "დადასტურება" : "Confirm and send"} icon="paper-plane-outline" onPress={() => setStep("done")} style={{ marginTop: space.xl }} />
        </>
      ) : null}

      {step === "done" && recipient ? (
        <Card style={{ marginTop: space.xl, alignItems: "center", paddingVertical: 34 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="checkmark" size={32} color={theme.greenDeep} />
          </View>
          <Body weight="700" size={font.s18} style={{ marginTop: space.lg }}>{money(received, to)}</Body>
          <Body muted style={{ marginTop: 4 }}>{ka ? "გაიგზავნა" : "Sent to"} {recipient.name}</Body>
          <Btn label={ka ? "მზადაა" : "Done"} variant="outline" onPress={back} style={{ marginTop: space.xl, alignSelf: "stretch" }} />
        </Card>
      ) : null}
    </Screen>
  );
}

type AmountProps = {
  label: string; currency: Ccy; options: PickerOption[]; onCurrency: (c: Ccy) => void; value: string; onChangeText?: (t: string) => void;
  readOnly?: boolean; note: string; noteIcon: React.ComponentProps<typeof Ionicons>["name"]; accent?: boolean; style?: StyleProp<ViewStyle>;
};

function AmountCard({ label, currency, options, onCurrency, value, onChangeText, readOnly, note, noteIcon, accent, style }: AmountProps) {
  const { theme } = useTokens();
  return (
    <Card style={[{ paddingVertical: space.lg, backgroundColor: accent ? theme.tint : theme.card, borderColor: accent ? theme.tint2 : theme.line }, style]}>
      <View style={[styles.between, { gap: space.sm }]}>
        <Body muted size={font.s12} weight="600" numberOfLines={1} style={{ flexShrink: 1, minWidth: 0 }}>{label}</Body>
        <Picker variant="pill" title="Currency" options={options} value={currency} onChange={(id) => onCurrency(id as Ccy)} />
      </View>
      <View style={[styles.row, { gap: space.sm, marginTop: space.sm }]}>
        <Body size={font.s28} weight="700" style={{ color: theme.faint }}>{ccy(currency).symbol}</Body>
        {readOnly ? (
          <Body size={font.s28} weight="700" numberOfLines={1} style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 }}>{value || "0.00"}</Body>
        ) : (
          <TextInput value={value} onChangeText={onChangeText} keyboardType="decimal-pad" selectTextOnFocus style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0, fontSize: font.s28, fontWeight: "700", color: theme.ink, padding: 0 }} />
        )}
      </View>
      <View style={[styles.row, { gap: 5, marginTop: space.sm }]}>
        <Ionicons name={noteIcon} size={12} color={theme.faint} />
        <Body muted size={font.s11} numberOfLines={1} style={{ flexShrink: 1, minWidth: 0 }}>{note}</Body>
      </View>
    </Card>
  );
}

function Avatar({ emoji, size = 40 }: { emoji: string; size?: number }) {
  const { theme } = useTokens();
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
      <Body size={size / 2.4}>{emoji}</Body>
    </View>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={[styles.between, { paddingVertical: 13 }]}>
      <Body muted size={font.s13}>{label}</Body>
      <Body weight="600" size={font.s13}>{value}</Body>
    </View>
  );
}

function StepBar({ step }: { step: Step }) {
  const { theme } = useTokens();
  const idx = STEPS.indexOf(step);
  return (
    <View style={{ flexDirection: "row", gap: 6, marginTop: space.lg }}>
      {STEPS.map((s, i) => <View key={s} style={{ flexGrow: 1, flexBasis: 0, height: 4, borderRadius: 2, backgroundColor: i <= idx ? theme.green : theme.line }} />)}
    </View>
  );
}
