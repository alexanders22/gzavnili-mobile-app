// Data hooks (react-query) — the subset the skeleton and the home screen need.
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, authApi } from "./api";
import { clearToken, setToken } from "./token";

export const USA_BRANCH_ID = "1ad52c30-2978-4fe0-9db4-ecbba1e04365";

export type Profile = {
  first_name_en?: string; last_name_en?: string; first_name_ka?: string; last_name_ka?: string;
  address_en?: string; address_ka?: string; city_en?: string; city_ka?: string; phone?: string;
};
export type Customer = {
  id: string; first_name?: string; last_name?: string; email?: string; phone?: string; room_number?: string; profile_complete?: boolean; wallet_balance?: number;
  profile?: Profile;
};
export type WarehouseAddress = { id: string; street: string; city: string; state?: string; country: string; zipCode: string; tel?: string };
export type LoyaltyTier = { name: string; emoji: string; from: number; rate: number };
export type LoyaltyReward = { id: string; title_ka: string; title_en: string; cost: number; available: boolean };
export type LoyaltyEntry = { id: string; label: string; points: number; created_at: string };
export type Loyalty = {
  points: number; tier: LoyaltyTier; next: LoyaltyTier | null; to_next: number; progress: number;
  tiers: LoyaltyTier[]; rewards: LoyaltyReward[]; active_rewards: LoyaltyReward[]; history: LoyaltyEntry[];
};
export type Reel = {
  id: string; tone: "green" | "blue" | "navy"; tagKa: string; tagEn: string; titleKa: string; titleEn: string;
  bodyKa?: string | null; bodyEn?: string | null; emoji?: string | null; media_type?: "image" | "video" | null; media_url?: string | null;
  cta_route?: string | null; seen?: boolean;
};
export type OrderButtons = {
  declaration_enable?: boolean; custom_enable?: boolean; custom_right_icon_enable?: boolean; delivery_enable?: boolean;
  payment_enable?: boolean; is_payment_invoice_enabled?: boolean;
};
export type Declaration = { id: string; order_id?: string; website: string; category: string; price: string; currency: string; status?: string };
export type Order = {
  id: string; name?: string | null; tracking_number?: string | null; status: string; group: string; weight?: string | null; price?: string | null;
  payed?: boolean; declaration_status?: string | null; delivery_status?: string | null; delivery_method?: string | null; pickup_status?: string | null;
  timeSlot?: string | null; points_awarded?: number | null; buttons?: OrderButtons;
  courier_delivery?: boolean; delivery_paid?: boolean; pickup_location?: PickupLocation | null; custom_status?: string | null; NeedsCustom?: boolean;
  custom_fee?: { custom_fee_amount?: string | null } | null; declaration?: Declaration[]; wrapping?: boolean; nusxa?: string | null; branch?: { name?: string } | null;
};
export type CustomerAddress = {
  id: string; address: string; title?: string; tag?: string; city?: string; additionalInstructions?: string; isDefault?: boolean;
  lat?: string | number; lang?: string | number;
};
export type WorkingHours = { day: string; is_active: boolean; opens_at?: string | null; closes_at?: string | null };
export type PickupLocation = {
  id: string; alias?: string; alias_ka?: string; address: string; address_ka?: string; phone?: string; latitude: number; longitude: number;
  is_default?: boolean; additional_info?: string | null; working_hours: WorkingHours[];
};
export type Recipient = { id: string; first_name?: string; last_name?: string; name_en?: string; name_ka?: string; phone: string; new_profile?: boolean };
export type OutgoingCountry = { code?: string; flag: string; name: string; nameKa: string };
export type Outgoing = {
  id: string; status: string; tracking_number: string; weight: string | number; price?: string | number | null; destination?: string;
  destination_country?: OutgoingCountry | null; recipient_name?: string | null; recipients?: { name_en?: string; name_ka?: string }[];
};

export function useLogin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { username: string; password: string }) => {
      const data = await authApi.post("/v1/auth/login", body);
      if (!data?.access_token) throw new Error("No token returned");
      await setToken(data.access_token);
      return data;
    },
    onSuccess: () => qc.clear(),
  });
}

