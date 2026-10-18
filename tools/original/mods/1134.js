__d(
  function (g, r, i, a, m, e, d) {
    "use strict";
    (Object.defineProperty(e, "__esModule", { value: !0 }),
      (e.mapHtml = function (n, t, o) {
        return `<!DOCTYPE html>\n<html>\n<head>\n<meta charset="utf-8" />\n<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />\n<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />\n<style>\n  html, body, #map { height: 100%; margin: 0; padding: 0; background: ${o ? "#16222B" : "#F3F1EC"}; }\n  .leaflet-control-attribution { font-size: 9px; }\n  #pin {\n    position: absolute; left: 50%; top: 50%; z-index: 500;\n    width: 28px; height: 28px; margin: -28px 0 0 -14px; pointer-events: none;\n  }\n  #pin b {\n    display: block; width: 22px; height: 22px; margin: 0 auto;\n    border-radius: 50% 50% 50% 0; transform: rotate(-45deg);\n    background: #2A5632; border: 3px solid #6AD67D; box-sizing: border-box;\n  }\n  #pin i {\n    display: block; width: 10px; height: 4px; margin: 2px auto 0;\n    border-radius: 50%; background: rgba(0,0,0,0.25);\n  }\n</style>\n</head>\n<body>\n<div id="map"></div>\n<div id="pin"><b></b><i></i></div>\n<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>\n<script>\n  var map = L.map('map', { zoomControl: false, attributionControl: true })\n    .setView([${n}, ${t}], 15);\n  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {\n    maxZoom: 19,\n    attribution: '\xa9 OpenStreetMap'\n  }).addTo(map);\n\n  function post(payload) {\n    var msg = JSON.stringify(payload);\n    if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(msg);\n    else if (window.parent) window.parent.postMessage(msg, '*');\n  }\n\n  map.on('moveend', function () {\n    var c = map.getCenter();\n    post({ type: 'gz-map', lat: c.lat, lng: c.lng });\n  });\n<\/script>\n</body>\n</html>`;
      }),
      (e.parseMapMessage = function (n) {
        try {
          const t = JSON.parse(n);
          if (
            t &&
            "gz-map" === t.type &&
            "number" == typeof t.lat &&
            "number" == typeof t.lng
          )
            return t;
        } catch {}
        return null;
      }));
  },
  1134,
  [],
);