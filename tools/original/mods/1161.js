__d(
  function (g, r, i, a, m, e, d) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.SignatureFrame = function (o) {
        const c = (0, t.c)(7),
          { url: u, onSigned: f, onRejected: l } = o;
        let _, v, w, b;
        c[0] !== l || c[1] !== f
          ? ((_ = () => {
              const t = (t) => {
                const n = t.data?.type;
                "sign" === n ? f() : "rejected" === n && l?.();
              };
              return (
                window.addEventListener("message", t),
                () => window.removeEventListener("message", t)
              );
            }),
            (v = [f, l]),
            (c[0] = l),
            (c[1] = f),
            (c[2] = _),
            (c[3] = v))
          : ((_ = c[2]), (v = c[3]));
        ((0, n.useEffect)(_, v),
          c[4] === Symbol.for("react.memo_cache_sentinel")
            ? ((w = {
                width: "100%",
                height: "100%",
                border: 0,
                borderRadius: 16,
              }),
              (c[4] = w))
            : (w = c[4]));
        c[5] !== u
          ? ((b = (0, s.jsx)("iframe", { src: u, style: w })),
            (c[5] = u),
            (c[6] = b))
          : (b = c[6]);
        return b;
      }));
    var t = r(d[0]),
      n = r(d[1]),
      s = r(d[2]);
  },
  1161,
  [11, 13, 6],
);