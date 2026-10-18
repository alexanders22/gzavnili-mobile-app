import React, { useEffect, useState } from "react";
import { ActivityIndicator, Linking, Pressable, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useReferral } from "@/lib/hooks";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { GiftArt } from "@/components/GiftArt";
import { NewBadge } from "@/components/ModuleTile";

const STATE = {
  credited: { ka: "ქულები ჩაირიცხა", en: "Credited", tone: "ok" as const },
  pending: { ka: "ელოდება პირველ ამანათს", en: "Awaiting first parcel", tone: "warn" as const },
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
const open = (url: string) => Linking.openURL(url).catch(() => {});

export default function ReferralScreen() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { data, isLoading } = useReferral();
  const [copied, setCopied] = useState<"code" | "link" | null>(null);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(t);
  }, [copied]);

  const code = data?.code ?? "";
  const link = data?.link ?? "";
  const bonus = data?.bonus ?? 150;
  const pitch = ka
    ? `გიწვევ Gzavnili-ზე — ამანათები აშშ-დან და ჩინეთიდან საქართველოში. დარეგისტრირდი ჩემი კოდით ${code} და პირველი ამანათის შემდეგ ორივე მიიღებთ ${bonus} ქულას.`
    : `Join me on Gzavnili — parcels from the USA and China to Georgia. Sign up with my code ${code} and we both get ${bonus} points after your first parcel.`;
  const message = `${pitch} ${link}`;
  const shares = [
    { id: "wa", label: "WhatsApp", icon: "logo-whatsapp" as const, onPress: () => open(`https://wa.me/?text=${encodeURIComponent(message)}`) },
    { id: "tg", label: "Telegram", icon: "paper-plane" as const, onPress: () => open(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(pitch)}`) },
    { id: "fb", label: "Facebook", icon: "logo-facebook" as const, onPress: () => open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`) },
  ];
  const copyCode = async () => { await Clipboard.setStringAsync(code); setCopied("code"); };
  const copyLink = async () => { await Clipboard.setStringAsync(message); setCopied("link"); };

  const header = (
    <View style={styles.between}>
      <View style={[styles.row, { gap: space.md, flexShrink: 1, minWidth: 0 }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "მოიწვიე მეგობარი" : "Refer a friend"}</Title>
      </View>
      <NewBadge />
    </View>
  );
  if (!data) {
    return (
      <Screen>
        {header}
        <View style={{ paddingVertical: 60, alignItems: "center" }}>
          {isLoading ? <ActivityIndicator color={theme.green} /> : <Body muted>{ka ? "მოწვევის კოდი ვერ ჩაიტვირდა" : "Couldn't load your invite code"}</Body>}
        </View>
      </Screen>
    );
  }

  return (
    <Screen>
      {header}
      <Card style={{ marginTop: space.lg, backgroundColor: theme.greenDeep, borderColor: theme.greenDeep, alignItems: "center", paddingVertical: 26 }}>
        <GiftArt size={110} />
        <Body weight="700" size={font.s16} style={{ color: "#fff", marginTop: space.md, textAlign: "center" }}>{ka ? `თითო მეგობარზე ${bonus} ქულა` : `${bonus} points per friend`}</Body>
        <Body size={font.s12} style={{ color: theme.greenSoft, marginTop: 4, textAlign: "center" }}>{ka ? `მეგობარიც მიიღებს ${bonus} ქულას პირველი ამანათის შემდეგ` : `Your friend gets ${bonus} points after their first parcel too`}</Body>
      </Card>

      <SectionLabel>{ka ? "შენი კოდი" : "Your code"}</SectionLabel>
      <Card>
        <View style={[styles.between, { gap: space.md }]}>
          <View style={{ flexShrink: 1, minWidth: 0 }}>
            <Body weight="700" size={font.s16} numberOfLines={1}>{code}</Body>
            <Body muted size={font.s11} numberOfLines={1} style={{ marginTop: 2 }}>{link}</Body>
          </View>
          <Pressable onPress={copyCode} style={{ flexShrink: 0, flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: copied === "code" ? theme.tint2 : theme.paper, borderRadius: radius.pill, paddingHorizontal: 13, paddingVertical: 8 }}>
            <Ionicons name={copied === "code" ? "checkmark" : "copy-outline"} size={14} color={copied === "code" ? theme.ok : theme.mut} />
            <Body size={font.s12} weight="600" style={{ color: copied === "code" ? theme.ok : theme.mut }}>{copied === "code" ? (ka ? "დაკოპირდა" : "Copied") : ka ? "კოპირება" : "Copy"}</Body>
          </Pressable>
        </View>
        <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg }}>
          {shares.map((s) => (
            <Pressable key={s.id} onPress={s.onPress} style={({ pressed }) => ({ flexGrow: 1, flexBasis: 0, minWidth: 0, alignItems: "center", gap: 5, paddingVertical: 12, borderRadius: radius.md, backgroundColor: theme.paper, opacity: pressed ? 0.7 : 1 })}>
              <Ionicons name={s.icon} size={18} color={theme.ink} />
              <Body size={font.s11} weight="600" numberOfLines={1}>{s.label}</Body>
            </Pressable>
          ))}
        </View>
        <Btn label={copied === "link" ? (ka ? "ბმული დაკოპირდა" : "Link copied") : ka ? "ბმულის გაზიარება" : "Share invite link"} icon={copied === "link" ? "checkmark" : "share-outline"} onPress={copyLink} style={{ marginTop: space.md }} />
      </Card>

      <SectionLabel>{ka ? "მოწვეული მეგობრები" : "Invited friends"} · {data.earned} {ka ? "ქულა" : "pts"}</SectionLabel>
      {data.friends.length ? (
        <Card style={{ paddingVertical: 0 }}>
          {data.friends.map((f, i) => {
            const st = STATE[f.state] ?? STATE.pending;
            return (
              <View key={f.id}>
                {i > 0 ? <Divider /> : null}
                <View style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                  <View style={{ width: 38, height: 38, borderRadius: 19, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
                    <Body weight="700" style={{ color: theme.greenDeep }}>{(f.name?.trim()?.[0] ?? "?").toUpperCase()}</Body>
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Body weight="600" numberOfLines={1}>{f.name}</Body>
                    <Body muted size={font.s11} numberOfLines={1}>{ka ? st.ka : st.en} · {shortDate(f.credited_at ?? f.joined_at, ka)}</Body>
                  </View>
                  <Pill text={`+${f.points}`} tone={st.tone} />
                </View>
              </View>
            );
          })}
        </Card>
      ) : (
        <Card style={{ alignItems: "center", paddingVertical: 26 }}>
          <Ionicons name="people-outline" size={28} color={theme.faint} />
          <Body weight="700" style={{ marginTop: space.md, textAlign: "center" }}>{ka ? "ჯერ არავინ მოიწვიე" : "No friends invited yet"}</Body>
          <Body muted size={font.s12} style={{ marginTop: 4, textAlign: "center" }}>{ka ? "გაუზიარე კოდი — ქულებს მიიღებ, როცა მეგობარი პირველ ამანათს მიიღებს" : "Share your code — you'll get points once a friend receives their first parcel"}</Body>
        </Card>
      )}
    </Screen>
  );
}