export function useRegister() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { email: string; password: string; referral_code?: string }) => {
      const data = await authApi.post("/v1/auth/register", body);
      if (!data?.access_token) throw new Error("No token returned");
      await setToken(data.access_token);
      return data;
    },
    onSuccess: () => qc.clear(),
  });
}

export function useReferralCheck(code: string) {
  const c = code.trim();
  return useQuery({
    queryKey: ["referralCheck", c.toUpperCase()],
    enabled: c.length >= 6,
    retry: false,
    queryFn: () => authApi.get(`/v1/auth/referral/${encodeURIComponent(c)}`),
  });
}

export async function signOut() { await clearToken(); }
export function useSignOut() {
  const qc = useQueryClient();
  return async () => { await clearToken(); qc.clear(); };
}

export const useCustomer = () =>
  useQuery<Customer>({ queryKey: ["customer"], refetchInterval: 8000, retry: false, queryFn: () => api.get("/customers/search/userId") });

export const useStatusQuantity = (customerId?: string) =>
  useQuery<Record<string, number>>({
    queryKey: ["statusQuantity", customerId], enabled: !!customerId, refetchInterval: 8000,
    queryFn: async () => (await api.get(`/orders/statusQuantity/${customerId}`)) ?? {},
  });

export const useOrders = (status: string) =>
  useQuery<Order[]>({ queryKey: ["orders", status], refetchInterval: 8000, queryFn: async () => (await api.get(`/orders/filterByStatys/${status}`)) ?? [] });

export const useUnpaidOrders = (customerId?: string) =>
  useQuery<Order[]>({
    queryKey: ["unpaid", customerId], enabled: !!customerId, retry: false,
    queryFn: async () => { const d = await api.get(`/orders/getUnpaidOrders/${customerId}`); return Array.isArray(d) ? d : []; },
  });

export const useWarehouseAddresses = () =>
  useQuery<WarehouseAddress[]>({ queryKey: ["addresses"], queryFn: async () => (await api.get("/addresses")) ?? [] });

export type WalletCard = { id: string; maskedPan: string; cardType: string; isDefault?: boolean; expiryDate?: string };
export type WalletTx = { id: string; kind: "parcel" | "outgoing" | "topup"; status: "COMPLETED" | "PENDING" | "REJECTED" | string; amount: number | string; created_at: string };
export type Wallet = { balance: number; cards: WalletCard[]; transactions: WalletTx[] };
export const useWallet = () => useQuery<Wallet>({ queryKey: ["wallet"], queryFn: () => api.get("/wallet") });

export function useTopUp() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (amount: number) => (await api.post("/wallet/topup", { amount })) as { balance: number },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["wallet"] }); qc.invalidateQueries({ queryKey: ["customer"] }); },
  });
}
export const useLoyalty = () => useQuery<Loyalty>({ queryKey: ["loyalty"], queryFn: () => api.get("/loyalty") });

export function useRedeemReward() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (rewardId: string) => (await api.post("/loyalty/redeem", { reward_id: rewardId })) as Loyalty,
    onSuccess: (data) => { qc.setQueryData(["loyalty"], data); qc.invalidateQueries({ queryKey: ["customer"] }); },
  });
}
export const useReels = () =>
  useQuery<Reel[]>({ queryKey: ["reels"], queryFn: async () => { const d = await api.get("/reels"); return Array.isArray(d) ? d : []; } });

export function useMarkReelSeen() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => { await api.post(`/reels/${id}/view`); return id; },
    onSuccess: (id) => qc.setQueryData<Reel[]>(["reels"], (r) => r?.map((x) => (x.id === id ? { ...x, seen: true } : x))),
  });
}

export const useOutgoing = () =>
  useQuery<Outgoing[]>({ queryKey: ["outgoing"], refetchInterval: 8000, queryFn: async () => { const d = await api.get("/outgoing"); return Array.isArray(d) ? d : []; } });

/* ---------------- price calculator ---------------- */
export type CalcOrigin = { code: string; name: string; nameKa: string; flag: string; days: string; currency: string };
export type CalcCountry = { code: string; name: string; nameKa: string; flag: string; days: string; perKg: number };
export type CalcMeta = {
  origins: CalcOrigin[]; countries: CalcCountry[]; max_weight: number; fx: Record<string, number>;
  fees: { delivery: number; repack: number; pickup: number; customs_threshold: number; customs_rate: number };
};
export type CalcParams = { direction: "in" | "out"; origin: string; country: string; weight: number; value: number; courier: boolean; repack: boolean };
export type CalcQuote = {
  direction: "in" | "out"; weight: number; rate: number; days: string; total: number; points: number;
  lines: { key: string; amount: number }[]; customs: { required: boolean; value_gel: number; threshold: number; rate: number } | null;
};

