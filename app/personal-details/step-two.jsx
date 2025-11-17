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
      <Text className="text-gray-700 text-base mb-2 mt-5">Weight</Text>
      <TextInput
        value={formData.weight}
        onChangeText={(t) => updateField("weight", t)}
        keyboardType="numeric"
        className="rounded-lg px-4 py-3 border border-gray-300"
        placeholder="Weight(kg)"
      />
      <Text className="text-gray-700 text-base mb-2 mt-5">Height</Text>
      <TextInput
        value={formData.height}
        onChangeText={(t) => updateField("height", t)}
        keyboardType="numeric"
        className="rounded-lg px-4 py-3 border border-gray-300"
        placeholder="Height(cm)"
      />
        <Text className="text-gray-700 text-base mb-2 mt-5">Waist Length</Text>
      <TextInput
        value={formData.waistLength}
        onChangeText={(t) => updateField("waistLength", t)}
        keyboardType="numeric"
        className="rounded-lg px-4 py-3 border border-gray-300"
        placeholder="Waist Length(cm)"
      />
    </>
  );
};

export default StepTwo;
