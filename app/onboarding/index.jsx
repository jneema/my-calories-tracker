import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

const steps = [
  {
    icon: "restaurant",
    title: "Log your meals easily",
    description: "Type, scan barcodes, or search our extensive food database.",
    colors: ["#f97316", "#f43f5e", "#db2777"],
  },
  {
    icon: "barbell",
    title: "Track your progress",
    description: "Monitor calories and nutrients to reach your goals faster.",
    colors: ["#22c55e", "#16a34a", "#0f766e"],
  },
  {
    icon: "heart",
    title: "Stay healthy, your way",
    description: "Personalize your plan to match your lifestyle and taste.",
    colors: ["#3b82f6", "#6366f1", "#8b5cf6"],
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await AsyncStorage.setItem("hasSeenOnboarding", "true");
      router.replace("/onboarding/welcome");
    }
  };

  const handleSkip = async () => {
    await AsyncStorage.setItem("hasSeenOnboarding", "true");
    router.replace("/onboarding/welcome");
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={steps[currentStep].colors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Skip button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>

        {/* Centered content like Splash */}
        <View style={styles.centerContent}>
          <AnimatedIcon name={steps[currentStep].icon} />
          <AnimatedText
            title={steps[currentStep].title}
            description={steps[currentStep].description}
            key={currentStep}
          />
          <DotIndicators total={steps.length} active={currentStep} />
        </View>

        {/* Bottom “Next” button */}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>
            {currentStep === steps.length - 1 ? "Finish" : "Next"}
          </Text>
          <Ionicons name="arrow-forward" size={18} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Onboarding;

// --- Reusable Components ---

const AnimatedIcon = ({ name }) => {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [name]);

  return (
    <BlurView intensity={100} tint="light" style={styles.blurContainer}>
      <Animated.View
        style={[styles.iconContainer, { opacity, transform: [{ scale }] }]}
      >
        <Ionicons name={name} size={48} color="white" />
      </Animated.View>
    </BlurView>
  );
};

const AnimatedText = ({ title, description }) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [title]);

  return (
    <Animated.View
      style={[styles.textWrapper, { opacity, transform: [{ translateY }] }]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Animated.View>
  );
};

const DotIndicators = ({ total, active }) => (
  <View style={styles.dotsContainer}>
    {Array.from({ length: total }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          i === active && styles.activeDot,
          { width: i === active ? 24 : 8 },
        ]}
      />
    ))}
  </View>
);

// --- Styles ---

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  skipButton: {
    position: "absolute",
    top: 60,
    right: 24,
    zIndex: 10,
  },
  skipText: {
    color: "white",
    fontWeight: "500",
    fontSize: 16,
  },
  centerContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  blurContainer: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 24,
  },
  iconContainer: {
    width: 96,
    height: 96,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrapper: {
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "300",
    textAlign: "center",
    letterSpacing: -1,
  },
  description: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 18,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 320,
  },
  dotsContainer: {
    flexDirection: "row",
    marginTop: 32,
    gap: 6,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.5)",
  },
  activeDot: {
    backgroundColor: "white",
  },
  nextButton: {
    position: "absolute",
    bottom: 60,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.25)",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 32,
  },
  nextText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
    marginRight: 8,
  },
});
