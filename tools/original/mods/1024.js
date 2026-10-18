__d(
  function (g, _r, _i, a, m, e, _d) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "DEMO", {
        enumerable: !0,
        get: function () {
          return t;
        },
      }),
      Object.defineProperty(e, "demoAdapter", {
        enumerable: !0,
        get: function () {
          return _;
        },
      }));
    const t = !1,
      s = {
        id: "demo-customer",
        first_name: "Vasil",
        last_name: "Beridze",
        email: "vasil@example.com",
        phone: "+995 555 11 22 33",
        room_number: "GZ-1166",
        customerType: "PERSONAL",
        verified: !0,
        repackaging: !0,
      },
      r = {
        declaration_enable: !1,
        custom_enable: !1,
        custom_right_icon_enable: !1,
        custom_right_double_icon_enable: !1,
        delivery_enable: !1,
        payment_enable: !1,
        is_payment_invoice: !1,
        payment_invoice_status: "NOT INVOICE",
        is_payment_invoice_enabled: !1,
      };
    function n(t) {
      const s = new Date();
      return (s.setDate(s.getDate() + t), s.toISOString());
    }
    const o = {
        orders: [
          {
            id: "o1",
            name: "Nike sneakers",
            tracking_number: "1Z999AA10123456784",
            status: "AWAITING",
            group: "AWAITING",
            weight: null,
            price: null,
            declaration_status: null,
            custom_status: "0",
            NeedsCustom: !1,
            payed: !1,
            wrapping: !0,
            timeSlot: null,
            nusxa: "NX-2001",
            branch: { name: "USA" },
            declaration: [],
            orderHistory: [
              { status: "AWAITING", name: "AWAITING", date: n(-2) },
            ],
          },
          {
            id: "o2",
            name: "Adidas jacket",
            tracking_number: "4201902594001118992",
            status: "RECEIVED IN US WAREHOUSE",
            group: "RECEIVED",
            weight: "1.10",
            price: "45",
            declaration_status: "DECLERED",
            custom_status: "0",
            NeedsCustom: !1,
            payed: !1,
            wrapping: !0,
            timeSlot: null,
            nusxa: "NX-2002",
            branch: { name: "USA" },
            declaration: [
              {
                id: "d2",
                order_id: "o2",
                website: "adidas.com",
                category: "Clothing",
                price: "45",
                currency: "USD",
                status: "Declared",
              },
            ],
            orderHistory: [
              { status: "AWAITING", name: "AWAITING", date: n(-6) },
              {
                status: "RECEIVED IN US WAREHOUSE",
                name: "IN_WAREHOUSE",
                date: n(-3),
              },
            ],
          },
          {
            id: "o3",
            name: "iPhone case",
            tracking_number: "9400111206212345678901",
            status: "ON THE WAY FROM US WAREHOUSE",
            group: "ON_THE_WAY_FROM_US_WAREHOUSE",
            weight: "0.80",
            price: "25",
            declaration_status: "DECLERED",
            custom_status: "0",
            NeedsCustom: !1,
            payed: !1,
            wrapping: !0,
            timeSlot: null,
            nusxa: "NX-2003",
            branch: { name: "USA" },
            declaration: [
              {
                id: "d3",
                order_id: "o3",
                website: "apple.com",
                category: "Phone",
                price: "25",
                currency: "USD",
                status: "Declared",
              },
            ],
            orderHistory: [
              { status: "AWAITING", name: "AWAITING", date: n(-9) },
              {
                status: "RECEIVED IN US WAREHOUSE",
                name: "IN_WAREHOUSE",
                date: n(-6),
              },
              {
                status: "ON THE WAY FROM US WAREHOUSE",
                name: "ON_THE_WAY_FROM_US_WAREHOUSE",
                date: n(-2),
              },
            ],
          },
          {
            id: "o4",
            name: "Dyson hair dryer",
            tracking_number: "1Z999AA10123456799",
            status: "RECEIVED IN TBILISI WAREHOUSE",
            group: "RECEIVED_IN_TBILISI_WAREHOUSE",
            weight: "1.90",
            price: "340",
            declaration_status: "DECLERED",
            custom_status: "0",
            NeedsCustom: !0,
            payed: !1,
            wrapping: !0,
            timeSlot: null,
            nusxa: "NX-1002",
            branch: { name: "USA" },
            custom_fee: { custom_fee_amount: "15.00" },
            declaration: [
              {
                id: "d4",
                order_id: "o4",
                website: "amazon.com",
                category: "Households",
                price: "340",
                currency: "USD",
                status: "Declared",
              },
            ],
            orderHistory: [
              { status: "AWAITING", name: "AWAITING", date: n(-12) },
              {
                status: "RECEIVED IN US WAREHOUSE",
                name: "IN_WAREHOUSE",
                date: n(-9),
              },
              {
                status: "ON THE WAY FROM US WAREHOUSE",
                name: "ON_THE_WAY_FROM_US_WAREHOUSE",
                date: n(-5),
              },
              {
                status: "RECEIVED IN TBILISI WAREHOUSE",
                name: "ARRIVED",
                date: n(-1),
              },
            ],
          },
          {
            id: "o5",
            name: "Levis jeans",
            tracking_number: "1Z999AA10123456790",
            status: "RECEIVED IN TBILISI WAREHOUSE",
            group: "RECEIVED_IN_TBILISI_WAREHOUSE",
            weight: "2.40",
            price: "120",
            declaration_status: "DECLERED",
            custom_status: "8",
            NeedsCustom: !0,
            payed: !1,
            wrapping: !0,
            timeSlot: null,
            nusxa: "NX-1001",
            branch: { name: "USA" },
            custom_fee: { custom_fee_amount: "15.00" },
            declaration: [
              {
                id: "d5",
                order_id: "o5",
                website: "levis.com",
                category: "Clothing",
                price: "120",
                currency: "USD",
                status: "Declared",
              },
            ],
            orderHistory: [
              { status: "AWAITING", name: "AWAITING", date: n(-9) },
              {
                status: "RECEIVED IN US WAREHOUSE",
                name: "IN_WAREHOUSE",
                date: n(-7),
              },
              {
                status: "ON THE WAY FROM US WAREHOUSE",
                name: "ON_THE_WAY_FROM_US_WAREHOUSE",
                date: n(-4),
              },
              {
                status: "RECEIVED IN TBILISI WAREHOUSE",
                name: "ARRIVED",
                date: n(-1),
              },
            ],
          },
          {
            id: "o6",
            name: "Sony headphones",
            tracking_number: "1Z999AA10123456785",
            status: "DELIVERED",
            group: "DELIVERED",
            weight: "3.20",
            price: "210",
            declaration_status: "DECLERED",
            custom_status: "8",
            NeedsCustom: !0,
            payed: !0,
            wrapping: !0,
            timeSlot: "12:00-20:00",
            nusxa: "NX-1000",
            branch: { name: "USA" },
            declaration: [
              {
                id: "d6",
                order_id: "o6",
                website: "sony.com",
                category: "Audio/video equipment",
                price: "210",
                currency: "USD",
                status: "Declared",
              },
            ],
            orderHistory: [
              { status: "AWAITING", name: "AWAITING", date: n(-20) },
              {
                status: "RECEIVED IN US WAREHOUSE",
                name: "IN_WAREHOUSE",
                date: n(-17),
              },
              {
                status: "ON THE WAY FROM US WAREHOUSE",
                name: "ON_THE_WAY_FROM_US_WAREHOUSE",
                date: n(-14),
              },
              {
                status: "RECEIVED IN TBILISI WAREHOUSE",
                name: "ARRIVED",
                date: n(-11),
              },
              { status: "DELIVERED", name: "RECEIVED", date: n(-10) },
            ],
          },
        ],
        addresses: [
          {
            id: "a1",
            address: "Rustaveli Avenue 12",
            title: "Home",
            tag: "home",
            city: "Tbilisi",
            additionalInstructions: "Second floor",
            isDefault: !0,
            lat: "44.799",
            lang: "41.715",
          },
          {
            id: "a2",
            address: "Chavchavadze Avenue 37",
            title: "Office",
            tag: "work",
            city: "Tbilisi",
            additionalInstructions: "Reception",
            isDefault: !1,
            lat: "44.745",
            lang: "41.709",
          },
        ],
        nextId: 100,
      },
      i = [
        [
          "Clothing",
          "\u10e2\u10d0\u10dc\u10e1\u10d0\u10ea\u10db\u10d4\u10da\u10d8",
        ],
        [
          "Auto/moto parts",
          "\u10d0\u10d5\u10e2\u10dd/\u10db\u10dd\u10e2\u10dd \u10dc\u10d0\u10ec\u10d8\u10da\u10d4\u10d1\u10d8",
        ],
        [
          "Food supplements",
          "\u10e1\u10d0\u10d9\u10d5\u10d4\u10d1\u10d8 \u10d3\u10d0\u10dc\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d8",
        ],
        [
          "Audio/video equipment",
          "\u10d0\u10e3\u10d3\u10d8\u10dd/\u10d5\u10d8\u10d3\u10d4\u10dd \u10e2\u10d4\u10e5\u10dc\u10d8\u10d9\u10d0",
        ],
        [
          "Computer",
          "\u10d9\u10dd\u10db\u10de\u10d8\u10e3\u10e2\u10d4\u10e0\u10d8",
        ],
        ["Phone", "\u10e2\u10d4\u10da\u10d4\u10e4\u10dd\u10dc\u10d8"],
        ["Jewelry", "\u10d1\u10d8\u10df\u10e3\u10e2\u10d4\u10e0\u10d8\u10d0"],
        ["Cosmetics", "\u10d9\u10dd\u10e1\u10db\u10d4\u10e2\u10d8\u10d9\u10d0"],
        [
          "Parfumes",
          "\u10de\u10d0\u10e0\u10e4\u10d8\u10e3\u10db\u10d4\u10e0\u10d8\u10d0",
        ],
        [
          "Glass products",
          "\u10e8\u10e3\u10e8\u10d8\u10e1 \u10dc\u10d0\u10ec\u10d0\u10e0\u10db\u10d8",
        ],
        [
          "Plants",
          "\u10db\u10ea\u10d4\u10dc\u10d0\u10e0\u10d4\u10d4\u10d1\u10d8",
        ],
        [
          "Footwear",
          "\u10e4\u10d4\u10ee\u10e1\u10d0\u10ea\u10db\u10d4\u10da\u10d8",
        ],
        [
          "Households",
          "\u10e1\u10d0\u10dd\u10ef\u10d0\u10ee\u10dd \u10dc\u10d8\u10d5\u10d7\u10d4\u10d1\u10d8",
        ],
        [
          "Printed products",
          "\u10dc\u10d0\u10d1\u10d4\u10ed\u10d3\u10d8 \u10de\u10e0\u10dd\u10d3\u10e3\u10e5\u10ea\u10d8\u10d0",
        ],
        [
          "Toys",
          "\u10e1\u10d0\u10d7\u10d0\u10db\u10d0\u10e8\u10dd\u10d4\u10d1\u10d8",
        ],
        ["Lamps", "\u10e1\u10d0\u10dc\u10d0\u10d7\u10d4\u10d1\u10d8"],
        ["Watch", "\u10e1\u10d0\u10d0\u10d7\u10d8"],
        ["Glasses (Sunglasses)", "\u10e1\u10d0\u10d7\u10d5\u10d0\u10da\u10d4"],
        ["Bags", "\u10e9\u10d0\u10dc\u10d7\u10d4\u10d1\u10d8"],
        [
          "Sports Equipment",
          "\u10e1\u10de\u10dd\u10e0\u10e2\u10e3\u10da\u10d8 \u10d8\u10dc\u10d5\u10d4\u10dc\u10e2\u10d0\u10e0\u10d8",
        ],
        [
          "Tools",
          "\u10ee\u10d4\u10da\u10e1\u10d0\u10ec\u10e7\u10dd\u10d4\u10d1\u10d8",
        ],
        [
          "Various consumer products",
          "\u10e1\u10ee\u10d5\u10d0\u10d3\u10d0\u10e1\u10ee\u10d5\u10d0 \u10e1\u10d0\u10db\u10dd\u10db\u10ee\u10db\u10d0\u10e0\u10d4\u10d1\u10da\u10dd",
        ],
        [
          "Computer parts",
          "\u10d9\u10dd\u10db\u10de\u10d8\u10e3\u10e2\u10d4\u10e0\u10d8\u10e1 \u10dc\u10d0\u10ec\u10d8\u10da\u10d4\u10d1\u10d8",
        ],
        [
          "Music Instruments",
          "\u10db\u10e3\u10e1\u10d8\u10d9\u10d0\u10da\u10e3\u10e0\u10d8 \u10d8\u10dc\u10e1\u10e2\u10e0\u10e3\u10db\u10d4\u10dc\u10e2\u10d4\u10d1\u10d8",
        ],
      ],
      d = [
        "amazon.com",
        "ebay.com",
        "nike.com",
        "apple.com",
        "shein.com",
        "aliexpress.com",
        "zara.com",
        "asos.com",
      ],
      u = (t) => {
        const s = Number(t.custom_status ?? 0),
          n = "RECEIVED_IN_TBILISI_WAREHOUSE" === t.group;
        return {
          ...t,
          buttons: {
            ...r,
            declaration_enable: "DELIVERED" !== t.status,
            custom_enable: !0 === t.NeedsCustom,
            custom_right_icon_enable: !0 === t.NeedsCustom && s > 0 && s < 9,
            delivery_enable: !0 === t.payed && "DELIVERED" !== t.status,
            payment_enable:
              n &&
              "DECLERED" === t.declaration_status &&
              "8" === t.custom_status &&
              !t.payed,
            is_payment_invoice_enabled:
              n &&
              "DECLERED" === t.declaration_status &&
              "8" === t.custom_status &&
              !t.payed,
          },
        };
      },
      c = (t, s) => ({
        data: s,
        status: 200,
        statusText: "OK",
        headers: {},
        config: t,
      }),
      l = (t) =>
        t.data ? ("string" == typeof t.data ? JSON.parse(t.data) : t.data) : {};
    function E(t) {
      const r = (t.url ?? "").split("?")[0],
        n = (t.method ?? "get").toLowerCase(),
        c = l(t);
      if (r.includes("/v1/auth/login"))
        return { access_token: "demo.token", refresh_token: "demo.token" };
      if (r.includes("/customers/search/userId")) return s;
      if (r.includes("/content-management"))
        return i.map(([t, s], r) => ({
          identifier: `Category_${r + 1}`,
          nameEn: t,
          nameKa: s,
          page: "declaration",
        }));
      if (r.includes("/shops/getShops")) return d;
      if (r.includes("/addresses") && !r.includes("customer-addresses"))
        return [
          {
            id: "w1",
            street: "3007 Rosemont Avenue",
            city: "Wilmington",
            state: "Delaware",
            country: "USA",
            zipCode: "19802",
            tel: "+1 (302) 510 6956",
          },
        ];
      if (r.includes("/customer-addresses")) return o.addresses;
      if (r.includes("/orders/statusQuantity")) {
        const t = {};
        for (const s of o.orders) t[s.group] = (t[s.group] ?? 0) + 1;
        return t;
      }
      if (r.includes("/orders/filterByStatys/")) {
        const t = r.split("/orders/filterByStatys/")[1];
        return o.orders.filter((s) => s.group === t).map(u);
      }
      if (r.includes("/orders/getUnpaidOrders"))
        return o.orders.filter((t) => !t.payed).map(u);
      if (r.includes("/orders/getByNusxa/")) {
        const t = r.split("/orders/getByNusxa/")[1],
          s = o.orders.find((s) => s.id === t);
        return o.orders.filter((t) => t.nusxa === s?.nusxa).map(u);
      }
      if (r.includes("/orders/getOrderPrices")) {
        const t = c.orders ?? [],
          s = o.orders.filter((s) => t.includes(s.id)),
          r = s.reduce((t, s) => t + 24 * Number(s.weight ?? 1), 0),
          n = s.reduce(
            (t, s) => t + Number(s.custom_fee?.custom_fee_amount ?? 0),
            0,
          ),
          i = {
            totalWeightCost: p(r),
            repackagingCost: 5,
            insuranceCost: 2,
            delivery_fee: 5,
            service_fee: 3,
            customFee: p(n),
            discountAmount: 0,
            totalPrice: p(r + 5 + 2 + 5 + 3 + n),
          };
        return [s.map((t) => ({ orderId: t.id, ...i })), [i]];
      }
      if (r.includes("/orders/order_payment_status/")) {
        const t = r.split("/orders/order_payment_status/")[1],
          s = o.orders.find((s) => s.id === t);
        return (s && (s.payed = !0), { payStatus: "COMPLETED" });
      }
      if (r.includes("/orders/nusxa_update/")) {
        const t = r.split("/orders/nusxa_update/")[1],
          s = o.orders.find((s) => s.id === t);
        for (const t of o.orders)
          t.nusxa === s?.nusxa &&
            ((t.custom_status = String(c.custom_status)),
            void 0 !== c.DeclarationPaymentAuto &&
              (t.DeclarationPaymentAuto = c.DeclarationPaymentAuto));
        return { ok: !0 };
      }
      if (r.includes("/orders/wrapping-update/")) {
        const t = r.split("/orders/wrapping-update/")[1],
          s = o.orders.find((s) => s.id === t);
        return (s && (s.wrapping = c.wrapping), { ok: !0 });
      }
      if (r.includes("/orders/time-slot-update/")) {
        const t = r.split("/orders/time-slot-update/")[1],
          s = o.orders.find((s) => s.id === t);
        return (s && (s.timeSlot = c.timeSlot), { ok: !0 });
      }
      if ("/orders" === r && "post" === n) {
        if (o.orders.some((t) => t.tracking_number === c.tracking_number))
          throw Object.assign(new Error("duplicate"), {
            response: { data: { message: "duplicate key value" } },
          });
        const t = {
          id: "o" + o.nextId++,
          name: c.name || `Order ${o.orders.length + 1}`,
          tracking_number: c.tracking_number,
          status: "AWAITING",
          group: "AWAITING",
          weight: null,
          price: null,
          declaration_status: null,
          custom_status: "0",
          NeedsCustom: !1,
          payed: !1,
          wrapping: !0,
          timeSlot: null,
          nusxa: `NX-${o.nextId}`,
          branch: { name: "china" === c.country ? "China" : "USA" },
          declaration: [],
          orderHistory: [
            {
              status: "AWAITING",
              name: "AWAITING",
              date: new Date().toISOString(),
            },
          ],
        };
        return (o.orders.unshift(t), t);
      }
      if (r.startsWith("/orders/") && "put" === n) {
        const t = r.split("/orders/")[1],
          s = o.orders.find((s) => s.id === t);
        return (s && Object.assign(s, c), s ?? { ok: !0 });
      }
      if ("/declarations" === r && "post" === n) {
        const t = o.orders.find((t) => t.id === c.order_id),
          s = { id: "d" + o.nextId++, ...c };
        return (t?.declaration.push(s), s);
      }
      if (r.startsWith("/declarations/") && "delete" === n) {
        const t = r.split("/declarations/")[1];
        for (const s of o.orders)
          s.declaration = s.declaration.filter((s) => s.id !== t);
        return { ok: !0 };
      }
      if (r.startsWith("/declarations/") && "put" === n) return { ok: !0 };
      if (r.includes("/signify/template/"))
        return { url: "about:blank#demo-signature" };
      if (r.includes("/district/timeSlots"))
        return {
          today: [],
          tomorrow: ["12:00-15:00", "15:00-19:00", "19:00-22:00"],
        };
      if (r.includes("/district/find")) return "Tbilisi";
      if (r.includes("/district/date")) return new Date().toISOString();
      if (r.includes("/payments/cards"))
        return [
          {
            id: "card-1",
            maskedPan: "4821",
            cardType: "visa",
            isDefault: !0,
            expiryDate: "09/28",
          },
          {
            id: "card-2",
            maskedPan: "7734",
            cardType: "mc",
            isDefault: !1,
            expiryDate: "02/27",
          },
        ];
      if (r.includes("/transactions/customer/get")) return [];
      if ("/transactions" === r && "post" === n) {
        for (const t of c.order_ids ?? []) {
          const s = o.orders.find((s) => s.id === t);
          s && (s.payed = !0);
        }
        return { orderId: "DEMO-ORDER", status: "PENDING" };
      }
    }
    function p(t) {
      return Math.round(100 * t) / 100;
    }
    const _ = async (t) => {
      const s = E(t);
      return (
        await new Promise((t) => setTimeout(t, 120)),
        c(t, void 0 === s ? (Array.isArray(s) ? [] : {}) : s)
      );
    };
  },
  1024,
  [],
);