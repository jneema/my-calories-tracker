import { View, Text } from "react-native";
import React from "react";

const MacroBreakdown = ({data}) => {
  return (
    <>
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
          const macroPercentage = Math.round((macroValue / totalMacros) * 100);

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
    </>
  );
};

export default MacroBreakdown;
