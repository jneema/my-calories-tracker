import { Stack } from "expo-router";
import "./global.css";
import { useState } from "react";
import SplashScreen from "./splash";

const RootLayout = () => {
  const [showCustomSplash, setShowCustomSplash] = useState(true);

  if (showCustomSplash) {
    return <SplashScreen onFinish={() => setShowCustomSplash(false)} />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default RootLayout;