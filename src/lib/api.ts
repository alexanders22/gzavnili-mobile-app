// Thin fetch client that mirrors the original axios setup: Bearer token from storage,
// 401 → clear token and go to sign-in. Set EXPO_PUBLIC_DEMO=1 to serve from the demo adapter.
import { router } from "expo-router";
import { clearToken, getToken } from "./token";
import { DEMO, demoRequest } from "./demo";

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "https://openbanking.brandrepublic.ge/mobileapps-api";
export const AUTH_URL = API_URL;

export type ApiError = Error & { response?: { status: number; data?: any } };

export const mediaUrl = (u?: string | null) => (u ? (/^https?:/.test(u) ? u : `${API_URL}${u}`) : null);

export function apiError(e: unknown, fallback: string) {
  const m = (e as ApiError)?.response?.data?.message;
  return typeof m === "string" && m.length < 200 ? m : fallback;
}

let redirecting = false;

async function request<T = any>(method: string, path: string, body?: unknown, opts: { auth?: boolean; timeout?: number; params?: Record<string, string> } = {}): Promise<T> {
  if (DEMO) return demoRequest(method, path, body) as T;
  const url = new URL(API_URL + path);
  if (opts.params) for (const [k, v] of Object.entries(opts.params)) url.searchParams.set(k, v);
  const headers: Record<string, string> = { Accept: "application/json" };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (opts.auth !== false) {
    const t = await getToken();
    if (t) headers.Authorization = `Bearer ${t}`;
  }
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), opts.timeout ?? 15000);
  try {
    const res = await fetch(url.toString(), { method: method.toUpperCase(), headers, body: body === undefined ? undefined : JSON.stringify(body), signal: ctrl.signal });
    const text = await res.text();
    const data = text ? safeJson(text) : undefined;
    if (!res.ok) {
      if (res.status === 401 && opts.auth !== false && !redirecting) {
        redirecting = true;
        await clearToken();
        router.replace("/sign-in");
        setTimeout(() => (redirecting = false), 1000);
      }
      const err: ApiError = Object.assign(new Error(`HTTP ${res.status}`), { response: { status: res.status, data } });
      throw err;
    }
    return data as T;
  } finally {
    clearTimeout(timer);
  }
}

const safeJson = (t: string) => { try { return JSON.parse(t); } catch { return t; } };

export const api = {
  get: <T = any>(p: string, o?: { params?: Record<string, string> }) => request<T>("get", p, undefined, o),
  post: <T = any>(p: string, b?: unknown, o?: { timeout?: number }) => request<T>("post", p, b, o),
  put: <T = any>(p: string, b?: unknown) => request<T>("put", p, b),
  delete: <T = any>(p: string) => request<T>("delete", p),
};
export const authApi = {
  post: <T = any>(p: string, b?: unknown) => request<T>("post", p, b, { auth: false }),
  get: <T = any>(p: string) => request<T>("get", p, undefined, { auth: false }),
};
export const paymentsApi = api;
