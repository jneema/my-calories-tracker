import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

const AnimatedButton = ({
  label,
  icon,
  selected,
  onPressIn,
  onPressOut,
  scale,
}) => {
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, { flex: 1 }]}>
      <Pressable
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        className={`flex-row items-center justify-center rounded-xl py-3 border ${
          selected
            ? "border-[#f43f5e] bg-[#f43f5e20]"
            : "border-gray-300 bg-white"
        }`}
        android_ripple={{ color: "#f43f5e30" }}
      >
        <Ionicons
          name={icon}
          size={20}
          color={selected ? "#f43f5e" : "#6b7280"}
        />
        <Text
          className={`ml-2 text-base font-medium ${
            selected ? "text-[#f43f5e]" : "text-gray-700"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedButton;
