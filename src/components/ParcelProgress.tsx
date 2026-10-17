import React from "react";
import { View } from "react-native";
import { font, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { Body, useTokens } from "@/ui";

export const IN_STAGES = [
  { ka: "მისაღები", en: "Awaiting" },
  { ka: "საწყობში", en: "In warehouse" },
  { ka: "გზაში", en: "On it's way" },
  { ka: "ჩამოსული", en: "Arrived" },
  { ka: "მიღებული", en: "Received" },
];

export const OUT_STAGES: Record<string, { ka: string; en: string }> = {
  CREATED: { ka: "შექმნილი", en: "Created" },
  "PICKED UP": { ka: "აღებული", en: "Picked up" },
  "AT TBILISI HUB": { ka: "თბილისის ჰაბში", en: "Tbilisi hub" },
  "IN TRANSIT": { ka: "გზაში", en: "In transit" },
  "ARRIVED AT DESTINATION": { ka: "ჩამოვიდა", en: "Arrived" },
  DELIVERED: { ka: "ჩაბარდა", en: "Delivered" },
};

/** Maps a raw inbound status to one of the five stages. */
export function stageOf(status?: string | null) {
  const s = (status ?? "").toUpperCase();
  if (s === "DELIVERED") return 4;
  if (["RECEIVED IN TBILISI WAREHOUSE", "OUT FOR DELIVERY", "FAILED DELIVERY ATTEMPT", "CHECKED", "PICKED UP"].includes(s)) return 3;
  if (["ON THE WAY FROM US WAREHOUSE", "AIR SHIPPED FROM US", "AIR SHIPPED FROM CHINA", "GROUND SHIPPED FROM CHINA", "DROPPED IN US AIRPORT FACILITY", "CUSTOMS CLEARANCE", "CUSTOMS EXPERTISE", "DELAYED"].includes(s)) return 2;
  if (["RECEIVED IN US WAREHOUSE", "RECEIVED IN CHINA WAREHOUSE", "ON HOLD", "DAMAGED"].includes(s)) return 1;
  return 0;
}

export function ParcelProgress({ status, eta, direction = "in" }: { status?: string; eta?: string; direction?: "in" | "out" }) {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const stages = direction === "out" ? Object.values(OUT_STAGES) : IN_STAGES;
  const idx = direction === "out" ? Math.max(0, Object.keys(OUT_STAGES).indexOf(status ?? "")) : stageOf(status);
  return (
    <View style={{ marginTop: space.md }}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        {stages.map((_, i) => (
          <View key={i} style={{ flexGrow: 1, flexBasis: 0, height: 4, borderRadius: 2, backgroundColor: i < idx ? theme.greenSoft : i === idx ? theme.green : theme.line }} />
        ))}
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 7, gap: space.sm }}>
        <Body size={font.s11} weight="700" numberOfLines={1} style={{ color: theme.greenDeep }}>{ka ? stages[idx].ka : stages[idx].en}</Body>
        <Body muted size={font.s11} numberOfLines={1}>{eta || `${idx + 1}/${stages.length}`}</Body>
      </View>
    </View>
  );
}
