// "Sync contacts" button + sheet (module 1135). Uses a fake address book; the sync is a staged animation.
import React, { useMemo, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, TextInput, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { DIAL_CODES, formatPhone, parsePhone, type PhoneValue } from "@/lib/phone";
import { MOCK_CONTACTS } from "@/data/contacts";
import { BottomSheet } from "@/ui/BottomSheet";
import { Body, Btn, Divider, styles, useTokens } from "@/ui";

const useContactsStore = create<{ syncedAt: number | null; markSynced: () => void }>()(
  persist((set) => ({ syncedAt: null, markSynced: () => set({ syncedAt: Date.now() }) }), { name: "gz.contacts", storage: createJSONStorage(() => AsyncStorage) }),
);
const flagOf = (code: string) => DIAL_CODES.find((d) => d.code === code)?.flag ?? "🌍";

export type PickedContact = { first: string; last: string; phone: PhoneValue; address?: string };

export function ContactsButton({ onPick, country, compact }: { onPick: (c: PickedContact) => void; country?: string; compact?: boolean }) {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const syncedAt = useContactsStore((s) => s.syncedAt);
  const markSynced = useContactsStore((s) => s.markSynced);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<"ask" | "syncing" | "list">("ask");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [count, setCount] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;
  const contacts = useMemo(() => MOCK_CONTACTS.map((c) => ({ ...c, parsed: parsePhone(c.phone) })), []);
  const countries = [...new Set(contacts.map((c) => c.parsed.country))];

  const show = () => { setQ(""); setFilter(country && country !== "GE" && countries.includes(country) ? country : null); setMode(syncedAt ? "list" : "ask"); setOpen(true); };
  const sync = () => {
    setMode("syncing"); setCount(0); anim.setValue(0);
    const id = anim.addListener(({ value }) => setCount(Math.round(value * contacts.length)));
    Animated.timing(anim, { toValue: 1, duration: 1800, easing: Easing.inOut(Easing.quad), useNativeDriver: false }).start(() => { anim.removeListener(id); markSynced(); setMode("list"); });
  };
  const query = q.trim().toLowerCase();
  const digits = query.replace(/\D/g, "");
  const list = contacts.filter((c) => (!filter || c.parsed.country === filter) && (!query || c.name.toLowerCase().includes(query) || (digits.length >= 2 && c.phone.replace(/\D/g, "").includes(digits))));
  const pick = (c: (typeof contacts)[number]) => { const [first, ...rest] = c.name.split(/\s+/); onPick({ first, last: rest.join(" "), phone: c.parsed, address: c.address }); setOpen(false); };
  const mins = syncedAt ? Math.floor((Date.now() - syncedAt) / 60_000) : 0;
  const ago = syncedAt ? (mins < 1 ? (ka ? "ახლახან" : "just now") : ka ? `${mins} წთ. წინ` : `${mins} min ago`) : "";

  return (
    <>
      {compact ? (
        <Pressable onPress={show} hitSlop={8} accessibilityLabel={ka ? "კონტაქტებიდან" : "From contacts"} style={({ pressed }) => ({ width: 30, height: 30, borderRadius: 15, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center", opacity: pressed ? 0.7 : 1 })}>
          <Ionicons name="people-outline" size={15} color={theme.brandText} />
        </Pressable>
      ) : (
        <Pressable onPress={show} hitSlop={6} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: theme.tint, borderRadius: radius.pill, paddingHorizontal: 11, paddingVertical: 6, opacity: pressed ? 0.7 : 1 })}>
          <Ionicons name={syncedAt ? "people-outline" : "sync-outline"} size={14} color={theme.brandText} />
          <Body size={font.s12} weight="700" style={{ color: theme.brandText }}>{syncedAt ? (ka ? "კონტაქტები" : "Contacts") : ka ? "კონტაქტების სინქრ." : "Sync contacts"}</Body>
        </Pressable>
      )}
      <BottomSheet visible={open} onClose={() => setOpen(false)}>
        {mode === "ask" ? (
          <View style={{ alignItems: "center" }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}><Ionicons name="people" size={30} color={theme.brandText} /></View>
            <Body weight="700" size={font.s16} style={{ marginTop: space.lg, textAlign: "center" }}>{ka ? "„Gzavnili“ ითხოვს წვდომას კონტაქტებზე" : "“Gzavnili” would like to access your contacts"}</Body>
            <Body muted size={font.s13} style={{ marginTop: 6, textAlign: "center" }}>{ka ? "კონტაქტები გამოყენება მიმღებების სწრაფად შესავსებლად. არაფერი ატვირთება." : "They are used on this device to fill in recipients faster. Nothing is uploaded."}</Body>
            <Btn label={ka ? "დაშვება" : "Allow"} onPress={sync} style={{ alignSelf: "stretch", marginTop: space.xl }} />
            <Btn label={ka ? "არ დაშვებო" : "Don't allow"} variant="outline" onPress={() => setOpen(false)} style={{ alignSelf: "stretch", marginTop: space.sm }} />
          </View>
        ) : mode === "syncing" ? (
          <View style={{ alignItems: "center", paddingVertical: space.lg }}>
            <Ionicons name="sync" size={30} color={theme.brandText} />
            <Body weight="700" size={font.s16} style={{ marginTop: space.md }}>{ka ? "კონტაქტების სინქრონიზაცია…" : "Syncing contacts…"}</Body>
            <View style={{ alignSelf: "stretch", height: 8, borderRadius: 4, backgroundColor: theme.lineSoft, marginTop: space.lg, overflow: "hidden" }}>
              <Animated.View style={{ height: 8, backgroundColor: theme.green, width: anim.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }} />
            </View>
            <Body muted size={font.s12} style={{ marginTop: space.sm }}>{count} / {contacts.length}</Body>
          </View>
        ) : (
          <>
            <View style={styles.between}>
              <Body weight="700" size={font.s16}>{ka ? "კონტაქტები" : "Contacts"}</Body>
              <Pressable onPress={sync} hitSlop={8} style={[styles.row, { gap: 4 }]}>
                <Ionicons name="sync-outline" size={13} color={theme.mut} />
                <Body muted size={font.s11}>{contacts.length} · {ago}</Body>
              </Pressable>
            </View>
            <TextInput value={q} onChangeText={setQ} placeholder={ka ? "სახელი ან ნომერი" : "Name or number"} placeholderTextColor={theme.faint} style={{ backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 12, color: theme.ink, fontSize: font.s14, marginTop: space.md }} />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: space.sm, flexGrow: 0 }} contentContainerStyle={{ gap: 6 }}>
              {[null, ...countries].map((c) => {
                const on = filter === c;
                return (
                  <Pressable key={c ?? "all"} onPress={() => setFilter(c)} style={{ paddingHorizontal: 11, paddingVertical: 6, borderRadius: radius.pill, borderWidth: 1, borderColor: on ? theme.greenDeep : theme.line, backgroundColor: on ? theme.tint2 : theme.card }}>
                    <Body size={font.s12} weight={on ? "700" : "500"}>{c ? flagOf(c) : ka ? "ყველა" : "All"}</Body>
                  </Pressable>
                );
              })}
            </ScrollView>
            <ScrollView style={{ maxHeight: 360, marginTop: space.sm }} keyboardShouldPersistTaps="handled">
              {list.length ? list.map((c, i) => (
                <View key={c.id}>
                  {i > 0 ? <Divider /> : null}
                  <Pressable onPress={() => pick(c)} style={({ pressed }) => [styles.row, { gap: space.md, paddingVertical: 11, opacity: pressed ? 0.6 : 1 }]}>
                    <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}><Body weight="700" size={font.s13} style={{ color: theme.brandText }}>{c.name[0]}</Body></View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Body weight="600" size={font.s13} numberOfLines={1}>{c.name}</Body>
                      <Body muted size={font.s11} numberOfLines={1}>{formatPhone(c.parsed)}{c.address ? ` · ${c.address}` : ""}</Body>
                    </View>
                    <Body size={font.s16}>{flagOf(c.parsed.country)}</Body>
                  </Pressable>
                </View>
              )) : <Body muted size={font.s13} style={{ paddingVertical: space.lg, textAlign: "center" }}>{ka ? "არაფერი მოიძებნა" : "No contacts found"}</Body>}
            </ScrollView>
          </>
        )}
      </BottomSheet>
    </>
  );
}
