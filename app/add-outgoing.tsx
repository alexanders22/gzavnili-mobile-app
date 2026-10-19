// Send a parcel abroad (module 1131): destination + recipient → pickup from → weight & contents → quote → done.
import React, { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { apiError } from "@/lib/api";
import { useCreateAddress, useCreateOutgoing, useCustomerAddresses, useOutCountries, type OutCountry, type Recipient } from "@/lib/hooks";
import { formatPhone, isPhoneValid, parsePhone, type PhoneValue } from "@/lib/phone";
import { TourTarget } from "@/lib/tour";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, ToggleRow, styles, useTokens } from "@/ui";
import { DrawnBand } from "@/components/Drawing";
import { NewBadge } from "@/components/ModuleTile";
import { PhoneInput } from "@/components/PhoneInput";
import { ContactsButton } from "@/components/ContactsButton";
import { AddressSheet, type PickedAddress } from "@/components/AddressSheet";
import { RecipientsEditor, RecipientsSummary, hasUnfinished, recipientsPayload, type RecipientRow } from "@/components/Recipients";
import { ProfileGateCard, useProfileGate } from "@/components/ProfileGateCard";

const FALLBACK: OutCountry[] = [
  { code: "US", name: "USA", nameKa: "აშშ", flag: "🇺🇸", days: "5–8", perKg: 24 },
  { code: "DE", name: "Germany", nameKa: "გერმანია", flag: "🇩🇪", days: "4–6", perKg: 19 },
  { code: "GB", name: "United Kingdom", nameKa: "დიდი ბრიტანეთი", flag: "🇬🇧", days: "4–7", perKg: 21 },
  { code: "TR", name: "Türkiye", nameKa: "თურქეთი", flag: "🇹🇷", days: "2–4", perKg: 12 },
];
const DEMO_RECIPIENT: Record<string, { name: string; address: string; phone: string }> = {
  US: { name: "John Miller", address: "350 5th Ave, New York, NY 10118", phone: "+1 212 555 0100" },
  DE: { name: "Anna Schmidt", address: "Friedrichstraße 43, 10117 Berlin", phone: "+49 30 555 0100" },
  GB: { name: "Oliver Brown", address: "221B Baker Street, London NW1 6XE", phone: "+44 20 5550 0100" },
  TR: { name: "Elif Yılmaz", address: "İstiklal Cd. 120, Beyoğlu, İstanbul", phone: "+90 212 555 0100" },
};
const DEMO_PEOPLE: Record<string, { first: string; last: string }[]> = {
  US: [{ first: "Emily", last: "Miller" }, { first: "Michael", last: "Miller" }, { first: "Sarah", last: "Miller" }],
  DE: [{ first: "Lukas", last: "Schmidt" }, { first: "Mia", last: "Schmidt" }],
  GB: [{ first: "Charlotte", last: "Brown" }, { first: "Harry", last: "Brown" }],
  TR: [{ first: "Mehmet", last: "Yılmaz" }, { first: "Ayşe", last: "Yılmaz" }],
};
const STEPS = ["to", "from", "parcel", "quote"] as const;
type Step = (typeof STEPS)[number] | "done";

function Radio({ on }: { on: boolean }) {
  const { theme } = useTokens();
  return (
    <View style={{ width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: on ? theme.green : theme.line, alignItems: "center", justifyContent: "center" }}>
      {on ? <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: theme.green }} /> : null}
    </View>
  );
}
function Line({ label, value }: { label: string; value: number }) {
  return (
    <View style={[styles.between, { paddingVertical: 12 }]}>
      <Body muted size={font.s13} numberOfLines={1} style={{ flexShrink: 1, minWidth: 0 }}>{label}</Body>
      <Body weight="600" size={font.s13}>₾{value.toFixed(2)}</Body>
    </View>
  );
}
function Steps({ step }: { step: Step }) {
  const { theme } = useTokens();
  const i = STEPS.indexOf(step as any);
  return (
    <View style={{ flexDirection: "row", gap: 6, marginTop: space.lg }}>
      {STEPS.map((s, k) => <View key={s} style={{ flexGrow: 1, flexBasis: 0, height: 4, borderRadius: 2, backgroundColor: k <= i ? theme.green : theme.line }} />)}
    </View>
  );
}

