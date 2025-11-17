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
            ? "border-sky-700 bg-sky-50"
            : "border-gray-300 bg-white"
        }`}
        android_ripple={{ color: "#0369a130" }}
      >
        <Ionicons
          name={icon}
          size={20}
          color={selected ? "#0369a1" : "#6b7280"}
        />
        <Text
          className={`ml-2 text-base font-medium ${
            selected ? "text-sky-700" : "text-gray-700"
          }`}
        >
          {label}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedButton;