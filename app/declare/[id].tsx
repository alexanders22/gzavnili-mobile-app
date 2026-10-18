// Declaration (module 1162): store, products (category + price), services, declare. Rename via a small modal.
import React, { useState } from "react";
import { Modal, Pressable, ScrollView, TextInput, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { Ionicons } from "@/ui/Icon";
import { font, radius, space } from "@/lib/theme";
import { useLang } from "@/lib/i18n";
import { useAddDeclaration, useCategories, useDeclareOrder, useDeleteDeclaration, useOrderFromList, useRenameOrder, useShops, useUpdateWrapping } from "@/lib/hooks";
import { TourTarget } from "@/lib/tour";
import { BottomSheet } from "@/ui/BottomSheet";
import { Body, Btn, Card, Divider, Pill, Screen, SectionLabel, Title, ToggleRow, styles, useTokens } from "@/ui";
import { KraftBox } from "@/components/KraftBox";

function OptionSheet({ visible, title, options, onPick, onClose }: { visible: boolean; title: string; options: string[]; onPick: (v: string) => void; onClose: () => void }) {
  const { theme } = useTokens();
  return (
    <BottomSheet visible={visible} onClose={onClose}>
      <View style={[styles.between, { marginBottom: space.md }]}>
        <Body weight="700" size={font.s16}>{title}</Body>
        <Pressable onPress={onClose} hitSlop={10}><Ionicons name="close" size={22} color={theme.ink} /></Pressable>
      </View>
      <ScrollView style={{ maxHeight: 380 }}>
        {options.map((o, i) => (
          <View key={o}>
            {i > 0 ? <Divider /> : null}
            <Pressable onPress={() => onPick(o)} style={{ paddingVertical: 15 }}><Body size={font.s14}>{o}</Body></Pressable>
          </View>
        ))}
      </ScrollView>
    </BottomSheet>
  );
}

export default function Declare() {
  const { theme } = useTokens();
  const ka = useLang() === "ka";
  const params = useLocalSearchParams<{ id: string; status?: string }>();
  const status = params.status || "AWAITING";
  const { data: order, isLoading } = useOrderFromList(status, params.id);
  const { data: shops } = useShops();
  const categories = useCategories(ka ? "ka" : "en");
  const addDecl = useAddDeclaration();
  const delDecl = useDeleteDeclaration();
  const declare = useDeclareOrder();
  const wrapping = useUpdateWrapping();
  const rename = useRenameOrder();
  const currency = order?.branch?.name === "USA" ? "USD" : "CNY";
  const sym = currency === "USD" ? "$" : "CN¥";
  const items = order?.declaration ?? [];
  const declared = order?.declaration_status === "DECLERED";
  const [site, setSite] = useState("");
  const [siteSheet, setSiteSheet] = useState(false);
  const [category, setCategory] = useState("");
  const [catSheet, setCatSheet] = useState(false);
  const [price, setPrice] = useState("");
  const [renaming, setRenaming] = useState(false);
  const [newName, setNewName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const website = site || items[0]?.website || "";
  const canAdd = !!website && !!category && Number(price) > 0;
  const canDeclare = items.length > 0 && !!website && !declared;

  if (isLoading || !order) return <Screen><Body muted>{ka ? "იტვირთება…" : "Loading…"}</Body></Screen>;

  const field = { backgroundColor: theme.paper, borderRadius: radius.md, paddingHorizontal: space.md, paddingVertical: 14, color: theme.ink, fontSize: font.s14 };
  const addProduct = () => {
    if (!canAdd) return;
    setError(null);
    addDecl.mutate({ order_id: order.id, website, category, price, currency }, { onSuccess: () => { setCategory(""); setPrice(""); }, onError: () => setError(ka ? "პროდუქტი ვერ დაემატა" : "Could not add the product") });
  };
  const submit = () => {
    if (!canDeclare) return;
    setError(null);
    declare.mutate({ orderId: order.id, declarationIds: items.map((d) => d.id), website }, { onSuccess: () => router.back(), onError: () => setError(ka ? "დეკლარირება ვერ მოხერხდა" : "Could not declare the parcel") });
  };

  return (
    <Screen>
      <View style={[styles.row, { gap: space.md }]}>
        <Pressable onPress={() => router.back()} hitSlop={12}><Ionicons name="chevron-back" size={24} color={theme.ink} /></Pressable>
        <Title>{ka ? "დეკლარირება" : "Declaration"}</Title>
      </View>
      <Card style={{ marginTop: space.lg }}>
        <View style={[styles.row, { gap: space.md }]}>
          <KraftBox size={50} />
          <View style={{ flex: 1, minWidth: 0 }}>
            <Body weight="700" numberOfLines={1}>{order.name ?? "—"}</Body>
            <Body muted size={font.s12} numberOfLines={1}>{order.tracking_number} {order.weight ? `· ${order.weight} kg` : ""}</Body>
          </View>
          <Pressable onPress={() => { setNewName(order.name ?? ""); setRenaming(true); }} hitSlop={8}><Ionicons name="create-outline" size={19} color={theme.faint} /></Pressable>
        </View>
        {declared ? <View style={{ marginTop: space.md, alignSelf: "flex-start" }}><Pill text={ka ? "დეკლარირებულია" : "Declared"} tone="ok" /></View> : null}
      </Card>

      <SectionLabel>{ka ? "ვებგვერდი" : "Website"}</SectionLabel>
      <TourTarget id="declare.website">
        <Pressable onPress={() => setSiteSheet(true)} disabled={declared}>
          <Card style={{ opacity: declared ? 0.6 : 1 }}>
            <View style={styles.between}>
              <Body size={font.s14} numberOfLines={1} style={{ color: website ? theme.ink : theme.faint, flex: 1, minWidth: 0 }}>{website || (ka ? "აირჩიე მაღაზია" : "Choose a store")}</Body>
              <Ionicons name="chevron-down" size={17} color={theme.faint} />
            </View>
          </Card>
        </Pressable>
      </TourTarget>

      <SectionLabel>{ka ? "პროდუქტები" : "Products"}</SectionLabel>
      {items.length ? (
        <Card style={{ paddingVertical: 0, marginBottom: space.md }}>
          {items.map((d, i) => (
            <View key={d.id}>
              {i > 0 ? <Divider /> : null}
              <View style={[styles.row, { gap: space.md, paddingVertical: 13 }]}>
                <View style={{ flex: 1, minWidth: 0 }}>
                  <Body weight="600" size={font.s13} numberOfLines={1}>{d.category}</Body>
                  <Body muted size={font.s11} numberOfLines={1}>{d.currency === "USD" ? "$" : "CN¥"}{d.price} · {d.website}</Body>
                </View>
                {declared ? null : <Pressable onPress={() => delDecl.mutate(d.id)} hitSlop={8}><Ionicons name="trash-outline" size={18} color={theme.red} /></Pressable>}
              </View>
            </View>
          ))}
        </Card>
      ) : null}
      {declared ? null : (
        <TourTarget id="declare.product">
          <Card>
            <Body weight="700" size={font.s13}>{ka ? "ახალი პროდუქტი" : "Add a product"}</Body>
            <Body muted size={font.s11} style={{ marginTop: 2 }}>{ka ? "ფასი უნდა ემთხვეოდეს ინვოისში მითითებულს" : "The price must match the invoice"}</Body>
            <Pressable onPress={() => setCatSheet(true)}>
              <View style={{ ...field, marginTop: space.md, flexDirection: "row", alignItems: "center" }}>
                <Body size={font.s14} numberOfLines={1} style={{ color: category ? theme.ink : theme.faint, flex: 1, minWidth: 0 }}>{category || (ka ? "აირჩიე კატეგორია" : "Choose a category")}</Body>
                <Ionicons name="chevron-down" size={17} color={theme.faint} />
              </View>
            </Pressable>
            <TextInput value={price} onChangeText={setPrice} keyboardType="decimal-pad" placeholder={`${ka ? "ღირებულება" : "Amount"} (${sym})`} placeholderTextColor={theme.faint} style={{ ...field, marginTop: space.sm }} />
            <Btn label={ka ? "პროდუქტის დამატება" : "Add this product"} icon="add" variant="outline" disabled={!canAdd} loading={addDecl.isPending} onPress={addProduct} style={{ marginTop: space.md }} />
          </Card>
        </TourTarget>
      )}

      <SectionLabel>{ka ? "სერვისები" : "Active services"}</SectionLabel>
      <Card style={{ paddingVertical: 0 }}>
        <ToggleRow icon="shield-checkmark-outline" title={ka ? "დაზღვევა" : "Parcel insurance"} subtitle={ka ? "ყოველთვის ჩართულია" : "Always included"} value disabled onValueChange={() => {}} />
        <Divider />
        <ToggleRow icon="cube-outline" title={ka ? "გადაფუთვა" : "Free repacking"} subtitle={ka ? "ამცირებს მოცულობით წონას" : "Reduces volumetric weight"} value={order.wrapping !== false} onValueChange={(v) => wrapping.mutate({ orderId: order.id, wrapping: v })} />
      </Card>
      {error ? (
        <View style={[styles.row, { gap: 6, marginTop: space.md }]}>
          <Ionicons name="alert-circle" size={15} color={theme.red} />
          <Body size={font.s12} style={{ color: theme.red, flex: 1, minWidth: 0 }}>{error}</Body>
        </View>
      ) : null}
      {declared ? null : (
        <TourTarget id="declare.submit" style={{ marginTop: space.xl }}>
          <Btn label={ka ? "ამანათის დეკლარირება" : "Declare parcel"} icon="document-text-outline" disabled={!canDeclare} loading={declare.isPending} onPress={submit} />
        </TourTarget>
      )}

      <OptionSheet visible={siteSheet} title={ka ? "აირჩიე მაღაზია" : "Choose a store"} options={shops ?? []} onPick={(v) => { setSite(v); setSiteSheet(false); }} onClose={() => setSiteSheet(false)} />
      <OptionSheet visible={catSheet} title={ka ? "აირჩიე კატეგორია" : "Choose a category"} options={categories} onPick={(v) => { setCategory(v); setCatSheet(false); }} onClose={() => setCatSheet(false)} />
      <Modal visible={renaming} transparent animationType="fade">
        <Pressable onPress={() => setRenaming(false)} style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: space.xl }}>
          <Pressable style={{ backgroundColor: theme.cream, borderRadius: 22, padding: space.xl }}>
            <Body weight="700" size={font.s16}>{ka ? "სახელის შეცვლა" : "Rename parcel"}</Body>
            <TextInput value={newName} onChangeText={setNewName} style={{ ...field, marginTop: space.md }} />
            <View style={{ flexDirection: "row", gap: space.sm, marginTop: space.lg }}>
              <Btn label={ka ? "გაუქმება" : "Cancel"} variant="outline" onPress={() => setRenaming(false)} style={{ flexGrow: 1, flexBasis: 0 }} />
              <Btn label={ka ? "შენახვა" : "Save"} onPress={() => { rename.mutate({ orderId: order.id, name: newName }); setRenaming(false); }} style={{ flexGrow: 1, flexBasis: 0 }} />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}
