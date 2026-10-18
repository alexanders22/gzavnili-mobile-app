import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang, useT, type TKey } from "@/lib/i18n";
import { useCustomer, useOrders, useOutgoing, useStatusQuantity, type Order, type Outgoing } from "@/lib/hooks";
import { useIsDesktop } from "@/lib/layout";
import { Body, Btn, Card, Pill, Screen, Title, styles, useTokens } from "@/ui";
import { TileGrid } from "@/ui/TileGrid";
import { Drawing } from "@/components/Drawing";
import { KraftBox } from "@/components/KraftBox";
import { OUT_STAGES, ParcelProgress } from "@/components/ParcelProgress";
import { ProfileGateCard } from "@/components/ProfileGateCard";
import { TourTarget } from "@/lib/tour";

export const STATUS_GROUPS = ["AWAITING", "RECEIVED", "ON_THE_WAY_FROM_US_WAREHOUSE", "RECEIVED_IN_TBILISI_WAREHOUSE", "DELIVERED"] as const;
type StatusGroup = (typeof STATUS_GROUPS)[number];
const GROUP_LABEL: Record<StatusGroup, TKey> = {
  AWAITING: "awaiting", RECEIVED: "inWarehouse", ON_THE_WAY_FROM_US_WAREHOUSE: "onItsWay", RECEIVED_IN_TBILISI_WAREHOUSE: "arrived", DELIVERED: "received",
};

export default function Parcels() {
  const { theme } = useTokens();
  const t = useT();
  const ka = useLang() === "ka";
  const desktop = useIsDesktop();
  const params = useLocalSearchParams<{ direction?: string }>();
  const [status, setStatus] = useState<StatusGroup>("AWAITING");
  const [direction, setDirection] = useState<"in" | "out">(params.direction === "out" ? "out" : "in");
  const { data: customer } = useCustomer();
  const { data: qty } = useStatusQuantity(customer?.id);
  const { data: orders, isLoading } = useOrders(status);

  const openCalculator = () => router.push(`/calculator?direction=${direction}` as any);
  const openAdd = () => router.push((direction === "in" ? "/add-incoming" : "/add-outgoing") as any);
  const directions = [
    { id: "in" as const, label: ka ? "მიღება" : "Incoming", icon: "cube-outline" as const },
    { id: "out" as const, label: ka ? "გაგზავნა" : "Outgoing", icon: "paper-plane-outline" as const },
  ];

  return (
    <Screen scroll={false}>
      <View style={{ paddingHorizontal: space.lg, paddingTop: space.sm }}>
        <View style={styles.between}>
          <Title>{t("myParcels")}</Title>
          <View style={[styles.row, { gap: space.sm }]}>
            <TourTarget id="parcels.price" onPress={openCalculator}>
              <Pressable onPress={openCalculator} accessibilityLabel={ka ? "კალკულატორი" : "Price calculator"} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.line, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8, opacity: pressed ? 0.7 : 1 })}>
                <Ionicons name="calculator-outline" size={15} color={theme.ink} />
                <Body size={font.s12} weight="700">{ka ? "ფასი" : "Price"}</Body>
              </Pressable>
            </TourTarget>
            <TourTarget id="parcels.add" onPress={openAdd}>
              <Pressable onPress={openAdd} style={{ flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: theme.green, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 9 }}>
                <Ionicons name="add" size={15} color={theme.greenDeep} />
                <Body size={font.s12} weight="700" style={{ color: theme.greenDeep }}>{direction === "in" ? (ka ? "თრექინგი" : "Add tracking") : ka ? "გაგზავნა" : "Send parcel"}</Body>
              </Pressable>
            </TourTarget>
          </View>
        </View>

        {/* Incoming / Outgoing switch */}
        <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg }}>
          {directions.map((d) => {
            const on = direction === d.id;
            return (
              <TourTarget key={d.id} id={`parcels.dir.${d.id}`} onPress={() => setDirection(d.id)} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0 }}>
                <Pressable onPress={() => setDirection(d.id)} style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, paddingVertical: 11, borderRadius: radius.md, backgroundColor: on ? theme.navy : theme.card, borderWidth: 1, borderColor: on ? theme.navy : theme.line }}>
                  <Ionicons name={d.icon} size={15} color={on ? theme.green : theme.mut} />
                  <Body size={font.s13} weight="700" style={{ color: on ? "#fff" : theme.mut }}>{d.label}</Body>
                </Pressable>
              </TourTarget>
            );
          })}
        </View>

        {/* Shopping shortcut */}
        <Pressable onPress={() => router.push("/shop" as any)} style={{ flexDirection: "row", alignItems: "center", gap: space.md, marginTop: space.md, backgroundColor: theme.navy, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 12 }}>
          <View style={{ width: 32, height: 32, borderRadius: radius.sm, backgroundColor: theme.greenDeep, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="bag-handle" size={16} color={theme.green} />
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Body size={font.s13} weight="700" numberOfLines={1} style={{ color: "#fff" }}>{ka ? "შოპინგი" : "Go shopping"}</Body>
            <Body size={font.s11} numberOfLines={1} style={{ color: theme.faint }}>{ka ? "აირჩიე მაღაზია და პროდუქტი" : "Pick a store and a product"}</Body>
          </View>
          <Ionicons name="chevron-forward" size={17} color={theme.faint} />
        </Pressable>
      </View>

      {/* Status chips (incoming only) */}
      {direction === "in" ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, flexShrink: 0 }} contentContainerStyle={{ paddingHorizontal: space.lg, paddingVertical: space.lg, gap: space.sm, alignItems: "center" }}>
          {STATUS_GROUPS.map((g) => {
            const on = g === status;
            return (
              <TourTarget key={g} id={`parcels.status.${g}`} onPress={() => setStatus(g)}>
                <Pressable onPress={() => setStatus(g)} style={{ backgroundColor: on ? theme.navy : theme.card, borderColor: on ? theme.navy : theme.line, borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: 16, paddingVertical: 10 }}>
                  <Body size={font.s13} weight="600" style={{ color: on ? "#fff" : theme.mut }}>{t(GROUP_LABEL[g])}{qty?.[g] ? ` (${qty[g]})` : ""}</Body>
                </Pressable>
              </TourTarget>
            );
          })}
        </ScrollView>
      ) : null}

      <ScrollView contentContainerStyle={{ padding: space.lg, paddingTop: 0, paddingBottom: 140 }}>
        {direction === "out" ? (
          <OutgoingList />
        ) : isLoading ? (
          <ActivityIndicator color={theme.green} style={{ marginTop: 40 }} />
        ) : customer && !customer.profile_complete ? (
          <ProfileGateCard />
        ) : orders?.length ? (
          <TileGrid columns={desktop ? 2 : 1}>
            {orders.map((o, i) => <OrderCard key={o.id} order={o} status={status} first={i === 0} />)}
          </TileGrid>
        ) : (
          <EmptyIncoming />
        )}
      </ScrollView>
    </Screen>
  );
}

