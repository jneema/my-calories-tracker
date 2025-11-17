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
  const [isReady, setIsReady] = useState(false);
  const [userStatus, setUserStatus] = useState({
    hasSeenOnboarding: false,
    isAuthenticated: false,
    hasPersonalDetails: false,
    isGuestMode: false,
  });
  const router = useRouter();
  const DEV_MODE = false;

  const MINIMUM_SPLASH_TIME = 3000; // 3 seconds

  useEffect(() => {
    const checkUserStatus = async () => {
      const startTime = Date.now();

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

        // Calculate remaining time to meet minimum splash duration
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MINIMUM_SPLASH_TIME - elapsedTime);

        // Wait for remaining time before marking as ready
        setTimeout(() => {
          setIsReady(true);
        }, remainingTime);
      } catch (err) {
        console.error("Error checking user status:", err);

        // Still respect minimum time even on error
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MINIMUM_SPLASH_TIME - elapsedTime);

        setTimeout(() => {
          setIsReady(true);
        }, remainingTime);
      }
    };

    checkUserStatus();
  }, []);

  useEffect(() => {
    if (isReady) {
      if (DEV_MODE) {
        router.replace("/auth/forgot-password");
        return;
      }

      // Determine navigation based on user status
      if (!userStatus.hasSeenOnboarding) {
        router.replace("/onboarding");
      } else if (!userStatus.isAuthenticated && !userStatus.isGuestMode) {
        router.replace("/onboarding/welcome");
      } else if (!userStatus.hasPersonalDetails) {
        router.replace("/personal-details");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [isReady, userStatus]);

  // Show splash while checking storage
  if (!isReady) {
    return <SplashScreen onFinish={() => {}} />;
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
