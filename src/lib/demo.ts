// Offline demo adapter: the same shapes the live API returns, so every screen renders
// without a backend. Enabled with EXPO_PUBLIC_DEMO=1.
export const DEMO = process.env.EXPO_PUBLIC_DEMO === "1";

const daysAgo = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString(); };

const customer = {
  id: "demo-customer",
  first_name: "Vasil", last_name: "Beridze", email: "vasil@example.com", phone: "+995 555 11 22 33",
  room_number: "GZ-1166", customerType: "PERSONAL", verified: true, repackaging: true,
  profile_complete: true, wallet_balance: 42.5,
  profile: {
    first_name_ka: "ვასილ", first_name_en: "Vasil", last_name_ka: "ბერიძე", last_name_en: "Beridze",
    address_en: "12 Rustaveli Ave, apt. 5", address_ka: "", city_en: "Tbilisi", city_ka: "თბილისი", phone: "+995 555 11 22 33",
  },
};

// Offline stand-in for the AI translator: a letter-by-letter transliteration Latin ↔ Georgian.
const KA_OF: Record<string, string> = { a: "ა", b: "ბ", g: "გ", d: "დ", e: "ე", v: "ვ", z: "ზ", t: "თ", i: "ი", k: "კ", l: "ლ", m: "მ", n: "ნ", o: "ო", p: "პ", r: "რ", s: "ს", u: "უ", f: "ფ", q: "ქ", y: "ყ", h: "ჰ", j: "ჯ", c: "ც", x: "ხ", w: "ვ" };
const KA_DIGRAPH: Record<string, string> = { sh: "შ", ch: "ჩ", ts: "ც", dz: "ძ", kh: "ხ", gh: "ღ", zh: "ჟ", ph: "ფ", th: "თ" };
const EN_OF: Record<string, string> = { ა: "a", ბ: "b", გ: "g", დ: "d", ე: "e", ვ: "v", ზ: "z", თ: "t", ი: "i", კ: "k", ლ: "l", მ: "m", ნ: "n", ო: "o", პ: "p", ჟ: "zh", რ: "r", ს: "s", ტ: "t", უ: "u", ფ: "p", ქ: "k", ღ: "gh", ყ: "q", შ: "sh", ჩ: "ch", ც: "ts", ძ: "dz", წ: "ts", ჭ: "ch", ხ: "kh", ჯ: "j", ჰ: "h" };
const KA_WORDS: Record<string, string> = { ave: "გამზ.", "ave,": "გამზ.,", avenue: "გამზირი", "st.": "ქ.", street: "ქუჩა", "apt.": "ბინა", apt: "ბინა", tbilisi: "თბილისი", batumi: "ბათუმი", kutaisi: "ქუთაისი", rustaveli: "რუსთაველის" };
const EN_WORDS: Record<string, string> = { "გამზ.": "Ave", გამზირი: "Avenue", "ქ.": "St.", ქუჩა: "Street", ბინა: "apt.", თბილისი: "Tbilisi", ბათუმი: "Batumi", ქუთაისი: "Kutaisi", რუსთაველის: "Rustaveli", "პრ.": "Ave" };
function toKa(text: string) {
  return text.split(/\s+/).map((w) => {
    const hit = KA_WORDS[w.toLowerCase()]; if (hit) return hit;
    let out = ""; const s = w.toLowerCase();
    for (let i = 0; i < s.length; i++) {
      const two = s.slice(i, i + 2);
      if (KA_DIGRAPH[two]) { out += KA_DIGRAPH[two]; i++; continue; }
      out += KA_OF[s[i]] ?? w[i];
    }
    return out;
  }).join(" ");
}
function toEn(text: string) {
  return text.split(/\s+/).map((w) => {
    const hit = EN_WORDS[w]; if (hit) return hit;
    const out = Array.from(w).map((ch) => EN_OF[ch] ?? ch).join("");
    return out ? out[0].toUpperCase() + out.slice(1) : out;
  }).join(" ");
}

const BUTTONS = {
  declaration_enable: false, custom_enable: false, custom_right_icon_enable: false, custom_right_double_icon_enable: false,
  delivery_enable: false, payment_enable: false, is_payment_invoice: false, payment_invoice_status: "NOT INVOICE", is_payment_invoice_enabled: false,
};

