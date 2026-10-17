const FLAGS: Record<string, string> = {
  USA: "🇺🇸", US: "🇺🇸", China: "🇨🇳", CN: "🇨🇳", Georgia: "🇬🇪", GE: "🇬🇪", Germany: "🇩🇪", DE: "🇩🇪",
  "United Kingdom": "🇬🇧", GB: "🇬🇧", UK: "🇬🇧", Türkiye: "🇹🇷", Turkey: "🇹🇷", TR: "🇹🇷",
};
const KA: Record<string, string> = {
  USA: "აშშ", China: "ჩინეთი", Georgia: "საქართველო", Germany: "გერმანია", "United Kingdom": "დიდი ბრიტანეთი", Türkiye: "თურქეთი",
};
export const flagOf = (c?: string | null) => (c ? FLAGS[c] ?? "🏳️" : "🏳️");
export const countryName = (c: string, ka: boolean) => (ka ? KA[c] ?? c : c);
