// "New address" sheet with a draggable map and Nominatim reverse geocoding (module 1132).
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, TextInput, View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { BottomSheet } from "@/ui/BottomSheet";
import { Body, Btn, styles, useTokens } from "@/ui";
import { MapPicker } from "./MapPicker";

const TBILISI = { lat: 41.7151, lng: 44.8271 };
const NOMINATIM = "https://nominatim.openstreetmap.org";
const KINDS = [
  { id: "home", ka: "სახლი", en: "Home", icon: "home-outline" as const },
  { id: "work", ka: "სამსახური", en: "Work", icon: "briefcase-outline" as const },
  { id: "other", ka: "სხვა", en: "Other", icon: "location-outline" as const },
];
export type PickedAddress = { address: string; city: string; lat: number; lng: number; title: string; save: boolean };

export function AddressSheet({ visible, onClose, onPicked, saving, error }: { visible: boolean; onClose: () => void; onPicked: (a: PickedAddress) => void; saving?: boolean; error?: string | null }) {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const [pos, setPos] = useState(TBILISI);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("Tbilisi");
  const [kind, setKind] = useState("home");
  const [save, setSave] = useState(true);
  const [resetKey, setResetKey] = useState(0);
  const [busy, setBusy] = useState(false);
  const seq = useRef(0);

  const reverse = async (lat: number, lng: number) => {
    const n = ++seq.current;
    setBusy(true);
    try {
      const r = await fetch(`${NOMINATIM}/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=${ka ? "ka" : "en"}`);
      const j = await r.json();
      if (n !== seq.current) return;
      const a = j?.address ?? {};
      const line = [a.road, a.house_number].filter(Boolean).join(" ");
      setStreet(line || j?.display_name?.split(",").slice(0, 2).join(",") || "");
      setCity(a.city || a.town || a.village || a.municipality || city);
    } catch { /* offline: keep what the user typed */ } finally { if (n === seq.current) setBusy(false); }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { if (visible) { setResetKey((k) => k + 1); reverse(TBILISI.lat, TBILISI.lng); } }, [visible]);

  const search = async () => {
    if (!street.trim()) return;
    setBusy(true);
    try {
      const r = await fetch(`${NOMINATIM}/search?format=jsonv2&limit=1&q=${encodeURIComponent(`${street}, ${city}`)}`);
      const [hit] = await r.json();
      if (hit) { setPos({ lat: Number(hit.lat), lng: Number(hit.lon) }); setResetKey((k) => k + 1); }
    } catch { /* ignore */ } finally { setBusy(false); }
  };
  const ok = street.trim().length >= 4;
  const field = { backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 13, color: theme.ink, fontSize: font.s14 };

  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <Body weight="700" size={font.s16}>{ka ? "ახალი მისამართი" : "New address"}</Body>
      <Body muted size={font.s12} style={{ marginTop: 4 }}>{ka ? "გადაათრიე რუკა, სანამ პინი ადგილზე დადგება" : "Drag the map until the pin is on the spot"}</Body>
      <View style={{ marginTop: space.md }}>
        <MapPicker lat={pos.lat} lng={pos.lng} resetKey={resetKey} height={190} onMove={(p) => { setPos(p); reverse(p.lat, p.lng); }} />
      </View>
      <View style={[styles.row, { gap: space.sm, marginTop: space.md }]}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <TextInput value={street} onChangeText={setStreet} onSubmitEditing={search} placeholder={ka ? "ქუჩა და ნომერი" : "Street and number"} placeholderTextColor={theme.faint} style={field} />
        </View>
        <Pressable onPress={search} style={({ pressed }) => ({ width: 48, alignItems: "center", justifyContent: "center", borderRadius: radius.md, backgroundColor: theme.navy, opacity: pressed ? 0.8 : 1 })}>
          {busy ? <ActivityIndicator color={theme.green} /> : <Ionicons name="search" size={18} color="#fff" />}
        </Pressable>
      </View>
      <TextInput value={city} onChangeText={setCity} placeholder={ka ? "ქალაქი" : "City"} placeholderTextColor={theme.faint} style={{ ...field, marginTop: space.sm }} />
      <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.md }}>
        {KINDS.map((k) => {
          const on = kind === k.id;
          return (
            <Pressable key={k.id} onPress={() => setKind(k.id)} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 11, borderRadius: radius.md, backgroundColor: on ? theme.navy : theme.card, borderWidth: 1, borderColor: on ? theme.navy : theme.line }}>
              <Ionicons name={k.icon} size={14} color={on ? theme.green : theme.mut} />
              <Body size={font.s12} weight="700" numberOfLines={1} style={{ color: on ? "#fff" : theme.mut }}>{ka ? k.ka : k.en}</Body>
            </Pressable>
          );
        })}
      </View>
      <Pressable onPress={() => setSave((s) => !s)} style={[styles.row, { gap: space.md, marginTop: space.md }]}>
        <View style={{ width: 22, height: 22, borderRadius: 7, alignItems: "center", justifyContent: "center", backgroundColor: save ? theme.green : "transparent", borderWidth: save ? 0 : 1.5, borderColor: theme.line }}>
          {save ? <Ionicons name="checkmark" size={14} color={theme.brandText} /> : null}
        </View>
        <Body size={font.s13} weight="600" style={{ flex: 1, minWidth: 0 }}>{ka ? "შეინახე მისამართი შემდეგისთვის" : "Save this address for next time"}</Body>
      </Pressable>
      {error ? <Body size={font.s12} style={{ color: theme.red, marginTop: space.sm }}>{error}</Body> : null}
      <Btn
        label={save ? (ka ? "შენახვა და არჩევა" : "Save and use") : ka ? "გამოყენება" : "Use this address"}
        icon="location-outline" disabled={!ok} loading={saving}
        onPress={() => onPicked({ address: street.trim(), city: city.trim() || "Tbilisi", lat: pos.lat, lng: pos.lng, title: KINDS.find((k) => k.id === kind)?.[ka ? "ka" : "en"] ?? "Address", save })}
        style={{ marginTop: space.lg }}
      />
    </BottomSheet>
  );
}
