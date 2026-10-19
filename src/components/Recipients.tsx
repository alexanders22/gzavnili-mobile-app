// Extra recipients for an outgoing parcel (module 1138): editor rows + the summary shown after creation.
import React from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { dialOf, formatPhone, isPhoneValid, parsePhone, type PhoneValue } from "@/lib/phone";
import { useRecipients, type Recipient } from "@/lib/hooks";
import { Body, Card, Divider, Pill, styles, useTokens } from "@/ui";
import { ContactsButton } from "./ContactsButton";
import { PhoneInput } from "./PhoneInput";

export type RecipientRow = { key: string; first: string; last: string; phone: PhoneValue };

export const newRecipientRow = (init: Partial<RecipientRow> = {}): RecipientRow => ({ key: Math.random().toString(36).slice(2), first: "", last: "", phone: { country: "GE", number: "" }, ...init });
const touched = (r: RecipientRow) => !!(r.first.trim() || r.last.trim() || r.phone.number);
const complete = (r: RecipientRow) => r.first.trim().length >= 2 && isPhoneValid(r.phone);
const full = (p: PhoneValue) => dialOf(p.country).dial.slice(1) + p.number;
export const hasUnfinished = (rows: RecipientRow[]) => rows.some((r) => touched(r) && !complete(r));
export const recipientsPayload = (rows: RecipientRow[]) =>
  rows.filter(complete).map((r) => ({ first_name: r.first.trim(), last_name: r.last.trim(), dial: dialOf(r.phone.country).dial, phone: r.phone.number }));

const digits = (n: number) => Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");
const DEMO_NUMBER: Record<string, () => string> = { GE: () => `5${digits(8)}`, US: () => `646555${digits(4)}`, DE: () => `152${digits(8)}`, GB: () => `7700${digits(6)}`, TR: () => `532${digits(7)}` };

