__d(
  function (g, r, _i, a, m, _e, _d) {
    "use strict";
    function e(e) {
      return e && e.__esModule ? e : { default: e };
    }
    (Object.defineProperty(_e, "__esModule", { value: !0 }),
      (_e.Drawing = A),
      (_e.Note = E),
      (_e.KraftBox = function (e) {
        const i = (0, t.c)(23),
          { size: s, cloud: o } = e,
          d = void 0 === s ? 120 : s,
          f = void 0 !== o && o,
          x = b(f ? 3 : 0, 3200),
          u = 0.9 * d;
        let j;
        i[0] !== d || i[1] !== u
          ? ((j = { width: d, height: u }), (i[0] = d), (i[1] = u), (i[2] = j))
          : (j = i[2]);
        const y = 0.9 * d;
        let w, k, p, L, C, v, D, B, A, E, W, S;
        i[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((C = (0, M.jsx)(c.Ellipse, {
              cx: 104,
              cy: 166,
              rx: 74,
              ry: 8,
              fill: "#0D1A14",
              opacity: 0.08,
            })),
            (v = (0, M.jsx)(c.Path, {
              d: "M30 62 L110 36 L178 58 L98 86 Z",
              fill: "#EBCB9C",
              ...R,
            })),
            (D = (0, M.jsx)(c.Path, {
              d: "M62 52 L80 46 L146 68 L128 75 Z",
              fill: "#fff",
              opacity: 0.45,
            })),
            (B = (0, M.jsx)(c.Path, {
              d: "M70 49 L138 72",
              ...R,
              strokeWidth: 2,
              opacity: 0.55,
            })),
            (w = (0, M.jsx)(c.Path, {
              d: "M30 62 L98 86 L98 164 L30 138 Z",
              fill: "#DBA871",
              ...R,
            })),
            (k = (0, M.jsx)(c.Path, {
              d: "M98 86 L178 58 L178 134 L98 164 Z",
              fill: "#C48C57",
              ...R,
            })),
            (p = (0, M.jsx)(c.Path, {
              d: "M118 104 L152 92 L152 112 L118 124 Z",
              fill: "#F6EBD9",
              stroke: _,
              strokeWidth: 1.6,
              strokeLinejoin: "round",
            })),
            (L = (0, M.jsx)(c.Path, {
              d: "M124 108 L144 101 M124 114 L140 108",
              stroke: _,
              strokeWidth: 1.6,
              strokeLinecap: "round",
              opacity: 0.6,
            })),
            (i[3] = w),
            (i[4] = k),
            (i[5] = p),
            (i[6] = L),
            (i[7] = C),
            (i[8] = v),
            (i[9] = D),
            (i[10] = B))
          : ((w = i[3]),
            (k = i[4]),
            (p = i[5]),
            (L = i[6]),
            (C = i[7]),
            (v = i[8]),
            (D = i[9]),
            (B = i[10]));
        i[11] === Symbol.for("react.memo_cache_sentinel")
          ? ((A = (0, M.jsx)(c.G, {
              transform: "translate(44 98) skewY(19.4) scale(.62)",
              children: (0, M.jsx)(c.Path, { d: P, fill: _ }),
            })),
            (i[11] = A))
          : (A = i[11]);
        i[12] !== d || i[13] !== y
          ? ((E = (0, M.jsxs)(h.default, {
              width: d,
              height: y,
              viewBox: "0 0 200 180",
              children: [C, v, D, B, w, k, p, L, A],
            })),
            (i[12] = d),
            (i[13] = y),
            (i[14] = E))
          : (E = i[14]);
        i[15] !== x || i[16] !== f || i[17] !== d
          ? ((W = f
              ? (0, M.jsx)(l.default.View, {
                  style: [{ position: "absolute", left: 0, top: 0 }, x],
                  pointerEvents: "none",
                  children: (0, M.jsxs)(h.default, {
                    width: d,
                    height: 0.9 * d,
                    viewBox: "0 0 200 180",
                    children: [
                      (0, M.jsx)(c.Path, {
                        d: "M60 50 C46 50 42 34 54 28 C54 12 76 8 84 20 C90 4 118 6 120 24 C134 22 140 40 128 48 C110 56 76 58 60 50 Z",
                        fill: "#fff",
                        ...R,
                      }),
                      (0, M.jsx)(c.Path, {
                        d: "M84 38 C88 44 98 44 102 38",
                        fill: "none",
                        ...R,
                        strokeWidth: 2.4,
                      }),
                    ],
                  }),
                })
              : null),
            (i[15] = x),
            (i[16] = f),
            (i[17] = d),
            (i[18] = W))
          : (W = i[18]);
        i[19] !== E || i[20] !== W || i[21] !== j
          ? ((S = (0, M.jsxs)(n.default, { style: j, children: [E, W] })),
            (i[19] = E),
            (i[20] = W),
            (i[21] = j),
            (i[22] = S))
          : (S = i[22]);
        return S;
      }),
      (_e.PhoneFlags = function (e) {
        const i = (0, t.c)(32),
          { size: s } = e,
          o = void 0 === s ? 120 : s,
          d = b(3, 4e3),
          f = 0.9 * o;
        let x;
        i[0] !== o || i[1] !== f
          ? ((x = { width: o, height: f }), (i[0] = o), (i[1] = f), (i[2] = x))
          : (x = i[2]);
        const u = 0.9 * o;
        let j, y, w, k, p, L, C, v, _, P;
        i[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((j = (0, M.jsx)(c.ClipPath, {
              id: "pfUs",
              children: (0, M.jsx)(c.Circle, { cx: 142, cy: 86, r: 25 }),
            })),
            (i[3] = j))
          : (j = i[3]);
        i[4] === Symbol.for("react.memo_cache_sentinel")
          ? ((y = (0, M.jsxs)(c.Defs, {
              children: [
                j,
                (0, M.jsx)(c.ClipPath, {
                  id: "pfGe",
                  children: (0, M.jsx)(c.Circle, { cx: 160, cy: 126, r: 23 }),
                }),
              ],
            })),
            (w = (0, M.jsx)(c.Rect, {
              x: 38,
              y: 8,
              width: 86,
              height: 162,
              rx: 18,
              fill: "#152238",
              ...R,
            })),
            (k = (0, M.jsx)(c.Rect, {
              x: 46,
              y: 22,
              width: 70,
              height: 128,
              rx: 10,
              fill: "#1F5FA8",
            })),
            (p = (0, M.jsx)(c.Rect, {
              x: 70,
              y: 14,
              width: 22,
              height: 4,
              rx: 2,
              fill: "#3A4A63",
            })),
            (i[4] = y),
            (i[5] = w),
            (i[6] = k),
            (i[7] = p))
          : ((y = i[4]), (w = i[5]), (k = i[6]), (p = i[7]));
        i[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((L = (0, M.jsxs)(c.G, {
              fill: "none",
              stroke: "#6AD67D",
              strokeWidth: 2.6,
              children: [
                (0, M.jsx)(c.Circle, { cx: 81, cy: 66, r: 22 }),
                (0, M.jsx)(c.Ellipse, { cx: 81, cy: 66, rx: 9, ry: 22 }),
                (0, M.jsx)(c.Path, { d: "M59 66h44M62 55h38M62 77h38" }),
              ],
            })),
            (C = (0, M.jsx)(c.Circle, {
              cx: 81,
              cy: 158,
              r: 6,
              fill: "none",
              stroke: "#3A4A63",
              strokeWidth: 2.4,
            })),
            (i[8] = L),
            (i[9] = C))
          : ((L = i[8]), (C = i[9]));
        i[10] !== o || i[11] !== u
          ? ((v = (0, M.jsxs)(h.default, {
              width: o,
              height: u,
              viewBox: "0 0 200 180",
              children: [y, w, k, p, L, C],
            })),
            (i[10] = o),
            (i[11] = u),
            (i[12] = v))
          : (v = i[12]);
        i[13] === Symbol.for("react.memo_cache_sentinel")
          ? ((_ = { position: "absolute", left: 0, top: 0 }), (i[13] = _))
          : (_ = i[13]);
        i[14] !== d ? ((P = [_, d]), (i[14] = d), (i[15] = P)) : (P = i[15]);
        const D = 0.9 * o;
        let B, A, E, S, Z, F, V, z, G;
        i[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((B = (0, M.jsx)(c.Circle, {
              cx: 120,
              cy: 134,
              r: 22,
              fill: "#2E6DB4",
              ...R,
            })),
            (A = (0, M.jsx)(c.Path, {
              d: "M108 124 c6-6 16-6 18 2 c-4 4-10 2-12 8 c-4-2-8-4-6-10 Z M122 140 c6-2 12 2 10 8 c-6 2-10-2-10-8 Z",
              fill: "#E9F2FB",
            })),
            (i[16] = B),
            (i[17] = A))
          : ((B = i[16]), (A = i[17]));
        i[18] === Symbol.for("react.memo_cache_sentinel")
          ? ((E = (0, M.jsxs)(c.G, {
              clipPath: "url(#pfUs)",
              children: [
                (0, M.jsx)(c.Rect, {
                  x: 112,
                  y: 58,
                  width: 60,
                  height: 56,
                  fill: "#fff",
                }),
                [0, 1, 2, 3, 4, 5, 6].map(W),
                (0, M.jsx)(c.Rect, {
                  x: 112,
                  y: 58,
                  width: 28,
                  height: 30,
                  fill: "#1F3A7A",
                }),
              ],
            })),
            (S = (0, M.jsx)(c.Circle, {
              cx: 142,
              cy: 86,
              r: 25,
              fill: "none",
              ...R,
            })),
            (i[18] = E),
            (i[19] = S))
          : ((E = i[18]), (S = i[19]));
        i[20] === Symbol.for("react.memo_cache_sentinel")
          ? ((Z = (0, M.jsxs)(c.G, {
              clipPath: "url(#pfGe)",
              children: [
                (0, M.jsx)(c.Rect, {
                  x: 134,
                  y: 100,
                  width: 52,
                  height: 52,
                  fill: "#fff",
                }),
                (0, M.jsx)(c.Rect, {
                  x: 156,
                  y: 100,
                  width: 8,
                  height: 52,
                  fill: "#E8112D",
                }),
                (0, M.jsx)(c.Rect, {
                  x: 134,
                  y: 122,
                  width: 52,
                  height: 8,
                  fill: "#E8112D",
                }),
              ],
            })),
            (F = (0, M.jsx)(c.Circle, {
              cx: 160,
              cy: 126,
              r: 23,
              fill: "none",
              ...R,
            })),
            (i[20] = Z),
            (i[21] = F))
          : ((Z = i[20]), (F = i[21]));
        i[22] !== o || i[23] !== D
          ? ((V = (0, M.jsxs)(h.default, {
              width: o,
              height: D,
              viewBox: "0 0 200 180",
              children: [B, A, E, S, Z, F],
            })),
            (i[22] = o),
            (i[23] = D),
            (i[24] = V))
          : (V = i[24]);
        i[25] !== P || i[26] !== V
          ? ((z = (0, M.jsx)(l.default.View, {
              style: P,
              pointerEvents: "none",
              children: V,
            })),
            (i[25] = P),
            (i[26] = V),
            (i[27] = z))
          : (z = i[27]);
        i[28] !== v || i[29] !== z || i[30] !== x
          ? ((G = (0, M.jsxs)(n.default, { style: x, children: [v, z] })),
            (i[28] = v),
            (i[29] = z),
            (i[30] = x),
            (i[31] = G))
          : (G = i[31]);
        return G;
      }),
      (_e.BagShoes = function (e) {
        const i = (0, t.c)(2),
          { size: l } = e,
          s = 0.9 * (void 0 === l ? 120 : l);
        let o;
        i[0] !== s
          ? ((o = (0, M.jsx)(A, { name: "bag", width: s })),
            (i[0] = s),
            (i[1] = o))
          : (o = i[1]);
        return o;
      }),
      (_e.DrawnBand = function (e) {
        const i = (0, t.c)(16),
          { name: l, note: s, bg: o, ink: c, width: h, style: d } = e,
          f = void 0 === h ? 150 : h,
          { theme: u } = (0, x.useTokens)(),
          j = o ?? u.tint;
        let y, w, k, p, L, C;
        i[0] !== j
          ? ((y = {
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 8,
              backgroundColor: j,
              borderRadius: 24,
              paddingLeft: 18,
              paddingRight: 10,
              paddingVertical: 12,
              overflow: "hidden",
            }),
            (i[0] = j),
            (i[1] = y))
          : (y = i[1]);
        i[2] !== d || i[3] !== y
          ? ((w = [y, d]), (i[2] = d), (i[3] = y), (i[4] = w))
          : (w = i[4]);
        i[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((k = { flex: 1, minWidth: 0 }), (i[5] = k))
          : (k = i[5]);
        i[6] !== c || i[7] !== s
          ? ((p = (0, M.jsx)(E, {
              align: "left",
              size: 21,
              tilt: -6,
              color: c,
              style: k,
              children: s,
            })),
            (i[6] = c),
            (i[7] = s),
            (i[8] = p))
          : (p = i[8]);
        i[9] !== l || i[10] !== f
          ? ((L = (0, M.jsx)(A, { name: l, width: f, float: !0 })),
            (i[9] = l),
            (i[10] = f),
            (i[11] = L))
          : (L = i[11]);
        i[12] !== w || i[13] !== p || i[14] !== L
          ? ((C = (0, M.jsxs)(n.default, { style: w, children: [p, L] })),
            (i[12] = w),
            (i[13] = p),
            (i[14] = L),
            (i[15] = C))
          : (C = i[15]);
        return C;
      }),
      (_e.WalletArt = function (e) {
        const i = (0, t.c)(28),
          { size: s } = e,
          o = void 0 === s ? 110 : s,
          d = b(3, 3800),
          f = 0.8 * o;
        let x;
        i[0] !== o || i[1] !== f
          ? ((x = { width: o, height: f }), (i[0] = o), (i[1] = f), (i[2] = x))
          : (x = i[2]);
        const u = 0.8 * o;
        let j, y, w, k, p, L, C, v, P, D;
        i[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((w = (0, M.jsx)(c.Ellipse, {
              cx: 100,
              cy: 150,
              rx: 70,
              ry: 7,
              fill: "#0D1A14",
              opacity: 0.08,
            })),
            (k = (0, M.jsx)(c.Rect, {
              x: 46,
              y: 26,
              width: 104,
              height: 64,
              rx: 10,
              fill: "#6AD67D",
              ...R,
              transform: "rotate(-8 98 58)",
            })),
            (p = (0, M.jsx)(c.Path, {
              d: "M56 46 L146 34",
              stroke: _,
              strokeWidth: 6,
              opacity: 0.85,
            })),
            (L = (0, M.jsx)(c.Rect, {
              x: 28,
              y: 52,
              width: 144,
              height: 92,
              rx: 18,
              fill: "#C48C57",
              ...R,
            })),
            (C = (0, M.jsx)(c.Path, {
              d: "M28 76 H172",
              ...R,
              strokeWidth: 2.4,
              opacity: 0.5,
            })),
            (j = (0, M.jsx)(c.Rect, {
              x: 128,
              y: 84,
              width: 56,
              height: 34,
              rx: 12,
              fill: "#DBA871",
              ...R,
            })),
            (y = (0, M.jsx)(c.Circle, {
              cx: 146,
              cy: 101,
              r: 6,
              fill: "#F6EBD9",
              stroke: _,
              strokeWidth: 2,
            })),
            (i[3] = j),
            (i[4] = y),
            (i[5] = w),
            (i[6] = k),
            (i[7] = p),
            (i[8] = L),
            (i[9] = C))
          : ((j = i[3]),
            (y = i[4]),
            (w = i[5]),
            (k = i[6]),
            (p = i[7]),
            (L = i[8]),
            (C = i[9]));
        i[10] !== o || i[11] !== u
          ? ((v = (0, M.jsxs)(h.default, {
              width: o,
              height: u,
              viewBox: "0 0 200 160",
              children: [w, k, p, L, C, j, y],
            })),
            (i[10] = o),
            (i[11] = u),
            (i[12] = v))
          : (v = i[12]);
        i[13] === Symbol.for("react.memo_cache_sentinel")
          ? ((P = { position: "absolute", left: 0, top: 0 }), (i[13] = P))
          : (P = i[13]);
        i[14] !== d ? ((D = [P, d]), (i[14] = d), (i[15] = D)) : (D = i[15]);
        const B = 0.8 * o;
        let A, E, W, S, Z;
        i[16] === Symbol.for("react.memo_cache_sentinel")
          ? ((A = (0, M.jsx)(c.Circle, {
              cx: 44,
              cy: 36,
              r: 22,
              fill: "#F5C451",
              ...R,
            })),
            (E = (0, M.jsx)(c.Path, {
              d: "M38 26 v18 h14 M44 24 v-4 M50 24 v-4 M36 34 a10 10 0 1 1 16 8",
              fill: "none",
              stroke: _,
              strokeWidth: 2.6,
              strokeLinecap: "round",
            })),
            (i[16] = A),
            (i[17] = E))
          : ((A = i[16]), (E = i[17]));
        i[18] !== o || i[19] !== B
          ? ((W = (0, M.jsxs)(h.default, {
              width: o,
              height: B,
              viewBox: "0 0 200 160",
              children: [A, E],
            })),
            (i[18] = o),
            (i[19] = B),
            (i[20] = W))
          : (W = i[20]);
        i[21] !== D || i[22] !== W
          ? ((S = (0, M.jsx)(l.default.View, {
              style: D,
              pointerEvents: "none",
              children: W,
            })),
            (i[21] = D),
            (i[22] = W),
            (i[23] = S))
          : (S = i[23]);
        i[24] !== v || i[25] !== S || i[26] !== x
          ? ((Z = (0, M.jsxs)(n.default, { style: x, children: [v, S] })),
            (i[24] = v),
            (i[25] = S),
            (i[26] = x),
            (i[27] = Z))
          : (Z = i[27]);
        return Z;
      }),
      (_e.GiftArt = function (e) {
        const i = (0, t.c)(19),
          { size: s } = e,
          o = void 0 === s ? 110 : s,
          n = b(3, 3400),
          d = 0.9 * o;
        let f, x;
        i[0] !== o || i[1] !== d
          ? ((f = { width: o, height: d }), (i[0] = o), (i[1] = d), (i[2] = f))
          : (f = i[2]);
        i[3] !== n || i[4] !== f
          ? ((x = [f, n]), (i[3] = n), (i[4] = f), (i[5] = x))
          : (x = i[5]);
        const u = 0.9 * o;
        let j, y, w, k, p, L, C, v, _;
        i[6] === Symbol.for("react.memo_cache_sentinel")
          ? ((k = (0, M.jsx)(c.Ellipse, {
              cx: 100,
              cy: 170,
              rx: 70,
              ry: 7,
              fill: "#0D1A14",
              opacity: 0.08,
            })),
            (p = (0, M.jsx)(c.Rect, {
              x: 40,
              y: 84,
              width: 120,
              height: 80,
              rx: 8,
              fill: "#6AD67D",
              ...R,
            })),
            (L = (0, M.jsx)(c.Rect, {
              x: 30,
              y: 60,
              width: 140,
              height: 30,
              rx: 8,
              fill: "#88DE97",
              ...R,
            })),
            (C = (0, M.jsx)(c.Rect, {
              x: 90,
              y: 60,
              width: 20,
              height: 104,
              fill: "#E5484D",
              ...R,
            })),
            (j = (0, M.jsx)(c.Path, {
              d: "M100 60 C80 30 50 34 58 52 C64 64 88 62 100 60 Z",
              fill: "#E5484D",
              ...R,
            })),
            (y = (0, M.jsx)(c.Path, {
              d: "M100 60 C120 30 150 34 142 52 C136 64 112 62 100 60 Z",
              fill: "#E5484D",
              ...R,
            })),
            (w = (0, M.jsx)(c.Path, {
              d: "M150 30 l3 8 l8 3 l-8 3 l-3 8 l-3 -8 l-8 -3 l8 -3 Z M40 26 l2 5 l5 2 l-5 2 l-2 5 l-2 -5 l-5 -2 l5 -2 Z",
              fill: "#F5C451",
            })),
            (i[6] = j),
            (i[7] = y),
            (i[8] = w),
            (i[9] = k),
            (i[10] = p),
            (i[11] = L),
            (i[12] = C))
          : ((j = i[6]),
            (y = i[7]),
            (w = i[8]),
            (k = i[9]),
            (p = i[10]),
            (L = i[11]),
            (C = i[12]));
        i[13] !== o || i[14] !== u
          ? ((v = (0, M.jsxs)(h.default, {
              width: o,
              height: u,
              viewBox: "0 0 200 180",
              children: [k, p, L, C, j, y, w],
            })),
            (i[13] = o),
            (i[14] = u),
            (i[15] = v))
          : (v = i[15]);
        i[16] !== v || i[17] !== x
          ? ((_ = (0, M.jsx)(l.default.View, { style: x, children: v })),
            (i[16] = v),
            (i[17] = x),
            (i[18] = _))
          : (_ = i[18]);
        return _;
      }),
      (_e.PlaneArt = function (e) {
        const i = (0, t.c)(23),
          { size: s, color: o } = e,
          d = void 0 === s ? 120 : s,
          f = b(4, 3e3),
          x = o ?? _,
          u = 0.6 * d;
        let j;
        i[0] !== d || i[1] !== u
          ? ((j = { width: d, height: u }), (i[0] = d), (i[1] = u), (i[2] = j))
          : (j = i[2]);
        const y = 0.6 * d;
        let w, k, p;
        i[3] === Symbol.for("react.memo_cache_sentinel")
          ? ((w = { position: "absolute" }), (i[3] = w))
          : (w = i[3]);
        i[4] !== x
          ? ((k = (0, M.jsx)(c.Path, {
              d: "M8 100 C50 96 80 70 120 64",
              fill: "none",
              stroke: x,
              strokeWidth: 2.4,
              strokeDasharray: "6 7",
              strokeLinecap: "round",
            })),
            (i[4] = x),
            (i[5] = k))
          : (k = i[5]);
        i[6] !== d || i[7] !== y || i[8] !== k
          ? ((p = (0, M.jsx)(h.default, {
              width: d,
              height: y,
              viewBox: "0 0 200 120",
              style: w,
              children: k,
            })),
            (i[6] = d),
            (i[7] = y),
            (i[8] = k),
            (i[9] = p))
          : (p = i[9]);
        const L = 0.6 * d;
        let C, v, P, D;
        i[10] !== x
          ? ((C = (0, M.jsxs)(c.G, {
              transform: "rotate(-18 150 50)",
              children: [
                (0, M.jsx)(c.Path, {
                  d: "M100 52 C100 46 106 42 116 42 L178 42 C190 42 196 48 196 52 C196 56 190 62 178 62 L116 62 C106 62 100 58 100 52 Z",
                  fill: "#fff",
                  stroke: x,
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                }),
                (0, M.jsx)(c.Path, {
                  d: "M140 44 L122 14 L134 14 L162 44 Z M140 60 L122 90 L134 90 L162 60 Z M104 50 L94 30 L102 30 L114 46 Z",
                  fill: "#fff",
                  stroke: x,
                  strokeWidth: 3,
                  strokeLinejoin: "round",
                }),
                (0, M.jsx)(c.Path, {
                  d: "M150 50 h4 M160 50 h4 M170 50 h4",
                  stroke: x,
                  strokeWidth: 2.4,
                  strokeLinecap: "round",
                }),
                (0, M.jsx)(c.Path, {
                  d: "M186 46 C190 48 192 50 192 52",
                  stroke: x,
                  strokeWidth: 4,
                  strokeLinecap: "round",
                }),
              ],
            })),
            (i[10] = x),
            (i[11] = C))
          : (C = i[11]);
        i[12] !== d || i[13] !== L || i[14] !== C
          ? ((v = (0, M.jsx)(h.default, {
              width: d,
              height: L,
              viewBox: "0 0 200 120",
              children: C,
            })),
            (i[12] = d),
            (i[13] = L),
            (i[14] = C),
            (i[15] = v))
          : (v = i[15]);
        i[16] !== f || i[17] !== v
          ? ((P = (0, M.jsx)(l.default.View, { style: f, children: v })),
            (i[16] = f),
            (i[17] = v),
            (i[18] = P))
          : (P = i[18]);
        i[19] !== P || i[20] !== j || i[21] !== p
          ? ((D = (0, M.jsxs)(n.default, { style: j, children: [p, P] })),
            (i[19] = P),
            (i[20] = j),
            (i[21] = p),
            (i[22] = D))
          : (D = i[22]);
        return D;
      }),
      (_e.DrawnBird = function (e) {
        const i = (0, t.c)(15),
          { size: s, float: o, fill: n } = e,
          d = void 0 === s ? 56 : s,
          f = void 0 !== o && o,
          x = void 0 === n ? "#6AD67D" : n,
          u = b(f ? 5 : 0, 3400),
          y = 1.0357142857142858 * d;
        let w;
        i[0] !== y || i[1] !== d
          ? ((w = { width: d, height: y }), (i[0] = y), (i[1] = d), (i[2] = w))
          : (w = i[2]);
        const k = f ? u : null;
        let p, L, C, v;
        i[3] !== w || i[4] !== k
          ? ((p = [w, k]), (i[3] = w), (i[4] = k), (i[5] = p))
          : (p = i[5]);
        i[6] !== x
          ? ((L = j.default.map((e, t) => {
              const [i, l] = e;
              return "f" === i
                ? (0, M.jsx)(c.Path, { d: l, fill: x }, t)
                : (0, M.jsx)(
                    c.Path,
                    {
                      d: l,
                      fill: "none",
                      stroke: _,
                      strokeWidth: "h" === i ? 9 : 13,
                      strokeOpacity: "h" === i ? 0.55 : 1,
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                    },
                    t,
                  );
            })),
            (i[6] = x),
            (i[7] = L))
          : (L = i[7]);
        i[8] !== y || i[9] !== d || i[10] !== L
          ? ((C = (0, M.jsx)(h.default, {
              width: d,
              height: y,
              viewBox: "-20 -20 560 580",
              children: L,
            })),
            (i[8] = y),
            (i[9] = d),
            (i[10] = L),
            (i[11] = C))
          : (C = i[11]);
        i[12] !== p || i[13] !== C
          ? ((v = (0, M.jsx)(l.default.View, { style: p, children: C })),
            (i[12] = p),
            (i[13] = C),
            (i[14] = v))
          : (v = i[14]);
        return v;
      }));
    var t = r(_d[0]),
      i = r(_d[1]),
      l = e(r(_d[2])),
      s = e(r(_d[3])),
      o = e(r(_d[4])),
      n = e(r(_d[5])),
      c = r(_d[6]),
      h = e(c),
      d = r(_d[7]),
      f = r(_d[8]),
      x = r(_d[9]),
      u = e(r(_d[10])),
      j = e(r(_d[11])),
      y = e(r(_d[12])),
      w = e(r(_d[13])),
      k = e(r(_d[14])),
      p = e(r(_d[15])),
      L = e(r(_d[16])),
      C = e(r(_d[17])),
      v = e(r(_d[18])),
      M = r(_d[19]);
    const _ = "#16202A",
      P =
        "M52.8623 16.9605C52.8623 17.0807 52.7806 17.1718 52.662 17.1931L39.6778 19.023C40.3875 21.3258 41.1905 24.8421 40.2358 29.0058C39.4328 32.4988 37.4827 35.3929 34.5934 37.3759C31.5544 39.4578 28.2782 40.0451 25.9761 39.9598L11.0554 54.8411H3L19.3732 38.5138C16.8397 37.5 14.3918 35.9822 12.2667 34.0612C2.25532 25.0321 2.28254 12.1765 4.14521 3L27.9768 23.9756V31.3222L8.89909 14.5317C9.08964 18.8834 10.4857 25.0301 15.9628 29.9808C19.6104 33.2742 24.2301 34.9529 28.0235 34.3481C31.4941 33.7995 34.1073 31.3125 34.8423 27.8602C35.6569 24.0299 34.4592 20.5698 31.2978 17.8657L34.9492 14.2293L52.664 16.7318C52.7826 16.7473 52.8643 16.8422 52.8643 16.9605H52.8623Z",
      D = {
        hero: { xml: w.default, ratio: 1.7567567567567568 },
        bird: { xml: u.default, ratio: 1.25 },
        bag: { xml: y.default, ratio: 0.9352941176470588 },
        parcels: { xml: L.default, ratio: 0.8743169398907104 },
        money: { xml: p.default, ratio: 0.966183574879227 },
        support: { xml: v.default, ratio: 0.9807692307692307 },
        how: { xml: k.default, ratio: 0.6479591836734694 },
        shop: { xml: C.default, ratio: 0.8518518518518519 },
      };
    function b(e = 5, t = 3600) {
      const o = (0, i.useRef)(new l.default.Value(0)).current;
      return (
        (0, i.useEffect)(() => {
          const e = l.default.loop(
            l.default.sequence([
              l.default.timing(o, {
                toValue: 1,
                duration: t / 2,
                easing: s.default.inOut(s.default.sin),
                useNativeDriver: !0,
              }),
              l.default.timing(o, {
                toValue: 0,
                duration: t / 2,
                easing: s.default.inOut(s.default.sin),
                useNativeDriver: !0,
              }),
            ]),
          );
          return (e.start(), () => e.stop());
        }, [o, t]),
        {
          transform: [
            {
              translateY: o.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -e],
              }),
            },
          ],
        }
      );
    }
    function B(e) {
      const i = (0, t.c)(8),
        { children: l, style: s } = e,
        { isDark: o } = (0, x.useTokens)();
      let c, h, d;
      return (
        i[0] !== o
          ? ((c = o
              ? { backgroundColor: "#F3F1EC", borderRadius: 20, padding: 6 }
              : null),
            (i[0] = o),
            (i[1] = c))
          : (c = i[1]),
        i[2] !== s || i[3] !== c
          ? ((h = [c, s]), (i[2] = s), (i[3] = c), (i[4] = h))
          : (h = i[4]),
        i[5] !== l || i[6] !== h
          ? ((d = (0, M.jsx)(n.default, { style: h, children: l })),
            (i[5] = l),
            (i[6] = h),
            (i[7] = d))
          : (d = i[7]),
        d
      );
    }
    function A(e) {
      const i = (0, t.c)(10),
        { name: s, width: o, float: n, style: h } = e,
        d = void 0 !== n && n,
        { xml: f, ratio: x } = D[s],
        u = b(d ? 5 : 0),
        j = d ? u : void 0,
        y = o / x;
      let w, k, p;
      return (
        i[0] !== y || i[1] !== o || i[2] !== f
          ? ((w = (0, M.jsx)(c.SvgXml, { xml: f, width: o, height: y })),
            (i[0] = y),
            (i[1] = o),
            (i[2] = f),
            (i[3] = w))
          : (w = i[3]),
        i[4] !== j || i[5] !== w
          ? ((k = (0, M.jsx)(l.default.View, { style: j, children: w })),
            (i[4] = j),
            (i[5] = w),
            (i[6] = k))
          : (k = i[6]),
        i[7] !== h || i[8] !== k
          ? ((p = (0, M.jsx)(B, { style: h, children: k })),
            (i[7] = h),
            (i[8] = k),
            (i[9] = p))
          : (p = i[9]),
        p
      );
    }
    function E(e) {
      const i = (0, t.c)(29),
        {
          children: l,
          align: s,
          size: u,
          tilt: j,
          color: y,
          heart: w,
          style: k,
        } = e,
        p = void 0 === s ? "right" : s,
        L = void 0 === u ? 18 : u,
        C = void 0 === j ? -5 : j,
        v = void 0 === w || w,
        { theme: _ } = (0, x.useTokens)(),
        P = (0, d.useLang)(),
        D = y ?? _.ink,
        b = `${C}deg`;
      let B;
      i[0] !== b ? ((B = [{ rotate: b }]), (i[0] = b), (i[1] = B)) : (B = i[1]);
      const A = "right" === p ? "flex-end" : "flex-start";
      let E, R, W;
      (i[2] !== B || i[3] !== A
        ? ((E = { transform: B, alignItems: A }),
          (i[2] = B),
          (i[3] = A),
          (i[4] = E))
        : (E = i[4]),
        i[5] !== k || i[6] !== E
          ? ((R = [E, k]), (i[5] = k), (i[6] = E), (i[7] = R))
          : (R = i[7]),
        i[8] !== P
          ? ((W = (0, f.noteFont)(P)), (i[8] = P), (i[9] = W))
          : (W = i[9]));
      const S = "ka" === P ? 0.78 * L : L,
        Z = 1.18 * ("ka" === P ? 0.78 * L : L);
      let F, V, z, G, T;
      return (
        i[10] !== p || i[11] !== D || i[12] !== S || i[13] !== Z
          ? ((F = { color: D, fontSize: S, lineHeight: Z, textAlign: p }),
            (i[10] = p),
            (i[11] = D),
            (i[12] = S),
            (i[13] = Z),
            (i[14] = F))
          : (F = i[14]),
        i[15] !== W || i[16] !== F
          ? ((V = [W, F]), (i[15] = W), (i[16] = F), (i[17] = V))
          : (V = i[17]),
        i[18] !== l || i[19] !== V
          ? ((z = (0, M.jsx)(o.default, { style: V, children: l })),
            (i[18] = l),
            (i[19] = V),
            (i[20] = z))
          : (z = i[20]),
        i[21] !== y || i[22] !== v || i[23] !== _
          ? ((G = v
              ? (0, M.jsx)(h.default, {
                  width: 22,
                  height: 22,
                  viewBox: "0 0 24 24",
                  style: { marginTop: 4 },
                  children: (0, M.jsx)(c.Path, {
                    d: "M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z",
                    fill: "none",
                    stroke: y ?? _.brandText,
                    strokeWidth: 1.7,
                    strokeLinejoin: "round",
                  }),
                })
              : null),
            (i[21] = y),
            (i[22] = v),
            (i[23] = _),
            (i[24] = G))
          : (G = i[24]),
        i[25] !== z || i[26] !== G || i[27] !== R
          ? ((T = (0, M.jsxs)(n.default, { style: R, children: [z, G] })),
            (i[25] = z),
            (i[26] = G),
            (i[27] = R),
            (i[28] = T))
          : (T = i[28]),
        T
      );
    }
    const R = {
      stroke: _,
      strokeWidth: 3,
      strokeLinejoin: "round",
      strokeLinecap: "round",
    };
    function W(e) {
      return (0, M.jsx)(
        c.Rect,
        { x: 112, y: 58 + 8 * e, width: 60, height: 4, fill: "#D9262E" },
        e,
      );
    }
  },
  899,
  [
    11, 13, 305, 382, 100, 192, 250, 877, 891, 890, 900, 901, 902, 903, 904,
    905, 906, 907, 908, 6,
  ],
);