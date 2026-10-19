// Guided tours (ported from the original bundle, module 1068). TourTarget registers a view under an id;
// TourOverlay dims everything but the current target, says a line, taps for you where the step asks to,
// and moves on. Mounted once in the root layout.
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, StyleSheet, View, useWindowDimensions, type StyleProp, type ViewStyle } from "react-native";
import { router } from "expo-router";
import { create } from "zustand";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { TOURS, type Tour } from "@/data/tours";
import { Body, styles, useTokens } from "@/ui";

type TourState = { tour: Tour | null; index: number; start: (id: string) => void; next: () => void; stop: () => void };
export const useTour = create<TourState>()((set, get) => ({
  tour: null,
  index: 0,
  start: (id) => { const t = TOURS.find((x) => x.id === id); if (t) set({ tour: t, index: 0 }); },
  next: () => { const { tour, index } = get(); if (!tour) return; if (index + 1 >= tour.steps.length) set({ tour: null, index: 0 }); else set({ index: index + 1 }); },
  stop: () => set({ tour: null, index: 0 }),
}));

type Handle = { node: () => any; press: () => void };
const targets = new Map<string, Handle[]>();
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
type Rect = { x: number; y: number; width: number; height: number };

function measure(node: any): Promise<Rect | null> {
  return new Promise((resolve) => {
    if (!node?.measureInWindow) return resolve(null);
    node.measureInWindow((x: number, y: number, w: number, h: number) => resolve(w > 0 && h > 0 ? { x, y, width: w, height: h } : null));
  });
}

/** Waits up to 4.5 s for the target to mount, scrolls it into view, returns its rect. */
async function locate(id: string, cancelled: () => boolean, timeout = 4500) {
  const until = Date.now() + timeout;
  let scrolled = false;
  while (Date.now() < until && !cancelled()) {
    const h = targets.get(id)?.[0];
    const node = h?.node();
    if (h && node) {
      if (!scrolled) { node.scrollIntoView?.({ block: "center", inline: "center" }); scrolled = true; await sleep(260); }
      const rect = await measure(node);
      if (rect) return { rect, handle: h };
    }
    await sleep(120);
  }
  return null;
}

export function TourTarget({ id, onPress, style, children }: { id?: string; onPress?: () => void; style?: StyleProp<ViewStyle>; children: React.ReactNode }) {
  const ref = useRef<any>(null);
  const press = useRef(onPress);
  press.current = onPress;
  useEffect(() => {
    if (!id) return;
    const h: Handle = { node: () => ref.current, press: () => press.current?.() };
    targets.set(id, [...(targets.get(id) ?? []), h]);
    return () => { const rest = (targets.get(id) ?? []).filter((x) => x !== h); if (rest.length) targets.set(id, rest); else targets.delete(id); };
  }, [id]);
  return <View ref={ref} collapsable={false} style={style}>{children}</View>;
}

const DIM = "rgba(8,14,20,0.62)";
type Phase = "seeking" | "showing" | "tapping" | "missing";

