// Shop catalog (demo data, mirrors the original app).
export type Product = { id: string; name: string; store: string; cat: string; emoji: string; price: number; was?: number };
export type Category = { id: string; ka: string; en: string; icon: string };
export const USD_TO_GEL = 2.7;
export const CATEGORIES: Category[] = [
  {
    "id": "footwear",
    "ka": "ფეხსაცმელი",
    "en": "Footwear",
    "icon": "footsteps-outline"
  },
  {
    "id": "clothing",
    "ka": "ტანსაცმელი",
    "en": "Clothing",
    "icon": "shirt-outline"
  },
  {
    "id": "electronics",
    "ka": "ტექნიკა",
    "en": "Electronics",
    "icon": "laptop-outline"
  },
  {
    "id": "beauty",
    "ka": "კოსმეტიკა",
    "en": "Beauty",
    "icon": "sparkles-outline"
  },
  {
    "id": "home",
    "ka": "სახლი",
    "en": "Home",
    "icon": "home-outline"
  },
  {
    "id": "sport",
    "ka": "სპორტი",
    "en": "Sport",
    "icon": "barbell-outline"
  }
];
export const PRODUCTS: Product[] = [
  {
    "id": "p1",
    "name": "Nike Air Max 90",
    "store": "Nike",
    "cat": "footwear",
    "emoji": "👟",
    "price": 130,
    "was": 160
  },
  {
    "id": "p2",
    "name": "Nike Pegasus 41",
    "store": "Nike",
    "cat": "footwear",
    "emoji": "👟",
    "price": 98,
    "was": 140
  },
  {
    "id": "p3",
    "name": "Adidas Samba OG",
    "store": "Foot Locker",
    "cat": "footwear",
    "emoji": "👟",
    "price": 100
  },
  {
    "id": "p4",
    "name": "New Balance 550",
    "store": "Foot Locker",
    "cat": "footwear",
    "emoji": "👟",
    "price": 82,
    "was": 110
  },
  {
    "id": "p5",
    "name": "Converse Chuck 70",
    "store": "ASOS",
    "cat": "footwear",
    "emoji": "👟",
    "price": 65,
    "was": 85
  },
  {
    "id": "p6",
    "name": "Timberland 6\" boots",
    "store": "Amazon",
    "cat": "footwear",
    "emoji": "🥾",
    "price": 170
  },
  {
    "id": "p7",
    "name": "Wool blend coat",
    "store": "Zara",
    "cat": "clothing",
    "emoji": "🧥",
    "price": 119,
    "was": 149
  },
  {
    "id": "p8",
    "name": "Levi's 501 jeans",
    "store": "Amazon",
    "cat": "clothing",
    "emoji": "👖",
    "price": 59,
    "was": 89
  },
  {
    "id": "p9",
    "name": "Summer dress",
    "store": "SHEIN",
    "cat": "clothing",
    "emoji": "👗",
    "price": 14,
    "was": 28
  },
  {
    "id": "p10",
    "name": "Oversized hoodie",
    "store": "ASOS",
    "cat": "clothing",
    "emoji": "👕",
    "price": 38
  },
  {
    "id": "p11",
    "name": "Nike Tech Fleece",
    "store": "Nike",
    "cat": "clothing",
    "emoji": "🧥",
    "price": 110
  },
  {
    "id": "p12",
    "name": "AirPods Pro 2",
    "store": "Apple",
    "cat": "electronics",
    "emoji": "🎧",
    "price": 249
  },
  {
    "id": "p13",
    "name": "iPad Air 11\"",
    "store": "Apple",
    "cat": "electronics",
    "emoji": "📱",
    "price": 599
  },
  {
    "id": "p14",
    "name": "Kindle Paperwhite",
    "store": "Amazon",
    "cat": "electronics",
    "emoji": "📖",
    "price": 139,
    "was": 159
  },
  {
    "id": "p15",
    "name": "Sony WH-1000XM5",
    "store": "eBay",
    "cat": "electronics",
    "emoji": "🎧",
    "price": 278,
    "was": 399
  },
  {
    "id": "p16",
    "name": "Nintendo Switch OLED",
    "store": "eBay",
    "cat": "electronics",
    "emoji": "🎮",
    "price": 299
  },
  {
    "id": "p17",
    "name": "Dyson Airwrap",
    "store": "Sephora",
    "cat": "beauty",
    "emoji": "💇",
    "price": 499
  },
  {
    "id": "p18",
    "name": "Lip & cheek set",
    "store": "Sephora",
    "cat": "beauty",
    "emoji": "💄",
    "price": 45,
    "was": 60
  },
  {
    "id": "p19",
    "name": "CeraVe moisturiser",
    "store": "Amazon",
    "cat": "beauty",
    "emoji": "🧴",
    "price": 17
  },
  {
    "id": "p20",
    "name": "Table lamp",
    "store": "IKEA",
    "cat": "home",
    "emoji": "💡",
    "price": 29
  },
  {
    "id": "p21",
    "name": "Dyson V15 vacuum",
    "store": "Amazon",
    "cat": "home",
    "emoji": "🧹",
    "price": 549,
    "was": 749
  },
  {
    "id": "p22",
    "name": "Nespresso Vertuo",
    "store": "Amazon",
    "cat": "home",
    "emoji": "☕",
    "price": 129,
    "was": 179
  },
  {
    "id": "p23",
    "name": "Garmin Forerunner 265",
    "store": "Amazon",
    "cat": "sport",
    "emoji": "⌚",
    "price": 349,
    "was": 449
  },
  {
    "id": "p24",
    "name": "Yoga mat",
    "store": "Nike",
    "cat": "sport",
    "emoji": "🧘",
    "price": 35
  },
  {
    "id": "p25",
    "name": "Running socks, 3 pack",
    "store": "Foot Locker",
    "cat": "sport",
    "emoji": "🧦",
    "price": 18
  }
];

export const discountOf = (p: Product) => (p.was ? Math.round(100 * (1 - p.price / p.was)) : 0);
export const categoryById = (id: string) => CATEGORIES.find((c) => c.id === id);
export const isCategoryId = (id?: string | null) => !!id && CATEGORIES.some((c) => c.id === id);

/** Today's recommended deals: the category with the best discount rotates daily. */
export function recommendedDeals(n = 8): { cat: string; products: Product[] } {
  const day = Math.floor(Date.now() / 864e5);
  const ranked = CATEGORIES.map((c) => ({
    id: c.id,
    best: Math.max(0, ...PRODUCTS.filter((p) => p.cat === c.id).map(discountOf)),
  }))
    .filter((c) => c.best > 0)
    .sort((a, b) => b.best - a.best);
  const cat = (ranked[day % ranked.length] ?? ranked[0])?.id ?? CATEGORIES[0].id;
  const list = PRODUCTS.filter((p) => p.cat === cat && p.was).sort((a, b) => discountOf(b) - discountOf(a));
  if (list.length < n) {
    const rest = PRODUCTS.filter((p) => p.cat !== cat && p.was).sort((a, b) => discountOf(b) - discountOf(a));
    list.push(...rest.slice(0, n - list.length));
  }
  return { cat, products: list.slice(0, n) };
}
