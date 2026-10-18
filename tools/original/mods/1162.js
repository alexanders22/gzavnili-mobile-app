__d(
  function (g, r, _i, a, m, _e, d) {
    "use strict";
    function e(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Object.defineProperty(_e, "__esModule", { value: !0 }),
      Object.defineProperty(_e, "default", {
        enumerable: !0,
        get: function () {
          return w;
        },
      }));
    var t = r(d[0]),
      n = r(d[1]),
      s = r(d[2]),
      l = r(d[3]),
      i = e(r(d[4])),
      o = e(r(d[5])),
      c = e(r(d[6])),
      u = e(r(d[7])),
      h = e(r(d[8])),
      f = r(d[9]),
      x = r(d[10]),
      p = r(d[11]),
      j = r(d[12]),
      y = r(d[13]),
      b = r(d[14]),
      S = r(d[15]),
      _ = r(d[16]),
      k = r(d[17]);
    function w() {
      const e = (0, t.c)(190),
        { theme: c } = (0, b.useTokens)(),
        _ = "ka" === (0, p.useLang)(),
        w = (0, s.useLocalSearchParams)(),
        z = w.status || "AWAITING",
        { data: D, isLoading: L } = (0, x.useOrderFromList)(z, w.id),
        { data: I } = (0, x.useShops)(),
        O = (0, f.useCategories)(),
        A = (0, x.useAddDeclaration)(),
        R = (0, x.useDeleteDeclaration)(),
        W = (0, x.useDeclareOrder)(),
        V = (0, x.useUpdateWrapping)(),
        E = (0, x.useRenameOrder)(),
        N = "USA" === D?.branch?.name ? "USD" : "CNY",
        U = "USD" === N ? "$" : "CN\xa5";
      let $;
      e[0] !== D?.declaration
        ? (($ = D?.declaration ?? []), (e[0] = D?.declaration), (e[1] = $))
        : ($ = e[1]);
      const G = $,
        F = "DECLERED" === D?.declaration_status,
        [H, M] = (0, l.useState)(""),
        [K, Y] = (0, l.useState)(!1),
        [q, J] = (0, l.useState)(""),
        [Q, X] = (0, l.useState)(!1),
        [Z, ee] = (0, l.useState)(""),
        [te, ne] = (0, l.useState)(!1),
        [se, le] = (0, l.useState)(""),
        [ie, oe] = (0, l.useState)(null),
        re = H || G[0]?.website || "",
        ae = !!re && !!q && Number(Z) > 0,
        ce = G.length > 0 && !!re && !F;
      let de;
      e[2] !== I ? ((de = I ?? []), (e[2] = I), (e[3] = de)) : (de = e[3]);
      const ue = de;
      let me;
      e[4] !== A ||
      e[5] !== ae ||
      e[6] !== q ||
      e[7] !== N ||
      e[8] !== re ||
      e[9] !== _ ||
      e[10] !== D ||
      e[11] !== Z
        ? ((me = () => {
            D &&
              ae &&
              (oe(null),
              A.mutate(
                {
                  order_id: D.id,
                  website: re,
                  category: q,
                  price: Z,
                  currency: N,
                },
                {
                  onSuccess: () => {
                    (J(""), ee(""));
                  },
                  onError: () =>
                    oe(
                      _
                        ? "\u10de\u10e0\u10dd\u10d3\u10e3\u10e5\u10e2\u10d8 \u10d5\u10d4\u10e0 \u10d3\u10d0\u10d4\u10db\u10d0\u10e2\u10d0"
                        : "Could not add the product",
                    ),
                },
              ));
          }),
          (e[4] = A),
          (e[5] = ae),
          (e[6] = q),
          (e[7] = N),
          (e[8] = re),
          (e[9] = _),
          (e[10] = D),
          (e[11] = Z),
          (e[12] = me))
        : (me = e[12]);
      const he = me;
      let fe;
      e[13] !== ce ||
      e[14] !== W ||
      e[15] !== re ||
      e[16] !== _ ||
      e[17] !== D ||
      e[18] !== G
        ? ((fe = () => {
            D &&
              ce &&
              (oe(null),
              W.mutate(
                { orderId: D.id, declarationIds: G.map(B), website: re },
                {
                  onSuccess: v,
                  onError: () =>
                    oe(
                      _
                        ? "\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4\u10d1\u10d0 \u10d5\u10d4\u10e0 \u10db\u10dd\u10ee\u10d4\u10e0\u10ee\u10d3\u10d0"
                        : "Could not declare the parcel",
                    ),
                },
              ));
          }),
          (e[13] = ce),
          (e[14] = W),
          (e[15] = re),
          (e[16] = _),
          (e[17] = D),
          (e[18] = G),
          (e[19] = fe))
        : (fe = e[19]);
      const xe = fe;
      if (L || !D) {
        const t = _
          ? "\u10d8\u10e2\u10d5\u10d8\u10e0\u10d7\u10d4\u10d1\u10d0\u2026"
          : "Loading\u2026";
        let n;
        return (
          e[20] !== t
            ? ((n = (0, k.jsx)(b.Screen, {
                children: (0, k.jsx)(b.Body, { muted: !0, children: t }),
              })),
              (e[20] = t),
              (e[21] = n))
            : (n = e[21]),
          n
        );
      }
      let pe;
      e[22] !== c.ink || e[23] !== c.paper
        ? ((pe = {
            backgroundColor: c.paper,
            borderRadius: y.radius.md,
            paddingHorizontal: y.space.md,
            paddingVertical: 14,
            color: c.ink,
            fontSize: y.font.s14,
          }),
          (e[22] = c.ink),
          (e[23] = c.paper),
          (e[24] = pe))
        : (pe = e[24]);
      const je = pe;
      let ye, ge;
      (e[25] === Symbol.for("react.memo_cache_sentinel")
        ? ((ye = [b.styles.row, { gap: y.space.md }]), (e[25] = ye))
        : (ye = e[25]),
        e[26] !== c.ink
          ? ((ge = (0, k.jsx)(o.default, {
              onPress: T,
              hitSlop: 12,
              children: (0, k.jsx)(n.Ionicons, {
                name: "chevron-back",
                size: 24,
                color: c.ink,
              }),
            })),
            (e[26] = c.ink),
            (e[27] = ge))
          : (ge = e[27]));
      const be = _
        ? "\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4\u10d1\u10d0"
        : "Declaration";
      let Se, ke, we, Ce, Te, ve;
      (e[28] !== be
        ? ((Se = (0, k.jsx)(b.Title, { children: be })),
          (e[28] = be),
          (e[29] = Se))
        : (Se = e[29]),
        e[30] !== ge || e[31] !== Se
          ? ((ke = (0, k.jsxs)(h.default, { style: ye, children: [ge, Se] })),
            (e[30] = ge),
            (e[31] = Se),
            (e[32] = ke))
          : (ke = e[32]),
        e[33] === Symbol.for("react.memo_cache_sentinel")
          ? ((we = { marginTop: y.space.lg }), (e[33] = we))
          : (we = e[33]),
        e[34] === Symbol.for("react.memo_cache_sentinel")
          ? ((Ce = [b.styles.row, { gap: y.space.md }]),
            (Te = (0, k.jsx)(S.KraftBox, { size: 50 })),
            (e[34] = Ce),
            (e[35] = Te))
          : ((Ce = e[34]), (Te = e[35])),
        e[36] === Symbol.for("react.memo_cache_sentinel")
          ? ((ve = { flex: 1, minWidth: 0 }), (e[36] = ve))
          : (ve = e[36]));
      const Be = D.name ?? "\u2014";
      let Pe;
      e[37] !== Be
        ? ((Pe = (0, k.jsx)(b.Body, {
            weight: "700",
            numberOfLines: 1,
            children: Be,
          })),
          (e[37] = Be),
          (e[38] = Pe))
        : (Pe = e[38]);
      const ze = D.weight ? `\xb7 ${D.weight} kg` : "";
      let De, Le, Ie, Oe, Ae, Re, We, Ve;
      (e[39] !== D.tracking_number || e[40] !== ze
        ? ((De = (0, k.jsxs)(b.Body, {
            muted: !0,
            size: y.font.s12,
            numberOfLines: 1,
            children: [D.tracking_number, " ", ze],
          })),
          (e[39] = D.tracking_number),
          (e[40] = ze),
          (e[41] = De))
        : (De = e[41]),
        e[42] !== Pe || e[43] !== De
          ? ((Le = (0, k.jsxs)(h.default, { style: ve, children: [Pe, De] })),
            (e[42] = Pe),
            (e[43] = De),
            (e[44] = Le))
          : (Le = e[44]),
        e[45] !== D.name
          ? ((Ie = () => {
              (le(D.name ?? ""), ne(!0));
            }),
            (e[45] = D.name),
            (e[46] = Ie))
          : (Ie = e[46]),
        e[47] !== c.faint
          ? ((Oe = (0, k.jsx)(n.Ionicons, {
              name: "create-outline",
              size: 19,
              color: c.faint,
            })),
            (e[47] = c.faint),
            (e[48] = Oe))
          : (Oe = e[48]),
        e[49] !== Ie || e[50] !== Oe
          ? ((Ae = (0, k.jsx)(o.default, {
              onPress: Ie,
              hitSlop: 8,
              children: Oe,
            })),
            (e[49] = Ie),
            (e[50] = Oe),
            (e[51] = Ae))
          : (Ae = e[51]),
        e[52] !== Le || e[53] !== Ae
          ? ((Re = (0, k.jsxs)(h.default, {
              style: Ce,
              children: [Te, Le, Ae],
            })),
            (e[52] = Le),
            (e[53] = Ae),
            (e[54] = Re))
          : (Re = e[54]),
        e[55] !== F || e[56] !== _
          ? ((We = F
              ? (0, k.jsx)(h.default, {
                  style: { marginTop: y.space.md, alignSelf: "flex-start" },
                  children: (0, k.jsx)(b.Pill, {
                    text: _
                      ? "\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d8\u10d0"
                      : "Declared",
                    tone: "ok",
                  }),
                })
              : null),
            (e[55] = F),
            (e[56] = _),
            (e[57] = We))
          : (We = e[57]),
        e[58] !== Re || e[59] !== We
          ? ((Ve = (0, k.jsxs)(b.Card, { style: we, children: [Re, We] })),
            (e[58] = Re),
            (e[59] = We),
            (e[60] = Ve))
          : (Ve = e[60]));
      const Ee = _
        ? "\u10d5\u10d4\u10d1\u10d2\u10d5\u10d4\u10e0\u10d3\u10d8"
        : "Website";
      let Ne, Ue;
      (e[61] !== Ee
        ? ((Ne = (0, k.jsx)(b.SectionLabel, { children: Ee })),
          (e[61] = Ee),
          (e[62] = Ne))
        : (Ne = e[62]),
        e[63] === Symbol.for("react.memo_cache_sentinel")
          ? ((Ue = () => Y(!0)), (e[63] = Ue))
          : (Ue = e[63]));
      const $e = F ? 0.6 : 1;
      let Ge;
      e[64] !== $e
        ? ((Ge = { opacity: $e }), (e[64] = $e), (e[65] = Ge))
        : (Ge = e[65]);
      const Fe = re ? c.ink : c.faint;
      let He;
      e[66] !== Fe
        ? ((He = { color: Fe, flex: 1, minWidth: 0 }),
          (e[66] = Fe),
          (e[67] = He))
        : (He = e[67]);
      const Me =
        re ||
        (_
          ? "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10db\u10d0\u10e6\u10d0\u10d6\u10d8\u10d0"
          : "Choose a store");
      let Ke, Ye, qe, Je, Qe;
      (e[68] !== He || e[69] !== Me
        ? ((Ke = (0, k.jsx)(b.Body, {
            size: y.font.s14,
            numberOfLines: 1,
            style: He,
            children: Me,
          })),
          (e[68] = He),
          (e[69] = Me),
          (e[70] = Ke))
        : (Ke = e[70]),
        e[71] !== c.faint
          ? ((Ye = (0, k.jsx)(n.Ionicons, {
              name: "chevron-down",
              size: 17,
              color: c.faint,
            })),
            (e[71] = c.faint),
            (e[72] = Ye))
          : (Ye = e[72]),
        e[73] !== Ke || e[74] !== Ye
          ? ((qe = (0, k.jsxs)(h.default, {
              style: b.styles.between,
              children: [Ke, Ye],
            })),
            (e[73] = Ke),
            (e[74] = Ye),
            (e[75] = qe))
          : (qe = e[75]),
        e[76] !== Ge || e[77] !== qe
          ? ((Je = (0, k.jsx)(b.Card, { style: Ge, children: qe })),
            (e[76] = Ge),
            (e[77] = qe),
            (e[78] = Je))
          : (Je = e[78]),
        e[79] !== F || e[80] !== Je
          ? ((Qe = (0, k.jsx)(j.TourTarget, {
              id: "declare.website",
              children: (0, k.jsx)(o.default, {
                onPress: Ue,
                disabled: F,
                children: Je,
              }),
            })),
            (e[79] = F),
            (e[80] = Je),
            (e[81] = Qe))
          : (Qe = e[81]));
      const Xe = _
        ? "\u10de\u10e0\u10dd\u10d3\u10e3\u10e5\u10e2\u10d4\u10d1\u10d8"
        : "Products";
      let Ze, et, tt;
      (e[82] !== Xe
        ? ((Ze = (0, k.jsx)(b.SectionLabel, { children: Xe })),
          (e[82] = Xe),
          (e[83] = Ze))
        : (Ze = e[83]),
        e[84] !== F || e[85] !== R || e[86] !== G || e[87] !== c.red
          ? ((et = G.length
              ? (0, k.jsx)(b.Card, {
                  style: { paddingVertical: 0, marginBottom: y.space.md },
                  children: G.map((e, t) =>
                    (0, k.jsxs)(
                      h.default,
                      {
                        children: [
                          t > 0 ? (0, k.jsx)(b.Divider, {}) : null,
                          (0, k.jsxs)(h.default, {
                            style: [
                              b.styles.row,
                              { gap: y.space.md, paddingVertical: 13 },
                            ],
                            children: [
                              (0, k.jsxs)(h.default, {
                                style: { flex: 1, minWidth: 0 },
                                children: [
                                  (0, k.jsx)(b.Body, {
                                    weight: "600",
                                    size: y.font.s13,
                                    numberOfLines: 1,
                                    children: e.category,
                                  }),
                                  (0, k.jsxs)(b.Body, {
                                    muted: !0,
                                    size: y.font.s11,
                                    numberOfLines: 1,
                                    children: [
                                      "USD" === e.currency ? "$" : "CN\xa5",
                                      e.price,
                                      " \xb7 ",
                                      e.website,
                                    ],
                                  }),
                                ],
                              }),
                              F
                                ? null
                                : (0, k.jsx)(o.default, {
                                    onPress: () => R.mutate(e.id),
                                    hitSlop: 8,
                                    children: (0, k.jsx)(n.Ionicons, {
                                      name: "trash-outline",
                                      size: 18,
                                      color: c.red,
                                    }),
                                  }),
                            ],
                          }),
                        ],
                      },
                      e.id,
                    ),
                  ),
                })
              : null),
            (e[84] = F),
            (e[85] = R),
            (e[86] = G),
            (e[87] = c.red),
            (e[88] = et))
          : (et = e[88]),
        e[89] !== A ||
        e[90] !== he ||
        e[91] !== ae ||
        e[92] !== q ||
        e[93] !== F ||
        e[94] !== je ||
        e[95] !== _ ||
        e[96] !== Z ||
        e[97] !== U ||
        e[98] !== c.faint ||
        e[99] !== c.ink
          ? ((tt = F
              ? null
              : (0, k.jsx)(j.TourTarget, {
                  id: "declare.product",
                  children: (0, k.jsxs)(b.Card, {
                    children: [
                      (0, k.jsx)(b.Body, {
                        weight: "700",
                        size: y.font.s13,
                        children: _
                          ? "\u10d0\u10ee\u10d0\u10da\u10d8 \u10de\u10e0\u10dd\u10d3\u10e3\u10e5\u10e2\u10d8"
                          : "Add a product",
                      }),
                      (0, k.jsx)(b.Body, {
                        muted: !0,
                        size: y.font.s11,
                        style: { marginTop: 2 },
                        children: _
                          ? "\u10e4\u10d0\u10e1\u10d8 \u10e3\u10dc\u10d3\u10d0 \u10d4\u10db\u10d7\u10ee\u10d5\u10d4\u10dd\u10d3\u10d4\u10e1 \u10d8\u10dc\u10d5\u10dd\u10d8\u10e1\u10e8\u10d8 \u10db\u10d8\u10d7\u10d8\u10d7\u10d4\u10d1\u10e3\u10da\u10e1"
                          : "The price must match the invoice",
                      }),
                      (0, k.jsx)(o.default, {
                        onPress: () => X(!0),
                        children: (0, k.jsxs)(h.default, {
                          style: {
                            ...je,
                            marginTop: y.space.md,
                            flexDirection: "row",
                            alignItems: "center",
                          },
                          children: [
                            (0, k.jsx)(b.Body, {
                              size: y.font.s14,
                              numberOfLines: 1,
                              style: {
                                color: q ? c.ink : c.faint,
                                flex: 1,
                                minWidth: 0,
                              },
                              children:
                                q ||
                                (_
                                  ? "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10d9\u10d0\u10e2\u10d4\u10d2\u10dd\u10e0\u10d8\u10d0"
                                  : "Choose a category"),
                            }),
                            (0, k.jsx)(n.Ionicons, {
                              name: "chevron-down",
                              size: 17,
                              color: c.faint,
                            }),
                          ],
                        }),
                      }),
                      (0, k.jsx)(u.default, {
                        value: Z,
                        onChangeText: ee,
                        keyboardType: "decimal-pad",
                        placeholder: `${_ ? "\u10e6\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d4\u10d1\u10d0" : "Amount"} (${U})`,
                        placeholderTextColor: c.faint,
                        style: { ...je, marginTop: y.space.sm },
                      }),
                      (0, k.jsx)(b.Btn, {
                        label: _
                          ? "\u10de\u10e0\u10dd\u10d3\u10e3\u10e5\u10e2\u10d8\u10e1 \u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d0"
                          : "Add this product",
                        icon: "add",
                        variant: "outline",
                        disabled: !ae,
                        loading: A.isPending,
                        onPress: he,
                        style: { marginTop: y.space.md },
                      }),
                    ],
                  }),
                })),
            (e[89] = A),
            (e[90] = he),
            (e[91] = ae),
            (e[92] = q),
            (e[93] = F),
            (e[94] = je),
            (e[95] = _),
            (e[96] = Z),
            (e[97] = U),
            (e[98] = c.faint),
            (e[99] = c.ink),
            (e[100] = tt))
          : (tt = e[100]));
      const nt = _
        ? "\u10e1\u10d4\u10e0\u10d5\u10d8\u10e1\u10d4\u10d1\u10d8"
        : "Active services";
      let st, lt;
      (e[101] !== nt
        ? ((st = (0, k.jsx)(b.SectionLabel, { children: nt })),
          (e[101] = nt),
          (e[102] = st))
        : (st = e[102]),
        e[103] === Symbol.for("react.memo_cache_sentinel")
          ? ((lt = { paddingVertical: 0 }), (e[103] = lt))
          : (lt = e[103]));
      const it = _
          ? "\u10d3\u10d0\u10d6\u10e6\u10d5\u10d4\u10d5\u10d0"
          : "Parcel insurance",
        ot = _
          ? "\u10e7\u10dd\u10d5\u10d4\u10da\u10d7\u10d5\u10d8\u10e1 \u10e9\u10d0\u10e0\u10d7\u10e3\u10da\u10d8\u10d0"
          : "Always included";
      let rt, at;
      (e[104] !== it || e[105] !== ot
        ? ((rt = (0, k.jsx)(b.ToggleRow, {
            icon: "shield-checkmark-outline",
            title: it,
            subtitle: ot,
            value: !0,
            disabled: !0,
            onValueChange: C,
          })),
          (e[104] = it),
          (e[105] = ot),
          (e[106] = rt))
        : (rt = e[106]),
        e[107] === Symbol.for("react.memo_cache_sentinel")
          ? ((at = (0, k.jsx)(b.Divider, {})), (e[107] = at))
          : (at = e[107]));
      const ct = _
          ? "\u10d2\u10d0\u10d3\u10d0\u10e4\u10e3\u10d7\u10d5\u10d0"
          : "Free repacking",
        dt = _
          ? "\u10d0\u10db\u10ea\u10d8\u10e0\u10d4\u10d1\u10e1 \u10db\u10dd\u10ea\u10e3\u10da\u10dd\u10d1\u10d8\u10d7 \u10ec\u10dd\u10dc\u10d0\u10e1"
          : "Reduces volumetric weight",
        ut = !1 !== D.wrapping;
      let mt, ht, ft, xt, pt;
      (e[108] !== D.id || e[109] !== V
        ? ((mt = (e) => V.mutate({ orderId: D.id, wrapping: e })),
          (e[108] = D.id),
          (e[109] = V),
          (e[110] = mt))
        : (mt = e[110]),
        e[111] !== ct || e[112] !== dt || e[113] !== ut || e[114] !== mt
          ? ((ht = (0, k.jsx)(b.ToggleRow, {
              icon: "cube-outline",
              title: ct,
              subtitle: dt,
              value: ut,
              onValueChange: mt,
            })),
            (e[111] = ct),
            (e[112] = dt),
            (e[113] = ut),
            (e[114] = mt),
            (e[115] = ht))
          : (ht = e[115]),
        e[116] !== rt || e[117] !== ht
          ? ((ft = (0, k.jsxs)(b.Card, { style: lt, children: [rt, at, ht] })),
            (e[116] = rt),
            (e[117] = ht),
            (e[118] = ft))
          : (ft = e[118]),
        e[119] !== ie || e[120] !== c.red
          ? ((xt = ie
              ? (0, k.jsxs)(h.default, {
                  style: [b.styles.row, { gap: 6, marginTop: y.space.md }],
                  children: [
                    (0, k.jsx)(n.Ionicons, {
                      name: "alert-circle",
                      size: 15,
                      color: c.red,
                    }),
                    (0, k.jsx)(b.Body, {
                      size: y.font.s12,
                      style: { color: c.red, flex: 1, minWidth: 0 },
                      children: ie,
                    }),
                  ],
                })
              : null),
            (e[119] = ie),
            (e[120] = c.red),
            (e[121] = xt))
          : (xt = e[121]),
        e[122] !== ce ||
        e[123] !== W ||
        e[124] !== F ||
        e[125] !== xe ||
        e[126] !== _
          ? ((pt = F
              ? null
              : (0, k.jsx)(j.TourTarget, {
                  id: "declare.submit",
                  style: { marginTop: y.space.xl },
                  children: (0, k.jsx)(b.Btn, {
                    label: _
                      ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8\u10e1 \u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d8\u10e0\u10d4\u10d1\u10d0"
                      : "Declare parcel",
                    icon: "document-text-outline",
                    disabled: !ce,
                    loading: W.isPending,
                    onPress: xe,
                  }),
                })),
            (e[122] = ce),
            (e[123] = W),
            (e[124] = F),
            (e[125] = xe),
            (e[126] = _),
            (e[127] = pt))
          : (pt = e[127]));
      const jt = _
        ? "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10db\u10d0\u10e6\u10d0\u10d6\u10d8\u10d0"
        : "Choose a store";
      let yt, gt, bt;
      (e[128] === Symbol.for("react.memo_cache_sentinel")
        ? ((yt = (e) => {
            (M(e), Y(!1));
          }),
          (gt = () => Y(!1)),
          (e[128] = yt),
          (e[129] = gt))
        : ((yt = e[128]), (gt = e[129])),
        e[130] !== ue || e[131] !== jt || e[132] !== K
          ? ((bt = (0, k.jsx)(P, {
              visible: K,
              title: jt,
              options: ue,
              onPick: yt,
              onClose: gt,
            })),
            (e[130] = ue),
            (e[131] = jt),
            (e[132] = K),
            (e[133] = bt))
          : (bt = e[133]));
      const St = _
        ? "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4 \u10d9\u10d0\u10e2\u10d4\u10d2\u10dd\u10e0\u10d8\u10d0"
        : "Choose a category";
      let _t, kt, wt, Ct, Tt, vt;
      (e[134] === Symbol.for("react.memo_cache_sentinel")
        ? ((_t = (e) => {
            (J(e), X(!1));
          }),
          (kt = () => X(!1)),
          (e[134] = _t),
          (e[135] = kt))
        : ((_t = e[134]), (kt = e[135])),
        e[136] !== O || e[137] !== Q || e[138] !== St
          ? ((wt = (0, k.jsx)(P, {
              visible: Q,
              title: St,
              options: O,
              onPick: _t,
              onClose: kt,
            })),
            (e[136] = O),
            (e[137] = Q),
            (e[138] = St),
            (e[139] = wt))
          : (wt = e[139]),
        e[140] === Symbol.for("react.memo_cache_sentinel")
          ? ((Ct = () => ne(!1)),
            (Tt = {
              flex: 1,
              backgroundColor: "rgba(0,0,0,0.45)",
              justifyContent: "center",
              padding: y.space.xl,
            }),
            (e[140] = Ct),
            (e[141] = Tt))
          : ((Ct = e[140]), (Tt = e[141])),
        e[142] !== c.cream
          ? ((vt = {
              backgroundColor: c.cream,
              borderRadius: 22,
              padding: y.space.xl,
            }),
            (e[142] = c.cream),
            (e[143] = vt))
          : (vt = e[143]));
      const Bt = _
        ? "\u10e1\u10d0\u10ee\u10d4\u10da\u10d8\u10e1 \u10e8\u10d4\u10ea\u10d5\u10da\u10d0"
        : "Rename parcel";
      let Pt, zt, Dt, Lt;
      (e[144] !== Bt
        ? ((Pt = (0, k.jsx)(b.Body, {
            weight: "700",
            size: y.font.s16,
            children: Bt,
          })),
          (e[144] = Bt),
          (e[145] = Pt))
        : (Pt = e[145]),
        e[146] !== je
          ? ((zt = { ...je, marginTop: y.space.md }),
            (e[146] = je),
            (e[147] = zt))
          : (zt = e[147]),
        e[148] !== se || e[149] !== zt
          ? ((Dt = (0, k.jsx)(u.default, {
              value: se,
              onChangeText: le,
              style: zt,
            })),
            (e[148] = se),
            (e[149] = zt),
            (e[150] = Dt))
          : (Dt = e[150]),
        e[151] === Symbol.for("react.memo_cache_sentinel")
          ? ((Lt = {
              flexDirection: "row",
              gap: y.space.sm,
              marginTop: y.space.lg,
            }),
            (e[151] = Lt))
          : (Lt = e[151]));
      const It = _
        ? "\u10d2\u10d0\u10e3\u10e5\u10db\u10d4\u10d1\u10d0"
        : "Cancel";
      let Ot, At, Rt;
      (e[152] === Symbol.for("react.memo_cache_sentinel")
        ? ((Ot = () => ne(!1)),
          (At = { flexGrow: 1, flexBasis: 0 }),
          (e[152] = Ot),
          (e[153] = At))
        : ((Ot = e[152]), (At = e[153])),
        e[154] !== It
          ? ((Rt = (0, k.jsx)(b.Btn, {
              label: It,
              variant: "outline",
              onPress: Ot,
              style: At,
            })),
            (e[154] = It),
            (e[155] = Rt))
          : (Rt = e[155]));
      const Wt = _ ? "\u10e8\u10d4\u10dc\u10d0\u10ee\u10d5\u10d0" : "Save";
      let Vt, Et, Nt, Ut, $t, Gt, Ft;
      return (
        e[156] !== se || e[157] !== D.id || e[158] !== E
          ? ((Vt = () => {
              (E.mutate({ orderId: D.id, name: se }), ne(!1));
            }),
            (e[156] = se),
            (e[157] = D.id),
            (e[158] = E),
            (e[159] = Vt))
          : (Vt = e[159]),
        e[160] === Symbol.for("react.memo_cache_sentinel")
          ? ((Et = { flexGrow: 1, flexBasis: 0 }), (e[160] = Et))
          : (Et = e[160]),
        e[161] !== Wt || e[162] !== Vt
          ? ((Nt = (0, k.jsx)(b.Btn, { label: Wt, onPress: Vt, style: Et })),
            (e[161] = Wt),
            (e[162] = Vt),
            (e[163] = Nt))
          : (Nt = e[163]),
        e[164] !== Rt || e[165] !== Nt
          ? ((Ut = (0, k.jsxs)(h.default, { style: Lt, children: [Rt, Nt] })),
            (e[164] = Rt),
            (e[165] = Nt),
            (e[166] = Ut))
          : (Ut = e[166]),
        e[167] !== vt || e[168] !== Pt || e[169] !== Dt || e[170] !== Ut
          ? (($t = (0, k.jsx)(o.default, {
              onPress: Ct,
              style: Tt,
              children: (0, k.jsxs)(o.default, {
                style: vt,
                children: [Pt, Dt, Ut],
              }),
            })),
            (e[167] = vt),
            (e[168] = Pt),
            (e[169] = Dt),
            (e[170] = Ut),
            (e[171] = $t))
          : ($t = e[171]),
        e[172] !== te || e[173] !== $t
          ? ((Gt = (0, k.jsx)(i.default, {
              visible: te,
              transparent: !0,
              animationType: "fade",
              children: $t,
            })),
            (e[172] = te),
            (e[173] = $t),
            (e[174] = Gt))
          : (Gt = e[174]),
        e[175] !== Ve ||
        e[176] !== Ne ||
        e[177] !== Qe ||
        e[178] !== Ze ||
        e[179] !== et ||
        e[180] !== tt ||
        e[181] !== st ||
        e[182] !== ft ||
        e[183] !== xt ||
        e[184] !== pt ||
        e[185] !== bt ||
        e[186] !== wt ||
        e[187] !== Gt ||
        e[188] !== ke
          ? ((Ft = (0, k.jsxs)(b.Screen, {
              children: [
                ke,
                Ve,
                Ne,
                Qe,
                Ze,
                et,
                tt,
                st,
                ft,
                xt,
                pt,
                bt,
                wt,
                Gt,
              ],
            })),
            (e[175] = Ve),
            (e[176] = Ne),
            (e[177] = Qe),
            (e[178] = Ze),
            (e[179] = et),
            (e[180] = tt),
            (e[181] = st),
            (e[182] = ft),
            (e[183] = xt),
            (e[184] = pt),
            (e[185] = bt),
            (e[186] = wt),
            (e[187] = Gt),
            (e[188] = ke),
            (e[189] = Ft))
          : (Ft = e[189]),
        Ft
      );
    }
    function C() {}
    function T() {
      return s.router.back();
    }
    function v() {
      return s.router.back();
    }
    function B(e) {
      return e.id;
    }
    function P(e) {
      const s = (0, t.c)(24),
        { visible: l, title: i, options: u, onPick: f, onClose: x } = e,
        { theme: p } = (0, b.useTokens)();
      let j, S, w, C, T, v, B, P, z;
      if (
        (s[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((j = [b.styles.between, { marginBottom: y.space.md }]), (s[0] = j))
          : (j = s[0]),
        s[1] !== i
          ? ((S = (0, k.jsx)(b.Body, {
              weight: "700",
              size: y.font.s16,
              children: i,
            })),
            (s[1] = i),
            (s[2] = S))
          : (S = s[2]),
        s[3] !== p.ink
          ? ((w = (0, k.jsx)(n.Ionicons, {
              name: "close",
              size: 22,
              color: p.ink,
            })),
            (s[3] = p.ink),
            (s[4] = w))
          : (w = s[4]),
        s[5] !== x || s[6] !== w
          ? ((C = (0, k.jsx)(o.default, {
              onPress: x,
              hitSlop: 10,
              children: w,
            })),
            (s[5] = x),
            (s[6] = w),
            (s[7] = C))
          : (C = s[7]),
        s[8] !== S || s[9] !== C
          ? ((T = (0, k.jsxs)(h.default, { style: j, children: [S, C] })),
            (s[8] = S),
            (s[9] = C),
            (s[10] = T))
          : (T = s[10]),
        s[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((v = { maxHeight: 380 }), (s[11] = v))
          : (v = s[11]),
        s[12] !== f || s[13] !== u)
      ) {
        let e;
        (s[15] !== f
          ? ((e = (e, t) =>
              (0, k.jsxs)(
                h.default,
                {
                  children: [
                    t > 0 ? (0, k.jsx)(b.Divider, {}) : null,
                    (0, k.jsx)(o.default, {
                      onPress: () => f(e),
                      style: { paddingVertical: 15 },
                      children: (0, k.jsx)(b.Body, {
                        size: y.font.s14,
                        children: e,
                      }),
                    }),
                  ],
                },
                e,
              )),
            (s[15] = f),
            (s[16] = e))
          : (e = s[16]),
          (B = u.map(e)),
          (s[12] = f),
          (s[13] = u),
          (s[14] = B));
      } else B = s[14];
      return (
        s[17] !== B
          ? ((P = (0, k.jsx)(c.default, { style: v, children: B })),
            (s[17] = B),
            (s[18] = P))
          : (P = s[18]),
        s[19] !== x || s[20] !== T || s[21] !== P || s[22] !== l
          ? ((z = (0, k.jsxs)(_.BottomSheet, {
              visible: l,
              onClose: x,
              children: [T, P],
            })),
            (s[19] = x),
            (s[20] = T),
            (s[21] = P),
            (s[22] = l),
            (s[23] = z))
          : (z = s[23]),
        z
      );
    }
  },
  1162,
  [
    11, 15, 276, 13, 408, 415, 316, 425, 192, 1163, 920, 877, 1068, 895, 890,
    899, 1029, 6,
  ],
);