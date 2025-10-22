import { View } from "react-native";
import styles from "../styles";

const DotIndicators = ({ total, active }) => (
  <View style={styles.dotsContainer}>
    {Array.from({ length: total }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          i === active && styles.activeDot,
          { width: i === active ? 24 : 8 },
        ]}
      />
    ))}
  </View>
);

export default DotIndicators;
