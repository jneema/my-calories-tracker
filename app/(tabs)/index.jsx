import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { router } from "expo-router";
import useStoredItems from "../../hooks/useStoredItem";
import FastingModal from "../../components/fasting-modal";

const HomePage = () => {
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
  const fullDate = `${month} ${day} ${year}`;

  const guestName =
    storedData.userFormData?.firstName +
      " " +
      storedData.userFormData?.lastName || "Guest";

  // Progress calculation
  const consumed = 1450;
  const total = storedData.calorieTarget || 2200;
  const remaining = total - consumed;
  const percentage = Math.round((consumed / total) * 100);

  // Circle properties
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;

  // Workout stats
  const workoutMinutes = 45;
  const workoutGoal = 60;
  const workoutPercentage = Math.round((workoutMinutes / workoutGoal) * 100);

  // Fasting tracker
  const fastingHours = 14;
  const fastingGoal = 16;
  const fastingPercentage = Math.round((fastingHours / fastingGoal) * 100);

  const nutritionCategories = [
    {
      name: "Protein",
      icon: <Ionicons name="fish" size={24} color="#f97316" />,
      amount: 75,
      targetAmount: 100,
      unit: "g",
      color: "#f97316",
    },
    {
      name: "Carbs",
      icon: <Ionicons name="pizza" size={24} color="#eab308" />,
      amount: 250,
      targetAmount: 300,
      unit: "g",
      color: "#eab308",
    },
    {
      name: "Fats",
      icon: <Ionicons name="water" size={24} color="#10b981" />,
      amount: 60,
      targetAmount: 100,
      unit: "g",
      color: "#10b981",
    },
  ];

  const todaysWorkouts = [
    {
      id: 1,
      name: "Morning Run",
      time: "6:30 AM",
      icon: "walk",
      iconColor: "#10b981",
      duration: "30 min",
      calories: 320,
      completed: true,
    },
    {
      id: 2,
      name: "Upper Body",
      time: "5:00 PM",
      icon: "barbell",
      iconColor: "#f97316",
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
      iconColor: "#f59e0b",
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
      icon: "cloudy",
      iconColor: "#0891b2",
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
      iconColor: "#6366f1",
      totalCalories: 250,
      foodItems: [{ name: "Salmon with Vegetables", calories: 250 }],
    },
  ];

  const [expandedMeals, setExpandedMeals] = useState({});
  const [expandedWorkouts, setExpandedWorkouts] = useState({});
  const [waterIntake, setWaterIntake] = useState(5);
  const waterGoal = 8;
  const waterPercentage = Math.round((waterIntake / waterGoal) * 100);

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

  const addWaterGlass = () => {
    if (waterIntake < waterGoal) {
      setWaterIntake((prev) => prev + 1);
    }
  };

  const removeWaterGlass = () => {
    if (waterIntake > 0) {
      setWaterIntake((prev) => prev - 1);
    }
  };

  return (
    <>
      <SafeAreaView
        className="flex-1 px-5 bg-gray-50"
        edges={["top", "left", "right"]}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          bounces={false}
          alwaysBounceVertical={false}
        >
          <View className="flex flex-row items-center justify-between mt-5">
            <View>
              <Text className="font-bold text-4xl">
                Hello{" "}
                {storedData.guestMode
                  ? guestName
                  : storedData.userName || "User"}
              </Text>
              <Text className="text-base text-gray-600">
                {dayName}, {fullDate}
              </Text>
            </View>
            <View className="flex flex-row space-x-4">
              <Ionicons name="notifications-outline" size={24} color="black" />
              <Ionicons name="settings" size={24} color="black" />
            </View>
          </View>

          {/* Main Calorie Card */}
          <LinearGradient
            colors={["#0c4a6e", "#075985", "#0369a1"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 20,
              borderRadius: 16,
              padding: 16,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text className="font-semibold text-xs text-white/80 mb-1">
                REMAINING
              </Text>
              <Text className="text-5xl font-bold text-white">{remaining}</Text>
              <Text className="font-medium text-sm text-white/90 mt-1">
                {consumed} / {total} cal
              </Text>
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
                  {percentage}%{"\n"}
                  <Text className="text-xs">goal</Text>
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Daily Stats */}
          <View className="flex-row mt-5 gap-3">
            <LinearGradient
              colors={["#075985", "#0369a1"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                borderRadius: 16,
                padding: 16,
              }}
            >
              <View className="flex-row items-center mb-2">
                <Ionicons name="barbell" size={20} color="white" />
                <Text className="text-white/80 text-xs font-semibold ml-2">
                  WORKOUT
                </Text>
              </View>
              <Text className="text-3xl font-bold text-white">
                {workoutMinutes}
              </Text>
              <Text className="text-white/90 text-xs mt-1">
                of {workoutGoal} min
              </Text>
              <View className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden mt-3">
                <View
                  style={{
                    width: `${Math.min(workoutPercentage, 100)}%`,
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 9999,
                  }}
                />
              </View>
            </LinearGradient>

            <LinearGradient
              colors={["#082f49", "#0c4a6e"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{
                flex: 1,
                borderRadius: 16,
                padding: 16,
              }}
            >
              <View className="flex-row items-center mb-2">
                <Ionicons name="time" size={20} color="white" />
                <Text className="text-white/80 text-xs font-semibold ml-2">
                  FASTING
                </Text>
              </View>
              <Text className="text-3xl font-bold text-white">
                {fastingHours}h
              </Text>
              <Text className="text-white/90 text-xs mt-1">
                of {fastingGoal}h goal
              </Text>
              <View className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden mt-3">
                <View
                  style={{
                    width: `${Math.min(fastingPercentage, 100)}%`,
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 9999,
                  }}
                />
              </View>
            </LinearGradient>
          </View>

          {/* Nutrition Macros */}
          <View className="flex-row mt-5 gap-3 w-full">
            {nutritionCategories.map((item) => {
              const itemPercentage = Math.round(
                (item.amount / item.targetAmount) * 100
              );

              return (
                <View
                  key={item.name}
                  className="flex-1 bg-white rounded-xl p-3"
                  style={{ height: 140 }}
                >
                  <View className="flex flex-col items-center">
                    {item.icon}
                    <Text className="font-semibold text-sm mt-1">
                      {item.name}
                    </Text>
                  </View>

                  <View className="mt-auto">
                    <Text className="text-gray-600 text-xs text-center">
                      {item.amount}/{item.targetAmount}
                      {item.unit}
                    </Text>
                    <Text className="text-xs text-gray-400 text-center mt-0.5">
                      {itemPercentage}%
                    </Text>
                  </View>
                  <View className="w-full mt-2">
                    <View className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <View
                        style={{
                          width: `${Math.min(itemPercentage, 100)}%`,
                          height: "100%",
                          backgroundColor: item.color,
                          borderRadius: 9999,
                        }}
                      />
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Quick Actions */}
          <View className="flex flex-row gap-3 mt-5">
            <TouchableOpacity
              className="flex-1 rounded-xl p-4 items-center justify-center"
              style={{ backgroundColor: "#0c4a6e" }}
              activeOpacity={0.7}
              onPress={() => router.push("/log")}
            >
              <Ionicons name="restaurant" size={24} color="white" />
              <Text className="text-white font-semibold text-sm mt-2">
                Log Meal
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-xl p-4 items-center justify-center"
              style={{ backgroundColor: "#075985" }}
              activeOpacity={0.7}
              onPress={() => console.log("Log Workout")}
            >
              <Ionicons name="barbell" size={24} color="white" />
              <Text className="text-white font-semibold text-sm mt-2">
                Log Workout
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 rounded-xl p-4 items-center justify-center"
              style={{ backgroundColor: "#0369a1" }}
              activeOpacity={0.7}
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
            <Text className="font-bold text-2xl mb-3">Today's Workouts</Text>

            {todaysWorkouts.map((workout) => (
              <TouchableOpacity
                key={workout.id}
                className="bg-white rounded-xl p-4 mb-3"
                activeOpacity={0.7}
                onPress={() => toggleWorkout(workout.id)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center"
                      style={{ backgroundColor: `${workout.iconColor}20` }}
                    >
                      <Ionicons
                        name={workout.icon}
                        size={20}
                        color={workout.iconColor}
                      />
                    </View>

                    <View className="ml-3 flex-1">
                      <View className="flex-row items-center">
                        <Text className="font-semibold text-base">
                          {workout.name}
                        </Text>
                        {workout.completed && (
                          <View className="ml-2 bg-green-100 rounded-full px-2 py-0.5">
                            <Text className="text-green-700 text-xs font-medium">
                              Done
                            </Text>
                          </View>
                        )}
                      </View>
                      <Text className="text-gray-500 text-sm">
                        {workout.time} • {workout.duration}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <Text className="font-semibold text-base mr-2">
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
                  <View className="mt-3 pt-3 border-t border-gray-100">
                    {workout.exercises.map((exercise, index) => (
                      <View
                        key={index}
                        className="flex-row justify-between items-center py-2"
                      >
                        <Text className="text-gray-700 flex-1">
                          {exercise.name}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          {exercise.sets}
                        </Text>
                      </View>
                    ))}

                    {!workout.completed && (
                      <TouchableOpacity
                        className="mt-2 py-3 rounded-xl items-center justify-center"
                        style={{ backgroundColor: "#075985" }}
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
            ))}
          </View>

          {/* Meals Section */}
          <View className="mt-6">
            <Text className="font-bold text-2xl mb-3">Meals</Text>

            {meals.map((meal) => (
              <TouchableOpacity
                key={meal.id}
                className="bg-white rounded-xl p-4 mb-3"
                activeOpacity={0.7}
                onPress={() => toggleMeal(meal.id)}
              >
                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center flex-1">
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center"
                      style={{ backgroundColor: `${meal.iconColor}20` }}
                    >
                      <Ionicons
                        name={meal.icon}
                        size={20}
                        color={meal.iconColor}
                      />
                    </View>

                    <View className="ml-3 flex-1">
                      <Text className="font-semibold text-base">
                        {meal.name}
                      </Text>
                      <Text className="text-gray-500 text-sm">{meal.time}</Text>
                    </View>
                  </View>

                  <View className="flex-row items-center">
                    <Text className="font-semibold text-base mr-2">
                      {meal.totalCalories} cal
                    </Text>
                    <Ionicons
                      name={
                        expandedMeals[meal.id] ? "chevron-up" : "chevron-down"
                      }
                      size={20}
                      color="#9CA3AF"
                    />
                  </View>
                </View>

                {expandedMeals[meal.id] && meal.foodItems && (
                  <View className="mt-3 pt-3 border-t border-gray-100">
                    {meal.foodItems.map((food, index) => (
                      <View
                        key={index}
                        className="flex-row justify-between items-center py-2"
                      >
                        <Text className="text-gray-700 flex-1">
                          {food.name}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          {food.calories} cal
                        </Text>
                      </View>
                    ))}

                    <TouchableOpacity
                      className="mt-2 py-2 flex-row items-center justify-center"
                      onPress={() => console.log(`Add to ${meal.name}`)}
                    >
                      <Ionicons
                        name="add-circle-outline"
                        size={18}
                        color="#0369a1"
                      />
                      <Text
                        className="text-sm font-medium ml-1"
                        style={{ color: "#0369a1" }}
                      >
                        Add Food
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* Water Intake Section */}
          <View className="mt-6">
            <Text className="font-bold text-2xl mb-3">Water Intake</Text>

            <LinearGradient
              colors={["#0e7490", "#0891b2", "#06b6d4"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                borderRadius: 16,
                padding: 20,
              }}
            >
              <View className="flex-row items-center justify-between mb-4">
                <View>
                  <Text className="text-white/80 text-xs font-semibold mb-1">
                    TODAY'S PROGRESS
                  </Text>
                  <Text className="text-white text-4xl font-bold">
                    {waterIntake}/{waterGoal}
                  </Text>
                  <Text className="text-white/90 text-sm mt-1">
                    glasses • {waterIntake * 250}ml / {waterGoal * 250}ml
                  </Text>
                </View>

                <View className="items-center">
                  <View className="bg-white/20 rounded-full p-3 mb-2">
                    <Ionicons name="water" size={32} color="white" />
                  </View>
                  <Text className="text-white font-bold text-lg">
                    {waterPercentage}%
                  </Text>
                </View>
              </View>

              <View className="w-full h-2 bg-white/30 rounded-full overflow-hidden mb-4">
                <View
                  style={{
                    width: `${Math.min(waterPercentage, 100)}%`,
                    height: "100%",
                    backgroundColor: "white",
                    borderRadius: 9999,
                  }}
                />
              </View>

              <View className="flex-row flex-wrap gap-2 mb-4">
                {Array.from({ length: waterGoal }).map((_, index) => (
                  <View
                    key={index}
                    className="items-center justify-center"
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 8,
                      backgroundColor:
                        index < waterIntake ? "white" : "rgba(255,255,255,0.2)",
                    }}
                  >
                    <Ionicons
                      name={index < waterIntake ? "water" : "water-outline"}
                      size={20}
                      color={index < waterIntake ? "#0891b2" : "white"}
                    />
                  </View>
                ))}
              </View>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={removeWaterGlass}
                  className="flex-1 bg-white/20 rounded-xl py-3 items-center justify-center"
                  activeOpacity={0.7}
                  disabled={waterIntake === 0}
                  style={{ opacity: waterIntake === 0 ? 0.5 : 1 }}
                >
                  <Ionicons
                    name="remove-circle-outline"
                    size={20}
                    color="white"
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={addWaterGlass}
                  className="flex-1 bg-white rounded-xl py-3 flex-row items-center justify-center"
                  activeOpacity={0.7}
                  disabled={waterIntake >= waterGoal}
                  style={{ opacity: waterIntake >= waterGoal ? 0.7 : 1 }}
                >
                  <Ionicons name="add-circle" size={20} color="#0891b2" />
                  <Text
                    className="font-semibold ml-2"
                    style={{ color: "#0891b2" }}
                  >
                    Add Glass
                  </Text>
                </TouchableOpacity>
              </View>

              {waterIntake >= waterGoal && (
                <View className="mt-3 bg-white/20 rounded-lg p-3 flex-row items-center">
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text className="text-white font-medium ml-2">
                    Great job! You've reached your daily goal! 🎉
                  </Text>
                </View>
              )}
            </LinearGradient>
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
