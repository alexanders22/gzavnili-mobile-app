import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang, useT } from "@/lib/i18n";
import { apiError } from "@/lib/api";
import { useAssistantChat, type ChatMessage } from "@/lib/hooks";
import { playSound } from "@/lib/sound";
import { useTour } from "@/lib/tour";
import { TOURS } from "@/data/tours";
import { Body, Title, styles, useTokens } from "@/ui";
import { Drawing, Note } from "@/components/Drawing";
import { FlyingMark } from "@/ui/Brand";

const leave = () => (router.canGoBack() ? router.back() : router.replace("/"));

/** Chat with the Gemini assistant; the bird flies in on open and out on close. */
export default function Assistant() {
  const { theme } = useTokens();
  const t = useT();
  const lang = useLang();
  const ka = lang === "ka";
  const chat = useAssistantChat();
  const startTour = useTour((s) => s.start);
  const listRef = useRef<React.ComponentRef<typeof ScrollView>>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [howOpen, setHowOpen] = useState(false);

  const bird = useRef(new Animated.Value(0)).current;
  const cover = useRef(new Animated.Value(1)).current;
  const content = useRef(new Animated.Value(0)).current;
  const leaving = useRef(false);
  useEffect(() => {
    Animated.sequence([
      Animated.timing(bird, { toValue: 1, duration: 420, easing: Easing.out(Easing.back(1.6)), useNativeDriver: false }),
      Animated.delay(120),
      Animated.parallel([
        Animated.timing(cover, { toValue: 0, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: false }),
        Animated.timing(content, { toValue: 1, duration: 320, easing: Easing.out(Easing.cubic), useNativeDriver: false }),
      ]),
    ]).start();
  }, []);
  const exitWith = (then: () => void) => {
    if (leaving.current) return;
    leaving.current = true;
    Animated.parallel([
      Animated.timing(cover, { toValue: 1, duration: 200, easing: Easing.in(Easing.quad), useNativeDriver: false }),
      Animated.timing(content, { toValue: 0, duration: 200, easing: Easing.in(Easing.quad), useNativeDriver: false }),
    ]).start(() => {
      bird.setValue(1);
      Animated.timing(bird, { toValue: 2, duration: 380, easing: Easing.in(Easing.cubic), useNativeDriver: false }).start(() => then());
    });
  };

  const greeting = ka ? "გამარჯობა! რით შემიძლია დაგეხმარო?" : "Hi! How can I help you today?";
  const send = (text: string) => {
    const msg = text.trim();
    if (!msg || chat.isPending) return;
    const history = messages;
    setMessages([...history, { from: "me", text: msg }]);
    setInput("");
    playSound("send");
    chat.mutate({ message: msg, history, lang }, {
      onSuccess: (r) => { playSound("receive"); setMessages((m) => [...m, { from: "ai", text: r.reply, tools: r.tools, guide: r.guide ?? undefined }]); },
      onError: (e: any) => {
        const text = e?.response?.data?.code === "AI_DISABLED"
          ? ka ? "AI ასისტენტი სერვერზე ჯერ არ არის ჩართული — API გასაღები არ არის მითითებული." : "The AI key isn't configured on the server yet."
          : apiError(e, ka ? "ახლა პასუხი ვერ მივიღე. სცადე ცოტა ხანში." : "Couldn't get an answer. Try again in a moment.");
        playSound("receive");
        setMessages((m) => [...m, { from: "ai", text, error: true }]);
      },
    });
  };
  const runTour = (id: string) => exitWith(() => { leave(); setTimeout(() => startTour(id), 350); });
  const suggestions = ka ? ["სად არის ჩემი ამანათი?", "რამდენი უნდა გადავიხადო?", "როგორ გადავიხადო?", "ჩემი აშშ მისამართი"] : ["Where is my parcel?", "How much do I owe?", "How do I pay?", "My US address"];
  const canSend = !!input.trim() && !chat.isPending;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.cream }}>
      <Animated.View style={{ flex: 1, opacity: content, transform: [{ translateY: content.interpolate({ inputRange: [0, 1], outputRange: [28, 0] }) }] }}>
        <View style={[styles.between, { padding: space.lg }]}>
          <View style={[styles.row, { gap: space.md }]}>
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: theme.green, alignItems: "center", justifyContent: "center" }}>
              <FlyingMark size={22} color="#FFFFFF" />
            </View>
            <Title style={{ fontSize: font.s16 }}>{t("assistant")}</Title>
          </View>
          <View style={[styles.row, { gap: space.md }]}>
            <Pressable onPress={() => setHowOpen((v) => !v)} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: howOpen ? theme.navy : theme.tint, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 8, opacity: pressed ? 0.8 : 1 })}>
              <Ionicons name="help-circle-outline" size={16} color={howOpen ? theme.green : theme.greenDeep} />
              <Body size={font.s12} weight="700" style={{ color: howOpen ? "#fff" : theme.greenDeep }}>{ka ? "როგორ მუშაობს" : "How it works"}</Body>
            </Pressable>
            <Pressable onPress={() => exitWith(leave)} hitSlop={12}><Ionicons name="close" size={24} color={theme.ink} /></Pressable>
          </View>
        </View>

        <ScrollView ref={listRef} onContentSizeChange={() => listRef.current?.scrollToEnd({ animated: true })} contentContainerStyle={{ padding: space.lg, gap: space.md }}>
          {[{ from: "ai", text: greeting } as ChatMessage, ...messages].map((m, i) => {
            const tour = m.guide ? TOURS.find((x) => x.id === m.guide) : undefined;
            const mine = m.from === "me";
            return (
              <View key={i} style={{ alignSelf: mine ? "flex-end" : "flex-start", maxWidth: "84%" }}>
                <View style={{ backgroundColor: mine ? theme.navy : theme.card, borderWidth: mine ? 0 : 1, borderColor: m.error ? theme.red : theme.line, borderRadius: radius.lg, padding: space.md }}>
                  <Body size={font.s13} style={{ color: mine ? "#fff" : theme.ink }}>{m.text}</Body>
                </View>
                {tour ? (
                  <Pressable onPress={() => runTour(tour.id)} style={({ pressed }) => ({ marginTop: 6, alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: theme.green, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 9, opacity: pressed ? 0.8 : 1 })}>
                    <Ionicons name="play" size={13} color={theme.greenDeep} />
                    <Body size={font.s12} weight="700" style={{ color: theme.greenDeep }}>{ka ? `მაჩვენე: ${tour.title.ka}` : `Show me: ${tour.title.en}`}</Body>
                  </Pressable>
                ) : null}
              </View>
            );
          })}
          {howOpen ? (
            <View style={{ alignSelf: "stretch", backgroundColor: theme.card, borderWidth: 1, borderColor: theme.line, borderRadius: radius.lg, padding: space.md }}>
              <Body weight="700" size={font.s13}>{ka ? "რა გაჩვენო?" : "What should I show you?"}</Body>
              <Body muted size={font.s12} style={{ marginTop: 2 }}>{ka ? "გადაგიყვანთ საჭირო ეკრანზე და ღილაკებს თავად დავაჭერ." : "I will open the right screen and tap the buttons for you."}</Body>
              <View style={{ marginTop: space.md, gap: space.sm }}>
                {TOURS.map((tour) => (
                  <Pressable key={tour.id} onPress={() => runTour(tour.id)} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: space.md, padding: space.md, borderRadius: radius.md, backgroundColor: pressed ? theme.tint2 : theme.paper })}>
                    <View style={{ width: 36, height: 36, borderRadius: radius.sm, backgroundColor: theme.tint2, alignItems: "center", justifyContent: "center" }}>
                      <Ionicons name={tour.icon as any} size={18} color={theme.brandText} />
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Body weight="700" size={font.s13} numberOfLines={1}>{ka ? tour.title.ka : tour.title.en}</Body>
                      <Body muted size={font.s11} numberOfLines={1}>{ka ? tour.blurb.ka : tour.blurb.en}</Body>
                    </View>
                    <Ionicons name="play-circle" size={24} color={theme.brandText} />
                  </Pressable>
                ))}
              </View>
            </View>
          ) : null}
          {chat.isPending ? <Typing /> : null}
          {messages.length === 0 ? (
            <View style={{ alignItems: "center", marginTop: space.xl, gap: space.md }}>
              <Drawing name="support" width={170} float />
              <Note align="left" size={22}>{ka ? "კითხვები?\nაქ ვართ." : "Questions?\nWe’re here."}</Note>
            </View>
          ) : null}
        </ScrollView>

        <View style={{ paddingHorizontal: space.lg }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: space.sm }}>
            <Pressable onPress={() => setHowOpen((v) => !v)} style={{ flexDirection: "row", alignItems: "center", gap: 5, backgroundColor: theme.navy, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 9 }}>
              <Ionicons name="help-circle-outline" size={14} color={theme.green} />
              <Body size={font.s12} style={{ color: "#fff" }} weight="600">{ka ? "როგორ მუშაობს" : "How it works"}</Body>
            </Pressable>
            {suggestions.map((s) => (
              <Pressable key={s} onPress={() => send(s)} disabled={chat.isPending} style={{ backgroundColor: theme.tint, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 9, opacity: chat.isPending ? 0.5 : 1 }}>
                <Body size={font.s12} style={{ color: theme.brandText }} weight="600">{s}</Body>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        <KeyboardAvoidingView>
          <View style={[styles.row, { gap: space.sm, padding: space.lg }]}>
            <TextInput value={input} onChangeText={setInput} onSubmitEditing={() => send(input)} placeholder={t("askAnything")} placeholderTextColor={theme.faint} style={{ flex: 1, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.line, borderRadius: radius.pill, paddingHorizontal: space.lg, paddingVertical: 13, color: theme.ink, fontSize: font.s14 }} />
            <Pressable onPress={() => send(input)} disabled={!canSend} style={{ width: 46, height: 46, borderRadius: 23, backgroundColor: theme.green, alignItems: "center", justifyContent: "center", opacity: canSend ? 1 : 0.45 }}>
              <Ionicons name="arrow-up" size={20} color={theme.greenDeep} />
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>

      {/* Bird fly-in / fly-out cover */}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: theme.cream, alignItems: "center", justifyContent: "center", opacity: cover }]}>
        <Animated.View style={{ width: 104, height: 104, borderRadius: 52, backgroundColor: theme.green, alignItems: "center", justifyContent: "center",
          opacity: bird.interpolate({ inputRange: [0, 0.4, 1, 1.6, 2], outputRange: [0, 1, 1, 1, 0] }),
          transform: [
            { translateX: bird.interpolate({ inputRange: [0, 1, 2], outputRange: [-90, 0, 140] }) },
            { translateY: bird.interpolate({ inputRange: [0, 1, 2], outputRange: [60, 0, -220] }) },
            { rotate: bird.interpolate({ inputRange: [0, 1, 2], outputRange: ["-20deg", "0deg", "-24deg"] }) },
            { scale: bird.interpolate({ inputRange: [0, 1, 2], outputRange: [0.5, 1, 0.55] }) },
          ] }}>
          <FlyingMark size={58} color="#FFFFFF" />
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
}

/** Three pulsing dots while the assistant thinks. */
function Typing() {
  const { theme } = useTokens();
  const dots = useRef([0, 1, 2].map(() => new Animated.Value(0.3))).current;
  useEffect(() => {
    const loops = dots.map((d, i) => Animated.loop(Animated.sequence([
      Animated.delay(160 * i),
      Animated.timing(d, { toValue: 1, duration: 320, easing: Easing.out(Easing.quad), useNativeDriver: false }),
      Animated.timing(d, { toValue: 0.3, duration: 320, easing: Easing.in(Easing.quad), useNativeDriver: false }),
      Animated.delay(160 * (2 - i)),
    ])));
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, []);
  return (
    <View style={{ alignSelf: "flex-start", flexDirection: "row", gap: 5, backgroundColor: theme.card, borderWidth: 1, borderColor: theme.line, borderRadius: radius.lg, paddingHorizontal: space.lg, paddingVertical: 15 }}>
      {dots.map((d, i) => <Animated.View key={i} style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: theme.mut, opacity: d }} />)}
    </View>
  );
}