function Avatar({ name, small }: { name: string; small?: boolean }) {
  const { theme } = useTokens();
  const s = small ? 26 : 36;
  return (
    <View style={{ width: s, height: s, borderRadius: s / 2, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
      <Body weight="700" size={small ? font.s11 : font.s13} style={{ color: theme.brandText }}>{(name.trim()[0] ?? "?").toUpperCase()}</Body>
    </View>
  );
}

export function RecipientsEditor({ rows, onChange, defaultCountry = "GE", demoPeople = [], max = 5, label, hint }: {
  rows: RecipientRow[]; onChange: (rows: RecipientRow[]) => void; defaultCountry?: string; demoPeople?: { first: string; last: string }[]; max?: number; label: string; hint: string;
}) {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { data: saved } = useRecipients();
  const field = { backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 14, color: theme.ink, fontSize: font.s14 };
  const patch = (key: string, p: Partial<RecipientRow>) => onChange(rows.map((r) => (r.key === key ? { ...r, ...p } : r)));
  const fillOrAdd = (p: Partial<RecipientRow>) => {
    const empty = rows.find((r) => !touched(r));
    if (empty) onChange(rows.map((r) => (r.key === empty.key ? { ...r, ...p } : r)));
    else if (rows.length < max) onChange([...rows, newRecipientRow(p)]);
  };
  const used = new Set(rows.filter((r) => r.phone.number).map((r) => full(r.phone)));
  const suggestions = (saved ?? []).filter((r) => !used.has(r.phone.replace(/\D/g, "")) && parsePhone(r.phone).country === defaultCountry);
  const addDemo = () => {
    if (!demoPeople.length) return;
    const taken = new Set(rows.map((r) => r.first));
    const p = demoPeople.find((d) => !taken.has(d.first)) ?? demoPeople[0];
    fillOrAdd({ first: p.first, last: p.last, phone: { country: defaultCountry, number: (DEMO_NUMBER[defaultCountry] ?? (() => digits(9)))() } });
  };
  const atMax = rows.length >= max;
  return (
    <>
      <View style={[styles.between, { marginBottom: space.sm, gap: space.sm }]}>
        <Body size={font.s11} weight="700" style={{ color: theme.faint, letterSpacing: 0.8, flexShrink: 1 }}>{label.toUpperCase()}{rows.length ? ` · ${rows.length}` : ""}</Body>
        <View style={[styles.row, { gap: space.md }]}>
          {demoPeople.length ? (
            <Pressable onPress={addDemo} disabled={atMax} hitSlop={8} style={[styles.row, { gap: 5, opacity: atMax ? 0.4 : 1 }]}>
              <Ionicons name="flask-outline" size={13} color={theme.brandText} />
              <Body size={font.s12} weight="700" style={{ color: theme.brandText }}>{ka ? "სადემო" : "Demo"}</Body>
            </Pressable>
          ) : null}
          {atMax ? null : <ContactsButton country={defaultCountry} onPick={(c) => fillOrAdd({ first: c.first, last: c.last, phone: c.phone })} />}
        </View>
      </View>
      <Body muted size={font.s12}>{hint}</Body>
      {suggestions.length ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: space.md }} contentContainerStyle={{ gap: space.sm }}>
          {suggestions.map((r) => (
            <Pressable key={r.id} disabled={atMax && !rows.some((x) => !touched(x))} onPress={() => fillOrAdd({ first: r.first_name ?? "", last: r.last_name ?? "", phone: parsePhone(r.phone) })} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 6, paddingLeft: 5, paddingRight: 12, paddingVertical: 5, borderRadius: radius.pill, borderWidth: 1, borderColor: theme.line, backgroundColor: theme.card, opacity: pressed ? 0.7 : 1 })}>
              <Avatar name={r.name_en || r.name_ka || "?"} small />
              <Body size={font.s12} weight="600">{ka ? r.name_ka || r.name_en : r.name_en || r.name_ka}</Body>
              <Ionicons name="add" size={14} color={theme.brandText} />
            </Pressable>
          ))}
        </ScrollView>
      ) : null}
      {rows.map((r, i) => {
        const warn = touched(r) && !complete(r);
        return (
          <Card key={r.key} style={{ marginTop: space.md, borderColor: warn ? theme.orange : theme.line }}>
            <View style={styles.between}>
              <View style={[styles.row, { gap: space.sm }]}>
                <Avatar name={r.first || String(i + 1)} small />
                <Body weight="700" size={font.s13}>{ka ? `მიმღები ${i + 1}` : `Person ${i + 1}`}</Body>
              </View>
              <View style={[styles.row, { gap: space.md }]}>
                <ContactsButton compact country={defaultCountry} onPick={(c) => patch(r.key, { first: c.first, last: c.last, phone: c.phone })} />
                <Pressable onPress={() => onChange(rows.filter((x) => x.key !== r.key))} hitSlop={10} accessibilityLabel={ka ? "წაშლა" : "Remove"}>
                  <Ionicons name="trash-outline" size={17} color={theme.mut} />
                </Pressable>
              </View>
            </View>
            <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.md }}>
              <TextInput value={r.first} onChangeText={(v) => patch(r.key, { first: v })} placeholder={ka ? "სახელი" : "First name"} placeholderTextColor={theme.faint} style={{ ...field, flex: 1, minWidth: 0 }} />
              <TextInput value={r.last} onChangeText={(v) => patch(r.key, { last: v })} placeholder={ka ? "გვარი" : "Last name"} placeholderTextColor={theme.faint} style={{ ...field, flex: 1, minWidth: 0 }} />
            </View>
            <View style={{ marginTop: space.sm }}><PhoneInput value={r.phone} onChange={(v) => patch(r.key, { phone: v })} /></View>
          </Card>
        );
      })}
      {atMax ? null : (
        <Pressable onPress={() => onChange([...rows, newRecipientRow({ phone: { country: defaultCountry, number: "" } })])} style={({ pressed }) => ({ marginTop: space.md, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 13, borderRadius: radius.md, borderWidth: 1, borderStyle: "dashed", borderColor: theme.greenDeep, backgroundColor: theme.tint, opacity: pressed ? 0.7 : 1 })}>
          <Ionicons name="person-add-outline" size={16} color={theme.brandText} />
          <Body size={font.s13} weight="700" style={{ color: theme.brandText }}>{rows.length ? (ka ? "კიდევ ერთი მიმღები" : "Add another person") : ka ? "მიმღების დამატება" : "Add a person"}</Body>
        </Pressable>
      )}
      {hasUnfinished(rows) ? <Body size={font.s12} style={{ color: theme.orange, marginTop: space.sm }}>{ka ? "შეავსე სახელი და ტელეფონი, ან წაშალე" : "Finish each person's name and phone, or remove them"}</Body> : null}
    </>
  );
}

export function RecipientsSummary({ people }: { people: Recipient[] }) {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  if (!people.length) return null;
  const fresh = people.filter((p) => p.new_profile).length;
  return (
    <View style={{ alignSelf: "stretch", marginTop: space.xl }}>
      <View style={styles.between}>
        <Body size={font.s11} weight="700" style={{ color: theme.faint, letterSpacing: 0.6 }}>{(ka ? "მიმღებები" : "Recipients").toUpperCase()}</Body>
        {fresh ? <Body size={font.s11} weight="700" style={{ color: theme.brandText }}>{ka ? `${fresh} ახალი პროფილი` : `${fresh} new ${fresh === 1 ? "profile" : "profiles"}`}</Body> : null}
      </View>
      <View style={{ marginTop: space.sm, borderWidth: 1, borderColor: theme.line, borderRadius: radius.md, paddingHorizontal: space.md }}>
        {people.map((p, i) => (
          <View key={p.id}>
            {i > 0 ? <Divider /> : null}
            <View style={[styles.row, { gap: space.md, paddingVertical: 12 }]}>
              <Avatar name={p.name_en || p.name_ka || "?"} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Body weight="600" size={font.s13} numberOfLines={1}>{ka ? p.name_ka || p.name_en : p.name_en || p.name_ka}</Body>
                <Body muted size={font.s11} numberOfLines={1}>{formatPhone(parsePhone(p.phone))}</Body>
              </View>
              <Pill tone={p.new_profile ? "ok" : "neutral"} text={p.new_profile ? (ka ? "პროფილი შეიქმნა" : "Profile created") : ka ? "უკვე ჩვენთან" : "Existing profile"} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
