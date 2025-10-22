import { useEffect, useRef } from "react";
import { Text } from "react-native";
import { Animated } from "react-native";
import styles from "../styles";

const AnimatedText = ({ title, description }) => {
  const translateY = useRef(new Animated.Value(20)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [title]);

  return (
    <Animated.View
      style={[styles.textWrapper, { opacity, transform: [{ translateY }] }]}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </Animated.View>
  );
};

export default AnimatedText;
