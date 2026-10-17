import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import { Ionicons } from "@/ui/Icon";
import { font, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { flagOf } from "@/lib/flags";
import { useCustomer, useWarehouseAddresses } from "@/lib/hooks";
import { Body, Card, Divider, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { Picker } from "@/ui/Picker";
import { DrawnBand } from "@/components/Drawing";

/** Warehouse address the customer uses at checkout; every field copies on tap. */
export default function Address() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { data: customer } = useCustomer();
  const { data: warehouses } = useWarehouseAddresses();
  const [warehouseId, setWarehouseId] = useState<string>();
  const [copied, setCopied] = useState<string | null>(null);
  const warehouse = warehouses?.find((w) => w.id === warehouseId) ?? warehouses?.[0];
  const room = customer?.room_number ?? "—";
  const options = (warehouses ?? []).map((w) => ({ id: w.id, label: w.country, sub: `${w.city}${w.state ? `, ${w.state}` : ""} · ${w.zipCode}`, detail: w.street, emoji: flagOf(w.country) }));

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(null), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async (label: string, value: string) => {
    try { await Clipboard.setStringAsync(value); } catch {}
    setCopied(label);
  };

  const rows = warehouse
    ? [
        { label: ka ? "სახელი" : "Name", value: `${customer?.first_name ?? ""} ${customer?.last_name ?? ""}`.trim() || "—" },
        { label: ka ? "მისამართი" : "Address", value: `${warehouse.street} UNIT ${room}` },
        { label: ka ? "ქალაქი" : "City", value: warehouse.city },
        ...(warehouse.state ? [{ label: ka ? "შტატი" : "State", value: warehouse.state }] : []),
        { label: ka ? "ინდექსი" : "Zip code", value: warehouse.zipCode },
        { label: ka ? "ქვეყანა" : "Country", value: warehouse.country },
        { label: ka ? "ტელეფონი" : "Phone", value: warehouse.tel ?? "—" },
      ]
    : [];

  return (
    <Screen>
      <Title>{ka ? "ჩემი მისამართი" : "My address"}</Title>
      <Body muted style={{ marginTop: 4 }}>{ka ? "ეს მისამართი მიუთითე მაღაზიაში შეკვეთისას" : "Use this address when you order from a store"}</Body>
      <DrawnBand name="parcels" width={130} note={ka ? "ნებისმიერი ადგილიდან —\nსაქართველოში." : "From anywhere\nto Georgia."} style={{ marginTop: space.lg }} />
      <View style={{ marginTop: space.lg }}>
        <Picker title={ka ? "აირჩიე საწყობი" : "Choose a warehouse"} hint={ka ? "ამ მისამართზე მოგდის ამანათები" : "Parcels you order arrive at this address"} options={options} value={warehouse?.id} onChange={setWarehouseId} />
      </View>
      <Card style={{ marginTop: space.md, backgroundColor: theme.greenDeep, borderColor: theme.greenDeep }}>
        <Body size={font.s11} weight="700" style={{ color: theme.greenSoft }}>{(ka ? "ოთახის ნომერი" : "Room number").toUpperCase()}</Body>
        <Body size={font.s28} weight="700" style={{ color: "#fff", marginTop: 4 }}>{room}</Body>
        <Body size={font.s12} style={{ color: theme.greenSoft, marginTop: 6 }}>{ka ? "აუცილებლად მიუთითე მისამართის ბოლოს" : "Always add it at the end of the address"}</Body>
      </Card>
      <SectionLabel>{ka ? "საწყობის მისამართი" : "Warehouse address"}</SectionLabel>
      {warehouse ? (
        <Card style={{ paddingVertical: 0 }}>
          {rows.map((r, i) => (
            <View key={r.label}>
              {i > 0 ? <Divider /> : null}
              <Pressable onPress={() => copy(r.label, r.value)} style={[styles.row, { gap: space.md, paddingVertical: 13 }]}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body muted size={font.s11}>{r.label}</Body>
                  <Body weight="600" size={font.s13} style={{ marginTop: 2 }}>{r.value}</Body>
                </View>
                <Ionicons name={copied === r.label ? "checkmark" : "copy-outline"} size={16} color={copied === r.label ? theme.ok : theme.faint} />
              </Pressable>
            </View>
          ))}
        </Card>
      ) : (
        <Card><Body muted size={font.s13}>{ka ? "მისამართი იტვირთება…" : "Loading address…"}</Body></Card>
      )}
    </Screen>
  );
}
