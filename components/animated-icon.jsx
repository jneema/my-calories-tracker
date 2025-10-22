import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { useEffect, useRef } from "react";
import styles from "../styles";
import { Animated } from "react-native";

const AnimatedIcon = ({ name }) => {
  const scale = useRef(new Animated.Value(0.5)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [name]);

  return (
    <BlurView intensity={100} tint="light" style={styles.blurContainer}>
      <Animated.View
        style={[styles.iconContainer, { opacity, transform: [{ scale }] }]}
      >
        <Ionicons name={name} size={48} color="white" />
      </Animated.View>
    </BlurView>
  );
};

export default AnimatedIcon;
