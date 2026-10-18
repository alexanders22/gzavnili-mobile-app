import React, { useState } from "react";
import { ActivityIndicator, Pressable, TextInput, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang, useT } from "@/lib/i18n";
import { apiError } from "@/lib/api";
import { useCustomer, useTopUp, useUnpaidOrders, useWallet } from "@/lib/hooks";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { BottomSheet } from "@/ui/BottomSheet";
import { WalletArt } from "@/components/WalletArt";

const CARD_NAMES: Record<string, string> = { visa: "Visa", mc: "Mastercard", amex: "Amex" };
const PRESETS = [20, 50, 100, 200];
const KINDS = {
  parcel: { ka: "ამანათის გადახდა", en: "Parcel payment", icon: "cube-outline" as const },
  outgoing: { ka: "ამანათის გაგზავნა", en: "Outgoing parcel", icon: "paper-plane-outline" as const },
  topup: { ka: "ბალანსის შევსება", en: "Top up", icon: "add-circle-outline" as const },
};
const STATUS: Record<string, { ka: string; en: string; tone: "ok" | "warn" | "neutral" }> = {
  COMPLETED: { ka: "შესრულდა", en: "Completed", tone: "ok" },
  PENDING: { ka: "მუშავდება", en: "Pending", tone: "warn" },
  REJECTED: { ka: "უარყოფილი", en: "Declined", tone: "neutral" },
};
const MONTHS = {
  ka: ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};
function shortDate(iso: string, ka: boolean) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const m = MONTHS[ka ? "ka" : "en"][d.getMonth()];
  return ka ? `${d.getDate()} ${m}` : `${m} ${d.getDate()}`;
}

