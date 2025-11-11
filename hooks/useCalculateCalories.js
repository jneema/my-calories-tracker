export const calculateCalorieGoal = ({ gender, weight, height, age, activityLevel, goal }) => {
  // Convert strings to numbers just in case they're stored as text
  const w = parseFloat(weight);
  const h = parseFloat(height);
  const a = parseFloat(age);

  // Base metabolic rate
  let bmr;
  if (gender?.toLowerCase() === "male") {
    bmr = 10 * w + 6.25 * h - 5 * a + 5;
  } else {
    bmr = 10 * w + 6.25 * h - 5 * a - 161;
  }

  // Activity multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very: 1.9,
  };

  const multiplier = activityMultipliers[activityLevel?.toLowerCase()] || 1.2;
  let tdee = bmr * multiplier;

  // Adjust for goal
  if (goal?.toLowerCase() === "lose") tdee -= 500;
  else if (goal?.toLowerCase() === "gain") tdee += 500;

  return Math.round(tdee);
};
