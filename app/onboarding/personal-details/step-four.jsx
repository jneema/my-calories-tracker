import { View, Text } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

const StepFour = ({ formData }) => {
  return (
    <>
      <LinearGradient
        colors={["#FF5F00", "#EB0071"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 16,
          padding: 16,
          marginTop: 5,
          marginBottom: 15
        }}
      >
        <Text className="font-semibold text-xl text-white/80 mb-1">
          Your daily calorie target
        </Text>
        <Text className="text-5xl font-bold text-white">25</Text>
        <Text className="font-medium text text-white/90">kcal per day</Text>
      </LinearGradient>

      <View className="space-y-4">
        {[
          { label: "Name", value: formData.name },
          { label: "Gender", value: formData.gender },
          { label: "Age", value: formData.age },
          { label: "Weight", value: `${formData.weight} kg` },
          { label: "Goal", value: formData.goal },
        ].map((item, index) => (
          <View
            key={index}
            className="p-5 rounded-2xl flex-row items-center mb-3"
            style={{
              borderWidth: 2,
              borderColor: "#e5e7eb",
              backgroundColor: "#fff",
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.08,
              shadowRadius: 6,
              elevation: 1,
            }}
          >
            <View className="flex-row items-center justify-between w-full">
              <Text className="text-[16px] font-semibold text-gray-800">
                {item.label}
              </Text>
              <Text className="text-[15px] text-gray-600">{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </>
  );
};

export default StepFour;
