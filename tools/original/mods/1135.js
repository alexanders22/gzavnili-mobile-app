__d(
  function (g, r, _i, a, m, _e, _d) {
    "use strict";
    function e(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Object.defineProperty(_e, "__esModule", { value: !0 }),
      (_e.ContactsButton = function ({ onPick: e, country: s, compact: p }) {
        const { theme: h } = (0, j.useTokens)(),
          k = "ka" === (0, f.useLang)(),
          B = S((e) => e.syncedAt),
          D = S((e) => e.markSynced),
          [T, v] = (0, n.useState)(!1),
          [I, P] = (0, n.useState)("ask"),
          [A, R] = (0, n.useState)(""),
          [V, L] = (0, n.useState)(null),
          [O, _] = (0, n.useState)(0),
          M = (0, n.useRef)(new o.default.Value(0)).current,
          N = (0, n.useMemo)(
            () =>
              y.MOCK_CONTACTS.map((e) => ({
                ...e,
                parsed: (0, w.parsePhone)(e.phone),
              })),
            [],
          ),
          H = [...new Set(N.map((e) => e.parsed.country))],
          G = () => {
            (R(""),
              L(s && "GE" !== s && H.includes(s) ? s : null),
              P(B ? "list" : "ask"),
              v(!0));
          },
          F = () => {
            (P("syncing"), _(0), M.setValue(0));
            const e = M.addListener(({ value: e }) =>
              _(Math.round(e * N.length)),
            );
            o.default
              .timing(M, {
                toValue: 1,
                duration: 1800,
                easing: l.default.inOut(l.default.quad),
                useNativeDriver: !1,
              })
              .start(() => {
                (M.removeListener(e), D(), P("list"));
              });
          },
          $ = A.trim().toLowerCase(),
          E = $.replace(/\D/g, ""),
          W = N.filter(
            (e) =>
              (!V || e.parsed.country === V) &&
              (!$ ||
                e.name.toLowerCase().includes($) ||
                (E.length >= 2 && e.phone.replace(/\D/g, "").includes(E))),
          ),
          q = (t) => {
            const [s, ...n] = t.name.split(/\s+/);
            (e({
              first: s,
              last: n.join(" "),
              phone: t.parsed,
              address: t.address,
            }),
              v(!1));
          },
          J = B ? Math.floor((Date.now() - B) / 6e4) : 0,
          K = B
            ? J < 1
              ? k
                ? "\u10d0\u10ee\u10da\u10d0\u10ee\u10d0\u10dc"
                : "just now"
              : k
                ? `${J} \u10ec\u10d7. \u10ec\u10d8\u10dc`
                : `${J} min ago`
            : "";
        return (0, z.jsxs)(z.Fragment, {
          children: [
            p
              ? (0, z.jsx)(i.default, {
                  onPress: G,
                  hitSlop: 8,
                  accessibilityLabel: k
                    ? "\u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d4\u10d1\u10d8\u10d3\u10d0\u10dc"
                    : "From contacts",
                  style: ({ pressed: e }) => ({
                    width: 30,
                    height: 30,
                    borderRadius: 15,
                    backgroundColor: h.tint,
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: e ? 0.7 : 1,
                  }),
                  children: (0, z.jsx)(t.Ionicons, {
                    name: "people-outline",
                    size: 15,
                    color: h.greenDeep,
                  }),
                })
              : (0, z.jsxs)(i.default, {
                  onPress: G,
                  hitSlop: 6,
                  style: ({ pressed: e }) => ({
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    backgroundColor: h.tint,
                    borderRadius: x.radius.pill,
                    paddingHorizontal: 11,
                    paddingVertical: 6,
                    opacity: e ? 0.7 : 1,
                  }),
                  children: [
                    (0, z.jsx)(t.Ionicons, {
                      name: B ? "people-outline" : "sync-outline",
                      size: 14,
                      color: h.greenDeep,
                    }),
                    (0, z.jsx)(j.Body, {
                      size: x.font.s12,
                      weight: "700",
                      style: { color: h.greenDeep },
                      children: B
                        ? k
                          ? "\u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d4\u10d1\u10d8"
                          : "Contacts"
                        : k
                          ? "\u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d4\u10d1\u10d8\u10e1 \u10e1\u10d8\u10dc\u10e5\u10e0."
                          : "Sync contacts",
                    }),
                  ],
                }),
            (0, z.jsx)(b.BottomSheet, {
              visible: T,
              onClose: () => v(!1),
              children:
                "ask" === I
                  ? (0, z.jsxs)(u.default, {
                      style: { alignItems: "center" },
                      children: [
                        (0, z.jsx)(u.default, {
                          style: {
                            width: 64,
                            height: 64,
                            borderRadius: 32,
                            backgroundColor: h.tint2,
                            alignItems: "center",
                            justifyContent: "center",
                          },
                          children: (0, z.jsx)(t.Ionicons, {
                            name: "people",
                            size: 30,
                            color: h.greenDeep,
                          }),
                        }),
                        (0, z.jsx)(j.Body, {
                          weight: "700",
                          size: x.font.s16,
                          style: { marginTop: x.space.lg, textAlign: "center" },
                          children: k
                            ? "\u201eGzavnili\u201c \u10d8\u10d7\u10ee\u10dd\u10d5\u10e1 \u10ec\u10d5\u10d3\u10dd\u10db\u10d0\u10e1 \u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d4\u10d1\u10d6\u10d4"
                            : "\u201cGzavnili\u201d would like to access your contacts",
                        }),
                        (0, z.jsx)(j.Body, {
                          muted: !0,
                          size: x.font.s13,
                          style: { marginTop: 6, textAlign: "center" },
                          children: k
                            ? "\u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d4\u10d1\u10d8 \u10d2\u10d0\u10db\u10dd\u10e7\u10d4\u10dc\u10d4\u10d1\u10d0 \u10db\u10d8\u10db\u10e6\u10d4\u10d1\u10d4\u10d1\u10d8\u10e1 \u10e1\u10ec\u10e0\u10d0\u10e4\u10d0\u10d3 \u10e8\u10d4\u10e1\u10d0\u10d5\u10e1\u10d4\u10d1\u10da\u10d0\u10d3. \u10d0\u10e0\u10d0\u10e4\u10d4\u10e0\u10d8 \u10d0\u10e2\u10d5\u10d8\u10e0\u10d7\u10d4\u10d1\u10d0."
                            : "They are used on this device to fill in recipients faster. Nothing is uploaded.",
                        }),
                        (0, z.jsx)(j.Btn, {
                          label: k
                            ? "\u10d3\u10d0\u10e8\u10d5\u10d4\u10d1\u10d0"
                            : "Allow",
                          onPress: F,
                          style: {
                            alignSelf: "stretch",
                            marginTop: x.space.xl,
                          },
                        }),
                        (0, z.jsx)(j.Btn, {
                          label: k
                            ? "\u10d0\u10e0 \u10d3\u10d0\u10e8\u10d5\u10d4\u10d1\u10dd"
                            : "Don't allow",
                          variant: "outline",
                          onPress: () => v(!1),
                          style: {
                            alignSelf: "stretch",
                            marginTop: x.space.sm,
                          },
                        }),
                      ],
                    })
                  : "syncing" === I
                    ? (0, z.jsxs)(u.default, {
                        style: {
                          alignItems: "center",
                          paddingVertical: x.space.lg,
                        },
                        children: [
                          (0, z.jsx)(t.Ionicons, {
                            name: "sync",
                            size: 30,
                            color: h.greenDeep,
                          }),
                          (0, z.jsx)(j.Body, {
                            weight: "700",
                            size: x.font.s16,
                            style: { marginTop: x.space.md },
                            children: k
                              ? "\u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d4\u10d1\u10d8\u10e1 \u10e1\u10d8\u10dc\u10e5\u10e0\u10dd\u10dc\u10d8\u10d6\u10d0\u10ea\u10d8\u10d0\u2026"
                              : "Syncing contacts\u2026",
                          }),
                          (0, z.jsx)(u.default, {
                            style: {
                              alignSelf: "stretch",
                              height: 8,
                              borderRadius: 4,
                              backgroundColor: h.lineSoft,
                              marginTop: x.space.lg,
                              overflow: "hidden",
                            },
                            children: (0, z.jsx)(o.default.View, {
                              style: {
                                height: 8,
                                backgroundColor: h.green,
                                width: M.interpolate({
                                  inputRange: [0, 1],
                                  outputRange: ["0%", "100%"],
                                }),
                              },
                            }),
                          }),
                          (0, z.jsxs)(j.Body, {
                            muted: !0,
                            size: x.font.s12,
                            style: { marginTop: x.space.sm },
                            children: [O, " / ", N.length],
                          }),
                        ],
                      })
                    : (0, z.jsxs)(z.Fragment, {
                        children: [
                          (0, z.jsxs)(u.default, {
                            style: j.styles.between,
                            children: [
                              (0, z.jsx)(j.Body, {
                                weight: "700",
                                size: x.font.s16,
                                children: k
                                  ? "\u10d9\u10dd\u10dc\u10e2\u10d0\u10e5\u10e2\u10d4\u10d1\u10d8"
                                  : "Contacts",
                              }),
                              (0, z.jsxs)(i.default, {
                                onPress: F,
                                hitSlop: 8,
                                style: [j.styles.row, { gap: 4 }],
                                children: [
                                  (0, z.jsx)(t.Ionicons, {
                                    name: "sync-outline",
                                    size: 13,
                                    color: h.mut,
                                  }),
                                  (0, z.jsxs)(j.Body, {
                                    muted: !0,
                                    size: x.font.s11,
                                    children: [N.length, " \xb7 ", K],
                                  }),
                                ],
                              }),
                            ],
                          }),
                          (0, z.jsx)(c.default, {
                            value: A,
                            onChangeText: R,
                            placeholder: k
                              ? "\u10e1\u10d0\u10ee\u10d4\u10da\u10d8 \u10d0\u10dc \u10dc\u10dd\u10db\u10d4\u10e0\u10d8"
                              : "Name or number",
                            placeholderTextColor: h.faint,
                            style: {
                              backgroundColor: h.paper,
                              borderRadius: x.radius.md,
                              paddingHorizontal: x.space.md,
                              paddingVertical: 12,
                              color: h.ink,
                              fontSize: x.font.s14,
                              marginTop: x.space.md,
                            },
                          }),
                          (0, z.jsx)(d.default, {
                            horizontal: !0,
                            showsHorizontalScrollIndicator: !1,
                            style: { marginTop: x.space.sm, flexGrow: 0 },
                            contentContainerStyle: { gap: 6 },
                            children: [null, ...H].map((e) => {
                              const t = V === e;
                              return (0, z.jsx)(
                                i.default,
                                {
                                  onPress: () => L(e),
                                  style: {
                                    paddingHorizontal: 11,
                                    paddingVertical: 6,
                                    borderRadius: x.radius.pill,
                                    borderWidth: 1,
                                    borderColor: t ? h.greenDeep : h.line,
                                    backgroundColor: t ? h.tint2 : h.card,
                                  },
                                  children: (0, z.jsx)(j.Body, {
                                    size: x.font.s12,
                                    weight: t ? "700" : "500",
                                    children: e
                                      ? C(e)
                                      : k
                                        ? "\u10e7\u10d5\u10d4\u10da\u10d0"
                                        : "All",
                                  }),
                                },
                                e ?? "all",
                              );
                            }),
                          }),
                          (0, z.jsx)(d.default, {
                            style: { maxHeight: 360, marginTop: x.space.sm },
                            keyboardShouldPersistTaps: "handled",
                            children: W.length
                              ? W.map((e, t) =>
                                  (0, z.jsxs)(
                                    u.default,
                                    {
                                      children: [
                                        t > 0
                                          ? (0, z.jsx)(j.Divider, {})
                                          : null,
                                        (0, z.jsxs)(i.default, {
                                          onPress: () => q(e),
                                          style: ({ pressed: e }) => [
                                            j.styles.row,
                                            {
                                              gap: x.space.md,
                                              paddingVertical: 11,
                                              opacity: e ? 0.6 : 1,
                                            },
                                          ],
                                          children: [
                                            (0, z.jsx)(u.default, {
                                              style: {
                                                width: 36,
                                                height: 36,
                                                borderRadius: 18,
                                                backgroundColor: h.tint2,
                                                alignItems: "center",
                                                justifyContent: "center",
                                              },
                                              children: (0, z.jsx)(j.Body, {
                                                weight: "700",
                                                size: x.font.s13,
                                                style: { color: h.greenDeep },
                                                children: e.name[0],
                                              }),
                                            }),
                                            (0, z.jsxs)(u.default, {
                                              style: { flex: 1, minWidth: 0 },
                                              children: [
                                                (0, z.jsx)(j.Body, {
                                                  weight: "600",
                                                  size: x.font.s13,
                                                  numberOfLines: 1,
                                                  children: e.name,
                                                }),
                                                (0, z.jsxs)(j.Body, {
                                                  muted: !0,
                                                  size: x.font.s11,
                                                  numberOfLines: 1,
                                                  children: [
                                                    (0, w.formatPhone)(
                                                      e.parsed,
                                                    ),
                                                    e.address
                                                      ? ` \xb7 ${e.address}`
                                                      : "",
                                                  ],
                                                }),
                                              ],
                                            }),
                                            (0, z.jsx)(j.Body, {
                                              size: x.font.s16,
                                              children: C(e.parsed.country),
                                            }),
                                          ],
                                        }),
                                      ],
                                    },
                                    e.id,
                                  ),
                                )
                              : (0, z.jsx)(j.Body, {
                                  muted: !0,
                                  size: x.font.s13,
                                  style: {
                                    paddingVertical: x.space.lg,
                                    textAlign: "center",
                                  },
                                  children: k
                                    ? "\u10d0\u10e0\u10d0\u10e4\u10d4\u10e0\u10d8 \u10db\u10dd\u10d8\u10eb\u10d4\u10d1\u10dc\u10d0"
                                    : "No contacts found",
                                }),
                          }),
                        ],
                      }),
            }),
          ],
        });
      }));
    var t = r(_d[0]),
      s = e(r(_d[1])),
      n = r(_d[2]),
      o = e(r(_d[3])),
      l = e(r(_d[4])),
      i = e(r(_d[5])),
      d = e(r(_d[6])),
      c = e(r(_d[7])),
      u = e(r(_d[8])),
      p = r(_d[9]),
      h = r(_d[10]),
      y = r(_d[11]),
      f = r(_d[12]),
      x = r(_d[13]),
      j = r(_d[14]),
      w = r(_d[15]),
      b = r(_d[16]),
      z = r(_d[17]);
    const S = (0, p.create)()(
        (0, h.persist)(
          (e) => ({
            syncedAt: null,
            markSynced: () => e({ syncedAt: Date.now() }),
          }),
          {
            name: "gz.contacts",
            storage: (0, h.createJSONStorage)(() => s.default),
          },
        ),
      ),
      C = (e) => w.DIAL_CODES.find((t) => t.code === e)?.flag ?? "\ud83c\udf0d";
  },
  1135,
  [
    15, 879, 13, 305, 382, 415, 316, 425, 192, 885, 888, 1136, 877, 895, 890,
    1137, 1029, 6,
  ],
);