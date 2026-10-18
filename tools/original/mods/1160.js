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
          return C;
        },
      }));
    var t = r(d[0]),
      n = r(d[1]),
      s = r(d[2]),
      i = r(d[3]),
      l = e(r(d[4])),
      o = e(r(d[5])),
      c = r(d[6]),
      u = r(d[7]),
      h = r(d[8]),
      p = r(d[9]),
      y = r(d[10]),
      f = r(d[11]),
      x = r(d[12]),
      j = r(d[13]);
    const b = "707017021";
    function w(e) {
      const t = Number(e ?? 0);
      return t <= 0 ? 1 : 1 === t ? 2 : 2 === t || 3 === t ? 3 : 4;
    }
    function C() {
      const e = (0, t.c)(76),
        { theme: C } = (0, y.useTokens)(),
        S = "ka" === (0, h.useLang)(),
        _ = (0, s.useLocalSearchParams)(),
        k = _.status || "RECEIVED_IN_TBILISI_WAREHOUSE",
        { data: P, isLoading: I } = (0, u.useOrderFromList)(k, _.id),
        { data: D } = (0, u.useNusxaBundle)(_.id),
        v = (0, u.useUpdateCustomStatus)(),
        L = (0, u.useSignatureLink)(),
        [R, W] = (0, i.useState)("gzavnili"),
        [O, E] = (0, i.useState)(null),
        [F, V] = (0, i.useState)(!1);
      if (I || !P) {
        const t = S
          ? "\u10d8\u10e2\u10d5\u10d8\u10e0\u10d7\u10d4\u10d1\u10d0\u2026"
          : "Loading\u2026";
        let n;
        return (
          e[0] !== t
            ? ((n = (0, j.jsx)(y.Screen, {
                children: (0, j.jsx)(y.Body, { muted: !0, children: t }),
              })),
              (e[0] = t),
              (e[1] = n))
            : (n = e[1]),
          n
        );
      }
      const $ = P.custom_status ?? "0";
      let A;
      e[2] !== $ ? ((A = w($)), (e[2] = $), (e[3] = A)) : (A = e[3]);
      const G = A,
        M = P.custom_fee?.custom_fee_amount ?? null,
        N = "8" === $;
      let H;
      e[4] !== P.id || e[5] !== v
        ? ((H = (e, t) =>
            v.mutate({
              orderId: P.id,
              custom_status: e,
              DeclarationPaymentAuto: t,
            })),
          (e[4] = P.id),
          (e[5] = v),
          (e[6] = H))
        : (H = e[6]);
      const U = H;
      let Y;
      e[7] !== U || e[8] !== P.id || e[9] !== L
        ? ((Y = () => {
            if (c.DEMO) return U("8");
            L.mutate(P.id, { onSuccess: (e) => e && E(e) });
          }),
          (e[7] = U),
          (e[8] = P.id),
          (e[9] = L),
          (e[10] = Y))
        : (Y = e[10]);
      const q = Y;
      let J, K;
      (e[11] === Symbol.for("react.memo_cache_sentinel")
        ? ((J = [y.styles.row, { gap: p.space.md }]), (e[11] = J))
        : (J = e[11]),
        e[12] !== C.ink
          ? ((K = (0, j.jsx)(l.default, {
              onPress: z,
              hitSlop: 12,
              children: (0, j.jsx)(n.Ionicons, {
                name: "chevron-back",
                size: 24,
                color: C.ink,
              }),
            })),
            (e[12] = C.ink),
            (e[13] = K))
          : (K = e[13]));
      const Q = S
        ? "\u10d2\u10d0\u10dc\u10d1\u10d0\u10df\u10d4\u10d1\u10d0"
        : "Customs";
      let X, Z, ee, te, ne, se, ie, le, re, oe, ae, de;
      return (
        e[14] !== Q
          ? ((X = (0, j.jsx)(y.Title, { children: Q })),
            (e[14] = Q),
            (e[15] = X))
          : (X = e[15]),
        e[16] !== N || e[17] !== S
          ? ((Z = N
              ? (0, j.jsx)(y.Pill, {
                  text: S
                    ? "\u10d3\u10d0\u10e1\u10e0\u10e3\u10da\u10d3\u10d0"
                    : "Done",
                  tone: "ok",
                })
              : null),
            (e[16] = N),
            (e[17] = S),
            (e[18] = Z))
          : (Z = e[18]),
        e[19] !== K || e[20] !== X || e[21] !== Z
          ? ((ee = (0, j.jsxs)(o.default, { style: J, children: [K, X, Z] })),
            (e[19] = K),
            (e[20] = X),
            (e[21] = Z),
            (e[22] = ee))
          : (ee = e[22]),
        e[23] !== G
          ? ((te = (0, j.jsx)(T, { step: G })), (e[23] = G), (e[24] = te))
          : (te = e[24]),
        e[25] !== U ||
        e[26] !== S ||
        e[27] !== $ ||
        e[28] !== C.greenDeep ||
        e[29] !== C.tint ||
        e[30] !== v.isPending
          ? ((ne =
              "0" === $
                ? (0, j.jsxs)(j.Fragment, {
                    children: [
                      (0, j.jsxs)(y.Card, {
                        style: { marginTop: p.space.lg },
                        children: [
                          (0, j.jsx)(y.Body, {
                            weight: "700",
                            size: p.font.s16,
                            children: S
                              ? "\u10d2\u10d0\u10dc\u10d1\u10d0\u10df\u10d4\u10d1\u10d0 \u10d2\u10d0\u10db\u10d0\u10e0\u10e2\u10d8\u10d5\u10d4\u10d1\u10e3\u10da\u10d8\u10d0"
                              : "We simplified customs for you",
                          }),
                          (S
                            ? [
                                "\u10d0\u10d8\u10e0\u10e9\u10d8\u10d4, \u10d5\u10d8\u10dc \u10d2\u10d0\u10d3\u10d0\u10d8\u10ee\u10d3\u10d8\u10e1 \u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d0\u10ea\u10d8\u10d8\u10e1 \u10d1\u10d4\u10ed\u10d3\u10d5\u10d8\u10e1 \u10e1\u10d0\u10e4\u10d0\u10e1\u10e3\u10e0\u10e1",
                                "\u10de\u10e0\u10dd\u10ea\u10d4\u10e1\u10d8 \u10d2\u10d0\u10db\u10ed\u10d5\u10d8\u10e0\u10d5\u10d0\u10da\u10d4\u10d0 \u2014 \u10d3\u10d0\u10d2\u10d8\u10d9\u10d0\u10d5\u10e8\u10d8\u10e0\u10d3\u10d4\u10d1\u10d8\u10d7, \u10d7\u10e3 \u10d3\u10dd\u10d9\u10e3\u10db\u10d4\u10dc\u10e2\u10d8 \u10d3\u10d0\u10e1\u10ed\u10d8\u10e0\u10d3\u10d0",
                                "\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d0\u10ea\u10d8\u10d0\u10e1 \u10ee\u10d4\u10da\u10e1 \u10d0\u10ec\u10d4\u10e0 \u10d4\u10e0\u10d7\u10d8 \u10e8\u10d4\u10ee\u10d4\u10d1\u10d8\u10d7, \u10d4\u10da\u10d4\u10e5\u10e2\u10e0\u10dd\u10dc\u10e3\u10da\u10d0\u10d3",
                              ]
                            : [
                                "Choose who pays the declaration printing fee",
                                "The process is transparent \u2014 we reach out if a document is needed",
                                "Sign the declaration with one tap, electronically",
                              ]
                          ).map((e, t) =>
                            (0, j.jsxs)(
                              o.default,
                              {
                                style: [
                                  y.styles.row,
                                  { gap: p.space.md, marginTop: p.space.md },
                                ],
                                children: [
                                  (0, j.jsx)(o.default, {
                                    style: {
                                      width: 24,
                                      height: 24,
                                      borderRadius: 12,
                                      backgroundColor: C.tint,
                                      alignItems: "center",
                                      justifyContent: "center",
                                    },
                                    children: (0, j.jsx)(y.Body, {
                                      size: p.font.s11,
                                      weight: "800",
                                      style: { color: C.greenDeep },
                                      children: t + 1,
                                    }),
                                  }),
                                  (0, j.jsx)(y.Body, {
                                    size: p.font.s13,
                                    style: { flex: 1, minWidth: 0 },
                                    children: e,
                                  }),
                                ],
                              },
                              e,
                            ),
                          ),
                        ],
                      }),
                      (0, j.jsx)(y.Btn, {
                        label: S
                          ? "\u10d3\u10d0\u10ec\u10e7\u10d4\u10d1\u10d0"
                          : "Start now",
                        onPress: () => U("1"),
                        loading: v.isPending,
                        style: { marginTop: p.space.xl },
                      }),
                    ],
                  })
                : null),
            (e[25] = U),
            (e[26] = S),
            (e[27] = $),
            (e[28] = C.greenDeep),
            (e[29] = C.tint),
            (e[30] = v.isPending),
            (e[31] = ne))
          : (ne = e[31]),
        e[32] !== U ||
        e[33] !== F ||
        e[34] !== M ||
        e[35] !== S ||
        e[36] !== R ||
        e[37] !== $ ||
        e[38] !== C.mut ||
        e[39] !== C.ok ||
        e[40] !== C.paper ||
        e[41] !== C.tint2 ||
        e[42] !== v.isPending
          ? ((se =
              "1" === $
                ? (0, j.jsxs)(j.Fragment, {
                    children: [
                      (0, j.jsx)(y.SectionLabel, {
                        children: S
                          ? "\u10d5\u10d8\u10dc \u10d2\u10d0\u10d3\u10d0\u10d8\u10ee\u10d3\u10d8\u10e1 \u10e1\u10d0\u10e4\u10d0\u10e1\u10e3\u10e0\u10e1?"
                          : "Who pays the customs fee?",
                      }),
                      (0, j.jsx)(B, {
                        selected: "gzavnili" === R,
                        onPress: () => W("gzavnili"),
                        title: `${M ?? "\u2014"}\u20be ${S ? "\u10d8\u10ee\u10d3\u10d8\u10e1 Gzavnili" : "paid by Gzavnili"}`,
                        subtitle: S
                          ? "\u10d7\u10d0\u10dc\u10ee\u10d0 \u10e9\u10d0\u10d8\u10d7\u10d5\u10da\u10d4\u10d1\u10d0 \u10db\u10dd\u10db\u10e1\u10d0\u10ee\u10e3\u10e0\u10d4\u10d1\u10d8\u10e1 \u10e1\u10d0\u10d4\u10e0\u10d7\u10dd \u10e6\u10d8\u10e0\u10d4\u10d1\u10e3\u10da\u10d4\u10d1\u10d0\u10e8\u10d8"
                          : "The amount is added to your total service cost",
                      }),
                      (0, j.jsx)(B, {
                        selected: "self" === R,
                        onPress: () => W("self"),
                        title: `${M ?? "\u2014"}\u20be ${S ? "\u10d2\u10d0\u10d3\u10d0\u10d5\u10d8\u10ee\u10d3\u10d8 \u10d7\u10d0\u10d5\u10d0\u10d3" : "I will pay myself"}`,
                        subtitle: S
                          ? "\u10d2\u10d0\u10d3\u10d0\u10e0\u10d8\u10ea\u10ee\u10d4 \u10d3\u10d0 \u10d0\u10e2\u10d5\u10d8\u10e0\u10d7\u10d4 \u10e5\u10d5\u10d8\u10d7\u10d0\u10e0\u10d8"
                          : "Transfer it, then upload the receipt",
                      }),
                      "self" === R
                        ? (0, j.jsxs)(y.Card, {
                            style: { marginTop: p.space.md },
                            children: [
                              (0, j.jsx)(y.Body, {
                                muted: !0,
                                size: p.font.s12,
                                children: S
                                  ? "\u10d2\u10d0\u10d3\u10d0\u10db\u10ee\u10d3\u10d4\u10da\u10d8\u10e1 \u10d9\u10dd\u10d3\u10d8"
                                  : "Payee code",
                              }),
                              (0, j.jsxs)(o.default, {
                                style: [y.styles.between, { marginTop: 6 }],
                                children: [
                                  (0, j.jsx)(y.Body, {
                                    weight: "700",
                                    size: p.font.s18,
                                    children: b,
                                  }),
                                  (0, j.jsxs)(l.default, {
                                    onPress: () => V(!0),
                                    style: {
                                      flexDirection: "row",
                                      alignItems: "center",
                                      gap: 6,
                                      backgroundColor: F ? C.tint2 : C.paper,
                                      borderRadius: p.radius.pill,
                                      paddingHorizontal: 13,
                                      paddingVertical: 8,
                                    },
                                    children: [
                                      (0, j.jsx)(n.Ionicons, {
                                        name: F ? "checkmark" : "copy-outline",
                                        size: 14,
                                        color: F ? C.ok : C.mut,
                                      }),
                                      (0, j.jsx)(y.Body, {
                                        size: p.font.s12,
                                        weight: "600",
                                        style: { color: F ? C.ok : C.mut },
                                        children: F
                                          ? S
                                            ? "\u10d3\u10d0\u10d9\u10dd\u10de\u10d8\u10e0\u10d3\u10d0"
                                            : "Copied"
                                          : S
                                            ? "\u10d9\u10dd\u10de\u10d8\u10e0\u10d4\u10d1\u10d0"
                                            : "Copy",
                                      }),
                                    ],
                                  }),
                                ],
                              }),
                            ],
                          })
                        : null,
                      (0, j.jsx)(y.Btn, {
                        label:
                          "self" === R
                            ? S
                              ? "\u10d2\u10d0\u10d3\u10d0\u10d5\u10d8\u10ee\u10d0\u10d3\u10d4"
                              : "I paid the fee"
                            : S
                              ? "\u10d3\u10d0\u10d3\u10d0\u10e1\u10e2\u10e3\u10e0\u10d4\u10d1\u10d0"
                              : "Confirm",
                        onPress: () => U("2", "gzavnili" === R),
                        loading: v.isPending,
                        style: { marginTop: p.space.xl },
                      }),
                    ],
                  })
                : null),
            (e[32] = U),
            (e[33] = F),
            (e[34] = M),
            (e[35] = S),
            (e[36] = R),
            (e[37] = $),
            (e[38] = C.mut),
            (e[39] = C.ok),
            (e[40] = C.paper),
            (e[41] = C.tint2),
            (e[42] = v.isPending),
            (e[43] = se))
          : (se = e[43]),
        e[44] !== S || e[45] !== $ || e[46] !== C.greenDeep || e[47] !== C.tint
          ? ((ie =
              "2" === $ || "3" === $
                ? (0, j.jsxs)(y.Card, {
                    style: { marginTop: p.space.lg },
                    children: [
                      (0, j.jsxs)(o.default, {
                        style: [y.styles.row, { gap: p.space.md }],
                        children: [
                          (0, j.jsx)(o.default, {
                            style: {
                              width: 40,
                              height: 40,
                              borderRadius: 20,
                              backgroundColor: C.tint,
                              alignItems: "center",
                              justifyContent: "center",
                            },
                            children: (0, j.jsx)(n.Ionicons, {
                              name: "hourglass-outline",
                              size: 19,
                              color: C.greenDeep,
                            }),
                          }),
                          (0, j.jsx)(o.default, {
                            style: { flex: 1, minWidth: 0 },
                            children: (0, j.jsx)(y.Body, {
                              weight: "700",
                              children: S
                                ? "\u10d2\u10d0\u10dc\u10d1\u10d0\u10df\u10d4\u10d1\u10d0 \u10db\u10d8\u10db\u10d3\u10d8\u10dc\u10d0\u10e0\u10d4\u10dd\u10d1\u10e1"
                                : "Customs clearance in progress",
                            }),
                          }),
                        ],
                      }),
                      (0, j.jsx)(y.Body, {
                        muted: !0,
                        size: p.font.s12,
                        style: { marginTop: p.space.md },
                        children: S
                          ? "\u10e0\u10dd\u10d2\u10dd\u10e0\u10ea \u10d9\u10d8 \u10d3\u10d0\u10e1\u10e0\u10e3\u10da\u10d3\u10d4\u10d1\u10d0, \u10d2\u10d0\u10db\u10dd\u10d2\u10d8\u10d2\u10d6\u10d0\u10d5\u10dc\u10d8\u10d7 \u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d0\u10ea\u10d8\u10d0\u10e1 \u10ee\u10d4\u10da\u10db\u10dd\u10e1\u10d0\u10ec\u10d4\u10e0\u10d0\u10d3. \u10d7\u10e3 \u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d8\u10d7\u10d8 \u10d3\u10dd\u10d9\u10e3\u10db\u10d4\u10dc\u10e2\u10d8 \u10d3\u10d0\u10d2\u10d5\u10ed\u10d8\u10e0\u10d3\u10d0 \u2014 \u10d3\u10d0\u10d2\u10d8\u10d9\u10d0\u10d5\u10e8\u10d8\u10e0\u10d3\u10d4\u10d1\u10d8\u10d7."
                          : "Once it completes we'll send you the declaration to sign. If anything else is needed we'll get in touch.",
                      }),
                    ],
                  })
                : null),
            (e[44] = S),
            (e[45] = $),
            (e[46] = C.greenDeep),
            (e[47] = C.tint),
            (e[48] = ie))
          : (ie = e[48]),
        e[49] !== S || e[50] !== $
          ? ((le =
              "4" === $
                ? (0, j.jsxs)(y.Card, {
                    style: { marginTop: p.space.lg },
                    children: [
                      (0, j.jsx)(y.Body, {
                        weight: "700",
                        children: S
                          ? "\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d0\u10ea\u10d8\u10d0 \u10db\u10d6\u10d0\u10d3\u10d3\u10d4\u10d1\u10d0"
                          : "Declaration is being prepared",
                      }),
                      (0, j.jsx)(y.Body, {
                        muted: !0,
                        size: p.font.s12,
                        style: { marginTop: 6 },
                        children: S
                          ? "\u10e8\u10d4\u10e2\u10e7\u10dd\u10d1\u10d8\u10dc\u10d4\u10d1\u10d0\u10e1 \u10db\u10d8\u10d8\u10e6\u10d4\u10d1, \u10e0\u10dd\u10ea\u10d0 \u10ee\u10d4\u10da\u10db\u10dd\u10ec\u10d4\u10e0\u10d0 \u10d3\u10d0\u10e1\u10ed\u10d8\u10e0\u10d3\u10d4\u10d1\u10d0"
                          : "You'll get a notification when it is ready to sign",
                      }),
                    ],
                  })
                : null),
            (e[49] = S),
            (e[50] = $),
            (e[51] = le))
          : (le = e[51]),
        e[52] !== U ||
        e[53] !== S ||
        e[54] !== q ||
        e[55] !== $ ||
        e[56] !== O ||
        e[57] !== L
          ? ((re =
              "5" === $
                ? O
                  ? (0, j.jsx)(y.Card, {
                      style: {
                        marginTop: p.space.lg,
                        height: 460,
                        padding: 0,
                        overflow: "hidden",
                      },
                      children: (0, j.jsx)(x.SignatureFrame, {
                        url: O,
                        onSigned: () => {
                          (U("8"), E(null));
                        },
                        onRejected: () => E(null),
                      }),
                    })
                  : (0, j.jsxs)(j.Fragment, {
                      children: [
                        (0, j.jsxs)(y.Card, {
                          style: { marginTop: p.space.lg },
                          children: [
                            (0, j.jsx)(y.Body, {
                              weight: "700",
                              children: S
                                ? "\u10d3\u10d4\u10d9\u10da\u10d0\u10e0\u10d0\u10ea\u10d8\u10d0 \u10db\u10d6\u10d0\u10d3\u10d0\u10d0 \u10ee\u10d4\u10da\u10db\u10dd\u10e1\u10d0\u10ec\u10d4\u10e0\u10d0\u10d3"
                                : "Document is ready to sign",
                            }),
                            (0, j.jsx)(y.Body, {
                              muted: !0,
                              size: p.font.s12,
                              style: { marginTop: 6 },
                              children: S
                                ? "\u10ee\u10d4\u10da\u10d8 \u10db\u10dd\u10d0\u10ec\u10d4\u10e0\u10d4, \u10e0\u10dd\u10db \u10d2\u10d0\u10dc\u10d1\u10d0\u10df\u10d4\u10d1\u10d0 \u10d3\u10d0\u10e1\u10e0\u10e3\u10da\u10d3\u10d4\u10e1"
                                : "Sign it to complete the customs clearance",
                            }),
                          ],
                        }),
                        (0, j.jsx)(y.Btn, {
                          label: S
                            ? "\u10ee\u10d4\u10da\u10db\u10dd\u10ec\u10d4\u10e0\u10d0"
                            : "Sign now",
                          icon: "create-outline",
                          onPress: q,
                          loading: L.isPending,
                          style: { marginTop: p.space.xl },
                        }),
                      ],
                    })
                : null),
            (e[52] = U),
            (e[53] = S),
            (e[54] = q),
            (e[55] = $),
            (e[56] = O),
            (e[57] = L),
            (e[58] = re))
          : (re = e[58]),
        e[59] !== N || e[60] !== S
          ? ((oe = N
              ? (0, j.jsxs)(y.Card, {
                  style: {
                    marginTop: p.space.lg,
                    alignItems: "center",
                    paddingVertical: 30,
                  },
                  children: [
                    (0, j.jsx)(f.DrawnBird, { size: 84, float: !0 }),
                    (0, j.jsx)(y.Body, {
                      weight: "700",
                      size: p.font.s16,
                      style: { marginTop: p.space.lg },
                      children: S
                        ? "\u10d2\u10d0\u10dc\u10d1\u10d0\u10df\u10d4\u10d1\u10d0 \u10d3\u10d0\u10e1\u10e0\u10e3\u10da\u10d3\u10d0"
                        : "Customs cleared",
                    }),
                    (0, j.jsx)(y.Body, {
                      muted: !0,
                      size: p.font.s12,
                      style: { marginTop: 4, textAlign: "center" },
                      children: S
                        ? "\u10d0\u10ee\u10da\u10d0 \u10e8\u10d4\u10d2\u10d8\u10eb\u10da\u10d8\u10d0 \u10d2\u10d0\u10d3\u10d0\u10d8\u10ee\u10d0\u10d3\u10dd \u10db\u10d8\u10ec\u10dd\u10d3\u10d4\u10d1\u10d0"
                        : "You can pay for delivery now",
                    }),
                  ],
                })
              : null),
            (e[59] = N),
            (e[60] = S),
            (e[61] = oe))
          : (oe = e[61]),
        e[62] !== D || e[63] !== S || e[64] !== C.faint
          ? ((ae = D?.length
              ? (0, j.jsxs)(j.Fragment, {
                  children: [
                    (0, j.jsxs)(y.SectionLabel, {
                      children: [
                        D.length,
                        " ",
                        S
                          ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10d2\u10d0\u10dc\u10d1\u10d0\u10df\u10d4\u10d1\u10d0\u10e8\u10d8\u10d0"
                          : "parcel(s) in this customs batch",
                      ],
                    }),
                    (0, j.jsx)(y.Card, {
                      style: { paddingVertical: 0 },
                      children: D.map((e, t) =>
                        (0, j.jsxs)(
                          o.default,
                          {
                            children: [
                              t > 0 ? (0, j.jsx)(y.Divider, {}) : null,
                              (0, j.jsxs)(o.default, {
                                style: [
                                  y.styles.row,
                                  { gap: p.space.md, paddingVertical: 13 },
                                ],
                                children: [
                                  (0, j.jsx)(n.Ionicons, {
                                    name: "cube-outline",
                                    size: 17,
                                    color: C.faint,
                                  }),
                                  (0, j.jsxs)(o.default, {
                                    style: { flex: 1, minWidth: 0 },
                                    children: [
                                      (0, j.jsx)(y.Body, {
                                        size: p.font.s13,
                                        weight: "600",
                                        numberOfLines: 1,
                                        children: e.name ?? "\u2014",
                                      }),
                                      (0, j.jsx)(y.Body, {
                                        muted: !0,
                                        size: p.font.s11,
                                        numberOfLines: 1,
                                        children: e.tracking_number,
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
                    }),
                  ],
                })
              : null),
            (e[62] = D),
            (e[63] = S),
            (e[64] = C.faint),
            (e[65] = ae))
          : (ae = e[65]),
        e[66] !== ne ||
        e[67] !== se ||
        e[68] !== ie ||
        e[69] !== le ||
        e[70] !== re ||
        e[71] !== oe ||
        e[72] !== ae ||
        e[73] !== ee ||
        e[74] !== te
          ? ((de = (0, j.jsxs)(y.Screen, {
              children: [ee, te, ne, se, ie, le, re, oe, ae],
            })),
            (e[66] = ne),
            (e[67] = se),
            (e[68] = ie),
            (e[69] = le),
            (e[70] = re),
            (e[71] = oe),
            (e[72] = ae),
            (e[73] = ee),
            (e[74] = te),
            (e[75] = de))
          : (de = e[75]),
        de
      );
    }
    function z() {
      return s.router.back();
    }
    function B(e) {
      const n = (0, t.c)(28),
        { selected: s, onPress: i, title: l, subtitle: c } = e,
        { theme: u } = (0, y.useTokens)(),
        h = s ? u.green : u.line,
        f = s ? 2 : 1;
      let x, b;
      (n[0] !== h || n[1] !== f
        ? ((x = { marginBottom: p.space.sm, borderColor: h, borderWidth: f }),
          (n[0] = h),
          (n[1] = f),
          (n[2] = x))
        : (x = n[2]),
        n[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((b = [y.styles.row, { gap: p.space.md }]), (n[3] = b))
          : (b = n[3]));
      const w = s ? u.green : u.line;
      let C, z, B, T, S, _, k, P, I, D;
      return (
        n[4] !== w
          ? ((C = {
              width: 20,
              height: 20,
              borderRadius: 10,
              borderWidth: 2,
              borderColor: w,
              alignItems: "center",
              justifyContent: "center",
            }),
            (n[4] = w),
            (n[5] = C))
          : (C = n[5]),
        n[6] !== s || n[7] !== u.green
          ? ((z = s
              ? (0, j.jsx)(o.default, {
                  style: {
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: u.green,
                  },
                })
              : null),
            (n[6] = s),
            (n[7] = u.green),
            (n[8] = z))
          : (z = n[8]),
        n[9] !== C || n[10] !== z
          ? ((B = (0, j.jsx)(o.default, { style: C, children: z })),
            (n[9] = C),
            (n[10] = z),
            (n[11] = B))
          : (B = n[11]),
        n[12] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = { flex: 1, minWidth: 0 }), (n[12] = T))
          : (T = n[12]),
        n[13] !== l
          ? ((S = (0, j.jsx)(y.Body, {
              weight: "700",
              size: p.font.s13,
              children: l,
            })),
            (n[13] = l),
            (n[14] = S))
          : (S = n[14]),
        n[15] === Symbol.for("react.memo_cache_sentinel")
          ? ((_ = { marginTop: 2 }), (n[15] = _))
          : (_ = n[15]),
        n[16] !== c
          ? ((k = (0, j.jsx)(y.Body, {
              muted: !0,
              size: p.font.s11,
              style: _,
              children: c,
            })),
            (n[16] = c),
            (n[17] = k))
          : (k = n[17]),
        n[18] !== S || n[19] !== k
          ? ((P = (0, j.jsxs)(o.default, { style: T, children: [S, k] })),
            (n[18] = S),
            (n[19] = k),
            (n[20] = P))
          : (P = n[20]),
        n[21] !== P || n[22] !== B
          ? ((I = (0, j.jsxs)(o.default, { style: b, children: [B, P] })),
            (n[21] = P),
            (n[22] = B),
            (n[23] = I))
          : (I = n[23]),
        n[24] !== i || n[25] !== I || n[26] !== x
          ? ((D = (0, j.jsx)(y.Card, { style: x, onPress: i, children: I })),
            (n[24] = i),
            (n[25] = I),
            (n[26] = x),
            (n[27] = D))
          : (D = n[27]),
        D
      );
    }
    function T(e) {
      const n = (0, t.c)(5),
        { step: s } = e,
        { theme: i } = (0, y.useTokens)();
      let l, c, u;
      return (
        n[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((l = { flexDirection: "row", gap: 6, marginTop: p.space.lg }),
            (c = [1, 2, 3, 4]),
            (n[0] = l),
            (n[1] = c))
          : ((l = n[0]), (c = n[1])),
        n[2] !== s || n[3] !== i
          ? ((u = (0, j.jsx)(o.default, {
              style: l,
              children: c.map((e) =>
                (0, j.jsx)(
                  o.default,
                  {
                    style: {
                      flexGrow: 1,
                      flexBasis: 0,
                      height: 4,
                      borderRadius: 2,
                      backgroundColor: e <= s ? i.green : i.line,
                    },
                  },
                  e,
                ),
              ),
            })),
            (n[2] = s),
            (n[3] = i),
            (n[4] = u))
          : (u = n[4]),
        u
      );
    }
  },
  1160,
  [11, 15, 276, 13, 415, 192, 1024, 920, 877, 895, 890, 899, 1161, 6],
);