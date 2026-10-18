# Original web export

`entry.pretty.js` is the prettified Metro bundle from the live site
(https://openbanking.brandrepublic.ge/mobileapps/, Expo SDK 57). The original
sources are not available; every screen is rebuilt from this file.

The bundle kept the route map with real file names (module 9), all StyleSheet
objects, all UI strings (Georgian as `\u10xx` escapes) and the component trees
(React Compiler output, so each JSX node is wrapped in a memo-cache check).

## Finding a screen

```bash
python3 extract.py list                 # count modules
python3 extract.py 1030                 # dump module 1030 to mods/1030.js
```

Route → module id (from module 9):

| route | id | | route | id |
|---|---|---|---|---|
| (tabs)/_layout | 10 | | loyalty | 1168 ✅ |
| (tabs)/add-tracking | 898 | | my-code | 1169 ✅ |
| (tabs)/address | 910 ✅ | | pay/[id] | 1171 |
| (tabs)/index (home) | 1030 ✅ | | profile | 1172 |
| (tabs)/more | 1065 ✅ | | rates | 1173 ✅ |
| (tabs)/parcels | 1066 ✅ | | reels | 1174 ✅ |
| (tabs)/send | 1071 ✅ | | referral | 1182 ✅ |
| (tabs)/shop | 1072 ✅ | | settings | 1183 ✅ |
| _layout | 1073 ✅ | | sign-in | 1184 ✅ |
| add-incoming | 1130 | | wallet | 1185 ✅ |
| add-outgoing | 1131 | | | |
| assistant | 1139 ✅ | | **shared** | |
| buyforme | 1158 | | ui kit (Screen/Body/Card/Btn…) | 890 ✅ |
| calculator | 1159 ✅ | | header + bottom nav | 894 ✅ |
| customs/[id] | 1160 | | theme tokens | 895 ✅ |
| declare/[id] | 1162 | | fonts | 891 ✅ |
| delivery/[id] | 1164 | | i18n | 877 ✅ |
| index (redirect) | 1167 ✅ | | api hooks | 920 (subset ✅) |
| | | | illustrations (Drawing, DrawnBird…) | 899 (hero + bird ✅) |
| | | | Picker / BottomSheet | 1028 / 1029 ✅ |
| | | | ParcelProgress / STATUS_GROUPS / ProfileGateCard | 1070 / 1067 / 1033 ✅ |
| | | | ModuleTile + NewBadge / shop catalog | 909 / 1032 ✅ |
| | | | Barcode (Code 128) | 1170 ✅ |
| | | | playSound / TOURS data / TourOverlay+useTour | 1140 ✅ / 1069 ✅ / 1068 (store only) |
| | | | hand-drawn icon wrapper / stroke map | 15 / 275 ✅ |
| | | | demo adapter | 1024 ✅ |

A module's dependency list is at its end: `1030, [11, 15, 276, …]`; the n-th
entry is what `r(d[n])` resolves to. Common ones: 11 = react-compiler runtime,
13 = react, 192 = View, 415 = Pressable, 316 = ScrollView, 402 = ActivityIndicator,
15 = @expo/vector-icons, 276 = expo-router, 250 = react-native-svg, 305 = Animated,
382 = Easing, 6 = jsx-runtime.

Reading tip: strip the memo-cache noise with
`grep -v "^\s*([a-z]\[[0-9]*\] = " mods/<id>.js`.
