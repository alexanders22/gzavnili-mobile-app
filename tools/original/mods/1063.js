__d(
  function (g, _r, _i, a, m, _e, d) {
    "use strict";
    (Object.defineProperty(_e, "__esModule", { value: !0 }),
      (_e.TileGrid = function (e) {
        const t = (0, l.c)(4),
          { children: c, columns: u, gap: h } = e,
          x = void 0 === h ? r.space.md : h,
          p = (0, i.useColumns)(),
          y = u ?? p;
        let _;
        if (t[0] !== c || t[1] !== y || t[2] !== x) {
          const e = c.filter(Boolean),
            l = [];
          for (let t = 0; t < e.length; t += y, t) l.push(e.slice(t, t + y));
          ((_ = (0, s.jsx)(s.Fragment, {
            children: l.map((e, l) =>
              (0, s.jsxs)(
                n.default,
                {
                  style: { flexDirection: "row", gap: x, marginTop: x },
                  children: [
                    e.map(f),
                    Array.from({ length: y - e.length }).map(o),
                  ],
                },
                l,
              ),
            ),
          })),
            (t[0] = c),
            (t[1] = y),
            (t[2] = x),
            (t[3] = _));
        } else _ = t[3];
        return _;
      }),
      (_e.TwoCol = function (e) {
        const t = (0, l.c)(15),
          { main: r, side: o, gap: f } = e,
          c = void 0 === f ? 24 : f;
        if (!(0, i.useIsDesktop)()) {
          let e;
          return (
            t[0] !== r || t[1] !== o
              ? ((e = (0, s.jsxs)(s.Fragment, { children: [r, o] })),
                (t[0] = r),
                (t[1] = o),
                (t[2] = e))
              : (e = t[2]),
            e
          );
        }
        let u, h, x, p, y, _;
        t[3] !== c
          ? ((u = { flexDirection: "row", gap: c, alignItems: "flex-start" }),
            (t[3] = c),
            (t[4] = u))
          : (u = t[4]);
        t[5] === Symbol.for("react.memo_cache_sentinel")
          ? ((h = { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 }),
            (t[5] = h))
          : (h = t[5]);
        t[6] !== r
          ? ((x = (0, s.jsx)(n.default, { style: h, children: r })),
            (t[6] = r),
            (t[7] = x))
          : (x = t[7]);
        t[8] === Symbol.for("react.memo_cache_sentinel")
          ? ((p = { width: 320, flexShrink: 0 }), (t[8] = p))
          : (p = t[8]);
        t[9] !== o
          ? ((y = (0, s.jsx)(n.default, { style: p, children: o })),
            (t[9] = o),
            (t[10] = y))
          : (y = t[10]);
        t[11] !== u || t[12] !== x || t[13] !== y
          ? ((_ = (0, s.jsxs)(n.default, { style: u, children: [x, y] })),
            (t[11] = u),
            (t[12] = x),
            (t[13] = y),
            (t[14] = _))
          : (_ = t[14]);
        return _;
      }));
    var e,
      l = _r(d[0]),
      t = _r(d[1]),
      n = (e = t) && e.__esModule ? e : { default: e },
      r = _r(d[2]),
      i = _r(d[3]),
      s = _r(d[4]);
    function o(e, l) {
      return (0, s.jsx)(
        n.default,
        { style: { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 } },
        `spacer-${l}`,
      );
    }
    function f(e, l) {
      return (0, s.jsx)(
        n.default,
        {
          style: { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 },
          children: e,
        },
        l,
      );
    }
  },
  1063,
  [11, 192, 895, 893, 6],
);