export const useCalculatorMeta = () => useQuery<CalcMeta>({ queryKey: ["calculatorMeta"], staleTime: Infinity, queryFn: () => api.get("/calculator/meta") });
export const useCalculatorQuote = (params: CalcParams) =>
  useQuery<CalcQuote>({ queryKey: ["calculator", params], placeholderData: keepPreviousData, staleTime: 60_000, queryFn: () => api.post("/calculator", params) });

export type DemoTracking = { carrier: string; tracking_number: string; name: string; origin: "usa" | "china" };
/** A fresh demo tracking number from the backend (the web demo "scans" one). */
export function useDemoTracking() {
  return useMutation({ mutationFn: async (carrier?: string) => (await api.get("/tracking/demo", carrier ? { params: { carrier } } : undefined)) as DemoTracking });
}

/* ---------------- assistant ---------------- */
export type ChatMessage = { from: "me" | "ai"; text: string; tools?: string[]; guide?: string; error?: boolean };
export type ChatReply = { reply: string; tools?: string[]; guide?: string | null };
export function useAssistantChat() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (body: { message: string; history: ChatMessage[]; lang: string }) =>
      (await api.post("/assistant/chat", { ...body, history: body.history.filter((m) => !m.error) }, { timeout: 60_000 })) as ChatReply,
    onSuccess: (r) => { if (r.tools?.includes("add_incoming_parcel")) { qc.invalidateQueries({ queryKey: ["orders"] }); qc.invalidateQueries({ queryKey: ["statusQuantity"] }); } },
  });
}

/* ---------------- referral ---------------- */
export type ReferralFriend = { id: string; name: string; state: "credited" | "pending"; points: number; joined_at: string; credited_at?: string | null };
export type Referral = { code: string; link: string; bonus: number; earned: number; friends: ReferralFriend[] };
export const useReferral = () => useQuery<Referral>({ queryKey: ["referral"], queryFn: () => api.get("/referral") });

// Profile — PUT /customers/me replaces the customer in the cache; POST /ai/translate fills the other language.
export function useUpdateProfile() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (p: Profile) => api.put<Customer>("/customers/me", p),
    onSuccess: (c) => { qc.setQueryData(["customer"], c); qc.invalidateQueries({ queryKey: ["customerAddresses"] }); },
  });
}
export type TranslateResult = { result: Record<string, { en?: string; ka?: string }>; source: "ai" | "offline" | "none" };
export function useTranslateFields() {
  return useMutation({ mutationFn: (items: Record<string, string>) => api.post<TranslateResult>("/ai/translate", { items }) });
}

/* ---------------- parcel forms: add, declare, customs, delivery, pay ---------------- */
const invalidateOrders = (qc: ReturnType<typeof useQueryClient>) => {
  qc.invalidateQueries({ queryKey: ["orders"] });
  qc.invalidateQueries({ queryKey: ["statusQuantity"] });
  qc.invalidateQueries({ queryKey: ["unpaid"] });
};

/** One order out of the status list the parcel cards come from (same cache, no extra request). */
export function useOrderFromList(status: string, id?: string) {
  const q = useOrders(status);
  return { ...q, data: q.data?.find((o) => o.id === id) };
}

export const useCustomerAddresses = () =>
  useQuery<CustomerAddress[]>({ queryKey: ["customerAddresses"], queryFn: async () => { const d = await api.get("/customer-addresses/customerAdress"); return Array.isArray(d) ? d : []; } });

export function useCreateAddress() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (a: { address: string; city: string; title: string; lat: number; lng: number }) => api.post<CustomerAddress>("/customer-addresses", a),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["customerAddresses"] }),
  });
}

