import React from "react";
import { View } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useCustomer } from "@/lib/hooks";
import { Body, Btn, Card, styles, useTokens } from "@/ui";

export function useProfileGate() {
  const q = useCustomer();
  return { ...q, blocked: !!q.data && !q.data.profile_complete };
}

const openProfile = () => router.push("/profile?onboarding=1" as any);

/** Shown until the customer has a bilingual name, address and phone. */
export function ProfileGateCard({ compact = false }: { compact?: boolean }) {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  if (compact) {
    return (
      <Card onPress={openProfile} style={{ backgroundColor: theme.tint, borderColor: theme.green }}>
        <View style={[styles.row, { gap: space.md }]}>
          <Ionicons name="person-circle-outline" size={26} color={theme.brandText} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Body weight="700" size={font.s13}>{ka ? "შეავსე პროფილი" : "Complete your profile"}</Body>
            <Body muted size={font.s11}>{ka ? "ამანათების დამატებამდე საჭიროა" : "Needed before you can add parcels"}</Body>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.brandText} />
        </View>
      </Card>
    );
  }
  return (
    <Card style={{ marginTop: space.lg, alignItems: "center", paddingVertical: 30 }}>
      <View style={{ width: 64, height: 64, borderRadius: radius.lg, backgroundColor: theme.tint, alignItems: "center", justifyContent: "center" }}>
        <Ionicons name="id-card-outline" size={30} color={theme.brandText} />
      </View>
      <Body weight="700" size={font.s16} style={{ marginTop: space.lg, textAlign: "center" }}>{ka ? "ჯერ შეავსე პროფილი" : "Complete your profile first"}</Body>
      <Body muted size={font.s12} style={{ marginTop: 6, textAlign: "center" }}>
        {ka ? "სახელი, გვარი, მისამართი და ტელეფონი — ამანათის გაფორმებისთვის საჭიროა ქართულად და ინგლისურად. AI დაგეხმარება." : "Name, address and phone in Georgian and English are needed for customs. AI fills in the second language for you."}
      </Body>
      <Btn label={ka ? "პროფილის შევსება" : "Fill in profile"} icon="sparkles" onPress={openProfile} style={{ marginTop: space.xl, alignSelf: "stretch" }} />
    </Card>
  );
}
