import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";

const CalorieCard = ({ COLORS, storedData }) => {
  // Progress calculation with safety checks
  const consumed = 1450;
  const total = storedData.calorieTarget || 2200;
  const remaining = Math.max(0, total - consumed); // Prevent negative
  const percentage = Math.min(100, Math.round((consumed / total) * 100)); // Cap at 100%

  // Circle properties
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;
  return (
    <>
      {/* Main Calorie Card */}
      <LinearGradient
        colors={[
          COLORS.primary.dark,
          COLORS.primary.main,
          COLORS.primary.light,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: 16,
          padding: 20,
          marginTop: 20,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 3,
        }}
      >
        <View className="flex-row items-center justify-between">
          <View style={{ flex: 1 }}>
            <Text className="font-semibold text-xs text-white/80 mb-2">
              REMAINING
            </Text>
            <Text className="text-5xl font-bold text-white mb-2">
              {remaining}
            </Text>
            <Text className="font-medium text-sm text-white/90">
              {consumed} / {total} cal
            </Text>
            {consumed > total && (
              <Text className="text-xs text-red-200 mt-2">
                Over daily limit
              </Text>
            )}
          </View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Svg
              width={size}
              height={size}
              style={{ transform: [{ rotate: "-90deg" }] }}
            >
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth={strokeWidth}
                fill="none"
              />
              <Circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="white"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={progress}
                strokeLinecap="round"
              />
            </Svg>
            <View
              style={{
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text className="text-lg font-bold text-white text-center">
                {percentage}%
              </Text>
              <Text className="text-xs text-white/90 text-center">goal</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </>
  );
};

export default CalorieCard;
