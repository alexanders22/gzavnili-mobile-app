__d(
  function (g, _r, i, a, _m, e, d) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      Object.defineProperty(e, "USA_BRANCH_ID", {
        enumerable: !0,
        get: function () {
          return s;
        },
      }),
      (e.useLogin = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = { mutationFn: o, onSuccess: () => u.clear() }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useRegister = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = { mutationFn: c, onSuccess: () => u.clear() }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useReferralCheck = function (u) {
        const s = (0, t.c)(14);
        let o, c, y, l, m;
        s[0] !== u
          ? ((l = u.trim()),
            (y = n.useQuery),
            (o = "referralCheck"),
            (c = l.toUpperCase()),
            (s[0] = u),
            (s[1] = o),
            (s[2] = c),
            (s[3] = y),
            (s[4] = l))
          : ((o = s[1]), (c = s[2]), (y = s[3]), (l = s[4]));
        s[5] !== o || s[6] !== c
          ? ((m = [o, c]), (s[5] = o), (s[6] = c), (s[7] = m))
          : (m = s[7]);
        const f = l.length >= 6;
        let p, Q;
        s[8] !== l
          ? ((p = async () => {
              const { data: t } = await r.authApi.get(
                `/v1/auth/referral/${encodeURIComponent(l)}`,
              );
              return t;
            }),
            (s[8] = l),
            (s[9] = p))
          : (p = s[9]);
        s[10] !== m || s[11] !== f || s[12] !== p
          ? ((Q = { queryKey: m, enabled: f, retry: !1, queryFn: p }),
            (s[10] = m),
            (s[11] = f),
            (s[12] = p),
            (s[13] = Q))
          : (Q = s[13]);
        return y(Q);
      }),
      (e.signOut = async function () {
        await (0, u.clearToken)();
      }),
      (e.useSignOut = function () {
        const r = (0, t.c)(2),
          s = (0, n.useQueryClient)();
        let o;
        r[0] !== s
          ? ((o = async () => {
              (await (0, u.clearToken)(), s.clear());
            }),
            (r[0] = s),
            (r[1] = o))
          : (o = r[1]);
        return o;
      }),
      (e.useCustomer = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = {
              queryKey: ["customer"],
              refetchInterval: 8e3,
              queryFn: y,
              retry: !1,
            }),
            (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useOrders = l),
      (e.useStatusQuantity = function (u) {
        const s = (0, t.c)(8);
        let o;
        s[0] !== u
          ? ((o = ["statusQuantity", u]), (s[0] = u), (s[1] = o))
          : (o = s[1]);
        const c = !!u;
        let y, l;
        s[2] !== u
          ? ((y = async () => {
              const { data: t } = await r.api.get(
                `/orders/statusQuantity/${u}`,
              );
              return t ?? {};
            }),
            (s[2] = u),
            (s[3] = y))
          : (y = s[3]);
        s[4] !== o || s[5] !== c || s[6] !== y
          ? ((l = {
              queryKey: o,
              refetchInterval: 8e3,
              enabled: c,
              queryFn: y,
            }),
            (s[4] = o),
            (s[5] = c),
            (s[6] = y),
            (s[7] = l))
          : (l = s[7]);
        return (0, n.useQuery)(l);
      }),
      (e.useAddOrder = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: m,
              onSuccess: () => {
                (u.invalidateQueries({ queryKey: ["orders"] }),
                  u.invalidateQueries({ queryKey: ["statusQuantity"] }),
                  u.invalidateQueries({ queryKey: ["recipients"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useRecipients = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["recipients"], queryFn: f }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useTimeSlots = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["timeSlots"], queryFn: p }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useDistrict = function (u, s) {
        const o = (0, t.c)(10);
        let c;
        o[0] !== u || o[1] !== s
          ? ((c = ["district", u, s]), (o[0] = u), (o[1] = s), (o[2] = c))
          : (c = o[2]);
        const y = !!u && !!s;
        let l, m;
        o[3] !== u || o[4] !== s
          ? ((l = async () => {
              const { data: t } = await r.api.get(
                `/district/find?lat=${u}&lng=${s}`,
              );
              return t ?? null;
            }),
            (o[3] = u),
            (o[4] = s),
            (o[5] = l))
          : (l = o[5]);
        o[6] !== c || o[7] !== y || o[8] !== l
          ? ((m = { queryKey: c, enabled: y, retry: !1, queryFn: l }),
            (o[6] = c),
            (o[7] = y),
            (o[8] = l),
            (o[9] = m))
          : (m = o[9]);
        return (0, n.useQuery)(m);
      }),
      (e.useBookDelivery = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: Q,
              onSuccess: () => u.invalidateQueries({ queryKey: ["orders"] }),
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useCustomerAddresses = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["customerAddresses"], queryFn: w }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useCreateAddress = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: q,
              onSuccess: () =>
                u.invalidateQueries({ queryKey: ["customerAddresses"] }),
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useCards = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["cards"], queryFn: _, retry: !1 }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useOrderPrices = function (u, s, o) {
        const c = (0, t.c)(12);
        let y;
        c[0] !== s || c[1] !== o || c[2] !== u
          ? ((y = ["orderPrices", u, s, o]),
            (c[0] = s),
            (c[1] = o),
            (c[2] = u),
            (c[3] = y))
          : (y = c[3]);
        const l = u.length > 0 && (!!s || !0 === o);
        let m, f;
        c[4] !== s || c[5] !== o || c[6] !== u
          ? ((m = async () => {
              const { data: t } = await r.api.post("/orders/getOrderPrices", {
                orders: u,
                address_id: s,
                payed: !1,
                ...(void 0 !== o ? { office_pickup: o } : {}),
              });
              return { perOrder: t?.[0] ?? [], totals: t?.[1]?.[0] ?? null };
            }),
            (c[4] = s),
            (c[5] = o),
            (c[6] = u),
            (c[7] = m))
          : (m = c[7]);
        c[8] !== y || c[9] !== l || c[10] !== m
          ? ((f = { queryKey: y, enabled: l, queryFn: m }),
            (c[8] = y),
            (c[9] = l),
            (c[10] = m),
            (c[11] = f))
          : (f = c[11]);
        return (0, n.useQuery)(f);
      }),
      (e.usePayOrders = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { mutationFn: S }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useMutation)(u);
      }),
      (e.usePaymentStatus = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: h,
              onSuccess: () => {
                (u.invalidateQueries({ queryKey: ["orders"] }),
                  u.invalidateQueries({ queryKey: ["unpaid"] }),
                  u.invalidateQueries({ queryKey: ["statusQuantity"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useUpdateCustomStatus = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: K,
              onSuccess: () => {
                (u.invalidateQueries({ queryKey: ["orders"] }),
                  u.invalidateQueries({ queryKey: ["nusxa"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useNusxaBundle = function (u) {
        const s = (0, t.c)(8);
        let o;
        s[0] !== u ? ((o = ["nusxa", u]), (s[0] = u), (s[1] = o)) : (o = s[1]);
        const c = !!u;
        let y, l;
        s[2] !== u
          ? ((y = async () => {
              const { data: t } = await r.api.get(`/orders/getByNusxa/${u}`);
              return Array.isArray(t) ? t : [];
            }),
            (s[2] = u),
            (s[3] = y))
          : (y = s[3]);
        s[4] !== o || s[5] !== c || s[6] !== y
          ? ((l = { queryKey: o, enabled: c, queryFn: y, retry: !1 }),
            (s[4] = o),
            (s[5] = c),
            (s[6] = y),
            (s[7] = l))
          : (l = s[7]);
        return (0, n.useQuery)(l);
      }),
      (e.useSignatureLink = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { mutationFn: v }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useMutation)(u);
      }),
      (e.useShops = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["shops"], staleTime: 1 / 0, queryFn: C }),
            (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useAddDeclaration = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: M,
              onSuccess: () => u.invalidateQueries({ queryKey: ["orders"] }),
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useDeleteDeclaration = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: k,
              onSuccess: () => u.invalidateQueries({ queryKey: ["orders"] }),
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useDeclareOrder = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: D,
              onSuccess: () => {
                (u.invalidateQueries({ queryKey: ["orders"] }),
                  u.invalidateQueries({ queryKey: ["statusQuantity"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useUpdateWrapping = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: I,
              onSuccess: () => u.invalidateQueries({ queryKey: ["orders"] }),
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useRenameOrder = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: O,
              onSuccess: () => u.invalidateQueries({ queryKey: ["orders"] }),
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useOrderFromList = function (n, r) {
        const u = (0, t.c)(6),
          s = l(n);
        let o, c;
        u[0] !== r || u[1] !== s.data
          ? ((o = s.data?.find((t) => t.id === r)),
            (u[0] = r),
            (u[1] = s.data),
            (u[2] = o))
          : (o = u[2]);
        u[3] !== s || u[4] !== o
          ? ((c = { ...s, data: o }), (u[3] = s), (u[4] = o), (u[5] = c))
          : (c = u[5]);
        return c;
      }),
      (e.useWarehouseAddresses = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["addresses"], queryFn: $ }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useTransactions = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["transactions"], queryFn: T, retry: !1 }),
            (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useUpdateProfile = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: P,
              onSuccess: (t) => {
                (u.setQueryData(["customer"], t),
                  u.invalidateQueries({ queryKey: ["customerAddresses"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useTranslateFields = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { mutationFn: R }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useMutation)(u);
      }),
      (e.useDemoTracking = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { mutationFn: E }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useMutation)(u);
      }),
      (e.useOutgoing = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["outgoing"], refetchInterval: 8e3, queryFn: U }),
            (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useOutCountries = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["outCountries"], staleTime: 1 / 0, queryFn: N }),
            (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useCalculatorMeta = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = {
              queryKey: ["calculatorMeta"],
              staleTime: 1 / 0,
              queryFn: L,
            }),
            (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useCalculatorQuote = function (u) {
        const s = (0, t.c)(7);
        let o, c, y;
        s[0] !== u
          ? ((o = ["calculator", u]), (s[0] = u), (s[1] = o))
          : (o = s[1]);
        s[2] !== u
          ? ((c = async () => (await r.api.post("/calculator", u)).data),
            (s[2] = u),
            (s[3] = c))
          : (c = s[3]);
        s[4] !== o || s[5] !== c
          ? ((y = {
              queryKey: o,
              placeholderData: n.keepPreviousData,
              staleTime: 6e4,
              queryFn: c,
            }),
            (s[4] = o),
            (s[5] = c),
            (s[6] = y))
          : (y = s[6]);
        return (0, n.useQuery)(y);
      }),
      (e.useCreateOutgoing = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: x,
              onSuccess: () => {
                (u.invalidateQueries({ queryKey: ["outgoing"] }),
                  u.invalidateQueries({ queryKey: ["wallet"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useLoyalty = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["loyalty"], refetchInterval: 8e3, queryFn: B }),
            (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useRedeemReward = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: W,
              onSuccess: (t) => {
                (u.setQueryData(["loyalty"], t),
                  u.invalidateQueries({ queryKey: ["customer"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useReferral = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["referral"], queryFn: j }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useReels = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["reels"], queryFn: G }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useMarkReelSeen = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: H,
              onSuccess: (t) =>
                u.setQueryData(["reels"], (n) =>
                  n?.map((n) => (n.id === t ? { ...n, seen: !0 } : n)),
                ),
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useWallet = function () {
        const r = (0, t.c)(1);
        let u;
        r[0] === Symbol.for("react.memo_cache_sentinel")
          ? ((u = { queryKey: ["wallet"], queryFn: J }), (r[0] = u))
          : (u = r[0]);
        return (0, n.useQuery)(u);
      }),
      (e.useTopUp = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: z,
              onSuccess: () => {
                (u.invalidateQueries({ queryKey: ["wallet"] }),
                  u.invalidateQueries({ queryKey: ["customer"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useSetCourier = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: V,
              onSuccess: () => u.invalidateQueries({ queryKey: ["orders"] }),
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useAssistantChat = function () {
        const r = (0, t.c)(2),
          u = (0, n.useQueryClient)();
        let s;
        r[0] !== u
          ? ((s = {
              mutationFn: X,
              onSuccess: (t) => {
                t.tools?.includes("add_incoming_parcel") &&
                  (u.invalidateQueries({ queryKey: ["orders"] }),
                  u.invalidateQueries({ queryKey: ["statusQuantity"] }));
              },
            }),
            (r[0] = u),
            (r[1] = s))
          : (s = r[1]);
        return (0, n.useMutation)(s);
      }),
      (e.useUnpaidOrders = function (u) {
        const s = (0, t.c)(8);
        let o;
        s[0] !== u ? ((o = ["unpaid", u]), (s[0] = u), (s[1] = o)) : (o = s[1]);
        const c = !!u;
        let y, l;
        s[2] !== u
          ? ((y = async () => {
              const { data: t } = await r.api.get(
                `/orders/getUnpaidOrders/${u}`,
              );
              return Array.isArray(t) ? t : [];
            }),
            (s[2] = u),
            (s[3] = y))
          : (y = s[3]);
        s[4] !== o || s[5] !== c || s[6] !== y
          ? ((l = { queryKey: o, enabled: c, queryFn: y, retry: !1 }),
            (s[4] = o),
            (s[5] = c),
            (s[6] = y),
            (s[7] = l))
          : (l = s[7]);
        return (0, n.useQuery)(l);
      }));
    var t = _r(d[0]),
      n = _r(d[1]),
      r = _r(d[2]),
      u = _r(d[3]);
    const s = "1ad52c30-2978-4fe0-9db4-ecbba1e04365";
    async function o(t) {
      const { data: n } = await r.authApi.post("/v1/auth/login", t);
      if (!n?.access_token) throw new Error("No token returned");
      return (await (0, u.setToken)(n.access_token), n);
    }
    async function c(t) {
      const { data: n } = await r.authApi.post("/v1/auth/register", t);
      if (!n?.access_token) throw new Error("No token returned");
      return (await (0, u.setToken)(n.access_token), n);
    }
    async function y() {
      const { data: t } = await r.api.get("/customers/search/userId");
      return t;
    }
    function l(u) {
      const s = (0, t.c)(7);
      let o, c, y;
      return (
        s[0] !== u ? ((o = ["orders", u]), (s[0] = u), (s[1] = o)) : (o = s[1]),
        s[2] !== u
          ? ((c = async () => {
              const { data: t } = await r.api.get(
                `/orders/filterByStatys/${u}`,
              );
              return t ?? [];
            }),
            (s[2] = u),
            (s[3] = c))
          : (c = s[3]),
        s[4] !== o || s[5] !== c
          ? ((y = { queryKey: o, refetchInterval: 8e3, queryFn: c }),
            (s[4] = o),
            (s[5] = c),
            (s[6] = y))
          : (y = s[6]),
        (0, n.useQuery)(y)
      );
    }
    async function m(t) {
      const { data: n } = await r.api.post("/orders", {
        tracking_number: t.tracking_number.replace(/\s/g, ""),
        name: t.name,
        customer_id: t.customer_id,
        custom_status: "0",
        status: "AWAITING",
        wrapping: t.wrapping ?? !0,
        country: t.country,
        recipients: t.recipients ?? [],
        courier: t.courier ?? !0,
        delivery_address: t.delivery_address,
        ...("usa" === t.country ? { branch_id: s } : {}),
      });
      return n;
    }
    async function f() {
      return (await r.api.get("/recipients")).data ?? [];
    }
    async function p() {
      const { data: t } = await r.api.get("/district/timeSlots");
      return { today: t?.today ?? [], tomorrow: t?.tomorrow ?? [] };
    }
    async function Q(t) {
      const { orderId: n, ...u } = t,
        { data: s } = await r.api.put(`/orders/time-slot-update/${n}`, u);
      return s;
    }
    async function w() {
      const { data: t } = await r.api.get("/customer-addresses/customerAdress");
      return Array.isArray(t) ? t : [];
    }
    async function q(t) {
      return (await r.api.post("/customer-addresses", t)).data;
    }
    async function _() {
      const { data: t } = await r.paymentsApi.get("/payments/cards");
      return Array.isArray(t) ? t : [];
    }
    async function S(t) {
      const { data: n } = await r.api.post("/transactions", t);
      return n;
    }
    async function h(t) {
      for (let n = 0; n < 5; n++) {
        const { data: n } = await r.api.post(
            `/orders/order_payment_status/${t.orderId}`,
            { address_id: t.address_id },
          ),
          u = String(n?.payStatus ?? n?.status ?? "").toUpperCase();
        if ("COMPLETED" === u || "REJECTED" === u) return u;
        await new Promise(F);
      }
      return "PENDING";
    }
    function F(t) {
      return setTimeout(t, 3e3);
    }
    async function K(t) {
      const { orderId: n, ...u } = t,
        { data: s } = await r.api.put(`/orders/nusxa_update/${n}`, u);
      return s;
    }
    async function v(t) {
      const { data: n } = await r.api.get(`/signify/template/${t}`);
      return n?.url ?? null;
    }
    async function C() {
      const { data: t } = await r.api.get("/shops/getShops");
      return Array.isArray(t) ? t.map(A).filter(b) : [];
    }
    function b(t) {
      return "string" == typeof t && t.length > 0;
    }
    function A(t) {
      return "string" == typeof t ? t : t?.shop;
    }
    async function M(t) {
      const { data: n } = await r.api.post("/declarations", {
        ...t,
        status: "Declared",
      });
      return n;
    }
    async function k(t) {
      const { data: n } = await r.api.delete(`/declarations/${t}`);
      return n;
    }
    async function D(t) {
      (await r.api.put(`/orders/${t.orderId}`, {
        declaration_status: "DECLERED",
      }),
        await Promise.all(
          t.declarationIds.map((n) =>
            r.api.put(`/declarations/${n}`, { website: t.website }),
          ),
        ));
    }
    async function I(t) {
      const { data: n } = await r.api.put(
        `/orders/wrapping-update/${t.orderId}`,
        { wrapping: t.wrapping },
      );
      return n;
    }
    async function O(t) {
      const { data: n } = await r.api.put(`/orders/${t.orderId}`, {
        name: t.name,
      });
      return n;
    }
    async function $() {
      const { data: t } = await r.api.get("/addresses");
      return t ?? [];
    }
    async function T() {
      const { data: t } = await r.api.get("/transactions/customer/get");
      return Array.isArray(t) ? t : [];
    }
    async function P(t) {
      const { data: n } = await r.api.put("/customers/me", t);
      return n;
    }
    async function R(t) {
      const { data: n } = await r.api.post("/ai/translate", { items: t });
      return n;
    }
    async function E(t) {
      const { data: n } = await r.api.get("/tracking/demo", {
        params: t ? { carrier: t } : void 0,
      });
      return n;
    }
    async function U() {
      const { data: t } = await r.api.get("/outgoing");
      return Array.isArray(t) ? t : [];
    }
    async function N() {
      const { data: t } = await r.api.get("/outgoing/countries");
      return t;
    }
    async function L() {
      return (await r.api.get("/calculator/meta")).data;
    }
    async function x(t) {
      const { data: n } = await r.api.post("/outgoing", t);
      return n;
    }
    async function B() {
      return (await r.api.get("/loyalty")).data;
    }
    async function W(t) {
      return (await r.api.post("/loyalty/redeem", { reward_id: t })).data;
    }
    async function j() {
      return (await r.api.get("/referral")).data;
    }
    async function G() {
      const { data: t } = await r.api.get("/reels");
      return Array.isArray(t) ? t : [];
    }
    async function H(t) {
      return (await r.api.post(`/reels/${t}/view`), t);
    }
    async function J() {
      return (await r.api.get("/wallet")).data;
    }
    async function z(t) {
      return (await r.api.post("/wallet/topup", { amount: t })).data;
    }
    async function V(t) {
      const { orderId: n, ...u } = t,
        { data: s } = await r.api.put(`/orders/courier/${n}`, u);
      return s;
    }
    async function X(t) {
      const { data: n } = await r.api.post(
        "/assistant/chat",
        { ...t, history: t.history.filter(Y) },
        { timeout: 6e4 },
      );
      return n;
    }
    function Y(t) {
      return !t.error;
    }
  },
  920,
  [11, 921, 968, 1025],
);