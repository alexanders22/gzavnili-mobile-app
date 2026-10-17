// Offline demo adapter: the same shapes the live API returns, so every screen renders
// without a backend. Enabled with EXPO_PUBLIC_DEMO=1.
export const DEMO = process.env.EXPO_PUBLIC_DEMO === "1";

const daysAgo = (n: number) => { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString(); };

const customer = {
  id: "demo-customer",
  first_name: "Vasil", last_name: "Beridze", email: "vasil@example.com", phone: "+995 555 11 22 33",
  room_number: "GZ-1166", customerType: "PERSONAL", verified: true, repackaging: true,
  profile_complete: true, wallet_balance: 42.5,
  profile: { first_name_ka: "ვასილ", first_name_en: "Vasil", last_name_ka: "ბერიძე", last_name_en: "Beridze" },
};

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

const reels = [
  { id: "r1", tone: "green", tagKa: "აქცია", tagEn: "DEAL", titleKa: "−20% პირველ ამანათზე", titleEn: "−20% on your first parcel", emoji: "🎉", media_type: null, media_url: null, seen: false },
  { id: "r2", tone: "blue", tagKa: "სიახლე", tagEn: "NEW", titleKa: "ჩინეთიდან საჰაერო გზით", titleEn: "Air shipping from China", emoji: "✈️", media_type: null, media_url: null, seen: false },
  { id: "r3", tone: "navy", tagKa: "რჩევა", tagEn: "TIP", titleKa: "როგორ დავადეკლარიროთ", titleEn: "How to declare in 30 s", emoji: "📝", media_type: null, media_url: null, seen: true },
];

const outgoing = [
  { id: "x1", status: "CREATED", tracking_number: "GZ-OUT-535562", weight: "2.00", price: "62.00", destination: "USA", destination_country: { code: "US", flag: "🇺🇸", name: "USA", nameKa: "აშშ" }, recipient_name: "David Kim", recipients: [] },
  { id: "x2", status: "IN TRANSIT", tracking_number: "GZ-OUT-747242", weight: "2.00", price: "52.00", destination: "Germany", destination_country: { code: "DE", flag: "🇩🇪", name: "Germany", nameKa: "გერმანია" }, recipient_name: "Anna Schmidt", recipients: [] },
  { id: "x3", status: "DELIVERED", tracking_number: "GZ-OUT-793340", weight: "10.00", price: "254.00", destination: "USA", destination_country: { code: "US", flag: "🇺🇸", name: "USA", nameKa: "აშშ" }, recipient_name: "John Miller", recipients: [{ name_en: "John Miller" }, { name_en: "Mary Miller" }] },
];

function handle(method: string, path: string, body: any) {
  const p = path.split("?")[0];
  if (p.includes("/v1/auth/login")) return { access_token: "demo.token", refresh_token: "demo.token" };
  if (p.includes("/customers/search/userId")) return customer;
  if (p.includes("/addresses") && !p.includes("customer-addresses")) return warehouses;
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
  if (p.includes("/wallet")) return { balance: customer.wallet_balance, currency: "GEL" };
  if (p.includes("/loyalty")) return { points: 1240, tier: { name: "Gold", emoji: "🥇" }, progress: 62, next_tier: "Platinum" };
  if (p.includes("/reels")) return method === "post" ? { ok: true } : reels;
  if (p.includes("/referral")) return { code: "GZ-DEMO-1001", invited: 3, credited: 1, bonus: 150 };
  if (p.includes("/shops/getShops")) return ["amazon.com", "ebay.com", "nike.com", "apple.com", "shein.com", "aliexpress.com", "zara.com", "asos.com"];
  return Array.isArray(body) ? [] : {};
}

export async function demoRequest(method: string, path: string, body?: unknown) {
  await new Promise((r) => setTimeout(r, 120));
  return handle(method.toLowerCase(), path, body);
}
