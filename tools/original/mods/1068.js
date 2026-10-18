__d(
  function (g, _r, i, a, m, _e, d) {
    "use strict";
    function e(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Object.defineProperty(_e, "__esModule", { value: !0 }),
      Object.defineProperty(_e, "useTour", {
        enumerable: !0,
        get: function () {
          return j;
        },
      }),
      (_e.TourTarget = function ({ id: e, onPress: t, style: n, children: r }) {
        const o = (0, s.useRef)(null),
          l = (0, s.useRef)(t);
        return (
          (l.current = t),
          (0, s.useEffect)(() => {
            if (!e) return;
            const t = { node: () => o.current, press: () => l.current?.() };
            return (
              k.set(e, [...(k.get(e) ?? []), t]),
              () => {
                const n = (k.get(e) ?? []).filter((e) => e !== t);
                n.length ? k.set(e, n) : k.delete(e);
              }
            );
          }, [e]),
          (0, b.jsx)(f.default, {
            ref: o,
            collapsable: !1,
            style: n,
            children: r,
          })
        );
      }),
      (_e.TourOverlay = function () {
        const { theme: e } = (0, w.useTokens)(),
          h = "ka" === (0, p.useLang)(),
          { tour: x, index: k, next: v, stop: T } = j(),
          { width: D, height: z } = (0, c.default)(),
          [M, I] = (0, s.useState)(null),
          [O, P] = (0, s.useState)("seeking"),
          E = (0, s.useRef)(new r.default.ValueXY({ x: 0, y: 0 })).current,
          N = (0, s.useRef)(new r.default.Value(0)).current,
          S = (0, s.useRef)(new r.default.Value(0)).current,
          B = (0, s.useRef)(new r.default.Value(0)).current,
          _ = (0, s.useRef)(new r.default.Value(0)).current,
          W = !1,
          F = x?.steps[k],
          L = !!x && k === x.steps.length - 1;
        if (
          ((0, s.useEffect)(() => {
            const e = r.default.loop(
              r.default.sequence([
                r.default.timing(B, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: W,
                }),
                r.default.timing(B, {
                  toValue: 0,
                  duration: 800,
                  useNativeDriver: W,
                }),
              ]),
            );
            return (e.start(), () => e.stop());
          }, []),
          (0, s.useEffect)(() => {
            if (!x || !F) return;
            let e = !1;
            const t = () => e;
            return (
              (async () => {
                if (
                  (I(null),
                  P("seeking"),
                  N.setValue(0),
                  _.setValue(0),
                  F.route && (n.router.push(F.route), await R(450)),
                  e)
                )
                  return;
                const s = F.target ? await V(F.target, t) : null;
                if (!e) {
                  if (F.target && !s)
                    return F.optional ? v() : void P("missing");
                  if ((I(s?.rect ?? null), P("showing"), F.press && s)) {
                    if ((await R(1200), e)) return;
                    P("tapping");
                    const t = s.rect.x + s.rect.width / 2,
                      n = s.rect.y + s.rect.height / 2;
                    if (
                      (E.setValue({ x: D / 2, y: z - 110 }),
                      r.default
                        .timing(N, {
                          toValue: 1,
                          duration: 160,
                          useNativeDriver: W,
                        })
                        .start(),
                      await new Promise((e) =>
                        r.default
                          .timing(E, {
                            toValue: { x: t, y: n },
                            duration: 700,
                            easing: o.default.inOut(o.default.cubic),
                            useNativeDriver: W,
                          })
                          .start(() => e(null)),
                      ),
                      e)
                    )
                      return;
                    if (
                      (S.setValue(0),
                      r.default
                        .timing(S, {
                          toValue: 1,
                          duration: 450,
                          useNativeDriver: W,
                        })
                        .start(),
                      await R(200),
                      e)
                    )
                      return;
                    (s.handle.press(), await R(750), e || v());
                  } else if (!L) {
                    const t = h ? F.say.ka : F.say.en;
                    r.default
                      .timing(_, {
                        toValue: 1,
                        duration: Math.min(6500, 2400 + 40 * t.length),
                        easing: o.default.linear,
                        useNativeDriver: !1,
                      })
                      .start(({ finished: t }) => {
                        t && !e && v();
                      });
                  }
                }
              })(),
              () => {
                ((e = !0), _.stopAnimation());
              }
            );
          }, [x?.id, k]),
          !x || !F)
        )
          return null;
        const U =
            "missing" === O
              ? F.fallback
                ? h
                  ? F.fallback.ka
                  : F.fallback.en
                : h
                  ? "\u10d4\u10e1 \u10d4\u10da\u10d4\u10db\u10d4\u10dc\u10e2\u10d8 \u10d0\u10ee\u10da\u10d0 \u10d4\u10d9\u10e0\u10d0\u10dc\u10d6\u10d4 \u10d0\u10e0 \u10e9\u10d0\u10dc\u10e1."
                  : "That isn't on the screen right now."
              : h
                ? F.say.ka
                : F.say.en,
          q = M
            ? { x: M.x - 8, y: M.y - 8, w: M.width + 16, h: M.height + 16 }
            : null,
          A = Math.min(340, D - 32),
          H = !q || q.y + q.h + 200 < z,
          X = q
            ? Math.min(Math.max(q.x + q.w / 2 - A / 2, 16), D - A - 16)
            : (D - A) / 2,
          Y = q
            ? H
              ? { top: q.y + q.h + 14 }
              : { bottom: z - q.y + 14 }
            : { top: z / 2 - 90 },
          G = L || ("missing" === O && !!F.fallback);
        return (0, b.jsxs)(f.default, {
          pointerEvents: "box-none",
          style: [u.default.absoluteFill, { zIndex: 1e3 }],
          children: [
            q
              ? (0, b.jsxs)(b.Fragment, {
                  children: [
                    (0, b.jsx)(l.default, {
                      style: {
                        position: "absolute",
                        left: 0,
                        top: 0,
                        right: 0,
                        height: Math.max(0, q.y),
                        backgroundColor: C,
                      },
                    }),
                    (0, b.jsx)(l.default, {
                      style: {
                        position: "absolute",
                        left: 0,
                        top: q.y + q.h,
                        right: 0,
                        bottom: 0,
                        backgroundColor: C,
                      },
                    }),
                    (0, b.jsx)(l.default, {
                      style: {
                        position: "absolute",
                        left: 0,
                        top: q.y,
                        width: Math.max(0, q.x),
                        height: q.h,
                        backgroundColor: C,
                      },
                    }),
                    (0, b.jsx)(l.default, {
                      style: {
                        position: "absolute",
                        left: q.x + q.w,
                        top: q.y,
                        right: 0,
                        height: q.h,
                        backgroundColor: C,
                      },
                    }),
                    (0, b.jsx)(r.default.View, {
                      pointerEvents: "none",
                      style: {
                        position: "absolute",
                        left: q.x,
                        top: q.y,
                        width: q.w,
                        height: q.h,
                        borderRadius: 14,
                        borderWidth: 2,
                        borderColor: e.green,
                        transform: [
                          {
                            scale: B.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.04],
                            }),
                          },
                        ],
                      },
                    }),
                  ],
                })
              : (0, b.jsx)(l.default, {
                  style: [
                    u.default.absoluteFill,
                    {
                      backgroundColor:
                        "seeking" === O ? "rgba(8,14,20,0.25)" : C,
                    },
                  ],
                }),
            (0, b.jsx)(r.default.View, {
              pointerEvents: "none",
              style: {
                position: "absolute",
                left: 0,
                top: 0,
                opacity: N,
                transform: E.getTranslateTransform(),
              },
              children: (0, b.jsxs)(f.default, {
                style: {
                  marginLeft: -22,
                  marginTop: -22,
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: "rgba(255,255,255,0.28)",
                  borderWidth: 2,
                  borderColor: "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                },
                children: [
                  (0, b.jsx)(r.default.View, {
                    style: {
                      position: "absolute",
                      width: 44,
                      height: 44,
                      borderRadius: 22,
                      backgroundColor: e.green,
                      opacity: S.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.7, 0],
                      }),
                      transform: [
                        {
                          scale: S.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.6, 2.4],
                          }),
                        },
                      ],
                    },
                  }),
                  (0, b.jsx)(t.Ionicons, {
                    name: "hand-left",
                    size: 20,
                    color: "#fff",
                  }),
                ],
              }),
            }),
            "seeking" !== O
              ? (0, b.jsxs)(f.default, {
                  style: {
                    position: "absolute",
                    left: X,
                    width: A,
                    ...Y,
                    backgroundColor: e.card,
                    borderRadius: y.radius.lg,
                    padding: y.space.lg,
                    shadowColor: "#000",
                    shadowOpacity: 0.3,
                    shadowRadius: 20,
                    shadowOffset: { width: 0, height: 10 },
                    elevation: 16,
                  },
                  children: [
                    (0, b.jsxs)(f.default, {
                      style: w.styles.between,
                      children: [
                        (0, b.jsxs)(f.default, {
                          style: [
                            w.styles.row,
                            { gap: 6, flexShrink: 1, minWidth: 0 },
                          ],
                          children: [
                            (0, b.jsx)(t.Ionicons, {
                              name: x.icon,
                              size: 14,
                              color: e.greenDeep,
                            }),
                            (0, b.jsx)(w.Body, {
                              size: y.font.s11,
                              weight: "700",
                              numberOfLines: 1,
                              style: { color: e.greenDeep, letterSpacing: 0.5 },
                              children: (h
                                ? x.title.ka
                                : x.title.en
                              ).toUpperCase(),
                            }),
                          ],
                        }),
                        (0, b.jsxs)(w.Body, {
                          size: y.font.s11,
                          muted: !0,
                          children: [k + 1, " / ", x.steps.length],
                        }),
                      ],
                    }),
                    (0, b.jsx)(w.Body, {
                      weight: "600",
                      size: y.font.s14,
                      style: { marginTop: 8 },
                      children: U,
                    }),
                    "showing" !== O || F.press || L
                      ? null
                      : (0, b.jsx)(f.default, {
                          style: {
                            height: 3,
                            borderRadius: 2,
                            backgroundColor: e.lineSoft,
                            marginTop: y.space.md,
                            overflow: "hidden",
                          },
                          children: (0, b.jsx)(r.default.View, {
                            style: {
                              height: 3,
                              backgroundColor: e.green,
                              width: _.interpolate({
                                inputRange: [0, 1],
                                outputRange: ["0%", "100%"],
                              }),
                            },
                          }),
                        }),
                    (0, b.jsxs)(f.default, {
                      style: [w.styles.between, { marginTop: y.space.md }],
                      children: [
                        (0, b.jsx)(l.default, {
                          onPress: T,
                          hitSlop: 10,
                          children: (0, b.jsx)(w.Body, {
                            size: y.font.s12,
                            weight: "600",
                            muted: !0,
                            children: h
                              ? "\u10d2\u10d0\u10e1\u10d5\u10da\u10d0"
                              : "Exit",
                          }),
                        }),
                        "tapping" === O || ("showing" === O && F.press)
                          ? (0, b.jsxs)(f.default, {
                              style: [w.styles.row, { gap: 6 }],
                              children: [
                                (0, b.jsx)(t.Ionicons, {
                                  name: "hand-left-outline",
                                  size: 14,
                                  color: e.greenDeep,
                                }),
                                (0, b.jsx)(w.Body, {
                                  size: y.font.s12,
                                  weight: "700",
                                  style: { color: e.greenDeep },
                                  children: h
                                    ? "\u10d3\u10d0\u10ed\u10d4\u10e0\u10d0\u2026"
                                    : "Tapping\u2026",
                                }),
                              ],
                            })
                          : (0, b.jsx)(l.default, {
                              onPress: G ? T : v,
                              style: ({ pressed: t }) => ({
                                backgroundColor: e.green,
                                borderRadius: y.radius.pill,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                opacity: t ? 0.8 : 1,
                              }),
                              children: (0, b.jsx)(w.Body, {
                                size: y.font.s12,
                                weight: "700",
                                style: { color: e.greenDeep },
                                children: G
                                  ? h
                                    ? "\u10d3\u10d0\u10e1\u10e0\u10e3\u10da\u10d4\u10d1\u10d0"
                                    : "Done"
                                  : h
                                    ? "\u10e8\u10d4\u10db\u10d3\u10d4\u10d2\u10d8"
                                    : "Next",
                              }),
                            }),
                      ],
                    }),
                  ],
                })
              : null,
          ],
        });
      }));
    var t = _r(d[0]),
      n = _r(d[1]),
      s = _r(d[2]),
      r = e(_r(d[3])),
      o = e(_r(d[4]));
    _r(d[5]);
    var l = e(_r(d[6])),
      u = e(_r(d[7])),
      f = e(_r(d[8])),
      c = e(_r(d[9])),
      h = _r(d[10]),
      p = _r(d[11]),
      y = _r(d[12]),
      w = _r(d[13]),
      x = _r(d[14]),
      b = _r(d[15]);
    const j = (0, h.create)((e, t) => ({
        tour: null,
        index: 0,
        start: (t) => {
          const n = x.TOURS.find((e) => e.id === t);
          n && e({ tour: n, index: 0 });
        },
        next: () => {
          const { tour: n, index: s } = t();
          n &&
            (s + 1 >= n.steps.length
              ? e({ tour: null, index: 0 })
              : e({ index: s + 1 }));
        },
        stop: () => e({ tour: null, index: 0 }),
      })),
      k = new Map();
    const R = (e) => new Promise((t) => setTimeout(t, e));
    function v(e) {
      return new Promise((t) => {
        if (!e?.measureInWindow) return t(null);
        e.measureInWindow((e, n, s, r) =>
          t(s > 0 && r > 0 ? { x: e, y: n, width: s, height: r } : null),
        );
      });
    }
    async function V(e, t, n = 4500) {
      const s = Date.now() + n;
      let r = !1;
      for (; Date.now() < s && !t();) {
        const t = k.get(e)?.[0],
          n = t?.node();
        if (t && n) {
          r ||
            (n.scrollIntoView?.({ block: "center", inline: "center" }),
            (r = !0),
            await R(260));
          const e = await v(n);
          if (e) return { rect: e, handle: t };
        }
        await R(120);
      }
      return null;
    }
    const C = "rgba(8,14,20,0.62)";
  },
  1068,
  [15, 276, 13, 305, 382, 42, 415, 113, 192, 435, 885, 877, 895, 890, 1069, 6],
);