__d(
  function (g, _r, _i, _a, m, _e, _d) {
    "use strict";
    function e(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Object.defineProperty(_e, "__esModule", { value: !0 }),
      Object.defineProperty(_e, "default", {
        enumerable: !0,
        get: function () {
          return P;
        },
      }));
    var t = _r(_d[0]),
      s = _r(_d[1]),
      n = _r(_d[2]),
      i = _r(_d[3]),
      r = e(_r(_d[4])),
      l = e(_r(_d[5])),
      o = e(_r(_d[6])),
      a = _r(_d[7]),
      d = _r(_d[8]),
      c = _r(_d[9]),
      u = _r(_d[10]),
      h = _r(_d[11]),
      p = _r(_d[12]),
      f = _r(_d[13]),
      x = _r(_d[14]),
      y = _r(_d[15]),
      j = _r(_d[16]),
      b = _r(_d[17]),
      S = _r(_d[18]),
      T = _r(_d[19]),
      w = _r(_d[20]);
    const k = [
        {
          code: "US",
          name: "USA",
          nameKa: "\u10d0\u10e8\u10e8",
          flag: "\ud83c\uddfa\ud83c\uddf8",
          days: "5\u20138",
          perKg: 24,
        },
        {
          code: "DE",
          name: "Germany",
          nameKa: "\u10d2\u10d4\u10e0\u10db\u10d0\u10dc\u10d8\u10d0",
          flag: "\ud83c\udde9\ud83c\uddea",
          days: "4\u20136",
          perKg: 19,
        },
        {
          code: "GB",
          name: "United Kingdom",
          nameKa:
            "\u10d3\u10d8\u10d3\u10d8 \u10d1\u10e0\u10d8\u10e2\u10d0\u10dc\u10d4\u10d7\u10d8",
          flag: "\ud83c\uddec\ud83c\udde7",
          days: "4\u20137",
          perKg: 21,
        },
        {
          code: "TR",
          name: "T\xfcrkiye",
          nameKa: "\u10d7\u10e3\u10e0\u10e5\u10d4\u10d7\u10d8",
          flag: "\ud83c\uddf9\ud83c\uddf7",
          days: "2\u20134",
          perKg: 12,
        },
      ],
      B = {
        US: {
          name: "John Miller",
          address: "350 5th Ave, New York, NY 10118",
          phone: "+1 212 555 0100",
        },
        DE: {
          name: "Anna Schmidt",
          address: "Friedrichstra\xdfe 43, 10117 Berlin",
          phone: "+49 30 555 0100",
        },
        GB: {
          name: "Oliver Brown",
          address: "221B Baker Street, London NW1 6XE",
          phone: "+44 20 5550 0100",
        },
        TR: {
          name: "Elif Y\u0131lmaz",
          address: "\u0130stiklal Cd. 120, Beyo\u011flu, \u0130stanbul",
          phone: "+90 212 555 0100",
        },
      },
      _ = {
        US: [
          { first: "Emily", last: "Miller" },
          { first: "Michael", last: "Miller" },
          { first: "Sarah", last: "Miller" },
        ],
        DE: [
          { first: "Lukas", last: "Schmidt" },
          { first: "Mia", last: "Schmidt" },
        ],
        GB: [
          { first: "Charlotte", last: "Brown" },
          { first: "Harry", last: "Brown" },
        ],
        TR: [
          { first: "Mehmet", last: "Y\u0131lmaz" },
          { first: "Ay\u015fe", last: "Y\u0131lmaz" },
        ],
      },
      C = ["to", "from", "parcel", "quote"];
    function P() {
      const e = (0, t.c)(183),
        { theme: P } = (0, x.useTokens)(),
        A = "ka" === (0, c.useLang)(),
        { blocked: E } = (0, S.useProfileGate)(),
        { data: $ } = (0, a.useCustomerAddresses)(),
        { data: F } = (0, a.useOutCountries)(),
        R = (0, a.useCreateOutgoing)(),
        I = (0, a.useCreateAddress)(),
        K = F?.countries ?? k,
        G = F?.base_fee ?? 9,
        M = F?.pickup_fee ?? 5,
        U = (0, n.useLocalSearchParams)(),
        [N, H] = (0, i.useState)("to"),
        [Y, q] = (0, i.useState)(),
        [J, X] = (0, i.useState)(null),
        [Q, Z] = (0, i.useState)(!1),
        [ee, te] = (0, i.useState)("0" !== U.pickup),
        [se, ne] = (0, i.useState)(U.country ?? "US"),
        [ie, re] = (0, i.useState)(""),
        [le, oe] = (0, i.useState)(""),
        ae = U.country ?? "US";
      let de;
      e[0] !== ae
        ? ((de = { country: ae, number: "" }), (e[0] = ae), (e[1] = de))
        : (de = e[1]);
      const [ce, ue] = (0, i.useState)(de);
      let he;
      e[2] === Symbol.for("react.memo_cache_sentinel")
        ? ((he = []), (e[2] = he))
        : (he = e[2]);
      const [me, ge] = (0, i.useState)(he),
        [pe, fe] = (0, i.useState)(U.weight ?? "2"),
        [xe, ye] = (0, i.useState)(""),
        [je, be] = (0, i.useState)(null),
        [Se, Te] = (0, i.useState)(null);
      let we;
      e[3] !== K || e[4] !== se
        ? ((we = K.find((e) => e.code === se) ?? K[0]),
          (e[3] = K),
          (e[4] = se),
          (e[5] = we))
        : (we = e[5]);
      const ke = we;
      let Be;
      e[6] !== A
        ? ((Be = (e) => (A ? e.nameKa : e.name)), (e[6] = A), (e[7] = Be))
        : (Be = e[7]);
      const Ce = Be;
      let Pe;
      e[8] !== $ || e[9] !== Y
        ? ((Pe = $?.find((e) => e.id === Y) ?? (Y ? void 0 : $?.[0])),
          (e[8] = $),
          (e[9] = Y),
          (e[10] = Pe))
        : (Pe = e[10]);
      const ze = Pe,
        ve =
          "manual" === Y && J
            ? `${J.address}, ${J.city}`
            : ze
              ? `${ze.address ?? ""}${ze.city ? `, ${ze.city}` : ""}`
              : "";
      let De;
      e[11] !== pe
        ? ((De = pe.replace(",", ".") || 0), (e[11] = pe), (e[12] = De))
        : (De = e[12]);
      const Ve = Number(De),
        Le = Ve * ke.perKg,
        We = Le + G + (ee ? M : 0);
      let Oe;
      e[13] !== N
        ? ((Oe = () => {
            const e = C.indexOf(N);
            e > 0 ? H(C[e - 1]) : n.router.back();
          }),
          (e[13] = N),
          (e[14] = Oe))
        : (Oe = e[14]);
      const Ae = Oe;
      let Ee;
      e[15] !== xe ||
      e[16] !== ke.code ||
      e[17] !== R ||
      e[18] !== me ||
      e[19] !== ve ||
      e[20] !== A ||
      e[21] !== Ve ||
      e[22] !== ce ||
      e[23] !== ee ||
      e[24] !== ie ||
      e[25] !== le
        ? ((Ee = () => {
            (be(null),
              R.mutate(
                {
                  country: ke.code,
                  weight: Ve,
                  pickup: ee,
                  pickup_address: ve || void 0,
                  recipient_name: ie.trim(),
                  recipient_address: le.trim(),
                  recipient_phone: ce.number ? (0, b.formatPhone)(ce) : void 0,
                  contents: xe.trim() || void 0,
                  recipients: (0, T.recipientsPayload)(me),
                },
                {
                  onSuccess: (e) => {
                    (Te(e), H("done"));
                  },
                  onError: (e) =>
                    be(
                      (0, d.apiError)(
                        e,
                        A
                          ? "\u10d2\u10d6\u10d0\u10d5\u10dc\u10d8\u10da\u10d8 \u10d5\u10d4\u10e0 \u10e8\u10d4\u10d8\u10e5\u10db\u10dc\u10d0"
                          : "Could not create the shipment",
                      ),
                    ),
                },
              ));
          }),
          (e[15] = xe),
          (e[16] = ke.code),
          (e[17] = R),
          (e[18] = me),
          (e[19] = ve),
          (e[20] = A),
          (e[21] = Ve),
          (e[22] = ce),
          (e[23] = ee),
          (e[24] = ie),
          (e[25] = le),
          (e[26] = Ee))
        : (Ee = e[26]);
      const $e = Ee;
      let Fe;
      e[27] !== ke.code
        ? ((Fe = () => {
            const e = B[ke.code];
            e &&
              (re(e.name),
              oe(e.address),
              ue((0, b.parsePhone)(e.phone, ke.code)));
          }),
          (e[27] = ke.code),
          (e[28] = Fe))
        : (Fe = e[28]);
      const Re = Fe;
      let Ie;
      e[29] === Symbol.for("react.memo_cache_sentinel")
        ? ((Ie = (e) => () => H(e)), (e[29] = Ie))
        : (Ie = e[29]);
      const Ke = Ie;
      let Ge;
      e[30] !== me || e[31] !== ce || e[32] !== ie || e[33] !== le
        ? ((Ge =
            ie.trim().length >= 2 &&
            le.trim().length >= 4 &&
            !(ce.number.length > 0 && !(0, b.isPhoneValid)(ce)) &&
            !(0, T.hasUnfinished)(me)),
          (e[30] = me),
          (e[31] = ce),
          (e[32] = ie),
          (e[33] = le),
          (e[34] = Ge))
        : (Ge = e[34]);
      const Me = Ge;
      let Ue;
      e[35] !== P.ink || e[36] !== P.paper
        ? ((Ue = {
            backgroundColor: P.paper,
            borderRadius: h.radius.md,
            paddingHorizontal: h.space.md,
            paddingVertical: 14,
            color: P.ink,
            fontSize: h.font.s14,
          }),
          (e[35] = P.ink),
          (e[36] = P.paper),
          (e[37] = Ue))
        : (Ue = e[37]);
      const Ne = Ue;
      if (E) {
        let t, n;
        (e[38] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = [x.styles.row, { gap: h.space.md }]), (e[38] = t))
          : (t = e[38]),
          e[39] !== P.ink
            ? ((n = (0, w.jsx)(r.default, {
                onPress: V,
                hitSlop: 12,
                children: (0, w.jsx)(s.Ionicons, {
                  name: "chevron-back",
                  size: 24,
                  color: P.ink,
                }),
              })),
              (e[39] = P.ink),
              (e[40] = n))
            : (n = e[40]));
        const i = A
          ? "\u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d0"
          : "Send a parcel";
        let l, a, d, c;
        return (
          e[41] !== i
            ? ((l = (0, w.jsx)(x.Title, { children: i })),
              (e[41] = i),
              (e[42] = l))
            : (l = e[42]),
          e[43] !== n || e[44] !== l
            ? ((a = (0, w.jsxs)(o.default, { style: t, children: [n, l] })),
              (e[43] = n),
              (e[44] = l),
              (e[45] = a))
            : (a = e[45]),
          e[46] === Symbol.for("react.memo_cache_sentinel")
            ? ((d = (0, w.jsx)(S.ProfileGateCard, {})), (e[46] = d))
            : (d = e[46]),
          e[47] !== a
            ? ((c = (0, w.jsxs)(x.Screen, { children: [a, d] })),
              (e[47] = a),
              (e[48] = c))
            : (c = e[48]),
          c
        );
      }
      if ("done" === N) {
        let t, n, i, r, l;
        (e[49] === Symbol.for("react.memo_cache_sentinel")
          ? ((t = {
              marginTop: h.space.xxl,
              alignItems: "center",
              paddingVertical: 36,
            }),
            (e[49] = t))
          : (t = e[49]),
          e[50] !== P.tint2
            ? ((n = {
                width: 64,
                height: 64,
                borderRadius: 32,
                backgroundColor: P.tint2,
                alignItems: "center",
                justifyContent: "center",
              }),
              (e[50] = P.tint2),
              (e[51] = n))
            : (n = e[51]),
          e[52] !== P.greenDeep
            ? ((i = (0, w.jsx)(s.Ionicons, {
                name: "paper-plane",
                size: 30,
                color: P.greenDeep,
              })),
              (e[52] = P.greenDeep),
              (e[53] = i))
            : (i = e[53]),
          e[54] !== n || e[55] !== i
            ? ((r = (0, w.jsx)(o.default, { style: n, children: i })),
              (e[54] = n),
              (e[55] = i),
              (e[56] = r))
            : (r = e[56]),
          e[57] === Symbol.for("react.memo_cache_sentinel")
            ? ((l = { marginTop: h.space.lg }), (e[57] = l))
            : (l = e[57]));
        const a = A
          ? "\u10d2\u10d6\u10d0\u10d5\u10dc\u10d8\u10da\u10d8 \u10e8\u10d4\u10e5\u10db\u10dc\u10d8\u10da\u10d8\u10d0"
          : "Shipment created";
        let d, c;
        (e[58] !== a
          ? ((d = (0, w.jsx)(x.Body, {
              weight: "700",
              size: h.font.s16,
              style: l,
              children: a,
            })),
            (e[58] = a),
            (e[59] = d))
          : (d = e[59]),
          e[60] === Symbol.for("react.memo_cache_sentinel")
            ? ((c = { marginTop: 4 }), (e[60] = c))
            : (c = e[60]));
        const u = Se?.tracking_number;
        let p, f;
        (e[61] !== u
          ? ((p = (0, w.jsx)(x.Body, {
              weight: "600",
              size: h.font.s13,
              style: c,
              children: u,
            })),
            (e[61] = u),
            (e[62] = p))
          : (p = e[62]),
          e[63] === Symbol.for("react.memo_cache_sentinel")
            ? ((f = { marginTop: 6, textAlign: "center" }), (e[63] = f))
            : (f = e[63]));
        const y = ee
          ? A
            ? "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8 \u10e9\u10d0\u10db\u10dd\u10d5\u10d0 \u10db\u10d8\u10d7\u10d8\u10d7\u10d4\u10d1\u10e3\u10da \u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d6\u10d4"
            : "A courier will collect it from your address"
          : A
            ? "\u10e9\u10d0\u10d0\u10d1\u10d0\u10e0\u10d4 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10e3\u10d0\u10ee\u10da\u10dd\u10d4\u10e1 \u10e4\u10d8\u10da\u10d8\u10d0\u10da\u10e8\u10d8"
            : "Drop the parcel at your nearest branch";
        let j, b;
        (e[64] !== y
          ? ((j = (0, w.jsx)(x.Body, {
              muted: !0,
              size: h.font.s12,
              style: f,
              children: y,
            })),
            (e[64] = y),
            (e[65] = j))
          : (j = e[65]),
          e[66] === Symbol.for("react.memo_cache_sentinel")
            ? ((b = { marginTop: h.space.lg }), (e[66] = b))
            : (b = e[66]));
        const S = Number(Se?.price ?? We);
        let k, B;
        (e[67] !== S
          ? ((k = S.toFixed(2)), (e[67] = S), (e[68] = k))
          : (k = e[68]),
          e[69] !== k
            ? ((B = (0, w.jsxs)(x.Body, {
                weight: "700",
                size: h.font.s18,
                style: b,
                children: ["\u20be", k],
              })),
              (e[69] = k),
              (e[70] = B))
            : (B = e[70]));
        const _ = A
          ? "\u10e9\u10d0\u10db\u10dd\u10d8\u10ed\u10e0\u10d0 \u10d1\u10d0\u10e0\u10d0\u10d7\u10d8\u10d3\u10d0\u10dc"
          : "Charged to your card";
        let C, z, v;
        (e[71] !== _
          ? ((C = (0, w.jsx)(x.Body, {
              muted: !0,
              size: h.font.s11,
              children: _,
            })),
            (e[71] = _),
            (e[72] = C))
          : (C = e[72]),
          e[73] !== Se?.recipients
            ? ((z = Se?.recipients ?? []),
              (e[73] = Se?.recipients),
              (e[74] = z))
            : (z = e[74]),
          e[75] !== z
            ? ((v = (0, w.jsx)(T.RecipientsSummary, { people: z })),
              (e[75] = z),
              (e[76] = v))
            : (v = e[76]));
        const V = A
          ? "\u10e9\u10d4\u10db\u10d8 \u10d2\u10d6\u10d0\u10d5\u10dc\u10d8\u10da\u10d4\u10d1\u10d8"
          : "My shipments";
        let L, W, O;
        return (
          e[77] === Symbol.for("react.memo_cache_sentinel")
            ? ((L = { marginTop: h.space.xl, alignSelf: "stretch" }),
              (e[77] = L))
            : (L = e[77]),
          e[78] !== V
            ? ((W = (0, w.jsx)(x.Btn, { label: V, onPress: D, style: L })),
              (e[78] = V),
              (e[79] = W))
            : (W = e[79]),
          e[80] !== r ||
          e[81] !== d ||
          e[82] !== p ||
          e[83] !== j ||
          e[84] !== B ||
          e[85] !== C ||
          e[86] !== v ||
          e[87] !== W
            ? ((O = (0, w.jsx)(x.Screen, {
                children: (0, w.jsxs)(x.Card, {
                  style: t,
                  children: [r, d, p, j, B, C, v, W],
                }),
              })),
              (e[80] = r),
              (e[81] = d),
              (e[82] = p),
              (e[83] = j),
              (e[84] = B),
              (e[85] = C),
              (e[86] = v),
              (e[87] = W),
              (e[88] = O))
            : (O = e[88]),
          O
        );
      }
      let He, Ye, qe;
      (e[89] === Symbol.for("react.memo_cache_sentinel")
        ? ((He = [
            x.styles.row,
            { gap: h.space.md, flexShrink: 1, minWidth: 0 },
          ]),
          (e[89] = He))
        : (He = e[89]),
        e[90] !== P.ink
          ? ((Ye = (0, w.jsx)(s.Ionicons, {
              name: "chevron-back",
              size: 24,
              color: P.ink,
            })),
            (e[90] = P.ink),
            (e[91] = Ye))
          : (Ye = e[91]),
        e[92] !== Ae || e[93] !== Ye
          ? ((qe = (0, w.jsx)(r.default, {
              onPress: Ae,
              hitSlop: 12,
              children: Ye,
            })),
            (e[92] = Ae),
            (e[93] = Ye),
            (e[94] = qe))
          : (qe = e[94]));
      const Je = A
        ? "\u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d0"
        : "Send a parcel";
      let Xe, Qe, Ze, et, tt, st, nt, it, rt, lt, ot, at, dt, ct, ut, ht;
      return (
        e[95] !== Je
          ? ((Xe = (0, w.jsx)(x.Title, { children: Je })),
            (e[95] = Je),
            (e[96] = Xe))
          : (Xe = e[96]),
        e[97] !== qe || e[98] !== Xe
          ? ((Qe = (0, w.jsxs)(o.default, { style: He, children: [qe, Xe] })),
            (e[97] = qe),
            (e[98] = Xe),
            (e[99] = Qe))
          : (Qe = e[99]),
        e[100] === Symbol.for("react.memo_cache_sentinel")
          ? ((Ze = (0, w.jsx)(j.NewBadge, {})), (e[100] = Ze))
          : (Ze = e[100]),
        e[101] !== Qe
          ? ((et = (0, w.jsxs)(o.default, {
              style: x.styles.between,
              children: [Qe, Ze],
            })),
            (e[101] = Qe),
            (e[102] = et))
          : (et = e[102]),
        e[103] !== N
          ? ((tt = (0, w.jsx)(O, { step: N })), (e[103] = N), (e[104] = tt))
          : (tt = e[104]),
        e[105] !== A || e[106] !== N
          ? ((st =
              "to" === N
                ? (0, w.jsx)(y.DrawnBand, {
                    name: "how",
                    width: 92,
                    note: A
                      ? "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10d3\u10d0\u10dc \u2014\n\u10db\u10e1\u10dd\u10e4\u10da\u10d8\u10dd\u10e8\u10d8."
                      : "From Georgia\nto the world.",
                    style: { marginTop: h.space.lg },
                  })
                : null),
            (e[105] = A),
            (e[106] = N),
            (e[107] = st))
          : (st = e[107]),
        e[108] !== $ ||
        e[109] !== Y ||
        e[110] !== ve ||
        e[111] !== A ||
        e[112] !== J ||
        e[113] !== ee ||
        e[114] !== M ||
        e[115] !== N
          ? ((nt =
              "from" === N
                ? (0, w.jsxs)(w.Fragment, {
                    children: [
                      (0, w.jsx)(x.SectionLabel, {
                        children: A
                          ? "\u10e1\u10d0\u10d8\u10d3\u10d0\u10dc"
                          : "Pick up from",
                      }),
                      (0, w.jsxs)(u.TourTarget, {
                        id: "outgoing.pickup",
                        children: [
                          (0, w.jsxs)(x.Card, {
                            style: { paddingVertical: 0 },
                            children: [
                              ($ ?? []).map((e, t) =>
                                (0, w.jsxs)(
                                  o.default,
                                  {
                                    children: [
                                      t > 0 ? (0, w.jsx)(x.Divider, {}) : null,
                                      (0, w.jsxs)(r.default, {
                                        onPress: () => q(e.id),
                                        style: [
                                          x.styles.row,
                                          {
                                            gap: h.space.md,
                                            paddingVertical: 14,
                                          },
                                        ],
                                        children: [
                                          (0, w.jsx)(W, {
                                            on: (Y ?? $?.[0]?.id) === e.id,
                                          }),
                                          (0, w.jsxs)(o.default, {
                                            style: { flex: 1, minWidth: 0 },
                                            children: [
                                              (0, w.jsx)(x.Body, {
                                                weight: "600",
                                                size: h.font.s13,
                                                numberOfLines: 1,
                                                children:
                                                  e.title ?? e.tag ?? "\u2014",
                                              }),
                                              (0, w.jsxs)(x.Body, {
                                                muted: !0,
                                                size: h.font.s11,
                                                numberOfLines: 1,
                                                children: [
                                                  e.address,
                                                  e.city ? `, ${e.city}` : "",
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  },
                                  e.id,
                                ),
                              ),
                              J
                                ? (0, w.jsxs)(o.default, {
                                    children: [
                                      $?.length
                                        ? (0, w.jsx)(x.Divider, {})
                                        : null,
                                      (0, w.jsxs)(r.default, {
                                        onPress: () => q("manual"),
                                        style: [
                                          x.styles.row,
                                          {
                                            gap: h.space.md,
                                            paddingVertical: 14,
                                          },
                                        ],
                                        children: [
                                          (0, w.jsx)(W, { on: "manual" === Y }),
                                          (0, w.jsxs)(o.default, {
                                            style: { flex: 1, minWidth: 0 },
                                            children: [
                                              (0, w.jsxs)(o.default, {
                                                style: [
                                                  x.styles.row,
                                                  { gap: 6 },
                                                ],
                                                children: [
                                                  (0, w.jsx)(x.Body, {
                                                    weight: "600",
                                                    size: h.font.s13,
                                                    numberOfLines: 1,
                                                    children: J.title,
                                                  }),
                                                  (0, w.jsx)(x.Pill, {
                                                    text: A
                                                      ? "\u10d4\u10e0\u10d7\u10ef\u10d4\u10e0\u10d0\u10d3\u10d8"
                                                      : "This time only",
                                                    tone: "info",
                                                  }),
                                                ],
                                              }),
                                              (0, w.jsxs)(x.Body, {
                                                muted: !0,
                                                size: h.font.s11,
                                                numberOfLines: 1,
                                                children: [
                                                  J.address,
                                                  ", ",
                                                  J.city,
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  })
                                : null,
                              $?.length || J
                                ? null
                                : (0, w.jsx)(o.default, {
                                    style: { paddingVertical: h.space.lg },
                                    children: (0, w.jsx)(x.Body, {
                                      muted: !0,
                                      size: h.font.s13,
                                      children: A
                                        ? "\u10e8\u10d4\u10dc\u10d0\u10ee\u10e3\u10da\u10d8 \u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8 \u10ef\u10d4\u10e0 \u10d0\u10e0 \u10d2\u10d0\u10e5\u10d5\u10e1 \u2014 \u10d3\u10d0\u10d0\u10db\u10d0\u10e2\u10d4 \u10e0\u10e3\u10d9\u10d0\u10d6\u10d4"
                                        : "No saved address yet \u2014 add one on the map",
                                    }),
                                  }),
                            ],
                          }),
                          (0, w.jsx)(x.Btn, {
                            label: A
                              ? "\u10d0\u10ee\u10d0\u10da\u10d8 \u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8 \u10e0\u10e3\u10d9\u10d0\u10d6\u10d4"
                              : "Add address on the map",
                            variant: "outline",
                            icon: "location-outline",
                            onPress: () => Z(!0),
                            style: { marginTop: h.space.md },
                          }),
                          (0, w.jsx)(x.Card, {
                            style: {
                              marginTop: h.space.md,
                              paddingVertical: 0,
                            },
                            children: (0, w.jsx)(x.ToggleRow, {
                              icon: "car-outline",
                              title: A
                                ? "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8 \u10e9\u10d0\u10db\u10dd\u10d5\u10d8\u10d3\u10d4\u10e1"
                                : "Courier pickup",
                              subtitle: A
                                ? `+${M}\u20be, \u10e1\u10ee\u10d5\u10d0\u10d2\u10d5\u10d0\u10e0\u10d0\u10d3 \u10e9\u10d0\u10d0\u10d1\u10d0\u10e0\u10d4 \u10e4\u10d8\u10da\u10d8\u10d0\u10da\u10e8\u10d8`
                                : `+${M}\u20be, otherwise drop it at a branch`,
                              value: ee,
                              onValueChange: te,
                            }),
                          }),
                        ],
                      }),
                      (0, w.jsx)(u.TourTarget, {
                        id: "outgoing.next",
                        onPress: ve ? Ke("parcel") : void 0,
                        style: { marginTop: h.space.xl },
                        children: (0, w.jsx)(x.Btn, {
                          label: A
                            ? "\u10d2\u10d0\u10d2\u10e0\u10eb\u10d4\u10da\u10d4\u10d1\u10d0"
                            : "Continue",
                          onPress: Ke("parcel"),
                          disabled: !ve,
                        }),
                      }),
                    ],
                  })
                : null),
            (e[108] = $),
            (e[109] = Y),
            (e[110] = ve),
            (e[111] = A),
            (e[112] = J),
            (e[113] = ee),
            (e[114] = M),
            (e[115] = N),
            (e[116] = nt))
          : (nt = e[116]),
        e[117] !== K ||
        e[118] !== ke.code ||
        e[119] !== Ce ||
        e[120] !== me ||
        e[121] !== Ne ||
        e[122] !== Re ||
        e[123] !== A ||
        e[124] !== ce ||
        e[125] !== ie ||
        e[126] !== le ||
        e[127] !== N ||
        e[128] !== P.faint ||
        e[129] !== P.greenDeep ||
        e[130] !== Me
          ? ((it =
              "to" === N
                ? (0, w.jsxs)(w.Fragment, {
                    children: [
                      (0, w.jsx)(x.SectionLabel, {
                        children: A
                          ? "\u10e5\u10d5\u10d4\u10e7\u10d0\u10dc\u10d0"
                          : "Destination",
                      }),
                      (0, w.jsx)(x.Card, {
                        style: { paddingVertical: 0 },
                        children: K.map((e, t) => {
                          const s = () => {
                            (ne(e.code),
                              ce.number || ue({ country: e.code, number: "" }));
                          };
                          return (0, w.jsxs)(
                            o.default,
                            {
                              children: [
                                t > 0 ? (0, w.jsx)(x.Divider, {}) : null,
                                (0, w.jsx)(u.TourTarget, {
                                  id: `outgoing.country.${e.code}`,
                                  onPress: s,
                                  children: (0, w.jsxs)(r.default, {
                                    onPress: s,
                                    style: [
                                      x.styles.row,
                                      { gap: h.space.md, paddingVertical: 14 },
                                    ],
                                    children: [
                                      (0, w.jsx)(W, { on: ke.code === e.code }),
                                      (0, w.jsx)(x.Body, {
                                        size: h.font.s18,
                                        children: e.flag,
                                      }),
                                      (0, w.jsxs)(o.default, {
                                        style: { flex: 1, minWidth: 0 },
                                        children: [
                                          (0, w.jsx)(x.Body, {
                                            weight: "600",
                                            size: h.font.s13,
                                            numberOfLines: 1,
                                            children: Ce(e),
                                          }),
                                          (0, w.jsxs)(x.Body, {
                                            muted: !0,
                                            size: h.font.s11,
                                            children: [
                                              e.days,
                                              " ",
                                              A ? "\u10d3\u10e6\u10d4" : "days",
                                              " \xb7 \u20be",
                                              e.perKg,
                                              "/kg",
                                            ],
                                          }),
                                        ],
                                      }),
                                    ],
                                  }),
                                }),
                              ],
                            },
                            e.code,
                          );
                        }),
                      }),
                      (0, w.jsxs)(o.default, {
                        style: [
                          x.styles.between,
                          {
                            marginTop: h.space.xl,
                            marginBottom: h.space.md,
                            gap: h.space.sm,
                          },
                        ],
                        children: [
                          (0, w.jsx)(x.Body, {
                            weight: "700",
                            size: h.font.s13,
                            children: A
                              ? "\u10db\u10d8\u10db\u10e6\u10d4\u10d1\u10d8"
                              : "Recipient",
                          }),
                          (0, w.jsxs)(o.default, {
                            style: [x.styles.row, { gap: h.space.md }],
                            children: [
                              (0, w.jsx)(u.TourTarget, {
                                id: "outgoing.demoRecipient",
                                onPress: Re,
                                children: (0, w.jsxs)(r.default, {
                                  onPress: Re,
                                  hitSlop: 8,
                                  style: [x.styles.row, { gap: 5 }],
                                  children: [
                                    (0, w.jsx)(s.Ionicons, {
                                      name: "flask-outline",
                                      size: 13,
                                      color: P.greenDeep,
                                    }),
                                    (0, w.jsx)(x.Body, {
                                      size: h.font.s12,
                                      weight: "700",
                                      style: { color: P.greenDeep },
                                      children: A
                                        ? "\u10e1\u10d0\u10d3\u10d4\u10db\u10dd"
                                        : "Demo",
                                    }),
                                  ],
                                }),
                              }),
                              (0, w.jsx)(u.TourTarget, {
                                id: "outgoing.contacts",
                                children: (0, w.jsx)(f.ContactsButton, {
                                  country: ke.code,
                                  onPick: (e) => {
                                    (re(`${e.first} ${e.last}`.trim()),
                                      ue(e.phone),
                                      e.address && oe(e.address));
                                  },
                                }),
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, w.jsx)(l.default, {
                        value: ie,
                        onChangeText: re,
                        placeholder: A
                          ? "\u10e1\u10d0\u10ee\u10d4\u10da\u10d8 \u10d3\u10d0 \u10d2\u10d5\u10d0\u10e0\u10d8"
                          : "Full name",
                        placeholderTextColor: P.faint,
                        style: Ne,
                      }),
                      (0, w.jsx)(l.default, {
                        value: le,
                        onChangeText: oe,
                        placeholder: A
                          ? "\u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8"
                          : "Address",
                        placeholderTextColor: P.faint,
                        multiline: !0,
                        style: {
                          ...Ne,
                          marginTop: h.space.sm,
                          minHeight: 70,
                          textAlignVertical: "top",
                        },
                      }),
                      (0, w.jsx)(o.default, {
                        style: { marginTop: h.space.sm },
                        children: (0, w.jsx)(b.PhoneInput, {
                          value: ce,
                          onChange: ue,
                        }),
                      }),
                      (0, w.jsx)(u.TourTarget, {
                        id: "outgoing.people",
                        style: { marginTop: h.space.xl },
                        children: (0, w.jsx)(T.RecipientsEditor, {
                          rows: me,
                          onChange: ge,
                          defaultCountry: ke.code,
                          demoPeople: _[ke.code] ?? [],
                          max: 4,
                          label: A
                            ? "\u10d9\u10d8\u10d3\u10d4\u10d5 \u10d5\u10d8\u10dc \u10db\u10d8\u10d8\u10e6\u10d4\u10d1\u10e1"
                            : "Who else can receive it",
                          hint: A
                            ? "\u10dc\u10d4\u10d1\u10d8\u10e1\u10db\u10d8\u10d4\u10e0\u10d8 \u10e9\u10d0\u10db\u10dd\u10d7\u10d5\u10da\u10d8\u10da\u10d8 \u10e8\u10d4\u10eb\u10da\u10d4\u10d1\u10e1 \u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8\u10e1 \u10db\u10d8\u10e6\u10d4\u10d1\u10d0\u10e1 \u10d0\u10db \u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d6\u10d4. \u10d7\u10d8\u10d7\u10dd\u10d4\u10e3\u10da\u10e1 \u10de\u10e0\u10dd\u10e4\u10d8\u10da\u10d8 \u10e8\u10d4\u10d8\u10e5\u10db\u10dc\u10d4\u10d1\u10d0."
                            : "Anyone listed can accept the parcel at this address. Each gets a Gzavnili profile automatically.",
                        }),
                      }),
                      (0, w.jsx)(u.TourTarget, {
                        id: "outgoing.next",
                        onPress: Me ? Ke("from") : void 0,
                        style: { marginTop: h.space.xl },
                        children: (0, w.jsx)(x.Btn, {
                          label: A
                            ? "\u10d2\u10d0\u10d2\u10e0\u10eb\u10d4\u10da\u10d4\u10d1\u10d0"
                            : "Continue",
                          onPress: Ke("from"),
                          disabled: !Me,
                        }),
                      }),
                    ],
                  })
                : null),
            (e[117] = K),
            (e[118] = ke.code),
            (e[119] = Ce),
            (e[120] = me),
            (e[121] = Ne),
            (e[122] = Re),
            (e[123] = A),
            (e[124] = ce),
            (e[125] = ie),
            (e[126] = le),
            (e[127] = N),
            (e[128] = P.faint),
            (e[129] = P.greenDeep),
            (e[130] = Me),
            (e[131] = it))
          : (it = e[131]),
        e[132] !== xe ||
        e[133] !== Ne ||
        e[134] !== A ||
        e[135] !== Ve ||
        e[136] !== N ||
        e[137] !== P.faint ||
        e[138] !== P.ink ||
        e[139] !== pe
          ? ((rt =
              "parcel" === N
                ? (0, w.jsxs)(w.Fragment, {
                    children: [
                      (0, w.jsx)(x.SectionLabel, {
                        children: A ? "\u10ec\u10dd\u10dc\u10d0" : "Weight",
                      }),
                      (0, w.jsx)(u.TourTarget, {
                        id: "outgoing.weight",
                        children: (0, w.jsx)(x.Card, {
                          children: (0, w.jsxs)(o.default, {
                            style: [x.styles.row, { gap: h.space.sm }],
                            children: [
                              (0, w.jsx)(l.default, {
                                value: pe,
                                onChangeText: fe,
                                keyboardType: "decimal-pad",
                                style: {
                                  flexGrow: 1,
                                  flexShrink: 1,
                                  flexBasis: 0,
                                  minWidth: 0,
                                  fontSize: h.font.s28,
                                  fontWeight: "700",
                                  color: P.ink,
                                  padding: 0,
                                },
                              }),
                              (0, w.jsx)(o.default, {
                                style: { flexShrink: 0 },
                                children: (0, w.jsx)(x.Pill, { text: "kg" }),
                              }),
                            ],
                          }),
                        }),
                      }),
                      (0, w.jsx)(x.SectionLabel, {
                        children: A
                          ? "\u10e0\u10d0 \u10d0\u10e0\u10d8\u10e1 \u10e8\u10d8\u10d2\u10dc\u10d8\u10d7"
                          : "What is inside",
                      }),
                      (0, w.jsx)(l.default, {
                        value: xe,
                        onChangeText: ye,
                        placeholder: A
                          ? "\u10db\u10d0\u10d2. \u10e2\u10d0\u10dc\u10e1\u10d0\u10ea\u10db\u10d4\u10da\u10d8, \u10e1\u10d0\u10e9\u10e3\u10e5\u10e0\u10d4\u10d1\u10d8"
                          : "e.g. clothing, gifts",
                        placeholderTextColor: P.faint,
                        multiline: !0,
                        style: {
                          ...Ne,
                          minHeight: 80,
                          textAlignVertical: "top",
                        },
                      }),
                      (0, w.jsx)(x.Card, {
                        style: { marginTop: h.space.md },
                        children: (0, w.jsxs)(o.default, {
                          style: [x.styles.row, { gap: h.space.sm }],
                          children: [
                            (0, w.jsx)(s.Ionicons, {
                              name: "information-circle-outline",
                              size: 16,
                              color: P.faint,
                            }),
                            (0, w.jsx)(x.Body, {
                              muted: !0,
                              size: h.font.s11,
                              style: { flex: 1, minWidth: 0 },
                              children: A
                                ? "\u10d0\u10d9\u10e0\u10eb\u10d0\u10da\u10e3\u10da\u10d8 \u10dc\u10d8\u10d5\u10d7\u10d4\u10d1\u10d8\u10e1 \u10e1\u10d8\u10d0 \u10db\u10dd\u10e5\u10db\u10d4\u10d3\u10d4\u10d1\u10e1 \u10d3\u10d0\u10dc\u10d8\u10e8\u10dc\u10e3\u10da\u10d4\u10d1\u10d8\u10e1 \u10e5\u10d5\u10d4\u10e7\u10dc\u10d8\u10e1 \u10db\u10d8\u10ee\u10d4\u10d3\u10d5\u10d8\u10d7"
                                : "Prohibited-item rules depend on the destination country",
                            }),
                          ],
                        }),
                      }),
                      (0, w.jsx)(u.TourTarget, {
                        id: "outgoing.next",
                        onPress: Ve > 0 && Ve <= 30 ? Ke("quote") : void 0,
                        style: { marginTop: h.space.xl },
                        children: (0, w.jsx)(x.Btn, {
                          label: A
                            ? "\u10e4\u10d0\u10e1\u10d8\u10e1 \u10dc\u10d0\u10ee\u10d5\u10d0"
                            : "See the price",
                          onPress: Ke("quote"),
                          disabled: !(Ve > 0 && Ve <= 30),
                        }),
                      }),
                    ],
                  })
                : null),
            (e[132] = xe),
            (e[133] = Ne),
            (e[134] = A),
            (e[135] = Ve),
            (e[136] = N),
            (e[137] = P.faint),
            (e[138] = P.ink),
            (e[139] = pe),
            (e[140] = rt))
          : (rt = e[140]),
        e[141] !== G ||
        e[142] !== ke ||
        e[143] !== Ce ||
        e[144] !== R.isPending ||
        e[145] !== je ||
        e[146] !== me ||
        e[147] !== Le ||
        e[148] !== A ||
        e[149] !== Ve ||
        e[150] !== ee ||
        e[151] !== M ||
        e[152] !== ie ||
        e[153] !== N ||
        e[154] !== $e ||
        e[155] !== P.faint ||
        e[156] !== P.mut ||
        e[157] !== P.red ||
        e[158] !== We
          ? ((lt =
              "quote" === N
                ? (0, w.jsxs)(w.Fragment, {
                    children: [
                      (0, w.jsx)(x.Card, {
                        style: { marginTop: h.space.lg },
                        children: (0, w.jsxs)(o.default, {
                          style: [x.styles.row, { gap: h.space.md }],
                          children: [
                            (0, w.jsx)(x.Body, {
                              size: h.font.s22,
                              children: "\ud83c\uddec\ud83c\uddea",
                            }),
                            (0, w.jsx)(s.Ionicons, {
                              name: "arrow-forward",
                              size: 16,
                              color: P.faint,
                            }),
                            (0, w.jsx)(x.Body, {
                              size: h.font.s22,
                              children: ke.flag,
                            }),
                            (0, w.jsxs)(o.default, {
                              style: { flex: 1, minWidth: 0 },
                              children: [
                                (0, w.jsxs)(x.Body, {
                                  weight: "700",
                                  size: h.font.s13,
                                  numberOfLines: 1,
                                  children: [
                                    ie,
                                    me.filter(v).length
                                      ? ` +${me.filter(z).length}`
                                      : "",
                                  ],
                                }),
                                (0, w.jsxs)(x.Body, {
                                  muted: !0,
                                  size: h.font.s11,
                                  numberOfLines: 1,
                                  children: [
                                    Ce(ke),
                                    " \xb7 ",
                                    ke.days,
                                    " ",
                                    A ? "\u10d3\u10e6\u10d4" : "days",
                                  ],
                                }),
                              ],
                            }),
                          ],
                        }),
                      }),
                      (0, w.jsx)(x.SectionLabel, {
                        children: A
                          ? "\u10e6\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d4\u10d1\u10d0"
                          : "Cost",
                      }),
                      (0, w.jsxs)(x.Card, {
                        style: { paddingVertical: 0 },
                        children: [
                          (0, w.jsx)(L, {
                            label: `${A ? "\u10d2\u10d0\u10d3\u10d0\u10d6\u10d8\u10d3\u10d5\u10d0" : "Freight"} \xb7 ${Ve} kg`,
                            value: Le,
                          }),
                          (0, w.jsx)(x.Divider, {}),
                          (0, w.jsx)(L, {
                            label: A
                              ? "\u10d3\u10d0\u10db\u10e3\u10e8\u10d0\u10d5\u10d4\u10d1\u10d0"
                              : "Handling",
                            value: G,
                          }),
                          ee
                            ? (0, w.jsxs)(w.Fragment, {
                                children: [
                                  (0, w.jsx)(x.Divider, {}),
                                  (0, w.jsx)(L, {
                                    label: A
                                      ? "\u10d9\u10e3\u10e0\u10d8\u10d4\u10e0\u10d8"
                                      : "Pickup",
                                    value: M,
                                  }),
                                ],
                              })
                            : null,
                          (0, w.jsx)(x.Divider, {}),
                          (0, w.jsxs)(o.default, {
                            style: [x.styles.between, { paddingVertical: 15 }],
                            children: [
                              (0, w.jsx)(x.Body, {
                                weight: "700",
                                children: A
                                  ? "\u10ef\u10d0\u10db\u10d8"
                                  : "Total",
                              }),
                              (0, w.jsxs)(x.Body, {
                                weight: "700",
                                size: h.font.s18,
                                children: ["\u20be", We.toFixed(2)],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, w.jsx)(x.Card, {
                        style: { marginTop: h.space.md },
                        children: (0, w.jsxs)(o.default, {
                          style: [x.styles.row, { gap: h.space.sm }],
                          children: [
                            (0, w.jsx)(s.Ionicons, {
                              name: "card-outline",
                              size: 16,
                              color: P.mut,
                            }),
                            (0, w.jsx)(x.Body, {
                              size: h.font.s11,
                              style: { flex: 1, minWidth: 0, color: P.mut },
                              children: A
                                ? "\u10d2\u10d0\u10d3\u10d0\u10ee\u10d3\u10d0 \xb7 Visa \xb7\xb7 4821"
                                : "Paid with Visa \xb7\xb7 4821",
                            }),
                          ],
                        }),
                      }),
                      je
                        ? (0, w.jsxs)(o.default, {
                            style: [
                              x.styles.row,
                              { gap: 6, marginTop: h.space.md },
                            ],
                            children: [
                              (0, w.jsx)(s.Ionicons, {
                                name: "alert-circle",
                                size: 15,
                                color: P.red,
                              }),
                              (0, w.jsx)(x.Body, {
                                size: h.font.s12,
                                style: { color: P.red, flex: 1, minWidth: 0 },
                                children: je,
                              }),
                            ],
                          })
                        : null,
                      (0, w.jsx)(u.TourTarget, {
                        id: "outgoing.submit",
                        style: { marginTop: h.space.xl },
                        children: (0, w.jsx)(x.Btn, {
                          label: A
                            ? "\u10d2\u10d6\u10d0\u10d5\u10dc\u10d8\u10da\u10d8\u10e1 \u10e8\u10d4\u10e5\u10db\u10dc\u10d0"
                            : "Create shipment",
                          icon: "paper-plane-outline",
                          onPress: $e,
                          loading: R.isPending,
                        }),
                      }),
                    ],
                  })
                : null),
            (e[141] = G),
            (e[142] = ke),
            (e[143] = Ce),
            (e[144] = R.isPending),
            (e[145] = je),
            (e[146] = me),
            (e[147] = Le),
            (e[148] = A),
            (e[149] = Ve),
            (e[150] = ee),
            (e[151] = M),
            (e[152] = ie),
            (e[153] = N),
            (e[154] = $e),
            (e[155] = P.faint),
            (e[156] = P.mut),
            (e[157] = P.red),
            (e[158] = We),
            (e[159] = lt))
          : (lt = e[159]),
        e[160] !== et ||
        e[161] !== tt ||
        e[162] !== st ||
        e[163] !== nt ||
        e[164] !== it ||
        e[165] !== rt ||
        e[166] !== lt
          ? ((ot = (0, w.jsxs)(x.Screen, {
              children: [et, tt, st, nt, it, rt, lt],
            })),
            (e[160] = et),
            (e[161] = tt),
            (e[162] = st),
            (e[163] = nt),
            (e[164] = it),
            (e[165] = rt),
            (e[166] = lt),
            (e[167] = ot))
          : (ot = e[167]),
        e[168] === Symbol.for("react.memo_cache_sentinel")
          ? ((at = () => Z(!1)), (e[168] = at))
          : (at = e[168]),
        e[169] !== A || e[170] !== I.error || e[171] !== I.isError
          ? ((dt = I.isError
              ? (0, d.apiError)(
                  I.error,
                  A
                    ? "\u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8 \u10d5\u10d4\u10e0 \u10e8\u10d4\u10d8\u10dc\u10d0\u10ee\u10d0"
                    : "Could not save the address",
                )
              : null),
            (e[169] = A),
            (e[170] = I.error),
            (e[171] = I.isError),
            (e[172] = dt))
          : (dt = e[172]),
        e[173] !== I
          ? ((ct = (e) => {
              if (!e.save) return (X(e), q("manual"), void Z(!1));
              I.mutate(
                {
                  address: e.address,
                  city: e.city,
                  title: e.title,
                  lat: e.lat,
                  lng: e.lng,
                },
                {
                  onSuccess: (e) => {
                    (X(null), q(e.id), Z(!1));
                  },
                },
              );
            }),
            (e[173] = I),
            (e[174] = ct))
          : (ct = e[174]),
        e[175] !== I.isPending || e[176] !== Q || e[177] !== dt || e[178] !== ct
          ? ((ut = (0, w.jsx)(p.AddressSheet, {
              visible: Q,
              onClose: at,
              saving: I.isPending,
              error: dt,
              onPicked: ct,
            })),
            (e[175] = I.isPending),
            (e[176] = Q),
            (e[177] = dt),
            (e[178] = ct),
            (e[179] = ut))
          : (ut = e[179]),
        e[180] !== ot || e[181] !== ut
          ? ((ht = (0, w.jsxs)(w.Fragment, { children: [ot, ut] })),
            (e[180] = ot),
            (e[181] = ut),
            (e[182] = ht))
          : (ht = e[182]),
        ht
      );
    }
    function z(e) {
      return e.first.trim();
    }
    function v(e) {
      return e.first.trim();
    }
    function D() {
      return n.router.replace("/(tabs)/parcels?direction=out");
    }
    function V() {
      return n.router.back();
    }
    function L(e) {
      const s = (0, t.c)(11),
        { label: n, value: i } = e;
      let r, l, a, d, c, u;
      return (
        s[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((r = [x.styles.between, { paddingVertical: 12 }]), (s[0] = r))
          : (r = s[0]),
        s[1] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = { flexShrink: 1, minWidth: 0 }), (s[1] = l))
          : (l = s[1]),
        s[2] !== n
          ? ((a = (0, w.jsx)(x.Body, {
              muted: !0,
              size: h.font.s13,
              numberOfLines: 1,
              style: l,
              children: n,
            })),
            (s[2] = n),
            (s[3] = a))
          : (a = s[3]),
        s[4] !== i ? ((d = i.toFixed(2)), (s[4] = i), (s[5] = d)) : (d = s[5]),
        s[6] !== d
          ? ((c = (0, w.jsxs)(x.Body, {
              weight: "600",
              size: h.font.s13,
              children: ["\u20be", d],
            })),
            (s[6] = d),
            (s[7] = c))
          : (c = s[7]),
        s[8] !== a || s[9] !== c
          ? ((u = (0, w.jsxs)(o.default, { style: r, children: [a, c] })),
            (s[8] = a),
            (s[9] = c),
            (s[10] = u))
          : (u = s[10]),
        u
      );
    }
    function W(e) {
      const s = (0, t.c)(8),
        { on: n } = e,
        { theme: i } = (0, x.useTokens)(),
        r = n ? i.green : i.line;
      let l, a, d;
      return (
        s[0] !== r
          ? ((l = {
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: r,
              alignItems: "center",
              justifyContent: "center",
            }),
            (s[0] = r),
            (s[1] = l))
          : (l = s[1]),
        s[2] !== n || s[3] !== i.green
          ? ((a = n
              ? (0, w.jsx)(o.default, {
                  style: {
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: i.green,
                  },
                })
              : null),
            (s[2] = n),
            (s[3] = i.green),
            (s[4] = a))
          : (a = s[4]),
        s[5] !== l || s[6] !== a
          ? ((d = (0, w.jsx)(o.default, { style: l, children: a })),
            (s[5] = l),
            (s[6] = a),
            (s[7] = d))
          : (d = s[7]),
        d
      );
    }
    function O(e) {
      const s = (0, t.c)(6),
        { step: n } = e,
        { theme: i } = (0, x.useTokens)(),
        r = C.indexOf(n);
      let l, a, d;
      return (
        s[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = { flexDirection: "row", gap: 6, marginTop: h.space.lg }),
            (s[0] = l))
          : (l = s[0]),
        s[1] !== r || s[2] !== i
          ? ((a = C.map((e, t) =>
              (0, w.jsx)(
                o.default,
                {
                  style: {
                    flexGrow: 1,
                    flexBasis: 0,
                    height: 4,
                    borderRadius: 2,
                    backgroundColor: t <= r ? i.green : i.line,
                  },
                },
                e,
              ),
            )),
            (s[1] = r),
            (s[2] = i),
            (s[3] = a))
          : (a = s[3]),
        s[4] !== a
          ? ((d = (0, w.jsx)(o.default, { style: l, children: a })),
            (s[4] = a),
            (s[5] = d))
          : (d = s[5]),
        d
      );
    }
  },
  1131,
  [
    11, 15, 276, 13, 415, 425, 192, 920, 968, 877, 1068, 895, 1132, 1135, 890,
    899, 909, 1137, 1033, 1138, 6,
  ],
);