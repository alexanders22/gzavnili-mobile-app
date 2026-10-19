// Phone field with a country-code picker (module 1137's PhoneInput).
import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { DIAL_CODES, dialOf, groupDigits, isPhoneValid, type PhoneValue } from "@/lib/phone";
import { BottomSheet } from "@/ui/BottomSheet";
import { Body, useTokens } from "@/ui";

export function PhoneInput({ value, onChange, placeholder }: { value: PhoneValue; onChange: (v: PhoneValue) => void; placeholder?: string }) {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const dial = dialOf(value.country);
  const max = dial.digits ?? 12;
  const invalid = value.number.length > 0 && !isPhoneValid(value);
  const query = q.trim().toLowerCase();
  const list = query ? DIAL_CODES.filter((d) => `${d.name} ${d.nameKa} ${d.dial}`.toLowerCase().includes(query)) : DIAL_CODES;
  const field = { backgroundColor: theme.paper, borderRadius: radius.md, borderWidth: 1, borderColor: invalid ? theme.red : "transparent" };
  const close = () => { setOpen(false); setQ(""); };
  return (
    <>
      <View style={{ flexDirection: "row", gap: space.sm }}>
        <Pressable onPress={() => setOpen(true)} accessibilityLabel={ka ? "ქვეყნის კოდი" : "Country code"} style={({ pressed }) => ({ ...field, borderColor: "transparent", flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: space.md, opacity: pressed ? 0.7 : 1 })}>
          <Body size={font.s16}>{dial.flag}</Body>
          <Body weight="700" size={font.s14}>{dial.dial}</Body>
          <Ionicons name="chevron-down" size={14} color={theme.mut} />
        </Pressable>
        <TextInput
          value={groupDigits(value.country, value.number)}
          onChangeText={(t) => onChange({ ...value, number: t.replace(/\D/g, "").slice(0, max) })}
          placeholder={placeholder ?? (value.country === "GE" ? "555 12 34 56" : ka ? "ნომერი" : "Number")}
          placeholderTextColor={theme.faint}
          keyboardType="phone-pad"
          style={{ ...field, flex: 1, minWidth: 0, paddingHorizontal: space.md, paddingVertical: 14, color: theme.ink, fontSize: font.s14 }}
        />
      </View>
      {invalid && dial.digits ? <Body size={font.s11} style={{ color: theme.red, marginTop: 4 }}>{ka ? `${dial.dial} ნომერი — ${dial.digits} ციფრი` : `${dial.dial} numbers have ${dial.digits} digits`}</Body> : null}
      <BottomSheet visible={open} onClose={close}>
        <Body weight="700" size={font.s16}>{ka ? "ქვეყნის კოდი" : "Country code"}</Body>
        <TextInput value={q} onChangeText={setQ} placeholder={ka ? "ძებნა" : "Search"} placeholderTextColor={theme.faint} style={{ backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 12, color: theme.ink, fontSize: font.s14, marginTop: space.md }} />
        <ScrollView style={{ maxHeight: 380, marginTop: space.sm }} keyboardShouldPersistTaps="handled">
          {list.map((d) => {
            const on = d.code === value.country;
            return (
              <Pressable key={d.code} onPress={() => { onChange({ country: d.code, number: value.number.slice(0, d.digits ?? 12) }); close(); }} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: space.md, paddingVertical: 12, paddingHorizontal: space.sm, borderRadius: radius.sm, backgroundColor: on ? theme.tint : pressed ? theme.lineSoft : "transparent" })}>
                <Body size={font.s18}>{d.flag}</Body>
                <Body weight={on ? "700" : "500"} style={{ flex: 1, minWidth: 0 }} numberOfLines={1}>{ka ? d.nameKa : d.name}</Body>
                <Body muted weight="600">{d.dial}</Body>
                {on ? <Ionicons name="checkmark" size={16} color={theme.brandText} /> : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </BottomSheet>
    </>
  );
}
