import React, { useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { apiError } from "@/lib/api";
import { useLoyalty, useRedeemReward, type LoyaltyReward } from "@/lib/hooks";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { BottomSheet } from "@/ui/BottomSheet";
import { GiftArt } from "@/components/GiftArt";
import { NewBadge } from "@/components/ModuleTile";

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
/** History labels come from the API in English; translate the known prefixes. */
function historyLabel(label: string, ka: boolean) {
  if (!ka) return label;
  if (label === "Welcome bonus") return "მისასალმებელი ბონუსი";
  return label.replace(/^Referral · /, "რეფერალი · ").replace(/^Redeemed · /, "გამოყენებული · ");
}

export default function LoyaltyScreen() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { data, isLoading } = useLoyalty();
  const redeem = useRedeemReward();
  const [picked, setPicked] = useState<LoyaltyReward | null>(null);
  const [done, setDone] = useState(false);
  const [pointsBefore, setPointsBefore] = useState(0);
  const confirm = () => { if (picked && !redeem.isPending) redeem.mutate(picked.id, { onSuccess: () => setDone(true) }); };

  const header = (
    <View style={styles.between}>
      <View style={[styles.row, { gap: space.md, flexShrink: 1, minWidth: 0 }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "ლოიალობა" : "Loyalty"}</Title>
      </View>
      <NewBadge />
    </View>
  );

  if (!data) {
    return (
      <Screen>
        {header}
        <View style={{ paddingVertical: 60, alignItems: "center" }}>
          {isLoading ? <ActivityIndicator color={theme.green} /> : <Body muted>{ka ? "ქულები ვერ ჩაიტვირდა" : "Couldn't load your points"}</Body>}
        </View>
      </Screen>
    );
  }

  const { tier, next } = data;
  return (
    <Screen>
      {header}

      <Card style={{ marginTop: space.lg, backgroundColor: theme.greenDeep, borderColor: theme.greenDeep, overflow: "hidden" }}>
        <View style={{ position: "absolute", right: 10, top: 6 }} pointerEvents="none"><GiftArt size={92} /></View>
        <Body size={font.s11} style={{ color: theme.greenSoft, fontWeight: "700" }}>{(ka ? "ჩემი ქულები" : "My points").toUpperCase()}</Body>
        <Body size={font.s28} weight="700" style={{ color: "#fff", marginTop: 6 }}>{data.points.toLocaleString()}</Body>
        <View style={{ height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.2)", marginTop: space.lg, overflow: "hidden" }}>
          <View style={{ width: `${Math.max(0, Math.min(100, data.progress))}%`, height: "100%", backgroundColor: theme.green }} />
        </View>
        <Body size={font.s12} numberOfLines={1} style={{ color: theme.greenSoft, marginTop: space.sm }}>
          {tier.emoji} {tier.name} · {next ? (ka ? `${next.name}-მდე დარჩა ${data.to_next.toLocaleString()} ქულა` : `${data.to_next.toLocaleString()} points to ${next.name}`) : ka ? "უმაღლესი დონე" : "Top tier reached"}
        </Body>
      </Card>

      {data.active_rewards.length ? (
        <>
          <SectionLabel>{ka ? "აქტიური ჯილდოები" : "Active rewards"}</SectionLabel>
          <Card style={{ paddingVertical: 0, borderColor: theme.green }}>
            {data.active_rewards.map((r, i) => (
              <View key={r.id}>
                {i > 0 ? <Divider /> : null}
                <View style={[styles.row, { gap: space.md, paddingVertical: 13 }]}>
                  <View style={{ width: 36, height: 36, borderRadius: radius.sm, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="ticket-outline" size={17} color={theme.greenDeep} />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Body weight="600" numberOfLines={1}>{ka ? r.title_ka : r.title_en}</Body>
                    <Body muted size={font.s11} numberOfLines={2}>{ka ? "ავტომატურად გამოიყენება შემდეგ გადახდისას" : "Applied automatically at your next payment"}</Body>
                  </View>
                </View>
              </View>
            ))}
          </Card>
        </>
      ) : null}

      <SectionLabel>{ka ? "დონეები" : "Tiers"}</SectionLabel>
      <Card style={{ paddingVertical: 0 }}>
        {data.tiers.map((t, i) => {
          const on = t.name === tier.name;
          return (
            <View key={t.name}>
              {i > 0 ? <Divider /> : null}
              <View style={[styles.row, { gap: space.md, paddingVertical: 13, marginHorizontal: -space.lg, paddingHorizontal: space.lg, backgroundColor: on ? theme.tint : "transparent" }]}>
                <Body size={font.s18}>{t.emoji}</Body>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body weight={on ? "700" : "600"} numberOfLines={1}>{t.name}</Body>
                  <Body muted size={font.s11} numberOfLines={1}>{ka ? `${t.from.toLocaleString()}+ ქულა · ${t.rate} ქულა / კგ` : `${t.from.toLocaleString()}+ pts · ${t.rate} pts / kg`}</Body>
                </View>
                {on ? <Pill text={ka ? "შენი დონე" : "Your tier"} tone="ok" /> : null}
              </View>
            </View>
          );
        })}
      </Card>

      <SectionLabel>{ka ? "ჯილდოები" : "Rewards"}</SectionLabel>
      <Card style={{ paddingVertical: 0 }}>
        {data.rewards.map((r, i) => (
          <View key={r.id}>
            {i > 0 ? <Divider /> : null}
            <Pressable disabled={!r.available} onPress={() => { redeem.reset(); setDone(false); setPointsBefore(data.points); setPicked(r); }} style={[styles.row, { gap: space.md, paddingVertical: 14, opacity: r.available ? 1 : 0.45 }]}>
              <View style={{ width: 36, height: 36, borderRadius: radius.sm, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
                <Ionicons name={r.available ? "gift-outline" : "lock-closed-outline"} size={17} color={theme.greenDeep} />
              </View>
              <Body weight="600" numberOfLines={1} style={{ flex: 1, minWidth: 0 }}>{ka ? r.title_ka : r.title_en}</Body>
              <Pill text={`${r.cost} ${ka ? "ქულა" : "pts"}`} tone={r.available ? "ok" : "neutral"} />
            </Pressable>
          </View>
        ))}
      </Card>

      <SectionLabel>{ka ? "ისტორია" : "History"}</SectionLabel>
      <Card style={{ paddingVertical: data.history.length ? 0 : space.lg }}>
        {data.history.length ? (
          data.history.map((h, i) => (
            <View key={h.id}>
              {i > 0 ? <Divider /> : null}
              <View style={[styles.row, { paddingVertical: 13, gap: space.md }]}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body size={font.s13} weight="600" numberOfLines={1}>{historyLabel(h.label, ka)}</Body>
                  <Body muted size={font.s11}>{shortDate(h.created_at, ka)}</Body>
                </View>
                <Body weight="700" size={font.s13} style={{ color: h.points > 0 ? theme.ok : theme.red }}>{h.points > 0 ? `+${h.points}` : h.points}</Body>
              </View>
            </View>
          ))
        ) : (
          <Body muted size={font.s13} style={{ textAlign: "center" }}>{ka ? "ქულები ჯერ არ გაქვს — ისინი ყოველ ამანათზე დაგერიცხება" : "No points yet — every parcel earns some"}</Body>
        )}
      </Card>

      <BottomSheet visible={!!picked} onClose={() => setPicked(null)}>
        {done ? (
          <View style={{ alignItems: "center" }}>
            <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
              <Ionicons name="checkmark" size={30} color={theme.greenDeep} />
            </View>
            <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{ka ? "ჯილდო გააქტიურდა" : "Reward applied"}</Body>
            <Body muted size={font.s12} style={{ marginTop: 4, textAlign: "center" }}>{ka ? "ავტომატურად გამოიყენება შემდეგ გადახდისას" : "Applied automatically at your next payment"}</Body>
            <Btn label={ka ? "კარგი" : "Done"} onPress={() => setPicked(null)} style={{ marginTop: space.xl, alignSelf: "stretch" }} />
          </View>
        ) : (
          <>
            <Body weight="700" size={font.s16}>{ka ? "ჯილდოს გამოყენება" : "Redeem reward"}</Body>
            <Body muted size={font.s13} style={{ marginTop: 6 }}>{picked ? (ka ? picked.title_ka : picked.title_en) : ""}</Body>
            <Card style={{ marginTop: space.lg, paddingVertical: 0 }}>
              <View style={[styles.between, { paddingVertical: 12 }]}>
                <Body muted size={font.s13}>{ka ? "ღირებულება" : "Cost"}</Body>
                <Body weight="700" size={font.s13}>{picked?.cost} {ka ? "ქულა" : "pts"}</Body>
              </View>
              <Divider />
              <View style={[styles.between, { paddingVertical: 12 }]}>
                <Body muted size={font.s13}>{ka ? "დარჩება" : "Balance after"}</Body>
                <Body weight="700" size={font.s13}>{pointsBefore - (picked?.cost ?? 0)} {ka ? "ქულა" : "pts"}</Body>
              </View>
            </Card>
            {redeem.isError ? <Body size={font.s12} style={{ color: theme.red, marginTop: space.md }}>{apiError(redeem.error, ka ? "ჯილდოს გამოყენება ვერ მოხერხდა. სცადე ხელახლა." : "Couldn't redeem the reward. Try again.")}</Body> : null}
            <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg }}>
              <Btn label={ka ? "გაუქმება" : "Cancel"} variant="outline" onPress={() => setPicked(null)} style={{ flexGrow: 1, flexBasis: 0 }} />
              <Btn label={ka ? "დადასტურება" : "Confirm"} onPress={confirm} loading={redeem.isPending} style={{ flexGrow: 1, flexBasis: 0 }} />
            </View>
          </>
        )}
      </BottomSheet>
    </Screen>
  );
}