export type NewOrder = { tracking_number: string; name: string; customer_id: string; country: "usa" | "china"; courier?: boolean; delivery_address?: string; wrapping?: boolean; recipients?: unknown[] };
export function useAddOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (o: NewOrder) =>
      api.post<Order>("/orders", {
        tracking_number: o.tracking_number.replace(/\s/g, ""), name: o.name, customer_id: o.customer_id, custom_status: "0", status: "AWAITING",
        wrapping: o.wrapping ?? true, country: o.country, recipients: o.recipients ?? [], courier: o.courier ?? true, delivery_address: o.delivery_address,
        ...(o.country === "usa" ? { branch_id: USA_BRANCH_ID } : {}),
      }),
    onSuccess: () => invalidateOrders(qc),
  });
}

export const useRecipients = () =>
  useQuery<Recipient[]>({ queryKey: ["recipients"], queryFn: async () => { const d = await api.get("/recipients"); return Array.isArray(d) ? d : []; } });

export const useTimeSlots = () =>
  useQuery<{ today: string[]; tomorrow: string[] }>({ queryKey: ["timeSlots"], queryFn: async () => { const d = await api.get("/district/timeSlots"); return { today: d?.today ?? [], tomorrow: d?.tomorrow ?? [] }; } });

export const useDistrict = (lat?: string | number, lng?: string | number) =>
  useQuery<string | null>({ queryKey: ["district", lat, lng], enabled: !!lat && !!lng, retry: false, queryFn: async () => (await api.get(`/district/find?lat=${lat}&lng=${lng}`)) ?? null });

export function useBookDelivery() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, ...body }: { orderId: string; timeSlot: string; day: string; do_not_ring_bell: boolean; leave_by_door: boolean }) => api.put(`/orders/time-slot-update/${orderId}`, body),
    onSuccess: () => invalidateOrders(qc),
  });
}

export function useSetCourier() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, ...body }: { orderId: string; courier: boolean; delivery_address?: string; pickup_location_id?: string }) => api.put(`/orders/courier/${orderId}`, body),
    onSuccess: () => invalidateOrders(qc),
  });
}

export const useCards = () =>
  useQuery<WalletCard[]>({ queryKey: ["cards"], retry: false, queryFn: async () => { const d = await api.get("/payments/cards"); return Array.isArray(d) ? d : []; } });

export type OrderPriceTotals = { totalWeightCost: number; repackagingCost: number; insuranceCost: number; delivery_fee: number; service_fee: number; customFee: number; discountAmount: number; totalPrice: number };
export const useOrderPrices = (orderIds: string[], addressId?: string, officePickup?: boolean) =>
  useQuery<{ perOrder: unknown[]; totals: OrderPriceTotals | null }>({
    queryKey: ["orderPrices", orderIds, addressId, officePickup], enabled: orderIds.length > 0 && (!!addressId || officePickup === true),
    queryFn: async () => {
      const d = await api.post("/orders/getOrderPrices", { orders: orderIds, address_id: addressId, payed: false, ...(officePickup !== undefined ? { office_pickup: officePickup } : {}) });
      return { perOrder: d?.[0] ?? [], totals: d?.[1]?.[0] ?? null };
    },
  });

export const usePayOrders = () =>
  useMutation({ mutationFn: (body: { card: string; customer_id: string; order_ids: string[]; address_id?: string; pickup_location_id?: string }) => api.post("/transactions", body) });

/** Polls the payment status a few times after a transaction; resolves to COMPLETED, REJECTED or PENDING. */
export function usePaymentStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, address_id }: { orderId: string; address_id?: string }) => {
      for (let i = 0; i < 5; i++) {
        const d = await api.post(`/orders/order_payment_status/${orderId}`, { address_id });
        const s = String(d?.payStatus ?? d?.status ?? "").toUpperCase();
        if (s === "COMPLETED" || s === "REJECTED") return s;
        await new Promise((r) => setTimeout(r, 3000));
      }
      return "PENDING";
    },
    onSuccess: () => { invalidateOrders(qc); qc.invalidateQueries({ queryKey: ["customer"] }); qc.invalidateQueries({ queryKey: ["wallet"] }); },
  });
}

export const useNusxaBundle = (id?: string) =>
  useQuery<Order[]>({ queryKey: ["nusxa", id], enabled: !!id, retry: false, queryFn: async () => { const d = await api.get(`/orders/getByNusxa/${id}`); return Array.isArray(d) ? d : []; } });

