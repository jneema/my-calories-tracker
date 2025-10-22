import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const StepThree = ({ formData, updateField }) => {
  const options = [
    {
      key: "sedentary",
      label: "Sedentary",
      desc: "Little or no exercise",
      icon: "bed-outline",
    },
    {
      key: "light",
      label: "Light",
      desc: "Exercise 1–3 days/week",
      icon: "walk-outline",
    },
    {
      key: "moderate",
      label: "Moderate",
      desc: "Exercise 3–5 days/week",
      icon: "bicycle-outline",
    },
    {
      key: "active",
      label: "Active",
      desc: "Exercise 6–7 days/week",
      icon: "fitness-outline",
    },
    {
      key: "veryActive",
      label: "Very Active",
      desc: "Intense daily training",
      icon: "barbell-outline",
    },
  ];

  const goals = [
    {
      key: "lose",
      label: "Lose Weight",
      desc: "500 calorie deficit",
      icon: "trending-down-outline",
      borderColor: "#fb7185",
      bgColor: "#fff1f2",
      selectedColor: "#f43f5e",
    },
    {
      key: "maintain",
      label: "Maintain Weight",
      desc: "No calorie adjustment",
      icon: "chevron-collapse-outline",
      borderColor: "#60a5fa",
      bgColor: "#eff6ff",
      selectedColor: "#3b82f6",
    },
    {
      key: "gain",
      label: "Gain Weight",
      desc: "300 calorie surplus",
      icon: "trending-up-outline",
      borderColor: "#5eead4",
      bgColor: "#f0fdfa",
      selectedColor: "#14b8a6",
    },
  ];

  return (
    <View className="space-y-4">
      {/* Activity Level Section */}
      <View className="mb-2">
        <Text className="text-gray-900 text-[17px] font-semibold mb-1">
          Activity Level
        </Text>
        <Text className="text-gray-500 text-[13px]">
          How often do you exercise?
        </Text>
      </View>

      {options.map((option) => {
        const isSelected = formData.activityLevel === option.key;
        return (
          <TouchableOpacity
            key={option.key}
            onPress={() => updateField("activityLevel", option.key)}
            activeOpacity={0.85}
            className="p-5 rounded-2xl flex-row items-center mb-3"
            style={{
              borderWidth: 2,
              borderColor: isSelected ? "#f43f5e" : "#e5e7eb",
              backgroundColor: isSelected ? "#fff1f2" : "#fff",
              shadowColor: isSelected ? "#f43f5e" : "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: isSelected ? 0.25 : 0.08,
              shadowRadius: 6,
              elevation: isSelected ? 4 : 1,
              transform: [{ scale: isSelected ? 1.02 : 1 }],
            }}
          >
            <View className="flex-row items-center">
              <View
                className="w-10 h-10 rounded-full items-center justify-center mr-3"
                style={{
                  backgroundColor: isSelected ? "#f43f5e" : "#f3f4f6",
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
                  className={`text-[15px] font-semibold mb-0.5 ${
                    isSelected ? "text-[#f43f5e]" : "text-gray-900"
                  }`}
                >
                  {option.label}
                </Text>
                <Text className="text-[13px] text-gray-500">{option.desc}</Text>
              </View>
              {isSelected && (
                <Ionicons name="checkmark-circle" size={24} color="#f43f5e" />
              )}
            </View>
          </TouchableOpacity>
        );
      })}

      {/* Goal Section */}
      <View className="space-y-4 mt-6">
        <View className="mb-2">
          <Text className="text-gray-900 text-[17px] font-semibold mb-1">
            Your Goal
          </Text>
          <Text className="text-gray-500 text-[13px]">
            What would you like to achieve?
          </Text>
        </View>

        {goals.map((goal) => {
          const isSelected = formData.goal === goal.key;
          return (
            <TouchableOpacity
              key={goal.key}
              onPress={() => updateField("goal", goal.key)}
              activeOpacity={0.85}
              className="p-5 rounded-2xl flex-row items-center mb-3"
              style={{
                borderWidth: 2,
                borderColor: isSelected ? goal.selectedColor : "#e5e7eb",
                backgroundColor: isSelected ? goal.bgColor : "#fff",
                shadowColor: isSelected ? goal.selectedColor : "#000",
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: isSelected ? 0.25 : 0.08,
                shadowRadius: 6,
                elevation: isSelected ? 4 : 1,
                transform: [{ scale: isSelected ? 1.02 : 1 }],
              }}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center mr-3"
                    style={{
                      backgroundColor: isSelected
                        ? goal.selectedColor
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
                      className={`text-[16px] font-semibold mb-1 ${
                        isSelected ? "text-gray-900" : "text-gray-800"
                      }`}
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
                    style={{ backgroundColor: goal.selectedColor }}
                  >
                    <Ionicons name="checkmark" size={16} color="#fff" />
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepThree;
