import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";

const CalorieIntakeChart = ({
  data,
  selectedTimePeriod,
  chartValues,
  COLORS,
}) => {
  const [selectedBar, setSelectedBar] = useState(null);

  const maxChartValue = Math.max(...chartValues, data.calorieGoal);
  const yAxisMax = Math.ceil(maxChartValue / 1000) * 1000;

  return (
    <>
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
          <Text className=" text-green-600 font-semibold">
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
                        <Text className="text-[10px] font-bold mb-1">
                          {item.value.toLocaleString()}
                        </Text>
                      )}

                      <LinearGradient
                        colors={
                          isCurrent
                            ? [COLORS.primary.main, COLORS.primary.light]
                            : [
                                COLORS.primary.main + "90", 
                                COLORS.primary.light + "30", 
                              ]
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
                    i === data.currentIndex ? "font-semibold" : "text-gray-500"
                  }`}
                >
                  {item.label}
                </Text>
              ))}
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default CalorieIntakeChart;
