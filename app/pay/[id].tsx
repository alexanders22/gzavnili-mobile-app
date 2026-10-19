// Payment (module 1171): courier/office, address or office, parcels in the payment, card, cost breakdown, pay.
import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useCards, useCustomer, useCustomerAddresses, useOrderFromList, useOrderPrices, usePayOrders, usePaymentStatus, usePickupLocations, useUnpaidOrders } from "@/lib/hooks";
import { locationName } from "@/lib/pickup";
import { TourTarget } from "@/lib/tour";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { TwoCol } from "@/ui/TileGrid";
import { PickupLocationPicker } from "@/components/PickupLocation";

function Radio({ on }: { on: boolean }) {
  const { theme } = useTokens();
  return (
    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: on ? theme.green : theme.line, alignItems: "center", justifyContent: "center" }}>
      {on ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.green }} /> : null}
    </View>
  );
}
function Check({ on }: { on: boolean }) {
  const { theme } = useTokens();
  return (
    <View style={{ width: 20, height: 20, borderRadius: 6, borderWidth: 2, borderColor: on ? theme.green : theme.line, backgroundColor: on ? theme.green : "transparent", alignItems: "center", justifyContent: "center" }}>
      {on ? <Ionicons name="checkmark" size={13} color={theme.greenDeep} /> : null}
    </View>
  );
}
function Line({ label, value }: { label: string; value?: number | string | null }) {
  return (
    <View style={[styles.between, { paddingVertical: 12 }]}>
      <Body muted size={font.s13}>{label}</Body>
      <Body weight="600" size={font.s13}>₾{Number(value ?? 0).toFixed(2)}</Body>
    </View>
  );
}

