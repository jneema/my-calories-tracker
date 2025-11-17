import React, { useRef, useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import AnimatedIcon from "../../components/animated-icon";
import DotIndicators from "../../components/dot-indicators";
import AnimatedText from "../../components/animated-text";
import styles from "../../styles";

const steps = [
  {
    icon: "barbell",
    title: "Track every workout",
    description: "Log exercises, sets, and reps. Build custom routines that fit your goals.",
    colors: ["#082f49", "#0c4a6e", "#075985"], 
  },
  {
    icon: "stats-chart",
    title: "Monitor your progress",
    description: "Visualize your strength gains, track personal records, and celebrate milestones.",
    colors: ["#0c4a6e", "#075985", "#0369a1"],
  },
  {
    icon: "trophy",
    title: "Reach your peak",
    description: "Set goals, stay consistent, and become the strongest version of yourself.",
    colors: ["#0e7490", "#0891b2", "#06b6d4"], 
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

        {/* Bottom "Next" button */}
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
