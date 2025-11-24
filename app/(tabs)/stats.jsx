import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import CalendarView from "../../components/calendar-view";
import StatsCard from "../../components/stats/stats-cards";
import Charts from "../../components/stats/calorie-intake-chart";
import MacroBreakdown from "../../components/stats/macro-breakdown";
import TimeSelector from "../../components/stats/time-selector";

const Stats = () => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentDate = now.getDate();
  const currentMonth = now.getMonth();
  const currentWeekOfMonth = Math.ceil(currentDate / 7);
  const monthName = now.toLocaleString("default", { month: "long" });
  const currentYear = now.getFullYear();

  const [selectedTimePeriod, setSelectedTimePeriod] = useState("Week");

  const COLORS = {
    primary: {
      dark: "#0c4a6e",
      main: "#0369a1",
      light: "#0891b2",
    },
    accent: {
      orange: "#f97316",
      pink: "#ec4899",
      purple: "#9810FA",
    },
  };

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

  return (
    <SafeAreaView
      className="flex-1 px-5 bg-gray-50"
      edges={["top", "left", "right"]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
        bounces={false}
        alwaysBounceVertical={false}
      >
        {/* Header */}
        <View className="flex-row items-center justify-between mt-5">
          <Text className="text-5xl font-extrabold text-gray-900">
            Progress
          </Text>
          <Ionicons name="download-outline" size={24} color="black" />
        </View>

        <TimeSelector
          selectedTimePeriod={selectedTimePeriod}
          setSelectedTimePeriod={setSelectedTimePeriod}
        />
        <StatsCard
          COLORS={COLORS}
          data={data}
          selectedTimePeriod={selectedTimePeriod}
          chartValues={chartValues}
        />
        <Charts
          COLORS={COLORS}
          data={data}
          selectedTimePeriod={selectedTimePeriod}
          chartValues={chartValues}
        />
        <MacroBreakdown data={data} />
        {/* <WeightProgress data={data} selectedTimePeriod={selectedTimePeriod} /> */}

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
