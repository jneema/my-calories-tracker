import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useStoredItems from "../../hooks/useStoredItem";
import FastingModal from "../../components/fasting-modal";
import CalorieCard from "../../components/home/calorie-card";
import DailyStats from "../../components/home/daily-stats";
import Nutrition from "../../components/home/nutrition";
import QuickActions from "../../components/home/quick-actions";
import TodaysWorkouts from "../../components/home/todays-workouts";
import Meals from "../../components/home/meals";

const HomePage = () => {
  // Define consistent color system
  const COLORS = {
    primary: {
      dark: "#0c4a6e",
      main: "#0369a1",
      light: "#0891b2",
    },
    accent: {
      orange: "#f97316",
      yellow: "#eab308",
      green: "#10b981",
      amber: "#f59e0b",
      cyan: "#06b6d4",
      indigo: "#6366f1",
    },
  };

  const [showFastingModal, setShowFastingModal] = useState(false);
  const storedData = useStoredItems([
    "guestMode",
    "userFormData",
    "userName",
    "calorieTarget",
  ]);

  const date = new Date();
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const fullDate = `${month} ${day}, ${year}`;

  // Fix guest name logic - proper conditional rendering
  const guestName = storedData.userFormData
    ? `${storedData.userFormData.firstName} ${storedData.userFormData.lastName}`
    : "Guest";

  const displayName = storedData.guestMode
    ? guestName
    : storedData.userName || "User";

  return (
    <>
      <SafeAreaView
        className="flex-1 px-5 bg-gray-50"
        edges={["top", "left", "right"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          bounces={false}
          alwaysBounceVertical={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mt-5">
            <View>
              <Text className="font-bold text-4xl text-gray-900">
                Hello {displayName}
              </Text>
              <Text className="text-base text-gray-600 mt-1">
                {dayName}, {fullDate}
              </Text>
            </View>
            <View className="flex-row space-x-4">
              <TouchableOpacity
                className="p-2"
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons
                  name="notifications-outline"
                  size={24}
                  color="black"
                />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2"
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="settings-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>
          <CalorieCard COLORS={COLORS} storedData={storedData} />
          <DailyStats COLORS={COLORS} />
          <Nutrition COLORS={COLORS} />
          <QuickActions
            COLORS={COLORS}
            setShowFastingModal={setShowFastingModal}
          />
          <TodaysWorkouts COLORS={COLORS} />
          <Meals COLORS={COLORS} />
        </ScrollView>
      </SafeAreaView>
      <FastingModal
        visible={showFastingModal}
        onClose={() => setShowFastingModal(false)}
      />
    </>
  );
};

export default HomePage;