export function useUpdateCustomStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, ...body }: { orderId: string; custom_status: string; DeclarationPaymentAuto?: boolean }) => api.put(`/orders/nusxa_update/${orderId}`, body),
    onSuccess: () => { invalidateOrders(qc); qc.invalidateQueries({ queryKey: ["nusxa"] }); },
  });
}

export const useSignatureLink = () =>
  useMutation({ mutationFn: async (orderId: string) => ((await api.get(`/signify/template/${orderId}`))?.url ?? null) as string | null });

export const useShops = () =>
  useQuery<string[]>({ queryKey: ["shops"], staleTime: Infinity, queryFn: async () => { const d = await api.get("/shops/getShops"); return Array.isArray(d) ? d.map((x: any) => (typeof x === "string" ? x : x?.shop)).filter((x: unknown): x is string => typeof x === "string" && x.length > 0) : []; } });

export type ContentItem = { identifier: string; nameEn: string; nameKa: string; page?: string };
export const useContent = () =>
  useQuery<ContentItem[]>({ queryKey: ["content"], staleTime: Infinity, gcTime: Infinity, queryFn: async () => { const d = await api.get("/content-management"); return Array.isArray(d) ? d : []; } });

/** Declaration categories Category_1 … Category_25 from the CMS, in the current language. */
export function useCategories(lang: "en" | "ka") {
  const { data } = useContent();
  if (!data) return [] as string[];
  return Array.from({ length: 25 }, (_, i) => {
    const c = data.find((x) => x.identifier === `Category_${i + 1}`);
    return (c && (lang === "ka" ? c.nameKa : c.nameEn)) || null;
  }).filter((x): x is string => !!x);
}

export function useAddDeclaration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (d: { order_id: string; website: string; category: string; price: string; currency: string }) => api.post<Declaration>("/declarations", { ...d, status: "Declared" }),
    onSuccess: () => invalidateOrders(qc),
  });
}
export function useDeleteDeclaration() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: (id: string) => api.delete(`/declarations/${id}`), onSuccess: () => invalidateOrders(qc) });
}
export function useDeclareOrder() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ orderId, declarationIds, website }: { orderId: string; declarationIds: string[]; website: string }) => {
      await api.put(`/orders/${orderId}`, { declaration_status: "DECLERED" });
      await Promise.all(declarationIds.map((id) => api.put(`/declarations/${id}`, { website })));
    },
    onSuccess: () => invalidateOrders(qc),
  });
}
export function useUpdateWrapping() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ orderId, wrapping }: { orderId: string; wrapping: boolean }) => api.put(`/orders/wrapping-update/${orderId}`, { wrapping }), onSuccess: () => invalidateOrders(qc) });
}
export function useRenameOrder() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ orderId, name }: { orderId: string; name: string }) => api.put(`/orders/${orderId}`, { name }), onSuccess: () => invalidateOrders(qc) });
}

/* ---------------- outgoing ---------------- */
export type OutCountry = { code: string; name: string; nameKa: string; flag: string; days: string; perKg: number };
export const useOutCountries = () =>
  useQuery<{ countries: OutCountry[]; base_fee: number; pickup_fee: number }>({ queryKey: ["outCountries"], staleTime: Infinity, queryFn: () => api.get("/outgoing/countries") });

export type NewOutgoing = {
  country: string; weight: number; pickup: boolean; pickup_address?: string; recipient_name: string; recipient_address: string; recipient_phone?: string; contents?: string;
  recipients: { first_name: string; last_name: string; dial: string; phone: string }[];
};
export function useCreateOutgoing() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (o: NewOutgoing) => api.post<Outgoing & { recipients?: Recipient[] }>("/outgoing", o),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ["outgoing"] }); qc.invalidateQueries({ queryKey: ["recipients"] }); qc.invalidateQueries({ queryKey: ["wallet"] }); },
  });
}

/* ---------------- pickup offices ---------------- */
export const usePickupLocations = () =>
  useQuery<PickupLocation[]>({ queryKey: ["pickupLocations"], staleTime: 300_000, queryFn: async () => (await api.get("/pickup-locations/active")) ?? [] });
export function useSetPickupLocation() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, pickup_location_id }: { orderId: string; pickup_location_id: string }) => api.put(`/orders/pickup-location-update/${orderId}`, { pickup_location_id }),
    onSuccess: () => invalidateOrders(qc),
  });
}
