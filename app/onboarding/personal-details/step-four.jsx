import { View, Text } from "react-native";
import React from "react";

const StepFour = ({ formData }) => {
  return (
    <View className="space-y-3">
      <Text className="text-lg font-semibold mb-2 text-gray-800">Summary</Text>
      <Text className="text-gray-700">👤 Name: {formData.name || "-"}</Text>
      <Text className="text-gray-700">🚻 Gender: {formData.gender || "-"}</Text>
      <Text className="text-gray-700">🎂 Age: {formData.age || "-"}</Text>
    </View>
  );
};

export default StepFour;
