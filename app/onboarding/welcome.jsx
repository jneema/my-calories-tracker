import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, Text, View, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import Animated, {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Welcome = () => {
  const [guestPressed, setGuestPressed] = useState(false);
  const [signInPressed, setSignInPressed] = useState(false);

  const guestScale = useSharedValue(1);
  const signInScale = useSharedValue(1);

  const guestAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: guestScale.value }],
  }));

  const signInAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: signInScale.value }],
  }));

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <View>
            <Text className="font-bold text-5xl">Welcome!</Text>
            <Text className="text-base text-gray-600">
              Choose how you'd like to continue.
            </Text>
          </View>
        </View>

        {/* Guest Card */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(100)}
          style={{ marginTop: 20 }}
        >
          <Pressable
            onPressIn={() => {
              setGuestPressed(true);
              guestScale.value = withTiming(0.97, { duration: 100 });
            }}
            onPressOut={() => {
              guestScale.value = withTiming(1, { duration: 100 });
              setTimeout(() => setGuestPressed(false), 100);
            }}
            onPress={async () => {
              await AsyncStorage.setItem("guestMode", "true");
              router.replace("/onboarding/personal-details");
            }}
          >
            <Animated.View style={[guestAnimatedStyle]}>
              <LinearGradient
                colors={["#FF5F00", "#EB0071"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  width: "100%",
                  borderRadius: 16,
                  padding: 16,
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: guestPressed ? 0.15 : 0.2,
                  shadowRadius: 12,
                  elevation: 5,
                }}
              >
                <View className="flex flex-col">
                  <View className="flex flex-row justify-between mb-3">
                    <BlurView
                      intensity={100}
                      tint="light"
                      style={{
                        borderRadius: 24,
                        overflow: "hidden",
                        padding: 5,
                      }}
                    >
                      <Ionicons name="person-circle" size={28} color="white" />
                    </BlurView>
                    <Ionicons
                      name="chevron-forward-circle"
                      size={28}
                      color="white"
                    />
                  </View>
                  <View className="flex gap-2">
                    <Text className="text-white text-3xl font-semibold">
                      Continue as Guest
                    </Text>
                    <Text className="text-white text-base leading-6">
                      Start tracking immediately. Your data is saved locally on
                      this device.
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>
          </Pressable>
        </Animated.View>

        {/* Sign In Card */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(200)}
          style={{ marginTop: 20 }}
        >
          <Pressable
            onPressIn={() => {
              setSignInPressed(true);
              signInScale.value = withTiming(0.97, { duration: 100 });
            }}
            onPressOut={() => {
              signInScale.value = withTiming(1, { duration: 100 });
              setTimeout(() => setSignInPressed(false), 100);
            }}
          >
            <Animated.View
              style={[
                {
                  width: "100%",
                  backgroundColor: "white",
                  borderRadius: 16,
                  padding: 16,
                  borderWidth: 2,
                  borderColor: signInPressed ? "#007bff" : "#e5e7eb",
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 8 },
                  shadowOpacity: signInPressed ? 0.15 : 0.08,
                  shadowRadius: 10,
                  elevation: 4,
                },
                signInAnimatedStyle,
              ]}
            >
              <View className="flex flex-col">
                <View className="flex flex-row justify-between mb-3">
                  <View
                    style={{
                      borderRadius: 24,
                      overflow: "hidden",
                      padding: 8,
                      backgroundColor: signInPressed ? "#007bff20" : "#f3f4f6",
                    }}
                  >
                    <Ionicons
                      name="key-outline"
                      size={28}
                      color={signInPressed ? "#007bff" : "#1f2937"}
                    />
                  </View>
                  <Ionicons
                    name="chevron-forward-circle"
                    size={28}
                    color={signInPressed ? "#007bff" : "#9ca3af"}
                  />
                </View>
                <View className="flex gap-2">
                  <Text
                    className="text-3xl font-semibold"
                    style={{ color: signInPressed ? "#007bff" : "#1f2937" }}
                  >
                    Create Account / Sign In
                  </Text>
                  <Text className="text-gray-700 text-base leading-6">
                    Sync your data across devices and never lose progress.
                  </Text>
                </View>
              </View>
            </Animated.View>
          </Pressable>
        </Animated.View>

        {/* Footer */}
        <Animated.View
          entering={FadeInUp.duration(600).delay(300)}
          className="mt-5"
        >
          <Text className="text-gray-500 text-center">
            You can always create an account later from your profile settings.
          </Text>
        </Animated.View>

        {/* Progress Bar */}
        {/* <Animated.View
          entering={FadeInUp.duration(600).delay(400)}
          className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-6"
        >
          <View
            style={{
              width: "33%",
              height: "100%",
              backgroundColor: "#FF5F00",
              borderRadius: 9999,
            }}
          />
        </Animated.View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Welcome;
