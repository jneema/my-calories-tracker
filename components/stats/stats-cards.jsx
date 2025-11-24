import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const StatsCards = ({ COLORS, data, selectedTimePeriod, chartValues }) => {
  const avgCalories = Math.round(
    chartValues.reduce((a, b) => a + b, 0) / chartValues.length
  );
  const calorieFromGoal = data.calorieGoal - avgCalories;
  const caloriePercentage = Math.min(
    100,
    Math.round((avgCalories / data.calorieGoal) * 100)
  );
  return (
    <>
      <View className="flex-row mt-6 gap-3 w-full">
        {/* Calories */}
        <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
          <View className="items-center">
            <View
              className="p-3 rounded-full"
              style={{ backgroundColor: `${COLORS.primary.light}20` }}
            >
              <Ionicons name="flame" size={22} color={COLORS.primary.main} />
            </View>
            <Text className="font-semibold text-sm mt-2 text-gray-800">
              AVG{" "}
              {selectedTimePeriod === "Week"
                ? "DAILY"
                : selectedTimePeriod === "Month"
                  ? "WEEKLY"
                  : "MONTHLY"}
            </Text>
          </View>

          <View className="mt-auto items-center">
            <Text className="text-gray-900 text-base font-bold">
              {avgCalories.toLocaleString()} kcal
            </Text>
            <Text
              className={`text-xs mt-1 ${
                avgCalories > data.calorieGoal
                  ? "text-green-500"
                  : avgCalories < data.calorieGoal
                    ? "text-red-600"
                    : "text-gray-400"
              }`}
            >
              {avgCalories > data.calorieGoal
                ? `+${Math.abs(calorieFromGoal).toLocaleString()} above goal`
                : avgCalories < data.calorieGoal
                  ? `-${Math.abs(calorieFromGoal).toLocaleString()} below goal`
                  : "at goal"}
            </Text>

            <View className="w-full mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
              <View
                style={{
                  width: `${caloriePercentage}%`,
                  height: "100%",
                  backgroundColor: COLORS.primary.main,
                }}
              />
            </View>
          </View>
        </View>

        {/* Weight */}
        <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
          <View className="items-center">
            <View className="bg-pink-100 p-3 rounded-full">
              <Ionicons name="body" size={22} color="#ec4899" />
            </View>
            <Text className="font-semibold text-sm mt-2 text-gray-800">
              WEIGHT
            </Text>
          </View>

          <View className="mt-auto items-center">
            <Text className="text-gray-900 text-base font-bold">
              {data.weight} lbs
            </Text>
            <Text className="text-xs text-gray-400 mt-1">
              {data.weightChange} lbs
              {selectedTimePeriod === "Week"
                ? "this week"
                : selectedTimePeriod === "Month"
                  ? "this month"
                  : "this year"}
            </Text>

            <View className="w-full mt-2 bg-gray-200 h-2 rounded-full overflow-hidden">
              <LinearGradient
                colors={["#ec4899", "#db2777"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  width: `${Math.min(100, (data.weightGoal / data.weight) * 100)}%`,
                  height: "100%",
                  borderRadius: 8,
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default StatsCards;
