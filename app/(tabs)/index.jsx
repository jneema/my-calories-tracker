import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
import { router } from "expo-router";
import useStoredItems from "../../hooks/useStoredItem";

const HomePage = () => {
  const storedData = useStoredItems(["guestMode", "userFormData", "userName"]);
  console.log("Stored values:", storedData);
  const date = new Date();
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const fullDate = `${month} ${day}, ${year}`;

  // Progress calculation
  const consumed = 1450;
  const total = 2000;
  const remaining = total - consumed;
  const percentage = Math.round((consumed / total) * 100);

  // Circle properties
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = circumference - (percentage / 100) * circumference;

  const foodCategories = [
    {
      name: "Protein",
      icon: <Ionicons name="fish" size={24} color="#FF5F00" />,
      amount: 75,
      targetAmount: 100,
      unit: "g",
      color: "#FF5F00",
    },
    {
      name: "Carbs",
      icon: <Ionicons name="pizza" size={24} color="#EB0071" />,
      amount: 250,
      targetAmount: 300,
      unit: "g",
      color: "#EB0071",
    },
    {
      name: "Fats",
      icon: <Ionicons name="water" size={24} color="#00C9A7" />,
      amount: 60,
      targetAmount: 100,
      unit: "g",
      color: "#00C9A7",
    },
  ];

  const meals = [
    {
      id: 1,
      name: "Breakfast",
      time: "8:00 AM",
      icon: "sunny",
      iconColor: "#FF9500",
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
      iconColor: "#4A90E2",
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
      iconColor: "#5856D6",
      totalCalories: 250,
      foodItems: [{ name: "Salmon with Vegetables", calories: 250 }],
    },
  ];

  const [expandedMeals, setExpandedMeals] = useState({});
  const [waterIntake, setWaterIntake] = useState(5); // glasses consumed
  const waterGoal = 8; // glasses goal
  const waterPercentage = Math.round((waterIntake / waterGoal) * 100);

  const toggleMeal = (mealId) => {
    setExpandedMeals((prev) => ({
      ...prev,
      [mealId]: !prev[mealId],
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
    <SafeAreaView className="flex-1 px-5 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <View>
            <Text className="font-bold text-5xl">
              Hello{" "}
              {storedData.guestMode
                ? storedData.userFormData?.name || "Guest"
                : storedData.userName || "User"}
            </Text>
            <Text className="text-base text-gray-600">Today, {fullDate}</Text>
          </View>
          <View className="flex flex-row space-x-4">
            <Ionicons name="notifications-outline" size={24} color="black" />
            <Ionicons name="settings" size={24} color="black" />
          </View>
        </View>

        <LinearGradient
          colors={["#FF5F00", "#EB0071"]}
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

        <View className="flex-row mt-5 gap-3 w-full">
          {foodCategories.map((item) => {
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

        <View className="flex flex-row gap-3 mt-5">
          <TouchableOpacity
            className="flex-1 bg-black rounded-xl p-4 flex-row items-center justify-center"
            activeOpacity={0.7}
            onPress={() => router.push("/log")}
          >
            <Ionicons name="add-circle-outline" size={20} color="white" />
            <Text className="text-white font-semibold text-base ml-2">
              Log Food
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white rounded-xl p-4 flex-row items-center justify-center"
            style={{ borderWidth: 1.5, borderColor: "#e5e5e5", width: 60 }}
            activeOpacity={0.7}
            onPress={() => console.log("Quick Add pressed")}
          >
            <Ionicons name="camera" size={20} color="black" />
          </TouchableOpacity>
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
                    <Text className="font-semibold text-base">{meal.name}</Text>
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
                      <Text className="text-gray-700 flex-1">{food.name}</Text>
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
                      color="#FF5F00"
                    />
                    <Text
                      className="text-sm font-medium ml-1"
                      style={{ color: "#FF5F00" }}
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
            colors={["#00C9A7", "#00A8E8"]}
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

            {/* Progress Bar */}
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

            {/* Water Glasses Visual */}
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
                    color={index < waterIntake ? "#00C9A7" : "white"}
                  />
                </View>
              ))}
            </View>

            {/* Action Buttons */}
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
                <Ionicons name="add-circle" size={20} color="#00C9A7" />
                <Text
                  className="font-semibold ml-2"
                  style={{ color: "#00C9A7" }}
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
  );
};

export default HomePage;
