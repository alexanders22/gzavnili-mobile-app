import React from "react";
import { Image, Pressable, ScrollView, View } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { router } from "expo-router";
import { radius, space, type Theme } from "@/lib/theme";
import { useSettings } from "@/lib/settings";
import { useLang } from "@/lib/i18n";
import { useReels, type Reel } from "@/lib/hooks";
import { mediaUrl } from "@/lib/api";
import { Body, useTokens } from "@/ui";

export const reelTone = (tone: string | undefined, t: Theme) => (tone === "green" ? t.greenDeep : tone === "blue" ? "#1668B8" : t.navy);
export const sortReels = (r: Reel[]) => [...r.filter((x) => !x.seen), ...r.filter((x) => x.seen)];

/** Story-style strip of promo cards at the top of Home. */
export function ReelsStrip() {
  const { theme } = useTokens();
  const lang = useLang();
  const isEnabled = useSettings((s) => s.isEnabled);
  const { data } = useReels();
  if (!isEnabled("reels") || !data?.length) return null;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginHorizontal: -space.lg }} contentContainerStyle={{ paddingHorizontal: space.lg, gap: space.md }}>
      {sortReels(data).map((r) => {
        const img = r.media_type === "image" ? mediaUrl(r.media_url) : null;
        return (
          <Pressable key={r.id} onPress={() => router.push(`/reels?id=${r.id}` as any)} style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}>
            <View style={{ width: 92, height: 116, borderRadius: radius.lg, backgroundColor: reelTone(r.tone, theme), padding: 8, justifyContent: "space-between", borderWidth: 2, borderColor: r.seen ? "transparent" : theme.green, overflow: "hidden" }}>
              {img ? (
                <>
                  <Image source={{ uri: img }} resizeMode="cover" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
                  <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.35)" }} />
                </>
              ) : null}
              <View style={{ flexDirection: "row", alignItems: "flex-start" }}>
                <View style={{ backgroundColor: r.seen ? "rgba(255,255,255,0.16)" : theme.green, borderRadius: radius.pill, paddingHorizontal: 7, paddingVertical: 3 }}>
                  <Body size={9} weight="800" style={{ color: r.seen ? "#fff" : theme.greenDeep, letterSpacing: 0.5 }}>{lang === "ka" ? r.tagKa : r.tagEn}</Body>
                </View>
                <View style={{ flex: 1 }} />
                {r.media_type === "video" ? (
                  <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: "rgba(0,0,0,0.45)", alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name="play" size={10} color="#fff" />
                  </View>
                ) : null}
              </View>
              {!img && r.emoji ? <Body size={17}>{r.emoji}</Body> : <View />}
              <Body size={10} weight="700" numberOfLines={2} style={{ color: "#fff" }}>{lang === "ka" ? r.titleKa : r.titleEn}</Body>
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
