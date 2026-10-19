import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { CATEGORIES, PRODUCTS, STORES, USD_TO_GEL, discountOf, isCategoryId, type Product } from "@/data/shop";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, styles, useTokens } from "@/ui";
import { BottomSheet } from "@/ui/BottomSheet";
import { TileGrid } from "@/ui/TileGrid";
import { DrawnBand } from "@/components/Drawing";
import { NewBadge } from "@/components/ModuleTile";

const PRICE_PRESETS: { min?: number; max?: number; label: string }[] = [
  { max: 50, label: "< $50" },
  { min: 50, max: 100, label: "$50–100" },
  { min: 100, max: 250, label: "$100–250" },
  { min: 250, label: "$250+" },
];
const SORTS = [
  { id: "popular", ka: "პოპულარული", en: "Popular" },
  { id: "price-asc", ka: "ფასი ↑", en: "Price ↑" },
  { id: "price-desc", ka: "ფასი ↓", en: "Price ↓" },
  { id: "discount", ka: "ფასდაკლება", en: "Biggest discount" },
] as const;
type SortId = (typeof SORTS)[number]["id"];

const parseNum = (s: string) => {
  const n = Number(s.replace(",", "."));
  return s.trim() && Number.isFinite(n) && n >= 0 ? n : undefined;
};
const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