export default function AddOutgoing() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { blocked } = useProfileGate();
  const { data: addresses } = useCustomerAddresses();
  const { data: meta } = useOutCountries();
  const create = useCreateOutgoing();
  const createAddress = useCreateAddress();
  const countries = meta?.countries ?? FALLBACK;
  const baseFee = meta?.base_fee ?? 9;
  const pickupFee = meta?.pickup_fee ?? 5;
  const params = useLocalSearchParams<{ country?: string; weight?: string; pickup?: string }>();

  const [step, setStep] = useState<Step>("to");
  const [addressId, setAddressId] = useState<string>();
  const [manual, setManual] = useState<PickedAddress | null>(null);
  const [sheet, setSheet] = useState(false);
  const [pickup, setPickup] = useState(params.pickup !== "0");
  const [countryCode, setCountryCode] = useState(params.country ?? "US");
  const [recipientName, setRecipientName] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [phone, setPhone] = useState<PhoneValue>({ country: params.country ?? "US", number: "" });
  const [rows, setRows] = useState<RecipientRow[]>([]);
  const [weightText, setWeightText] = useState(params.weight ?? "2");
  const [contents, setContents] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<any>(null);

  const country = countries.find((c) => c.code === countryCode) ?? countries[0];
  const nameOf = (c: OutCountry) => (ka ? c.nameKa : c.name);
  const address = addresses?.find((a) => a.id === addressId) ?? (addressId ? undefined : addresses?.[0]);
  const pickupLine = addressId === "manual" && manual ? `${manual.address}, ${manual.city}` : address ? `${address.address ?? ""}${address.city ? `, ${address.city}` : ""}` : "";
  const weight = Number(weightText.replace(",", ".") || 0);
  const freight = weight * country.perKg;
  const total = freight + baseFee + (pickup ? pickupFee : 0);
  const recipientOk = recipientName.trim().length >= 2 && recipientAddress.trim().length >= 4 && !(phone.number.length > 0 && !isPhoneValid(phone)) && !hasUnfinished(rows);
  const field = { backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 14, color: theme.ink, fontSize: font.s14 };

  const back = () => { const i = STEPS.indexOf(step as any); if (i > 0) setStep(STEPS[i - 1]); else router.back(); };
  const go = (s: Step) => () => setStep(s);
  const fillDemo = () => { const d = DEMO_RECIPIENT[country.code]; if (d) { setRecipientName(d.name); setRecipientAddress(d.address); setPhone(parsePhone(d.phone, country.code)); } };
  const submit = () => {
    setError(null);
    create.mutate(
      { country: country.code, weight, pickup, pickup_address: pickupLine || undefined, recipient_name: recipientName.trim(), recipient_address: recipientAddress.trim(), recipient_phone: phone.number ? formatPhone(phone) : undefined, contents: contents.trim() || undefined, recipients: recipientsPayload(rows) },
      { onSuccess: (r) => { setCreated(r); setStep("done"); }, onError: (e) => setError(apiError(e, ka ? "გზავნილი ვერ შეიქმნა" : "Could not create the shipment")) },
    );
  };
  const onPicked = (a: PickedAddress) => {
    if (!a.save) { setManual(a); setAddressId("manual"); setSheet(false); return; }
    createAddress.mutate({ address: a.address, city: a.city, title: a.title, lat: a.lat, lng: a.lng }, { onSuccess: (saved) => { setManual(null); setAddressId(saved.id); setSheet(false); } });
  };

  if (blocked) {
    return (
      <Screen>
        <View style={[styles.row, { gap: space.md }]}>
          <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
          <Title>{ka ? "გაგზავნა" : "Send a parcel"}</Title>
        </View>
        <ProfileGateCard />
      </Screen>
    );
  }

  if (step === "done") {
    const price = Number(created?.price ?? total);
    return (
      <Screen>
        <Card style={{ marginTop: space.xxl, alignItems: "center", paddingVertical: 36 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}><Ionicons name="paper-plane" size={30} color={theme.brandText} /></View>
          <Body weight="700" size={font.s16} style={{ marginTop: space.lg }}>{ka ? "გზავნილი შექმნილია" : "Shipment created"}</Body>
          <Body weight="600" size={font.s13} style={{ marginTop: 4 }}>{created?.tracking_number}</Body>
          <Body muted size={font.s12} style={{ marginTop: 6, textAlign: "center" }}>{pickup ? (ka ? "კურიერი ჩამოვა მითითებულ მისამართზე" : "A courier will collect it from your address") : ka ? "ჩააბარე ამანათი უახლოეს ფილიალში" : "Drop the parcel at your nearest branch"}</Body>
          <Body weight="700" size={font.s18} style={{ marginTop: space.lg }}>₾{price.toFixed(2)}</Body>
          <Body muted size={font.s11}>{ka ? "ჩამოიჭრა ბარათიდან" : "Charged to your card"}</Body>
          <RecipientsSummary people={(created?.recipients ?? []) as Recipient[]} />
          <Btn label={ka ? "ჩემი გზავნილები" : "My shipments"} onPress={() => router.replace("/(tabs)/parcels?direction=out" as any)} style={{ marginTop: space.xl, alignSelf: "stretch" }} />
        </Card>
      </Screen>
    );
  }

  return (
    <>
      <Screen>
        <View style={styles.between}>
          <View style={[styles.row, { gap: space.md, flexShrink: 1, minWidth: 0 }]}>
            <Pressable onPress={back} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
            <Title>{ka ? "გაგზავნა" : "Send a parcel"}</Title>
          </View>
          <NewBadge />
        </View>
        <Steps step={step} />
        {step === "to" ? <DrawnBand name="how" width={92} note={ka ? "საქართველოდან —\nმსოფლიოში." : "From Georgia\nto the world."} style={{ marginTop: space.lg }} /> : null}

        {step === "from" ? (
          <>
            <SectionLabel>{ka ? "საიდან" : "Pick up from"}</SectionLabel>
            <TourTarget id="outgoing.pickup">
              <Card style={{ paddingVertical: 0 }}>
                {(addresses ?? []).map((a, i) => (
                  <View key={a.id}>
                    {i > 0 ? <Divider /> : null}
                    <Pressable onPress={() => setAddressId(a.id)} style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                      <Radio on={(addressId ?? addresses?.[0]?.id) === a.id} />
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <Body weight="600" size={font.s13} numberOfLines={1}>{a.title ?? a.tag ?? "—"}</Body>
                        <Body muted size={font.s11} numberOfLines={1}>{a.address}{a.city ? `, ${a.city}` : ""}</Body>
                      </View>
                    </Pressable>
                  </View>
                ))}
                {manual ? (
                  <View>
                    {addresses?.length ? <Divider /> : null}
                    <Pressable onPress={() => setAddressId("manual")} style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                      <Radio on={addressId === "manual"} />
                      <View style={{ flex: 1, minWidth: 0 }}>
                        <View style={[styles.row, { gap: 6 }]}>
                          <Body weight="600" size={font.s13} numberOfLines={1}>{manual.title}</Body>
                          <Pill text={ka ? "ერთჯერადი" : "This time only"} tone="info" />
                        </View>
                        <Body muted size={font.s11} numberOfLines={1}>{manual.address}, {manual.city}</Body>
                      </View>
                    </Pressable>
                  </View>
                ) : null}
                {addresses?.length || manual ? null : (
                  <View style={{ paddingVertical: space.lg }}><Body muted size={font.s13}>{ka ? "შენახული მისამართი ჯერ არ გაქვს — დაამატე რუკაზე" : "No saved address yet — add one on the map"}</Body></View>
                )}
              </Card>
              <Btn label={ka ? "ახალი მისამართი რუკაზე" : "Add address on the map"} variant="outline" icon="location-outline" onPress={() => setSheet(true)} style={{ marginTop: space.md }} />
              <Card style={{ marginTop: space.md, paddingVertical: 0 }}>
                <ToggleRow icon="car-outline" title={ka ? "კურიერი ჩამოვიდეს" : "Courier pickup"} subtitle={ka ? `+${pickupFee}₾, სხვაგვარად ჩააბარე ფილიალში` : `+${pickupFee}₾, otherwise drop it at a branch`} value={pickup} onValueChange={setPickup} />
              </Card>
            </TourTarget>
            <TourTarget id="outgoing.next" onPress={pickupLine ? go("parcel") : undefined} style={{ marginTop: space.xl }}>
              <Btn label={ka ? "გაგრძელება" : "Continue"} onPress={go("parcel")} disabled={!pickupLine} />
            </TourTarget>
          </>
        ) : null}

        {step === "to" ? (
          <>
            <SectionLabel>{ka ? "ქვეყანა" : "Destination"}</SectionLabel>
            <Card style={{ paddingVertical: 0 }}>
              {countries.map((c, i) => {
                const pick = () => { setCountryCode(c.code); if (!phone.number) setPhone({ country: c.code, number: "" }); };
                return (
                  <View key={c.code}>
                    {i > 0 ? <Divider /> : null}
                    <TourTarget id={`outgoing.country.${c.code}`} onPress={pick}>
                      <Pressable onPress={pick} style={[styles.row, { gap: space.md, paddingVertical: 14 }]}>
                        <Radio on={country.code === c.code} />
                        <Body size={font.s18}>{c.flag}</Body>
                        <View style={{ flex: 1, minWidth: 0 }}>
                          <Body weight="600" size={font.s13} numberOfLines={1}>{nameOf(c)}</Body>
                          <Body muted size={font.s11}>{c.days} {ka ? "დღე" : "days"} · ₾{c.perKg}/kg</Body>
                        </View>
                      </Pressable>
                    </TourTarget>
                  </View>
                );
              })}
            </Card>
            <View style={[styles.between, { marginTop: space.xl, marginBottom: space.md, gap: space.sm }]}>
              <Body weight="700" size={font.s13}>{ka ? "მიმღები" : "Recipient"}</Body>
              <View style={[styles.row, { gap: space.md }]}>
                <TourTarget id="outgoing.demoRecipient" onPress={fillDemo}>
                  <Pressable onPress={fillDemo} hitSlop={8} style={[styles.row, { gap: 5 }]}>
                    <Ionicons name="flask-outline" size={13} color={theme.brandText} />
                    <Body size={font.s12} weight="700" style={{ color: theme.brandText }}>{ka ? "სადემო" : "Demo"}</Body>
                  </Pressable>
                </TourTarget>
                <TourTarget id="outgoing.contacts">
                  <ContactsButton country={country.code} onPick={(c) => { setRecipientName(`${c.first} ${c.last}`.trim()); setPhone(c.phone); if (c.address) setRecipientAddress(c.address); }} />
                </TourTarget>
              </View>
            </View>
            <TextInput value={recipientName} onChangeText={setRecipientName} placeholder={ka ? "სახელი და გვარი" : "Full name"} placeholderTextColor={theme.faint} style={field} />
            <TextInput value={recipientAddress} onChangeText={setRecipientAddress} placeholder={ka ? "მისამართი" : "Address"} placeholderTextColor={theme.faint} multiline style={{ ...field, marginTop: space.sm, minHeight: 70, textAlignVertical: "top" }} />
            <View style={{ marginTop: space.sm }}><PhoneInput value={phone} onChange={setPhone} /></View>
            <TourTarget id="outgoing.people" style={{ marginTop: space.xl }}>
              <RecipientsEditor rows={rows} onChange={setRows} defaultCountry={country.code} demoPeople={DEMO_PEOPLE[country.code] ?? []} max={4}
                label={ka ? "კიდევ ვინ მიიღებს" : "Who else can receive it"}
                hint={ka ? "ნებისმიერი ჩამოთვლილი შეძლებს ამანათის მიღებას ამ მისამართზე. თითოეულს პროფილი შეიქმნება." : "Anyone listed can accept the parcel at this address. Each gets a Gzavnili profile automatically."} />
            </TourTarget>
            <TourTarget id="outgoing.next" onPress={recipientOk ? go("from") : undefined} style={{ marginTop: space.xl }}>
              <Btn label={ka ? "გაგრძელება" : "Continue"} onPress={go("from")} disabled={!recipientOk} />
            </TourTarget>
          </>
        ) : null}

        {step === "parcel" ? (
          <>
            <SectionLabel>{ka ? "წონა" : "Weight"}</SectionLabel>
            <TourTarget id="outgoing.weight">
              <Card>
                <View style={[styles.row, { gap: space.sm }]}>
                  <TextInput value={weightText} onChangeText={setWeightText} keyboardType="decimal-pad" style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0, fontSize: font.s28, fontWeight: "700", color: theme.ink, padding: 0 }} />
                  <View style={{ flexShrink: 0 }}><Pill text="kg" /></View>
                </View>
              </Card>
            </TourTarget>
            <SectionLabel>{ka ? "რა არის შიგნით" : "What is inside"}</SectionLabel>
            <TextInput value={contents} onChangeText={setContents} placeholder={ka ? "მაგ. ტანსაცმელი, საჩუქრები" : "e.g. clothing, gifts"} placeholderTextColor={theme.faint} multiline style={{ ...field, minHeight: 80, textAlignVertical: "top" }} />
            <Card style={{ marginTop: space.md }}>
              <View style={[styles.row, { gap: space.sm }]}>
                <Ionicons name="information-circle-outline" size={16} color={theme.faint} />
                <Body muted size={font.s11} style={{ flex: 1, minWidth: 0 }}>{ka ? "აკრძალული ნივთების სია მოქმედებს დანიშნულების ქვეყნის მიხედვით" : "Prohibited-item rules depend on the destination country"}</Body>
              </View>
            </Card>
            <TourTarget id="outgoing.next" onPress={weight > 0 && weight <= 30 ? go("quote") : undefined} style={{ marginTop: space.xl }}>
              <Btn label={ka ? "ფასის ნახვა" : "See the price"} onPress={go("quote")} disabled={!(weight > 0 && weight <= 30)} />
            </TourTarget>
          </>
        ) : null}

        {step === "quote" ? (
          <>
            <Card style={{ marginTop: space.lg }}>
              <View style={[styles.row, { gap: space.md }]}>
                <Body size={font.s22}>🇬🇪</Body>
                <Ionicons name="arrow-forward" size={16} color={theme.faint} />
                <Body size={font.s22}>{country.flag}</Body>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body weight="700" size={font.s13} numberOfLines={1}>{recipientName}{rows.filter((r) => r.first.trim()).length ? ` +${rows.filter((r) => r.first.trim()).length}` : ""}</Body>
                  <Body muted size={font.s11} numberOfLines={1}>{nameOf(country)} · {country.days} {ka ? "დღე" : "days"}</Body>
                </View>
              </View>
            </Card>
            <SectionLabel>{ka ? "ღირებულება" : "Cost"}</SectionLabel>
            <Card style={{ paddingVertical: 0 }}>
              <Line label={`${ka ? "გადაზიდვა" : "Freight"} · ${weight} kg`} value={freight} />
              <Divider />
              <Line label={ka ? "დამუშავება" : "Handling"} value={baseFee} />
              {pickup ? <><Divider /><Line label={ka ? "კურიერი" : "Pickup"} value={pickupFee} /></> : null}
              <Divider />
              <View style={[styles.between, { paddingVertical: 15 }]}>
                <Body weight="700">{ka ? "ჯამი" : "Total"}</Body>
                <Body weight="700" size={font.s18}>₾{total.toFixed(2)}</Body>
              </View>
            </Card>
            <Card style={{ marginTop: space.md }}>
              <View style={[styles.row, { gap: space.sm }]}>
                <Ionicons name="card-outline" size={16} color={theme.mut} />
                <Body size={font.s11} style={{ flex: 1, minWidth: 0, color: theme.mut }}>{ka ? "გადახდა · Visa ·· 4821" : "Paid with Visa ·· 4821"}</Body>
              </View>
            </Card>
            {error ? (
              <View style={[styles.row, { gap: 6, marginTop: space.md }]}>
                <Ionicons name="alert-circle" size={15} color={theme.red} />
                <Body size={font.s12} style={{ color: theme.red, flex: 1, minWidth: 0 }}>{error}</Body>
              </View>
            ) : null}
            <TourTarget id="outgoing.submit" style={{ marginTop: space.xl }}>
              <Btn label={ka ? "გზავნილის შექმნა" : "Create shipment"} icon="paper-plane-outline" onPress={submit} loading={create.isPending} />
            </TourTarget>
          </>
        ) : null}
      </Screen>
      <AddressSheet visible={sheet} onClose={() => setSheet(false)} saving={createAddress.isPending} error={createAddress.isError ? apiError(createAddress.error, ka ? "მისამართი ვერ შეინახა" : "Could not save the address") : null} onPicked={onPicked} />
    </>
  );
}
