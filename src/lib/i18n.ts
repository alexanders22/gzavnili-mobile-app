import { useSettings, type Lang } from "./settings";

const STRINGS = {
  home: { ka: "მთავარი", en: "Home" },
  parcels: { ka: "ამანათები", en: "Parcels" },
  shop: { ka: "შოპინგი", en: "Shop" },
  send: { ka: "გაგზავნა", en: "Send" },
  more: { ka: "მეტი", en: "More" },
  greeting: { ka: "გამარჯობა", en: "Hello" },
  homeSub: { ka: "აი, რა ხდება შენს გზავნილებში.", en: "Here's what's happening with your shipments." },
  walletBalance: { ka: "ბალანსი", en: "Wallet balance" },
  wallet: { ka: "საფულე", en: "Wallet" },
  loyaltyPoints: { ka: "ლოიალობის ქულები", en: "Loyalty points" },
  topUp: { ka: "შევსება", en: "Top up" },
  room: { ka: "ოთახი", en: "Room" },
  yourUsAddress: { ka: "შენი აშშ მისამართი", en: "Your US address" },
  copy: { ka: "კოპირება", en: "Copy" },
  copied: { ka: "დაკოპირდა", en: "Copied" },
  viewAll: { ka: "ყველა", en: "View all" },
  inTransit: { ka: "გზაშია", en: "in transit" },
  myParcels: { ka: "ჩემი ამანათები", en: "My Parcels" },
  all: { ka: "ყველა", en: "All" },
  awaiting: { ka: "მისაღები", en: "Awaiting" },
  inWarehouse: { ka: "საწყობში", en: "In warehouse" },
  onItsWay: { ka: "გზაში", en: "On it's way" },
  arrived: { ka: "ჩამოსული", en: "Arrived" },
  received: { ka: "მიღებული", en: "Received" },
  addTracking: { ka: "თრექინგის დამატება", en: "Add tracking" },
  noParcels: { ka: "ამანათები არ გაქვს", en: "No parcels yet" },
  noParcelsSub: { ka: "დაამატე თრექინგ კოდი და ადევნე თვალი თითოეულ ეტაპს", en: "Add a tracking code and follow every step" },
  declare: { ka: "დეკლარაცია", en: "Declare" },
  track: { ka: "ლოკაცია", en: "Track" },
  customs: { ka: "განბაჟება", en: "Customs" },
  delivery: { ka: "მიწოდება", en: "Delivery" },
  pay: { ka: "გადაიხადე", en: "Pay" },
  paid: { ka: "გადახდილია", en: "Paid" },
  settings: { ka: "პარამეტრები", en: "Settings" },
  appearance: { ka: "გარეგნობა", en: "Appearance" },
  light: { ka: "ნათელი", en: "Light" },
  dark: { ka: "ბნელი", en: "Dark" },
  matchDevice: { ka: "მოწყობილობის მიხედვით", en: "Match device" },
  language: { ka: "ენა", en: "Language" },
  modules: { ka: "მოდულები", en: "Modules" },
  modulesSub: { ka: "აირჩიე რომელი სერვისები გინდა აპლიკაციაში", en: "Choose which services appear in the app" },
  notifications: { ka: "შეტყობინებები", en: "Notifications" },
  notifParcels: { ka: "ამანათის სტატუსი", en: "Parcel updates" },
  notifPromos: { ka: "აქციები და სიახლეები", en: "Promos & news" },
  notifLoyalty: { ka: "ლოიალობის ქულები", en: "Loyalty points" },
  signOut: { ka: "გასვლა", en: "Sign out" },
  demoData: { ka: "სადემონსტრაციო მონაცემები", en: "Demo data" },
  signIn: { ka: "ანგარიშზე შესვლა", en: "Sign in" },
  email: { ka: "მეილი", en: "Email" },
  password: { ka: "პაროლი", en: "Password" },
  continue: { ka: "გაგრძელება", en: "Continue" },
  signInError: { ka: "შესვლა ვერ მოხერხდა. შეამოწმე მონაცემები.", en: "Sign in failed. Check your details." },
  assistant: { ka: "ასისტენტი", en: "Assistant" },
  askAnything: { ka: "მკითხე რამე...", en: "Ask me anything…" },
} as const;

export type TKey = keyof typeof STRINGS;

export function translate(key: TKey, lang: Lang): string {
  return STRINGS[key]?.[lang] ?? STRINGS[key]?.en ?? String(key);
}

export function useT() {
  const lang = useSettings((s) => s.lang);
  return (key: TKey) => translate(key, lang);
}

export const useLang = () => useSettings((s) => s.lang);
