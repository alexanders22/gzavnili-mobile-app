// Leaflet map in an iframe with a fixed centre pin (modules 1133/1134). Web only; posts the centre back on move.
import React, { useEffect, useMemo } from "react";
import { Platform, View } from "react-native";
import { radius } from "@/lib/theme";
import { Body, useTokens } from "@/ui";

function mapHtml(lat: number, lng: number, dark: boolean) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<style>
  html, body, #map { height: 100%; margin: 0; padding: 0; background: ${dark ? "#16222B" : "#F3F1EC"}; }
  .leaflet-control-attribution { font-size: 9px; }
  #pin { position: absolute; left: 50%; top: 50%; z-index: 500; width: 28px; height: 28px; margin: -28px 0 0 -14px; pointer-events: none; }
  #pin b { display: block; width: 22px; height: 22px; margin: 0 auto; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); background: #2A5632; border: 3px solid #6AD67D; box-sizing: border-box; }
  #pin i { display: block; width: 10px; height: 4px; margin: 2px auto 0; border-radius: 50%; background: rgba(0,0,0,0.25); }
</style></head><body><div id="map"></div><div id="pin"><b></b><i></i></div>
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script>
<script>
  var map = L.map('map', { zoomControl: false, attributionControl: true }).setView([${lat}, ${lng}], 15);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '© OpenStreetMap' }).addTo(map);
  function post(payload) { var msg = JSON.stringify(payload); if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(msg); else if (window.parent) window.parent.postMessage(msg, '*'); }
  map.on('moveend', function () { var c = map.getCenter(); post({ type: 'gz-map', lat: c.lat, lng: c.lng }); });
<\/script></body></html>`;
}

export function MapPicker({ lat, lng, resetKey = 0, height = 180, onMove }: { lat: number; lng: number; resetKey?: number; height?: number; onMove: (p: { lat: number; lng: number }) => void }) {
  const { theme, isDark } = useTokens();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const html = useMemo(() => mapHtml(lat, lng, isDark), [resetKey, isDark]);
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== "string") return;
      try { const m = JSON.parse(e.data); if (m?.type === "gz-map" && typeof m.lat === "number" && typeof m.lng === "number") onMove({ lat: m.lat, lng: m.lng }); } catch { /* not ours */ }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onMove]);
  return (
    <View style={{ height, borderRadius: radius.md, overflow: "hidden", borderWidth: 1, borderColor: theme.line, backgroundColor: theme.paper, alignItems: "center", justifyContent: "center" }}>
      {Platform.OS === "web"
        ? React.createElement("iframe" as any, { srcDoc: html, title: "map", style: { border: 0, width: "100%", height: "100%" } })
        : <Body muted>Map preview is web-only</Body>}
    </View>
  );
}
