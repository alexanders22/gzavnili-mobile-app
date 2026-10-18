// Delivery (module 1164): courier (address, day, slot, options) or office pickup with a progress tracker.
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useBookDelivery, useCustomerAddresses, useDistrict, useOrderFromList, usePickupLocations, useSetCourier, useSetPickupLocation, useTimeSlots } from "@/lib/hooks";
import { PICKUP_STAGES, pickupStage } from "@/lib/pickup";
import { TourTarget } from "@/lib/tour";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, ToggleRow, styles, useTokens } from "@/ui";
import { Drawing } from "@/components/Drawing";
import { KraftBox } from "@/components/KraftBox";
import { PickupLocationCard, PickupLocationPicker } from "@/components/PickupLocation";

export default function Delivery() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const params = useLocalSearchParams<{ id: string; status?: string }>();
  const status = params.status || "RECEIVED_IN_TBILISI_WAREHOUSE";
  const { data: order } = useOrderFromList(status, params.id);
  const { data: addresses } = useCustomerAddresses();
  const { data: slots } = useTimeSlots();
  const book = useBookDelivery();
  const setCourier = useSetCourier();
  const { data: locations } = usePickupLocations();
  const setLocation = useSetPickupLocation();
  const [choosing, setChoosing] = useState(false);
  const address = addresses?.find((a) => a.isDefault) ?? addresses?.[0];
  const { data: district, isError: outOfArea } = useDistrict(address?.lat, address?.lang);
  const [courierOverride, setCourierOverride] = useState<boolean | null>(null);
  const [day, setDay] = useState<"today" | "tomorrow">("tomorrow");
  const [slot, setSlot] = useState<string | null>(null);
  const [leaveAtDoor, setLeaveAtDoor] = useState(false);
  const [noBell, setNoBell] = useState(false);
  const [booked, setBooked] = useState(false);
  const courier = courierOverride ?? order?.courier_delivery !== false;
  const daySlots = day === "today" ? slots?.today ?? [] : slots?.tomorrow ?? [];
  const hasSlot = !!order?.timeSlot;
  const addressLine = address ? `${address.address ?? ""}${address.city ? `, ${address.city}` : ""}` : undefined;
  const paidPickup = !!order?.payed && order?.delivery_method === "pickup";
  const paidCourier = !!order?.payed && !!order?.delivery_paid && order?.delivery_method !== "pickup";
  const defaultLocation = order?.pickup_location?.id ?? locations?.find((l) => l.is_default)?.id ?? locations?.[0]?.id;

  const switchMode = (on: boolean) => {
    setCourierOverride(on);
    if (order) setCourier.mutate({ orderId: order.id, courier: on, delivery_address: on ? addressLine : undefined, pickup_location_id: on ? undefined : defaultLocation });
  };
  const submit = () => { if (order && slot) book.mutate({ orderId: order.id, timeSlot: slot, day, do_not_ring_bell: noBell, leave_by_door: leaveAtDoor }, { onSuccess: () => setBooked(true) }); };

  const header = (
    <View style={[styles.row, { gap: space.md }]}>
      <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
      <Title>{paidPickup ? (ka ? "ოფისიდან გატანა" : "Office pickup") : ka ? "მიწოდება" : "Delivery"}</Title>
    </View>
  );

  if (paidPickup && order) {
    const stage = pickupStage(order);
    const loc = order.pickup_location;
    const ready = stage >= PICKUP_STAGES.length - 1;
    return (
      <Screen>
        {header}
        <Card style={{ marginTop: space.lg, alignItems: "center", paddingVertical: 24 }}>
          {ready ? <KraftBox size={104} cloud /> : <Drawing name="how" width={96} float />}
          <Body weight="700" size={font.s16} style={{ marginTop: space.lg, textAlign: "center" }}>
            {stage >= PICKUP_STAGES.length ? (ka ? "ამანათი გატანილია" : "Picked up") : ready ? (ka ? "ამანათი გელოდება!" : "Your parcel is ready!") : ka ? "ვამზადებთ გასატანად" : "Getting it ready for pickup"}
          </Body>
          <Body muted size={font.s12} style={{ marginTop: 6, textAlign: "center" }}>{ready ? (ka ? "მოდი სამუშაო საათებში და აჩვენე ოთახის შტრიხკოდი" : "Come during opening hours and show your room barcode") : ka ? "შეგატყობინებთ, როცა ოფისში მზად იქნება" : "We'll let you know when it's ready at the office"}</Body>
        </Card>
        <Card style={{ marginTop: space.md }}>
          {PICKUP_STAGES.map((s, i) => {
            const done = i < stage || (ready && i === stage);
            const current = i === stage && !done;
            return (
              <View key={s.en} style={[styles.row, { gap: space.md, paddingVertical: 7 }]}>
                <View style={{ width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center", backgroundColor: done ? theme.green : current ? theme.tint2 : theme.paper, borderWidth: current ? 2 : 0, borderColor: theme.green }}>
                  {done ? <Ionicons name="checkmark" size={13} color={theme.greenDeep} /> : null}
                </View>
                <Body size={font.s13} weight={current ? "700" : "500"} style={{ color: done || current ? theme.ink : theme.faint }}>{ka ? s.ka : s.en}</Body>
              </View>
            );
          })}
        </Card>
        <SectionLabel>{ka ? "სად გაიტან" : "Where to collect"}</SectionLabel>
        {loc ? <PickupLocationCard location={loc} ka={ka} /> : null}
        {stage < PICKUP_STAGES.length - 1 ? (
          choosing ? (
            <View style={{ marginTop: space.md }}>
              <PickupLocationPicker locations={locations ?? []} selectedId={loc?.id} ka={ka} onSelect={(id) => setLocation.mutate({ orderId: order.id, pickup_location_id: id }, { onSuccess: () => setChoosing(false) })} />
            </View>
          ) : (
            <Pressable onPress={() => setChoosing(true)} style={{ alignSelf: "center", marginTop: space.md }}>
              <Body size={font.s13} weight="600" style={{ color: theme.greenDeep }}>{ka ? "სხვა ოფისის არჩევა" : "Choose another office"}</Body>
            </Pressable>
          )
        ) : null}
        <Btn label={ka ? "ჩემი ოთახის შტრიხკოდი" : "Show my room barcode"} icon="barcode-outline" onPress={() => router.push("/my-code" as any)} style={{ marginTop: space.xl }} />
        <Body muted size={font.s11} style={{ marginTop: space.md, textAlign: "center" }}>{ka ? "გადახდილია ოფისიდან გატანით (0 ₾). კურიერზე გადასართავად მიწოდების საფასური უნდა გადაიხადო." : "Paid for office pickup (0 ₾). Switching to a courier needs the delivery fee paid first."}</Body>
      </Screen>
    );
  }

  if (courier && (booked || hasSlot)) {
    return (
      <Screen>
        {header}
        <Card style={{ marginTop: space.lg, alignItems: "center", paddingVertical: 32 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}><Ionicons name="car" size={28} color={theme.greenDeep} /></View>
          <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{ka ? "მიწოდება დაჯავშნილია" : "Delivery booked"}</Body>
          <Body muted size={font.s13} style={{ marginTop: 6 }}>{order?.timeSlot ?? slot} · {day === "today" ? (ka ? "დღეს" : "today") : ka ? "ხვალ" : "tomorrow"}</Body>
          <Body muted size={font.s12} style={{ marginTop: 10, textAlign: "center" }}>{address?.address}{address?.city ? `, ${address.city}` : ""}</Body>
        </Card>
      </Screen>
    );
  }

  const modes = [
    { on: true, icon: "bicycle-outline" as const, label: ka ? "კურიერი" : "Courier", sub: ka ? "კარამდე" : "to your door" },
    { on: false, icon: "business-outline" as const, label: ka ? "ოფისი" : "Office", sub: ka ? "უფასოდ" : "free pickup" },
  ];

  return (
    <Screen>
      {header}
      <SectionLabel>{ka ? "როგორ მიიღებ" : "How you get it"}</SectionLabel>
      {paidCourier ? (
        <Card style={{ flexDirection: "row", gap: space.md, alignItems: "center" }}>
          <Ionicons name="lock-closed-outline" size={18} color={theme.mut} />
          <Body muted size={font.s12} style={{ flex: 1 }}>{ka ? "კურიერის საფასური გადახდილია. ოფისიდან გატანაზე გადასართავად დაუკავშირდი მხარდაჭერას." : "The courier fee is paid. To switch to office pickup, contact support for a refund."}</Body>
        </Card>
      ) : null}
      <TourTarget id="delivery.mode" style={paidCourier ? { display: "none" } : undefined}>
        <View style={{ flexDirection: "row", gap: space.sm }}>
          {modes.map((m) => {
            const on = courier === m.on;
            return (
              <Pressable key={String(m.on)} onPress={() => switchMode(m.on)} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, flexDirection: "row", alignItems: "center", gap: space.sm, padding: space.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: on ? theme.greenDeep : theme.line, backgroundColor: on ? theme.tint : theme.card }}>
                <Ionicons name={m.icon} size={20} color={theme.greenDeep} />
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body weight="700" size={font.s13} numberOfLines={1}>{m.label}</Body>
                  <Body muted size={font.s11} numberOfLines={1}>{m.sub}</Body>
                </View>
              </Pressable>
            );
          })}
        </View>
      </TourTarget>

      {courier ? (
        <>
          <SectionLabel>{ka ? "მისამართი" : "Address"}</SectionLabel>
          <Card>
            <View style={[styles.row, { gap: space.md }]}>
              <View style={{ width: 38, height: 38, borderRadius: radius.sm, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}><Ionicons name="location-outline" size={18} color={theme.greenDeep} /></View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <Body weight="600" numberOfLines={1}>{address?.title ?? "—"}</Body>
                <Body muted size={font.s12} numberOfLines={1}>{address?.address}{address?.city ? `, ${address.city}` : ""}</Body>
              </View>
              {district && !outOfArea ? <Pill text={ka ? "იფარება" : "Covered"} tone="ok" /> : outOfArea ? <Pill text={ka ? "ზონის გარეთ" : "Out of area"} tone="warn" /> : null}
            </View>
          </Card>
          <SectionLabel>{ka ? "როდის" : "When"}</SectionLabel>
          <TourTarget id="delivery.day">
            <View style={{ flexDirection: "row", gap: space.sm }}>
              {(["today", "tomorrow"] as const).map((d) => {
                const on = day === d;
                const n = d === "today" ? slots?.today?.length ?? 0 : slots?.tomorrow?.length ?? 0;
                return (
                  <Pressable key={d} onPress={() => { setDay(d); setSlot(null); }} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, alignItems: "center", paddingVertical: 13, borderRadius: radius.md, backgroundColor: on ? theme.navy : theme.card, borderWidth: 1, borderColor: on ? theme.navy : theme.line, opacity: n ? 1 : 0.5 }}>
                    <Body weight="700" size={font.s13} style={{ color: on ? "#fff" : theme.mut }}>{d === "today" ? (ka ? "დღეს" : "Today") : ka ? "ხვალ" : "Tomorrow"}</Body>
                    <Body size={font.s11} style={{ color: theme.faint, marginTop: 2 }}>{n} {ka ? "სლოტი" : "slots"}</Body>
                  </Pressable>
                );
              })}
            </View>
          </TourTarget>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.md }}>
            {daySlots.length ? daySlots.map((s, i) => {
              const on = slot === s;
              return (
                <TourTarget key={s} id={i === 0 ? "delivery.slot" : undefined} onPress={() => setSlot(s)}>
                  <Pressable onPress={() => setSlot(s)} style={{ paddingHorizontal: 16, paddingVertical: 12, borderRadius: radius.pill, backgroundColor: on ? theme.green : theme.card, borderWidth: 1, borderColor: on ? theme.green : theme.line }}>
                    <Body size={font.s13} weight="600" style={{ color: on ? theme.greenDeep : theme.ink }}>{s}</Body>
                  </Pressable>
                </TourTarget>
              );
            }) : <Card style={{ width: "100%" }}><Body muted size={font.s13}>{ka ? "ამ დღეს თავისუფალი დრო აღარაა" : "No free slots on this day"}</Body></Card>}
          </View>
          <SectionLabel>{ka ? "მიწოდების პარამეტრები" : "Delivery options"}</SectionLabel>
          <Card style={{ paddingVertical: 0 }}>
            <ToggleRow icon="home-outline" title={ka ? "დატოვე კარებთან" : "Leave at the door"} value={leaveAtDoor} onValueChange={setLeaveAtDoor} />
            <Divider />
            <ToggleRow icon="notifications-off-outline" title={ka ? "ზარი არ დარეკო" : "Don't ring the bell"} value={noBell} onValueChange={setNoBell} />
          </Card>
          <TourTarget id="delivery.submit" style={{ marginTop: space.xl }}>
            <Btn label={ka ? "დაჯავშნა" : "Book delivery"} icon="car-outline" disabled={!slot} loading={book.isPending} onPress={submit} />
          </TourTarget>
        </>
      ) : (
        <>
          <SectionLabel>{ka ? "აირჩიე ოფისი" : "Pickup office"}</SectionLabel>
          <PickupLocationPicker locations={locations ?? []} selectedId={order?.pickup_location?.id ?? defaultLocation} ka={ka} onSelect={(id) => order && setCourier.mutate({ orderId: order.id, courier: false, pickup_location_id: id })} />
          <Body muted size={font.s12} style={{ marginTop: space.md }}>{ka ? "ამანათი ოფისში გელის. აჩვენე ოთახის შტრიხკოდი — ID-ის ჩვენება არ საჭიროა." : "Your parcel waits at the office. Show your room barcode — no ID needed."}</Body>
          <Btn label={ka ? "ჩემი ოთახის ნომერი" : "Show my room number"} icon="barcode-outline" onPress={() => router.push("/my-code" as any)} style={{ marginTop: space.xl }} />
        </>
      )}
    </Screen>
  );
}
