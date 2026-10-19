// Pickup-office picker, card and opening hours (module 1166).
import React from "react";
import { Linking, Pressable, View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import type { PickupLocation } from "@/lib/hooks";
import { hoursSummary, locationAddress, locationName, mapsUrl, openNow } from "@/lib/pickup";
import { Body, Card, Pill, styles, useTokens } from "@/ui";

export function PickupHours({ location, ka }: { location: PickupLocation; ka: boolean }) {
  const { theme } = useTokens();
  const h = hoursSummary(location);
  const rows: [string, string | null][] = [[ka ? "ორშ–პარ" : "Mon–Fri", h.weekdays], [ka ? "შაბ–კვი" : "Sat–Sun", h.weekend]];
  return (
    <View style={{ gap: 2 }}>
      {rows.map(([label, v]) => (
        <View key={label} style={[styles.row, { gap: 6 }]}>
          <Ionicons name="time-outline" size={12} color={theme.faint} />
          <Body muted size={font.s12}>{label}</Body>
          <Body size={font.s12} weight="600" style={{ color: v ? theme.ink : theme.faint }}>{v ?? (ka ? "დაკეტილია" : "Closed")}</Body>
        </View>
      ))}
    </View>
  );
}

export function PickupLocationPicker({ locations, selectedId, onSelect, ka }: { locations: PickupLocation[]; selectedId?: string; onSelect: (id: string) => void; ka: boolean }) {
  const { theme } = useTokens();
  if (!locations.length) return <Card><Body muted size={font.s13}>{ka ? "ახლა გასატანი ოფისი არ არის ხელმისაწვდომი" : "No pickup offices are available right now"}</Body></Card>;
  return (
    <View style={{ gap: space.sm }}>
      {locations.map((l) => {
        const on = selectedId === l.id;
        const open = openNow(l);
        return (
          <Pressable key={l.id} onPress={() => onSelect(l.id)} style={{ flexDirection: "row", gap: space.md, padding: space.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: on ? theme.greenDeep : theme.line, backgroundColor: on ? theme.tint : theme.card }}>
            <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, marginTop: 2, borderColor: on ? theme.green : theme.line, alignItems: "center", justifyContent: "center" }}>
              {on ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.green }} /> : null}
            </View>
            <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
              <View style={[styles.row, { gap: space.sm }]}>
                <Body weight="700" size={font.s14} numberOfLines={1} style={{ flexShrink: 1 }}>{locationName(l, ka)}</Body>
                <Pill text={open ? (ka ? "ღიაა" : "Open now") : ka ? "დაკეტილია" : "Closed now"} tone={open ? "ok" : "neutral"} />
              </View>
              <Body muted size={font.s12} numberOfLines={2}>{locationAddress(l, ka)}</Body>
              {on ? (
                <View style={{ gap: 6, marginTop: 2 }}>
                  <PickupHours location={l} ka={ka} />
                  {l.additional_info ? <Body muted size={font.s12}>{l.additional_info}</Body> : null}
                </View>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

function Chip({ icon, label, onPress }: { icon: React.ComponentProps<typeof Ionicons>["name"]; label: string; onPress: () => void }) {
  const { theme } = useTokens();
  return (
    <Pressable onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: theme.paper }}>
      <Ionicons name={icon} size={14} color={theme.brandText} />
      <Body size={font.s12} weight="600">{label}</Body>
    </Pressable>
  );
}

export function PickupLocationCard({ location, ka }: { location: PickupLocation; ka: boolean }) {
  const { theme } = useTokens();
  return (
    <Card>
      <View style={[styles.row, { gap: space.md, alignItems: "flex-start" }]}>
        <View style={{ width: 40, height: 40, borderRadius: radius.sm, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}><Ionicons name="business-outline" size={19} color={theme.brandText} /></View>
        <View style={{ flex: 1, minWidth: 0, gap: 4 }}>
          <Body weight="700" size={font.s16}>{locationName(location, ka)}</Body>
          <Body muted size={font.s12}>{locationAddress(location, ka)}</Body>
          <View style={{ marginTop: 4 }}><PickupHours location={location} ka={ka} /></View>
          {location.additional_info ? <Body muted size={font.s12} style={{ marginTop: 4 }}>{location.additional_info}</Body> : null}
        </View>
        <Pill text={ka ? "უფასო" : "Free"} tone="ok" />
      </View>
      <View style={[styles.row, { gap: space.sm, marginTop: space.md }]}>
        <Chip icon="map-outline" label={ka ? "რუკაზე" : "Directions"} onPress={() => Linking.openURL(mapsUrl(location))} />
        {location.phone ? <Chip icon="call-outline" label={location.phone} onPress={() => Linking.openURL(`tel:${location.phone!.replace(/\s/g, "")}`)} /> : null}
      </View>
    </Card>
  );
}
