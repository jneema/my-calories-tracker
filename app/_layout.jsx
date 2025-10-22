import { Stack, useRouter } from "expo-router";
import "./global.css";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SplashScreen from "./splash";

const RootLayout = () => {
  // const clearAllStorage = async () => {
  //   try {
  //     await AsyncStorage.clear();
  //     console.log("All storage cleared");
  //   } catch (error) {
  //     console.error("Error clearing storage:", error);
  //   }
  // };

  // // Call it
  // clearAllStorage();
  const logAllStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const stores = await AsyncStorage.multiGet(keys);

      console.log("=== AsyncStorage Contents ===");
      stores.forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
      });
      console.log("=============================");
    } catch (error) {
      console.error("Error reading AsyncStorage:", error);
    }
  };

  // Call it
  logAllStorage();

  const [showCustomSplash, setShowCustomSplash] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [userStatus, setUserStatus] = useState({
    hasSeenOnboarding: false,
    isAuthenticated: false,
    hasPersonalDetails: false,
    isGuestMode: false,
  });
  const router = useRouter();
  const DEV_MODE = false;

  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const [hasSeenOnboarding, authToken, hasPersonalDetails, guestMode] =
          await Promise.all([
            AsyncStorage.getItem("hasSeenOnboarding"),
            AsyncStorage.getItem("authToken"),
            AsyncStorage.getItem("hasPersonalDetails"),
            AsyncStorage.getItem("guestMode"),
          ]);

        setUserStatus({
          hasSeenOnboarding: hasSeenOnboarding === "true",
          isAuthenticated: !!authToken,
          hasPersonalDetails: hasPersonalDetails === "true",
          isGuestMode: guestMode === "true",
        });
      } catch (err) {
        console.error("Error checking user status:", err);
      } finally {
        setIsReady(true);
      }
    };

    checkUserStatus();
  }, []);

  useEffect(() => {
    if (!showCustomSplash && isReady) {
      if (DEV_MODE) {
        router.replace("/auth/forgot-password");
        return;
      }

      // Determine navigation based on user status
      if (!userStatus.hasSeenOnboarding) {
        // Brand new user - show onboarding
        router.replace("/onboarding");
      } else if (!userStatus.isAuthenticated && !userStatus.isGuestMode) {
        // Seen onboarding but not authenticated - go to welcome screen
        router.replace("/onboarding/welcome");
      } else if (!userStatus.hasPersonalDetails) {
        // Authenticated or guest but no personal details - collect them
        router.replace("/personal-details");
      } else {
        // Fully set up user - go to app
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
      <Stack.Screen name="onboarding/welcome" />
      <Stack.Screen name="auth/sign-up" />
      <Stack.Screen name="auth/sign-in" />
      <Stack.Screen name="personal-details/index" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
};

export default RootLayout;