function EmptyIncoming() {
  const t = useT();
  return (
    <Card style={{ alignItems: "center", paddingVertical: 44, marginTop: space.md }}>
      <View style={{ alignItems: "center" }}>
        <Drawing name="parcels" width={130} float />
      </View>
      <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{t("noParcels")}</Body>
      <Body muted size={font.s12} style={{ marginTop: 6, textAlign: "center" }}>{t("noParcelsSub")}</Body>
    </Card>
  );
}

type Action = { key: string; label: string; icon: React.ComponentProps<typeof Ionicons>["name"]; enabled?: boolean; done?: boolean; onPress?: () => void };

/** One inbound parcel: kraft box, name + tracking, stage bar, four action pills, pay button. */
function OrderCard({ order, status, first }: { order: Order; status: string; first?: boolean }) {
  const { theme } = useTokens();
  const t = useT();
  const ka = useLang() === "ka";
  const b = order.buttons;
  const pickup = order.delivery_method === "pickup" && order.payed;
  const actions: Action[] = [
    { key: "declare", label: t("declare"), icon: "document-text-outline", enabled: b?.declaration_enable, done: order.declaration_status === "DECLERED", onPress: () => router.push(`/declare/${order.id}?status=${status}` as any) },
    { key: "track", label: t("track"), icon: "navigate-outline", enabled: order.status !== "AWAITING", done: !!order.delivery_status },
    { key: "customs", label: t("customs"), icon: "shield-checkmark-outline", enabled: b?.custom_enable, done: b?.custom_right_icon_enable === false && b?.custom_enable, onPress: () => router.push(`/customs/${order.id}?status=${status}` as any) },
    { key: "delivery", label: pickup ? (ka ? "ოფისი" : "Pickup") : t("delivery"), icon: pickup ? "business-outline" : "car-outline", enabled: b?.delivery_enable, done: !!order.timeSlot || order.pickup_status === "READY FOR OFFICE PICK UP", onPress: () => router.push(`/delivery/${order.id}?status=${status}` as any) },
  ];
  const payable = b?.payment_enable || b?.is_payment_invoice_enabled;
  const pay = () => router.push(`/pay/${order.id}?status=${status}` as any);
  return (
    <Card style={{ height: "100%" }}>
      <View style={[styles.row, { gap: space.md }]}>
        <View style={{ width: 50, alignItems: "center" }}>
          <KraftBox size={50} />
        </View>
        <View style={{ flex: 1 }}>
          <Body weight="700">{order.name ?? "—"}</Body>
          <Body muted size={font.s12} style={{ marginTop: 2 }}>{order.tracking_number ?? "—"}</Body>
        </View>
        {order.weight ? <Pill text={`${order.weight} kg`} /> : null}
        {order.points_awarded ? <Pill text={`+${order.points_awarded} pts`} tone="ok" /> : null}
      </View>
      <ParcelProgress status={order.status} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.lg }}>
        {actions.map((a) => (
          <TourTarget key={a.key} id={first && a.enabled ? `parcels.${a.key}` : undefined} onPress={a.onPress} style={{ width: "48%" }}>
            <Pressable disabled={!a.enabled || !a.onPress} onPress={a.onPress} style={{ flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: a.enabled ? theme.card : theme.lineSoft, borderWidth: 1, borderColor: a.enabled ? theme.line : "transparent", borderRadius: radius.pill, paddingVertical: 11, paddingHorizontal: 13, opacity: a.enabled ? 1 : 0.5 }}>
              <Ionicons name={a.icon} size={15} color={a.enabled ? theme.ink : theme.faint} />
              <Body size={font.s12} weight="600" numberOfLines={1} style={{ flex: 1, minWidth: 0 }}>{a.label}</Body>
              {a.done ? <Ionicons name="checkmark-circle" size={15} color={theme.ok} /> : null}
            </Pressable>
          </TourTarget>
        ))}
      </View>
      {payable ? (
        <TourTarget id={first ? "parcels.pay" : undefined} onPress={pay} style={{ marginTop: space.md }}>
          <Btn label={t("pay")} variant="danger" icon="card-outline" onPress={pay} />
        </TourTarget>
      ) : order.payed ? (
        <View style={{ marginTop: space.md, alignItems: "center" }}>
          <Pill text={t("paid")} tone="ok" />
        </View>
      ) : null}
    </Card>
  );
}

