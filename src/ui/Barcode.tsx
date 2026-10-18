import React, { useMemo } from "react";
import Svg, { Rect } from "react-native-svg";

// Code 128 (subset B) patterns: bar/space widths per symbol, 0..102 + start B (104) + stop (106).
const PATTERNS = [
  "212222","222122","222221","121223","121322","131222","122213","122312","132212","221213","221312","231212","112232","122132","122231","113222","123122","123221","223211","221132","221231","213212","223112","312131","311222","321122","321221","312212","322112","322211","212123","212321","232121","111323","131123","131321","112313","132113","132311","211313","231113","231311","112133","112331","132131","113123","113321","133121","313121","211331","231131","213113","213311","213131","311123","311321","331121","312113","312311","332111","314111","221411","431111","111224","111422","121124","121421","141122","141221","112214","112412","122114","122411","142112","142211","241211","221114","413111","241112","134111","111242","121142","121241","114212","124112","124211","411212","421112","421211","212141","214121","412121","111143","111341","131141","114113","114311","411113","411311","113141","114131","311141","411131","211412","211214","211232","2331112",
];
const START_B = 104;
const STOP = 106;

/** Module widths (alternating bar, space, bar…) for a Code 128-B encoding of `value`. */
export function code128Widths(value: string) {
  const codes = [START_B];
  for (const ch of value) {
    const c = ch.charCodeAt(0);
    if (c >= 32 && c <= 126) codes.push(c - 32);
  }
  const check = codes.reduce((s, c, i) => s + (i === 0 ? c : c * i), 0) % 103;
  codes.push(check, STOP);
  return codes.flatMap((c) => PATTERNS[c].split("").map(Number));
}

export function Barcode({ value, height = 72, color = "#121D25" }: { value: string; height?: number; color?: string }) {
  const { bars, total } = useMemo(() => {
    const widths = code128Widths(value);
    let x = 10;
    const bars: { x: number; w: number }[] = [];
    widths.forEach((w, i) => { if (i % 2 === 0) bars.push({ x, w }); x += w; });
    return { bars, total: x + 10 };
  }, [value]);
  return (
    <Svg width="100%" height={height} viewBox={`0 0 ${total} ${height}`} preserveAspectRatio="none">
      {bars.map((b, i) => <Rect key={i} x={b.x} y={0} width={b.w} height={height} fill={color} />)}
    </Svg>
  );
}
