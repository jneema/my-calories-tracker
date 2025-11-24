import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

const Nutrition = ({ COLORS }) => {
  const nutritionCategories = [
    {
      name: "Protein",
      icon: "fish",
      amount: 75,
      targetAmount: 100,
      unit: "g",
      color: COLORS.accent.orange,
    },
    {
      name: "Carbs",
      icon: "nutrition", // Better icon choice
      amount: 250,
      targetAmount: 300,
      unit: "g",
      color: COLORS.accent.yellow,
    },
    {
      name: "Fats",
      icon: "flame", // More appropriate than "water"
      amount: 60,
      targetAmount: 100,
      unit: "g",
      color: COLORS.accent.green,
    },
  ];

  return (
    <>
      {/* Nutrition Macros */}
      <View className="flex-row mt-5 gap-3">
        {nutritionCategories.map((item) => {
          const itemPercentage = Math.min(
            100,
            Math.round((item.amount / item.targetAmount) * 100)
          );

          return (
            <View
              key={item.name}
              className="flex-1 bg-white rounded-xl p-4"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 3,
                elevation: 1,
              }}
            >
              <View className="flex-col items-center mb-3">
                <Ionicons name={item.icon} size={28} color={item.color} />
                <Text className="font-semibold text-sm mt-2">{item.name}</Text>
              </View>

              <View className="mb-3">
                <Text className="text-gray-600 text-xs text-center">
                  {item.amount}/{item.targetAmount}
                  {item.unit}
                </Text>
                <Text className="text-xs text-gray-400 text-center mt-1 font-medium">
                  {itemPercentage}%
                </Text>
              </View>

              <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <View
                  style={{
                    width: `${itemPercentage}%`,
                    height: "100%",
                    backgroundColor: item.color,
                    borderRadius: 9999,
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    </>
  );
};

export default Nutrition;