/** Outbound shipments (Tbilisi → abroad). */
function OutgoingList() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { data: customer } = useCustomer();
  const { data, isLoading } = useOutgoing();
  if (isLoading) return <ActivityIndicator color={theme.green} style={{ marginTop: 40 }} />;
  if (customer && !customer.profile_complete) return <ProfileGateCard />;
  if (!data?.length) {
    return (
      <Card style={{ alignItems: "center", paddingVertical: 40, marginTop: space.md }}>
        <Ionicons name="paper-plane-outline" size={30} color={theme.greenDeep} />
        <Body weight="700" size={font.s16} style={{ marginTop: space.md }}>{ka ? "გზავნილები არ გაქვს" : "No shipments yet"}</Body>
        <Body muted size={font.s12} style={{ marginTop: 6, textAlign: "center" }}>{ka ? "გაგზავნე ამანათი აშშ-ში, ევროპაში ან თურქეთში" : "Send a parcel to the USA, Europe or Türkiye"}</Body>
        <Btn label={ka ? "გაგზავნა" : "Send a parcel"} icon="paper-plane-outline" onPress={() => router.push("/add-outgoing" as any)} style={{ marginTop: space.lg, alignSelf: "stretch" }} />
      </Card>
    );
  }
  return (
    <>
      {data.map((s: Outgoing) => {
        const stage = OUT_STAGES[s.status] ?? { ka: s.status, en: s.status };
        const tone = s.status === "DELIVERED" ? "ok" : s.status === "CREATED" ? "warn" : "info";
        const country = s.destination_country;
        const others = (s.recipients ?? []).filter((r) => r.name_en !== s.recipient_name && r.name_ka !== s.recipient_name).length;
        return (
          <Card key={s.id} style={{ marginBottom: space.md }}>
            <View style={[styles.row, { gap: space.md }]}>
              <View style={{ width: 46, height: 46, borderRadius: radius.sm, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center" }}>
                <Body size={font.s18}>{country?.flag ?? "🌍"}</Body>
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Body weight="700" numberOfLines={1}>{s.recipient_name ?? "—"}{others ? ` +${others}` : ""}</Body>
                <Body muted size={font.s12} numberOfLines={1}>{s.tracking_number} · {s.weight} kg</Body>
              </View>
              <Pill text={ka ? stage.ka : stage.en} tone={tone} />
            </View>
            <View style={[styles.row, { gap: space.sm, marginTop: space.md }]}>
              <Body size={font.s12} weight="700">🇬🇪 TBS</Body>
              <Ionicons name="arrow-forward" size={13} color={theme.faint} />
              <Body size={font.s12} weight="700" numberOfLines={1} style={{ flex: 1, minWidth: 0 }}>{country ? (ka ? country.nameKa : country.name) : s.destination}</Body>
              <Body muted size={font.s12}>₾{Number(s.price ?? 0).toFixed(2)}</Body>
            </View>
            <ParcelProgress status={s.status} direction="out" />
          </Card>
        );
      })}
    </>
  );
}
