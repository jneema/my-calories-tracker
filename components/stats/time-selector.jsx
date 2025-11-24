import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const TimeSelector = ({ selectedTimePeriod, setSelectedTimePeriod }) => {
  return (
    <>
      {/* Time Selector */}
      <View className="mt-1">
        <Text className="font-bold text-2xl mb-3">Select Time Period</Text>
        <View className="flex-row justify-between gap-2">
          {["Week", "Month", "Year"].map((time) => {
            const isSelected = selectedTimePeriod === time;
            return (
              <TouchableOpacity
                key={time}
                onPress={() => setSelectedTimePeriod(time)}
                className={`flex-1 py-3 rounded-full items-center ${
                  isSelected ? "bg-[#0c4a6e]" : "bg-gray-200"
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
    </>
  );
};

export default TimeSelector;
