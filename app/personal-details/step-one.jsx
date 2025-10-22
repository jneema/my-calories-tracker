import { View, Text, TextInput } from "react-native";
import AnimatedButton from "../../components/animated-button";
import { useSharedValue, withTiming } from "react-native-reanimated";

const StepOne = ({ formData, updateField, guestMode }) => {
  const maleScale = useSharedValue(1);
  const femaleScale = useSharedValue(1);


  return (
    <>
      {/* Show only when guestMode is "true" */}
      {guestMode === "true" && (
        <>
          <Text className="text-gray-700 text-base mb-2">Name or Nickname</Text>
          <TextInput
            value={formData.name}
            onChangeText={(t) => updateField("name", t)}
            className="rounded-lg px-4 py-3 border mb-5 border-gray-300"
            placeholder="Enter your name"
          />
        </>
      )}

      <Text className="text-gray-700 text-base mb-3">Gender</Text>
      <View className="flex-row justify-between gap-3">
        <AnimatedButton
          label="Male"
          icon="male"
          selected={formData.gender === "male"}
          onPressIn={() => (maleScale.value = withTiming(0.95))}
          onPressOut={() => {
            maleScale.value = withTiming(1);
            updateField("gender", "male");
          }}
          scale={maleScale}
        />
        <AnimatedButton
          label="Female"
          icon="female"
          selected={formData.gender === "female"}
          onPressIn={() => (femaleScale.value = withTiming(0.95))}
          onPressOut={() => {
            femaleScale.value = withTiming(1);
            updateField("gender", "female");
          }}
          scale={femaleScale}
        />
      </View>
    </>
  );
};

export default StepOne;
