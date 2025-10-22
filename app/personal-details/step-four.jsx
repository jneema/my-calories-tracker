import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

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
    <>
      {/* Gradient Summary Card */}
      <LinearGradient
        colors={["#FF5F00", "#EB0071"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 16,
          padding: 20,
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        <Text className="font-semibold text-base text-white/80 mb-1">
          YOUR DAILY CALORIE TARGET
        </Text>
        <Text className="text-5xl font-bold text-white mb-1">2,150</Text>
        <Text className="font-medium text-white/90">kcal per day</Text>
      </LinearGradient>

      {/* Info Cards */}
      <View className="mt-3">
        {infoCards.map((item, index) => (
          <View
            key={index}
            className="bg-white rounded-xl p-4 mb-3 flex-row items-center"
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
    </>
  );
};

export default StepFour;
