// Dial codes and phone helpers (ported from the original bundle, module 1137).
export type PhoneValue = { country: string; number: string };
export type DialCode = { code: string; dial: string; flag: string; name: string; nameKa: string; digits?: number };

export const DIAL_CODES: DialCode[] = [
  { code: "GE", dial: "+995", flag: "🇬🇪", name: "Georgia", nameKa: "საქართველო", digits: 9 },
  { code: "US", dial: "+1", flag: "🇺🇸", name: "USA", nameKa: "აშშ", digits: 10 },
  { code: "TR", dial: "+90", flag: "🇹🇷", name: "Türkiye", nameKa: "თურქეთი", digits: 10 },
  { code: "DE", dial: "+49", flag: "🇩🇪", name: "Germany", nameKa: "გერმანია" },
  { code: "GB", dial: "+44", flag: "🇬🇧", name: "United Kingdom", nameKa: "დიდი ბრიტანეთი", digits: 10 },
  { code: "UA", dial: "+380", flag: "🇺🇦", name: "Ukraine", nameKa: "უკრაინა", digits: 9 },
  { code: "AM", dial: "+374", flag: "🇦🇲", name: "Armenia", nameKa: "სომხეთი", digits: 8 },
  { code: "AZ", dial: "+994", flag: "🇦🇿", name: "Azerbaijan", nameKa: "აზერბაიჯანი", digits: 9 },
  { code: "IL", dial: "+972", flag: "🇮🇱", name: "Israel", nameKa: "ისრაელი", digits: 9 },
  { code: "GR", dial: "+30", flag: "🇬🇷", name: "Greece", nameKa: "საბერძნეთი", digits: 10 },
  { code: "IT", dial: "+39", flag: "🇮🇹", name: "Italy", nameKa: "იტალია" },
  { code: "FR", dial: "+33", flag: "🇫🇷", name: "France", nameKa: "საფრანგეთი", digits: 9 },
  { code: "ES", dial: "+34", flag: "🇪🇸", name: "Spain", nameKa: "ესპანეთი", digits: 9 },
  { code: "PL", dial: "+48", flag: "🇵🇱", name: "Poland", nameKa: "პოლონეთი", digits: 9 },
  { code: "RU", dial: "+7", flag: "🇷🇺", name: "Russia", nameKa: "რუსეთი", digits: 10 },
  { code: "CN", dial: "+86", flag: "🇨🇳", name: "China", nameKa: "ჩინეთი", digits: 11 },
];

export const dialOf = (code: string) => DIAL_CODES.find((d) => d.code === code) ?? DIAL_CODES[0];

export function isPhoneValid(v: PhoneValue) {
  const n = v.number.replace(/\D/g, "");
  const d = dialOf(v.country);
  return d.digits ? n.length === d.digits : n.length >= 6 && n.length <= 12;
}

export function groupDigits(country: string, number: string) {
  const n = number.replace(/\D/g, "");
  const groups = country === "GE" ? [3, 2, 2, 2] : [3, 3, 4];
  const out: string[] = [];
  let i = 0;
  for (const g of groups) {
    if (i >= n.length) break;
    out.push(n.slice(i, i + g));
    i += g;
  }
  if (i < n.length) out.push(n.slice(i));
  return out.join(" ");
}

export const formatPhone = (v: PhoneValue) => `${dialOf(v.country).dial} ${groupDigits(v.country, v.number)}`;

export function parsePhone(raw: string | undefined | null, fallback = "GE"): PhoneValue {
  const digits = (raw ?? "").replace(/\D/g, "");
  if (!(raw ?? "").trim().startsWith("+")) return { country: fallback, number: digits };
  const hit = [...DIAL_CODES].sort((a, b) => b.dial.length - a.dial.length).find((d) => digits.startsWith(d.dial.slice(1)));
  return hit ? { country: hit.code, number: digits.slice(hit.dial.length - 1) } : { country: fallback, number: digits };
}
