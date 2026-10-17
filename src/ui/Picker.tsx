import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, Pressable, ScrollView, View, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { Body, useTokens } from "./index";
import { BottomSheet } from "./BottomSheet";

export type PickerOption = { id: string; label: string; sub?: string; detail?: string; emoji?: string; icon?: keyof typeof Ionicons.glyphMap };
type Props = {
  options: PickerOption[]; value?: string; onChange: (id: string) => void; title: string; hint?: string;
  variant?: "field" | "pill" | "pillDark"; style?: StyleProp<ViewStyle>; footer?: (close: () => void) => React.ReactNode;
};

export function Picker({ options, value, onChange, title, hint, variant = "field", style, footer }: Props) {
  const { theme } = useTokens();
  const [open, setOpen] = useState(false);
  const current = options.find((o) => o.id === value) ?? options[0];
  const dark = variant === "pillDark";
  const pill = variant !== "field";
  const close = () => setOpen(false);
  return (
    <>
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={title}
        style={({ pressed }) => [
          { flexDirection: "row", alignItems: "center", gap: pill ? 6 : space.md, alignSelf: pill ? "flex-start" : "stretch", backgroundColor: dark ? theme.navySoft : pill ? theme.paper : theme.card, borderRadius: pill ? radius.pill : radius.md, borderWidth: pill ? 0 : 1, borderColor: theme.line, paddingHorizontal: pill ? 11 : space.lg, paddingVertical: pill ? 6 : 13, opacity: pressed ? 0.75 : 1 },
          style,
        ]}
      >
        {current?.emoji ? <Body size={pill ? font.s13 : font.s18}>{current.emoji}</Body> : null}
        {!current?.emoji && current?.icon ? <Ionicons name={current.icon} size={pill ? 13 : 18} color={dark ? theme.green : theme.mut} /> : null}
        {pill ? (
          <Body size={font.s11} weight="700" numberOfLines={1} style={{ color: dark ? "#fff" : theme.ink }}>{current?.label ?? "—"}</Body>
        ) : (
          <View style={{ flex: 1, minWidth: 0 }}>
            <Body weight="700" size={font.s13} numberOfLines={1}>{current?.label ?? "—"}</Body>
            {current?.sub ? <Body muted size={font.s11} numberOfLines={1} style={{ marginTop: 2 }}>{current.sub}</Body> : null}
          </View>
        )}
        <Ionicons name="chevron-down" size={pill ? 12 : 18} color={dark ? theme.green : theme.faint} />
      </Pressable>
      <BottomSheet visible={open} onClose={close}>
        <Body weight="700" size={font.s16}>{title}</Body>
        {hint ? <Body muted size={font.s12} style={{ marginTop: 4 }}>{hint}</Body> : null}
        <FanList options={options} value={current?.id} open={open} onPick={(id) => { onChange(id); close(); }} />
        {footer ? <View style={{ marginTop: space.md }}>{footer(close)}</View> : null}
      </BottomSheet>
    </>
  );
}

function FanList({ options, value, open, onPick }: { options: PickerOption[]; value?: string; open: boolean; onPick: (id: string) => void }) {
  const fan = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!open) { fan.setValue(0); return; }
    const t = setTimeout(() => Animated.timing(fan, { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start(), 60);
    return () => clearTimeout(t);
  }, [open]);
  const rows = options.map((o, i) => <OptionRow key={o.id} option={o} index={i} fan={fan} selected={o.id === value} onPress={() => onPick(o.id)} />);
  return options.length > 4 ? (
    <ScrollView style={{ maxHeight: 380, marginTop: space.lg }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: space.sm }}>{rows}</ScrollView>
  ) : (
    <View style={{ marginTop: space.lg }}>{rows}</View>
  );
}

function OptionRow({ option, index, fan, selected, onPress }: { option: PickerOption; index: number; fan: Animated.Value; selected: boolean; onPress: () => void }) {
  const { theme } = useTokens();
  const k = Math.min(index, 4);
  const translateY = fan.interpolate({ inputRange: [0, 1], outputRange: [-26 * k, 0] });
  const scale = fan.interpolate({ inputRange: [0, 1], outputRange: [1 - 0.03 * k, 1] });
  const opacity = fan.interpolate({ inputRange: [0, 0.35, 1], outputRange: [0, 0.6, 1] });
  return (
    <Animated.View style={{ transform: [{ translateY }, { scale }], opacity, marginBottom: space.sm }}>
      <Pressable onPress={onPress} style={({ pressed }) => ({ flexDirection: "row", alignItems: "center", gap: space.md, borderRadius: radius.lg, paddingHorizontal: space.lg, paddingVertical: 15, backgroundColor: selected ? theme.navy : theme.card, borderWidth: 1.5, borderColor: selected ? theme.green : theme.line, opacity: pressed ? 0.85 : 1 })}>
        <View style={{ width: 42, height: 42, borderRadius: radius.sm, backgroundColor: selected ? theme.navySoft : theme.paper, alignItems: "center", justifyContent: "center" }}>
          {option.emoji ? <Body size={font.s22}>{option.emoji}</Body> : <Ionicons name={option.icon ?? "ellipse-outline"} size={19} color={selected ? theme.green : theme.mut} />}
        </View>
        <View style={{ flex: 1, minWidth: 0 }}>
          <Body weight="700" size={font.s14} numberOfLines={1} style={{ color: selected ? "#fff" : theme.ink }}>{option.label}</Body>
          {option.sub ? <Body size={font.s12} numberOfLines={1} style={{ marginTop: 2, color: selected ? theme.greenSoft : theme.mut }}>{option.sub}</Body> : null}
          {option.detail ? <Body size={font.s11} numberOfLines={1} style={{ marginTop: 2, color: theme.faint }}>{option.detail}</Body> : null}
        </View>
        <View style={{ width: 22, height: 22, borderRadius: 11, alignItems: "center", justifyContent: "center", backgroundColor: selected ? theme.green : "transparent", borderWidth: selected ? 0 : 1.5, borderColor: theme.line }}>
          {selected ? <Ionicons name="checkmark" size={14} color={theme.greenDeep} /> : null}
        </View>
      </Pressable>
    </Animated.View>
  );
}
