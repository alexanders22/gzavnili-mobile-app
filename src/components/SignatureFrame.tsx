// Embedded e-signature page (module 1161). Listens for {type:"sign"|"rejected"} messages from the frame.
import React, { useEffect } from "react";
import { Platform } from "react-native";
import { Body } from "@/ui";

export function SignatureFrame({ url, onSigned, onRejected }: { url: string; onSigned: () => void; onRejected?: () => void }) {
  useEffect(() => {
    if (Platform.OS !== "web") return;
    const onMessage = (e: MessageEvent) => { const t = (e.data as any)?.type; if (t === "sign") onSigned(); else if (t === "rejected") onRejected?.(); };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [onSigned, onRejected]);
  if (Platform.OS !== "web") return <Body muted>Signing is available on the web build</Body>;
  return React.createElement("iframe" as any, { src: url, style: { width: "100%", height: "100%", border: 0, borderRadius: 16 } });
}
