import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Polyline, Circle, Line } from "react-native-svg";
import CalendarView from "../../components/calendar-view";

const Stats = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentDate = now.getDate();
  const currentMonth = now.getMonth();
  const currentWeekOfMonth = Math.ceil(currentDate / 7);
  const monthName = now.toLocaleString('default', { month: 'long' });
  const currentYear = now.getFullYear();

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
        {
          label: "Sun",
          value: 2650,
          carbs: 300,
          protein: 120,
          fats: 80,
          weight: 150,
        },
        {
          label: "Mon",
          value: 3100,
          carbs: 350,
          protein: 130,
          fats: 90,
          weight: 150.1,
        },
        {
          label: "Tue",
          value: 2450,
          carbs: 280,
          protein: 110,
          fats: 70,
          weight: 149.95,
        },
        {
          label: "Wed",
          value: 3200,
          carbs: 360,
          protein: 140,
          fats: 95,
          weight: 150.05,
        },
        {
          label: "Thu",
          value: 2300,
          carbs: 270,
          protein: 100,
          fats: 65,
          weight: 149.9,
        },
        {
          label: "Fri",
          value: 2900,
          carbs: 330,
          protein: 125,
          fats: 85,
          weight: 149.95,
        },
        {
          label: "Sat",
          value: 2250,
          carbs: 260,
          protein: 105,
          fats: 60,
          weight: 149.85,
        },
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
        {
          label: "W1",
          value: 18000,
          carbs: 2100,
          protein: 850,
          fats: 600,
          weight: 150,
        },
        {
          label: "W2",
          value: 19600,
          carbs: 2300,
          protein: 900,
          fats: 650,
          weight: 149.6,
        },
        {
          label: "W3",
          value: 17500,
          carbs: 2050,
          protein: 820,
          fats: 580,
          weight: 149.2,
        },
        {
          label: "W4",
          value: 20500,
          carbs: 2400,
          protein: 950,
          fats: 700,
          weight: 148.8,
        },
        {
          label: "W5",
          value: 18200,
          carbs: 2150,
          protein: 860,
          fats: 610,
          weight: 148.5,
        },
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
        {
          label: "Jan",
          value: 78500,
          carbs: 9400,
          protein: 3750,
          fats: 2600,
          weight: 150,
        },
        {
          label: "Feb",
          value: 81200,
          carbs: 9700,
          protein: 3900,
          fats: 2700,
          weight: 149.5,
        },
        {
          label: "Mar",
          value: 76000,
          carbs: 9100,
          protein: 3600,
          fats: 2500,
          weight: 149,
        },
        {
          label: "Apr",
          value: 83500,
          carbs: 10000,
          protein: 4000,
          fats: 2800,
          weight: 148.6,
        },
        {
          label: "May",
          value: 75000,
          carbs: 9000,
          protein: 3500,
          fats: 2450,
          weight: 148.3,
        },
        {
          label: "Jun",
          value: 82000,
          carbs: 9800,
          protein: 3950,
          fats: 2700,
          weight: 147.9,
        },
        {
          label: "Jul",
          value: 78000,
          carbs: 9300,
          protein: 3700,
          fats: 2600,
          weight: 147.6,
        },
        {
          label: "Aug",
          value: 80500,
          carbs: 9600,
          protein: 3850,
          fats: 2650,
          weight: 147.3,
        },
        {
          label: "Sep",
          value: 76500,
          carbs: 9200,
          protein: 3650,
          fats: 2550,
          weight: 147,
        },
        {
          label: "Oct",
          value: 84500,
          carbs: 10050,
          protein: 4000,
          fats: 2800,
          weight: 146.7,
        },
        {
          label: "Nov",
          value: 79500,
          carbs: 9500,
          protein: 3800,
          fats: 2650,
          weight: 146.4,
        },
        {
          label: "Dec",
          value: 77000,
          carbs: 9300,
          protein: 3700,
          fats: 2600,
          weight: 146,
        },
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
        // contentContainerStyle={{ paddingBottom: 40 }}
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
                    backgroundColor: "#d1d5db",
                  }}
                />

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
            </View>
          </View>
        </View>
        <View className="mt-8 bg-white rounded-2xl p-5 shadow-sm">
          <Text className="font-bold text-lg text-gray-800 mb-3">
            Macro Breakdown
          </Text>

          {["carbs", "protein", "fats"].map((macro) => {
            const macroValue = data.chartData[data.currentIndex][macro];
            const totalMacros =
              data.chartData[data.currentIndex].carbs +
              data.chartData[data.currentIndex].protein +
              data.chartData[data.currentIndex].fats;
            const macroPercentage = Math.round(
              (macroValue / totalMacros) * 100
            );

            const colors = {
              carbs: "#FE9A00",
              protein: "#FF2056",
              fats: "#9810FA",
            };

            return (
              <View key={macro} className="mb-3">
                <View className="flex-row justify-between items-center mb-1">
                  <Text className="text-xs text-gray-600 font-semibold">
                    {macro.charAt(0).toUpperCase() + macro.slice(1)}
                  </Text>
                  <Text className="text-xs text-gray-600 font-semibold">
                    {macroPercentage}% ({macroValue}g avg)
                  </Text>
                </View>
                <View className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                  <View
                    style={{
                      width: `${macroPercentage}%`,
                      height: "100%",
                      backgroundColor: colors[macro],
                    }}
                  />
                </View>
              </View>
            );
          })}
        </View>

        <View className="mt-8 bg-white rounded-2xl p-5 shadow-sm">
          <View className="flex-col justify-between items-left mb-5">
            <Text className="font-bold text-lg text-gray-800">
              {selectedTimePeriod === "Week"
                ? "Daily"
                : selectedTimePeriod === "Month"
                  ? "Weekly"
                  : "Monthly"}{" "}
              Weight Progress{" "}
            </Text>
            <Text className="text-[10px] text-green-600 font-semibold">
              Goal: {data.weightGoal} lbs
            </Text>
          </View>

          {/* Compute min and max weight for scaling */}
          {(() => {
            const weights = data.chartData.map(
              (item) => item.weight ?? data.weight
            );
            const minWeight = Math.min(...weights, data.weightGoal) - 2; // padding
            const maxWeight = Math.max(...weights, data.weightGoal) + 2; // padding
            const chartHeight = 220;
            const chartWidth = 300;

            return (
              <View
                style={{
                  height: chartHeight,
                  flexDirection: "row",
                  alignItems: "flex-end",
                }}
              >
                {/* Y-axis labels */}
                <View
                  style={{
                    width: 40,
                    height: "100%",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginRight: 5,
                  }}
                >
                  {Array.from({ length: 5 }).map((_, i) => {
                    const value = Math.round(
                      minWeight + ((maxWeight - minWeight) / 4) * (4 - i)
                    );
                    return (
                      <Text key={i} className="text-[10px] text-gray-500">
                        {value} lbs
                      </Text>
                    );
                  })}
                </View>

                {/* Line chart */}
                <View style={{ flex: 1 }}>
                  <Svg height={chartHeight} width="100%">
                    {/* Draw line */}
                    <Polyline
                      points={data.chartData
                        .map((item, i) => {
                          const x =
                            (i / (data.chartData.length - 1)) * chartWidth;
                          const weight = item.weight ?? data.weight;
                          const y =
                            chartHeight -
                            ((weight - minWeight) / (maxWeight - minWeight)) *
                              chartHeight;
                          return `${x},${y}`;
                        })
                        .join(" ")}
                      fill="none"
                      stroke="#ec4899"
                      strokeWidth="3"
                    />

                    {/* Draw dots */}
                    {data.chartData.map((item, i) => {
                      const x = (i / (data.chartData.length - 1)) * chartWidth;
                      const weight = item.weight ?? data.weight;
                      const y =
                        chartHeight -
                        ((weight - minWeight) / (maxWeight - minWeight)) *
                          chartHeight;
                      return (
                        <Circle key={i} cx={x} cy={y} r={4} fill="#ec4899" />
                      );
                    })}

                    {/* Goal line */}
                    <Line
                      x1="0"
                      y1={
                        chartHeight -
                        ((data.weightGoal - minWeight) /
                          (maxWeight - minWeight)) *
                          chartHeight
                      }
                      x2={chartWidth}
                      y2={
                        chartHeight -
                        ((data.weightGoal - minWeight) /
                          (maxWeight - minWeight)) *
                          chartHeight
                      }
                      stroke="#10b981"
                      strokeWidth="1"
                      strokeDasharray="4,2"
                    />
                  </Svg>

                  {/* X-axis labels */}
                  <View className="flex-row justify-between mt-2">
                    {data.chartData.map((item, i) => (
                      <Text key={i} className="text-[10px] text-gray-500">
                        {item.label}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            );
          })()}
        </View>
        <View className="mt-8 bg-white rounded-2xl p-5 shadow-sm">
          <View className="flex-col justify-between items-left mb-1">
            <Text className="font-bold text-lg text-gray-800">
              Tracking Streak
            </Text>
            <Text className="text-sm">
              {monthName} {currentYear}
            </Text>
          </View>

          <View>
            <CalendarView />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stats;
