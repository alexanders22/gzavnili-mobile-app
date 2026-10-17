import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { Redirect } from "expo-router";
import { DEMO } from "@/lib/demo";
import { getToken, setToken } from "@/lib/token";
import { useTokens } from "@/ui";

/** Entry: signed in → tabs, otherwise → sign-in. Demo mode signs in by itself. */
export default function Index() {
  const { theme } = useTokens();
  const [token, setTok] = useState<string | null | undefined>(undefined);
  useEffect(() => {
    if (DEMO) setToken("demo.token").then(() => setTok("demo.token"));
    else getToken().then(setTok);
  }, []);
  if (token === undefined) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.cream }}>
        <ActivityIndicator color={theme.green} />
      </View>
    );
  }
  return <Redirect href={token ? "/(tabs)" : "/sign-in"} />;
}
