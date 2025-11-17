import { View, Text, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const SplashScreen = ({ onFinish }) => {
  const logoScale = useRef(new Animated.Value(0.5)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const textY = useRef(new Animated.Value(20)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const dotsOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animation
    Animated.parallel([
      Animated.timing(logoScale, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();

    // Text animation
    Animated.parallel([
      Animated.timing(textY, {
        toValue: 0,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 500,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();

    // Dots animation
    Animated.timing(dotsOpacity, {
      toValue: 1,
      duration: 500,
      delay: 800,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#0c4a6e", "#075985", "#0369a1"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        {/* Logo and branding */}
        <View style={{ alignItems: "center", zIndex: 10 }}>
          <Animated.View
            style={{
              width: 96,
              height: 96,
              backgroundColor: "white",
              borderRadius: 24,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 10 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 10,
              opacity: logoOpacity,
              transform: [{ scale: logoScale }],
            }}
          >
            <Ionicons name="fitness" size={48} color="#0369a1" />
          </Animated.View>

          <Animated.View
            style={{
              alignItems: "center",
              marginTop: 24,
              opacity: textOpacity,
              transform: [{ translateY: textY }],
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 48,
                fontWeight: "300",
                letterSpacing: -1,
              }}
            >
              FitTrack
            </Text>
            <Text
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: 18,
                marginTop: 8,
              }}
            >
              Your personal fitness companion.
            </Text>
          </Animated.View>

          <Animated.View style={{ marginTop: 32, opacity: dotsOpacity }}>
            <View style={{ flexDirection: "row", gap: 6 }}>
              <DotIndicator delay={0} />
              <DotIndicator delay={200} />
              <DotIndicator delay={400} />
            </View>
          </Animated.View>
        </View>
      </LinearGradient>
    </View>
  );
};

// Animated dot component
const DotIndicator = ({ delay }) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 0.3,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }, delay);
  }, [delay]);

  return (
    <Animated.View
      style={{
        width: 8,
        height: 8,
        backgroundColor: "white",
        borderRadius: 4,
        opacity: opacity,
      }}
    />
  );
};

export default SplashScreen;