export default function WalletScreen() {
  const { theme } = useTokens();
  const t = useT();
  const ka = useLang() === "ka";
  const { data: customer } = useCustomer();
  const { data: unpaid } = useUnpaidOrders(customer?.id);
  const { data: wallet, isLoading } = useWallet();
  const topUp = useTopUp();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [historyOpen, setHistoryOpen] = useState(false);
  const [preset, setPreset] = useState(50);
  const [custom, setCustom] = useState("");
  const [newBalance, setNewBalance] = useState<number | null>(null);

  const due = (unpaid ?? []).reduce((s, o) => s + Number(o.price ?? 0), 0);
  const amount = custom.trim() ? Number(custom.replace(",", ".")) : preset;
  const valid = Number.isFinite(amount) && amount >= 1 && amount <= 5000;
  const defaultCard = wallet?.cards.find((c) => c.isDefault) ?? wallet?.cards[0];
  const openSheet = () => { topUp.reset(); setNewBalance(null); setPreset(50); setCustom(""); setSheetOpen(true); };
  const submit = () => { if (valid && !topUp.isPending) topUp.mutate(Math.round(amount * 100) / 100, { onSuccess: (r) => setNewBalance(r.balance) }); };

  return (
    <Screen>
      <View style={[styles.row, { gap: space.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "საფულე" : "Wallet"}</Title>
      </View>

      {/* Balance card */}
      <Card style={{ marginTop: space.lg, backgroundColor: theme.navy, borderColor: theme.navy, overflow: "hidden" }}>
        <View style={{ position: "absolute", right: 6, top: 4 }} pointerEvents="none"><WalletArt size={104} /></View>
        <Body size={font.s11} style={{ color: theme.faint, fontWeight: "700" }}>{t("walletBalance").toUpperCase()}</Body>
        {wallet ? (
          <Body size={font.s28} weight="700" style={{ color: "#fff", marginTop: 6 }}>{Number(wallet.balance).toFixed(2)} ₾</Body>
        ) : (
          <ActivityIndicator color={theme.green} style={{ alignSelf: "flex-start", marginTop: 14 }} />
        )}
        <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg }}>
          <Btn label={t("topUp")} style={{ flex: 1 }} icon="add" onPress={openSheet} disabled={!wallet} />
          <Btn label={ka ? "ისტორია" : "History"} variant="dark" icon={historyOpen ? "chevron-up" : "time-outline"} onPress={() => setHistoryOpen((v) => !v)} style={{ flex: 1, backgroundColor: theme.navySoft }} />
        </View>
      </Card>

      {due > 0 ? (
        <Card style={{ marginTop: space.md, borderColor: theme.red }}>
          <View style={styles.between}>
            <View>
              <Body weight="700">{ka ? "გადასახდელი" : "Outstanding"}</Body>
              <Body muted size={font.s12}>{unpaid?.length} {ka ? "ამანათი" : "parcel(s)"}</Body>
            </View>
            <Body size={font.s18} weight="700" style={{ color: theme.red }}>₾{due.toFixed(2)}</Body>
          </View>
          <Btn label={ka ? "გადახდა" : "Settle now"} variant="danger" style={{ marginTop: space.md }} onPress={() => { const o = unpaid?.[0]; if (o) router.push(`/pay/${o.id}?status=RECEIVED_IN_TBILISI_WAREHOUSE` as any); }} />
        </Card>
      ) : null}

      {historyOpen ? (
        <>
          <SectionLabel>{ka ? "ტრანზაქციები" : "Transactions"}</SectionLabel>
          <Card style={{ paddingVertical: wallet?.transactions.length ? 0 : space.lg }}>
            {wallet ? (
              wallet.transactions.length ? (
                wallet.transactions.map((tx, i) => {
                  const kind = KINDS[tx.kind] ?? KINDS.parcel;
                  const st = STATUS[tx.status] ?? { ka: tx.status, en: tx.status, tone: "neutral" as const };
                  const plus = tx.kind === "topup";
                  return (
                    <View key={tx.id}>
                      {i > 0 ? <Divider /> : null}
                      <View style={[styles.row, { gap: space.md, paddingVertical: 13 }]}>
                        <View style={{ width: 36, height: 36, borderRadius: radius.sm, backgroundColor: plus ? theme.tint2 : theme.paper, alignItems: "center", justifyContent: "center" }}>
                          <Ionicons name={kind.icon} size={17} color={plus ? theme.greenDeep : theme.mut} />
                        </View>
                        <View style={{ flex: 1, minWidth: 0 }}>
                          <Body size={font.s13} weight="600" numberOfLines={1}>{ka ? kind.ka : kind.en}</Body>
                          <Body muted size={font.s11} numberOfLines={1}>{shortDate(tx.created_at, ka)}</Body>
                        </View>
                        <View style={{ alignItems: "flex-end", gap: 4 }}>
                          <Body weight="700" size={font.s13} style={{ color: plus ? theme.ok : theme.ink }}>{plus ? "+" : "−"}₾{Number(tx.amount).toFixed(2)}</Body>
                          <Pill text={ka ? st.ka : st.en} tone={st.tone} />
                        </View>
                      </View>
                    </View>
                  );
                })
              ) : (
                <Body muted size={font.s13} style={{ textAlign: "center" }}>{ka ? "ტრანზაქციები ჯერ არ გაქვს" : "No transactions yet"}</Body>
              )
            ) : (
              <ActivityIndicator color={theme.green} />
            )}
          </Card>
        </>
      ) : null}

      <SectionLabel>{ka ? "ბარათები" : "Cards"}</SectionLabel>
      <Card style={{ paddingVertical: wallet?.cards.length ? 0 : space.lg }}>
        {isLoading ? (
          <ActivityIndicator color={theme.green} />
        ) : wallet?.cards.length ? (
          wallet.cards.map((c, i) => (
            <View key={c.id}>
              {i > 0 ? <Divider /> : null}
              <View style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                <View style={{ width: 40, height: 28, borderRadius: 6, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="card" size={15} color={theme.mut} />
                </View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body weight="600" numberOfLines={1}>{CARD_NAMES[c.cardType] ?? c.cardType} ·· {c.maskedPan}</Body>
                  {c.expiryDate ? <Body muted size={font.s11}>{c.expiryDate}</Body> : null}
                </View>
                {c.isDefault ? <Pill text={ka ? "ძირითადი" : "Default"} tone="ok" /> : null}
              </View>
            </View>
          ))
        ) : (
          <Body muted size={font.s13} style={{ textAlign: "center" }}>{ka ? "ბარათი ჯერ არ გაქვს დამატებული" : "No cards added yet"}</Body>
        )}
      </Card>
      <Btn label={ka ? "ბარათის დამატება" : "Add card"} variant="outline" icon="add" style={{ marginTop: space.md }} />

      {/* Top-up sheet */}
      <BottomSheet visible={sheetOpen} onClose={() => setSheetOpen(false)}>
        {newBalance !== null ? (
          <View style={{ alignItems: "center" }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="checkmark" size={30} color={theme.greenDeep} />
            </View>
            <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{ka ? "ბალანსი შეივსა" : "Balance topped up"}</Body>
            <Body muted size={font.s12} style={{ marginTop: 4, textAlign: "center" }}>{ka ? "ახლანდელი ბალანსი" : "New balance"}: {Number(newBalance).toFixed(2)} ₾</Body>
            <Btn label={ka ? "კარგი" : "Done"} onPress={() => setSheetOpen(false)} style={{ marginTop: space.xl, alignSelf: "stretch" }} />
          </View>
        ) : (
          <>
            <Body weight="700" size={font.s16}>{ka ? "ბალანსის შევსება" : "Top up balance"}</Body>
            {defaultCard ? <Body muted size={font.s13} style={{ marginTop: 6 }}>{ka ? "ბარათიდან" : "From"} {CARD_NAMES[defaultCard.cardType] ?? defaultCard.cardType} ·· {defaultCard.maskedPan}</Body> : null}
            <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg }}>
              {PRESETS.map((p) => {
                const on = !custom.trim() && preset === p;
                return (
                  <Pressable key={p} onPress={() => { setPreset(p); setCustom(""); }} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, alignItems: "center", paddingVertical: 12, borderRadius: radius.md, borderWidth: 1, borderColor: on ? theme.green : theme.line, backgroundColor: on ? theme.tint2 : theme.card }}>
                    <Body weight="700" size={font.s14} style={{ color: on ? theme.greenDeep : theme.ink }}>{p} ₾</Body>
                  </Pressable>
                );
              })}
            </View>
            <TextInput value={custom} onChangeText={(v) => setCustom(v.replace(/[^0-9.,]/g, ""))} keyboardType="decimal-pad" placeholder={ka ? "სხვა თანხა, ₾" : "Other amount, ₾"} placeholderTextColor={theme.faint} style={{ marginTop: space.md, backgroundColor: theme.card, borderWidth: 1, borderColor: custom.trim() ? theme.green : theme.line, borderRadius: radius.md, paddingHorizontal: space.lg, paddingVertical: 13, color: theme.ink, fontSize: font.s14 }} />
            {custom.trim() && !valid ? <Body size={font.s12} style={{ color: theme.red, marginTop: space.sm }}>{ka ? "თანხა უნდა იყოს 1-დან 5000 ₾-მდე" : "Enter an amount between 1 and 5000 ₾"}</Body> : null}
            {topUp.isError ? <Body size={font.s12} style={{ color: theme.red, marginTop: space.sm }}>{apiError(topUp.error, ka ? "შევსება ვერ მოხერხდა. სცადე ხელახლა." : "Couldn't top up. Try again.")}</Body> : null}
            <Btn label={valid ? (ka ? `შევსება ${amount.toFixed(2)} ₾` : `Top up ${amount.toFixed(2)} ₾`) : t("topUp")} icon="add" onPress={submit} disabled={!valid} loading={topUp.isPending} style={{ marginTop: space.lg }} />
          </>
        )}
      </BottomSheet>
    </Screen>
  );
}
