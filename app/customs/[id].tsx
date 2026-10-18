// Customs clearance (module 1160): a four-step flow driven by custom_status 0 → 1 → 2/3 → 4 → 5 → 8 (done).
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { DEMO } from "@/lib/demo";
import { useNusxaBundle, useOrderFromList, useSignatureLink, useUpdateCustomStatus } from "@/lib/hooks";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { DrawnBird } from "@/components/DrawnBird";
import { SignatureFrame } from "@/components/SignatureFrame";

const PAYEE_CODE = "707017021";
const stepOf = (s: string) => { const n = Number(s || 0); return n <= 0 ? 1 : n === 1 ? 2 : n === 2 || n === 3 ? 3 : 4; };

function Choice({ selected, onPress, title, subtitle }: { selected: boolean; onPress: () => void; title: string; subtitle: string }) {
  const { theme } = useTokens();
  return (
    <Card style={{ marginBottom: space.sm, borderColor: selected ? theme.green : theme.line, borderWidth: selected ? 2 : 1 }} onPress={onPress}>
      <View style={[styles.row, { gap: space.md }]}>
        <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: selected ? theme.green : theme.line, alignItems: "center", justifyContent: "center" }}>
          {selected ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.green }} /> : null}
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Body weight="700" size={font.s13}>{title}</Body>
          <Body muted size={font.s11} style={{ marginTop: 2 }}>{subtitle}</Body>
        </View>
      </View>
    </Card>
  );
}

