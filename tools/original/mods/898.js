__d(
  function (g, r, i, a, m, _e, d) {
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
      o = r(d[2]),
      l = r(d[3]),
      s = e(r(d[4])),
      c = e(r(d[5])),
      u = e(r(d[6])),
      f = e(r(d[7])),
      h = r(d[8]),
      p = r(d[9]),
      y = r(d[10]),
      x = r(d[11]),
      j = r(d[12]),
      b = r(d[13]);
    function w() {
      const { theme: e } = (0, y.useTokens)(),
        t = "ka" === (0, h.useLang)(),
        [w, S] = (0, l.useState)(!1),
        B = (0, l.useRef)(new s.default.Value(0)).current,
        z = (0, l.useRef)(0),
        k = B.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        }),
        _ = {
          code: t ? "\u10d0\u10e8\u10e8" : "USA",
          city: t
            ? "\u10e1\u10d0\u10d6\u10e6\u10d5\u10d0\u10e0\u10d2\u10d0\u10e0\u10d4\u10d7\u10d8"
            : "Abroad",
          flag: "\ud83c\udf0d",
        },
        v = {
          code: "TBS",
          city: t ? "\u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10d8" : "Tbilisi",
          flag: "\ud83c\uddec\ud83c\uddea",
        },
        C = w ? v : _,
        O = w ? _ : v;
      return (0, b.jsx)(b.Fragment, {
        children: (0, b.jsxs)(y.Screen, {
          children: [
            (0, b.jsx)(y.Title, {
              children: t
                ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8"
                : "Parcel",
            }),
            (0, b.jsx)(y.Body, {
              muted: !0,
              style: { marginTop: 4 },
              children: t
                ? "\u10e0\u10d0 \u10d2\u10d8\u10dc\u10d3\u10d0 \u10d2\u10d0\u10d0\u10d9\u10d4\u10d7\u10dd?"
                : "What would you like to do?",
            }),
            (0, b.jsxs)(y.Card, {
              style: {
                marginTop: p.space.lg,
                backgroundColor: e.navy,
                borderColor: e.navy,
                paddingVertical: p.space.xl,
              },
              children: [
                (0, b.jsxs)(f.default, {
                  style: y.styles.row,
                  children: [
                    (0, b.jsx)(T, {
                      label: t
                        ? "\u10e1\u10d0\u10d8\u10d3\u10d0\u10dc"
                        : "FROM",
                      point: C,
                    }),
                    (0, b.jsx)(u.default, {
                      onPress: () => {
                        ((z.current += 1),
                          s.default
                            .timing(B, {
                              toValue: z.current,
                              duration: 380,
                              easing: c.default.inOut(c.default.cubic),
                              useNativeDriver: !0,
                            })
                            .start(),
                          S((e) => !e));
                      },
                      hitSlop: 14,
                      style: { paddingHorizontal: p.space.sm },
                      children: (0, b.jsx)(s.default.View, {
                        style: {
                          width: 44,
                          height: 44,
                          borderRadius: 22,
                          borderWidth: 1,
                          borderColor: e.green,
                          backgroundColor: e.navySoft,
                          alignItems: "center",
                          justifyContent: "center",
                          transform: [{ rotate: k }],
                        },
                        children: (0, b.jsx)(n.Ionicons, {
                          name: "swap-horizontal",
                          size: 20,
                          color: e.green,
                        }),
                      }),
                    }),
                    (0, b.jsx)(T, {
                      label: t ? "\u10e1\u10d0\u10d3" : "TO",
                      point: O,
                      align: "right",
                    }),
                  ],
                }),
                (0, b.jsx)(f.default, {
                  style: {
                    height: 1,
                    backgroundColor: e.navySoft,
                    marginTop: p.space.xl,
                    marginBottom: p.space.md,
                  },
                }),
                (0, b.jsxs)(f.default, {
                  style: [y.styles.row, { gap: p.space.sm }],
                  children: [
                    (0, b.jsx)(n.Ionicons, {
                      name: w ? "paper-plane-outline" : "cube-outline",
                      size: 15,
                      color: e.green,
                    }),
                    (0, b.jsx)(y.Body, {
                      size: p.font.s12,
                      style: { color: e.faint, flex: 1, minWidth: 0 },
                      children: w
                        ? t
                          ? "\u10d2\u10d6\u10d0\u10d5\u10dc\u10d8\u10da\u10d8 \u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10d3\u10d0\u10dc"
                          : "Shipping out of Georgia"
                        : t
                          ? "\u10d0\u10db\u10d0\u10dc\u10d0\u10d7\u10d8 \u10e8\u10d4\u10dc\u10e1 \u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d6\u10d4"
                          : "A parcel coming to you",
                    }),
                    w ? (0, b.jsx)(j.NewBadge, {}) : null,
                  ],
                }),
              ],
            }),
            (0, b.jsx)(y.Btn, {
              label: w
                ? t
                  ? "\u10d2\u10d0\u10d2\u10d6\u10d0\u10d5\u10dc\u10d8\u10e1 \u10d3\u10d0\u10ec\u10e7\u10d4\u10d1\u10d0"
                  : "Start a shipment"
                : t
                  ? "\u10d7\u10e0\u10d4\u10e5\u10d8\u10dc\u10d2\u10d8\u10e1 \u10d3\u10d0\u10db\u10d0\u10e2\u10d4\u10d1\u10d0"
                  : "Add a tracking code",
              icon: w ? "paper-plane-outline" : "add",
              onPress: () =>
                o.router.push(w ? "/add-outgoing" : "/add-incoming"),
              style: { marginTop: p.space.lg },
            }),
            (0, b.jsx)(y.Body, {
              muted: !0,
              size: p.font.s11,
              style: { marginTop: p.space.md, textAlign: "center" },
              children: t
                ? "\u10db\u10d8\u10db\u10d0\u10e0\u10d7\u10e3\u10da\u10d4\u10d1\u10d8\u10e1 \u10e8\u10d4\u10e1\u10d0\u10ea\u10d5\u10da\u10d4\u10da\u10d0\u10d3 \u10e8\u10d4\u10d4\u10ee\u10d4 \u10d8\u10e1\u10d0\u10e0\u10e1"
                : "Tap the arrows to switch direction",
            }),
            (0, b.jsxs)(f.default, {
              style: [
                y.styles.row,
                {
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: p.space.md,
                  marginTop: p.space.xl,
                },
              ],
              children: [
                (0, b.jsx)(x.Note, {
                  align: "left",
                  size: 20,
                  tilt: -5,
                  style: { marginTop: p.space.lg, flexShrink: 1 },
                  children: w
                    ? t
                      ? "\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10d3\u10d0\u10dc \u2014\n\u10db\u10e1\u10dd\u10e4\u10da\u10d8\u10dd\u10e8\u10d8."
                      : "From Georgia\nto the world."
                    : t
                      ? "\u10dc\u10d4\u10d1\u10d8\u10e1\u10db\u10d8\u10d4\u10e0\u10d8 \u10d0\u10d3\u10d2\u10d8\u10da\u10d8\u10d3\u10d0\u10dc \u2014\n\u10e1\u10d0\u10e5\u10d0\u10e0\u10d7\u10d5\u10d4\u10da\u10dd\u10e8\u10d8."
                      : "From anywhere\nto Georgia.",
                }),
                (0, b.jsx)(x.Drawing, {
                  name: w ? "how" : "parcels",
                  width: w ? 110 : 130,
                  float: !0,
                }),
              ],
            }),
          ],
        }),
      });
    }
    function T(e) {
      const n = (0, t.c)(26),
        { label: o, point: l, align: s } = e,
        c = void 0 === s ? "left" : s,
        { theme: u } = (0, y.useTokens)(),
        h = "right" === c ? "flex-end" : "flex-start";
      let x, j, w, T, S, B, z, k, _, v, C;
      return (
        n[0] !== h
          ? ((x = {
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 0,
              minWidth: 0,
              alignItems: h,
            }),
            (n[0] = h),
            (n[1] = x))
          : (x = n[1]),
        n[2] !== u.faint
          ? ((j = { color: u.faint, letterSpacing: 0.6 }),
            (n[2] = u.faint),
            (n[3] = j))
          : (j = n[3]),
        n[4] !== o || n[5] !== j
          ? ((w = (0, b.jsx)(y.Body, {
              size: p.font.s11,
              weight: "700",
              style: j,
              children: o,
            })),
            (n[4] = o),
            (n[5] = j),
            (n[6] = w))
          : (w = n[6]),
        n[7] === Symbol.for("react.memo_cache_sentinel")
          ? ((T = [y.styles.row, { gap: 6, marginTop: 6 }]), (n[7] = T))
          : (T = n[7]),
        n[8] !== l.flag
          ? ((S = (0, b.jsx)(y.Body, { size: p.font.s16, children: l.flag })),
            (n[8] = l.flag),
            (n[9] = S))
          : (S = n[9]),
        n[10] === Symbol.for("react.memo_cache_sentinel")
          ? ((B = { color: "#fff" }), (n[10] = B))
          : (B = n[10]),
        n[11] !== l.code
          ? ((z = (0, b.jsx)(y.Body, {
              size: p.font.s22,
              weight: "700",
              numberOfLines: 1,
              style: B,
              children: l.code,
            })),
            (n[11] = l.code),
            (n[12] = z))
          : (z = n[12]),
        n[13] !== S || n[14] !== z
          ? ((k = (0, b.jsxs)(f.default, { style: T, children: [S, z] })),
            (n[13] = S),
            (n[14] = z),
            (n[15] = k))
          : (k = n[15]),
        n[16] !== u.faint
          ? ((_ = { color: u.faint, marginTop: 2 }),
            (n[16] = u.faint),
            (n[17] = _))
          : (_ = n[17]),
        n[18] !== l.city || n[19] !== _
          ? ((v = (0, b.jsx)(y.Body, {
              size: p.font.s12,
              numberOfLines: 1,
              style: _,
              children: l.city,
            })),
            (n[18] = l.city),
            (n[19] = _),
            (n[20] = v))
          : (v = n[20]),
        n[21] !== k || n[22] !== v || n[23] !== x || n[24] !== w
          ? ((C = (0, b.jsxs)(f.default, { style: x, children: [w, k, v] })),
            (n[21] = k),
            (n[22] = v),
            (n[23] = x),
            (n[24] = w),
            (n[25] = C))
          : (C = n[25]),
        C
      );
    }
  },
  898,
  [11, 15, 276, 13, 305, 382, 415, 192, 877, 895, 890, 899, 909, 6],
);