export function TourOverlay() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const { tour, index, next, stop } = useTour();
  const { width: W, height: H } = useWindowDimensions();
  const [rect, setRect] = useState<Rect | null>(null);
  const [phase, setPhase] = useState<Phase>("seeking");
  const hand = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const handOpacity = useRef(new Animated.Value(0)).current;
  const ripple = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;
  const step = tour?.steps[index];
  const last = !!tour && index === tour.steps.length - 1;

  useEffect(() => {
    const loop = Animated.loop(Animated.sequence([
      Animated.timing(pulse, { toValue: 1, duration: 800, useNativeDriver: false }),
      Animated.timing(pulse, { toValue: 0, duration: 800, useNativeDriver: false }),
    ]));
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  useEffect(() => {
    if (!tour || !step) return;
    let cancelled = false;
    const isCancelled = () => cancelled;
    (async () => {
      setRect(null); setPhase("seeking"); handOpacity.setValue(0); progress.setValue(0);
      if (step.route) { router.push(step.route as any); await sleep(450); }
      if (cancelled) return;
      const found = step.target ? await locate(step.target, isCancelled) : null;
      if (cancelled) return;
      if (step.target && !found) { if (step.optional) next(); else setPhase("missing"); return; }
      setRect(found?.rect ?? null);
      setPhase("showing");
      if (step.press && found) {
        await sleep(1200); if (cancelled) return;
        setPhase("tapping");
        const cx = found.rect.x + found.rect.width / 2, cy = found.rect.y + found.rect.height / 2;
        hand.setValue({ x: W / 2, y: H - 110 });
        Animated.timing(handOpacity, { toValue: 1, duration: 160, useNativeDriver: false }).start();
        await new Promise((r) => Animated.timing(hand, { toValue: { x: cx, y: cy }, duration: 700, easing: Easing.inOut(Easing.cubic), useNativeDriver: false }).start(() => r(null)));
        if (cancelled) return;
        ripple.setValue(0);
        Animated.timing(ripple, { toValue: 1, duration: 450, useNativeDriver: false }).start();
        await sleep(200); if (cancelled) return;
        found.handle.press();
        await sleep(750);
        if (!cancelled) next();
      } else if (!last) {
        const text = ka ? step.say.ka : step.say.en;
        Animated.timing(progress, { toValue: 1, duration: Math.min(6500, 2400 + 40 * text.length), easing: Easing.linear, useNativeDriver: false })
          .start(({ finished }) => { if (finished && !cancelled) next(); });
      }
    })();
    return () => { cancelled = true; progress.stopAnimation(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tour?.id, index]);

  if (!tour || !step) return null;

  const text = phase === "missing"
    ? step.fallback ? (ka ? step.fallback.ka : step.fallback.en) : ka ? "ეს ელემენტი ახლა ეკრანზე არ ჩანს." : "That isn't on the screen right now."
    : ka ? step.say.ka : step.say.en;
  const hole = rect ? { x: rect.x - 8, y: rect.y - 8, w: rect.width + 16, h: rect.height + 16 } : null;
  const cardW = Math.min(340, W - 32);
  const below = !hole || hole.y + hole.h + 200 < H;
  const left = hole ? Math.min(Math.max(hole.x + hole.w / 2 - cardW / 2, 16), W - cardW - 16) : (W - cardW) / 2;
  const pos = hole ? (below ? { top: hole.y + hole.h + 14 } : { bottom: H - hole.y + 14 }) : { top: H / 2 - 90 };
  const finish = last || (phase === "missing" && !!step.fallback);

  return (
    <View pointerEvents="box-none" style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}>
      {hole ? (
        <>
          <Pressable style={{ position: "absolute", left: 0, top: 0, right: 0, height: Math.max(0, hole.y), backgroundColor: DIM }} />
          <Pressable style={{ position: "absolute", left: 0, top: hole.y + hole.h, right: 0, bottom: 0, backgroundColor: DIM }} />
          <Pressable style={{ position: "absolute", left: 0, top: hole.y, width: Math.max(0, hole.x), height: hole.h, backgroundColor: DIM }} />
          <Pressable style={{ position: "absolute", left: hole.x + hole.w, top: hole.y, right: 0, height: hole.h, backgroundColor: DIM }} />
          <Animated.View pointerEvents="none" style={{ position: "absolute", left: hole.x, top: hole.y, width: hole.w, height: hole.h, borderRadius: 14, borderWidth: 2, borderColor: theme.green, transform: [{ scale: pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.04] }) }] }} />
        </>
      ) : (
        <Pressable style={[StyleSheet.absoluteFill, { backgroundColor: phase === "seeking" ? "rgba(8,14,20,0.25)" : DIM }]} />
      )}

      <Animated.View pointerEvents="none" style={{ position: "absolute", left: 0, top: 0, opacity: handOpacity, transform: hand.getTranslateTransform() }}>
        <View style={{ marginLeft: -22, marginTop: -22, width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.28)", borderWidth: 2, borderColor: "#fff", alignItems: "center", justifyContent: "center" }}>
          <Animated.View style={{ position: "absolute", width: 44, height: 44, borderRadius: 22, backgroundColor: theme.green, opacity: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.7, 0] }), transform: [{ scale: ripple.interpolate({ inputRange: [0, 1], outputRange: [0.6, 2.4] }) }] }} />
          <Ionicons name="hand-left" size={20} color="#fff" />
        </View>
      </Animated.View>

      {phase !== "seeking" ? (
        <View style={{ position: "absolute", left, width: cardW, ...pos, backgroundColor: theme.card, borderRadius: radius.lg, padding: space.lg, shadowColor: "#000", shadowOpacity: 0.3, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 16 }}>
          <View style={styles.between}>
            <View style={[styles.row, { gap: 6, flexShrink: 1, minWidth: 0 }]}>
              <Ionicons name={tour.icon as any} size={14} color={theme.brandText} />
              <Body size={font.s11} weight="700" numberOfLines={1} style={{ color: theme.brandText, letterSpacing: 0.5 }}>{(ka ? tour.title.ka : tour.title.en).toUpperCase()}</Body>
            </View>
            <Body size={font.s11} muted>{index + 1} / {tour.steps.length}</Body>
          </View>
          <Body weight="600" size={font.s14} style={{ marginTop: 8 }}>{text}</Body>
          {phase === "showing" && !step.press && !last ? (
            <View style={{ height: 3, borderRadius: 2, backgroundColor: theme.lineSoft, marginTop: space.md, overflow: "hidden" }}>
              <Animated.View style={{ height: 3, backgroundColor: theme.green, width: progress.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }} />
            </View>
          ) : null}
          <View style={[styles.between, { marginTop: space.md }]}>
            <Pressable onPress={stop} hitSlop={10}><Body size={font.s12} weight="600" muted>{ka ? "გასვლა" : "Exit"}</Body></Pressable>
            {phase === "tapping" || (phase === "showing" && step.press) ? (
              <View style={[styles.row, { gap: 6 }]}>
                <Ionicons name="hand-left-outline" size={14} color={theme.brandText} />
                <Body size={font.s12} weight="700" style={{ color: theme.brandText }}>{ka ? "დაჭერა…" : "Tapping…"}</Body>
              </View>
            ) : (
              <Pressable onPress={finish ? stop : next} style={({ pressed }) => ({ backgroundColor: theme.green, borderRadius: radius.pill, paddingHorizontal: 16, paddingVertical: 8, opacity: pressed ? 0.8 : 1 })}>
                <Body size={font.s12} weight="700" style={{ color: theme.greenDeep }}>{finish ? (ka ? "დასრულება" : "Done") : ka ? "შემდეგი" : "Next"}</Body>
              </Pressable>
            )}
          </View>
        </View>
      ) : null}
    </View>
  );
}
