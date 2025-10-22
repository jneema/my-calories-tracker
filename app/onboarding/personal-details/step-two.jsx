import { TextInput, Text } from "react-native";
import React from "react";

const StepTwo = ({ formData, updateField }) => {
  return (
    <>
      <Text className="text-gray-700 text-base mb-2">Age</Text>
      <TextInput
        value={formData.age}
        onChangeText={(t) => updateField("age", t)}
        keyboardType="numeric"
        className="rounded-lg px-4 py-3 border border-gray-300"
        placeholder="Enter your age"
      />
    </>
  );
};

export default StepTwo;