type Order = any;
const orders: Order[] = [
  { id: "o1", name: "Nike sneakers", tracking_number: "1Z999AA10123456784", status: "AWAITING", group: "AWAITING", weight: null, price: null, declaration_status: null, custom_status: "0", NeedsCustom: false, payed: false, wrapping: true, timeSlot: null, nusxa: "NX-2001", branch: { name: "USA" }, declaration: [], orderHistory: [{ status: "AWAITING", name: "AWAITING", date: daysAgo(2) }] },
  { id: "o2", name: "Adidas jacket", tracking_number: "4201902594001118992", status: "RECEIVED IN US WAREHOUSE", group: "RECEIVED", weight: "1.10", price: "45", declaration_status: "DECLERED", custom_status: "0", NeedsCustom: false, payed: false, wrapping: true, timeSlot: null, nusxa: "NX-2002", branch: { name: "USA" }, declaration: [{ id: "d2", order_id: "o2", website: "adidas.com", category: "Clothing", price: "45", currency: "USD", status: "Declared" }], orderHistory: [{ status: "AWAITING", name: "AWAITING", date: daysAgo(6) }, { status: "RECEIVED IN US WAREHOUSE", name: "IN_WAREHOUSE", date: daysAgo(3) }] },
  { id: "o3", name: "iPhone case", tracking_number: "9400111206212345678901", status: "ON THE WAY FROM US WAREHOUSE", group: "ON_THE_WAY_FROM_US_WAREHOUSE", weight: "0.80", price: "25", declaration_status: "DECLERED", custom_status: "0", NeedsCustom: false, payed: false, wrapping: true, timeSlot: null, nusxa: "NX-2003", branch: { name: "USA" }, declaration: [{ id: "d3", order_id: "o3", website: "apple.com", category: "Phone", price: "25", currency: "USD", status: "Declared" }], orderHistory: [{ status: "AWAITING", name: "AWAITING", date: daysAgo(9) }, { status: "RECEIVED IN US WAREHOUSE", name: "IN_WAREHOUSE", date: daysAgo(6) }, { status: "ON THE WAY FROM US WAREHOUSE", name: "ON_THE_WAY_FROM_US_WAREHOUSE", date: daysAgo(2) }] },
  { id: "o4", name: "Dyson hair dryer", tracking_number: "1Z999AA10123456799", status: "RECEIVED IN TBILISI WAREHOUSE", group: "RECEIVED_IN_TBILISI_WAREHOUSE", weight: "1.90", price: "340", declaration_status: "DECLERED", custom_status: "0", NeedsCustom: true, payed: false, wrapping: true, timeSlot: null, nusxa: "NX-1002", branch: { name: "USA" }, custom_fee: { custom_fee_amount: "15.00" }, declaration: [{ id: "d4", order_id: "o4", website: "amazon.com", category: "Households", price: "340", currency: "USD", status: "Declared" }], orderHistory: [{ status: "AWAITING", name: "AWAITING", date: daysAgo(12) }, { status: "RECEIVED IN US WAREHOUSE", name: "IN_WAREHOUSE", date: daysAgo(9) }, { status: "ON THE WAY FROM US WAREHOUSE", name: "ON_THE_WAY_FROM_US_WAREHOUSE", date: daysAgo(5) }, { status: "RECEIVED IN TBILISI WAREHOUSE", name: "ARRIVED", date: daysAgo(1) }] },
  { id: "o5", name: "Levis jeans", tracking_number: "1Z999AA10123456790", status: "RECEIVED IN TBILISI WAREHOUSE", group: "RECEIVED_IN_TBILISI_WAREHOUSE", weight: "2.40", price: "120", declaration_status: "DECLERED", custom_status: "8", NeedsCustom: true, payed: false, wrapping: true, timeSlot: null, nusxa: "NX-1001", branch: { name: "USA" }, custom_fee: { custom_fee_amount: "15.00" }, declaration: [{ id: "d5", order_id: "o5", website: "levis.com", category: "Clothing", price: "120", currency: "USD", status: "Declared" }], orderHistory: [{ status: "AWAITING", name: "AWAITING", date: daysAgo(9) }, { status: "RECEIVED IN US WAREHOUSE", name: "IN_WAREHOUSE", date: daysAgo(7) }, { status: "ON THE WAY FROM US WAREHOUSE", name: "ON_THE_WAY_FROM_US_WAREHOUSE", date: daysAgo(4) }, { status: "RECEIVED IN TBILISI WAREHOUSE", name: "ARRIVED", date: daysAgo(1) }] },
  { id: "o6", name: "Sony headphones", tracking_number: "1Z999AA10123456785", status: "DELIVERED", group: "DELIVERED", weight: "3.20", price: "210", declaration_status: "DECLERED", custom_status: "8", NeedsCustom: true, payed: true, wrapping: true, timeSlot: "12:00-20:00", nusxa: "NX-1000", branch: { name: "USA" }, declaration: [{ id: "d6", order_id: "o6", website: "sony.com", category: "Audio/video equipment", price: "210", currency: "USD", status: "Declared" }], orderHistory: [{ status: "AWAITING", name: "AWAITING", date: daysAgo(20) }, { status: "RECEIVED IN US WAREHOUSE", name: "IN_WAREHOUSE", date: daysAgo(17) }, { status: "ON THE WAY FROM US WAREHOUSE", name: "ON_THE_WAY_FROM_US_WAREHOUSE", date: daysAgo(14) }, { status: "RECEIVED IN TBILISI WAREHOUSE", name: "ARRIVED", date: daysAgo(11) }, { status: "DELIVERED", name: "RECEIVED", date: daysAgo(10) }] },
];

