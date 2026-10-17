# Gzavnili mobile

Expo (React Native + expo-router) rebuild of the Gzavnili parcel-forwarding app.
Live original: https://openbanking.brandrepublic.ge/mobileapps/ — its sources were
lost, so the app is being reconstructed screen by screen from the compiled web
bundle (see `tools/original/README.md`). Design tokens, fonts, strings and layout
come straight from that bundle, not from eyeballing.

## Status

| | |
|---|---|
| Skeleton (theme, fonts, i18n, settings store, API client, UI kit, header, floating nav, splash, assistant button) | ✅ |
| Sign-in / sign-up | ✅ |
| Home | ✅ |
| Parcels (incoming with status filter, outgoing) | ✅ |
| Shop (search, chips, filter sheet, product grid, stores) | ✅ |
| Send Money (amount → recipient → confirm → done) | ✅ |
| More (profile card, core + optional modules, support band) | ✅ |
| Settings (profile, light/dark/system, language, modules, notifications, sounds, sign out) | ✅ |
| Address (warehouse picker, room number, copyable fields) | ✅ |
| Wallet, Loyalty, Calculator, Rates, My code, Reels, Assistant, Referral, Buy for me, Profile | placeholders |
| Parcel flows (add-incoming/outgoing, customs, declare, delivery, pay) | not started |

## Run

```bash
npm install
npm run web                         # http://localhost:8081 — talks to the live demo API
EXPO_PUBLIC_DEMO=1 npm run web      # offline demo data, no sign-in needed
npm run typecheck
```

The live API is `https://openbanking.brandrepublic.ge/mobileapps-api` (override with
`EXPO_PUBLIC_API_URL`). The sign-in screen prefills the public demo account from the
backend's README. The backend itself lives on the server in `/opt/gzavnili-demo/api`.

## Layout

```
app/                 expo-router routes (file names match the original app)
src/lib/theme.ts     palette, light/dark themes, radius/space/font scales
src/lib/fonts.ts     Geist (Latin) + Noto Sans Georgian, BOG for display, serif notes
src/lib/i18n.ts      ka/en strings
src/lib/settings.ts  zustand store persisted as "gz.settings" (lang, mode, modules…)
src/lib/api.ts       fetch client with Bearer token, 401 → sign-in; demo adapter in demo.ts
src/lib/hooks.ts     react-query hooks over the API
src/ui/              Screen, Title, Body, Card, Btn, Pill, Picker, BottomSheet, TileGrid, header + bottom nav, logo, Icon (hand-drawn Ionicons)
src/components/      DrawnBird, Drawing/Note (hero sketch), ReelsStrip, DealsStrip, TransitAnimation, AssistantFab, LaunchSplash
src/data/shop.ts     demo shop catalog
tools/original/      the prettified original bundle + extractor
```

## Deploy (web)

```bash
npm run build:web                   # → dist/
```

Nginx serves the original from `/var/www/mobileapps` on the server with
`try_files $uri $uri.html /mobileapps/index.html`; copy `dist/` there once the
rebuild reaches parity. Set `experiments.baseUrl` to `/mobileapps` in `app.json`
before exporting for that path.
