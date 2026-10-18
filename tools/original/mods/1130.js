__d(
  function (g, r, i, _a, m, _e, _d) {
    "use strict";
    function e(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Object.defineProperty(_e, "__esModule", { value: !0 }),
      Object.defineProperty(_e, "default", {
        enumerable: !0,
        get: function () {
          return k;
        },
      }));
    var n = r(_d[0]),
      t = r(_d[1]),
      s = r(_d[2]),
      o = r(_d[3]),
      l = e(r(_d[4])),
      a = e(r(_d[5])),
      c = e(r(_d[6])),
      d = e(r(_d[7])),
      u = e(r(_d[8])),
      h = r(_d[9]),
      f = r(_d[10]),
      p = r(_d[11]),
      y = r(_d[12]),
      x = r(_d[13]),
      b = r(_d[14]),
      j = r(_d[15]),
      _ = r(_d[16]);
    function S(e, n) {
      const t =
          e?.response?.data?.message?.message ??
          e?.response?.data?.message ??
          "",
        s = "string" == typeof t ? t : JSON.stringify(t);
      return /duplicate key|already exists/i.test(s)
        ? n
          ? "\u10d4\u10e1 \u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2 \u10d9\u10dd\u10d3\u10d8 \u10e3\u10d9\u10d5\u10d4 \u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10e3\u10da\u10d8\u10d0"
          : "This tracking code has already been added"
        : /minimum length|too short/i.test(s)
          ? n
            ? "\u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2 \u10d9\u10dd\u10d3\u10d8 \u10eb\u10d0\u10da\u10d8\u10d0\u10dc \u10db\u10dd\u10d9\u10da\u10d4\u10d0"
            : "That tracking code is too short"
          : s && s.length < 120
            ? s
            : n
              ? "\u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d0 \u10d5\u10d4\u10e0 \u10db\u10dd\u10ee\u10d4\u10e0\u10ee\u10d3\u10d0"
              : "Could not add the parcel";
    }
    function k() {
      const e = (0, n.c)(207),
        { theme: k } = (0, x.useTokens)(),
        D = "ka" === (0, f.useLang)(),
        z = (0, s.useLocalSearchParams)(),
        { data: w, blocked: I, refetch: v } = (0, j.useProfileGate)(),
        B = (0, h.useAddOrder)(),
        L = (0, h.useDemoTracking)(),
        { data: A } = (0, h.useCustomerAddresses)(),
        { data: O } = (0, h.useCalculatorMeta)(),
        R = O?.fees.delivery ?? 5,
        [W, $] = (0, o.useState)("china" === z.origin ? "china" : "usa"),
        [N, G] = (0, o.useState)(z.tracking ?? ""),
        [E, F] = (0, o.useState)(z.name ?? ""),
        [M, V] = (0, o.useState)(!0),
        [H, U] = (0, o.useState)(),
        [J, K] = (0, o.useState)(null),
        [Z, q] = (0, o.useState)(null);
      let Q;
      if (e[0] !== N) {
        let n;
        (e[2] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = /\s/g), (e[2] = n))
          : (n = e[2]),
          (Q = N.replace(n, "")),
          (e[0] = N),
          (e[1] = Q));
      } else Q = e[1];
      const X = Q.length >= 8;
      let Y;
      e[3] !== H || e[4] !== A
        ? ((Y = A?.find((e) => e.id === H) ?? A?.find(C) ?? A?.[0]),
          (e[3] = H),
          (e[4] = A),
          (e[5] = Y))
        : (Y = e[5]);
      const ee = Y,
        ne = ee ? `${ee.address ?? ""}${ee.city ? `, ${ee.city}` : ""}` : "";
      let te;
      e[6] !== B ||
      e[7] !== ne ||
      e[8] !== W ||
      e[9] !== M ||
      e[10] !== w ||
      e[11] !== D ||
      e[12] !== E ||
      e[13] !== v ||
      e[14] !== N
        ? ((te = () => {
            w?.id &&
              !B.isPending &&
              (K(null),
              B.mutate(
                {
                  tracking_number: N,
                  name: E,
                  customer_id: w.id,
                  country: W,
                  courier: M,
                  delivery_address: (M && ne) || void 0,
                },
                {
                  onSuccess: (e) => q(e?.tracking_number ?? N),
                  onError: (e) => {
                    "PROFILE_INCOMPLETE" === e?.response?.data?.code
                      ? v()
                      : K(S(e, D));
                  },
                },
              ));
          }),
          (e[6] = B),
          (e[7] = ne),
          (e[8] = W),
          (e[9] = M),
          (e[10] = w),
          (e[11] = D),
          (e[12] = E),
          (e[13] = v),
          (e[14] = N),
          (e[15] = te))
        : (te = e[15]);
      const re = te;
      let se;
      e[16] !== W || e[17] !== L || e[18] !== E
        ? ((se = () => {
            L.mutate("china" === W ? "china" : void 0, {
              onSuccess: (e) => {
                (G(e.tracking_number),
                  $(e.origin),
                  E.trim() || F(e.name),
                  K(null));
              },
            });
          }),
          (e[16] = W),
          (e[17] = L),
          (e[18] = E),
          (e[19] = se))
        : (se = e[19]);
      const ie = se;
      let oe;
      e[20] === Symbol.for("react.memo_cache_sentinel")
        ? ((oe = () => {
            (q(null), G(""), F(""));
          }),
          (e[20] = oe))
        : (oe = e[20]);
      const le = oe;
      let ae;
      e[21] !== k.ink || e[22] !== k.paper
        ? ((ae = {
            backgroundColor: k.paper,
            borderRadius: y.radius.md,
            paddingHorizontal: y.space.md,
            paddingVertical: 14,
            color: k.ink,
            fontSize: y.font.s14,
          }),
          (e[21] = k.ink),
          (e[22] = k.paper),
          (e[23] = ae))
        : (ae = e[23]);
      const ce = ae;
      let de, me, ue;
      (e[24] === Symbol.for("react.memo_cache_sentinel")
        ? ((de = [x.styles.row, { gap: y.space.md }]), (e[24] = de))
        : (de = e[24]),
        e[25] !== k.ink
          ? ((me = (0, _.jsx)(a.default, {
              onPress: P,
              hitSlop: 12,
              children: (0, _.jsx)(t.Ionicons, {
                name: "chevron-back",
                size: 24,
                color: k.ink,
              }),
            })),
            (e[25] = k.ink),
            (e[26] = me))
          : (me = e[26]),
        e[27] === Symbol.for("react.memo_cache_sentinel")
          ? ((ue = { flex: 1 }), (e[27] = ue))
          : (ue = e[27]));
      const ge = D
        ? "\u10d0\u10ee\u10d0\u10da\u10d8 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8"
        : "New parcel";
      let he, fe, pe, ye;
      (e[28] !== ge
        ? ((he = (0, _.jsx)(x.Title, { style: ue, children: ge })),
          (e[28] = ge),
          (e[29] = he))
        : (he = e[29]),
        e[30] === Symbol.for("react.memo_cache_sentinel")
          ? ((fe = (0, _.jsx)(b.KraftBox, { size: 58, cloud: !0 })),
            (e[30] = fe))
          : (fe = e[30]),
        e[31] !== he || e[32] !== me
          ? ((pe = (0, _.jsxs)(u.default, {
              style: de,
              children: [me, he, fe],
            })),
            (e[31] = he),
            (e[32] = me),
            (e[33] = pe))
          : (pe = e[33]),
        e[34] === Symbol.for("react.memo_cache_sentinel")
          ? ((ye = { marginTop: 4 }), (e[34] = ye))
          : (ye = e[34]));
      const xe = D
        ? "\u10e9\u10d0\u10ec\u10d4\u10e0\u10d4 \u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2 \u10d9\u10dd\u10d3\u10d8 \u10d3\u10d0 \u10d0\u10d3\u10d4\u10d5\u10dc\u10d4 \u10d7\u10d5\u10d0\u10da\u10d8 \u10e7\u10d5\u10d4\u10da\u10d0 \u10d4\u10e2\u10d0\u10de\u10e1"
        : "Add a tracking code and follow every step";
      let be, je;
      (e[35] !== xe
        ? ((be = (0, _.jsx)(x.Body, { muted: !0, style: ye, children: xe })),
          (e[35] = xe),
          (e[36] = be))
        : (be = e[36]),
        e[37] !== pe || e[38] !== be
          ? ((je = (0, _.jsxs)(_.Fragment, { children: [pe, be] })),
            (e[37] = pe),
            (e[38] = be),
            (e[39] = je))
          : (je = e[39]));
      const Se = je;
      if (I) {
        let n, t;
        return (
          e[40] === Symbol.for("react.memo_cache_sentinel")
            ? ((n = (0, _.jsx)(j.ProfileGateCard, {})), (e[40] = n))
            : (n = e[40]),
          e[41] !== Se
            ? ((t = (0, _.jsxs)(x.Screen, { children: [Se, n] })),
              (e[41] = Se),
              (e[42] = t))
            : (t = e[42]),
          t
        );
      }
      if (Z) {
        let n, o, l, a, c;
        (e[43] === Symbol.for("react.memo_cache_sentinel")
          ? ((n = {
              marginTop: y.space.xxl,
              alignItems: "center",
              paddingVertical: 34,
            }),
            (e[43] = n))
          : (n = e[43]),
          e[44] !== k.tint2
            ? ((o = {
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: k.tint2,
                alignItems: "center",
                justifyContent: "center",
              }),
              (e[44] = k.tint2),
              (e[45] = o))
            : (o = e[45]),
          e[46] !== k.greenDeep
            ? ((l = (0, _.jsx)(t.Ionicons, {
                name: "checkmark",
                size: 32,
                color: k.greenDeep,
              })),
              (e[46] = k.greenDeep),
              (e[47] = l))
            : (l = e[47]),
          e[48] !== o || e[49] !== l
            ? ((a = (0, _.jsx)(u.default, { style: o, children: l })),
              (e[48] = o),
              (e[49] = l),
              (e[50] = a))
            : (a = e[50]),
          e[51] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = { marginTop: y.space.lg }), (e[51] = c))
            : (c = e[51]));
        const d = D
          ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10d3\u10d0\u10d4\u10db\u10d0\u10e2\u10d0"
          : "Parcel added";
        let h, f, b, j;
        (e[52] !== d
          ? ((h = (0, _.jsx)(x.Body, {
              weight: "700",
              size: y.font.s16,
              style: c,
              children: d,
            })),
            (e[52] = d),
            (e[53] = h))
          : (h = e[53]),
          e[54] === Symbol.for("react.memo_cache_sentinel")
            ? ((f = { marginTop: 4 }), (e[54] = f))
            : (f = e[54]),
          e[55] !== Z
            ? ((b = (0, _.jsx)(x.Body, {
                weight: "600",
                size: y.font.s13,
                style: f,
                children: Z,
              })),
              (e[55] = Z),
              (e[56] = b))
            : (b = e[56]),
          e[57] === Symbol.for("react.memo_cache_sentinel")
            ? ((j = [x.styles.row, { gap: 6, marginTop: y.space.md }]),
              (e[57] = j))
            : (j = e[57]));
        const S = M ? "bicycle-outline" : "business-outline";
        let T, P;
        (e[58] !== S || e[59] !== k.mut
          ? ((T = (0, _.jsx)(t.Ionicons, { name: S, size: 15, color: k.mut })),
            (e[58] = S),
            (e[59] = k.mut),
            (e[60] = T))
          : (T = e[60]),
          e[61] === Symbol.for("react.memo_cache_sentinel")
            ? ((P = { flexShrink: 1 }), (e[61] = P))
            : (P = e[61]));
        const C = M
          ? `${D ? "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8" : "Courier"}${ne ? ` \xb7 ${ne}` : ""}`
          : D
            ? "\u10d2\u10d0\u10e2\u10d0\u10dc\u10d0 \u10e4\u10d8\u10da\u10d8\u10d0\u10da\u10d8\u10d3\u10d0\u10dc"
            : "Pickup at a branch";
        let z, w, I;
        (e[62] !== C
          ? ((z = (0, _.jsx)(x.Body, {
              muted: !0,
              size: y.font.s12,
              numberOfLines: 1,
              style: P,
              children: C,
            })),
            (e[62] = C),
            (e[63] = z))
          : (z = e[63]),
          e[64] !== T || e[65] !== z
            ? ((w = (0, _.jsxs)(u.default, { style: j, children: [T, z] })),
              (e[64] = T),
              (e[65] = z),
              (e[66] = w))
            : (w = e[66]),
          e[67] === Symbol.for("react.memo_cache_sentinel")
            ? ((I = { marginTop: 6, textAlign: "center" }), (e[67] = I))
            : (I = e[67]));
        const v = D
          ? "\u10d0\u10ee\u10da\u10d0 \u10e8\u10d4\u10d0\u10d5\u10e1\u10d4 \u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d0\u10ea\u10d8\u10d0, \u10e0\u10dd\u10db \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10d0\u10e0 \u10d3\u10d0\u10d2\u10d5\u10d8\u10d0\u10dc\u10d3\u10d4\u10e1"
          : "Declare it next so it is not held up";
        let B;
        e[68] !== v
          ? ((B = (0, _.jsx)(x.Body, {
              muted: !0,
              size: y.font.s12,
              style: I,
              children: v,
            })),
            (e[68] = v),
            (e[69] = B))
          : (B = e[69]);
        const L = D
          ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d4\u10d1\u10d6\u10d4 \u10d2\u10d0\u10d3\u10d0\u10e1\u10d5\u10da\u10d0"
          : "Go to parcels";
        let A, O, R;
        (e[70] === Symbol.for("react.memo_cache_sentinel")
          ? ((A = () => {
              (le(), s.router.push("/(tabs)/parcels"));
            }),
            (O = { marginTop: y.space.xl, alignSelf: "stretch" }),
            (e[70] = A),
            (e[71] = O))
          : ((A = e[70]), (O = e[71])),
          e[72] !== L
            ? ((R = (0, _.jsx)(x.Btn, { label: L, onPress: A, style: O })),
              (e[72] = L),
              (e[73] = R))
            : (R = e[73]));
        const W = D
          ? "\u10d9\u10d8\u10d3\u10d4\u10d5 \u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d0"
          : "Add another";
        let $, N, G;
        return (
          e[74] === Symbol.for("react.memo_cache_sentinel")
            ? (($ = { marginTop: y.space.sm, alignSelf: "stretch" }),
              (e[74] = $))
            : ($ = e[74]),
          e[75] !== W
            ? ((N = (0, _.jsx)(x.Btn, {
                label: W,
                variant: "outline",
                onPress: le,
                style: $,
              })),
              (e[75] = W),
              (e[76] = N))
            : (N = e[76]),
          e[77] !== a ||
          e[78] !== h ||
          e[79] !== b ||
          e[80] !== w ||
          e[81] !== B ||
          e[82] !== R ||
          e[83] !== N
            ? ((G = (0, _.jsx)(x.Screen, {
                children: (0, _.jsx)(p.TourTarget, {
                  id: "incoming.done",
                  children: (0, _.jsxs)(x.Card, {
                    style: n,
                    children: [a, h, b, w, B, R, N],
                  }),
                }),
              })),
              (e[77] = a),
              (e[78] = h),
              (e[79] = b),
              (e[80] = w),
              (e[81] = B),
              (e[82] = R),
              (e[83] = N),
              (e[84] = G))
            : (G = e[84]),
          G
        );
      }
      const ke = D ? "\u10e1\u10d0\u10d8\u10d3\u10d0\u10dc" : "Origin";
      let Te, Pe;
      (e[85] !== ke
        ? ((Te = (0, _.jsx)(x.SectionLabel, { children: ke })),
          (e[85] = ke),
          (e[86] = Te))
        : (Te = e[86]),
        e[87] === Symbol.for("react.memo_cache_sentinel")
          ? ((Pe = { flexDirection: "row", gap: y.space.sm }), (e[87] = Pe))
          : (Pe = e[87]));
      const Ce = D ? "\u10d0\u10e8\u10e8" : "USA";
      let De;
      e[88] !== Ce
        ? ((De = { id: "usa", label: Ce, flag: "\ud83c\uddfa\ud83c\uddf8" }),
          (e[88] = Ce),
          (e[89] = De))
        : (De = e[89]);
      const ze = D ? "\u10e9\u10d8\u10dc\u10d4\u10d7\u10d8" : "China";
      let we, Ie, ve;
      (e[90] !== ze
        ? ((we = { id: "china", label: ze, flag: "\ud83c\udde8\ud83c\uddf3" }),
          (e[90] = ze),
          (e[91] = we))
        : (we = e[91]),
        e[92] !== De || e[93] !== we
          ? ((Ie = [De, we]), (e[92] = De), (e[93] = we), (e[94] = Ie))
          : (Ie = e[94]),
        e[95] !== W ||
        e[96] !== Ie ||
        e[97] !== k.card ||
        e[98] !== k.line ||
        e[99] !== k.mut ||
        e[100] !== k.navy
          ? ((ve = (0, _.jsx)(u.default, {
              style: Pe,
              children: Ie.map((e) => {
                const n = W === e.id;
                return (0, _.jsxs)(
                  a.default,
                  {
                    onPress: () => $(e.id),
                    style: {
                      flexGrow: 1,
                      flexBasis: 0,
                      minWidth: 0,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      paddingVertical: 14,
                      borderRadius: y.radius.md,
                      backgroundColor: n ? k.navy : k.card,
                      borderWidth: 1,
                      borderColor: n ? k.navy : k.line,
                    },
                    children: [
                      (0, _.jsx)(x.Body, {
                        size: y.font.s16,
                        children: e.flag,
                      }),
                      (0, _.jsx)(x.Body, {
                        weight: "700",
                        size: y.font.s13,
                        style: { color: n ? "#fff" : k.mut },
                        children: e.label,
                      }),
                    ],
                  },
                  e.id,
                );
              }),
            })),
            (e[95] = W),
            (e[96] = Ie),
            (e[97] = k.card),
            (e[98] = k.line),
            (e[99] = k.mut),
            (e[100] = k.navy),
            (e[101] = ve))
          : (ve = e[101]));
      const Be = D
        ? "\u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2 \u10d9\u10dd\u10d3\u10d8"
        : "Tracking code";
      let Le, Ae, Oe, Re;
      (e[102] !== Be
        ? ((Le = (0, _.jsx)(x.SectionLabel, { children: Be })),
          (e[102] = Be),
          (e[103] = Le))
        : (Le = e[103]),
        e[104] === Symbol.for("react.memo_cache_sentinel")
          ? ((Ae = { flexDirection: "row", gap: y.space.sm }), (e[104] = Ae))
          : (Ae = e[104]),
        e[105] !== ce
          ? ((Oe = { ...ce, flex: 1, minWidth: 0 }),
            (e[105] = ce),
            (e[106] = Oe))
          : (Oe = e[106]),
        e[107] !== Oe || e[108] !== k.faint || e[109] !== N
          ? ((Re = (0, _.jsx)(d.default, {
              value: N,
              onChangeText: G,
              placeholder: "1Z999AA10123456784",
              placeholderTextColor: k.faint,
              autoCapitalize: "characters",
              autoCorrect: !1,
              style: Oe,
            })),
            (e[107] = Oe),
            (e[108] = k.faint),
            (e[109] = N),
            (e[110] = Re))
          : (Re = e[110]));
      const We = D
        ? "\u10e8\u10e2\u10e0\u10d8\u10ee\u10d9\u10dd\u10d3\u10d8\u10e1 \u10e1\u10d9\u10d0\u10dc\u10d8\u10e0\u10d4\u10d1\u10d0"
        : "Scan a barcode";
      let $e, Ne, Ge, Ee, Fe, Me, Ve, He;
      (e[111] !== k.tint
        ? (($e = (e) => {
            const { pressed: n } = e;
            return {
              width: 50,
              borderRadius: y.radius.md,
              backgroundColor: k.tint,
              alignItems: "center",
              justifyContent: "center",
              opacity: n ? 0.7 : 1,
            };
          }),
          (e[111] = k.tint),
          (e[112] = $e))
        : ($e = e[112]),
        e[113] !== k.greenDeep
          ? ((Ne = (0, _.jsx)(t.Ionicons, {
              name: "scan-outline",
              size: 22,
              color: k.greenDeep,
            })),
            (e[113] = k.greenDeep),
            (e[114] = Ne))
          : (Ne = e[114]),
        e[115] !== We || e[116] !== $e || e[117] !== Ne
          ? ((Ge = (0, _.jsx)(a.default, {
              onPress: T,
              accessibilityLabel: We,
              style: $e,
              children: Ne,
            })),
            (e[115] = We),
            (e[116] = $e),
            (e[117] = Ne),
            (e[118] = Ge))
          : (Ge = e[118]),
        e[119] !== Re || e[120] !== Ge
          ? ((Ee = (0, _.jsxs)(u.default, { style: Ae, children: [Re, Ge] })),
            (e[119] = Re),
            (e[120] = Ge),
            (e[121] = Ee))
          : (Ee = e[121]),
        e[122] === Symbol.for("react.memo_cache_sentinel")
          ? ((Fe = { alignSelf: "flex-start", marginTop: y.space.sm }),
            (e[122] = Fe))
          : (Fe = e[122]),
        e[123] === Symbol.for("react.memo_cache_sentinel")
          ? ((Me = [x.styles.row, { gap: 6 }]), (e[123] = Me))
          : (Me = e[123]),
        e[124] !== L.isPending || e[125] !== k.green || e[126] !== k.greenDeep
          ? ((Ve = L.isPending
              ? (0, _.jsx)(l.default, { size: "small", color: k.green })
              : (0, _.jsx)(t.Ionicons, {
                  name: "sparkles",
                  size: 14,
                  color: k.greenDeep,
                })),
            (e[124] = L.isPending),
            (e[125] = k.green),
            (e[126] = k.greenDeep),
            (e[127] = Ve))
          : (Ve = e[127]),
        e[128] !== k.greenDeep
          ? ((He = { color: k.greenDeep }),
            (e[128] = k.greenDeep),
            (e[129] = He))
          : (He = e[129]));
      const Ue = D
        ? "\u10e1\u10d0\u10d3\u10d4\u10db\u10dd\u10dc\u10e1\u10e2\u10e0\u10d0\u10ea\u10d8\u10dd \u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2 \u10d9\u10dd\u10d3\u10d8"
        : "Use a demo tracking code";
      let Je, Ke, Ze;
      (e[130] !== He || e[131] !== Ue
        ? ((Je = (0, _.jsx)(x.Body, {
            size: y.font.s12,
            weight: "700",
            style: He,
            children: Ue,
          })),
          (e[130] = He),
          (e[131] = Ue),
          (e[132] = Je))
        : (Je = e[132]),
        e[133] !== L.isPending ||
        e[134] !== Ve ||
        e[135] !== Je ||
        e[136] !== ie
          ? ((Ke = (0, _.jsxs)(a.default, {
              onPress: ie,
              disabled: L.isPending,
              hitSlop: 6,
              style: Me,
              children: [Ve, Je],
            })),
            (e[133] = L.isPending),
            (e[134] = Ve),
            (e[135] = Je),
            (e[136] = ie),
            (e[137] = Ke))
          : (Ke = e[137]),
        e[138] !== Ke || e[139] !== ie
          ? ((Ze = (0, _.jsx)(p.TourTarget, {
              id: "incoming.demo",
              onPress: ie,
              style: Fe,
              children: Ke,
            })),
            (e[138] = Ke),
            (e[139] = ie),
            (e[140] = Ze))
          : (Ze = e[140]));
      const qe = D
        ? "\u10e1\u10d0\u10ee\u10d4\u10da\u10d8 (\u10d0\u10e0\u10d0\u10e1\u10d0\u10d5\u10d0\u10da\u10d3\u10d4\u10d1\u10e3\u10da\u10dd)"
        : "Name (optional)";
      let Qe;
      e[141] !== qe
        ? ((Qe = (0, _.jsx)(x.SectionLabel, { children: qe })),
          (e[141] = qe),
          (e[142] = Qe))
        : (Qe = e[142]);
      const Xe = D
        ? "\u10db\u10d0\u10d2. Nike-\u10d8\u10e1 \u10d9\u10e0\u10dd\u10e1\u10d4\u10d1\u10d8"
        : "e.g. Nike sneakers";
      let Ye;
      e[143] !== ce || e[144] !== E || e[145] !== Xe || e[146] !== k.faint
        ? ((Ye = (0, _.jsx)(d.default, {
            value: E,
            onChangeText: F,
            placeholder: Xe,
            placeholderTextColor: k.faint,
            style: ce,
          })),
          (e[143] = ce),
          (e[144] = E),
          (e[145] = Xe),
          (e[146] = k.faint),
          (e[147] = Ye))
        : (Ye = e[147]);
      const en = D
        ? "\u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0 \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e8\u10d8"
        : "Delivery in Georgia";
      let nn, tn;
      (e[148] !== en
        ? ((nn = (0, _.jsx)(x.SectionLabel, { children: en })),
          (e[148] = en),
          (e[149] = nn))
        : (nn = e[149]),
        e[150] === Symbol.for("react.memo_cache_sentinel")
          ? ((tn = { gap: y.space.sm }), (e[150] = tn))
          : (tn = e[150]));
      const rn = D
          ? "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8 \u10d9\u10d0\u10e0\u10d0\u10db\u10d3\u10d4"
          : "Courier to my door",
        sn = D
          ? `+\u20be${R} \xb7 \u10db\u10dd\u10d5\u10d8\u10e2\u10d0\u10dc\u10d7 \u10e9\u10d0\u10db\u10dd\u10e1\u10d5\u10da\u10d8\u10e1\u10d0 \u10d3\u10d0 \u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d8\u10e1 \u10e8\u10d4\u10db\u10d3\u10d4\u10d2`
          : `+\u20be${R} \xb7 brought once it lands and is paid`;
      let on;
      e[151] !== rn || e[152] !== sn
        ? ((on = { on: !0, icon: "bicycle-outline", title: rn, sub: sn }),
          (e[151] = rn),
          (e[152] = sn),
          (e[153] = on))
        : (on = e[153]);
      const ln = D
          ? "\u10d2\u10d0\u10e2\u10d0\u10dc\u10d0 \u10e4\u10d8\u10da\u10d8\u10d0\u10da\u10d8\u10d3\u10d0\u10dc"
          : "Pick up at a Tbilisi branch",
        an = D
          ? "\u10e3\u10e4\u10d0\u10e1\u10dd \xb7 \u10d0\u10e9\u10d5\u10d4\u10dc\u10d4 \u10e8\u10d4\u10dc\u10d8 \u10dd\u10d7\u10d0\u10ee\u10d8\u10e1 \u10dc\u10dd\u10db\u10d4\u10e0\u10d8"
          : "Free \xb7 show your room number";
      let cn, dn, mn, un, gn;
      (e[154] !== ln || e[155] !== an
        ? ((cn = { on: !1, icon: "business-outline", title: ln, sub: an }),
          (e[154] = ln),
          (e[155] = an),
          (e[156] = cn))
        : (cn = e[156]),
        e[157] !== on || e[158] !== cn
          ? ((dn = [on, cn]), (e[157] = on), (e[158] = cn), (e[159] = dn))
          : (dn = e[159]),
        e[160] !== M ||
        e[161] !== dn ||
        e[162] !== k.card ||
        e[163] !== k.faint ||
        e[164] !== k.greenDeep ||
        e[165] !== k.line ||
        e[166] !== k.paper ||
        e[167] !== k.tint ||
        e[168] !== k.tint2
          ? ((mn = (0, _.jsx)(p.TourTarget, {
              id: "incoming.courier",
              children: (0, _.jsx)(u.default, {
                style: tn,
                children: dn.map((e) => {
                  const n = M === e.on;
                  return (0, _.jsxs)(
                    a.default,
                    {
                      onPress: () => V(e.on),
                      style: {
                        flexDirection: "row",
                        alignItems: "center",
                        gap: y.space.md,
                        padding: y.space.md,
                        borderRadius: y.radius.md,
                        borderWidth: 1.5,
                        borderColor: n ? k.greenDeep : k.line,
                        backgroundColor: n ? k.tint : k.card,
                      },
                      children: [
                        (0, _.jsx)(u.default, {
                          style: {
                            width: 36,
                            height: 36,
                            borderRadius: y.radius.sm,
                            backgroundColor: n ? k.tint2 : k.paper,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          children: (0, _.jsx)(t.Ionicons, {
                            name: e.icon,
                            size: 18,
                            color: k.greenDeep,
                          }),
                        }),
                        (0, _.jsxs)(u.default, {
                          style: { flex: 1, minWidth: 0 },
                          children: [
                            (0, _.jsx)(x.Body, {
                              weight: "700",
                              size: y.font.s13,
                              children: e.title,
                            }),
                            (0, _.jsx)(x.Body, {
                              muted: !0,
                              size: y.font.s11,
                              style: { marginTop: 1 },
                              children: e.sub,
                            }),
                          ],
                        }),
                        (0, _.jsx)(t.Ionicons, {
                          name: n ? "radio-button-on" : "radio-button-off",
                          size: 20,
                          color: n ? k.greenDeep : k.faint,
                        }),
                      ],
                    },
                    String(e.on),
                  );
                }),
              }),
            })),
            (e[160] = M),
            (e[161] = dn),
            (e[162] = k.card),
            (e[163] = k.faint),
            (e[164] = k.greenDeep),
            (e[165] = k.line),
            (e[166] = k.paper),
            (e[167] = k.tint),
            (e[168] = k.tint2),
            (e[169] = mn))
          : (mn = e[169]),
        e[170] !== ee?.id ||
        e[171] !== A ||
        e[172] !== M ||
        e[173] !== D ||
        e[174] !== k.card ||
        e[175] !== k.greenDeep ||
        e[176] !== k.line ||
        e[177] !== k.mut ||
        e[178] !== k.tint2
          ? ((un = M
              ? A?.length
                ? (0, _.jsx)(c.default, {
                    horizontal: !0,
                    showsHorizontalScrollIndicator: !1,
                    style: { marginTop: y.space.sm },
                    contentContainerStyle: { gap: y.space.sm },
                    children: A.map((e) => {
                      const n = e.id === ee?.id;
                      return (0, _.jsxs)(
                        a.default,
                        {
                          onPress: () => U(e.id),
                          style: {
                            maxWidth: 240,
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 6,
                            paddingHorizontal: 12,
                            paddingVertical: 8,
                            borderRadius: y.radius.pill,
                            borderWidth: 1,
                            borderColor: n ? k.greenDeep : k.line,
                            backgroundColor: n ? k.tint2 : k.card,
                          },
                          children: [
                            (0, _.jsx)(t.Ionicons, {
                              name: "location-outline",
                              size: 14,
                              color: n ? k.greenDeep : k.mut,
                            }),
                            (0, _.jsx)(x.Body, {
                              size: y.font.s12,
                              weight: n ? "700" : "500",
                              numberOfLines: 1,
                              style: { flexShrink: 1 },
                              children: e.title ?? e.address ?? "\u2014",
                            }),
                          ],
                        },
                        e.id,
                      );
                    }),
                  })
                : (0, _.jsx)(x.Body, {
                    muted: !0,
                    size: y.font.s12,
                    style: { marginTop: y.space.sm },
                    children: D
                      ? "\u10d3\u10d0\u10d0\u10db\u10d0\u10e2\u10d4 \u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8 \u10de\u10e0\u10dd\u10e4\u10d8\u10da\u10e8\u10d8"
                      : "Add a delivery address in your profile",
                  })
              : null),
            (e[170] = ee?.id),
            (e[171] = A),
            (e[172] = M),
            (e[173] = D),
            (e[174] = k.card),
            (e[175] = k.greenDeep),
            (e[176] = k.line),
            (e[177] = k.mut),
            (e[178] = k.tint2),
            (e[179] = un))
          : (un = e[179]),
        e[180] !== J || e[181] !== k.red
          ? ((gn = J
              ? (0, _.jsxs)(u.default, {
                  style: [x.styles.row, { gap: 6, marginTop: y.space.md }],
                  children: [
                    (0, _.jsx)(t.Ionicons, {
                      name: "alert-circle",
                      size: 15,
                      color: k.red,
                    }),
                    (0, _.jsx)(x.Body, {
                      size: y.font.s12,
                      style: { color: k.red, flex: 1, minWidth: 0 },
                      children: J,
                    }),
                  ],
                })
              : null),
            (e[180] = J),
            (e[181] = k.red),
            (e[182] = gn))
          : (gn = e[182]));
      const hn = X ? "incoming.submit" : void 0;
      let fn;
      e[183] === Symbol.for("react.memo_cache_sentinel")
        ? ((fn = { marginTop: y.space.xl }), (e[183] = fn))
        : (fn = e[183]);
      const pn = D
          ? "\u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d0"
          : "Add parcel",
        yn = !X || !w?.id;
      let xn, bn, jn;
      return (
        e[184] !== B.isPending ||
        e[185] !== re ||
        e[186] !== pn ||
        e[187] !== yn
          ? ((xn = (0, _.jsx)(x.Btn, {
              label: pn,
              icon: "add",
              onPress: re,
              disabled: yn,
              loading: B.isPending,
            })),
            (e[184] = B.isPending),
            (e[185] = re),
            (e[186] = pn),
            (e[187] = yn),
            (e[188] = xn))
          : (xn = e[188]),
        e[189] !== re || e[190] !== hn || e[191] !== xn
          ? ((bn = (0, _.jsx)(p.TourTarget, {
              id: hn,
              onPress: re,
              style: fn,
              children: xn,
            })),
            (e[189] = re),
            (e[190] = hn),
            (e[191] = xn),
            (e[192] = bn))
          : (bn = e[192]),
        e[193] !== Se ||
        e[194] !== Te ||
        e[195] !== ve ||
        e[196] !== Le ||
        e[197] !== Ee ||
        e[198] !== Ze ||
        e[199] !== Qe ||
        e[200] !== Ye ||
        e[201] !== nn ||
        e[202] !== mn ||
        e[203] !== un ||
        e[204] !== gn ||
        e[205] !== bn
          ? ((jn = (0, _.jsx)(_.Fragment, {
              children: (0, _.jsxs)(x.Screen, {
                children: [Se, Te, ve, Le, Ee, Ze, Qe, Ye, nn, mn, un, gn, bn],
              }),
            })),
            (e[193] = Se),
            (e[194] = Te),
            (e[195] = ve),
            (e[196] = Le),
            (e[197] = Ee),
            (e[198] = Ze),
            (e[199] = Qe),
            (e[200] = Ye),
            (e[201] = nn),
            (e[202] = mn),
            (e[203] = un),
            (e[204] = gn),
            (e[205] = bn),
            (e[206] = jn))
          : (jn = e[206]),
        jn
      );
    }
    function T() {
      return s.router.push("/my-code?tab=scan");
    }
    function P() {
      return s.router.back();
    }
    function C(e) {
      return e.isDefault;
    }
  },
  1130,
  [
    11, 15, 276, 13, 402, 415, 316, 425, 192, 920, 877, 1068, 895, 890, 899,
    1033, 6,
  ],
);