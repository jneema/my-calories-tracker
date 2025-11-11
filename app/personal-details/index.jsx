import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import StepOne from "./step-one";
import StepTwo from "./step-two";
import StepThree from "./step-three";
import StepFour from "./step-four";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStoredItems from "../../hooks/useStoredItem";
import { calculateCalorieGoal } from "../../hooks/useCalculateCalories";

const { height, width } = Dimensions.get("window");

const MultiStepForm = () => {
  const storedItems = useStoredItems(["guestMode"]);
  const guestMode = storedItems.guestMode;
  const router = useRouter();
  const [step, setStep] = useState(1);
  const steps = [
    {
      id: 1,
      title: guestMode ? "What is your name?" : "What is your gender?",
      subtitle: "Help us personalize your experience.",
      icon: "person",
    },
    {
      id: 2,
      title: "Tell us about yourself",
      subtitle: "We need these details to personalize things further.",
      icon: "information-circle",
    },
    {
      id: 3,
      title: "What are your goals?",
      subtitle: "Choose your activity level and target.",
      icon: "body",
    },
    {
      id: 4,
      title: "Your plan is ready!",
      subtitle: "Here is your personalized daily calorie target.",
      icon: "checkmark-circle",
    },
  ];
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: "",
    weight: "",
    height: "",
    activityLevel: "",
    goal: "",
  });

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const progressWidth = (step / steps.length) * width;

  const currentStep = steps.find((s) => s.id === step);

  const canProceed = true;

  const handleNext = async () => {
    if (step < steps.length) {
      setStep(step + 1);
    } else {
      // Calculate calorie target
      const calorieTarget = calculateCalorieGoal(formData);

      // Save form data and calorie target
      try {
        await AsyncStorage.setItem("userFormData", JSON.stringify(formData));
        await AsyncStorage.setItem(
          "calorieTarget",
          JSON.stringify(calorieTarget)
        );
        await AsyncStorage.setItem("hasPersonalDetails", "true");
        console.log("Form data & calorie target saved successfully:", {
          formData,
          calorieTarget,
        });
      } catch (err) {
        console.error("Error saving data:", err);
      }

      router.push("/(tabs)");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <View className="flex-1 bg-white">
          {/* Header */}
          <LinearGradient
            colors={
              step === 4
                ? ["#14b8a6", "#06b6d4"]
                : ["#f97316", "#f43f5e", "#db2777"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              height: height * 0.22,
              justifyContent: "center",
              paddingTop: 35,
              paddingLeft: 20,
            }}
          >
            <View className="flex flex-col gap-3">
              <View className="flex flex-row items-center gap-2">
                <Ionicons name={currentStep.icon} color="white" size={26} />
                <Text className="text-white mt-1">
                  Step {step} of {steps.length}
                </Text>
              </View>
              <Text className="text-white text-3xl font-semibold">
                {currentStep.title}
              </Text>
              <Text className="text-white text-base leading-6">
                {currentStep.subtitle}
              </Text>
            </View>
          </LinearGradient>

          {/* Body */}
          {step === 4 ? (
            <View className="flex-1 bg-white">
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 20,
                  paddingTop: 20,
                  paddingBottom: 120,
                }}
                showsVerticalScrollIndicator={false}
              >
                <StepFour formData={formData} guestMode={guestMode} />
              </ScrollView>

              {/* Bottom section */}
              <View className="px-5 pb-5 bg-white">
                {/* Progress Bar */}
                <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                  <View
                    style={{ width: progressWidth }}
                    className="h-2 rounded-full bg-teal-500"
                  />
                </View>

                {/* Navigation Buttons */}
                <View className="flex-row justify-between">
                  <TouchableOpacity
                    onPress={handleBack}
                    className="px-5 py-3 bg-gray-200 rounded-xl flex-row items-center"
                  >
                    <Ionicons name="arrow-back" size={18} color="#374151" />
                    <Text className="text-gray-700 text-base ml-2">Back</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    disabled={!canProceed}
                    activeOpacity={0.8}
                    onPress={handleNext}
                    className="px-5 py-3 rounded-xl flex-row items-center bg-[#14b8a6]"
                  >
                    <Text className="text-base font-semibold text-white">
                      Finish
                    </Text>
                    <Ionicons
                      name="checkmark"
                      size={18}
                      color="#fff"
                      style={{ marginLeft: 6 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : (
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={{ flex: 1 }}
            >
              <View className="flex-1 bg-white">
                <ScrollView
                  contentContainerStyle={{
                    paddingHorizontal: 20,
                    paddingTop: 20,
                    paddingBottom: 120,
                  }}
                  showsVerticalScrollIndicator={false}
                >
                  {step === 1 && (
                    <StepOne
                      formData={formData}
                      updateField={updateField}
                      guestMode={guestMode}
                    />
                  )}
                  {step === 2 && (
                    <StepTwo formData={formData} updateField={updateField} />
                  )}
                  {step === 3 && (
                    <StepThree formData={formData} updateField={updateField} />
                  )}
                </ScrollView>

                {/* Bottom section */}
                <View className="px-5 pb-5 bg-white">
                  {/* Progress Bar */}
                  <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                    <View
                      style={{ width: progressWidth }}
                      className="h-2 rounded-full bg-[#f43f5e]"
                    />
                  </View>

                  {/* Navigation Buttons */}
                  <View className="flex-row justify-between">
                    {step > 1 ? (
                      <TouchableOpacity
                        onPress={handleBack}
                        className="px-5 py-3 bg-gray-200 rounded-xl flex-row items-center"
                      >
                        <Ionicons name="arrow-back" size={18} color="#374151" />
                        <Text className="text-gray-700 text-base ml-2">
                          Back
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <View />
                    )}

                    <TouchableOpacity
                      disabled={!canProceed}
                      activeOpacity={0.8}
                      onPress={handleNext}
                      className={`px-5 py-3 rounded-xl flex-row items-center ${
                        canProceed ? "bg-[#f43f5e]" : "bg-gray-300"
                      }`}
                    >
                      <Text
                        className={`text-base font-semibold ${
                          canProceed ? "text-white" : "text-gray-500"
                        }`}
                      >
                        Next
                      </Text>
                      <Ionicons
                        name="arrow-forward"
                        size={18}
                        color={canProceed ? "#fff" : "#9ca3af"}
                        style={{ marginLeft: 6 }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </KeyboardAvoidingView>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default MultiStepForm;
