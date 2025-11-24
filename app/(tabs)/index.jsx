import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { router } from "expo-router";
import useStoredItems from "../../hooks/useStoredItem";
import FastingModal from "../../components/fasting-modal";

const HomePage = () => {
  // Define consistent color system
  const COLORS = {
    primary: {
      dark: "#0c4a6e",
      main: "#0369a1",
      light: "#0891b2",
    },
    accent: {
      orange: "#f97316",
      yellow: "#eab308",
      green: "#10b981",
      amber: "#f59e0b",
      cyan: "#06b6d4",
      indigo: "#6366f1",
    },
  };

  const [showFastingModal, setShowFastingModal] = useState(false);
  const storedData = useStoredItems([
    "guestMode",
    "userFormData",
    "userName",
    "calorieTarget",
  ]);

  const date = new Date();
  const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const fullDate = `${month} ${day}, ${year}`;

  // Fix guest name logic - proper conditional rendering
  const guestName = storedData.userFormData
    ? `${storedData.userFormData.firstName} ${storedData.userFormData.lastName}`
    : "Guest";

  const displayName = storedData.guestMode
    ? guestName
    : storedData.userName || "User";

  // Progress calculation with safety checks
  const consumed = 1450;
  const total = storedData.calorieTarget || 2200;
  const remaining = Math.max(0, total - consumed); // Prevent negative
  const percentage = Math.min(100, Math.round((consumed / total) * 100)); // Cap at 100%

  // Circle properties
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;

  // Workout stats
  const workoutMinutes = 45;
  const workoutGoal = 60;
  const workoutPercentage = Math.min(
    100,
    Math.round((workoutMinutes / workoutGoal) * 100)
  );

  // Fasting tracker
  const fastingHours = 14;
  const fastingGoal = 16;
  const fastingPercentage = Math.min(
    100,
    Math.round((fastingHours / fastingGoal) * 100)
  );

  const nutritionCategories = [
    {
      name: "Protein",
      icon: "fish",
      amount: 75,
      targetAmount: 100,
      unit: "g",
      color: COLORS.accent.orange,
    },
    {
      name: "Carbs",
      icon: "nutrition", // Better icon choice
      amount: 250,
      targetAmount: 300,
      unit: "g",
      color: COLORS.accent.yellow,
    },
    {
      name: "Fats",
      icon: "flame", // More appropriate than "water"
      amount: 60,
      targetAmount: 100,
      unit: "g",
      color: COLORS.accent.green,
    },
  ];

  const todaysWorkouts = [
    {
      id: 1,
      name: "Morning Run",
      time: "6:30 AM",
      icon: "walk",
      iconColor: COLORS.accent.green,
      duration: "30 min",
      calories: 320,
      completed: true,
    },
    {
      id: 2,
      name: "Upper Body",
      time: "5:00 PM",
      icon: "barbell",
      iconColor: COLORS.accent.orange,
      duration: "45 min",
      calories: 280,
      completed: false,
      exercises: [
        { name: "Bench Press", sets: "3x10" },
        { name: "Pull-ups", sets: "3x8" },
        { name: "Shoulder Press", sets: "3x12" },
      ],
    },
  ];

  const meals = [
    {
      id: 1,
      name: "Breakfast",
      time: "8:00 AM",
      icon: "sunny",
      iconColor: COLORS.accent.amber,
      totalCalories: 520,
      foodItems: [
        { name: "Oatmeal with berries", calories: 280 },
        { name: "Greek Yogurt", calories: 120 },
        { name: "Orange Juice", calories: 120 },
      ],
    },
    {
      id: 2,
      name: "Lunch",
      time: "12:30 PM",
      icon: "partly-sunny",
      iconColor: COLORS.accent.cyan,
      totalCalories: 680,
      foodItems: [
        { name: "Grilled Chicken Salad", calories: 420 },
        { name: "Whole Wheat Bread", calories: 160 },
        { name: "Apple", calories: 100 },
      ],
    },
    {
      id: 3,
      name: "Dinner",
      time: "7:00 PM",
      icon: "moon",
      iconColor: COLORS.accent.indigo,
      totalCalories: 250,
      foodItems: [{ name: "Salmon with Vegetables", calories: 250 }],
    },
  ];

  const [expandedMeals, setExpandedMeals] = useState({});
  const [expandedWorkouts, setExpandedWorkouts] = useState({});

  const toggleMeal = (mealId) => {
    setExpandedMeals((prev) => ({
      ...prev,
      [mealId]: !prev[mealId],
    }));
  };

  const toggleWorkout = (workoutId) => {
    setExpandedWorkouts((prev) => ({
      ...prev,
      [workoutId]: !prev[workoutId],
    }));
  };

  return (
    <>
      <SafeAreaView
        className="flex-1 px-5 bg-gray-50"
        edges={["top", "left", "right"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          bounces={false}
          alwaysBounceVertical={false}
        >
          {/* Header */}
          <View className="flex-row items-center justify-between mt-5">
            <View>
              <Text className="font-bold text-4xl text-gray-900">
                Hello {displayName}
              </Text>
              <Text className="text-base text-gray-600 mt-1">
                {dayName}, {fullDate}
              </Text>
            </View>
            <View className="flex-row space-x-4">
              <TouchableOpacity
                className="p-2"
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="notifications-outline" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                className="p-2"
                activeOpacity={0.7}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="settings-outline" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main Calorie Card */}
          <LinearGradient
            colors={[COLORS.primary.dark, COLORS.primary.main, COLORS.primary.light]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              borderRadius: 16,
              padding: 20,
              marginTop: 20,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 3,
            }}
          >
            <View className="flex-row items-center justify-between">
              <View style={{ flex: 1 }}>
                <Text className="font-semibold text-xs text-white/80 mb-2">
                  REMAINING
                </Text>
                <Text className="text-5xl font-bold text-white mb-2">
                  {remaining}
                </Text>
                <Text className="font-medium text-sm text-white/90">
                  {consumed} / {total} cal
                </Text>
                {consumed > total && (
                  <Text className="text-xs text-red-200 mt-2">
                    ⚠️ Over daily limit
                  </Text>
                )}
              </View>

              <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Svg
                  width={size}
                  height={size}
                  style={{ transform: [{ rotate: "-90deg" }] }}
                >
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />
                  <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="white"
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={progress}
                    strokeLinecap="round"
                  />
                </Svg>
                <View
                  style={{
                    position: "absolute",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text className="text-lg font-bold text-white text-center">
                    {percentage}%
                  </Text>
                  <Text className="text-xs text-white/90 text-center">
                    goal
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Daily Stats */}
          <View className="flex-row mt-5 gap-3">
            <LinearGradient
              colors={[COLORS.primary.main, COLORS.primary.light]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                borderRadius: 16,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center mb-3">
                <Ionicons name="barbell" size={20} color="white" />
                <Text className="text-white/80 text-xs font-semibold ml-2">
                  WORKOUT
                </Text>
              </View>
              <Text className="text-3xl font-bold text-white mb-1">
                {workoutMinutes}
              </Text>
              <Text className="text-white/90 text-xs mb-3">
                of {workoutGoal} min
              </Text>
              <View className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                <View
                  style={{
                    width: `${workoutPercentage}%`,
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 9999,
                  }}
                />
              </View>
            </LinearGradient>

            <LinearGradient
              colors={[COLORS.primary.dark, COLORS.primary.main]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                borderRadius: 16,
                padding: 16,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
              }}
            >
              <View className="flex-row items-center mb-3">
                <Ionicons name="time" size={20} color="white" />
                <Text className="text-white/80 text-xs font-semibold ml-2">
                  FASTING
                </Text>
              </View>
              <Text className="text-3xl font-bold text-white mb-1">
                {fastingHours}h
              </Text>
              <Text className="text-white/90 text-xs mb-3">
                of {fastingGoal}h goal
              </Text>
              <View className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                <View
                  style={{
                    width: `${fastingPercentage}%`,
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 9999,
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Nutrition Macros */}
          <View className="flex-row mt-5 gap-3">
            {nutritionCategories.map((item) => {
              const itemPercentage = Math.min(
                100,
                Math.round((item.amount / item.targetAmount) * 100)
              );

              return (
                <View
                  key={item.name}
                  className="flex-1 bg-white rounded-xl p-4"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 1,
                  }}
                >
                  <View className="flex-col items-center mb-3">
                    <Ionicons name={item.icon} size={28} color={item.color} />
                    <Text className="font-semibold text-sm mt-2">
                      {item.name}
                    </Text>
                  </View>

                  <View className="mb-3">
                    <Text className="text-gray-600 text-xs text-center">
                      {item.amount}/{item.targetAmount}
                      {item.unit}
                    </Text>
                    <Text className="text-xs text-gray-400 text-center mt-1 font-medium">
                      {itemPercentage}%
                    </Text>
                  </View>

                  <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      style={{
                        width: `${itemPercentage}%`,
                        height: "100%",
                        backgroundColor: item.color,
                        borderRadius: 9999,
                      }}
                    />
                  </View>
                </View>
              );
            })}
          </View>

          {/* Quick Actions */}
          <View className="flex-row gap-3 mt-5">
            <TouchableOpacity
              className="flex-1 rounded-xl p-4 items-center justify-center"
              style={{
                backgroundColor: COLORS.primary.dark,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
              activeOpacity={0.8}
              onPress={() => router.push("/log")}
            >
              <Ionicons name="restaurant" size={24} color="white" />
              <Text className="text-white font-semibold text-sm mt-2">
                Log Meal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-xl p-4 items-center justify-center"
              style={{
                backgroundColor: COLORS.primary.main,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
              activeOpacity={0.8}
              onPress={() => console.log("Log Workout")}
            >
              <Ionicons name="barbell" size={24} color="white" />
              <Text className="text-white font-semibold text-sm mt-2">
                Log Workout
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-xl p-4 items-center justify-center"
              style={{
                backgroundColor: COLORS.primary.light,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 2,
              }}
              activeOpacity={0.8}
              onPress={() => setShowFastingModal(true)}
            >
              <Ionicons name="timer" size={24} color="white" />
              <Text className="text-white font-semibold text-sm mt-2">
                Begin Fast
              </Text>
            </TouchableOpacity>
          </View>

          {/* Today's Workouts */}
          <View className="mt-6">
            <Text className="font-bold text-2xl mb-4 text-gray-900">
              Today's Workouts
            </Text>

            {todaysWorkouts.length === 0 ? (
              <View
                className="bg-white rounded-xl p-8 items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 1,
                }}
              >
                <Ionicons name="barbell-outline" size={48} color="#d1d5db" />
                <Text className="text-gray-500 mt-3 text-center">
                  No workouts scheduled
                </Text>
              </View>
            ) : (
              todaysWorkouts.map((workout) => (
                <TouchableOpacity
                  key={workout.id}
                  className="bg-white rounded-xl p-4 mb-3"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 1,
                  }}
                  activeOpacity={0.8}
                  onPress={() => toggleWorkout(workout.id)}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View
                        className="w-12 h-12 rounded-full items-center justify-center"
                        style={{ backgroundColor: `${workout.iconColor}20` }}
                      >
                        <Ionicons
                          name={workout.icon}
                          size={24}
                          color={workout.iconColor}
                        />
                      </View>

                      <View className="ml-3 flex-1">
                        <View className="flex-row items-center">
                          <Text className="font-semibold text-base text-gray-900">
                            {workout.name}
                          </Text>
                          {workout.completed && (
                            <View className="ml-2 bg-green-100 rounded-full px-2 py-1">
                              <Text className="text-green-700 text-xs font-medium">
                                Done
                              </Text>
                            </View>
                          )}
                        </View>
                        <Text className="text-gray-500 text-sm mt-1">
                          {workout.time} • {workout.duration}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center">
                      <Text className="font-semibold text-base text-gray-900 mr-2">
                        {workout.calories} cal
                      </Text>
                      <Ionicons
                        name={
                          expandedWorkouts[workout.id]
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={20}
                        color="#9CA3AF"
                      />
                    </View>
                  </View>

                  {expandedWorkouts[workout.id] && workout.exercises && (
                    <View className="mt-4 pt-4 border-t border-gray-100">
                      {workout.exercises.map((exercise, index) => (
                        <View
                          key={index}
                          className="flex-row justify-between items-center py-2"
                        >
                          <Text className="text-gray-700 flex-1">
                            {exercise.name}
                          </Text>
                          <Text className="text-gray-500 text-sm font-medium">
                            {exercise.sets}
                          </Text>
                        </View>
                      ))}

                      {!workout.completed && (
                        <TouchableOpacity
                          className="mt-3 py-3 rounded-xl items-center justify-center"
                          style={{ backgroundColor: COLORS.primary.main }}
                          activeOpacity={0.8}
                          onPress={() => console.log(`Complete ${workout.name}`)}
                        >
                          <Text className="text-white text-sm font-semibold">
                            Mark Complete
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  )}
                </TouchableOpacity>
              ))
            )}
          </View>

          {/* Meals Section */}
          <View className="mt-6 mb-8">
            <Text className="font-bold text-2xl mb-4 text-gray-900">
              Meals
            </Text>

            {meals.length === 0 ? (
              <View
                className="bg-white rounded-xl p-8 items-center"
                style={{
                  shadowColor: "#000",
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.05,
                  shadowRadius: 3,
                  elevation: 1,
                }}
              >
                <Ionicons name="restaurant-outline" size={48} color="#d1d5db" />
                <Text className="text-gray-500 mt-3 text-center">
                  No meals logged today
                </Text>
              </View>
            ) : (
              meals.map((meal) => (
                <TouchableOpacity
                  key={meal.id}
                  className="bg-white rounded-xl p-4 mb-3"
                  style={{
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 3,
                    elevation: 1,
                  }}
                  activeOpacity={0.8}
                  onPress={() => toggleMeal(meal.id)}
                >
                  <View className="flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                      <View
                        className="w-12 h-12 rounded-full items-center justify-center"
                        style={{ backgroundColor: `${meal.iconColor}20` }}
                      >
                        <Ionicons
                          name={meal.icon}
                          size={24}
                          color={meal.iconColor}
                        />
                      </View>

                      <View className="ml-3 flex-1">
                        <Text className="font-semibold text-base text-gray-900">
                          {meal.name}
                        </Text>
                        <Text className="text-gray-500 text-sm mt-1">
                          {meal.time}
                        </Text>
                      </View>
                    </View>

                    <View className="flex-row items-center">
                      <Text className="font-semibold text-base text-gray-900 mr-2">
                        {meal.totalCalories} cal
                      </Text>
                      <Ionicons
                        name={
                          expandedMeals[meal.id]
                            ? "chevron-up"
                            : "chevron-down"
                        }
                        size={20}
                        color="#9CA3AF"
                      />
                    </View>
                  </View>

                  {expandedMeals[meal.id] && meal.foodItems && (
                    <View className="mt-4 pt-4 border-t border-gray-100">
                      {meal.foodItems.map((food, index) => (
                        <View
                          key={index}
                          className="flex-row justify-between items-center py-2"
                        >
                          <Text className="text-gray-700 flex-1">
                            {food.name}
                          </Text>
                          <Text className="text-gray-500 text-sm font-medium">
                            {food.calories} cal
                          </Text>
                        </View>
                      ))}

                      <TouchableOpacity
                        className="mt-3 py-2 flex-row items-center justify-center"
                        activeOpacity={0.8}
                        onPress={() => console.log(`Add to ${meal.name}`)}
                      >
                        <Ionicons
                          name="add-circle-outline"
                          size={20}
                          color={COLORS.primary.light}
                        />
                        <Text
                          className="text-sm font-medium ml-2"
                          style={{ color: COLORS.primary.light }}
                        >
                          Add Food
                        </Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </TouchableOpacity>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
      <FastingModal
        visible={showFastingModal}
        onClose={() => setShowFastingModal(false)}
      />
    </>
  );
};

export default HomePage;