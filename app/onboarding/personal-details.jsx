import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const { height, width } = Dimensions.get("window");

const steps = [
  {
    id: 1,
    title: "What is your name?",
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
    icon: "checkbox",
  },
  {
    id: 4,
    title: "You're all set!",
    subtitle: "Review your details before finishing.",
    icon: "checkmark-circle",
  },
];

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    age: "",
    activityLevel: "",
    goal: "",
  });

  const updateField = (key, value) =>
    setFormData((prev) => ({ ...prev, [key]: value }));

  const progressWidth = (step / steps.length) * width;

  const maleScale = useSharedValue(1);
  const femaleScale = useSharedValue(1);

  const currentStep = steps.find((s) => s.id === step);

  const canProceed = true;

  const handleNext = () => {
    if (step < steps.length) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
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
          <View className="flex-1 bg-white">
            <ScrollView
              contentContainerStyle={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                paddingBottom: 100, // Extra padding to ensure content isn't cut off
                flexGrow: 1,
              }}
              showsVerticalScrollIndicator={false}
            >
              {step === 1 && (
                <>
                  <Text className="text-gray-700 text-base mb-2">
                    Name or Nickname
                  </Text>
                  <TextInput
                    value={formData.name}
                    onChangeText={(t) => updateField("name", t)}
                    className="rounded-lg px-4 py-3 border mb-5 border-gray-300"
                    placeholder="Enter your name"
                  />
                  <Text className="text-gray-700 text-base mb-3">Gender</Text>
                  <View className="flex-row justify-between gap-3">
                    <AnimatedButton
                      label="Male"
                      icon="male"
                      selected={formData.gender === "male"}
                      onPressIn={() => (maleScale.value = withTiming(0.95))}
                      onPressOut={() => {
                        maleScale.value = withTiming(1);
                        updateField("gender", "male");
                      }}
                      scale={maleScale}
                    />
                    <AnimatedButton
                      label="Female"
                      icon="female"
                      selected={formData.gender === "female"}
                      onPressIn={() => (femaleScale.value = withTiming(0.95))}
                      onPressOut={() => {
                        femaleScale.value = withTiming(1);
                        updateField("gender", "female");
                      }}
                      scale={femaleScale}
                    />
                  </View>
                </>
              )}

              {step === 2 && (
                <>
                  <Text className="text-gray-700 text-base mb-2">Age</Text>
                  <TextInput
                    value={formData.age}
                    onChangeText={(t) => updateField("age", t)}
                    keyboardType="numeric"
                    className="rounded-lg px-4 py-3 border border-gray-300"
                    placeholder="Enter your age"
                  />
                </>
              )}

              {step === 3 && (
                <View className="space-y-4">
                  <View className="mb-2">
                    <Text className="text-gray-900 text-[17px] font-semibold mb-1">
                      Activity Level
                    </Text>
                    <Text className="text-gray-500 text-[13px]">
                      How often do you exercise?
                    </Text>
                  </View>

                  {[
                    {
                      key: "sedentary",
                      label: "Sedentary",
                      desc: "Little or no exercise",
                      icon: "bed-outline",
                    },
                    {
                      key: "light",
                      label: "Light",
                      desc: "Exercise 1-3 days/week",
                      icon: "walk-outline",
                    },
                    {
                      key: "moderate",
                      label: "Moderate",
                      desc: "Exercise 3-5 days/week",
                      icon: "bicycle-outline",
                    },
                    {
                      key: "active",
                      label: "Active",
                      desc: "Exercise 6-7 days/week",
                      icon: "fitness-outline",
                    },
                    {
                      key: "veryActive",
                      label: "Very Active",
                      desc: "Intense daily training",
                      icon: "barbell-outline",
                    },
                  ].map((option) => {
                    const isSelected = formData.activityLevel === option.key;
                    return (
                      <TouchableOpacity
                        key={option.key}
                        onPress={() => updateField("activityLevel", option.key)}
                        activeOpacity={0.7}
                        className="p-4 rounded-[16px] border-2"
                        style={{
                          borderColor: isSelected ? "#f43f5e" : "#e5e7eb",
                          backgroundColor: isSelected ? "#fef2f2" : "#fff",
                          shadowColor: isSelected ? "#f43f5e" : "#000",
                          shadowOffset: { width: 0, height: 2 },
                          shadowOpacity: isSelected ? 0.15 : 0.05,
                          shadowRadius: 4,
                          elevation: isSelected ? 3 : 1,
                        }}
                      >
                        <View className="flex-row items-center">
                          <View
                            className="w-10 h-10 rounded-full items-center justify-center mr-3"
                            style={{
                              backgroundColor: isSelected
                                ? "#f43f5e"
                                : "#f3f4f6",
                            }}
                          >
                            <Ionicons
                              name={option.icon}
                              size={20}
                              color={isSelected ? "#fff" : "#6b7280"}
                            />
                          </View>
                          <View className="flex-1">
                            <Text
                              className={`text-[15px] font-semibold mb-0.5 ${isSelected ? "text-[#f43f5e]" : "text-gray-900"}`}
                            >
                              {option.label}
                            </Text>
                            <Text className="text-[13px] text-gray-500">
                              {option.desc}
                            </Text>
                          </View>
                          {isSelected && (
                            <Ionicons
                              name="checkmark-circle"
                              size={24}
                              color="#f43f5e"
                            />
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}

                  <View className="space-y-4 mt-6">
                    <View className="mb-2">
                      <Text className="text-gray-900 text-[17px] font-semibold mb-1">
                        Your Goal
                      </Text>
                      <Text className="text-gray-500 text-[13px]">
                        What would you like to achieve?
                      </Text>
                    </View>

                    {[
                      {
                        key: "lose",
                        label: "Lose Weight",
                        desc: "500 calorie deficit",
                        icon: "trending-down-outline",
                        borderColor: "#fb7185",
                        bgColor: "#fff1f2",
                        selectedBorder: "#f43f5e",
                      },
                      {
                        key: "maintain",
                        label: "Maintain Weight",
                        desc: "No calorie adjustment",
                        icon: "chevron-collapse-outline",
                        borderColor: "#60a5fa",
                        bgColor: "#eff6ff",
                        selectedBorder: "#3b82f6",
                      },
                      {
                        key: "gain",
                        label: "Gain Weight",
                        desc: "300 calorie surplus",
                        icon: "trending-up-outline",
                        borderColor: "#5eead4",
                        bgColor: "#f0fdfa",
                        selectedBorder: "#14b8a6",
                      },
                    ].map((goal) => {
                      const isSelected = formData.goal === goal.key;
                      return (
                        <TouchableOpacity
                          key={goal.key}
                          onPress={() => updateField("goal", goal.key)}
                          activeOpacity={0.7}
                          className="p-5 rounded-[18px] border-2"
                          style={{
                            borderColor: isSelected
                              ? goal.selectedBorder
                              : "#e5e7eb",
                            backgroundColor: isSelected ? goal.bgColor : "#fff",
                            shadowColor: isSelected
                              ? goal.selectedBorder
                              : "#000",
                            shadowOffset: { width: 0, height: 3 },
                            shadowOpacity: isSelected ? 0.2 : 0.05,
                            shadowRadius: 5,
                            elevation: isSelected ? 4 : 1,
                          }}
                        >
                          <View className="flex-row items-center justify-between">
                            <View className="flex-row items-center flex-1">
                              <View
                                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                                style={{
                                  backgroundColor: isSelected
                                    ? "#f43f5e"
                                    : "#f3f4f6",
                                }}
                              >
                                <Ionicons
                                  name={goal.icon}
                                  size={20}
                                  color={isSelected ? "#fff" : "#6b7280"}
                                />
                              </View>
                              <View className="flex-1 ml-3">
                                <Text
                                  className={`text-[16px] font-semibold mb-1 ${isSelected ? "text-gray-900" : "text-gray-800"}`}
                                >
                                  {goal.label}
                                </Text>
                                <Text className="text-[13px] text-gray-600">
                                  {goal.desc}
                                </Text>
                              </View>
                            </View>
                            {isSelected && (
                              <View
                                className="w-6 h-6 rounded-full items-center justify-center"
                                style={{ backgroundColor: goal.selectedBorder }}
                              >
                                <Ionicons
                                  name="checkmark"
                                  size={16}
                                  color="#fff"
                                />
                              </View>
                            )}
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              )}

              {step === 4 && (
                <View className="space-y-3">
                  <Text className="text-lg font-semibold mb-2 text-gray-800">
                    Summary
                  </Text>
                  <Text className="text-gray-700">
                    👤 Name: {formData.name || "-"}
                  </Text>
                  <Text className="text-gray-700">
                    🚻 Gender: {formData.gender || "-"}
                  </Text>
                  <Text className="text-gray-700">
                    🎂 Age: {formData.age || "-"}
                  </Text>
                </View>
              )}
            </ScrollView>

            {/* Bottom section */}
            <View className="px-5 pb-5">
              {/* Progress Bar */}
              <View className="h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
                <View
                  style={{ width: progressWidth }}
                  className="h-2 bg-[#f43f5e] rounded-full"
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
                    <Text className="text-gray-700 text-base ml-2">Back</Text>
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
                    {step === steps.length ? "Finish" : "Next"}
                  </Text>
                  <Ionicons
                    name={step === steps.length ? "checkmark" : "arrow-forward"}
                    size={18}
                    color={canProceed ? "#fff" : "#9ca3af"}
                    style={{ marginLeft: 6 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default MultiStepForm;

/* --- Reusable Animated Button --- */
const AnimatedButton = ({
  label,
  icon,
  selected,
  onPressIn,
  onPressOut,
  scale,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        className={`flex-row items-center justify-center rounded-xl py-3 border ${
          selected
            ? "border-[#f43f5e] bg-[#f43f5e20]"
            : "border-gray-300 bg-white"
        }`}
        android_ripple={{ color: "#f43f5e30" }}
      >
        <Ionicons
          name={icon}
          size={20}
          color={selected ? "#f43f5e" : "#6b7280"}
        />
        <Text
          className={`ml-2 text-base font-medium ${
            selected ? "text-[#f43f5e]" : "text-gray-700"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};