const withButtons = (o: Order) => {
  const cs = Number(o.custom_status ?? 0);
  const tbilisi = o.group === "RECEIVED_IN_TBILISI_WAREHOUSE";
  const payable = tbilisi && o.declaration_status === "DECLERED" && o.custom_status === "8" && !o.payed;
  return {
    ...o,
    buttons: {
      ...BUTTONS,
      declaration_enable: o.status !== "DELIVERED",
      custom_enable: o.NeedsCustom === true,
      custom_right_icon_enable: o.NeedsCustom === true && cs > 0 && cs < 9,
      delivery_enable: o.payed === true && o.status !== "DELIVERED",
      payment_enable: payable,
      is_payment_invoice_enabled: payable,
    },
  };
};

const warehouses = [
  { id: "w1", street: "3007 Rosemont Avenue", city: "Wilmington", state: "Delaware", country: "USA", zipCode: "19802", tel: "+1 (302) 510 6956" },
  { id: "w2", street: "Room 1203, Bldg 7, Huaqiang North", city: "Shenzhen", state: "", country: "China", zipCode: "518000", tel: "+86 755 1234 5678" },
];

const customerAddresses = [
  { id: "a1", address: "Rustaveli Avenue 12", title: "Home", tag: "home", city: "Tbilisi", additionalInstructions: "Second floor", isDefault: true, lat: "44.799", lang: "41.715" },
  { id: "a2", address: "Chavchavadze Avenue 37", title: "Office", tag: "work", city: "Tbilisi", additionalInstructions: "Reception", isDefault: false, lat: "44.745", lang: "41.709" },
];
const hours = (open: string, close: string, days: string[]) =>
  ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => ({ day, is_active: days.includes(day), opens_at: days.includes(day) ? open : null, closes_at: days.includes(day) ? close : null }));
const WEEK = ["monday", "tuesday", "wednesday", "thursday", "friday"];
const pickupLocations = [
  { id: "pl1", alias: "Saburtalo office", alias_ka: "საბურთალოს ოფისი", address: "Vazha-Pshavela Ave 71, Tbilisi", address_ka: "ვაჟა-ფშაველას გამზ. 71, თბილისი", phone: "+995 32 2 11 22 33", latitude: 41.7245, longitude: 44.7405, is_default: true, additional_info: "Entrance from the courtyard, 1st floor", working_hours: hours("10:00", "20:00", [...WEEK, "saturday"]) },
  { id: "pl2", alias: "Gldani office", alias_ka: "გლდანის ოფისი", address: "Khizanishvili St 28, Tbilisi", address_ka: "ხიზანიშვილის ქ. 28, თბილისი", phone: "+995 32 2 44 55 66", latitude: 41.7935, longitude: 44.8125, is_default: false, additional_info: null, working_hours: hours("10:00", "19:00", WEEK) },
];
const recipients = [
  { id: "rc1", first_name: "Emily", last_name: "Miller", name_en: "Emily Miller", name_ka: "ემილი მილერი", phone: "+16465550123", new_profile: false },
  { id: "rc2", first_name: "Lukas", last_name: "Schmidt", name_en: "Lukas Schmidt", name_ka: "ლუკას შმიდტი", phone: "+4915212345678", new_profile: false },
  { id: "rc3", first_name: "Nino", last_name: "Beridze", name_en: "Nino Beridze", name_ka: "ნინო ბერიძე", phone: "+995555123456", new_profile: false },
];
const CATEGORIES: [string, string][] = [
  ["Clothing", "ტანსაცმელი"], ["Shoes", "ფეხსაცმელი"], ["Phone", "ტელეფონი"], ["Computer / laptop", "კომპიუტერი / ლეპტოპი"], ["Audio/video equipment", "აუდიო/ვიდეო ტექნიკა"],
  ["Households", "საყოფაცხოვრებო"], ["Cosmetics", "კოსმეტიკა"], ["Toys", "სათამაშოები"], ["Books", "წიგნები"], ["Sports goods", "სპორტული საქონელი"],
  ["Jewelry / watches", "სამკაული / საათები"], ["Car parts", "ავტონაწილები"], ["Food supplements", "საკვები დანამატები"], ["Other", "სხვა"],
];
let nextId = 100;
const tbilisiSlots = () => {
  const now = new Date(); const h = now.getUTCHours() + 4;
  const all = ["12:00-15:00", "15:00-19:00", "19:00-22:00"];
  return { today: all.filter((s) => Number(s.slice(0, 2)) > h + 1), tomorrow: all };
};

