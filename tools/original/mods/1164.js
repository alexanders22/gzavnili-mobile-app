__d(
  function (g, r, _i, _a, m, _e, _d) {
    "use strict";
    function e(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Object.defineProperty(_e, "__esModule", { value: !0 }),
      Object.defineProperty(_e, "default", {
        enumerable: !0,
        get: function () {
          return j;
        },
      }));
    var t = r(_d[0]),
      o = r(_d[1]),
      n = r(_d[2]),
      i = r(_d[3]),
      s = e(r(_d[4])),
      l = e(r(_d[5])),
      c = r(_d[6]),
      d = r(_d[7]),
      a = r(_d[8]),
      u = r(_d[9]),
      p = r(_d[10]),
      h = r(_d[11]),
      y = r(_d[12]),
      f = r(_d[13]),
      x = r(_d[14]);
    function j() {
      const e = (0, t.c)(174),
        { theme: j } = (0, h.useTokens)(),
        T = "ka" === (0, a.useLang)(),
        v = (0, n.useLocalSearchParams)(),
        C = v.status || "RECEIVED_IN_TBILISI_WAREHOUSE",
        { data: D } = (0, c.useOrderFromList)(C, v.id),
        { data: P } = (0, c.useCustomerAddresses)(),
        { data: I } = (0, c.useTimeSlots)(),
        B = (0, c.useBookDelivery)(),
        z = (0, c.useSetCourier)(),
        { data: L } = (0, d.usePickupLocations)(),
        W = (0, d.useSetPickupLocation)(),
        [A, O] = (0, i.useState)(!1);
      let E;
      e[0] !== P
        ? ((E = P?.find(w) ?? P?.[0]), (e[0] = P), (e[1] = E))
        : (E = e[1]);
      const R = E,
        { data: V, isError: G } = (0, c.useDistrict)(R?.lat, R?.lang),
        [K, U] = (0, i.useState)(null),
        [$, F] = (0, i.useState)("tomorrow"),
        [H, M] = (0, i.useState)(null),
        [N, Y] = (0, i.useState)(!1),
        [q, J] = (0, i.useState)(!1),
        [Q, X] = (0, i.useState)(!1),
        Z = K ?? !1 !== D?.courier_delivery;
      let ee;
      e[2] !== $ || e[3] !== I?.today || e[4] !== I?.tomorrow
        ? ((ee = "today" === $ ? (I?.today ?? []) : (I?.tomorrow ?? [])),
          (e[2] = $),
          (e[3] = I?.today),
          (e[4] = I?.tomorrow),
          (e[5] = ee))
        : (ee = e[5]);
      const te = ee,
        oe = !!D?.timeSlot,
        ne = R ? `${R.address ?? ""}${R.city ? `, ${R.city}` : ""}` : void 0,
        ie = !!D?.payed && "pickup" === D?.delivery_method,
        re =
          !!D?.payed && !!D?.delivery_paid && "pickup" !== D?.delivery_method;
      let se;
      e[6] !== L || e[7] !== D?.pickup_location?.id
        ? ((se = D?.pickup_location?.id ?? L?.find(S)?.id ?? L?.[0]?.id),
          (e[6] = L),
          (e[7] = D?.pickup_location?.id),
          (e[8] = se))
        : (se = e[8]);
      const le = se;
      let ce;
      e[9] !== ne || e[10] !== le || e[11] !== D || e[12] !== z
        ? ((ce = (e) => {
            (U(e),
              D &&
                z.mutate({
                  orderId: D.id,
                  courier: e,
                  delivery_address: e ? ne : void 0,
                  pickup_location_id: e ? void 0 : le,
                }));
          }),
          (e[9] = ne),
          (e[10] = le),
          (e[11] = D),
          (e[12] = z),
          (e[13] = ce))
        : (ce = e[13]);
      const de = ce;
      let ae;
      e[14] !== B ||
      e[15] !== $ ||
      e[16] !== q ||
      e[17] !== N ||
      e[18] !== D ||
      e[19] !== H
        ? ((ae = () => {
            D &&
              H &&
              B.mutate(
                {
                  orderId: D.id,
                  timeSlot: H,
                  day: $,
                  do_not_ring_bell: q,
                  leave_by_door: N,
                },
                { onSuccess: () => X(!0) },
              );
          }),
          (e[14] = B),
          (e[15] = $),
          (e[16] = q),
          (e[17] = N),
          (e[18] = D),
          (e[19] = H),
          (e[20] = ae))
        : (ae = e[20]);
      const ue = ae;
      let me, pe;
      (e[21] === Symbol.for("react.memo_cache_sentinel")
        ? ((me = [h.styles.row, { gap: p.space.md }]), (e[21] = me))
        : (me = e[21]),
        e[22] !== j.ink
          ? ((pe = (0, x.jsx)(s.default, {
              onPress: k,
              hitSlop: 12,
              children: (0, x.jsx)(o.Ionicons, {
                name: "chevron-back",
                size: 24,
                color: j.ink,
              }),
            })),
            (e[22] = j.ink),
            (e[23] = pe))
          : (pe = e[23]));
      const he =
        D?.payed && "pickup" === D?.delivery_method
          ? T
            ? "\u10dd\u10e4\u10d8\u10e1\u10d8\u10d3\u10d0\u10dc \u10d2\u10d0\u10e2\u10d0\u10dc\u10d0"
            : "Office pickup"
          : T
            ? "\u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0"
            : "Delivery";
      let ye, ge;
      (e[24] !== he
        ? ((ye = (0, x.jsx)(h.Title, { children: he })),
          (e[24] = he),
          (e[25] = ye))
        : (ye = e[25]),
        e[26] !== pe || e[27] !== ye
          ? ((ge = (0, x.jsxs)(l.default, { style: me, children: [pe, ye] })),
            (e[26] = pe),
            (e[27] = ye),
            (e[28] = ge))
          : (ge = e[28]));
      const fe = ge;
      if (ie && D) {
        const t = (0, d.pickupStage)(D),
          n = D.pickup_location,
          i = t >= d.PICKUP_STAGES.length - 1;
        let c, a, u;
        (e[29] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = {
              marginTop: p.space.lg,
              alignItems: "center",
              paddingVertical: 24,
            }),
            (e[29] = c))
          : (c = e[29]),
          e[30] !== i
            ? ((a = i
                ? (0, x.jsx)(y.KraftBox, { size: 104, cloud: !0 })
                : (0, x.jsx)(y.Drawing, { name: "how", width: 96, float: !0 })),
              (e[30] = i),
              (e[31] = a))
            : (a = e[31]),
          e[32] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = { marginTop: p.space.lg, textAlign: "center" }),
              (e[32] = u))
            : (u = e[32]));
        const b =
          t >= d.PICKUP_STAGES.length
            ? T
              ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10d2\u10d0\u10e2\u10d0\u10dc\u10d8\u10da\u10d8\u10d0"
              : "Picked up"
            : i
              ? T
                ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10d2\u10d4\u10da\u10dd\u10d3\u10d4\u10d1\u10d0!"
                : "Your parcel is ready!"
              : T
                ? "\u10d5\u10d0\u10db\u10d6\u10d0\u10d3\u10d4\u10d1\u10d7 \u10d2\u10d0\u10e1\u10d0\u10e2\u10d0\u10dc\u10d0\u10d3"
                : "Getting it ready for pickup";
        let k, S;
        (e[33] !== b
          ? ((k = (0, x.jsx)(h.Body, {
              weight: "700",
              size: p.font.s16,
              style: u,
              children: b,
            })),
            (e[33] = b),
            (e[34] = k))
          : (k = e[34]),
          e[35] === Symbol.for("react.memo_cache_sentinel")
            ? ((S = { marginTop: 6, textAlign: "center" }), (e[35] = S))
            : (S = e[35]));
        const w = i
          ? T
            ? "\u10db\u10dd\u10d3\u10d8 \u10e1\u10d0\u10db\u10e3\u10e8\u10d0\u10dd \u10e1\u10d0\u10d0\u10d7\u10d4\u10d1\u10e8\u10d8 \u10d3\u10d0 \u10d0\u10e9\u10d5\u10d4\u10dc\u10d4 \u10dd\u10d7\u10d0\u10ee\u10d8\u10e1 \u10e8\u10e2\u10e0\u10d8\u10ee\u10d9\u10dd\u10d3\u10d8"
            : "Come during opening hours and show your room barcode"
          : T
            ? "\u10e8\u10d4\u10d2\u10d0\u10e2\u10e7\u10dd\u10d1\u10d8\u10dc\u10d4\u10d1\u10d7, \u10e0\u10dd\u10ea\u10d0 \u10dd\u10e4\u10d8\u10e1\u10e8\u10d8 \u10db\u10d6\u10d0\u10d3 \u10d8\u10e5\u10dc\u10d4\u10d1\u10d0"
            : "We'll let you know when it's ready at the office";
        let v, C, P, I, B;
        (e[36] !== w
          ? ((v = (0, x.jsx)(h.Body, {
              muted: !0,
              size: p.font.s12,
              style: S,
              children: w,
            })),
            (e[36] = w),
            (e[37] = v))
          : (v = e[37]),
          e[38] !== a || e[39] !== k || e[40] !== v
            ? ((C = (0, x.jsxs)(h.Card, { style: c, children: [a, k, v] })),
              (e[38] = a),
              (e[39] = k),
              (e[40] = v),
              (e[41] = C))
            : (C = e[41]),
          e[42] === Symbol.for("react.memo_cache_sentinel")
            ? ((P = { marginTop: p.space.md }), (e[42] = P))
            : (P = e[42]),
          e[43] !== T ||
          e[44] !== i ||
          e[45] !== t ||
          e[46] !== j.faint ||
          e[47] !== j.green ||
          e[48] !== j.greenDeep ||
          e[49] !== j.ink ||
          e[50] !== j.paper ||
          e[51] !== j.tint2
            ? ((I = d.PICKUP_STAGES.map((e, n) => {
                const s = n < t || (i && n === t),
                  c = n === t && !s;
                return (0, x.jsxs)(
                  l.default,
                  {
                    style: [
                      h.styles.row,
                      { gap: p.space.md, paddingVertical: 7 },
                    ],
                    children: [
                      (0, x.jsx)(l.default, {
                        style: {
                          width: 22,
                          height: 22,
                          borderRadius: 11,
                          alignItems: "center",
                          justifyContent: "center",
                          backgroundColor: s ? j.green : c ? j.tint2 : j.paper,
                          borderWidth: c ? 2 : 0,
                          borderColor: j.green,
                        },
                        children: s
                          ? (0, x.jsx)(o.Ionicons, {
                              name: "checkmark",
                              size: 13,
                              color: j.greenDeep,
                            })
                          : null,
                      }),
                      (0, x.jsx)(h.Body, {
                        size: p.font.s13,
                        weight: c ? "700" : "500",
                        style: { color: s || c ? j.ink : j.faint },
                        children: T ? e.ka : e.en,
                      }),
                    ],
                  },
                  e.en,
                );
              })),
              (e[43] = T),
              (e[44] = i),
              (e[45] = t),
              (e[46] = j.faint),
              (e[47] = j.green),
              (e[48] = j.greenDeep),
              (e[49] = j.ink),
              (e[50] = j.paper),
              (e[51] = j.tint2),
              (e[52] = I))
            : (I = e[52]),
          e[53] !== I
            ? ((B = (0, x.jsx)(h.Card, { style: P, children: I })),
              (e[53] = I),
              (e[54] = B))
            : (B = e[54]));
        const z = T
          ? "\u10e1\u10d0\u10d3 \u10d2\u10d0\u10d8\u10e2\u10d0\u10dc"
          : "Where to collect";
        let E, R, V;
        (e[55] !== z
          ? ((E = (0, x.jsx)(h.SectionLabel, { children: z })),
            (e[55] = z),
            (e[56] = E))
          : (E = e[56]),
          e[57] !== T || e[58] !== n
            ? ((R = n
                ? (0, x.jsx)(f.PickupLocationCard, { location: n, ka: T })
                : null),
              (e[57] = T),
              (e[58] = n),
              (e[59] = R))
            : (R = e[59]),
          e[60] !== A ||
          e[61] !== T ||
          e[62] !== n?.id ||
          e[63] !== L ||
          e[64] !== D.id ||
          e[65] !== W ||
          e[66] !== t ||
          e[67] !== j.greenDeep
            ? ((V =
                t < d.PICKUP_STAGES.length - 1
                  ? A
                    ? (0, x.jsx)(l.default, {
                        style: { marginTop: p.space.md },
                        children: (0, x.jsx)(f.PickupLocationPicker, {
                          locations: L ?? [],
                          selectedId: n?.id,
                          ka: T,
                          onSelect: (e) =>
                            W.mutate(
                              { orderId: D.id, pickup_location_id: e },
                              { onSuccess: () => O(!1) },
                            ),
                        }),
                      })
                    : (0, x.jsx)(s.default, {
                        onPress: () => O(!0),
                        style: { alignSelf: "center", marginTop: p.space.md },
                        children: (0, x.jsx)(h.Body, {
                          size: p.font.s13,
                          weight: "600",
                          style: { color: j.greenDeep },
                          children: T
                            ? "\u10e1\u10ee\u10d5\u10d0 \u10dd\u10e4\u10d8\u10e1\u10d8\u10e1 \u10d0\u10e0\u10e9\u10d4\u10d5\u10d0"
                            : "Choose another office",
                        }),
                      })
                  : null),
              (e[60] = A),
              (e[61] = T),
              (e[62] = n?.id),
              (e[63] = L),
              (e[64] = D.id),
              (e[65] = W),
              (e[66] = t),
              (e[67] = j.greenDeep),
              (e[68] = V))
            : (V = e[68]));
        const G = T
          ? "\u10e9\u10d4\u10db\u10d8 \u10dd\u10d7\u10d0\u10ee\u10d8\u10e1 \u10e8\u10e2\u10e0\u10d8\u10ee\u10d9\u10dd\u10d3\u10d8"
          : "Show my room barcode";
        let K, U, $;
        (e[69] === Symbol.for("react.memo_cache_sentinel")
          ? ((K = { marginTop: p.space.xl }), (e[69] = K))
          : (K = e[69]),
          e[70] !== G
            ? ((U = (0, x.jsx)(h.Btn, {
                label: G,
                icon: "barcode-outline",
                onPress: _,
                style: K,
              })),
              (e[70] = G),
              (e[71] = U))
            : (U = e[71]),
          e[72] === Symbol.for("react.memo_cache_sentinel")
            ? (($ = { marginTop: p.space.md, textAlign: "center" }),
              (e[72] = $))
            : ($ = e[72]));
        const F = T
          ? "\u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d8\u10da\u10d8\u10d0 \u10dd\u10e4\u10d8\u10e1\u10d8\u10d3\u10d0\u10dc \u10d2\u10d0\u10e2\u10d0\u10dc\u10d8\u10d7 (0 \u20be). \u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d6\u10d4 \u10d2\u10d0\u10d3\u10d0\u10e1\u10d0\u10e0\u10d7\u10d0\u10d5\u10d0\u10d3 \u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d8\u10e1 \u10e1\u10d0\u10e4\u10d0\u10e1\u10e3\u10e0\u10d8 \u10e3\u10dc\u10d3\u10d0 \u10d2\u10d0\u10d3\u10d0\u10d8\u10ee\u10d0\u10d3\u10dd."
          : "Paid for office pickup (0 \u20be). Switching to a courier needs the delivery fee paid first.";
        let H, M;
        return (
          e[73] !== F
            ? ((H = (0, x.jsx)(h.Body, {
                muted: !0,
                size: p.font.s11,
                style: $,
                children: F,
              })),
              (e[73] = F),
              (e[74] = H))
            : (H = e[74]),
          e[75] !== fe ||
          e[76] !== C ||
          e[77] !== B ||
          e[78] !== E ||
          e[79] !== R ||
          e[80] !== V ||
          e[81] !== U ||
          e[82] !== H
            ? ((M = (0, x.jsxs)(h.Screen, {
                children: [fe, C, B, E, R, V, U, H],
              })),
              (e[75] = fe),
              (e[76] = C),
              (e[77] = B),
              (e[78] = E),
              (e[79] = R),
              (e[80] = V),
              (e[81] = U),
              (e[82] = H),
              (e[83] = M))
            : (M = e[83]),
          M
        );
      }
      if (Z && (Q || oe)) {
        let t, n, i, s, c;
        (e[84] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = {
              marginTop: p.space.lg,
              alignItems: "center",
              paddingVertical: 32,
            }),
            (e[84] = t))
          : (t = e[84]),
          e[85] !== j.tint2
            ? ((n = {
                width: 60,
                height: 60,
                borderRadius: 30,
                backgroundColor: j.tint2,
                alignItems: "center",
                justifyContent: "center",
              }),
              (e[85] = j.tint2),
              (e[86] = n))
            : (n = e[86]),
          e[87] !== j.greenDeep
            ? ((i = (0, x.jsx)(o.Ionicons, {
                name: "car",
                size: 28,
                color: j.greenDeep,
              })),
              (e[87] = j.greenDeep),
              (e[88] = i))
            : (i = e[88]),
          e[89] !== n || e[90] !== i
            ? ((s = (0, x.jsx)(l.default, { style: n, children: i })),
              (e[89] = n),
              (e[90] = i),
              (e[91] = s))
            : (s = e[91]),
          e[92] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = { marginTop: p.space.lg }), (e[92] = c))
            : (c = e[92]));
        const d = T
          ? "\u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0 \u10d3\u10d0\u10ef\u10d0\u10d5\u10e8\u10dc\u10d8\u10da\u10d8\u10d0"
          : "Delivery booked";
        let a, u;
        (e[93] !== d
          ? ((a = (0, x.jsx)(h.Body, {
              weight: "700",
              size: p.font.s16,
              style: c,
              children: d,
            })),
            (e[93] = d),
            (e[94] = a))
          : (a = e[94]),
          e[95] === Symbol.for("react.memo_cache_sentinel")
            ? ((u = { marginTop: 6 }), (e[95] = u))
            : (u = e[95]));
        const y = D?.timeSlot ?? H,
          f =
            "today" === $
              ? T
                ? "\u10d3\u10e6\u10d4\u10e1"
                : "today"
              : T
                ? "\u10ee\u10d5\u10d0\u10da"
                : "tomorrow";
        let b, _;
        (e[96] !== y || e[97] !== f
          ? ((b = (0, x.jsxs)(h.Body, {
              muted: !0,
              size: p.font.s13,
              style: u,
              children: [y, " \xb7 ", f],
            })),
            (e[96] = y),
            (e[97] = f),
            (e[98] = b))
          : (b = e[98]),
          e[99] === Symbol.for("react.memo_cache_sentinel")
            ? ((_ = { marginTop: 10, textAlign: "center" }), (e[99] = _))
            : (_ = e[99]));
        const k = R?.address,
          S = R?.city ? `, ${R.city}` : "";
        let w, v, C;
        return (
          e[100] !== k || e[101] !== S
            ? ((w = (0, x.jsxs)(h.Body, {
                muted: !0,
                size: p.font.s12,
                style: _,
                children: [k, S],
              })),
              (e[100] = k),
              (e[101] = S),
              (e[102] = w))
            : (w = e[102]),
          e[103] !== s || e[104] !== a || e[105] !== b || e[106] !== w
            ? ((v = (0, x.jsxs)(h.Card, { style: t, children: [s, a, b, w] })),
              (e[103] = s),
              (e[104] = a),
              (e[105] = b),
              (e[106] = w),
              (e[107] = v))
            : (v = e[107]),
          e[108] !== fe || e[109] !== v
            ? ((C = (0, x.jsxs)(h.Screen, { children: [fe, v] })),
              (e[108] = fe),
              (e[109] = v),
              (e[110] = C))
            : (C = e[110]),
          C
        );
      }
      const xe = T
        ? "\u10e0\u10dd\u10d2\u10dd\u10e0 \u10db\u10d8\u10d8\u10e6\u10d4\u10d1"
        : "How you get it";
      let je, be, ke, Se;
      (e[111] !== xe
        ? ((je = (0, x.jsx)(h.SectionLabel, { children: xe })),
          (e[111] = xe),
          (e[112] = je))
        : (je = e[112]),
        e[113] !== T || e[114] !== re || e[115] !== j.mut
          ? ((be = re
              ? (0, x.jsxs)(h.Card, {
                  style: {
                    flexDirection: "row",
                    gap: p.space.md,
                    alignItems: "center",
                  },
                  children: [
                    (0, x.jsx)(o.Ionicons, {
                      name: "lock-closed-outline",
                      size: 18,
                      color: j.mut,
                    }),
                    (0, x.jsx)(h.Body, {
                      muted: !0,
                      size: p.font.s12,
                      style: { flex: 1 },
                      children: T
                        ? "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8\u10e1 \u10e1\u10d0\u10e4\u10d0\u10e1\u10e3\u10e0\u10d8 \u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d8\u10da\u10d8\u10d0. \u10dd\u10e4\u10d8\u10e1\u10d8\u10d3\u10d0\u10dc \u10d2\u10d0\u10e2\u10d0\u10dc\u10d0\u10d6\u10d4 \u10d2\u10d0\u10d3\u10d0\u10e1\u10d0\u10e0\u10d7\u10d0\u10d5\u10d0\u10d3 \u10d3\u10d0\u10e3\u10d9\u10d0\u10d5\u10e8\u10d8\u10e0\u10d3\u10d8 \u10db\u10ee\u10d0\u10e0\u10d3\u10d0\u10ed\u10d4\u10e0\u10d0\u10e1."
                        : "The courier fee is paid. To switch to office pickup, contact support for a refund.",
                    }),
                  ],
                })
              : null),
            (e[113] = T),
            (e[114] = re),
            (e[115] = j.mut),
            (e[116] = be))
          : (be = e[116]),
        e[117] !== re
          ? ((ke = re ? { display: "none" } : void 0),
            (e[117] = re),
            (e[118] = ke))
          : (ke = e[118]),
        e[119] === Symbol.for("react.memo_cache_sentinel")
          ? ((Se = { flexDirection: "row", gap: p.space.sm }), (e[119] = Se))
          : (Se = e[119]));
      const we = T ? "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8" : "Courier",
        Te = T ? "\u10d9\u10d0\u10e0\u10d0\u10db\u10d3\u10d4" : "to your door";
      let ve;
      e[120] !== we || e[121] !== Te
        ? ((ve = { on: !0, icon: "bicycle-outline", label: we, sub: Te }),
          (e[120] = we),
          (e[121] = Te),
          (e[122] = ve))
        : (ve = e[122]);
      const Ce = T ? "\u10dd\u10e4\u10d8\u10e1\u10d8" : "Office",
        De = T ? "\u10e3\u10e4\u10d0\u10e1\u10dd\u10d3" : "free pickup";
      let Pe, Ie, Be, ze, Le, We;
      return (
        e[123] !== Ce || e[124] !== De
          ? ((Pe = { on: !1, icon: "business-outline", label: Ce, sub: De }),
            (e[123] = Ce),
            (e[124] = De),
            (e[125] = Pe))
          : (Pe = e[125]),
        e[126] !== ve || e[127] !== Pe
          ? ((Ie = [ve, Pe]), (e[126] = ve), (e[127] = Pe), (e[128] = Ie))
          : (Ie = e[128]),
        e[129] !== de ||
        e[130] !== Z ||
        e[131] !== Ie ||
        e[132] !== j.card ||
        e[133] !== j.greenDeep ||
        e[134] !== j.line ||
        e[135] !== j.tint
          ? ((Be = (0, x.jsx)(l.default, {
              style: Se,
              children: Ie.map((e) => {
                const t = Z === e.on;
                return (0, x.jsxs)(
                  s.default,
                  {
                    onPress: () => de(e.on),
                    style: {
                      flexGrow: 1,
                      flexBasis: 0,
                      minWidth: 0,
                      flexDirection: "row",
                      alignItems: "center",
                      gap: p.space.sm,
                      padding: p.space.md,
                      borderRadius: p.radius.md,
                      borderWidth: 1.5,
                      borderColor: t ? j.greenDeep : j.line,
                      backgroundColor: t ? j.tint : j.card,
                    },
                    children: [
                      (0, x.jsx)(o.Ionicons, {
                        name: e.icon,
                        size: 20,
                        color: j.greenDeep,
                      }),
                      (0, x.jsxs)(l.default, {
                        style: { flex: 1, minWidth: 0 },
                        children: [
                          (0, x.jsx)(h.Body, {
                            weight: "700",
                            size: p.font.s13,
                            numberOfLines: 1,
                            children: e.label,
                          }),
                          (0, x.jsx)(h.Body, {
                            muted: !0,
                            size: p.font.s11,
                            numberOfLines: 1,
                            children: e.sub,
                          }),
                        ],
                      }),
                    ],
                  },
                  String(e.on),
                );
              }),
            })),
            (e[129] = de),
            (e[130] = Z),
            (e[131] = Ie),
            (e[132] = j.card),
            (e[133] = j.greenDeep),
            (e[134] = j.line),
            (e[135] = j.tint),
            (e[136] = Be))
          : (Be = e[136]),
        e[137] !== ke || e[138] !== Be
          ? ((ze = (0, x.jsx)(u.TourTarget, {
              id: "delivery.mode",
              style: ke,
              children: Be,
            })),
            (e[137] = ke),
            (e[138] = Be),
            (e[139] = ze))
          : (ze = e[139]),
        e[140] !== R ||
        e[141] !== te ||
        e[142] !== B ||
        e[143] !== ue ||
        e[144] !== Z ||
        e[145] !== $ ||
        e[146] !== V ||
        e[147] !== q ||
        e[148] !== T ||
        e[149] !== N ||
        e[150] !== le ||
        e[151] !== L ||
        e[152] !== D ||
        e[153] !== G ||
        e[154] !== z ||
        e[155] !== H ||
        e[156] !== I?.today?.length ||
        e[157] !== I?.tomorrow?.length ||
        e[158] !== j.card ||
        e[159] !== j.faint ||
        e[160] !== j.green ||
        e[161] !== j.greenDeep ||
        e[162] !== j.ink ||
        e[163] !== j.line ||
        e[164] !== j.mut ||
        e[165] !== j.navy ||
        e[166] !== j.tint
          ? ((Le = Z
              ? (0, x.jsxs)(x.Fragment, {
                  children: [
                    (0, x.jsx)(h.SectionLabel, {
                      children: T
                        ? "\u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8"
                        : "Address",
                    }),
                    (0, x.jsx)(h.Card, {
                      children: (0, x.jsxs)(l.default, {
                        style: [h.styles.row, { gap: p.space.md }],
                        children: [
                          (0, x.jsx)(l.default, {
                            style: {
                              width: 38,
                              height: 38,
                              borderRadius: p.radius.sm,
                              backgroundColor: j.tint,
                              alignItems: "center",
                              justifyContent: "center",
                            },
                            children: (0, x.jsx)(o.Ionicons, {
                              name: "location-outline",
                              size: 18,
                              color: j.greenDeep,
                            }),
                          }),
                          (0, x.jsxs)(l.default, {
                            style: { flex: 1, minWidth: 0 },
                            children: [
                              (0, x.jsx)(h.Body, {
                                weight: "600",
                                numberOfLines: 1,
                                children: R?.title ?? "\u2014",
                              }),
                              (0, x.jsxs)(h.Body, {
                                muted: !0,
                                size: p.font.s12,
                                numberOfLines: 1,
                                children: [
                                  R?.address,
                                  R?.city ? `, ${R.city}` : "",
                                ],
                              }),
                            ],
                          }),
                          V && !G
                            ? (0, x.jsx)(h.Pill, {
                                text: T
                                  ? "\u10d8\u10e4\u10d0\u10e0\u10d4\u10d1\u10d0"
                                  : "Covered",
                                tone: "ok",
                              })
                            : G
                              ? (0, x.jsx)(h.Pill, {
                                  text: T
                                    ? "\u10d6\u10dd\u10dc\u10d8\u10e1 \u10d2\u10d0\u10e0\u10d4\u10d7"
                                    : "Out of area",
                                  tone: "warn",
                                })
                              : null,
                        ],
                      }),
                    }),
                    (0, x.jsx)(h.SectionLabel, {
                      children: T ? "\u10e0\u10dd\u10d3\u10d8\u10e1" : "When",
                    }),
                    (0, x.jsx)(u.TourTarget, {
                      id: "delivery.day",
                      children: (0, x.jsx)(l.default, {
                        style: { flexDirection: "row", gap: p.space.sm },
                        children: ["today", "tomorrow"].map((e) => {
                          const t = $ === e,
                            o =
                              "today" === e
                                ? (I?.today?.length ?? 0)
                                : (I?.tomorrow?.length ?? 0);
                          return (0, x.jsxs)(
                            s.default,
                            {
                              onPress: () => {
                                (F(e), M(null));
                              },
                              style: {
                                flexGrow: 1,
                                flexBasis: 0,
                                minWidth: 0,
                                alignItems: "center",
                                paddingVertical: 13,
                                borderRadius: p.radius.md,
                                backgroundColor: t ? j.navy : j.card,
                                borderWidth: 1,
                                borderColor: t ? j.navy : j.line,
                                opacity: o ? 1 : 0.5,
                              },
                              children: [
                                (0, x.jsx)(h.Body, {
                                  weight: "700",
                                  size: p.font.s13,
                                  style: { color: t ? "#fff" : j.mut },
                                  children:
                                    "today" === e
                                      ? T
                                        ? "\u10d3\u10e6\u10d4\u10e1"
                                        : "Today"
                                      : T
                                        ? "\u10ee\u10d5\u10d0\u10da"
                                        : "Tomorrow",
                                }),
                                (0, x.jsxs)(h.Body, {
                                  size: p.font.s11,
                                  style: { color: j.faint, marginTop: 2 },
                                  children: [
                                    o,
                                    " ",
                                    T
                                      ? "\u10e1\u10da\u10dd\u10e2\u10d8"
                                      : "slots",
                                  ],
                                }),
                              ],
                            },
                            e,
                          );
                        }),
                      }),
                    }),
                    (0, x.jsx)(l.default, {
                      style: {
                        flexDirection: "row",
                        flexWrap: "wrap",
                        gap: p.space.sm,
                        marginTop: p.space.md,
                      },
                      children: te.length
                        ? te.map((e, t) => {
                            const o = H === e;
                            return (0, x.jsx)(
                              u.TourTarget,
                              {
                                id: 0 === t ? "delivery.slot" : void 0,
                                onPress: () => M(e),
                                children: (0, x.jsx)(s.default, {
                                  onPress: () => M(e),
                                  style: {
                                    paddingHorizontal: 16,
                                    paddingVertical: 12,
                                    borderRadius: p.radius.pill,
                                    backgroundColor: o ? j.green : j.card,
                                    borderWidth: 1,
                                    borderColor: o ? j.green : j.line,
                                  },
                                  children: (0, x.jsx)(h.Body, {
                                    size: p.font.s13,
                                    weight: "600",
                                    style: { color: o ? j.greenDeep : j.ink },
                                    children: e,
                                  }),
                                }),
                              },
                              e,
                            );
                          })
                        : (0, x.jsx)(h.Card, {
                            style: { width: "100%" },
                            children: (0, x.jsx)(h.Body, {
                              muted: !0,
                              size: p.font.s13,
                              children: T
                                ? "\u10d0\u10db \u10d3\u10e6\u10d4\u10e1 \u10d7\u10d0\u10d5\u10d8\u10e1\u10e3\u10e4\u10d0\u10da\u10d8 \u10d3\u10e0\u10dd \u10d0\u10e6\u10d0\u10e0\u10d0\u10d0"
                                : "No free slots on this day",
                            }),
                          }),
                    }),
                    (0, x.jsx)(h.SectionLabel, {
                      children: T
                        ? "\u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d8\u10e1 \u10de\u10d0\u10e0\u10d0\u10db\u10d4\u10e2\u10e0\u10d4\u10d1\u10d8"
                        : "Delivery options",
                    }),
                    (0, x.jsxs)(h.Card, {
                      style: { paddingVertical: 0 },
                      children: [
                        (0, x.jsx)(h.ToggleRow, {
                          icon: "home-outline",
                          title: T
                            ? "\u10d3\u10d0\u10e2\u10dd\u10d5\u10d4 \u10d9\u10d0\u10e0\u10d4\u10d1\u10d7\u10d0\u10dc"
                            : "Leave at the door",
                          value: N,
                          onValueChange: Y,
                        }),
                        (0, x.jsx)(h.Divider, {}),
                        (0, x.jsx)(h.ToggleRow, {
                          icon: "notifications-off-outline",
                          title: T
                            ? "\u10d6\u10d0\u10e0\u10d8 \u10d0\u10e0 \u10d3\u10d0\u10e0\u10d4\u10d9\u10dd"
                            : "Don't ring the bell",
                          value: q,
                          onValueChange: J,
                        }),
                      ],
                    }),
                    (0, x.jsx)(u.TourTarget, {
                      id: "delivery.submit",
                      style: { marginTop: p.space.xl },
                      children: (0, x.jsx)(h.Btn, {
                        label: T
                          ? "\u10d3\u10d0\u10ef\u10d0\u10d5\u10e8\u10dc\u10d0"
                          : "Book delivery",
                        icon: "car-outline",
                        disabled: !H,
                        loading: B.isPending,
                        onPress: ue,
                      }),
                    }),
                  ],
                })
              : (0, x.jsxs)(x.Fragment, {
                  children: [
                    (0, x.jsx)(h.SectionLabel, {
                      children: T
                        ? "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10dd\u10e4\u10d8\u10e1\u10d8"
                        : "Pickup office",
                    }),
                    (0, x.jsx)(f.PickupLocationPicker, {
                      locations: L ?? [],
                      selectedId: D?.pickup_location?.id ?? le,
                      ka: T,
                      onSelect: (e) =>
                        D &&
                        z.mutate({
                          orderId: D.id,
                          courier: !1,
                          pickup_location_id: e,
                        }),
                    }),
                    (0, x.jsx)(h.Body, {
                      muted: !0,
                      size: p.font.s12,
                      style: { marginTop: p.space.md },
                      children: T
                        ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10dd\u10e4\u10d8\u10e1\u10e8\u10d8 \u10d2\u10d4\u10da\u10d8\u10e1. \u10d0\u10e9\u10d5\u10d4\u10dc\u10d4 \u10dd\u10d7\u10d0\u10ee\u10d8\u10e1 \u10e8\u10e2\u10e0\u10d8\u10ee\u10d9\u10dd\u10d3\u10d8 \u2014 ID-\u10d8\u10e1 \u10e9\u10d5\u10d4\u10dc\u10d4\u10d1\u10d0 \u10d0\u10e0 \u10e1\u10d0\u10ed\u10d8\u10e0\u10dd\u10d0."
                        : "Your parcel waits at the office. Show your room barcode \u2014 no ID needed.",
                    }),
                    (0, x.jsx)(h.Btn, {
                      label: T
                        ? "\u10e9\u10d4\u10db\u10d8 \u10dd\u10d7\u10d0\u10ee\u10d8\u10e1 \u10dc\u10dd\u10db\u10d4\u10e0\u10d8"
                        : "Show my room number",
                      icon: "barcode-outline",
                      onPress: b,
                      style: { marginTop: p.space.xl },
                    }),
                  ],
                })),
            (e[140] = R),
            (e[141] = te),
            (e[142] = B),
            (e[143] = ue),
            (e[144] = Z),
            (e[145] = $),
            (e[146] = V),
            (e[147] = q),
            (e[148] = T),
            (e[149] = N),
            (e[150] = le),
            (e[151] = L),
            (e[152] = D),
            (e[153] = G),
            (e[154] = z),
            (e[155] = H),
            (e[156] = I?.today?.length),
            (e[157] = I?.tomorrow?.length),
            (e[158] = j.card),
            (e[159] = j.faint),
            (e[160] = j.green),
            (e[161] = j.greenDeep),
            (e[162] = j.ink),
            (e[163] = j.line),
            (e[164] = j.mut),
            (e[165] = j.navy),
            (e[166] = j.tint),
            (e[167] = Le))
          : (Le = e[167]),
        e[168] !== fe ||
        e[169] !== je ||
        e[170] !== be ||
        e[171] !== ze ||
        e[172] !== Le
          ? ((We = (0, x.jsxs)(h.Screen, { children: [fe, je, be, ze, Le] })),
            (e[168] = fe),
            (e[169] = je),
            (e[170] = be),
            (e[171] = ze),
            (e[172] = Le),
            (e[173] = We))
          : (We = e[173]),
        We
      );
    }
    function b() {
      return n.router.push("/my-code");
    }
    function _() {
      return n.router.push("/my-code");
    }
    function k() {
      return n.router.back();
    }
    function S(e) {
      return e.is_default;
    }
    function w(e) {
      return e.isDefault;
    }
  },
  1164,
  [11, 15, 276, 13, 415, 192, 920, 1165, 877, 1068, 895, 890, 899, 1166, 6],
);