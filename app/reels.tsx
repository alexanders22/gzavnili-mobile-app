import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import { VideoView, useVideoPlayer } from "expo-video";
import { useEventListener } from "expo";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { mediaUrl } from "@/lib/api";
import { useMarkReelSeen, useReels, type Reel } from "@/lib/hooks";
import { Body, Btn, styles, useTokens } from "@/ui";
import { reelTone, sortReels } from "@/components/ReelsStrip";

const TICK_MS = 50;
const IMAGE_MS = 5000;
const VIDEO_MAX_MS = 15000;
const close = () => (router.canGoBack() ? router.back() : router.replace("/"));

/** Full-screen stories: unseen first, auto-advance, tap left/right to move. */
export default function Reels() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { id } = useLocalSearchParams<{ id?: string }>();
  const { data, isLoading } = useReels();
  const markSeen = useMarkReelSeen();
  const [order, setOrder] = useState<string[] | null>(null);
  useEffect(() => { if (data && !order) setOrder(sortReels(data).map((r) => r.id)); }, [data, order]);
  const reels = (order ?? []).map((rid) => data?.find((r) => r.id === rid)).filter((r): r is Reel => !!r);

  const [index, setIndex] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const durationRef = useRef(IMAGE_MS);
  useEffect(() => { if (index === null && reels.length) setIndex(Math.max(0, reels.findIndex((r) => r.id === id))); }, [reels.length]);
  useEffect(() => { if (data && !data.length) close(); }, [data]);

  const i = index ?? 0;
  const reel = reels[i];
  const media = mediaUrl(reel?.media_url);
  const isVideo = reel?.media_type === "video" && !!media;
  const step = (d: number) => { const n = i + d; if (n < 0) return; if (n >= reels.length) return close(); setIndex(n); };
  const stepRef = useRef(step);
  stepRef.current = step;

  useEffect(() => { if (reel && !reel.seen) markSeen.mutate(reel.id); }, [reel?.id]);
  useEffect(() => {
    if (!reel) return;
    durationRef.current = isVideo ? VIDEO_MAX_MS : IMAGE_MS;
    setProgress(0);
    let p = 0;
    const t = setInterval(() => {
      p += TICK_MS / durationRef.current;
      if (p >= 1) { clearInterval(t); stepRef.current(1); return; }
      setProgress(p);
    }, TICK_MS);
    return () => clearInterval(t);
  }, [i, reel?.id]);

  if (isLoading || !reel) {
    return (
      <View style={{ flex: 1, backgroundColor: theme.navy, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator color={theme.green} />
      </View>
    );
  }
  const title = ka ? reel.titleKa : reel.titleEn;
  const body = ka ? reel.bodyKa : reel.bodyEn;

  return (
    <View style={{ flex: 1, backgroundColor: reelTone(reel.tone, theme) }}>
      {media && isVideo ? (
        <ReelVideo key={reel.id} url={media} onEnd={() => stepRef.current(1)} onDuration={(ms) => { durationRef.current = Math.min(ms, VIDEO_MAX_MS); }} />
      ) : media ? (
        <Image key={reel.id} source={{ uri: media }} resizeMode="cover" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />
      ) : null}
      {media ? <Scrim /> : null}
      <SafeAreaView style={{ flex: 1 }}>
        {/* Progress segments */}
        <View style={{ flexDirection: "row", gap: 4, paddingHorizontal: space.md, paddingTop: space.sm }}>
          {reels.map((r, n) => (
            <View key={r.id} style={{ flexGrow: 1, flexBasis: 0, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.25)", overflow: "hidden" }}>
              <View style={{ width: n < i ? "100%" : n === i ? `${progress * 100}%` : "0%", height: "100%", backgroundColor: theme.green }} />
            </View>
          ))}
        </View>
        <View style={[styles.between, { padding: space.md }]}>
          <View style={{ backgroundColor: theme.green, borderRadius: radius.pill, paddingHorizontal: 9, paddingVertical: 4 }}>
            <Body size={10} weight="800" style={{ color: theme.greenDeep, letterSpacing: 0.5 }}>{ka ? reel.tagKa : reel.tagEn}</Body>
          </View>
          <Pressable onPress={close} hitSlop={12}><Ionicons name="close" size={26} color="#fff" /></Pressable>
        </View>
        <View style={{ flex: 1 }}>
          {media ? (
            <View style={{ flex: 1, justifyContent: "flex-end", padding: space.xl }}>
              <Body weight="700" size={font.s28} style={{ color: "#fff" }}>{title}</Body>
              {body ? <Body size={font.s14} style={{ color: "rgba(255,255,255,0.85)", marginTop: space.sm }}>{body}</Body> : null}
            </View>
          ) : (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: space.xl }}>
              <Body size={72}>{reel.emoji ?? "📣"}</Body>
              <Body weight="700" size={font.s22} style={{ color: "#fff", marginTop: space.xl, textAlign: "center" }}>{title}</Body>
              {body ? <Body size={font.s14} style={{ color: "rgba(255,255,255,0.8)", marginTop: space.sm, textAlign: "center" }}>{body}</Body> : null}
            </View>
          )}
          {/* Tap zones */}
          <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, flexDirection: "row" }}>
            <Pressable style={{ flex: 1 }} onPress={() => step(-1)} />
            <Pressable style={{ flex: 1 }} onPress={() => step(1)} />
          </View>
        </View>
        {reel.cta_route ? (
          <View style={{ padding: space.lg }}>
            <Btn label={ka ? "გახსნა" : "Take a look"} onPress={() => { const r = reel.cta_route!; close(); router.push(r as any); }} />
          </View>
        ) : (
          <View style={{ height: space.lg }} />
        )}
      </SafeAreaView>
    </View>
  );
}

function ReelVideo({ url, onEnd, onDuration }: { url: string; onEnd: () => void; onDuration: (ms: number) => void }) {
  const player = useVideoPlayer(url, (p) => { p.muted = true; p.loop = false; p.play(); });
  useEventListener(player, "playToEnd", onEnd);
  useEventListener(player, "statusChange", ({ status }) => { if (status === "readyToPlay" && player.duration > 0) onDuration(player.duration * 1000); });
  return <VideoView player={player} contentFit="cover" nativeControls={false} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }} />;
}

/** Darkens the top (for the progress bar) and the bottom (for the caption). */
function Scrim() {
  return (
    <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}>
      <View style={{ height: 120, backgroundColor: "rgba(0,0,0,0.3)" }} />
      <View style={{ flex: 1 }} />
      {[0.05, 0.12, 0.22, 0.34, 0.48, 0.6].map((a) => <View key={a} style={{ height: 60, backgroundColor: `rgba(0,0,0,${a})` }} />)}
    </View>
  );
}
