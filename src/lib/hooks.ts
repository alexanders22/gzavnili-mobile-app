// Data hooks (react-query) — the subset the skeleton and the home screen need.
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, authApi } from "./api";
import { clearToken, setToken } from "./token";

export const USA_BRANCH_ID = "1ad52c30-2978-4fe0-9db4-ecbba1e04365";

export type Customer = {
  id: string; room_number?: string; profile_complete?: boolean; wallet_balance?: number;
  profile?: { first_name_ka?: string; first_name_en?: string; last_name_ka?: string; last_name_en?: string };
};
export type WarehouseAddress = { id: string; street: string; city: string; state?: string; country: string; zipCode: string; tel?: string };
export type Loyalty = { points: number; tier: { name: string; emoji: string }; progress: number };
export type Reel = { id: string; tone: "green" | "blue" | "navy"; tagKa: string; tagEn: string; titleKa: string; titleEn: string; emoji?: string | null; media_type?: "image" | "video" | null; media_url?: string | null; seen?: boolean };
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

export const useWallet = () => useQuery<{ balance: number }>({ queryKey: ["wallet"], queryFn: () => api.get("/wallet") });
export const useLoyalty = () => useQuery<Loyalty>({ queryKey: ["loyalty"], queryFn: () => api.get("/loyalty") });
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
