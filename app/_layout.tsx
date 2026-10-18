import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Geist_400Regular, Geist_500Medium, Geist_600SemiBold, Geist_700Bold, Geist_800ExtraBold } from "@expo-google-fonts/geist";
import { NotoSansGeorgian_400Regular, NotoSansGeorgian_500Medium, NotoSansGeorgian_600SemiBold, NotoSansGeorgian_700Bold, NotoSansGeorgian_800ExtraBold } from "@expo-google-fonts/noto-sans-georgian";
import { NotoSerifGeorgian_500Medium } from "@expo-google-fonts/noto-serif-georgian";
import { InstrumentSerif_400Regular_Italic } from "@expo-google-fonts/instrument-serif";
import { darkTheme, lightTheme } from "@/lib/theme";
import { useIsDark } from "@/lib/settings";
import { FONT_ASSETS } from "@/lib/fonts";
import { getToken } from "@/lib/token";
import { AssistantFab } from "@/components/AssistantFab";
import { LaunchSplash } from "@/components/LaunchSplash";
import { TourOverlay } from "@/components/Tour";

const queryClient = new QueryClient({ defaultOptions: { queries: { retry: 1, staleTime: 30_000 } } });

export default function RootLayout() {
  const isDark = useIsDark();
  const theme = isDark ? darkTheme : lightTheme;
  const [tokenChecked, setTokenChecked] = useState(false);
  const [splash, setSplash] = useState(true);
  useEffect(() => { getToken().finally(() => setTokenChecked(true)); }, []);
  const [fontsLoaded, fontError] = useFonts({
    ...FONT_ASSETS,
    Geist_400Regular, Geist_500Medium, Geist_600SemiBold, Geist_700Bold, Geist_800ExtraBold,
    NotoSansGeorgian_400Regular, NotoSansGeorgian_500Medium, NotoSansGeorgian_600SemiBold, NotoSansGeorgian_700Bold, NotoSansGeorgian_800ExtraBold,
    NotoSerifGeorgian_500Medium, InstrumentSerif_400Regular_Italic,
  });
  const ready = tokenChecked && (fontsLoaded || !!fontError);
  return (
    <View style={{ flex: 1, backgroundColor: theme.cream }}>
      {ready ? (
        <QueryClientProvider client={queryClient}>
          <SafeAreaProvider>
            <StatusBar style={isDark ? "light" : "dark"} />
            <View style={{ flex: 1 }}>
              <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: theme.cream }, animation: "slide_from_right" }} />
              <AssistantFab />
              <TourOverlay />
            </View>
          </SafeAreaProvider>
        </QueryClientProvider>
      ) : null}
      {splash ? <LaunchSplash ready={ready} onDone={() => setSplash(false)} /> : null}
    </View>
  );
}
