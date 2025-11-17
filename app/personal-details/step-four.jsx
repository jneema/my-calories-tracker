import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { calculateCalorieGoal } from "../../hooks/useCalculateCalories";

const StepFour = ({ formData, guestMode }) => {
  const [calorieTarget, setCalorieTarget] = useState(0);

  useEffect(() => {
    if (formData) {
      const target = calculateCalorieGoal(formData);
      setCalorieTarget(target);
    }
  }, [formData]);

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  const infoCards = [
    ...(guestMode
      ? [
          {
            label: "Name",
            value: fullName || "Guest User",
            icon: "person",
            color: "#0891b2",
            bg: "#ecfeff",
          },
        ]
      : []),
    {
      label: "Gender",
      value: formData.gender,
      icon: "male-female",
      color: "#0284c7",
      bg: "#e0f2fe",
    },
    {
      label: "Age",
      value: formData.age,
      icon: "hourglass",
      color: "#0369a1",
      bg: "#dbeafe",
    },
    {
      label: "Weight",
      value: `${formData.weight} kg`,
      icon: "fitness",
      color: "#075985",
      bg: "#e0f2fe",
    },
    {
      label: "Goal",
      value: formData.goal,
      icon: "flag",
      color: "#0c4a6e",
      bg: "#f0f9ff",
    },
  ];

  return (
    <View>
      {/* Gradient Summary Card */}
      <LinearGradient
        colors={["#0e7490", "#0891b2", "#06b6d4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 16,
          padding: 15,
          marginTop: -10,
        }}
      >
        <Text className="font-semibold text-base text-white/80">
          YOUR DAILY CALORIE TARGET
        </Text>
        <Text
          className="text-5xl font-bold text-white"
          style={{ lineHeight: 58 }}
        >
          {calorieTarget > 0 ? calorieTarget : "--"}
        </Text>
        <Text className="font-medium text-white/90">kcal per day</Text>
      </LinearGradient>

      {/* Info Cards */}
      <View className="mt-3">
        {infoCards.map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-xl p-2 mb-3 flex-row items-center"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.08,
              shadowRadius: 5,
              elevation: 2,
            }}
          >
            <View
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: item.bg }}
            >
              <Ionicons name={item.icon} size={20} color={item.color} />
            </View>
            <View className="ml-3 flex-row justify-between flex-1 items-center">
              <Text className="text-[16px] font-semibold text-gray-800">
                {item.label}
              </Text>
              <Text className="text-[15px] text-gray-600">{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View
        style={{
          borderRadius: 14,
          padding: 14,
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
          borderWidth: 2,
          borderColor: "#0891b2",
          backgroundColor: "transparent",
        }}
      >
        <Ionicons name="information-circle-outline" size={22} color="#0891b2" />
        <Text
          className="text-[#0f172a] text-[15px] ml-2 leading-6 flex-1"
          style={{ flexWrap: "wrap" }}
        >
          This target is calculated using the{" "}
          <Text className="font-semibold">Mifflin-St Jeor Formula</Text> based
          on your stats. You can adjust it anytime in settings.
        </Text>
      </View>
    </View>
  );
};

export default StepFour;