const reels = [
  { id: "r1", tone: "green", tagKa: "აქცია", tagEn: "DEAL", titleKa: "−20% პირველ ამანათზე", titleEn: "−20% on your first parcel", bodyKa: "დაამატე თრექინგი ამ კვირაში და ფასდაკლება ავტომატურად ჩაითვლება.", bodyEn: "Add a tracking number this week and the discount applies automatically.", emoji: "🎉", media_type: null, media_url: null, cta_route: "/add-incoming", seen: false },
  { id: "r2", tone: "blue", tagKa: "სიახლე", tagEn: "NEW", titleKa: "ჩინეთიდან საჰაერო გზით", titleEn: "Air shipping from China", bodyKa: "10–14 დღე, $5/კგ. საზღვაო გზა კვლავ $3/კგ.", bodyEn: "10–14 days at $5/kg. Sea freight stays at $3/kg.", emoji: "✈️", media_type: null, media_url: null, cta_route: "/rates", seen: false },
  { id: "r3", tone: "navy", tagKa: "რჩევა", tagEn: "TIP", titleKa: "როგორ დავადეკლარიროთ", titleEn: "How to declare in 30 s", bodyKa: "მაღაზიის ბმული, კატეგორია და ფასი — დანარჩენს ჩვენ ვავსებთ.", bodyEn: "Store link, category and price — we fill in the rest.", emoji: "📝", media_type: null, media_url: null, cta_route: null, seen: true },
];

const outgoing = [
  { id: "x1", status: "CREATED", tracking_number: "GZ-OUT-535562", weight: "2.00", price: "62.00", destination: "USA", destination_country: { code: "US", flag: "🇺🇸", name: "USA", nameKa: "აშშ" }, recipient_name: "David Kim", recipients: [] },
  { id: "x2", status: "IN TRANSIT", tracking_number: "GZ-OUT-747242", weight: "2.00", price: "52.00", destination: "Germany", destination_country: { code: "DE", flag: "🇩🇪", name: "Germany", nameKa: "გერმანია" }, recipient_name: "Anna Schmidt", recipients: [] },
  { id: "x3", status: "DELIVERED", tracking_number: "GZ-OUT-793340", weight: "10.00", price: "254.00", destination: "USA", destination_country: { code: "US", flag: "🇺🇸", name: "USA", nameKa: "აშშ" }, recipient_name: "John Miller", recipients: [{ name_en: "John Miller" }, { name_en: "Mary Miller" }] },
];

const walletCards = [
  { id: "card-1", maskedPan: "4821", cardType: "visa", isDefault: true, expiryDate: "09/28" },
  { id: "card-2", maskedPan: "7734", cardType: "mc", isDefault: false, expiryDate: "02/27" },
];
const walletTx: { id: string; kind: "parcel" | "outgoing" | "topup"; status: string; amount: number; created_at: string }[] = [
  { id: "t1", kind: "topup", status: "COMPLETED", amount: 100, created_at: daysAgo(2) },
  { id: "t2", kind: "parcel", status: "COMPLETED", amount: 57.5, created_at: daysAgo(10) },
  { id: "t3", kind: "outgoing", status: "PENDING", amount: 62, created_at: daysAgo(1) },
  { id: "t4", kind: "parcel", status: "REJECTED", amount: 24, created_at: daysAgo(15) },
];

const TIERS = [
  { name: "Silver", emoji: "🥈", from: 0, rate: 5 },
  { name: "Gold", emoji: "🥇", from: 1000, rate: 10 },
  { name: "Platinum", emoji: "💎", from: 2500, rate: 15 },
];
const loyalty = {
  points: 1240,
  rewards: [
    { id: "rw1", title_ka: "უფასო მიწოდება", title_en: "Free delivery", cost: 300, available: true },
    { id: "rw2", title_ka: "−20% ფრახტზე", title_en: "−20% freight", cost: 800, available: true },
    { id: "rw3", title_ka: "უფასო გადაფუთვა", title_en: "Free repacking", cost: 150, available: true },
    { id: "rw4", title_ka: "პრიორიტეტული განბაჟება", title_en: "Priority customs", cost: 2000, available: false },
  ],
  active_rewards: [] as { id: string; title_ka: string; title_en: string; cost: number; available: boolean }[],
  history: [
    { id: "h1", label: "Welcome bonus", points: 100, created_at: daysAgo(40) },
    { id: "h2", label: "Sony headphones · 3.2 kg", points: 32, created_at: daysAgo(10) },
    { id: "h3", label: "Referral · Keti D.", points: 150, created_at: daysAgo(6) },
    { id: "h4", label: "Redeemed · Free delivery", points: -300, created_at: daysAgo(3) },
  ],
};
function loyaltyView() {
  const tier = [...TIERS].reverse().find((t) => loyalty.points >= t.from) ?? TIERS[0];
  const next = TIERS[TIERS.indexOf(tier) + 1] ?? null;
  const to_next = next ? next.from - loyalty.points : 0;
  const progress = next ? Math.round(((loyalty.points - tier.from) / (next.from - tier.from)) * 100) : 100;
  return { points: loyalty.points, tier, next, to_next, progress, tiers: TIERS, rewards: loyalty.rewards, active_rewards: loyalty.active_rewards, history: loyalty.history };
}

