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
      color: "#FF5F00",
      bg: "#FFF6EF",
    },
    {
      key: "light",
      label: "Light",
      desc: "Exercise 1–3 days/week",
      icon: "walk-outline",
      color: "#EB0071",
      bg: "#FFF0F6",
    },
    {
      key: "moderate",
      label: "Moderate",
      desc: "Exercise 3–5 days/week",
      icon: "bicycle-outline",
      color: "#00C9A7",
      bg: "#EFFFFB",
    },
    {
      key: "active",
      label: "Active",
      desc: "Exercise 6–7 days/week",
      icon: "fitness-outline",
      color: "#4A90E2",
      bg: "#EFF6FF",
    },
    {
      key: "veryActive",
      label: "Very Active",
      desc: "Intense daily training",
      icon: "barbell-outline",
      color: "#FACC15",
      bg: "#FFFBEB",
    },
  ];

  const goals = [
    {
      key: "lose",
      label: "Lose Weight",
      desc: "500 calorie deficit",
      icon: "trending-down-outline",
      color: "#FB7185",
      bg: "#FFF1F2",
    },
    {
      key: "maintain",
      label: "Maintain Weight",
      desc: "No calorie adjustment",
      icon: "chevron-collapse-outline",
      color: "#60A5FA",
      bg: "#EFF6FF",
    },
    {
      key: "gain",
      label: "Gain Weight",
      desc: "300 calorie surplus",
      icon: "trending-up-outline",
      color: "#34D399",
      bg: "#ECFDF5",
    },
  ];

  return (
    <View className="space-y-6">
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
            className="bg-white rounded-xl p-4 mb-3 flex-row items-center"
            style={{
              borderWidth: 2,
              borderColor: isSelected ? option.color : "transparent",
              backgroundColor: isSelected ? option.bg : "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 5,
              elevation: 2,
              transform: [{ scale: isSelected ? 1.02 : 1 }],
            }}
          >
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{
                backgroundColor: isSelected ? option.color : option.bg,
              }}
            >
              <Ionicons
                name={option.icon}
                size={20}
                color={isSelected ? "#fff" : option.color}
              />
            </View>

            <View className="ml-3 flex-1">
              <Text
                className={`text-[15px] font-semibold ${
                  isSelected ? "text-gray-900" : "text-gray-800"
                }`}
              >
                {option.label}
              </Text>
              <Text className="text-[13px] text-gray-600">{option.desc}</Text>
            </View>

            {isSelected && (
              <Ionicons name="checkmark-circle" size={22} color={option.color} />
            )}
          </TouchableOpacity>
        );
      })}

      {/* Goal Section */}
      <View className="mt-4">
        <Text className="text-gray-900 text-[17px] font-semibold mb-1">
          Your Goal
        </Text>
        <Text className="text-gray-500 text-[13px] mb-2">
          What would you like to achieve?
        </Text>

        {goals.map((goal) => {
          const isSelected = formData.goal === goal.key;
          return (
            <TouchableOpacity
              key={goal.key}
              onPress={() => updateField("goal", goal.key)}
              activeOpacity={0.85}
              className="bg-white rounded-xl p-4 mb-3 flex-row items-center"
              style={{
                borderWidth: 2,
                borderColor: isSelected ? goal.color : "transparent",
                backgroundColor: isSelected ? goal.bg : "#fff",
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.08,
                shadowRadius: 5,
                elevation: 2,
                transform: [{ scale: isSelected ? 1.02 : 1 }],
              }}
            >
              <View
                className="w-10 h-10 rounded-full items-center justify-center"
                style={{
                  backgroundColor: isSelected ? goal.color : goal.bg,
                }}
              >
                <Ionicons
                  name={goal.icon}
                  size={20}
                  color={isSelected ? "#fff" : goal.color}
                />
              </View>

              <View className="ml-3 flex-1">
                <Text
                  className={`text-[16px] font-semibold ${
                    isSelected ? "text-gray-900" : "text-gray-800"
                  }`}
                >
                  {goal.label}
                </Text>
                <Text className="text-[13px] text-gray-600">{goal.desc}</Text>
              </View>

              {isSelected && (
                <Ionicons name="checkmark-circle" size={22} color={goal.color} />
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default StepThree;
