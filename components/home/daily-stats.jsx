import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

const DailyStats = ({ COLORS }) => {
  // Workout stats
  const workoutMinutes = 45;
  const workoutGoal = 60;
  const workoutPercentage = Math.min(
    100,
    Math.round((workoutMinutes / workoutGoal) * 100)
  );

  // Fasting tracker
  const fastingHours = 14;
  const fastingGoal = 16;
  const fastingPercentage = Math.min(
    100,
    Math.round((fastingHours / fastingGoal) * 100)
  );

  return (
    <>
      {/* Daily Stats */}
      <View className="flex-row mt-5 gap-3">
        <LinearGradient
          colors={[COLORS.primary.main, COLORS.primary.light]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            borderRadius: 16,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="barbell" size={20} color="white" />
            <Text className="text-white/80 text-xs font-semibold ml-2">
              WORKOUT
            </Text>
          </View>
          <Text className="text-3xl font-bold text-white mb-1">
            {workoutMinutes}
          </Text>
          <Text className="text-white/90 text-xs mb-3">
            of {workoutGoal} min
          </Text>
          <View className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
            <View
              style={{
                width: `${workoutPercentage}%`,
                height: "100%",
                backgroundColor: "white",
                borderRadius: 9999,
              }}
            />
          </View>
        </LinearGradient>

        <LinearGradient
          colors={[COLORS.primary.dark, COLORS.primary.main]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flex: 1,
            borderRadius: 16,
            padding: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <View className="flex-row items-center mb-3">
            <Ionicons name="time" size={20} color="white" />
            <Text className="text-white/80 text-xs font-semibold ml-2">
              FASTING
            </Text>
          </View>
          <Text className="text-3xl font-bold text-white mb-1">
            {fastingHours}h
          </Text>
          <Text className="text-white/90 text-xs mb-3">
            of {fastingGoal}h goal
          </Text>
          <View className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
            <View
              style={{
                width: `${fastingPercentage}%`,
                height: "100%",
                backgroundColor: "white",
                borderRadius: 9999,
              }}
            />
          </View>
        </LinearGradient>
      </View>
    </>
  );
};

export default DailyStats;
