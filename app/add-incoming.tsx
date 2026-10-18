// New incoming parcel (module 1130): origin, tracking code (scan / demo), name, courier or branch pickup.
import React, { useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useAddOrder, useCalculatorMeta, useCustomerAddresses, useDemoTracking } from "@/lib/hooks";
import { TourTarget } from "@/lib/tour";
import { Body, Btn, Card, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { KraftBox } from "@/components/KraftBox";
import { ProfileGateCard, useProfileGate } from "@/components/ProfileGateCard";

function addError(e: any, ka: boolean) {
  const raw = e?.response?.data?.message?.message ?? e?.response?.data?.message ?? "";
  const s = typeof raw === "string" ? raw : JSON.stringify(raw);
  if (/duplicate key|already exists/i.test(s)) return ka ? "ეს თრექინგ კოდი უკვე დამატებულია" : "This tracking code has already been added";
  if (/minimum length|too short/i.test(s)) return ka ? "თრექინგ კოდი ძალიან მოკლეა" : "That tracking code is too short";
  return s && s.length < 120 ? s : ka ? "დამატება ვერ მოხერხდა" : "Could not add the parcel";
}

export default function AddIncoming() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const params = useLocalSearchParams<{ origin?: string; tracking?: string; name?: string }>();
  const { data: customer, blocked, refetch } = useProfileGate();
  const add = useAddOrder();
  const demo = useDemoTracking();
  const { data: addresses } = useCustomerAddresses();
  const { data: meta } = useCalculatorMeta();
  const deliveryFee = meta?.fees.delivery ?? 5;
  const [origin, setOrigin] = useState<"usa" | "china">(params.origin === "china" ? "china" : "usa");
  const [tracking, setTracking] = useState(params.tracking ?? "");
  const [name, setName] = useState(params.name ?? "");
  const [courier, setCourier] = useState(true);
  const [addressId, setAddressId] = useState<string>();
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState<string | null>(null);

  const clean = tracking.replace(/\s/g, "");
  const valid = clean.length >= 8;
  const address = addresses?.find((a) => a.id === addressId) ?? addresses?.find((a) => a.isDefault) ?? addresses?.[0];
  const addressLine = address ? `${address.address ?? ""}${address.city ? `, ${address.city}` : ""}` : "";

  const submit = () => {
    if (!customer?.id || add.isPending) return;
    setError(null);
    add.mutate(
      { tracking_number: tracking, name, customer_id: customer.id, country: origin, courier, delivery_address: (courier && addressLine) || undefined },
      {
        onSuccess: (o) => setDone(o?.tracking_number ?? tracking),
        onError: (e: any) => { if (e?.response?.data?.code === "PROFILE_INCOMPLETE") refetch(); else setError(addError(e, ka)); },
      },
    );
  };
  const useDemo = () => demo.mutate(origin === "china" ? "china" : undefined, { onSuccess: (d) => { setTracking(d.tracking_number); setOrigin(d.origin); if (!name.trim()) setName(d.name); setError(null); } });
  const reset = () => { setDone(null); setTracking(""); setName(""); };
  const field = { backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 14, color: theme.ink, fontSize: font.s14 };

  const header = (
    <>
      <View style={[styles.row, { gap: space.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title style={{ flex: 1 }}>{ka ? "ახალი ამანათი" : "New parcel"}</Title>
        <KraftBox size={58} cloud />
      </View>
      <Body muted style={{ marginTop: 4 }}>{ka ? "ჩაწერე თრექინგ კოდი და ადევნე თვალი ყველა ეტაპს" : "Add a tracking code and follow every step"}</Body>
    </>
  );

  if (blocked) return <Screen>{header}<ProfileGateCard /></Screen>;

  if (done) {
    return (
      <Screen>
        <TourTarget id="incoming.done">
          <Card style={{ marginTop: space.xxl, alignItems: "center", paddingVertical: 34 }}>
            <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}><Ionicons name="checkmark" size={32} color={theme.greenDeep} /></View>
            <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{ka ? "ამანათი დაემატა" : "Parcel added"}</Body>
            <Body weight="600" size={font.s13} style={{ marginTop: 4 }}>{done}</Body>
            <View style={[styles.row, { gap: 6, marginTop: space.md }]}>
              <Ionicons name={courier ? "bicycle-outline" : "business-outline"} size={15} color={theme.mut} />
              <Body muted size={font.s12} numberOfLines={1} style={{ flexShrink: 1 }}>{courier ? `${ka ? "კურიერი" : "Courier"}${addressLine ? ` · ${addressLine}` : ""}` : ka ? "გატანა ფილიალიდან" : "Pickup at a branch"}</Body>
            </View>
            <Body muted size={font.s12} style={{ marginTop: 6, textAlign: "center" }}>{ka ? "ახლა შეავსე დეკლარაცია, რომ ამანათი არ დაგვიანდეს" : "Declare it next so it is not held up"}</Body>
            <Btn label={ka ? "ამანათებზე გადასვლა" : "Go to parcels"} onPress={() => { reset(); router.push("/(tabs)/parcels" as any); }} style={{ marginTop: space.xl, alignSelf: "stretch" }} />
            <Btn label={ka ? "კიდევ დამატება" : "Add another"} variant="outline" onPress={reset} style={{ marginTop: space.sm, alignSelf: "stretch" }} />
          </Card>
        </TourTarget>
      </Screen>
    );
  }

  const origins = [
    { id: "usa" as const, label: ka ? "აშშ" : "USA", flag: "🇺🇸" },
    { id: "china" as const, label: ka ? "ჩინეთი" : "China", flag: "🇨🇳" },
  ];
  const modes = [
    { on: true, icon: "bicycle-outline" as const, title: ka ? "კურიერი კარამდე" : "Courier to my door", sub: ka ? `+₾${deliveryFee} · მოვიტანთ ჩამოსვლისა და გადახდის შემდეგ` : `+₾${deliveryFee} · brought once it lands and is paid` },
    { on: false, icon: "business-outline" as const, title: ka ? "გატანა ფილიალიდან" : "Pick up at a Tbilisi branch", sub: ka ? "უფასო · აჩვენე შენი ოთახის ნომერი" : "Free · show your room number" },
  ];

  return (
    <Screen>
      {header}
      <SectionLabel>{ka ? "საიდან" : "Origin"}</SectionLabel>
      <View style={{ flexDirection: "row", gap: space.sm }}>
        {origins.map((o) => {
          const on = origin === o.id;
          return (
            <Pressable key={o.id} onPress={() => setOrigin(o.id)} style={{ flexGrow: 1, flexBasis: 0, minWidth: 0, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, paddingVertical: 14, borderRadius: radius.md, backgroundColor: on ? theme.navy : theme.card, borderWidth: 1, borderColor: on ? theme.navy : theme.line }}>
              <Body size={font.s16}>{o.flag}</Body>
              <Body weight="700" size={font.s13} style={{ color: on ? "#fff" : theme.mut }}>{o.label}</Body>
            </Pressable>
          );
        })}
      </View>

      <SectionLabel>{ka ? "თრექინგ კოდი" : "Tracking code"}</SectionLabel>
      <View style={{ flexDirection: "row", gap: space.sm }}>
        <TextInput value={tracking} onChangeText={setTracking} placeholder="1Z999AA10123456784" placeholderTextColor={theme.faint} autoCapitalize="characters" autoCorrect={false} style={{ ...field, flex: 1, minWidth: 0 }} />
        <Pressable onPress={() => router.push("/my-code?tab=scan" as any)} accessibilityLabel={ka ? "შტრიხკოდის სკანირება" : "Scan a barcode"} style={({ pressed }) => ({ width: 50, borderRadius: radius.md, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center", opacity: pressed ? 0.7 : 1 })}>
          <Ionicons name="scan-outline" size={22} color={theme.greenDeep} />
        </Pressable>
      </View>
      <TourTarget id="incoming.demo" onPress={useDemo} style={{ alignSelf: "flex-start", marginTop: space.sm }}>
        <Pressable onPress={useDemo} disabled={demo.isPending} hitSlop={6} style={[styles.row, { gap: 6 }]}>
          {demo.isPending ? <ActivityIndicator size="small" color={theme.green} /> : <Ionicons name="sparkles" size={14} color={theme.greenDeep} />}
          <Body size={font.s12} weight="700" style={{ color: theme.greenDeep }}>{ka ? "სადემონსტრაციო თრექინგ კოდი" : "Use a demo tracking code"}</Body>
        </Pressable>
      </TourTarget>

      <SectionLabel>{ka ? "სახელი (არასავალდებულო)" : "Name (optional)"}</SectionLabel>
      <TextInput value={name} onChangeText={setName} placeholder={ka ? "მაგ. Nike-ის კროსები" : "e.g. Nike sneakers"} placeholderTextColor={theme.faint} style={field} />

      <SectionLabel>{ka ? "მიწოდება საქართველოში" : "Delivery in Georgia"}</SectionLabel>
      <TourTarget id="incoming.courier">
        <View style={{ gap: space.sm }}>
          {modes.map((m) => {
            const on = courier === m.on;
            return (
              <Pressable key={String(m.on)} onPress={() => setCourier(m.on)} style={{ flexDirection: "row", alignItems: "center", gap: space.md, padding: space.md, borderRadius: radius.md, borderWidth: 1.5, borderColor: on ? theme.greenDeep : theme.line, backgroundColor: on ? theme.tint : theme.card }}>
                <View style={{ width: 36, height: 36, borderRadius: radius.sm, backgroundColor: on ? theme.tint2 : theme.paper, alignItems: "center", justifyContent: "center" }}><Ionicons name={m.icon} size={18} color={theme.greenDeep} /></View>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body weight="700" size={font.s13}>{m.title}</Body>
                  <Body muted size={font.s11} style={{ marginTop: 1 }}>{m.sub}</Body>
                </View>
                <Ionicons name={on ? "radio-button-on" : "radio-button-off"} size={20} color={on ? theme.greenDeep : theme.faint} />
              </Pressable>
            );
          })}
        </View>
      </TourTarget>
      {courier ? (
        addresses?.length ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: space.sm }} contentContainerStyle={{ gap: space.sm }}>
            {addresses.map((a) => {
              const on = a.id === address?.id;
              return (
                <Pressable key={a.id} onPress={() => setAddressId(a.id)} style={{ maxWidth: 240, flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 8, borderRadius: radius.pill, borderWidth: 1, borderColor: on ? theme.greenDeep : theme.line, backgroundColor: on ? theme.tint2 : theme.card }}>
                  <Ionicons name="location-outline" size={14} color={on ? theme.greenDeep : theme.mut} />
                  <Body size={font.s12} weight={on ? "700" : "500"} numberOfLines={1} style={{ flexShrink: 1 }}>{a.title ?? a.address ?? "—"}</Body>
                </Pressable>
              );
            })}
          </ScrollView>
        ) : <Body muted size={font.s12} style={{ marginTop: space.sm }}>{ka ? "დაამატე მისამართი პროფილში" : "Add a delivery address in your profile"}</Body>
      ) : null}

      {error ? (
        <View style={[styles.row, { gap: 6, marginTop: space.md }]}>
          <Ionicons name="alert-circle" size={15} color={theme.red} />
          <Body size={font.s12} style={{ color: theme.red, flex: 1, minWidth: 0 }}>{error}</Body>
        </View>
      ) : null}
      <TourTarget id={valid ? "incoming.submit" : undefined} onPress={submit} style={{ marginTop: space.xl }}>
        <Btn label={ka ? "დამატება" : "Add parcel"} icon="add" onPress={submit} disabled={!valid || !customer?.id} loading={add.isPending} />
      </TourTarget>
    </Screen>
  );
}