// Pricing mirrors the backend's logic.js so the demo quotes match the live API.
const CALC = {
  origins: [
    { code: "usa", name: "USA", nameKa: "აშშ", flag: "🇺🇸", days: "7–10", currency: "USD" },
    { code: "china", name: "China", nameKa: "ჩინეთი", flag: "🇨🇳", days: "10–14", currency: "CNY" },
  ],
  countries: [
    { code: "US", name: "USA", nameKa: "აშშ", flag: "🇺🇸", days: "5–8", perKg: 24 },
    { code: "DE", name: "Germany", nameKa: "გერმანია", flag: "🇩🇪", days: "4–6", perKg: 19 },
    { code: "GB", name: "United Kingdom", nameKa: "დიდი ბრიტანეთი", flag: "🇬🇧", days: "4–7", perKg: 21 },
    { code: "TR", name: "Türkiye", nameKa: "თურქეთი", flag: "🇹🇷", days: "2–4", perKg: 12 },
  ],
  max_weight: 30,
  fx: { USD: 2.7, CNY: 0.37, GEL: 1 } as Record<string, number>,
  fees: { delivery: 5, repack: 5, pickup: 5, customs_threshold: 300, customs_rate: 0.18 },
  ratePerKg: 16, insurance: 2, service: 3, customsMin: 15, outBase: 9,
};
const round2 = (n: number) => Math.round(n * 100) / 100;
function calculatorQuote(q: any) {
  const kg = Math.round(Number(q.weight) * 10) / 10;
  if (!(kg > 0 && kg <= CALC.max_weight)) return null;
  const points = Math.max(10, Math.round(5 * kg));
  const sum = (l: { amount: number }[]) => round2(l.reduce((s, x) => s + x.amount, 0));
  if (q.direction === "out") {
    const c = CALC.countries.find((x) => x.code === q.country);
    if (!c) return null;
    const lines = [{ key: "freight", amount: round2(kg * c.perKg) }, { key: "handling", amount: CALC.outBase }, { key: "pickup", amount: q.courier ? CALC.fees.pickup : 0 }];
    return { direction: "out", weight: kg, rate: c.perKg, days: c.days, lines, customs: null, points, total: sum(lines) };
  }
  const o = CALC.origins.find((x) => x.code === q.origin);
  if (!o) return null;
  const valueGel = round2(Math.max(0, Number(q.value) || 0) * CALC.fx[o.currency]);
  const required = valueGel > CALC.fees.customs_threshold;
  const lines = [
    { key: "freight", amount: round2(kg * CALC.ratePerKg) },
    { key: "insurance", amount: CALC.insurance },
    { key: "service", amount: CALC.service },
    { key: "repack", amount: q.repack ? CALC.fees.repack : 0 },
    { key: "delivery", amount: q.courier ? CALC.fees.delivery : 0 },
    { key: "customs", amount: required ? round2(Math.max(CALC.customsMin, valueGel * CALC.fees.customs_rate)) : 0 },
  ];
  return { direction: "in", weight: kg, rate: CALC.ratePerKg, days: o.days, lines, customs: { required, value_gel: valueGel, threshold: CALC.fees.customs_threshold, rate: CALC.fees.customs_rate }, points, total: sum(lines) };
}

