__d(
  function (g, _r, _i, a, m, e, d) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.useContent = i),
      (e.useCmsText = function () {
        const t = (0, n.c)(3),
          { data: r } = i(),
          o = (0, c.useLang)();
        let u;
        t[0] !== r || t[1] !== o
          ? ((u = (n, t) => {
              const c = void 0 === t ? "" : t,
                i = r?.find((t) => t.identifier === n);
              return (i && ("ka" === o ? i.nameKa : i.nameEn)) || c;
            }),
            (t[0] = r),
            (t[1] = o),
            (t[2] = u))
          : (u = t[2]);
        return u;
      }),
      (e.useCategories = function () {
        const t = (0, n.c)(4),
          { data: r } = i(),
          o = (0, c.useLang)();
        if (!r) {
          let n;
          return (
            t[0] === Symbol.for("react.memo_cache_sentinel")
              ? ((n = []), (t[0] = n))
              : (n = t[0]),
            n
          );
        }
        let s;
        t[1] !== r || t[2] !== o
          ? ((s = Array.from({ length: 25 }, (n, t) => {
              const c = r.find((n) => n.identifier === `Category_${t + 1}`);
              return (c && ("ka" === o ? c.nameKa : c.nameEn)) || null;
            }).filter(u)),
            (t[1] = r),
            (t[2] = o),
            (t[3] = s))
          : (s = t[3]);
        return s;
      }));
    var n = _r(d[0]),
      t = _r(d[1]),
      r = _r(d[2]),
      c = _r(d[3]);
    function i() {
      const r = (0, n.c)(1);
      let c;
      return (
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((c = {
              queryKey: ["content"],
              staleTime: 1 / 0,
              gcTime: 1 / 0,
              queryFn: o,
            }),
            (r[0] = c))
          : (c = r[0]),
        (0, t.useQuery)(c)
      );
    }
    async function o() {
      const { data: n } = await r.api.get("/content-management");
      return Array.isArray(n) ? n : [];
    }
    function u(n) {
      return !!n;
    }
  },
  1163,
  [11, 921, 968, 877],
);