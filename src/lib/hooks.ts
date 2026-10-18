// Data hooks (react-query) — the subset the skeleton and the home screen need.
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, authApi } from "./api";
import { clearToken, setToken } from "./token";

export const USA_BRANCH_ID = "1ad52c30-2978-4fe0-9db4-ecbba1e04365";

export type Customer = {
  id: string; first_name?: string; last_name?: string; room_number?: string; profile_complete?: boolean; wallet_balance?: number;
  profile?: { first_name_ka?: string; first_name_en?: string; last_name_ka?: string; last_name_en?: string };
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
export type Order = {
  id: string; name?: string | null; tracking_number?: string | null; status: string; group: string; weight?: string | null; price?: string | null;
  payed?: boolean; declaration_status?: string | null; delivery_status?: string | null; delivery_method?: string | null; pickup_status?: string | null;
  timeSlot?: string | null; points_awarded?: number | null; buttons?: OrderButtons;
};
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
