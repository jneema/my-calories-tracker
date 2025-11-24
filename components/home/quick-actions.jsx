import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const QuickActions = ({ COLORS, setShowFastingModal }) => {
  const router = useRouter();
  return (
    <>
      {/* Quick Actions */}
      <View className="flex-row gap-3 mt-5">
        <TouchableOpacity
          className="flex-1 rounded-xl p-4 items-center justify-center"
          style={{
            backgroundColor: COLORS.primary.dark,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
          activeOpacity={0.8}
          onPress={() => router.push("/log")}
        >
          <Ionicons name="restaurant" size={24} color="white" />
          <Text className="text-white font-semibold text-sm mt-2">
            Log Meal
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 rounded-xl p-4 items-center justify-center"
          style={{
            backgroundColor: COLORS.primary.main,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
          activeOpacity={0.8}
          onPress={() => console.log("Log Workout")}
        >
          <Ionicons name="barbell" size={24} color="white" />
          <Text className="text-white font-semibold text-sm mt-2">
            Log Workout
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-1 rounded-xl p-4 items-center justify-center"
          style={{
            backgroundColor: COLORS.primary.light,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 2,
          }}
          activeOpacity={0.8}
          onPress={() => setShowFastingModal(true)}
        >
          <Ionicons name="timer" size={24} color="white" />
          <Text className="text-white font-semibold text-sm mt-2">
            Begin Fast
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default QuickActions;