export default function Shop() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const params = useLocalSearchParams<{ cat?: string }>();
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState<string[]>(isCategoryId(params.cat) ? [params.cat as string] : []);
  const [saleOnly, setSaleOnly] = useState(false);
  const [minStr, setMinStr] = useState("");
  const [maxStr, setMaxStr] = useState("");
  const [stores, setStores] = useState<string[]>([]);
  const [sort, setSort] = useState<SortId>("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  useEffect(() => { if (isCategoryId(params.cat)) setCats([params.cat as string]); }, [params.cat]);

  const min = parseNum(minStr);
  const max = parseNum(maxStr);
  const hasPrice = min !== undefined || max !== undefined;
  const catName = (id: string) => { const c = CATEGORIES.find((x) => x.id === id)!; return ka ? c.ka : c.en; };
  const pickPreset = (p: { min?: number; max?: number }) => {
    const same = min === p.min && max === p.max;
    setMinStr(same || p.min === undefined ? "" : String(p.min));
    setMaxStr(same || p.max === undefined ? "" : String(p.max));
  };
  const clearAll = () => { setCats([]); setSaleOnly(false); setMinStr(""); setMaxStr(""); setStores([]); setSort("popular"); };

  const products = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) =>
      (!cats.length || cats.includes(p.cat)) && (!saleOnly || !!p.was) && (min === undefined || p.price >= min) && (max === undefined || p.price <= max) &&
      (!stores.length || stores.includes(p.store)) && (!q || `${p.name} ${p.store} ${catName(p.cat)}`.toLowerCase().includes(q)));
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "discount") return [...list].sort((a, b) => discountOf(b) - discountOf(a));
    return list;
  }, [query, cats, saleOnly, min, max, stores, sort, ka]);

  const q = query.trim().toLowerCase();
  const visibleStores = STORES.filter((s) => products.some((p) => p.store === s.name) || (!!q && s.name.toLowerCase().includes(q)));
  const active = [
    ...cats.map((c) => ({ key: `cat-${c}`, label: catName(c), clear: () => setCats((x) => x.filter((y) => y !== c)) })),
    ...(saleOnly ? [{ key: "sale", label: ka ? "ფასდაკლება" : "Sale", clear: () => setSaleOnly(false) }] : []),
    ...(hasPrice ? [{ key: "price", label: min !== undefined && max !== undefined ? `$${min}–${max}` : min !== undefined ? `$${min}+` : `≤ $${max}`, clear: () => { setMinStr(""); setMaxStr(""); } }] : []),
    ...stores.map((s) => ({ key: `store-${s}`, label: s, clear: () => setStores((x) => x.filter((y) => y !== s)) })),
  ];
  const filtering = active.length > 0 || !!q;
  const saleCount = PRODUCTS.filter((p) => p.was).length;
  const sortLabel = SORTS.find((s) => s.id === sort)!;

  const Chip = ({ on, label, icon, onPress, danger }: { on: boolean; label: string; icon?: React.ComponentProps<typeof Ionicons>["name"]; onPress: () => void; danger?: boolean }) => {
    const c = danger ? theme.red : theme.navy;
    return (
      <Pressable onPress={onPress} style={{ flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 13, paddingVertical: 9, borderRadius: radius.pill, backgroundColor: on ? c : theme.card, borderWidth: 1, borderColor: on ? c : theme.line }}>
        {on ? <Ionicons name="checkmark" size={14} color="#fff" /> : icon ? <Ionicons name={icon} size={14} color={danger ? theme.red : theme.mut} /> : null}
        <Body size={font.s12} weight="700" style={{ color: on ? "#fff" : danger ? theme.red : theme.mut }}>{label}</Body>
      </Pressable>
    );
  };
  const PriceInput = ({ value, onChange, placeholder }: { value: string; onChange: (s: string) => void; placeholder: string }) => (
    <View style={{ flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md }}>
      <Body muted weight="700">$</Body>
      <TextInput value={value} onChangeText={onChange} placeholder={placeholder} placeholderTextColor={theme.faint} keyboardType="decimal-pad" style={{ flex: 1, minWidth: 0, paddingVertical: 12, color: theme.ink, fontSize: font.s14 }} />
    </View>
  );

  return (
    <>
      <Screen>
        <View style={styles.between}>
          <Title>{ka ? "შოპინგი" : "Shopping"}</Title>
          <NewBadge />
        </View>
        <Body muted style={{ marginTop: 4 }}>{ka ? "იყიდე აშშ-ს მაღაზიებში" : "Shop in USA stores"}</Body>
        <DrawnBand name="shop" width={104} bg={theme.pinkTint} note={ka ? "გლობალური ბრენდები.\nადგილობრივი მიწოდება.\nბედნიერი შენ." : "Global brands.\nLocal delivery.\nHappier you."} style={{ marginTop: space.lg }} />

        {/* Search + filters button */}
        <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg }}>
          <View style={{ flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: space.sm, backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md }}>
            <Ionicons name="search" size={17} color={theme.faint} />
            <TextInput value={query} onChangeText={setQuery} placeholder={ka ? "მოძებნე პროდუქტი ან საიტი" : "Search a product or store"} placeholderTextColor={theme.faint} style={{ flex: 1, minWidth: 0, paddingVertical: 13, color: theme.ink, fontSize: font.s14 }} />
            {query ? <Pressable onPress={() => setQuery("")} hitSlop={8}><Ionicons name="close-circle" size={17} color={theme.faint} /></Pressable> : null}
          </View>
          <Pressable onPress={() => setFiltersOpen(true)} accessibilityLabel={ka ? "ფილტრები" : "Filters"} style={({ pressed }) => ({ width: 50, borderRadius: radius.md, backgroundColor: active.length ? theme.navy : theme.paper, alignItems: "center", justifyContent: "center", opacity: pressed ? 0.8 : 1 })}>
            <Ionicons name="options-outline" size={20} color={active.length ? "#fff" : theme.ink} />
            {active.length ? (
              <View style={{ position: "absolute", top: 6, right: 6, minWidth: 17, height: 17, borderRadius: 9, paddingHorizontal: 4, backgroundColor: theme.green, alignItems: "center", justifyContent: "center" }}>
                <Body size={10} weight="800" style={{ color: theme.greenDeep }}>{active.length}</Body>
              </View>
            ) : null}
          </Pressable>
        </View>

        {/* Quick chips */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginHorizontal: -space.lg, marginTop: space.md }} contentContainerStyle={{ paddingHorizontal: space.lg, gap: space.sm }}>
          <Chip on={saleOnly} danger icon="pricetag-outline" label={`${ka ? "ფასდაკლება" : "Sale"} (${saleCount})`} onPress={() => setSaleOnly((v) => !v)} />
          <Chip on={hasPrice} icon="cash-outline" label={hasPrice ? active.find((a) => a.key === "price")!.label : ka ? "ფასი" : "Price"} onPress={() => setFiltersOpen(true)} />
          {CATEGORIES.map((c) => <Chip key={c.id} on={cats.includes(c.id)} icon={c.icon as any} label={ka ? c.ka : c.en} onPress={() => setCats((x) => toggle(x, c.id))} />)}
        </ScrollView>

        {active.length ? (
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: space.md, alignItems: "center" }}>
            {active.map((a) => (
              <Pressable key={a.key} onPress={a.clear} style={{ flexDirection: "row", alignItems: "center", gap: 4, backgroundColor: theme.tint2, borderRadius: radius.pill, paddingLeft: 10, paddingRight: 7, paddingVertical: 5 }}>
                <Body size={font.s12} weight="700" style={{ color: theme.brandText }}>{a.label}</Body>
                <Ionicons name="close" size={14} color={theme.brandText} />
              </Pressable>
            ))}
            <Pressable onPress={clearAll} hitSlop={6} style={{ paddingHorizontal: 6 }}>
              <Body size={font.s12} weight="700" style={{ color: theme.red }}>{ka ? "ყველას მოშორება" : "Clear all"}</Body>
            </Pressable>
          </View>
        ) : null}

        {!filtering ? (
          <Card style={{ marginTop: space.lg, backgroundColor: theme.navy, borderColor: theme.navy }} onPress={() => router.push("/buyforme" as any)}>
            <View style={[styles.row, { gap: space.md }]}>
              <View style={{ width: 44, height: 44, borderRadius: radius.md, backgroundColor: theme.greenDeep, alignItems: "center", justifyContent: "center" }}>
                <Ionicons name="cart-outline" size={21} color={theme.green} />
              </View>
              <View style={{ flex: 1, minWidth: 0 }}>
                <View style={[styles.row, { gap: space.sm }]}>
                  <Body weight="700" numberOfLines={1} style={{ color: "#fff" }}>{ka ? "იყიდე ჩემთვის" : "Buy For Me"}</Body>
                  <NewBadge />
                </View>
                <Body size={font.s12} numberOfLines={1} style={{ color: theme.faint, marginTop: 2 }}>{ka ? "ჩვენ ვიყიდით, შენ ისვენებ" : "We buy it for you"}</Body>
              </View>
              <Ionicons name="chevron-forward" size={18} color={theme.faint} />
            </View>
          </Card>
        ) : null}

        <View style={[styles.between, { marginTop: space.xl }]}>
          <Body size={font.s11} weight="700" style={{ color: theme.faint, letterSpacing: 0.8 }}>{(ka ? "პროდუქტები" : "Products").toUpperCase()} · {products.length}</Body>
          <Pressable onPress={() => setFiltersOpen(true)} hitSlop={8} style={[styles.row, { gap: 4 }]}>
            <Ionicons name="swap-vertical" size={13} color={theme.mut} />
            <Body size={font.s12} weight="600" muted>{ka ? sortLabel.ka : sortLabel.en}</Body>
          </Pressable>
        </View>

        {products.length ? (
          <TileGrid>
            {products.map((p) => <ProductCard key={p.id} product={p} />)}
          </TileGrid>
        ) : (
          <Card style={{ alignItems: "center", paddingVertical: 36, marginTop: space.md }}>
            <Ionicons name="search-outline" size={28} color={theme.faint} />
            <Body muted size={font.s13} style={{ marginTop: space.md, textAlign: "center" }}>{ka ? "ამ ფილტრებით არაფერი მოიძებნა" : "Nothing matches these filters"}</Body>
            {active.length ? <Btn label={ka ? "ფილტრების მოშორება" : "Clear filters"} variant="outline" onPress={clearAll} style={{ marginTop: space.lg }} /> : null}
          </Card>
        )}

        {visibleStores.length ? (
          <>
            <SectionLabel>{ka ? "მაღაზიები" : "Stores"} · {visibleStores.length}</SectionLabel>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexGrow: 0, marginHorizontal: -space.lg }} contentContainerStyle={{ paddingHorizontal: space.lg, gap: space.sm }}>
              {visibleStores.map((s) => {
                const on = stores.includes(s.name);
                return (
                  <Pressable key={s.name} onPress={() => setStores((x) => toggle(x, s.name))} style={{ width: 132, padding: space.md, borderRadius: radius.lg, borderWidth: 1.5, borderColor: on ? theme.greenDeep : theme.line, backgroundColor: on ? theme.tint : theme.card }}>
                    <View style={styles.between}>
                      <Body size={font.s18}>{s.emoji}</Body>
                      {on ? <Ionicons name="checkmark-circle" size={18} color={theme.brandText} /> : null}
                    </View>
                    <Body weight="700" size={font.s13} numberOfLines={1} style={{ marginTop: space.sm }}>{s.name}</Body>
                    <Body muted size={font.s11} numberOfLines={1}>{s.blurb}</Body>
                    <View style={[styles.row, { gap: 4, marginTop: 4 }]}>
                      <Ionicons name="airplane-outline" size={11} color={theme.faint} />
                      <Body muted size={font.s11} numberOfLines={1}>{s.eta}</Body>
                    </View>
                  </Pressable>
                );
              })}
            </ScrollView>
          </>
        ) : null}

        <View style={{ alignItems: "center", marginTop: space.xl }}>
          <Pill text={ka ? "სადემონსტრაციო კატალოგი" : "Demo catalogue"} tone="info" />
        </View>
      </Screen>

      {/* Filters sheet */}
      <BottomSheet visible={filtersOpen} onClose={() => setFiltersOpen(false)}>
        <View style={styles.between}>
          <Body weight="700" size={font.s16}>{ka ? "ფილტრები" : "Filters"}</Body>
          {active.length || sort !== "popular" ? (
            <Pressable onPress={clearAll} hitSlop={8}><Body size={font.s13} weight="700" style={{ color: theme.red }}>{ka ? "მოშორება" : "Clear all"}</Body></Pressable>
          ) : null}
        </View>
        <ScrollView style={{ maxHeight: 460, marginTop: space.sm }} keyboardShouldPersistTaps="handled">
          <SectionLabel>{ka ? "კატეგორიები" : "Categories"}</SectionLabel>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
            {CATEGORIES.map((c) => <Chip key={c.id} on={cats.includes(c.id)} icon={c.icon as any} label={ka ? c.ka : c.en} onPress={() => setCats((x) => toggle(x, c.id))} />)}
          </View>
          <SectionLabel>{ka ? "ფასდაკლება" : "Deals"}</SectionLabel>
          <View style={{ flexDirection: "row" }}>
            <Chip on={saleOnly} danger icon="pricetag-outline" label={ka ? "მხოლოდ ფასდაკლებით" : "On sale only"} onPress={() => setSaleOnly((v) => !v)} />
          </View>
          <SectionLabel>{ka ? "ფასი, USD" : "Price, USD"}</SectionLabel>
          <View style={{ flexDirection: "row", gap: space.sm, alignItems: "center" }}>
            <PriceInput value={minStr} onChange={setMinStr} placeholder={ka ? "მინ." : "Min"} />
            <Body muted>—</Body>
            <PriceInput value={maxStr} onChange={setMaxStr} placeholder={ka ? "მაქს." : "Max"} />
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm, marginTop: space.sm }}>
            {PRICE_PRESETS.map((p) => <Chip key={p.label} on={min === p.min && max === p.max} label={p.label} onPress={() => pickPreset(p)} />)}
          </View>
          <SectionLabel>{ka ? "მაღაზიები" : "Stores"}</SectionLabel>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: space.sm }}>
            {STORES.map((s) => <Chip key={s.name} on={stores.includes(s.name)} label={s.name} onPress={() => setStores((x) => toggle(x, s.name))} />)}
          </View>
          <SectionLabel>{ka ? "სორტირება" : "Sort by"}</SectionLabel>
          <View style={{ backgroundColor: theme.card, borderRadius: radius.md, borderWidth: 1, borderColor: theme.line }}>
            {SORTS.map((s, i) => (
              <View key={s.id}>
                {i > 0 ? <Divider /> : null}
                <Pressable onPress={() => setSort(s.id)} style={[styles.between, { paddingHorizontal: space.md, paddingVertical: 12 }]}>
                  <Body size={font.s13} weight={sort === s.id ? "700" : "500"}>{ka ? s.ka : s.en}</Body>
                  <Ionicons name={sort === s.id ? "radio-button-on" : "radio-button-off"} size={18} color={sort === s.id ? theme.brandText : theme.faint} />
                </Pressable>
              </View>
            ))}
          </View>
        </ScrollView>
        <Btn label={ka ? `ჩვენება · ${products.length}` : `Show ${products.length} ${products.length === 1 ? "product" : "products"}`} onPress={() => setFiltersOpen(false)} style={{ marginTop: space.lg }} />
      </BottomSheet>
    </>
  );
}

