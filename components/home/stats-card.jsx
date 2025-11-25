import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";
import CircularProgress from "../circular-progress";

const StatsCard = ({ title, value, subtitle, percentage, colors }) => {
  const size = 80;
  const strokeWidth = 7;

  return (
    <LinearGradient
      colors={colors}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        borderRadius: 20,
        padding: 18,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.12,
        shadowRadius: 6,
        elevation: 3,
        minHeight: 170,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text className="text-white text-xs font-bold tracking-wider mb-3">
        {title}
      </Text>

      <View style={{ position: "relative", marginBottom: 12 }}>
        <CircularProgress
          size={size}
          strokeWidth={strokeWidth}
          percentage={percentage}
          color="white"
        />
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text className="text-2xl font-bold text-white text-center">
            {value}
          </Text>
          <Text className="text-[10px] text-white/70 text-center mt-0.5 font-medium">
            {percentage}%
          </Text>
        </View>
      </View>

      <Text className="text-white/90 text-xs text-center font-medium">
        {subtitle}
      </Text>
    </LinearGradient>
  );
};

export default StatsCard;