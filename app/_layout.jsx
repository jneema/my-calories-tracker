import { Stack, useRouter } from "expo-router";
import "./global.css";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./splash";

const RootLayout = () => {
  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);
  const router = useRouter();

  const DEV_MODE = true;

  useEffect(() => {
    const checkUser = async () => {
      try {
        const hasSeen = await AsyncStorage.getItem("hasSeenOnboarding");
        setIsNewUser(!hasSeen);
      } catch (err) {
        console.error("Error checking onboarding status:", err);
      } finally {
        setIsReady(true);
      }
    };
    checkUser();
  }, []);

  useEffect(() => {
    if (!showCustomSplash && isReady) {
      if (DEV_MODE) {
        router.replace("/auth/forgot-password");
      } else if (isNewUser) {
        router.replace("/onboarding");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [showCustomSplash, isReady]);

  if (!isReady) return null;

  if (showCustomSplash) {
    return <SplashScreen onFinish={() => setShowCustomSplash(false)} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="onboarding/index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;