function ProductCard({ product: p }: { product: Product }) {
  const { theme } = useTokens();
  const off = discountOf(p);
  return (
    <Card style={{ height: 196 }} onPress={() => router.push("/buyforme" as any)}>
      <View style={[styles.row, { alignItems: "flex-start" }]}>
        <View style={{ width: 44, height: 44, borderRadius: radius.sm, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center" }}>
          <Body size={font.s22}>{p.emoji}</Body>
        </View>
        <View style={{ flex: 1 }} />
        {off ? (
          <View style={{ backgroundColor: theme.red, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 3 }}>
            <Body size={10} weight="800" style={{ color: "#fff" }}>-{off}%</Body>
          </View>
        ) : null}
      </View>
      <Body muted size={font.s11} numberOfLines={1} style={{ marginTop: space.md }}>{p.store}</Body>
      <Body weight="700" size={font.s13} numberOfLines={2} style={{ marginTop: 2, minHeight: 36 }}>{p.name}</Body>
      <View style={[styles.row, { gap: 6, marginTop: space.sm, flexWrap: "wrap" }]}>
        <Body weight="800" size={font.s16} style={{ color: off ? theme.red : theme.ink }}>${p.price}</Body>
        {p.was ? <Body muted size={font.s12} style={{ textDecorationLine: "line-through" }}>${p.was}</Body> : null}
      </View>
      <Body muted size={font.s11}>≈ ₾{Math.round(p.price * USD_TO_GEL)}</Body>
    </Card>
  );
}
