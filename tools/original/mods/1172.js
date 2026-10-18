__d(
  function (g, r, _i, _a, m, _e, d) {
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
    var n = r(d[0]),
      t = r(d[1]),
      s = r(d[2]),
      a = r(d[3]),
      l = e(r(d[4])),
      o = e(r(d[5])),
      i = e(r(d[6])),
      c = e(r(d[7])),
      u = r(d[8]),
      f = r(d[9]),
      h = r(d[10]),
      p = r(d[11]),
      y = r(d[12]),
      k = r(d[13]);
    const x = [
        {
          key: "first_name",
          ka: "\u10e1\u10d0\u10ee\u10d4\u10da\u10d8",
          en: "First name",
          required: !0,
          placeholder: { en: "Vasil", ka: "\u10d5\u10d0\u10e1\u10d8\u10da" },
        },
        {
          key: "last_name",
          ka: "\u10d2\u10d5\u10d0\u10e0\u10d8",
          en: "Last name",
          required: !0,
          placeholder: {
            en: "Beridze",
            ka: "\u10d1\u10d4\u10e0\u10d8\u10eb\u10d4",
          },
        },
        {
          key: "address",
          ka: "\u10db\u10d8\u10e1\u10d0\u10db\u10d0\u10e0\u10d7\u10d8",
          en: "Address",
          required: !0,
          placeholder: {
            en: "12 Rustaveli Ave, apt. 5",
            ka: "\u10e0\u10e3\u10e1\u10d7\u10d0\u10d5\u10d4\u10da\u10d8\u10e1 \u10de\u10e0. 12, \u10d1\u10d8\u10dc\u10d0 5",
          },
        },
        {
          key: "city",
          ka: "\u10e5\u10d0\u10da\u10d0\u10e5\u10d8",
          en: "City",
          required: !1,
          placeholder: {
            en: "Tbilisi",
            ka: "\u10d7\u10d1\u10d8\u10da\u10d8\u10e1\u10d8",
          },
        },
      ],
      j = [
        "first_name_en",
        "last_name_en",
        "first_name_ka",
        "last_name_ka",
        "address_en",
        "address_ka",
        "phone",
      ],
      _ = {
        first_name_en: "",
        last_name_en: "",
        first_name_ka: "",
        last_name_ka: "",
        address_en: "",
        address_ka: "",
        city_en: "",
        city_ka: "",
        phone: "",
      },
      b = (e) => ("en" === e ? "ka" : "en"),
      T = (e, n) => `${e}_${n}`;
    function C() {
      const { theme: e } = (0, y.useTokens)(),
        n = "ka" === (0, h.useLang)(),
        { onboarding: l } = (0, s.useLocalSearchParams)(),
        i = "1" === l,
        { data: C } = (0, u.useCustomer)(),
        S = (0, u.useUpdateProfile)(),
        w = (0, u.useTranslateFields)(),
        [B, z] = (0, a.useState)(_),
        [I, P] = (0, a.useState)({}),
        [R, $] = (0, a.useState)({}),
        [V, q] = (0, a.useState)(null),
        [A, D] = (0, a.useState)(null),
        [E, O] = (0, a.useState)(!1),
        F = (0, a.useRef)(!1),
        L = (0, a.useRef)(B),
        W = (0, a.useRef)(I);
      ((L.current = B),
        (W.current = I),
        (0, a.useEffect)(() => {
          if (!C || F.current) return;
          F.current = !0;
          const e = { ..._, ...C.profile, phone: C.profile?.phone || "+995 " };
          ((L.current = e), z(e));
        }, [C]));
      const G = (e, n) => {
          (z((t) => ({ ...t, [e]: n })), P((n) => ({ ...n, [e]: !1 })), O(!1));
        },
        M = async (e) => {
          const n = L.current,
            t = {},
            s = {};
          for (const { key: a, from: l } of e) {
            const e = n[T(a, l)]?.trim(),
              o = T(a, b(l));
            e && ((n[o]?.trim() && !W.current[o]) || ((t[a] = e), (s[a] = o)));
          }
          const a = Object.keys(t);
          if (!a.length) return;
          const l = (e) =>
            Object.fromEntries(Object.values(s).map((n) => [n, e]));
          $((e) => ({ ...e, ...l(!0) }));
          try {
            const { result: e, source: n } = await w.mutateAsync(t);
            "none" !== n && q(n);
            const l = { ...L.current },
              o = {};
            for (const n of a) {
              const t = s[n],
                a = e[n]?.[t.endsWith("_ka") ? "ka" : "en"];
              a && ((l[t] = a), (o[t] = !0));
            }
            ((L.current = l),
              (W.current = { ...W.current, ...o }),
              z(l),
              P(W.current));
          } catch {
          } finally {
            $((e) => ({ ...e, ...l(!1) }));
          }
        },
        U = () =>
          x.flatMap((e) => {
            const n = L.current,
              t = n[T(e.key, "en")]?.trim(),
              s = n[T(e.key, "ka")]?.trim();
            return t && !s
              ? [{ key: e.key, from: "en" }]
              : s && !t
                ? [{ key: e.key, from: "ka" }]
                : [];
          }),
        N =
          (
            (B.first_name_en?.[0] ?? "") + (B.last_name_en?.[0] ?? "")
          ).toUpperCase() || "\ud83d\ude42",
        H = Object.values(R).some(Boolean);
      return (0, k.jsxs)(y.Screen, {
        children: [
          (0, k.jsxs)(c.default, {
            style: [
              y.styles.row,
              { gap: p.space.md, marginBottom: p.space.lg },
            ],
            children: [
              i
                ? null
                : (0, k.jsx)(o.default, {
                    onPress: () => s.router.back(),
                    hitSlop: 12,
                    children: (0, k.jsx)(t.Ionicons, {
                      name: "chevron-back",
                      size: 24,
                      color: e.ink,
                    }),
                  }),
              (0, k.jsx)(y.Title, {
                children: i
                  ? n
                    ? "\u10e8\u10d4\u10dc\u10d8 \u10db\u10dd\u10dc\u10d0\u10ea\u10d4\u10db\u10d4\u10d1\u10d8"
                    : "About you"
                  : n
                    ? "\u10de\u10e0\u10dd\u10e4\u10d8\u10da\u10d8"
                    : "Profile",
              }),
            ],
          }),
          i
            ? null
            : (0, k.jsxs)(y.Card, {
                style: { alignItems: "center", paddingVertical: 22 },
                children: [
                  (0, k.jsx)(c.default, {
                    style: {
                      width: 64,
                      height: 64,
                      borderRadius: 32,
                      backgroundColor: e.green,
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    children: (0, k.jsx)(y.Body, {
                      weight: "700",
                      size: p.font.s22,
                      style: { color: e.greenDeep },
                      children: N,
                    }),
                  }),
                  (0, k.jsx)(y.Body, {
                    weight: "700",
                    size: p.font.s16,
                    style: { marginTop: p.space.md },
                    children: n
                      ? `${B.first_name_ka} ${B.last_name_ka}`
                      : `${B.first_name_en} ${B.last_name_en}`,
                  }),
                  (0, k.jsx)(y.Body, {
                    muted: !0,
                    size: p.font.s12,
                    children: C?.email,
                  }),
                  (0, k.jsx)(c.default, {
                    style: { marginTop: p.space.sm },
                    children: (0, k.jsx)(y.Pill, {
                      text: `${n ? "\u10dd\u10d7\u10d0\u10ee\u10d8" : "Room"} ${C?.room_number ?? "\u2014"}`,
                      tone: "ok",
                    }),
                  }),
                ],
              }),
          (0, k.jsx)(y.Card, {
            style: {
              marginTop: i ? 0 : p.space.md,
              backgroundColor: e.navy,
              borderColor: e.navy,
            },
            children: (0, k.jsxs)(c.default, {
              style: [
                y.styles.row,
                { gap: p.space.md, alignItems: "flex-start" },
              ],
              children: [
                (0, k.jsx)(c.default, {
                  style: {
                    width: 34,
                    height: 34,
                    borderRadius: 17,
                    backgroundColor: e.green,
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  children: (0, k.jsx)(t.Ionicons, {
                    name: "sparkles",
                    size: 16,
                    color: e.greenDeep,
                  }),
                }),
                (0, k.jsxs)(c.default, {
                  style: { flex: 1, minWidth: 0 },
                  children: [
                    (0, k.jsx)(y.Body, {
                      weight: "700",
                      size: p.font.s13,
                      style: { color: "#fff" },
                      children: n
                        ? "\u10d4\u10e0\u10d7 \u10d4\u10dc\u10d0\u10d6\u10d4 \u10e8\u10d4\u10d0\u10d5\u10e1\u10d4 \u2014 \u10db\u10d4\u10dd\u10e0\u10d4\u10e1 AI \u10d3\u10d0\u10ec\u10d4\u10e0\u10e1"
                        : "Type in one language \u2014 AI writes the other",
                    }),
                    (0, k.jsx)(y.Body, {
                      size: p.font.s12,
                      style: { color: e.faint, marginTop: 3 },
                      children: n
                        ? "\u10e5\u10d0\u10e0\u10d7\u10e3\u10da\u10d0\u10d3 \u10d0\u10dc \u10d8\u10dc\u10d2\u10da\u10d8\u10e1\u10e3\u10e0\u10d0\u10d3. \u2728 \u10dc\u10d8\u10e8\u10dc\u10e3\u10da\u10d8 \u10d5\u10d4\u10da\u10d4\u10d1\u10d8 \u10e8\u10d4\u10d2\u10d8\u10eb\u10da\u10d8\u10d0 \u10e8\u10d4\u10d0\u10e1\u10ec\u10dd\u10e0\u10dd."
                        : "Georgian or English. Fields marked \u2728 were filled for you \u2014 edit them if needed.",
                    }),
                  ],
                }),
                V
                  ? (0, k.jsx)(y.Pill, {
                      text: "ai" === V ? "Gemini" : "offline",
                      tone: "ai" === V ? "ok" : "neutral",
                    })
                  : null,
              ],
            }),
          }),
          x.map((t) =>
            (0, k.jsxs)(
              c.default,
              {
                children: [
                  (0, k.jsxs)(y.SectionLabel, {
                    children: [n ? t.ka : t.en, t.required ? " *" : ""],
                  }),
                  (0, k.jsx)(y.Card, {
                    style: { paddingVertical: p.space.sm },
                    children: ["en", "ka"].map((n, s) => {
                      const a = T(t.key, n);
                      return (0, k.jsx)(
                        c.default,
                        {
                          style: {
                            borderTopWidth: s > 0 ? 1 : 0,
                            borderTopColor: e.lineSoft,
                          },
                          children: (0, k.jsx)(v, {
                            tag: "en" === n ? "EN" : "\u10e5\u10d0\u10e0",
                            value: B[a],
                            placeholder: t.placeholder[n],
                            onChangeText: (e) => G(a, e),
                            onBlur: () => M([{ key: t.key, from: n }]),
                            busy: !!R[a],
                            ai: !!I[a],
                          }),
                        },
                        n,
                      );
                    }),
                  }),
                ],
              },
              t.key,
            ),
          ),
          (0, k.jsx)(y.SectionLabel, {
            children: n
              ? "\u10e2\u10d4\u10da\u10d4\u10e4\u10dd\u10dc\u10d8 *"
              : "Phone *",
          }),
          (0, k.jsx)(y.Card, {
            style: { paddingVertical: p.space.sm },
            children: (0, k.jsx)(v, {
              tag: "\ud83d\udcf1",
              value: B.phone,
              placeholder: "+995 555 12 34 56",
              keyboardType: "phone-pad",
              onChangeText: (e) => G("phone", e),
            }),
          }),
          (0, k.jsx)(y.Btn, {
            label: n
              ? "\u10db\u10d4\u10dd\u10e0\u10d4 \u10d4\u10dc\u10d8\u10e1 \u10e8\u10d4\u10d5\u10e1\u10d4\u10d1\u10d0"
              : "Fill the other language",
            icon: "sparkles-outline",
            variant: "outline",
            onPress: () => M(U()),
            loading: H,
            style: { marginTop: p.space.xl },
          }),
          A
            ? (0, k.jsxs)(c.default, {
                style: [y.styles.row, { gap: 6, marginTop: p.space.md }],
                children: [
                  (0, k.jsx)(t.Ionicons, {
                    name: "alert-circle",
                    size: 15,
                    color: e.red,
                  }),
                  (0, k.jsx)(y.Body, {
                    size: p.font.s12,
                    style: { color: e.red, flex: 1, minWidth: 0 },
                    children: A,
                  }),
                ],
              })
            : null,
          (0, k.jsx)(y.Btn, {
            label: i
              ? n
                ? "\u10e8\u10d4\u10dc\u10d0\u10ee\u10d5\u10d0 \u10d3\u10d0 \u10d2\u10d0\u10d2\u10e0\u10eb\u10d4\u10da\u10d4\u10d1\u10d0"
                : "Save and continue"
              : n
                ? "\u10e8\u10d4\u10dc\u10d0\u10ee\u10d5\u10d0"
                : "Save changes",
            icon: "checkmark",
            onPress: async () => {
              (D(null), await M(U()));
              const e = L.current;
              j.some((n) => !e[n]?.trim()) ||
              e.phone.replace(/\D/g, "").length < 9
                ? D(
                    n
                      ? "\u10e8\u10d4\u10d0\u10d5\u10e1\u10d4 \u10e7\u10d5\u10d4\u10da\u10d0 \u10e1\u10d0\u10d5\u10d0\u10da\u10d3\u10d4\u10d1\u10e3\u10da\u10dd \u10d5\u10d4\u10da\u10d8 (*)"
                      : "Fill in all required fields (*)",
                  )
                : S.mutate(e, {
                    onSuccess: () => {
                      (O(!0), i && s.router.replace("/(tabs)"));
                    },
                    onError: (e) =>
                      D(
                        (0, f.apiError)(
                          e,
                          n
                            ? "\u10e8\u10d4\u10dc\u10d0\u10ee\u10d5\u10d0 \u10d5\u10d4\u10e0 \u10db\u10dd\u10ee\u10d4\u10e0\u10ee\u10d3\u10d0"
                            : "Could not save",
                        ),
                      ),
                  });
            },
            loading: S.isPending,
            disabled: H,
            style: { marginTop: p.space.md },
          }),
          E && !i
            ? (0, k.jsxs)(c.default, {
                style: [
                  y.styles.row,
                  { gap: 6, marginTop: p.space.md, justifyContent: "center" },
                ],
                children: [
                  (0, k.jsx)(t.Ionicons, {
                    name: "checkmark-circle",
                    size: 15,
                    color: e.ok,
                  }),
                  (0, k.jsx)(y.Body, {
                    size: p.font.s12,
                    style: { color: e.ok },
                    children: n
                      ? "\u10e8\u10d4\u10dc\u10d0\u10ee\u10e3\u10da\u10d8\u10d0"
                      : "Saved",
                  }),
                ],
              })
            : null,
        ],
      });
    }
    function v(e) {
      const s = (0, n.c)(30),
        {
          tag: a,
          value: o,
          placeholder: u,
          onChangeText: f,
          onBlur: h,
          busy: x,
          ai: j,
          keyboardType: _,
        } = e,
        b = void 0 !== x && x,
        T = void 0 !== j && j,
        { theme: C } = (0, y.useTokens)();
      let v, S, w, B, z, I, P, R, $;
      return (
        s[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((v = [y.styles.row, { gap: p.space.md, paddingVertical: 4 }]),
            (s[0] = v))
          : (v = s[0]),
        s[1] !== C.paper
          ? ((S = {
              width: 38,
              alignItems: "center",
              paddingVertical: 4,
              borderRadius: p.radius.sm,
              backgroundColor: C.paper,
            }),
            (s[1] = C.paper),
            (s[2] = S))
          : (S = s[2]),
        s[3] !== C.mut
          ? ((w = { color: C.mut }), (s[3] = C.mut), (s[4] = w))
          : (w = s[4]),
        s[5] !== w || s[6] !== a
          ? ((B = (0, k.jsx)(y.Body, {
              size: p.font.s11,
              weight: "700",
              style: w,
              children: a,
            })),
            (s[5] = w),
            (s[6] = a),
            (s[7] = B))
          : (B = s[7]),
        s[8] !== S || s[9] !== B
          ? ((z = (0, k.jsx)(c.default, { style: S, children: B })),
            (s[8] = S),
            (s[9] = B),
            (s[10] = z))
          : (z = s[10]),
        s[11] !== C.ink
          ? ((I = {
              flexGrow: 1,
              flexShrink: 1,
              flexBasis: 0,
              minWidth: 0,
              paddingVertical: 11,
              color: C.ink,
              fontSize: p.font.s14,
            }),
            (s[11] = C.ink),
            (s[12] = I))
          : (I = s[12]),
        s[13] !== _ ||
        s[14] !== h ||
        s[15] !== f ||
        s[16] !== u ||
        s[17] !== I ||
        s[18] !== C.faint ||
        s[19] !== o
          ? ((P = (0, k.jsx)(i.default, {
              value: o,
              onChangeText: f,
              onBlur: h,
              placeholder: u,
              placeholderTextColor: C.faint,
              keyboardType: _,
              style: I,
            })),
            (s[13] = _),
            (s[14] = h),
            (s[15] = f),
            (s[16] = u),
            (s[17] = I),
            (s[18] = C.faint),
            (s[19] = o),
            (s[20] = P))
          : (P = s[20]),
        s[21] !== T || s[22] !== b || s[23] !== C.green || s[24] !== C.greenDeep
          ? ((R = b
              ? (0, k.jsx)(l.default, { size: "small", color: C.green })
              : T
                ? (0, k.jsx)(t.Ionicons, {
                    name: "sparkles",
                    size: 15,
                    color: C.greenDeep,
                  })
                : null),
            (s[21] = T),
            (s[22] = b),
            (s[23] = C.green),
            (s[24] = C.greenDeep),
            (s[25] = R))
          : (R = s[25]),
        s[26] !== R || s[27] !== z || s[28] !== P
          ? (($ = (0, k.jsxs)(c.default, { style: v, children: [z, P, R] })),
            (s[26] = R),
            (s[27] = z),
            (s[28] = P),
            (s[29] = $))
          : ($ = s[29]),
        $
      );
    }
  },
  1172,
  [11, 15, 276, 13, 402, 415, 425, 192, 920, 968, 877, 895, 890, 6],
);