export default function Customs() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const params = useLocalSearchParams<{ id: string; status?: string }>();
  const status = params.status || "RECEIVED_IN_TBILISI_WAREHOUSE";
  const { data: order, isLoading } = useOrderFromList(status, params.id);
  const { data: bundle } = useNusxaBundle(params.id);
  const update = useUpdateCustomStatus();
  const signature = useSignatureLink();
  const [payer, setPayer] = useState<"gzavnili" | "self">("gzavnili");
  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (isLoading || !order) return <Screen><Body muted>{ka ? "იტვირთება…" : "Loading…"}</Body></Screen>;

  const cs = order.custom_status ?? "0";
  const step = stepOf(cs);
  const fee = order.custom_fee?.custom_fee_amount ?? null;
  const done = cs === "8";
  const set = (s: string, auto?: boolean) => update.mutate({ orderId: order.id, custom_status: s, DeclarationPaymentAuto: auto });
  const sign = () => { if (DEMO) return set("8"); signature.mutate(order.id, { onSuccess: (url) => url && setSignUrl(url) }); };
  const steps = ka
    ? ["აირჩიე, ვინ გადაიხდის დეკლარაციის ბეჭდვის საფასურს", "პროცესი გამჭვირვალეა — დაგიკავშირდებით, თუ დოკუმენტი დასჭირდა", "დეკლარაციას ხელს აწერ ერთი შეხებით, ელექტრონულად"]
    : ["Choose who pays the declaration printing fee", "The process is transparent — we reach out if a document is needed", "Sign the declaration with one tap, electronically"];

  return (
    <Screen>
      <View style={[styles.row, { gap: space.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "განბაჟება" : "Customs"}</Title>
        {done ? <Pill text={ka ? "დასრულდა" : "Done"} tone="ok" /> : null}
      </View>
      <View style={{ flexDirection: "row", gap: 6, marginTop: space.lg }}>
        {[1, 2, 3, 4].map((n) => <View key={n} style={{ flexGrow: 1, flexBasis: 0, height: 4, borderRadius: 2, backgroundColor: n <= step ? theme.green : theme.line }} />)}
      </View>

      {cs === "0" ? (
        <>
          <Card style={{ marginTop: space.lg }}>
            <Body weight="700" size={font.s16}>{ka ? "განბაჟება გამარტივებულია" : "We simplified customs for you"}</Body>
            {steps.map((s, i) => (
              <View key={s} style={[styles.row, { gap: space.md, marginTop: space.md }]}>
                <View style={{ width: 24, height: 24, borderRadius: 12, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}><Body size={font.s11} weight="800" style={{ color: theme.greenDeep }}>{i + 1}</Body></View>
                <Body size={font.s13} style={{ flex: 1, minWidth: 0 }}>{s}</Body>
              </View>
            ))}
          </Card>
          <Btn label={ka ? "დაწყება" : "Start now"} onPress={() => set("1")} loading={update.isPending} style={{ marginTop: space.xl }} />
        </>
      ) : null}

      {cs === "1" ? (
        <>
          <SectionLabel>{ka ? "ვინ გადაიხდის საფასურს?" : "Who pays the customs fee?"}</SectionLabel>
          <Choice selected={payer === "gzavnili"} onPress={() => setPayer("gzavnili")} title={`${fee ?? "—"}₾ ${ka ? "იხდის Gzavnili" : "paid by Gzavnili"}`} subtitle={ka ? "თანხა ჩაითვლება მომსახურების საერთო ღირებულებაში" : "The amount is added to your total service cost"} />
          <Choice selected={payer === "self"} onPress={() => setPayer("self")} title={`${fee ?? "—"}₾ ${ka ? "გადავიხდი თავად" : "I will pay myself"}`} subtitle={ka ? "გადარიცხე და ატვირთე ქვითარი" : "Transfer it, then upload the receipt"} />
          {payer === "self" ? (
            <Card style={{ marginTop: space.md }}>
              <Body muted size={font.s12}>{ka ? "გადამხდელის კოდი" : "Payee code"}</Body>
              <View style={[styles.between, { marginTop: 6 }]}>
                <Body weight="700" size={font.s18}>{PAYEE_CODE}</Body>
                <Pressable onPress={() => { Clipboard.setStringAsync(PAYEE_CODE); setCopied(true); }} style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: copied ? theme.tint2 : theme.paper, borderRadius: radius.pill, paddingHorizontal: 13, paddingVertical: 8 }}>
                  <Ionicons name={copied ? "checkmark" : "copy-outline"} size={14} color={copied ? theme.ok : theme.mut} />
                  <Body size={font.s12} weight="600" style={{ color: copied ? theme.ok : theme.mut }}>{copied ? (ka ? "დაკოპირდა" : "Copied") : ka ? "კოპირება" : "Copy"}</Body>
                </Pressable>
              </View>
            </Card>
          ) : null}
          <Btn label={payer === "self" ? (ka ? "გადავიხადე" : "I paid the fee") : ka ? "დადასტურება" : "Confirm"} onPress={() => set("2", payer === "gzavnili")} loading={update.isPending} style={{ marginTop: space.xl }} />
        </>
      ) : null}

      {cs === "2" || cs === "3" ? (
        <Card style={{ marginTop: space.lg }}>
          <View style={[styles.row, { gap: space.md }]}>
            <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}><Ionicons name="hourglass-outline" size={19} color={theme.greenDeep} /></View>
            <View style={{ flex: 1, minWidth: 0 }}><Body weight="700">{ka ? "განბაჟება მიმდინარეობს" : "Customs clearance in progress"}</Body></View>
          </View>
          <Body muted size={font.s12} style={{ marginTop: space.md }}>{ka ? "როგორც კი დასრულდება, გამოგიგზავნით დეკლარაციას ხელმოსაწერად. თუ დამატებითი დოკუმენტი დაგვჭირდა — დაგიკავშირდებით." : "Once it completes we'll send you the declaration to sign. If anything else is needed we'll get in touch."}</Body>
        </Card>
      ) : null}

      {cs === "4" ? (
        <Card style={{ marginTop: space.lg }}>
          <Body weight="700">{ka ? "დეკლარაცია მზადდება" : "Declaration is being prepared"}</Body>
          <Body muted size={font.s12} style={{ marginTop: 6 }}>{ka ? "შეტყობინებას მიიღებ, როცა ხელმოწერა დასჭირდება" : "You'll get a notification when it is ready to sign"}</Body>
        </Card>
      ) : null}

      {cs === "5" ? (
        signUrl ? (
          <Card style={{ marginTop: space.lg, height: 460, padding: 0, overflow: "hidden" }}>
            <SignatureFrame url={signUrl} onSigned={() => { set("8"); setSignUrl(null); }} onRejected={() => setSignUrl(null)} />
          </Card>
        ) : (
          <>
            <Card style={{ marginTop: space.lg }}>
              <Body weight="700">{ka ? "დეკლარაცია მზადაა ხელმოსაწერად" : "Document is ready to sign"}</Body>
              <Body muted size={font.s12} style={{ marginTop: 6 }}>{ka ? "ხელი მოაწერე, რომ განბაჟება დასრულდეს" : "Sign it to complete the customs clearance"}</Body>
            </Card>
            <Btn label={ka ? "ხელმოწერა" : "Sign now"} icon="create-outline" onPress={sign} loading={signature.isPending} style={{ marginTop: space.xl }} />
          </>
        )
      ) : null}

      {done ? (
        <Card style={{ marginTop: space.lg, alignItems: "center", paddingVertical: 30 }}>
          <DrawnBird size={84} float />
          <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{ka ? "განბაჟება დასრულდა" : "Customs cleared"}</Body>
          <Body muted size={font.s12} style={{ marginTop: 4, textAlign: "center" }}>{ka ? "ახლა შეგიძლია გადაიხადო მიწოდება" : "You can pay for delivery now"}</Body>
        </Card>
      ) : null}

      {bundle?.length ? (
        <>
          <SectionLabel>{bundle.length} {ka ? "ამანათი განბაჟებაშია" : "parcel(s) in this customs batch"}</SectionLabel>
          <Card style={{ paddingVertical: 0 }}>
            {bundle.map((o, i) => (
              <View key={o.id}>
                {i > 0 ? <Divider /> : null}
                <View style={[styles.row, { gap: space.md, paddingVertical: 13 }]}>
                  <Ionicons name="cube-outline" size={17} color={theme.faint} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Body size={font.s13} weight="600" numberOfLines={1}>{o.name ?? "—"}</Body>
                    <Body muted size={font.s11} numberOfLines={1}>{o.tracking_number}</Body>
                  </View>
                </View>
              </View>
            ))}
          </Card>
        </>
      ) : null}
    </Screen>
  );
}
