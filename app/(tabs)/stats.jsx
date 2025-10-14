import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const Stats = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentDate = now.getDate();
  const currentMonth = now.getMonth();
  const currentWeekOfMonth = Math.ceil(currentDate / 7);

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Week");
  const [selectedBar, setSelectedBar] = useState(null);

  const statsData = {
    Week: {
      calorieGoal: 2700,
      dailyGoal: 2700,
      weight: 150,
      weightChange: -0.6,
      weightGoal: 145,
      chartData: [
        { label: "Sun", value: 2650 },
        { label: "Mon", value: 3100 },
        { label: "Tue", value: 2450 },
        { label: "Wed", value: 3200 },
        { label: "Thu", value: 2300 },
        { label: "Fri", value: 2900 },
        { label: "Sat", value: 2250 },
      ].slice(0, currentDay + 1),
      currentIndex: currentDay,
    },
    Month: {
      calorieGoal: 2700 * 7,
      dailyGoal: 2700,
      weight: 150,
      weightChange: -2.8,
      weightGoal: 145,
      chartData: [
        { label: "W1", value: 18000 },
        { label: "W2", value: 19600 },
        { label: "W3", value: 17500 },
        { label: "W4", value: 20500 },
        { label: "W5", value: 18200 },
      ].slice(0, currentWeekOfMonth),
      currentIndex: currentWeekOfMonth - 1,
    },
    Year: {
      calorieGoal: 2700 * 30,
      dailyGoal: 2700,
      weight: 150,
      weightChange: -12,
      weightGoal: 145,
      chartData: [
        { label: "Jan", value: 78500 },
        { label: "Feb", value: 81200 },
        { label: "Mar", value: 76000 },
        { label: "Apr", value: 83500 },
        { label: "May", value: 75000 },
        { label: "Jun", value: 82000 },
        { label: "Jul", value: 78000 },
        { label: "Aug", value: 80500 },
        { label: "Sep", value: 76500 },
        { label: "Oct", value: 84500 },
        { label: "Nov", value: 79500 },
        { label: "Dec", value: 77000 },
      ].slice(0, currentMonth + 1),
      currentIndex: currentMonth,
    },
  };

  const data = statsData[selectedTimePeriod];
  const chartValues = data.chartData.map((item) => item.value);
  const avgCalories = Math.round(
    chartValues.reduce((a, b) => a + b, 0) / chartValues.length
  );
  const calorieFromGoal = data.calorieGoal - avgCalories;
  const caloriePercentage = Math.min(
    100,
    Math.round((avgCalories / data.calorieGoal) * 100)
  );
  const maxChartValue = Math.max(...chartValues, data.calorieGoal);
  const yAxisMax = Math.ceil(maxChartValue / 1000) * 1000;

  return (
    <SafeAreaView className="flex-1 bg-gray-50 px-5">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mt-5">
          <Text className="text-4xl font-extrabold text-gray-900">
            Progress
          </Text>
          <Ionicons name="download-outline" size={24} color="black" />
        </View>

        {/* Time Selector */}
        <View className="mt-6 w-[70%] self-center">
          <View className="flex-row justify-between">
            {["Week", "Month", "Year"].map((time) => {
              const isSelected = selectedTimePeriod === time;
              return (
                <TouchableOpacity
                  key={time}
                  onPress={() => setSelectedTimePeriod(time)}
                  className={`flex-1 mx-1 py-3 rounded-full items-center ${
                    isSelected ? "bg-blue-600" : "bg-gray-200"
                  }`}
                  activeOpacity={0.8}
                >
                  <Text
                    className={`font-semibold ${isSelected ? "text-white" : "text-gray-800"}`}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Stats Cards */}
        <View className="flex-row mt-6 gap-3 w-full">
          {/* Calories */}
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <View className="items-center">
              <View className="bg-blue-100 p-3 rounded-full">
                <Ionicons name="flame" size={22} color="#2563eb" />
              </View>
              <Text className="font-semibold text-sm mt-2 text-gray-800">
                AVG{" "}
                {selectedTimePeriod === "Week"
                  ? "DAILY"
                  : selectedTimePeriod === "Month"
                    ? "WEEKLY"
                    : "MONTHLY"}{" "}
              </Text>
            </View>

            <View className="mt-auto items-center">
              <Text className="text-gray-900 text-base font-bold">
                {avgCalories.toLocaleString()} kcal
              </Text>
              <Text
                className={`text-xs mt-1 ${
                  avgCalories > data.calorieGoal
                    ? "text-red-500"
                    : avgCalories < data.calorieGoal
                      ? "text-green-600"
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
                    backgroundColor: "#2563eb",
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
                {data.weightChange} lbs{" "}
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
        {/* Chart */}
        <View className="mt-8 bg-white rounded-2xl p-5 shadow-sm">
          <View className="flex-col justify-between items-left mb-5">
            <Text className="font-bold text-lg text-gray-800">
              {selectedTimePeriod === "Week"
                ? "Daily"
                : selectedTimePeriod === "Month"
                  ? "Weekly"
                  : "Monthly"}{" "}
              Calorie Intake
            </Text>
            <Text className="text-[10px] text-green-600 font-semibold">
              Goal: {data.calorieGoal.toLocaleString()} kcal
            </Text>
          </View>

          <View className="flex-row">
            {/* Y-axis with labels */}
            <View
              style={{
                width: `${String(yAxisMax).length * 7}`,
                height: 220,
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => {
                const value = Math.round((yAxisMax / 4) * (4 - i));
                return (
                  <View
                    key={i}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      width: "100%",
                    }}
                  >
                    <Text className="text-[10px] text-gray-500">
                      {value.toLocaleString()}
                    </Text>
                  </View>
                );
              })}

              {/* Bottom axis label */}
              {/* <Text className="text-[10px] text-gray-500 mt-1">kcal</Text> */}
            </View>

            {/* Chart area */}
            <View style={{ flex: 1 }}>
              <View style={{ height: 220, position: "relative" }}>
                {/* Vertical Y-axis line */}
                <View
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    // width: 1,
                    backgroundColor: "#d1d5db",
                  }}
                />

                {/* Gridlines */}
                {/* {Array.from({ length: 5 }).map((_, i) => (
                  <View
                    key={i}
                    style={{
                      position: "absolute",
                      top: (220 / 4) * i,
                      left: 0,
                      right: 0,
                      height: 1,
                      backgroundColor: "#e5e7eb",
                    }}
                  />
                ))} */}

                {/* Goal line */}
                <View
                  style={{
                    position: "absolute",
                    top: 220 * (1 - data.calorieGoal / yAxisMax),
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: "#10b981",
                    opacity: 0.8,
                  }}
                />

                {/* Goal label */}
                <View
                  style={{
                    position: "absolute",
                    top: 220 * (1 - data.calorieGoal / yAxisMax) - 12,
                    right: 4,
                  }}
                />

                {/* Bars */}
                <View className="flex-row justify-between items-end h-full px-2">
                  {data.chartData.map((item, i) => {
                    const barHeight = (item.value / yAxisMax) * 100;
                    const isCurrent = i === data.currentIndex;
                    const isSelected = selectedBar === i;

                    return (
                      <TouchableOpacity
                        key={i}
                        activeOpacity={0.8}
                        onPress={() =>
                          setSelectedBar(selectedBar === i ? null : i)
                        }
                        className="items-center"
                      >
                        {/* Value floating above bar */}
                        {isSelected && (
                          <Text className="text-[10px] text-blue-600 font-bold mb-1">
                            {item.value.toLocaleString()}
                          </Text>
                        )}

                        <LinearGradient
                          colors={
                            isCurrent
                              ? ["#2563eb", "#3b82f6"]
                              : ["#bfdbfe", "#93c5fd"]
                          }
                          start={{ x: 0, y: 1 }}
                          end={{ x: 0, y: 0 }}
                          style={{
                            width:
                              selectedTimePeriod === "Year"
                                ? 14
                                : selectedTimePeriod === "Month"
                                  ? 20
                                  : 28,
                            height: `${barHeight}%`,
                            borderRadius: 8,
                          }}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              {/* X-axis */}
              <View className="flex-row justify-between mt-2">
                {data.chartData.map((item, i) => (
                  <Text
                    key={i}
                    className={`text-[10px] ${
                      i === data.currentIndex
                        ? "text-blue-600 font-semibold"
                        : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </Text>
                ))}
              </View>

              {/* Legend
      <View className="flex-row justify-end mt-3">
        <View className="flex-row items-center mr-3">
          <View className="w-3 h-3 rounded-full bg-green-500 mr-1" />
          <Text className="text-xs text-gray-500">Goal</Text>
        </View>
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-blue-500 mr-1" />
          <Text className="text-xs text-gray-500">Current</Text>
        </View>
      </View> */}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
