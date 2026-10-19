import React, { useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { router } from "expo-router";
import { font, radius, space } from "@/lib/theme";
import { useSettings } from "@/lib/settings";
import { useLang, useT } from "@/lib/i18n";
import { flagOf } from "@/lib/flags";
import { useCustomer, useLoyalty, useOrders, useStatusQuantity, useUnpaidOrders, useWallet, useWarehouseAddresses, type Order } from "@/lib/hooks";
import { Body, Card, Screen, Title, styles, useTokens } from "@/ui";
import { Picker } from "@/ui/Picker";
import { TileGrid } from "@/ui/TileGrid";
import { FlyingMark } from "@/ui/Brand";
import { ReelsStrip } from "@/components/ReelsStrip";
import { DealsStrip } from "@/components/DealsStrip";
import { TransitAnimation } from "@/components/TransitAnimation";

const TILE_HEIGHT = 142;
const RATE_CHIPS = [
  { flag: "🇺🇸", price: 6, days: "7–10" },
  { flag: "🇨🇳", price: 5, days: "10–14" },
  { flag: "🇨🇳", price: 3, days: "25–35" },
];

const isPayable = (o: Order) => !o.payed && !!o.buttons?.payment_enable;
const isPaid = (o: Order) => !!o.payed;

export default function Home() {
  const { theme } = useTokens();
  const t = useT();
  const ka = useLang() === "ka";
  const isEnabled = useSettings((s) => s.isEnabled);

  const { data: customer } = useCustomer();
  const { data: qty } = useStatusQuantity(customer?.id);
  const { data: wallet } = useWallet();
  const { data: loyalty } = useLoyalty();
  const { data: unpaid } = useUnpaidOrders(customer?.id);
  const { data: arrivedOrders } = useOrders("RECEIVED_IN_TBILISI_WAREHOUSE");
  const { data: warehouses } = useWarehouseAddresses();
  const [warehouseId, setWarehouseId] = useState<string | undefined>();

  const flying = qty?.ON_THE_WAY_FROM_US_WAREHOUSE ?? 0;
  const stored = qty?.RECEIVED ?? 0;
  const inTransit = flying + stored;
  const awaiting = qty?.AWAITING ?? 0;
  const arrived = qty?.RECEIVED_IN_TBILISI_WAREHOUSE ?? 0;
  const toPay = (arrivedOrders ?? []).filter(isPayable).length;
  const ready = (arrivedOrders ?? []).filter(isPaid).length;
  const inCustoms = Math.max(0, arrived - toPay - ready);
  const due = (unpaid ?? []).reduce((s, o) => s + Number(o.price ?? 0), 0);

  const balance = customer?.wallet_balance ?? wallet?.balance;
  const firstName = ka
    ? customer?.profile?.first_name_ka || customer?.profile?.first_name_en
    : customer?.profile?.first_name_en || customer?.profile?.first_name_ka;

  const warehouse = warehouses?.find((w) => w.id === warehouseId) ?? warehouses?.[0];
  const room = customer?.room_number ?? "—";
  const warehouseOptions = (warehouses ?? []).map((w) => ({
    id: w.id, label: w.country, sub: `${w.city}${w.state ? `, ${w.state}` : ""} · ${w.zipCode}`, detail: w.street, emoji: flagOf(w.country),
  }));

  return (
    <Screen>
      <ReelsStrip />

      {/* Greeting + bird */}
      <View style={[styles.row, { marginTop: space.lg, gap: space.sm }]}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Title>{t("greeting")}{firstName ? `, ${firstName}` : ""}</Title>
          <Body muted style={{ marginTop: 4 }}>{t("homeSub")}</Body>
        </View>
        <FlyingMark size={56} float />
      </View>

      {/* Four stat tiles */}
      <TileGrid columns={2}>
        <StatTile
          tone="navy" icon="wallet" label={t("wallet")} onPress={() => router.push("/wallet" as any)}
          value={balance !== undefined ? <Body size={font.s28} weight="700" style={{ color: "#fff" }}>{Number(balance).toFixed(2)} ₾</Body> : null}
          foot={
            <View style={[styles.row, { gap: 5 }]}>
              <Ionicons name={due > 0 ? "alert-circle" : "checkmark-circle"} size={12} color={due > 0 ? theme.red : theme.faint} />
              <Body size={font.s11} weight="700" numberOfLines={2} style={{ color: due > 0 ? theme.red : theme.faint, flexShrink: 1, minWidth: 0 }}>
                {ka ? `₾${due.toFixed(2)} გადასახდელი` : `₾${due.toFixed(2)} due`}
              </Body>
            </View>
          }
        />
        {isEnabled("loyalty") ? (
          <StatTile
            tone="green" icon="star" label={ka ? "ქულები" : t("loyaltyPoints")} onPress={() => router.push("/loyalty" as any)}
            value={loyalty ? (
              <View style={[styles.row, { gap: 5 }]}>
                <Body size={font.s28} weight="700" style={{ color: "#fff" }}>{loyalty.points.toLocaleString()}</Body>
                <Body size={font.s12} weight="700" style={{ color: theme.green, marginBottom: 3 }}>{ka ? "ქულა" : "pts"}</Body>
              </View>
            ) : null}
            foot={loyalty ? (
              <View style={{ gap: 6 }}>
                <Body size={font.s11} numberOfLines={1} style={{ color: theme.greenSoft }}>{loyalty.tier.emoji} {loyalty.tier.name}</Body>
                <View style={{ height: 5, borderRadius: 3, backgroundColor: "rgba(255,255,255,0.2)", overflow: "hidden" }}>
                  <View style={{ width: `${Math.max(0, Math.min(100, loyalty.progress))}%`, height: "100%", backgroundColor: theme.green }} />
                </View>
              </View>
            ) : null}
          />
        ) : null}
        <StatTile
          tone="plain" icon="cube" watermark="cube" label={ka ? "გზაშია" : "In transit"} onPress={() => router.push("/parcels" as any)}
          bars={[{ count: stored, color: theme.greenSoft }, { count: flying, color: theme.green }]}
          value={qty ? (
            <View style={[styles.row, { gap: 6 }]}>
              <Body size={font.s28} weight="700">{inTransit}</Body>
              <Body muted size={font.s12} weight="700" numberOfLines={1} style={{ marginBottom: 3, flexShrink: 1, minWidth: 0 }}>{ka ? "ამანათი" : inTransit === 1 ? "parcel" : "parcels"}</Body>
              {inTransit ? <TransitAnimation size={14} width={30} /> : null}
            </View>
          ) : null}
          foot={<Body muted size={font.s11} numberOfLines={2}>{inTransit ? (ka ? `${stored} საწყობში · ${flying} ჰაერში` : `${stored} stored · ${flying} flying`) : ka ? "ახლა არაფერია გზაში" : "nothing moving"}</Body>}
        />
        <StatTile
          tone="plain" icon={arrived ? "home" : "time"} watermark={arrived ? "home" : "time"} label={arrived ? (ka ? "ჩამოვიდა" : "Arrived") : ka ? "მოსალოდნელი" : "Expected"} onPress={() => router.push("/parcels" as any)}
          bars={arrived ? [{ count: toPay, color: theme.orange }, { count: inCustoms, color: theme.greenSoft }, { count: ready, color: theme.green }] : [{ count: awaiting, color: theme.greenSoft }]}
          value={qty ? <Body size={font.s28} weight="700">{arrived || awaiting}</Body> : null}
          foot={
            <Body muted size={font.s11} numberOfLines={2}>
              {arrived
                ? [toPay ? (ka ? `${toPay} გადასახდელი` : `${toPay} to pay`) : null, inCustoms ? (ka ? `${inCustoms} განბაჟებაზე` : `${inCustoms} in customs`) : null, ready ? (ka ? `${ready} მზადაა` : `${ready} ready`) : null].filter(Boolean).join(" · ")
                : awaiting ? (ka ? "საწყობს ელოდება" : "awaiting the warehouse") : ka ? "დაამატე თრექინგი" : "add a tracking code"}
            </Body>
          }
        />
      </TileGrid>

      {/* Calculator row */}
      <Card style={{ marginTop: space.md, paddingVertical: space.md }} onPress={() => router.push("/calculator" as any)}>
        <View style={[styles.row, { gap: space.md }]}>
          <View style={{ width: 36, height: 36, borderRadius: radius.sm, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="calculator" size={17} color={theme.brandText} />
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Body weight="700" size={font.s13} numberOfLines={1}>{ka ? "გაიგე ფასი წინასწარ" : "Price it before you ship"}</Body>
            <Body muted size={font.s11} numberOfLines={1}>{ka ? "წონა, ქვეყანა, კურიერი" : "weight, country, courier"}</Body>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.faint} />
        </View>
      </Card>

      {isEnabled("shop") ? <DealsStrip /> : null}

      {/* Warehouse address */}
      <View style={[styles.between, { marginTop: space.xl, marginBottom: space.md, gap: space.sm }]}>
        <Body weight="700" size={font.s16} numberOfLines={1} style={{ flexShrink: 1, minWidth: 0 }}>{ka ? "ჩემი მისამართი" : "My address"}</Body>
        <Pressable onPress={() => router.push("/address" as any)} hitSlop={8}>
          <Body size={font.s12} weight="700" style={{ color: theme.brandText }}>{t("viewAll")}</Body>
        </Pressable>
      </View>
      <Card style={{ backgroundColor: theme.navy, borderColor: theme.navy }} onPress={() => router.push("/address" as any)}>
        <View style={[styles.between, { gap: space.sm }]}>
          <Body size={font.s11} weight="700" numberOfLines={1} style={{ color: theme.green, flexShrink: 1 }}>{(ka ? "საწყობის მისამართი" : "Warehouse address").toUpperCase()}</Body>
          {warehouseOptions.length ? (
            <Picker variant="pillDark" title={ka ? "აირჩიე საწყობი" : "Choose a warehouse"} hint={ka ? "ამ მისამართზე მოგდის ამანათები" : "Parcels you order arrive at this address"} options={warehouseOptions} value={warehouse?.id} onChange={setWarehouseId} />
          ) : null}
        </View>
        {warehouse ? (
          <View style={[styles.row, { gap: space.md, marginTop: space.md }]}>
            <Body size={font.s22}>{flagOf(warehouse.country)}</Body>
            <View style={{ flex: 1, minWidth: 0 }}>
              <Body size={font.s13} weight="700" style={{ color: "#fff" }}>{warehouse.street}</Body>
              <Body size={font.s13} weight="700" style={{ color: "#fff" }}>UNIT {room}</Body>
              <Body size={font.s12} style={{ color: theme.faint, marginTop: 2 }}>{warehouse.city}{warehouse.state ? `, ${warehouse.state}` : ""} {warehouse.zipCode} · {warehouse.country}</Body>
            </View>
            <Ionicons name="chevron-forward" size={18} color={theme.faint} />
          </View>
        ) : (
          <ActivityIndicator color={theme.green} style={{ alignSelf: "flex-start", marginTop: space.lg }} />
        )}
      </Card>

      {/* Rates banner */}
      <Pressable onPress={() => router.push("/rates" as any)} style={({ pressed }) => ({ marginTop: space.md, borderRadius: radius.lg, backgroundColor: theme.green, padding: space.lg, opacity: pressed ? 0.88 : 1 })}>
        <View style={[styles.between, { gap: space.md }]}>
          <View style={{ flexShrink: 1, minWidth: 0 }}>
            <View style={[styles.row, { gap: 6 }]}>
              <Body size={font.s18}>🇺🇸</Body>
              <Body size={font.s18}>🇨🇳</Body>
              <Ionicons name="airplane" size={14} color={theme.brandText} />
              <Body size={font.s18}>🇬🇪</Body>
            </View>
            <Body size={font.s22} weight="800" numberOfLines={1} style={{ color: theme.brandText, marginTop: 6 }}>{ka ? "$6/კგ-დან" : "From $6 / kg"}</Body>
            <Body size={font.s12} weight="600" numberOfLines={2} style={{ color: theme.brandText, opacity: 0.8 }}>{ka ? "დაზღვევა და გადაფუთვა ფასში" : "Insurance & repacking included"}</Body>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: theme.greenDeep, borderRadius: radius.pill, paddingHorizontal: 15, paddingVertical: 10 }}>
            <Body size={font.s12} weight="700" style={{ color: "#fff" }}>{ka ? "ტარიფები" : "View rates"}</Body>
            <Ionicons name="arrow-forward" size={13} color={theme.green} />
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 6, marginTop: space.md }}>
          {RATE_CHIPS.map((c, i) => (
            <View key={i} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, alignItems: "center", gap: 2, backgroundColor: "rgba(255,255,255,0.55)", borderRadius: radius.md, paddingVertical: 9 }}>
              <Body size={font.s13}>{c.flag}</Body>
              <Body size={font.s13} weight="800" style={{ color: theme.brandText }}>${c.price}</Body>
              <Body size={10} weight="600" style={{ color: theme.brandText, opacity: 0.7 }}>{c.days} {ka ? "დღე" : "days"}</Body>
            </View>
          ))}
        </View>
      </Pressable>
    </Screen>
  );
}

