// Profile — bilingual (EN / ქარ) name, address, city and phone. Typing in one language lets the
// AI translator fill the other; ✨ marks fields that were filled for you. Also used as the
// onboarding step ("?onboarding=1") right after sign-up.
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Pressable, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { apiError } from "@/lib/api";
import { Profile, useCustomer, useTranslateFields, useUpdateProfile } from "@/lib/hooks";
import { Body, Btn, Card, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";

type Lang = "en" | "ka";
type FieldKey = "first_name" | "last_name" | "address" | "city";
type Form = Record<string, string>;

const FIELDS: { key: FieldKey; ka: string; en: string; required: boolean; placeholder: Record<Lang, string> }[] = [
  { key: "first_name", ka: "სახელი", en: "First name", required: true, placeholder: { en: "Vasil", ka: "ვასილ" } },
  { key: "last_name", ka: "გვარი", en: "Last name", required: true, placeholder: { en: "Beridze", ka: "ბერიძე" } },
  { key: "address", ka: "მისამართი", en: "Address", required: true, placeholder: { en: "12 Rustaveli Ave, apt. 5", ka: "რუსთაველის პრ. 12, ბინა 5" } },
  { key: "city", ka: "ქალაქი", en: "City", required: false, placeholder: { en: "Tbilisi", ka: "თბილისი" } },
];
const REQUIRED = ["first_name_en", "last_name_en", "first_name_ka", "last_name_ka", "address_en", "address_ka", "phone"];
const EMPTY: Form = { first_name_en: "", last_name_en: "", first_name_ka: "", last_name_ka: "", address_en: "", address_ka: "", city_en: "", city_ka: "", phone: "" };
const other = (l: Lang): Lang => (l === "en" ? "ka" : "en");
const fid = (key: string, l: Lang) => `${key}_${l}`;

export default function ProfileScreen() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { onboarding } = useLocalSearchParams<{ onboarding?: string }>();
  const isOnboarding = onboarding === "1";
  const { data: customer } = useCustomer();
  const update = useUpdateProfile();
  const translate = useTranslateFields();

  const [form, setForm] = useState<Form>(EMPTY);
  const [aiFilled, setAiFilled] = useState<Record<string, boolean>>({});
  const [busy, setBusy] = useState<Record<string, boolean>>({});
  const [source, setSource] = useState<"ai" | "offline" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const seeded = useRef(false);
  const formRef = useRef(form);
  const aiRef = useRef(aiFilled);
  formRef.current = form;
  aiRef.current = aiFilled;

  useEffect(() => {
    if (!customer || seeded.current) return;
    seeded.current = true;
    const next = { ...EMPTY, ...(customer.profile as Form), phone: customer.profile?.phone || customer.phone || "+995 " };
    formRef.current = next;
    setForm(next);
  }, [customer]);

  const change = (key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setAiFilled((a) => ({ ...a, [key]: false }));
    setSaved(false);
  };

  // Translate the given fields into the other language when that side is empty (or was AI-filled before).
  const fill = async (jobs: { key: FieldKey; from: Lang }[]) => {
    const f = formRef.current;
    const items: Record<string, string> = {};
    const targets: Record<string, string> = {};
    for (const { key, from } of jobs) {
      const src = f[fid(key, from)]?.trim();
      const dst = fid(key, other(from));
      if (!src) continue;
      if (f[dst]?.trim() && !aiRef.current[dst]) continue;
      items[key] = src;
      targets[key] = dst;
    }
    const keys = Object.keys(items);
    if (!keys.length) return;
    const mark = (v: boolean) => Object.fromEntries(Object.values(targets).map((t) => [t, v]));
    setBusy((b) => ({ ...b, ...mark(true) }));
    try {
      const { result, source: src } = await translate.mutateAsync(items);
      if (src !== "none") setSource(src);
      const next = { ...formRef.current };
      const filled: Record<string, boolean> = {};
      for (const k of keys) {
        const dst = targets[k];
        const v = result[k]?.[dst.endsWith("_ka") ? "ka" : "en"];
        if (v) { next[dst] = v; filled[dst] = true; }
      }
      formRef.current = next;
      aiRef.current = { ...aiRef.current, ...filled };
      setForm(next);
      setAiFilled(aiRef.current);
    } catch {
      // translation is best-effort
    } finally {
      setBusy((b) => ({ ...b, ...mark(false) }));
    }
  };

  const pendingJobs = () =>
    FIELDS.flatMap((fld) => {
      const f = formRef.current;
      const en = f[fid(fld.key, "en")]?.trim();
      const kaV = f[fid(fld.key, "ka")]?.trim();
      return en && !kaV ? [{ key: fld.key, from: "en" as Lang }] : kaV && !en ? [{ key: fld.key, from: "ka" as Lang }] : [];
    });

  const initials = ((form.first_name_en?.[0] ?? "") + (form.last_name_en?.[0] ?? "")).toUpperCase() || "🙂";
  const translating = Object.values(busy).some(Boolean);

  const save = async () => {
    setError(null);
    await fill(pendingJobs());
    const f = formRef.current;
    if (REQUIRED.some((k) => !f[k]?.trim()) || f.phone.replace(/\D/g, "").length < 9) {
      setError(ka ? "შეავსე ყველა სავალდებულო ველი (*)" : "Fill in all required fields (*)");
      return;
    }
    update.mutate(f as Profile, {
      onSuccess: () => { setSaved(true); if (isOnboarding) router.replace("/(tabs)" as any); },
      onError: (e) => setError(apiError(e, ka ? "შენახვა ვერ მოხერხდა" : "Could not save")),
    });
  };

  return (
    <Screen>
      <View style={[styles.row, { gap: space.md, marginBottom: space.lg }]}>
        {isOnboarding ? null : (
          <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        )}
        <Title>{isOnboarding ? (ka ? "შენი მონაცემები" : "About you") : ka ? "პროფილი" : "Profile"}</Title>
      </View>

      {isOnboarding ? null : (
        <Card style={{ alignItems: "center", paddingVertical: 22 }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, backgroundColor: theme.green, alignItems: "center", justifyContent: "center" }}>
            <Body weight="700" size={font.s22} style={{ color: theme.greenDeep }}>{initials}</Body>
          </View>
          <Body weight="700" size={font.s16} style={{ marginTop: space.md }}>
            {ka ? `${form.first_name_ka} ${form.last_name_ka}` : `${form.first_name_en} ${form.last_name_en}`}
          </Body>
          <Body muted size={font.s12}>{customer?.email}</Body>
          <View style={{ marginTop: space.sm }}>
            <Pill text={`${ka ? "ოთახი" : "Room"} ${customer?.room_number ?? "—"}`} tone="ok" />
          </View>
        </Card>
      )}

      <Card style={{ marginTop: isOnboarding ? 0 : space.md, backgroundColor: theme.navy, borderColor: theme.navy }}>
        <View style={[styles.row, { gap: space.md, alignItems: "flex-start" }]}>
          <View style={{ width: 34, height: 34, borderRadius: 17, backgroundColor: theme.green, alignItems: "center", justifyContent: "center" }}>
            <Ionicons name="sparkles" size={16} color={theme.greenDeep} />
          </View>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Body weight="700" size={font.s13} style={{ color: "#fff" }}>
              {ka ? "ერთ ენაზე შეავსე — მეორეს AI დაწერს" : "Type in one language — AI writes the other"}
            </Body>
            <Body size={font.s12} style={{ color: theme.faint, marginTop: 3 }}>
              {ka ? "ქართულად ან ინგლისურად. ✨ ნიშნული ველები შეგიძლია შეასწორო." : "Georgian or English. Fields marked ✨ were filled for you — edit them if needed."}
            </Body>
          </View>
          {source ? <Pill text={source === "ai" ? "Gemini" : "offline"} tone={source === "ai" ? "ok" : "neutral"} /> : null}
        </View>
      </Card>

      {FIELDS.map((fld) => (
        <View key={fld.key}>
          <SectionLabel>{(ka ? fld.ka : fld.en) + (fld.required ? " *" : "")}</SectionLabel>
          <Card style={{ paddingVertical: space.sm }}>
            {(["en", "ka"] as Lang[]).map((l, i) => {
              const id = fid(fld.key, l);
              return (
                <View key={l} style={{ borderTopWidth: i > 0 ? 1 : 0, borderTopColor: theme.lineSoft }}>
                  <Field
                    tag={l === "en" ? "EN" : "ქარ"}
                    value={form[id]}
                    placeholder={fld.placeholder[l]}
                    onChangeText={(v) => change(id, v)}
                    onBlur={() => fill([{ key: fld.key, from: l }])}
                    busy={!!busy[id]}
                    ai={!!aiFilled[id]}
                  />
                </View>
              );
            })}
          </Card>
        </View>
      ))}

      <SectionLabel>{ka ? "ტელეფონი *" : "Phone *"}</SectionLabel>
      <Card style={{ paddingVertical: space.sm }}>
        <Field tag="📱" value={form.phone} placeholder="+995 555 12 34 56" keyboardType="phone-pad" onChangeText={(v) => change("phone", v)} />
      </Card>

      <Btn
        label={ka ? "მეორე ენის შევსება" : "Fill the other language"}
        icon="sparkles-outline"
        variant="outline"
        onPress={() => fill(pendingJobs())}
        loading={translating}
        style={{ marginTop: space.xl }}
      />

      {error ? (
        <View style={[styles.row, { gap: 6, marginTop: space.md }]}>
          <Ionicons name="alert-circle" size={15} color={theme.red} />
          <Body size={font.s12} style={{ color: theme.red, flex: 1, minWidth: 0 }}>{error}</Body>
        </View>
      ) : null}

      <Btn
        label={isOnboarding ? (ka ? "შენახვა და გაგრძელება" : "Save and continue") : ka ? "შენახვა" : "Save changes"}
        icon="checkmark"
        onPress={save}
        loading={update.isPending}
        disabled={translating}
        style={{ marginTop: space.md }}
      />

      {saved && !isOnboarding ? (
        <View style={[styles.row, { gap: 6, marginTop: space.md, justifyContent: "center" }]}>
          <Ionicons name="checkmark-circle" size={15} color={theme.ok} />
          <Body size={font.s12} style={{ color: theme.ok }}>{ka ? "შენახულია" : "Saved"}</Body>
        </View>
      ) : null}
    </Screen>
  );
}

function Field({ tag, value, placeholder, onChangeText, onBlur, busy = false, ai = false, keyboardType }: {
  tag: string; value: string; placeholder: string; onChangeText: (v: string) => void; onBlur?: () => void;
  busy?: boolean; ai?: boolean; keyboardType?: "default" | "phone-pad";
}) {
  const { theme } = useTokens();
  return (
    <View style={[styles.row, { gap: space.md, paddingVertical: 4 }]}>
      <View style={{ width: 38, alignItems: "center", paddingVertical: 4, borderRadius: radius.sm, backgroundColor: theme.paper }}>
        <Body size={font.s11} weight="700" style={{ color: theme.mut }}>{tag}</Body>
      </View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={theme.faint}
        keyboardType={keyboardType}
        style={{ flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0, paddingVertical: 11, color: theme.ink, fontSize: font.s14 }}
      />
      {busy ? <ActivityIndicator size="small" color={theme.green} /> : ai ? <Ionicons name="sparkles" size={15} color={theme.brandText} /> : null}
    </View>
  );
}
