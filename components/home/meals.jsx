import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const Meals = ({ COLORS }) => {
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

  const toggleMeal = (mealId) => {
    setExpandedMeals((prev) => ({
      ...prev,
      [mealId]: !prev[mealId],
    }));
  };
  return (
    <>
      {/* Meals Section */}
      <View className="mt-6 mb-8">
        <Text className="font-bold text-2xl mb-4 text-gray-900">Meals</Text>

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
                      expandedMeals[meal.id] ? "chevron-up" : "chevron-down"
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
                      <Text className="text-gray-700 flex-1">{food.name}</Text>
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
    </>
  );
};

export default Meals;