type Bar = { count: number; color: string };
type TileProps = {
  tone: "navy" | "green" | "plain"; icon: keyof typeof Ionicons.glyphMap; label: string; value: React.ReactNode; foot: React.ReactNode;
  onPress: () => void; watermark?: keyof typeof Ionicons.glyphMap; bars?: Bar[];
};

/** Fixed-height stat tile: icon chip + label, big value, footnote, optional segmented bar. */
function StatTile({ tone, icon, label, value, foot, onPress, watermark, bars }: TileProps) {
  const { theme } = useTokens();
  const bg = { navy: theme.navy, green: theme.greenDeep, plain: theme.card }[tone];
  const chip = { navy: theme.navySoft, green: "rgba(255,255,255,0.12)", plain: theme.tint }[tone];
  const iconColor = { navy: theme.green, green: theme.green, plain: theme.greenDeep }[tone];
  const labelColor = { navy: theme.faint, green: theme.greenSoft, plain: theme.faint }[tone];
  return (
    <Card onPress={onPress} style={{ height: TILE_HEIGHT, justifyContent: "space-between", padding: space.md, backgroundColor: bg, borderColor: tone === "plain" ? theme.line : bg, overflow: "hidden" }}>
      {watermark ? (
        <View style={{ position: "absolute", right: -14, top: 16, opacity: 0.5 }} pointerEvents="none">
          <Ionicons name={watermark} size={76} color={theme.lineSoft} />
        </View>
      ) : null}
      <View style={[styles.row, { gap: space.sm }]}>
        <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: chip, alignItems: "center", justifyContent: "center" }}>
          <Ionicons name={icon} size={13} color={iconColor} />
        </View>
        <Body size={font.s11} weight="700" numberOfLines={1} style={{ color: labelColor, flexShrink: 1, minWidth: 0, letterSpacing: 0.4 }}>{label.toUpperCase()}</Body>
      </View>
      <View style={{ minHeight: 34, justifyContent: "center" }}>{value ?? <ActivityIndicator color={theme.green} style={{ alignSelf: "flex-start" }} />}</View>
      <View>
        {foot}
        {bars ? <SegmentBar bars={bars} /> : null}
      </View>
    </Card>
  );
}

function SegmentBar({ bars }: { bars: Bar[] }) {
  const { theme } = useTokens();
  const live = bars.filter((b) => b.count > 0);
  const total = live.reduce((s, b) => s + b.count, 0);
  return (
    <View style={{ flexDirection: "row", gap: 3, marginTop: 9 }}>
      {total
        ? live.map((b, i) => <View key={i} style={{ flexGrow: b.count, flexBasis: 0, height: 3, borderRadius: 2, backgroundColor: b.color }} />)
        : <View style={{ flexGrow: 1, flexBasis: 0, height: 3, borderRadius: 2, backgroundColor: theme.lineSoft }} />}
    </View>
  );
}
