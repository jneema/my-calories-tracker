// (tabs)/plan.tsx
import { View, Text } from "react-native";
import React from "react";

const Plan = () => {
  return (
    <View>
      <Text>Plan Screen</Text>
    </View>
  );
};

export default Plan;

// This hides the tab completely
export const unstable_settings = {
  tabBarButton: () => null,
};