function handle(method: string, path: string, body: any) {
  const p = path.split("?")[0];
  if (p.includes("/tracking/demo")) {
    const carriers = ["UPS", "USPS", "FedEx", "DHL"];
    const names = ["Nike sneakers", "AirPods Pro", "Lego Technic set", "Wool blend coat", "Kindle Paperwhite"];
    const carrier = carriers[Math.floor(Math.random() * carriers.length)];
    const digits = () => String(Math.floor(1e9 + Math.random() * 9e9));
    const tracking = carrier === "UPS" ? `1Z999AA1${digits()}` : carrier === "USPS" ? `9400111206${digits()}` : `${digits()}${digits().slice(0, 2)}`;
    return { carrier, tracking_number: tracking, name: names[Math.floor(Math.random() * names.length)], origin: Math.random() < 0.8 ? "usa" : "china" };
  }
  if (p === "/assistant/chat" && method === "post") {
    const q = String(body?.message ?? "").toLowerCase();
    const ka = body?.lang === "ka";
    const inTransit = orders.filter((o) => ["RECEIVED", "ON_THE_WAY_FROM_US_WAREHOUSE"].includes(o.group)).length;
    const arrived = orders.filter((o) => o.group === "RECEIVED_IN_TBILISI_WAREHOUSE").length;
    const due = orders.filter((o) => !o.payed && o.group === "RECEIVED_IN_TBILISI_WAREHOUSE").reduce((s, o) => s + Number(o.price ?? 0), 0);
    if (/where|სად|parcel|ამანათ/.test(q)) return { reply: ka ? `გზაშია ${inTransit} ამანათი, თბილისში ჩამოვიდა ${arrived}. დეტალები „ამანათებში“.` : `${inTransit} parcel(s) are on the way and ${arrived} arrived in Tbilisi. Details are under Parcels.`, tools: ["list_parcels"], guide: null };
    if (/owe|pay|გადა/.test(q)) return { reply: ka ? `გადასახდელია ₾${due.toFixed(2)}. შემიძლია გაჩვენო, როგორ გადაიხადო.` : `You owe ₾${due.toFixed(2)} for parcels in Tbilisi. I can show you how to pay.`, tools: ["amount_due"], guide: "pay" };
    if (/address|მისამართ/.test(q)) return { reply: ka ? "შენი აშშ მისამართი: 3007 Rosemont Avenue, UNIT GZ-1166, Wilmington, Delaware 19802." : "Your US address: 3007 Rosemont Avenue, UNIT GZ-1166, Wilmington, Delaware 19802.", tools: ["warehouse_address"], guide: null };
    if (/declar|დეკლარ/.test(q)) return { reply: ka ? "დეკლარაციისთვის საჭიროა მაღაზია, კატეგორია და ფასი. გაჩვენო?" : "To declare you pick the store, a category and the price. Want me to show you?", tools: [], guide: "declare" };
    return { reply: ka ? "ეს სადემონსტრაციო ასისტენტია. შემიძლია ვუპასუხო ამანათების, თანხის, მისამართისა და დეკლარაციის კითხვებს." : "This is the demo assistant. I can answer about your parcels, what you owe, your address and declarations.", tools: [], guide: null };
  }
  if (p === "/calculator/meta") return { origins: CALC.origins, countries: CALC.countries, max_weight: CALC.max_weight, fx: CALC.fx, fees: CALC.fees };
  if (p === "/calculator" && method === "post") {
    const q = calculatorQuote(body ?? {});
    if (!q) throw Object.assign(new Error("bad quote"), { response: { status: 400, data: { message: `Choose a route and a weight up to ${CALC.max_weight} kg` } } });
    return q;
  }
  if (p.includes("/v1/auth/login")) return { access_token: "demo.token", refresh_token: "demo.token" };
  if (p.includes("/customers/search/userId")) return customer;
  if (p === "/customers/me" && method === "put") {
    const prof = { ...(customer.profile ?? {}), ...(body ?? {}) } as typeof customer.profile & { phone?: string };
    Object.assign(customer, {
      profile: prof,
      first_name: prof.first_name_en || customer.first_name, last_name: prof.last_name_en || customer.last_name,
      phone: prof.phone || customer.phone, profile_complete: true,
    });
    return customer;
  }
  if (p === "/ai/translate" && method === "post") {
    const items: Record<string, string> = body?.items ?? {};
    const result: Record<string, { en: string; ka: string }> = {};
    for (const [k, v] of Object.entries(items)) {
      const isKa = /[\u10A0-\u10FF]/.test(v);
      result[k] = isKa ? { ka: v, en: toEn(v) } : { en: v, ka: toKa(v) };
    }
    return { result, source: "offline" };
  }
  if (p.includes("/addresses") && !p.includes("customer-addresses")) return warehouses;
  if (p === "/customer-addresses" && method === "post") {
    const a = { id: "a" + nextId++, address: String(body?.address ?? ""), title: String(body?.title ?? "Address"), tag: "other", city: String(body?.city ?? "Tbilisi"), additionalInstructions: "", isDefault: false, lat: String(body?.lng ?? ""), lang: String(body?.lat ?? "") };
    customerAddresses.push(a);
    return a;
  }
  if (p.includes("/customer-addresses")) return customerAddresses;
  if (p.includes("/content-management")) return CATEGORIES.map(([en, ka], i) => ({ identifier: `Category_${i + 1}`, nameEn: en, nameKa: ka, page: "declaration" }));
  if (p.includes("/pickup-locations")) return pickupLocations;
  if (p === "/recipients") return recipients;
  if (p.includes("/district/timeSlots")) return tbilisiSlots();
  if (p.includes("/district/find")) return "Tbilisi";
  if (p.includes("/payments/cards")) return walletCards;
  if (p.includes("/signify/template/")) return { url: "about:blank#demo-signature" };
  if (p === "/outgoing/countries") return { countries: CALC.countries, base_fee: CALC.outBase, pickup_fee: CALC.fees.pickup };
  if (p === "/outgoing" && method === "post") {
    const c = CALC.countries.find((x) => x.code === body?.country) ?? CALC.countries[0];
    const weight = Number(body?.weight ?? 0);
    const price = weight * c.perKg + CALC.outBase + (body?.pickup ? CALC.fees.pickup : 0);
    const people = (body?.recipients ?? []).map((r: any, i: number) => {
      const name = `${r.first_name} ${r.last_name}`.trim();
      const phone = `${r.dial}${r.phone}`;
      const existing = recipients.find((x) => x.phone === phone);
      if (!existing) recipients.push({ id: "rc" + nextId, first_name: r.first_name, last_name: r.last_name, name_en: name, name_ka: name, phone, new_profile: false });
      return { id: "rp" + nextId++ + i, first_name: r.first_name, last_name: r.last_name, name_en: name, name_ka: name, phone, new_profile: !existing };
    });
    const out = {
      id: "x" + nextId++, status: "CREATED", tracking_number: `GZ-OUT-${String(Math.floor(100000 + Math.random() * 900000))}`, weight: weight.toFixed(2), price: price.toFixed(2),
      destination: c.name, destination_country: { code: c.code, flag: c.flag, name: c.name, nameKa: c.nameKa }, recipient_name: body?.recipient_name, recipient_address: body?.recipient_address,
      recipient_phone: body?.recipient_phone, contents: body?.contents, pickup: !!body?.pickup, pickup_address: body?.pickup_address, recipients: people, created_at: new Date().toISOString(),
    };
    outgoing.unshift(out as any);
    walletTx.unshift({ id: "t" + nextId++, kind: "outgoing", status: "PENDING", amount: price, created_at: new Date().toISOString() });
    return out;
  }
  if (p.includes("/orders/getByNusxa/")) {
    const o = orders.find((x) => x.id === p.split("/orders/getByNusxa/")[1]);
    return orders.filter((x) => x.nusxa === o?.nusxa).map(withButtons);
  }
  if (p.includes("/orders/getOrderPrices")) {
    const picked = orders.filter((o) => (body?.orders ?? []).includes(o.id));
    const freight = picked.reduce((s, o) => s + 24 * Number(o.weight ?? 1), 0);
    const customs = picked.reduce((s, o) => s + Number(o.custom_fee?.custom_fee_amount ?? 0), 0);
    const delivery = body?.office_pickup ? 0 : CALC.fees.delivery;
    const t = { totalWeightCost: round2(freight), repackagingCost: 5, insuranceCost: 2, delivery_fee: delivery, service_fee: 3, customFee: round2(customs), discountAmount: 0, totalPrice: round2(freight + 5 + 2 + delivery + 3 + customs) };
    return [picked.map((o) => ({ orderId: o.id, ...t })), [t]];
  }
  if (p.includes("/orders/order_payment_status/")) return { payStatus: "COMPLETED" };
  if (p.includes("/orders/nusxa_update/")) {
    const o = orders.find((x) => x.id === p.split("/orders/nusxa_update/")[1]);
    for (const x of orders) if (x.nusxa === o?.nusxa) { x.custom_status = String(body?.custom_status); if (body?.DeclarationPaymentAuto !== undefined) x.DeclarationPaymentAuto = body.DeclarationPaymentAuto; }
    return { ok: true };
  }
  if (p.includes("/orders/wrapping-update/")) { const o = orders.find((x) => x.id === p.split("/orders/wrapping-update/")[1]); if (o) o.wrapping = body?.wrapping; return { ok: true }; }
  if (p.includes("/orders/time-slot-update/")) {
    const o = orders.find((x) => x.id === p.split("/orders/time-slot-update/")[1]);
    if (o) { o.timeSlot = body?.timeSlot; o.delivery_day = body?.day; }
    return { ok: true };
  }
  if (p.includes("/orders/courier/")) {
    const o = orders.find((x) => x.id === p.split("/orders/courier/")[1]);
    if (o) { o.courier_delivery = !!body?.courier; o.delivery_method = body?.courier ? "courier" : "pickup"; o.pickup_location = body?.courier ? null : pickupLocations.find((l) => l.id === body?.pickup_location_id) ?? pickupLocations[0]; }
    return { ok: true };
  }
  if (p.includes("/orders/pickup-location-update/")) {
    const o = orders.find((x) => x.id === p.split("/orders/pickup-location-update/")[1]);
    if (o) o.pickup_location = pickupLocations.find((l) => l.id === body?.pickup_location_id) ?? o.pickup_location;
    return { ok: true };
  }
  if (p === "/orders" && method === "post") {
    if (orders.some((o) => o.tracking_number === body?.tracking_number)) throw Object.assign(new Error("duplicate"), { response: { status: 409, data: { message: "duplicate key value" } } });
    const o = {
      id: "o" + nextId++, name: body?.name || `Order ${orders.length + 1}`, tracking_number: body?.tracking_number, status: "AWAITING", group: "AWAITING", weight: null, price: null,
      declaration_status: null, custom_status: "0", NeedsCustom: false, payed: false, wrapping: true, timeSlot: null, nusxa: `NX-${nextId}`, branch: { name: body?.country === "china" ? "China" : "USA" },
      courier_delivery: body?.courier !== false, delivery_method: body?.courier === false ? "pickup" : "courier", declaration: [], orderHistory: [{ status: "AWAITING", name: "AWAITING", date: new Date().toISOString() }],
    };
    orders.unshift(o);
    return o;
  }
  if (p.startsWith("/orders/") && method === "put") { const o = orders.find((x) => x.id === p.split("/orders/")[1]); if (o) Object.assign(o, body); return o ?? { ok: true }; }
  if (p === "/declarations" && method === "post") {
    const o = orders.find((x) => x.id === body?.order_id);
    const d = { id: "d" + nextId++, ...body };
    o?.declaration.push(d);
    return d;
  }
  if (p.startsWith("/declarations/") && method === "delete") { const id = p.split("/declarations/")[1]; for (const o of orders) o.declaration = o.declaration.filter((d: any) => d.id !== id); return { ok: true }; }
  if (p.startsWith("/declarations/") && method === "put") return { ok: true };
  if (p === "/transactions" && method === "post") {
    for (const id of body?.order_ids ?? []) {
      const o = orders.find((x) => x.id === id);
      if (!o) continue;
      o.payed = true;
      if (body?.pickup_location_id) { o.delivery_method = "pickup"; o.courier_delivery = false; o.pickup_location = pickupLocations.find((l) => l.id === body.pickup_location_id) ?? pickupLocations[0]; o.pickup_status = "OFFICE PICKED UP"; }
      else { o.delivery_method = "courier"; o.courier_delivery = true; o.delivery_paid = true; }
    }
    const total = (body?.order_ids ?? []).reduce((s: number, id: string) => { const o = orders.find((x) => x.id === id); return s + 24 * Number(o?.weight ?? 1) + 10 + Number(o?.custom_fee?.custom_fee_amount ?? 0); }, 0);
    walletTx.unshift({ id: "t" + nextId++, kind: "parcel", status: "COMPLETED", amount: round2(total), created_at: new Date().toISOString() });
    return { orderId: "DEMO-ORDER", status: "PENDING" };
  }
  if (p.includes("/orders/statusQuantity")) {
    const q: Record<string, number> = {};
    for (const o of orders) q[o.group] = (q[o.group] ?? 0) + 1;
    return q;
  }
  if (p.includes("/orders/filterByStatys/")) {
    const g = p.split("/orders/filterByStatys/")[1];
    return orders.filter((o) => o.group === g).map(withButtons);
  }
  if (p.includes("/orders/getUnpaidOrders")) return orders.filter((o) => !o.payed && o.group === "RECEIVED_IN_TBILISI_WAREHOUSE").map(withButtons);
  if (p === "/outgoing" && method === "get") return outgoing;
  if (p === "/wallet/topup" && method === "post") {
    const amount = Number(body?.amount ?? 0);
    customer.wallet_balance = Math.round((customer.wallet_balance + amount) * 100) / 100;
    walletTx.unshift({ id: "t" + Date.now(), kind: "topup", status: "COMPLETED", amount, created_at: new Date().toISOString() });
    return { balance: customer.wallet_balance };
  }
  if (p.includes("/wallet")) return { balance: customer.wallet_balance, currency: "GEL", cards: walletCards, transactions: walletTx };
  if (p === "/loyalty/redeem" && method === "post") {
    const r = loyalty.rewards.find((x) => x.id === body?.reward_id);
    if (r && r.available && loyalty.points >= r.cost) {
      loyalty.points -= r.cost;
      if (!loyalty.active_rewards.some((x) => x.id === r.id)) loyalty.active_rewards = [...loyalty.active_rewards, r];
      loyalty.history = [{ id: "h" + Date.now(), label: `Redeemed · ${r.title_en}`, points: -r.cost, created_at: new Date().toISOString() }, ...loyalty.history];
      loyalty.rewards = loyalty.rewards.map((x) => ({ ...x, available: loyalty.points >= x.cost }));
    }
    return loyaltyView();
  }
  if (p.includes("/loyalty")) return loyaltyView();
  if (p.includes("/reels")) return method === "post" ? { ok: true } : reels;
  if (p.includes("/referral")) return {
    code: "GZ-DEMO-1001", link: "https://openbanking.brandrepublic.ge/mobileapps/sign-in?ref=GZ-DEMO-1001", bonus: 150, earned: 150,
    friends: [
      { id: "f1", name: "Keti Dolidze", state: "credited", points: 150, joined_at: daysAgo(20), credited_at: daysAgo(6) },
      { id: "f2", name: "Luka Beridze", state: "pending", points: 150, joined_at: daysAgo(3), credited_at: null },
    ],
  };
  if (p.includes("/shops/getShops")) return ["amazon.com", "ebay.com", "nike.com", "apple.com", "shein.com", "aliexpress.com", "zara.com", "asos.com"];
  return Array.isArray(body) ? [] : {};
}

export async function demoRequest(method: string, path: string, body?: unknown) {
  await new Promise((r) => setTimeout(r, 120));
  return handle(method.toLowerCase(), path, body);
}
