import React, { useState } from "react";
import { KeyboardAvoidingView, Pressable, TextInput, View, useWindowDimensions } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { router } from "expo-router";
import { font, radius, space } from "@/lib/theme";
import { useSettings } from "@/lib/settings";
import { useLang, useT } from "@/lib/i18n";
import { apiError } from "@/lib/api";
import { useLogin, useReferralCheck, useRegister } from "@/lib/hooks";
import { Body, Btn, Screen, Title, styles, useTokens } from "@/ui";
import { BrandLogo } from "@/ui/Brand";
import { Note } from "@/components/Drawing";
import { HeroArt } from "@/components/HeroArt";

// The public demo account is prefilled, exactly like the original app.
const DEMO_LOGIN = { username: "demo@gzavnili.ge", password: "Demo1234!" };

export default function SignIn() {
  const t = useT();
  const { theme } = useTokens();
  const { width } = useWindowDimensions();
  const ka = useLang() === "ka";
  const setLang = useSettings((s) => s.setLang);
  const login = useLogin();
  const register = useRegister();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState(DEMO_LOGIN.username);
  const [password, setPassword] = useState(DEMO_LOGIN.password);
  const [refCode, setRefCode] = useState("");
  const [error, setError] = useState<string | null>(null);
  const referral = useReferralCheck(mode === "register" ? refCode : "");

  const switchMode = (m: "login" | "register") => {
    setMode(m); setError(null);
    if (m === "login") { setEmail(DEMO_LOGIN.username); setPassword(DEMO_LOGIN.password); } else { setEmail(""); setPassword(""); }
  };
  const fillDemo = () => {
    if (mode === "login") { setEmail(DEMO_LOGIN.username); setPassword(DEMO_LOGIN.password); return; }
    setEmail(`demo${Math.floor(1000 + 9000 * Math.random())}@gzavnili.ge`); setPassword("Demo1234!"); setRefCode("GZ-DEMO-1001");
  };
  const submit = () => {
    setError(null);
    if (mode === "login") {
      login.mutate({ username: email.trim(), password }, { onSuccess: () => router.replace("/(tabs)"), onError: (e) => setError(apiError(e, t("signInError"))) });
    } else {
      register.mutate({ email: email.trim(), password, referral_code: refCode.trim() || undefined }, {
        onSuccess: () => router.replace("/profile?onboarding=1" as any),
        onError: (e) => setError(apiError(e, ka ? "რეგისტრაცია ვერ მოხერხდა" : "Could not create the account")),
      });
    }
  };

  const input = { backgroundColor: theme.card, borderWidth: 1, borderColor: theme.line, borderRadius: radius.md, paddingHorizontal: space.lg, paddingVertical: 15, fontSize: font.s14, color: theme.ink } as const;
  const busy = login.isPending || register.isPending;

  return (
    <Screen scroll={false} chrome={false}>
      <KeyboardAvoidingView style={{ flex: 1, padding: space.lg, justifyContent: "center", width: "100%", maxWidth: 440, alignSelf: "center" }}>
        <View style={[styles.between, { marginBottom: space.md }]}>
          <BrandLogo size={24} />
          <Pressable onPress={() => setLang(ka ? "en" : "ka")} hitSlop={10} style={{ flexDirection: "row", alignItems: "center", gap: 6, borderWidth: 1, borderColor: theme.line, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 7 }}>
            <Body size={font.s13}>{ka ? "🇬🇧" : "🇬🇪"}</Body>
            <Body size={font.s12} weight="700">{ka ? "English" : "ქართული"}</Body>
          </Pressable>
        </View>

        <View style={{ marginBottom: space.lg }}>
          <HeroArt width={Math.min(width - space.lg * 2, 400)} style={{ alignSelf: "center" }} />
          <Note size={20} style={{ position: "absolute", right: 0, top: -4 }}>{ka ? "იგივე ადამიანები.\nმეტი შესაძლებლობა." : "Same people.\nBigger possibilities."}</Note>
        </View>

        <Title>{mode === "login" ? t("signIn") : ka ? "ანგარიშის შექმნა" : "Create account"}</Title>
        <Body muted style={{ marginTop: 6, marginBottom: space.xl }}>
          {mode === "login"
            ? ka ? "ამანათები აშშ-დან, ჩინეთიდან და საქართველოდან" : "Parcels from the USA, China and out of Georgia"
            : ka ? "ოთახის ნომერი და 100 ქულა — რეგისტრაციისთანავე" : "Get your room number and 100 welcome points"}
        </Body>

        <View style={{ flexDirection: "row", backgroundColor: theme.paper, borderRadius: radius.pill, padding: 4, marginBottom: space.lg }}>
          {(["login", "register"] as const).map((m) => {
            const on = mode === m;
            return (
              <Pressable key={m} onPress={() => switchMode(m)} style={{ flexGrow: 1, flexBasis: 0, alignItems: "center", paddingVertical: 10, borderRadius: radius.pill, backgroundColor: on ? theme.navy : "transparent" }}>
                <Body size={font.s13} weight="700" style={{ color: on ? "#fff" : theme.mut }}>{m === "login" ? (ka ? "შესვლა" : "Sign in") : ka ? "რეგისტრაცია" : "Sign up"}</Body>
              </Pressable>
            );
          })}
        </View>

        <TextInput value={email} onChangeText={setEmail} placeholder={t("email")} placeholderTextColor={theme.faint} autoCapitalize="none" keyboardType="email-address" style={input} />
        <View style={{ height: space.md }} />
        <TextInput value={password} onChangeText={setPassword} placeholder={t("password")} placeholderTextColor={theme.faint} secureTextEntry onSubmitEditing={submit} style={input} />
        {mode === "register" ? (
          <>
            <View style={{ height: space.md }} />
            <TextInput value={refCode} onChangeText={setRefCode} placeholder={ka ? "მეგობრის კოდი (არასავალდებულო)" : "Friend's code (optional)"} placeholderTextColor={theme.faint} autoCapitalize="characters" style={input} />
            {referral.data ? (
              <View style={[styles.row, { gap: 6, marginTop: space.sm }]}>
                <Ionicons name={referral.data.valid ? "gift" : "close-circle"} size={14} color={referral.data.valid ? theme.ok : theme.red} />
                <Body size={font.s12} style={{ color: referral.data.valid ? theme.ok : theme.red, flex: 1 }}>
                  {referral.data.valid
                    ? ka ? `${referral.data.referrer} გიწვევს · +${referral.data.bonus} ქულა პირველ ამანათზე` : `Invited by ${referral.data.referrer} · +${referral.data.bonus} pts on your first parcel`
                    : ka ? "კოდი ვერ მოიძებნა" : "Code not found"}
                </Body>
              </View>
            ) : null}
          </>
        ) : null}
        {error ? <Body style={{ color: theme.red, marginTop: space.md }} size={font.s12}>{error}</Body> : null}

        <Btn label={mode === "login" ? t("continue") : ka ? "ანგარიშის შექმნა" : "Create account"} onPress={submit} loading={busy} disabled={!email.trim() || password.length < 6} style={{ marginTop: space.xl }} />
        <Pressable onPress={fillDemo} style={[styles.row, { gap: 6, justifyContent: "center", marginTop: space.lg }]} hitSlop={8}>
          <Ionicons name="flask-outline" size={14} color={theme.brandText} />
          <Body size={font.s12} weight="700" style={{ color: theme.brandText }}>
            {mode === "login" ? (ka ? "სადემონსტრაციო ანგარიში" : "Use the demo account") : ka ? "შეავსე სადემონსტრაციო მონაცემებით" : "Fill with demo details"}
          </Body>
        </Pressable>
      </KeyboardAvoidingView>
    </Screen>
  );
}
