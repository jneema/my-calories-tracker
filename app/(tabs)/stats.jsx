import React, { useState, useMemo } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Stats = () => {
  const timePeriod = ["Week", "Month", "Year"];
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Week");

  // Mock data for different time periods
  const statsData = {
    Week: {
      avgCalories: 2200,
      calorieGoal: 2700,
      weight: 150,
      weightChange: -0.5,
      weightGoal: 145,
      calorieLabel: "AVG DAILY",
    },
    Month: {
      avgCalories: 15400, // weekly average
      calorieGoal: 18900,
      weight: 150,
      weightChange: -3,
      weightGoal: 145,
      calorieLabel: "AVG WEEKLY",
    },
    Year: {
      avgCalories: 66000, // monthly average
      calorieGoal: 81000,
      weight: 150,
      weightChange: -12,
      weightGoal: 145,
      calorieLabel: "AVG MONTHLY",
    },
  };

  // Calculate stats based on selected period
  const currentStats = useMemo(() => {
    const data = statsData[selectedTimePeriod];
    const caloriePercentage = Math.round(
      (data.avgCalories / data.calorieGoal) * 100
    );
    const calorieFromGoal = data.calorieGoal - data.avgCalories;
    const weightPercentage = Math.round(
      ((data.weightGoal - (data.weight - Math.abs(data.weightChange))) /
        (data.weightGoal - data.weight + Math.abs(data.weightChange))) *
        100
    );

    return {
      ...data,
      caloriePercentage,
      calorieFromGoal,
      weightPercentage: Math.min(weightPercentage, 100),
      weightChangeText:
        selectedTimePeriod === "Week"
          ? "this week"
          : selectedTimePeriod === "Month"
            ? "this month"
            : "this year",
    };
  }, [selectedTimePeriod]);

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center space-x-2">
            <Text className="text-5xl font-bold">Progress</Text>
          </View>
          <Ionicons name="cloud-upload-outline" size={24} color="black" />
        </View>

        <View className="mt-5 w-[60%]">
          <View className="flex-row justify-between">
            {timePeriod.map((time) => {
              const isSelected = selectedTimePeriod === time;
              return (
                <TouchableOpacity
                  key={time}
                  activeOpacity={0.8}
                  onPress={() => setSelectedTimePeriod(time)}
                  className={`flex-1 mx-1 rounded-3xl py-3 flex-row items-center justify-center ${
                    isSelected ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`font-semibold text-sm ${
                      isSelected ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View className="flex-row mt-4 gap-3 w-full">
          {/* Calories Card */}
          <View
            className="flex-1 bg-white rounded-xl p-3"
            style={{ height: 140 }}
          >
            <View className="flex flex-col items-center">
              <View className="bg-blue-50 rounded-full p-2">
                <Ionicons name="nutrition" size={20} color="#2563eb" />
              </View>
              <Text className="font-semibold text-sm mt-1">
                {currentStats.calorieLabel}
              </Text>
            </View>
            <View className="mt-auto">
              <Text className="text-gray-600 text-xs text-center">
                {currentStats.avgCalories.toLocaleString()} kcal
              </Text>
              <Text className="text-xs text-gray-400 text-center mt-0.5">
                {currentStats.calorieFromGoal.toLocaleString()} from goal
              </Text>
            </View>
            <View className="w-full mt-2">
              <View className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <View
                  style={{
                    width: `${currentStats.caloriePercentage}%`,
                    height: "100%",
                    backgroundColor: "#2563eb",
                    borderRadius: 9999,
                  }}
                />
              </View>
            </View>
          </View>

          {/* Weight Card */}
          <View
            className="flex-1 bg-white rounded-xl p-3"
            style={{ height: 140 }}
          >
            <View className="flex flex-col items-center">
              <View className="bg-pink-50 rounded-full p-2">
                <Ionicons name="body" size={20} color="#ec4899" />
              </View>
              <Text className="font-semibold text-sm mt-1">WEIGHT</Text>
            </View>
            <View className="mt-auto">
              <Text className="text-gray-600 text-xs text-center">
                {currentStats.weight} lbs
              </Text>
              <Text className="text-xs text-gray-400 text-center mt-0.5">
                {currentStats.weightChange > 0 ? "+" : ""}
                {currentStats.weightChange} lbs {currentStats.weightChangeText}
              </Text>
            </View>
            <View className="w-full mt-2">
              <View className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <View
                  style={{
                    width: `${currentStats.weightPercentage}%`,
                    height: "100%",
                    backgroundColor: "#ec4899",
                    borderRadius: 9999,
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
