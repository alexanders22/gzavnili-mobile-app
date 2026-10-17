import React from "react";
import { View } from "react-native";
import { space } from "@/lib/theme";
import { useColumns, useIsDesktop } from "@/lib/layout";

const cell = { flexGrow: 1, flexShrink: 1, flexBasis: 0, minWidth: 0 } as const;

/** Equal-width rows of tiles; empty cells keep the last row aligned. */
export function TileGrid({ children, columns, gap = space.md }: { children: React.ReactNode; columns?: number; gap?: number }) {
  const auto = useColumns();
  const cols = columns ?? auto;
  const items = React.Children.toArray(children).filter(Boolean);
  const rows: React.ReactNode[][] = [];
  for (let i = 0; i < items.length; i += cols) rows.push(items.slice(i, i + cols));
  return (
    <>
      {rows.map((row, r) => (
        <View key={r} style={{ flexDirection: "row", gap, marginTop: gap }}>
          {row.map((c, i) => <View key={i} style={cell}>{c}</View>)}
          {Array.from({ length: cols - row.length }).map((_, i) => <View key={`spacer-${i}`} style={cell} />)}
        </View>
      ))}
    </>
  );
}

export function TwoCol({ main, side, gap = 24 }: { main: React.ReactNode; side: React.ReactNode; gap?: number }) {
  if (!useIsDesktop()) return <>{main}{side}</>;
  return (
    <View style={{ flexDirection: "row", gap, alignItems: "flex-start" }}>
      <View style={cell}>{main}</View>
      <View style={{ width: 320, flexShrink: 0 }}>{side}</View>
    </View>
  );
}
