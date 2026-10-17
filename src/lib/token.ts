import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "gz.access_token";
let cached: string | null | undefined;

export async function getToken() {
  if (cached !== undefined) return cached;
  try { cached = (await AsyncStorage.getItem(KEY)) ?? null; } catch { cached = null; }
  return cached;
}
export async function setToken(t: string) {
  cached = t;
  try { await AsyncStorage.setItem(KEY, t); } catch {}
}
export async function clearToken() {
  cached = null;
  try { await AsyncStorage.removeItem(KEY); } catch {}
}
export function decodeToken(t: string): any | null {
  try {
    const b = t.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return typeof atob === "function" ? JSON.parse(atob(b)) : null;
  } catch { return null; }
}
