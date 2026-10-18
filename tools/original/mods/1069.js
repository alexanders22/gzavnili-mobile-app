__d(
  function (g, r, i, a, m, e, d) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "TOURS", {
        enumerable: !0,
        get: function () {
          return o;
        },
      }));
    const t = {
        route: "/parcels",
        target: "parcels.dir.in",
        press: !0,
        say: {
          en: "Parcels coming to Georgia are under Incoming.",
          ka: "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e8\u10d8 \u10db\u10dd\u10db\u10d0\u10d5\u10d0\u10da\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d4\u10d1\u10d8 \u2014 \u201e\u10db\u10d8\u10e6\u10d4\u10d1\u10d0\u201c \u10e9\u10d0\u10dc\u10d0\u10e0\u10d7\u10e8\u10d8.",
        },
      },
      o = [
        {
          id: "add-parcel",
          icon: "add-circle-outline",
          title: {
            en: "Add a parcel",
            ka: "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8\u10e1 \u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d0",
          },
          blurb: {
            en: "Tracking code, delivery choice, done",
            ka: "\u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2 \u10d9\u10dd\u10d3\u10d8, \u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0, \u10db\u10d6\u10d0\u10d3\u10d0\u10d0",
          },
          steps: [
            t,
            {
              target: "parcels.add",
              press: !0,
              say: {
                en: "Tap \u201cAdd tracking\u201d to add a new parcel.",
                ka: "\u10d3\u10d0\u10d0\u10ed\u10d8\u10e0\u10d4 \u201e\u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2\u10d8\u201c \u10d0\u10ee\u10d0\u10da\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8\u10e1 \u10d3\u10d0\u10e1\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10da\u10d0\u10d3.",
              },
            },
            {
              target: "incoming.demo",
              press: !0,
              say: {
                en: "Paste the tracking code from the store. Here we fill in a demo one.",
                ka: "\u10e9\u10d0\u10e1\u10d5\u10d8 \u10db\u10d0\u10e6\u10d0\u10d6\u10d8\u10d8\u10e1 \u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2 \u10d9\u10dd\u10d3\u10d8. \u10d0\u10e5 \u10e1\u10d0\u10d3\u10d4\u10db\u10dd\u10dc\u10e1\u10e2\u10e0\u10d0\u10ea\u10d8\u10dd \u10d9\u10dd\u10d3\u10e1 \u10d5\u10d8\u10e7\u10d4\u10dc\u10d4\u10d1\u10d7.",
              },
            },
            {
              target: "incoming.courier",
              say: {
                en: "Choose a courier to your door, or pick it up at a branch for free.",
                ka: "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8 \u10d9\u10d0\u10e0\u10d0\u10db\u10d3\u10d4 \u10d0\u10dc \u10e3\u10e4\u10d0\u10e1\u10dd \u10d2\u10d0\u10e2\u10d0\u10dc\u10d0 \u10e4\u10d8\u10da\u10d8\u10d0\u10da\u10d8\u10d3\u10d0\u10dc.",
              },
            },
            {
              target: "incoming.submit",
              press: !0,
              say: {
                en: "Add the parcel. You follow every stage in Parcels.",
                ka: "\u10d3\u10d0\u10d0\u10db\u10d0\u10e2\u10d4 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u2014 \u10e7\u10d5\u10d4\u10da\u10d0 \u10d4\u10e2\u10d0\u10de\u10e1 \u201e\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d4\u10d1\u10e8\u10d8\u201c \u10dc\u10d0\u10ee\u10d0\u10d5.",
              },
            },
            {
              target: "incoming.done",
              say: {
                en: "Done! Next, declare what is inside so customs does not hold it up.",
                ka: "\u10db\u10d6\u10d0\u10d3\u10d0\u10d0! \u10e8\u10d4\u10db\u10d3\u10d4\u10d2 \u10e8\u10d4\u10d0\u10d5\u10e1\u10d4 \u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d0\u10ea\u10d8\u10d0, \u10e0\u10dd\u10db \u10e1\u10d0\u10d1\u10d0\u10df\u10dd\u10d6\u10d4 \u10d0\u10e0 \u10e8\u10d4\u10e9\u10d4\u10e0\u10d3\u10d4\u10e1.",
              },
            },
          ],
        },
        {
          id: "declare",
          icon: "document-text-outline",
          title: {
            en: "Declare a parcel",
            ka: "\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4\u10d1\u10d0",
          },
          blurb: {
            en: "Store, products and prices",
            ka: "\u10db\u10d0\u10e6\u10d0\u10d6\u10d8\u10d0, \u10de\u10e0\u10dd\u10d3\u10e3\u10e5\u10e2\u10d4\u10d1\u10d8, \u10e4\u10d0\u10e1\u10d4\u10d1\u10d8",
          },
          steps: [
            t,
            {
              target: "parcels.status.AWAITING",
              press: !0,
              say: {
                en: "Open the parcels on their way to the warehouse.",
                ka: "\u10d2\u10d0\u10ee\u10e1\u10d4\u10dc\u10d8 \u10db\u10dd\u10e1\u10d0\u10da\u10dd\u10d3\u10dc\u10d4\u10da\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d4\u10d1\u10d8.",
              },
            },
            {
              target: "parcels.declare",
              press: !0,
              say: {
                en: "Tap Declare on a parcel.",
                ka: "\u10d3\u10d0\u10d0\u10ed\u10d8\u10e0\u10d4 \u201e\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4\u10d1\u10d0\u201c \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d6\u10d4.",
              },
              fallback: {
                en: "You have no parcels to declare right now \u2014 add one first.",
                ka: "\u10d0\u10ee\u10da\u10d0 \u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4\u10d1\u10d0\u10d3\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10d0\u10e0 \u10d2\u10d0\u10e5\u10d5\u10e1 \u2014 \u10ef\u10d4\u10e0 \u10d3\u10d0\u10d0\u10db\u10d0\u10e2\u10d4.",
              },
            },
            {
              target: "declare.website",
              say: {
                en: "Choose the store you bought from.",
                ka: "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10db\u10d0\u10e6\u10d0\u10d6\u10d8\u10d0, \u10e1\u10d0\u10d8\u10d3\u10d0\u10dc\u10d0\u10ea \u10d8\u10e7\u10d8\u10d3\u10d4.",
              },
            },
            {
              target: "declare.product",
              optional: !0,
              say: {
                en: "Add each product with its category and the price from the invoice.",
                ka: "\u10d3\u10d0\u10d0\u10db\u10d0\u10e2\u10d4 \u10d7\u10d8\u10d7\u10dd \u10de\u10e0\u10dd\u10d3\u10e3\u10e5\u10e2\u10d8 \u2014 \u10d9\u10d0\u10e2\u10d4\u10d2\u10dd\u10e0\u10d8\u10d0 \u10d3\u10d0 \u10e4\u10d0\u10e1\u10d8 \u10d8\u10dc\u10d5\u10dd\u10d8\u10e1\u10d8\u10d3\u10d0\u10dc.",
              },
            },
            {
              target: "declare.submit",
              say: {
                en: "Declare the parcel. Items worth over \u20be300 go through customs.",
                ka: "\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8. \u20be300-\u10d6\u10d4 \u10eb\u10d5\u10d8\u10e0\u10d8 \u10dc\u10d8\u10d5\u10d7\u10d4\u10d1\u10d8 \u10e1\u10d0\u10d1\u10d0\u10df\u10dd\u10e1 \u10d2\u10d0\u10d8\u10d5\u10da\u10d8\u10e1.",
              },
              fallback: {
                en: "This parcel is already declared \u2014 nothing more to do.",
                ka: "\u10d4\u10e1 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10e3\u10d9\u10d5\u10d4 \u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d8\u10d0.",
              },
            },
          ],
        },
        {
          id: "pay",
          icon: "card-outline",
          title: {
            en: "Pay for a parcel",
            ka: "\u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d0",
          },
          blurb: {
            en: "Address, card and the total",
            ka: "\u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8, \u10d1\u10d0\u10e0\u10d0\u10d7\u10d8, \u10ef\u10d0\u10db\u10d8",
          },
          steps: [
            t,
            {
              target: "parcels.status.RECEIVED_IN_TBILISI_WAREHOUSE",
              press: !0,
              say: {
                en: "Parcels that reached Tbilisi are under Arrived.",
                ka: "\u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10e8\u10d8 \u10e9\u10d0\u10db\u10dd\u10e1\u10e3\u10da\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d4\u10d1\u10d8 \u2014 \u201e\u10e9\u10d0\u10db\u10dd\u10e1\u10e3\u10da\u10d8\u201c \u10e9\u10d0\u10dc\u10d0\u10e0\u10d7\u10e8\u10d8.",
              },
            },
            {
              target: "parcels.pay",
              press: !0,
              say: {
                en: "When a parcel is ready, a Pay button appears. Tap it.",
                ka: "\u10e0\u10dd\u10ea\u10d0 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10db\u10d6\u10d0\u10d3\u10d0\u10d0, \u10e9\u10dc\u10d3\u10d4\u10d1\u10d0 \u201e\u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d0\u201c \u10e6\u10d8\u10da\u10d0\u10d9\u10d8.",
              },
              fallback: {
                en: "No parcel is waiting for payment right now. It shows up here once customs is cleared.",
                ka: "\u10d0\u10ee\u10da\u10d0 \u10d2\u10d0\u10d3\u10d0\u10e1\u10d0\u10ee\u10d3\u10d4\u10da\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10d0\u10e0 \u10d2\u10d0\u10e5\u10d5\u10e1. \u10d8\u10e1 \u10d0\u10e5 \u10d2\u10d0\u10db\u10dd\u10e9\u10dc\u10d3\u10d4\u10d1\u10d0 \u10d2\u10d0\u10dc\u10d1\u10d0\u10df\u10d4\u10d1\u10d8\u10e1 \u10e8\u10d4\u10db\u10d3\u10d4\u10d2.",
              },
            },
            {
              target: "pay.address",
              say: {
                en: "Choose where the courier should bring it.",
                ka: "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4, \u10e1\u10d0\u10d3 \u10db\u10dd\u10d8\u10e2\u10d0\u10dc\u10dd\u10e1 \u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10db\u10d0.",
              },
            },
            {
              target: "pay.card",
              say: {
                en: "Pick a saved card.",
                ka: "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10e8\u10d4\u10dc\u10d0\u10ee\u10e3\u10da\u10d8 \u10d1\u10d0\u10e0\u10d0\u10d7\u10d8.",
              },
            },
            {
              target: "pay.total",
              say: {
                en: "The server calculates the total: freight, delivery, customs and service.",
                ka: "\u10ef\u10d0\u10db\u10e1 \u10e1\u10d4\u10e0\u10d5\u10d4\u10e0\u10d8 \u10d8\u10d7\u10d5\u10da\u10d8\u10e1: \u10e2\u10e0\u10d0\u10dc\u10e1\u10de\u10dd\u10e0\u10e2\u10d8, \u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0, \u10e1\u10d0\u10d1\u10d0\u10df\u10dd \u10d3\u10d0 \u10db\u10dd\u10db\u10e1\u10d0\u10ee\u10e3\u10e0\u10d4\u10d1\u10d0.",
              },
            },
            {
              target: "pay.submit",
              say: {
                en: "Tap Pay to finish, then book a delivery time.",
                ka: "\u10d3\u10d0\u10d0\u10ed\u10d8\u10e0\u10d4 \u201e\u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d0\u201c, \u10e8\u10d4\u10db\u10d3\u10d4\u10d2 \u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d8\u10e1 \u10d3\u10e0\u10dd.",
              },
            },
          ],
        },
        {
          id: "courier",
          icon: "bicycle-outline",
          title: {
            en: "Order a courier",
            ka: "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8\u10e1 \u10e8\u10d4\u10d9\u10d5\u10d4\u10d7\u10d0",
          },
          blurb: {
            en: "Door delivery or branch pickup",
            ka: "\u10d9\u10d0\u10e0\u10d0\u10db\u10d3\u10d4 \u10d0\u10dc \u10e4\u10d8\u10da\u10d8\u10d0\u10da\u10d8\u10d3\u10d0\u10dc",
          },
          steps: [
            t,
            {
              target: "parcels.status.RECEIVED_IN_TBILISI_WAREHOUSE",
              press: !0,
              say: {
                en: "Open the parcels that arrived in Tbilisi.",
                ka: "\u10d2\u10d0\u10ee\u10e1\u10d4\u10dc\u10d8 \u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10e8\u10d8 \u10e9\u10d0\u10db\u10dd\u10e1\u10e3\u10da\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d4\u10d1\u10d8.",
              },
            },
            {
              target: "parcels.delivery",
              press: !0,
              say: {
                en: "Once a parcel is paid, tap Delivery.",
                ka: "\u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d8\u10e1 \u10e8\u10d4\u10db\u10d3\u10d4\u10d2 \u10d3\u10d0\u10d0\u10ed\u10d8\u10e0\u10d4 \u201e\u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0\u201c.",
              },
              fallback: {
                en: "Delivery unlocks after payment. You can also choose courier delivery when you add a parcel.",
                ka: "\u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0 \u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d8\u10e1 \u10e8\u10d4\u10db\u10d3\u10d4\u10d2 \u10e9\u10d0\u10d8\u10e0\u10d7\u10d5\u10d4\u10d1\u10d0. \u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8\u10e1 \u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d8\u10e1\u10d0\u10e1\u10d0\u10ea \u10d0\u10d8\u10e0\u10e9\u10d4\u10d5\u10d0.",
              },
            },
            {
              target: "delivery.mode",
              optional: !0,
              say: {
                en: "Courier to your door, or pick it up at a branch.",
                ka: "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8 \u10d9\u10d0\u10e0\u10d0\u10db\u10d3\u10d4 \u10d0\u10dc \u10d2\u10d0\u10e2\u10d0\u10dc\u10d0 \u10e4\u10d8\u10da\u10d8\u10d0\u10da\u10d8\u10d3\u10d0\u10dc.",
              },
            },
            {
              target: "delivery.day",
              optional: !0,
              say: {
                en: "Pick today or tomorrow.",
                ka: "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10d3\u10e6\u10d4\u10e1 \u10d0\u10dc \u10ee\u10d5\u10d0\u10da.",
              },
            },
            {
              target: "delivery.slot",
              press: !0,
              optional: !0,
              say: {
                en: "Choose a time slot.",
                ka: "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10d3\u10e0\u10dd.",
              },
            },
            {
              target: "delivery.submit",
              say: {
                en: "Book the courier \u2014 you get an SMS when they are on the way.",
                ka: "\u10d3\u10d0\u10ef\u10d0\u10d5\u10e8\u10dc\u10d4 \u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8 \u2014 SMS \u10db\u10d8\u10d8\u10e6\u10d4\u10d1, \u10e0\u10dd\u10ea\u10d0 \u10d2\u10d6\u10d0\u10e8\u10d8 \u10d8\u10e5\u10dc\u10d4\u10d1\u10d0.",
              },
              fallback: {
                en: "This parcel already has a delivery booked.",
                ka: "\u10d0\u10db \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d6\u10d4 \u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0 \u10e3\u10d9\u10d5\u10d4 \u10d3\u10d0\u10ef\u10d0\u10d5\u10e8\u10dc\u10d8\u10da\u10d8\u10d0.",
              },
            },
          ],
        },
        {
          id: "send",
          icon: "paper-plane-outline",
          title: {
            en: "Send a parcel abroad",
            ka: "\u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d0 \u10e1\u10d0\u10d6\u10e6\u10d5\u10d0\u10e0\u10d2\u10d0\u10e0\u10d4\u10d7",
          },
          blurb: {
            en: "Pickup, recipients, price",
            ka: "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8, \u10db\u10d8\u10db\u10e6\u10d4\u10d1\u10d4\u10d1\u10d8, \u10e4\u10d0\u10e1\u10d8",
          },
          steps: [
            {
              route: "/parcels",
              target: "parcels.dir.out",
              press: !0,
              say: {
                en: "Sending from Georgia is under Outgoing.",
                ka: "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10d3\u10d0\u10dc \u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d0 \u2014 \u201e\u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d0\u201c \u10e9\u10d0\u10dc\u10d0\u10e0\u10d7\u10e8\u10d8.",
              },
            },
            {
              target: "parcels.add",
              press: !0,
              say: {
                en: "Tap \u201cSend parcel\u201d.",
                ka: "\u10d3\u10d0\u10d0\u10ed\u10d8\u10e0\u10d4 \u201e\u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d0\u201c.",
              },
            },
            {
              target: "outgoing.country.DE",
              press: !0,
              say: {
                en: "Start with where it goes \u2014 price per kg and days are shown.",
                ka: "\u10d3\u10d0\u10d8\u10ec\u10e7\u10d4 \u10d3\u10d0\u10dc\u10d8\u10e8\u10dc\u10e3\u10da\u10d4\u10d1\u10d8\u10d7 \u2014 \u10e4\u10d0\u10e1\u10d8 \u10d3\u10d0 \u10d5\u10d0\u10d3\u10d0 \u10e9\u10d0\u10dc\u10e1.",
              },
            },
            {
              target: "outgoing.demoRecipient",
              press: !0,
              say: {
                en: "Fill in the recipient. Here we use a demo one.",
                ka: "\u10e8\u10d4\u10d0\u10d5\u10e1\u10d4 \u10db\u10d8\u10db\u10e6\u10d4\u10d1\u10d8 \u2014 \u10d0\u10e5 \u10e1\u10d0\u10d3\u10d4\u10db\u10dd\u10dc\u10e1\u10e2\u10e0\u10d0\u10ea\u10d8\u10dd.",
              },
            },
            {
              target: "outgoing.contacts",
              say: {
                en: "Or sync your phone contacts and pick someone.",
                ka: "\u10d0\u10dc \u10e1\u10d8\u10dc\u10e5\u10e0\u10dd\u10dc\u10d8\u10d6\u10d8\u10e0\u10d4 \u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d4\u10d1\u10d8 \u10d3\u10d0 \u10d0\u10d8\u10e0\u10e9\u10d8\u10d4.",
              },
            },
            {
              target: "outgoing.people",
              say: {
                en: "Add more people who can accept the parcel. Each gets a profile.",
                ka: "\u10d3\u10d0\u10d0\u10db\u10d0\u10e2\u10d4 \u10e1\u10ee\u10d5\u10d0 \u10db\u10d8\u10db\u10e6\u10d4\u10d1\u10d4\u10d1\u10d8 \u2014 \u10d7\u10d8\u10d7\u10dd\u10d4\u10e3\u10da\u10e1 \u10de\u10e0\u10dd\u10e4\u10d8\u10da\u10d8 \u10e8\u10d4\u10d8\u10e5\u10db\u10dc\u10d4\u10d1\u10d0.",
              },
            },
            {
              target: "outgoing.next",
              press: !0,
              say: {
                en: "Continue.",
                ka: "\u10d2\u10d0\u10d2\u10e0\u10eb\u10d4\u10da\u10d4\u10d1\u10d0.",
              },
            },
            {
              target: "outgoing.pickup",
              say: {
                en: "Now where it leaves from: a saved address, or a new one on the map.",
                ka: "\u10d0\u10ee\u10da\u10d0 \u10e1\u10d0\u10d8\u10d3\u10d0\u10dc: \u10e8\u10d4\u10dc\u10d0\u10ee\u10e3\u10da\u10d8 \u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8 \u10d0\u10dc \u10d0\u10ee\u10d0\u10da\u10d8 \u10e0\u10e3\u10d9\u10d0\u10d6\u10d4.",
              },
            },
            {
              target: "outgoing.next",
              press: !0,
              say: {
                en: "Continue to the parcel.",
                ka: "\u10d2\u10d0\u10d3\u10d0\u10d3\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d6\u10d4.",
              },
            },
            {
              target: "outgoing.weight",
              say: {
                en: "Enter the weight and what is inside.",
                ka: "\u10db\u10d8\u10e3\u10d7\u10d8\u10d7\u10d4 \u10ec\u10dd\u10dc\u10d0 \u10d3\u10d0 \u10e8\u10d8\u10d2\u10d7\u10d0\u10d5\u10e1\u10d8.",
              },
            },
            {
              target: "outgoing.next",
              press: !0,
              say: {
                en: "See the price.",
                ka: "\u10dc\u10d0\u10ee\u10d4 \u10e4\u10d0\u10e1\u10d8.",
              },
            },
            {
              target: "outgoing.submit",
              say: {
                en: "Check the price and create the shipment.",
                ka: "\u10d2\u10d0\u10d3\u10d0\u10d0\u10db\u10dd\u10ec\u10db\u10d4 \u10e4\u10d0\u10e1\u10d8 \u10d3\u10d0 \u10e8\u10d4\u10e5\u10db\u10d4\u10dc\u10d8 \u10d2\u10d6\u10d0\u10d5\u10dc\u10d8\u10da\u10d8.",
              },
            },
          ],
        },
        {
          id: "calculator",
          icon: "calculator-outline",
          title: {
            en: "What will it cost",
            ka: "\u10e0\u10d0 \u10e6\u10d8\u10e0\u10e1",
          },
          blurb: {
            en: "Weight, courier and customs",
            ka: "\u10ec\u10dd\u10dc\u10d0, \u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8, \u10e1\u10d0\u10d1\u10d0\u10df\u10dd",
          },
          steps: [
            {
              route: "/parcels",
              target: "parcels.price",
              press: !0,
              say: {
                en: "Tap Price to open the calculator.",
                ka: "\u10d3\u10d0\u10d0\u10ed\u10d8\u10e0\u10d4 \u201e\u10e4\u10d0\u10e1\u10d8\u201c \u2014 \u10d2\u10d0\u10d8\u10ee\u10e1\u10dc\u10d4\u10d1\u10d0 \u10d9\u10d0\u10da\u10d9\u10e3\u10da\u10d0\u10e2\u10dd\u10e0\u10d8.",
              },
            },
            {
              target: "calc.dir",
              say: {
                en: "Choose whether you receive a parcel or send one.",
                ka: "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10db\u10d8\u10e6\u10d4\u10d1\u10d0 \u10d0\u10dc \u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d0.",
              },
            },
            {
              target: "calc.route",
              say: {
                en: "Pick the route.",
                ka: "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10db\u10d0\u10e0\u10e8\u10e0\u10e3\u10e2\u10d8.",
              },
            },
            {
              target: "calc.weight.5",
              press: !0,
              say: {
                en: "Set the weight \u2014 here 5 kg.",
                ka: "\u10db\u10d8\u10e3\u10d7\u10d8\u10d7\u10d4 \u10ec\u10dd\u10dc\u10d0 \u2014 \u10db\u10d0\u10d2. 5 \u10d9\u10d2.",
              },
            },
            {
              target: "calc.delivery",
              say: {
                en: "Courier and repacking are added only if you want them.",
                ka: "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8 \u10d3\u10d0 \u10d2\u10d0\u10d3\u10d0\u10e4\u10e3\u10d7\u10d5\u10d0 \u2014 \u10db\u10ee\u10dd\u10da\u10dd\u10d3 \u10d7\u10e3 \u10d2\u10d8\u10dc\u10d3\u10d0.",
              },
            },
            {
              target: "calc.total",
              say: {
                en: "The total updates instantly, with customs and loyalty points.",
                ka: "\u10ef\u10d0\u10db\u10d8 \u10db\u10dd\u10db\u10d4\u10dc\u10e2\u10d0\u10da\u10e3\u10e0\u10d0\u10d3 \u10d0\u10ee\u10da\u10d3\u10d4\u10d1\u10d0 \u2014 \u10e1\u10d0\u10d1\u10d0\u10df\u10dd\u10d7\u10d8 \u10d3\u10d0 \u10e5\u10e3\u10da\u10d4\u10d1\u10d8\u10d7.",
              },
            },
          ],
        },
      ];
  },
  1069,
  [],
);