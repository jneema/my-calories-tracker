import { View } from "react-native";
import StatsCard from "./stats-card";

const DailyStats = ({ COLORS, storedData }) => {
  // Calorie stats
  const consumed = 1450;
  const calorieTotal = storedData.calorieTarget || 2200;
  const remaining = Math.max(0, calorieTotal - consumed);
  const caloriePercentage = Math.min(
    100,
    Math.round((consumed / calorieTotal) * 100)
  );

  // Workout stats
  const workoutMinutes = 45;
  const workoutGoal = 60;
  const workoutPercentage = Math.min(
    100,
    Math.round((workoutMinutes / workoutGoal) * 100)
  );

  // Fasting stats
  const fastingHours = 14;
  const fastingGoal = 16;
  const fastingPercentage = Math.min(
    100,
    Math.round((fastingHours / fastingGoal) * 100)
  );

  return (
    <View className="flex-row mt-5 gap-3">
      <StatsCard
        title="CALORIES"
        value={remaining}
        subtitle={`${consumed}/${calorieTotal} cal`}
        percentage={caloriePercentage}
        colors={[
          COLORS.primary.dark,
          COLORS.primary.main,
          COLORS.primary.light,
        ]}
      />

      <StatsCard
        title="WORKOUT"
        value={`${workoutMinutes}m`}
        subtitle={`of ${workoutGoal}m goal`}
        percentage={workoutPercentage}
        colors={[COLORS.primary.main, COLORS.primary.light]}
      />

      <StatsCard
        title="FASTING"
        value={`${fastingHours}h`}
        subtitle={`of ${fastingGoal}h goal`}
        percentage={fastingPercentage}
        colors={[COLORS.primary.dark, COLORS.primary.main]}
      />
    </View>
  );
};

export default DailyStats;
