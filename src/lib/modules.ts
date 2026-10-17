export type AppModule = {
  id: string; route: string; titleKa: string; titleEn: string; blurbKa: string; blurbEn: string;
  core: boolean; tab: boolean; backed: boolean; tile: boolean; icon: string;
};

export const MODULES: AppModule[] = [
  { id: "parcels", route: "/(tabs)/parcels", titleKa: "ამანათები", titleEn: "Parcels", blurbKa: "შენი გზავნილები", blurbEn: "Your shipments", core: true, tab: true, backed: true, tile: true, icon: "cube" },
  { id: "wallet", route: "/wallet", titleKa: "საფულე", titleEn: "Wallet", blurbKa: "ბალანსი და ბარათები", blurbEn: "Balance and cards", core: true, tab: false, backed: true, tile: true, icon: "wallet" },
  { id: "address", route: "/address", titleKa: "მისამართი", titleEn: "US Address", blurbKa: "შენი საწყობის მისამართი", blurbEn: "Your warehouse address", core: true, tab: true, backed: true, tile: true, icon: "location" },
  { id: "profile", route: "/settings", titleKa: "პროფილი", titleEn: "Profile", blurbKa: "ანგარიში და პარამეტრები", blurbEn: "Account and settings", core: true, tab: false, backed: true, tile: true, icon: "person" },
  { id: "shop", route: "/shop", titleKa: "შოპინგი", titleEn: "Shopping", blurbKa: "იყიდე აშშ-ს მაღაზიებში", blurbEn: "Shop in USA stores", core: false, tab: false, backed: false, tile: true, icon: "bag" },
  { id: "send", route: "/send", titleKa: "ფულის გაგზავნა", titleEn: "Send Money", blurbKa: "გზავნილები სახლში", blurbEn: "Remittances home", core: false, tab: false, backed: false, tile: true, icon: "cash" },
  { id: "loyalty", route: "/loyalty", titleKa: "ლოიალობა", titleEn: "Loyalty", blurbKa: "ქულები და დონეები", blurbEn: "Points and tiers", core: false, tab: false, backed: true, tile: true, icon: "star" },
  { id: "ai", route: "/assistant", titleKa: "AI ასისტენტი", titleEn: "AI Assistant", blurbKa: "პასუხობს შენს კითხვებს 24/7", blurbEn: "Answers your questions 24/7", core: false, tab: false, backed: true, tile: true, icon: "sparkles" },
  { id: "reels", route: "/reels", titleKa: "აქციები", titleEn: "Promo", blurbKa: "სიახლეები და შეთავაზებები", blurbEn: "News and offers", core: false, tab: false, backed: true, tile: true, icon: "megaphone" },
  { id: "referral", route: "/referral", titleKa: "მოიწვიე მეგობარი", titleEn: "Refer a friend", blurbKa: "მიიღე ბონუსი", blurbEn: "Earn a bonus", core: false, tab: false, backed: true, tile: true, icon: "gift" },
  { id: "buyforme", route: "/buyforme", titleKa: "იყიდე ჩემთვის", titleEn: "Buy For Me", blurbKa: "ჩვენ ვიყიდით, შენ ისვენებ", blurbEn: "We buy, you relax", core: false, tab: false, backed: false, tile: true, icon: "cart" },
];

export const OPTIONAL_MODULES = MODULES.filter((m) => !m.core);
export const isNewModule = (m: AppModule) => !m.core;
export const moduleById = (id: string) => MODULES.find((m) => m.id === id);