export default function Pay() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const params = useLocalSearchParams<{ id: string; status?: string }>();
  const status = params.status || "RECEIVED_IN_TBILISI_WAREHOUSE";
  const { data: customer } = useCustomer();
  const { data: order } = useOrderFromList(status, params.id);
  const { data: unpaid } = useUnpaidOrders(customer?.id);
  const { data: addresses } = useCustomerAddresses();
  const { data: cards } = useCards();
  const { data: locations } = usePickupLocations();
  const [addressId, setAddressId] = useState<string>();
  const [cardId, setCardId] = useState<string>();
  const [selected, setSelected] = useState<string[]>([]);
  const [phase, setPhase] = useState<"form" | "processing" | "done" | "failed">("form");
  const [modeOverride, setModeOverride] = useState<"courier" | "pickup" | null>(null);
  const [locationId, setLocationId] = useState<string>();
  const pay = usePayOrders();
  const poll = usePaymentStatus();

  useEffect(() => { if (params.id && selected.length === 0) setSelected([params.id]); }, [params.id, selected.length]);
  useEffect(() => { if (!addressId && addresses?.length) setAddressId((addresses.find((a) => a.isDefault) ?? addresses[0]).id); }, [addresses, addressId]);
  useEffect(() => { if (!cardId && cards?.length) setCardId((cards.find((c) => c.isDefault) ?? cards[0]).id); }, [cards, cardId]);
  const orderLocation = order?.pickup_location?.id;
  useEffect(() => { if (!locationId && locations?.length) setLocationId(orderLocation ?? (locations.find((l) => l.is_default) ?? locations[0]).id); }, [locations, orderLocation, locationId]);

  const mode = modeOverride ?? (order?.courier_delivery === false ? "pickup" : "courier");
  const pickup = mode === "pickup";
  const location = locations?.find((l) => l.id === locationId);
  const { data: prices, isFetching } = useOrderPrices(selected, pickup ? undefined : addressId, pickup);
  const total = prices?.totals?.totalPrice;
  const candidates = (unpaid ?? []).filter((o) => o.id === params.id || o.buttons?.payment_enable);
  const placeOk = pickup ? !!locationId : !!addressId;
  const toggle = (id: string) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const submit = () => {
    if (!customer?.id || !placeOk || !cardId || !selected.length) return;
    setPhase("processing");
    pay.mutate(
      { card: cardId, customer_id: customer.id, order_ids: selected, ...(pickup ? { pickup_location_id: locationId } : { address_id: addressId }) },
      {
        onSuccess: () => poll.mutate({ orderId: selected[0], address_id: pickup ? undefined : addressId }, { onSuccess: (s) => setPhase(s === "COMPLETED" ? "done" : "failed"), onError: () => setPhase("failed") }),
        onError: () => setPhase("failed"),
      },
    );
  };

  if (phase === "processing") {
    return (
      <Screen>
        <Card style={{ marginTop: space.xxl, alignItems: "center", paddingVertical: 40 }}>
          <Ionicons name="card-outline" size={40} color={theme.green} />
          <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{ka ? "გადახდა მუშავდება" : "Processing payment"}</Body>
          <Body muted size={font.s12} style={{ marginTop: 6, textAlign: "center" }}>{ka ? "დაელოდე, არ დახურო ეკრანი" : "Hold on, don't close this screen"}</Body>
        </Card>
      </Screen>
    );
  }
  if (phase === "done" || phase === "failed") {
    const ok = phase === "done";
    return (
      <Screen>
        <Card style={{ marginTop: space.xxl, alignItems: "center", paddingVertical: 36 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: ok ? theme.tint2 : "#FDECEC", alignItems: "center", justifyContent: "center" }}><Ionicons name={ok ? "checkmark" : "close"} size={32} color={ok ? theme.greenDeep : theme.red} /></View>
          <Body weight="700" size={font.s18} style={{ marginTop: space.lg }}>{ok ? `₾${Number(total ?? 0).toFixed(2)}` : ka ? "გადახდა ვერ შესრულდა" : "Payment failed"}</Body>
          <Body muted size={font.s12} style={{ marginTop: 4, textAlign: "center" }}>
            {ok
              ? pickup
                ? ka ? `შეგატყობინებთ, როცა ამანათი მზად იქნება — ${location ? locationName(location, true) : "ოფისში"}` : `We'll let you know when it's ready at ${location ? locationName(location, false) : "the office"}`
                : ka ? "ახლა აირჩიე მიწოდების დრო" : "Now choose a delivery time"
              : ka ? "სცადე თავიდან ან შეცვალე ბარათი" : "Try again or use another card"}
          </Body>
          <Btn label={ok ? (ka ? "ამანათებზე" : "Back to parcels") : ka ? "თავიდან" : "Try again"} onPress={() => (ok ? router.back() : setPhase("form"))} style={{ marginTop: space.xl, alignSelf: "stretch" }} />
        </Card>
      </Screen>
    );
  }

  const modes = [
    { key: "courier" as const, icon: "bicycle-outline" as const, label: ka ? "კურიერი" : "Courier", sub: ka ? "კარამდე" : "to your door" },
    { key: "pickup" as const, icon: "business-outline" as const, label: ka ? "ოფისიდან" : "Office pickup", sub: ka ? "უფასოდ" : "free" },
  ];

  const main = (
    <>
      <SectionLabel>{ka ? "როგორ მიიღებ" : "How you get it"}</SectionLabel>
      <View style={{ flexDirection: "row", gap: space.sm }}>
        {modes.map((m) => {
          const on = mode === m.key;
          return (
            <Pressable key={m.key} onPress={() => setModeOverride(m.key)} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, flexDirection: "row", alignItems: "center", gap: space.sm, padding: space.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: on ? theme.greenDeep : theme.line, backgroundColor: on ? theme.tint : theme.card }}>
              <Ionicons name={m.icon} size={20} color={theme.brandText} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Body weight="700" size={font.s13} numberOfLines={1}>{m.label}</Body>
                <Body muted size={font.s11} numberOfLines={1}>{m.sub}</Body>
              </View>
            </Pressable>
          );
        })}
      </View>
      {pickup ? (
        <>
          <SectionLabel>{ka ? "აირჩიე ოფისი" : "Pickup office"}</SectionLabel>
          <TourTarget id="pay.address"><PickupLocationPicker locations={locations ?? []} selectedId={locationId} onSelect={setLocationId} ka={ka} /></TourTarget>
          <Body muted size={font.s12} style={{ marginTop: space.sm }}>{ka ? "გატანისას აჩვენე ოთახის შტრიხკოდი. მოგვიანებით კურიერზე გადასართავად მიწოდების საფასურის გადახდა დაგჭირდება." : "Show your room barcode at the counter. Switching to a courier later means paying the delivery fee."}</Body>
        </>
      ) : (
        <>
          <SectionLabel>{ka ? "მიწოდების მისამართი" : "Delivery address"}</SectionLabel>
          <TourTarget id="pay.address">
            <Card style={{ paddingVertical: 0 }}>
              {(addresses ?? []).map((a, i) => (
                <View key={a.id}>
                  {i > 0 ? <Divider /> : null}
                  <Pressable onPress={() => setAddressId(a.id)} style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                    <Radio on={addressId === a.id} />
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Body weight="600" size={font.s13} numberOfLines={1}>{a.title ?? a.tag ?? "—"}</Body>
                      <Body muted size={font.s11} numberOfLines={1}>{a.address}{a.city ? `, ${a.city}` : ""}</Body>
                    </View>
                    {a.isDefault ? <Pill text={ka ? "ძირითადი" : "Default"} tone="ok" /> : null}
                  </Pressable>
                </View>
              ))}
            </Card>
          </TourTarget>
        </>
      )}
      {candidates.length > 1 ? (
        <>
          <SectionLabel>{ka ? "რას იხდი" : "Parcels in this payment"}</SectionLabel>
          <Card style={{ paddingVertical: 0 }}>
            {candidates.map((o, i) => (
              <View key={o.id}>
                {i > 0 ? <Divider /> : null}
                <Pressable onPress={() => toggle(o.id)} style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                  <Check on={selected.includes(o.id)} />
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Body weight="600" size={font.s13} numberOfLines={1}>{o.name ?? "—"}</Body>
                    <Body muted size={font.s11} numberOfLines={1}>{o.tracking_number}</Body>
                  </View>
                </Pressable>
              </View>
            ))}
          </Card>
        </>
      ) : null}
      <SectionLabel>{ka ? "ბარათი" : "Card"}</SectionLabel>
      <TourTarget id="pay.card">
        {cards?.length ? (
          <Card style={{ paddingVertical: 0 }}>
            {cards.map((c, i) => (
              <View key={c.id}>
                {i > 0 ? <Divider /> : null}
                <Pressable onPress={() => setCardId(c.id)} style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                  <Radio on={cardId === c.id} />
                  <View style={{ width: 38, height: 26, borderRadius: 5, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center" }}><Ionicons name="card" size={14} color={theme.mut} /></View>
                  <Body weight="600" size={font.s13} style={{ flex: 1, minWidth: 0 }}>{c.cardType === "visa" ? "Visa" : "Mastercard"} ·· {c.maskedPan}</Body>
                  {c.isDefault ? <Pill text={ka ? "ძირითადი" : "Default"} tone="ok" /> : null}
                </Pressable>
              </View>
            ))}
          </Card>
        ) : <Card><Body muted size={font.s13}>{ka ? "შენახული ბარათი არ გაქვს" : "No saved card yet"}</Body></Card>}
      </TourTarget>
    </>
  );

  const side = (
    <>
      <SectionLabel>{ka ? "ღირებულება" : "Cost breakdown"}</SectionLabel>
      <TourTarget id="pay.total">
        <Card style={{ paddingVertical: 0 }}>
          {prices?.totals ? (
            <>
              <Line label={ka ? "გადაზიდვა" : "Air freight"} value={prices.totals.totalWeightCost} />
              <Divider />
              <Line label={pickup ? (ka ? "გატანა ოფისიდან" : "Office pickup") : ka ? "მიწოდება" : "Delivery"} value={prices.totals.delivery_fee} />
              <Divider />
              <Line label={ka ? "განბაჟება" : "Customs fee"} value={prices.totals.customFee} />
              <Divider />
              <Line label={ka ? "მომსახურება" : "Service fee"} value={prices.totals.service_fee} />
              <Divider />
              <View style={[styles.between, { paddingVertical: 15 }]}>
                <Body weight="700">{ka ? "ჯამი" : "Total"}</Body>
                <Body weight="700" size={font.s18}>₾{Number(total ?? 0).toFixed(2)}</Body>
              </View>
            </>
          ) : (
            <View style={{ paddingVertical: 18 }}>
              <Body muted size={font.s13}>{isFetching ? (ka ? "ითვლება…" : "Calculating…") : pickup ? (ka ? "აირჩიე ოფისი" : "Choose an office first") : ka ? "აირჩიე მისამართი" : "Choose an address first"}</Body>
            </View>
          )}
        </Card>
      </TourTarget>
      <TourTarget id="pay.submit" style={{ marginTop: space.xl }}>
        <Btn label={`${ka ? "გადახდა" : "Pay"} ₾${Number(total ?? 0).toFixed(2)}`} icon="card-outline" disabled={!(total && cardId && placeOk && selected.length)} onPress={submit} />
      </TourTarget>
    </>
  );

  return (
    <Screen>
      <View style={[styles.row, { gap: space.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "გადახდა" : "Payment"}</Title>
      </View>
      <TwoCol main={main} side={side} />
    </Screen>
  );
}
