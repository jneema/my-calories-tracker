import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const StepFour = ({ formData, guestMode }) => {
  const infoCards = [
    ...(guestMode
      ? [
          {
            label: "Name",
            value: formData.name,
            icon: "person",
            color: "#FF5F00",
            bg: "#FFF6EF",
          },
        ]
      : []),
    {
      label: "Gender",
      value: formData.gender,
      icon: "male-female",
      color: "#EB0071",
      bg: "#FFF0F6",
    },
    {
      label: "Age",
      value: formData.age,
      icon: "hourglass",
      color: "#00C9A7",
      bg: "#EFFFFB",
    },
    {
      label: "Weight",
      value: `${formData.weight} kg`,
      icon: "fitness",
      color: "#4A90E2",
      bg: "#EFF6FF",
    },
    {
      label: "Goal",
      value: formData.goal,
      icon: "flag",
      color: "#FACC15",
      bg: "#FFFBEB",
    },
  ];

  return (
    <View>
      {/* Gradient Summary Card */}
      <LinearGradient
        colors={["#14b8a6", "#06b6d4"]}
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
          2,150
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
          borderColor: "#14b8a6",
          backgroundColor: "transparent",
        }}
      >
        <Ionicons name="information-circle-outline" size={22} color="#14b8a6" />
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
