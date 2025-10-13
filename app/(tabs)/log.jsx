import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const Log = () => {
  const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");

  const suggestedFoods = [
    { name: "Oatmeal with Berries", calories: 280, protein: 8, carbs: 45, fats: 5 },
    { name: "Greek Yogurt", calories: 120, protein: 10, carbs: 5, fats: 4 },
    { name: "Orange Juice", calories: 120, protein: 2, carbs: 28, fats: 0 },
    { name: "Grilled Chicken Salad", calories: 420, protein: 35, carbs: 15, fats: 18 },
  ];

  const [selectedFood, setSelectedFood] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const adjustQuantity = (val) => {
    setQuantity((prev) => Math.max(prev + val, 1));
  };

  const addToMeal = (meal, food, qty) => {
    console.log(`Added ${qty}x ${food.name} to ${meal}`);
    // Reset selection
    setSelectedFood(null);
    setQuantity(1);
  };

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-50">
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center space-x-2">
            {/* <Ionicons name="chevron-back" size={22} color="black" /> */}
            <Text className="text-5xl font-bold">Log Food</Text>
          </View>
          <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
        </View>

        {/* Meal Selector */}
        <View className="mt-5">
          <Text className="font-bold text-2xl mb-3">Select Meal</Text>
          <View className="flex-row justify-between">
            {meals.map((meal) => {
              const isSelected = selectedMeal === meal;
              return (
                <TouchableOpacity
                  key={meal}
                  activeOpacity={0.8}
                  onPress={() => setSelectedMeal(meal)}
                  className={`flex-1 mx-1 rounded-3xl py-3 flex-row items-center justify-center ${
                    isSelected ? "bg-blue-600" : "bg-gray-200"
                  }`}
                >
                  <Text
                    className={`font-semibold text-sm ${
                      isSelected ? "text-white" : "text-gray-800"
                    }`}
                  >
                    {meal}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Search / Quick Add */}
        <View className="mt-5">
          <Text className="font-bold text-2xl mb-3">Find or Add Food</Text>
          <View className="flex flex-row items-center bg-gray-100 rounded-xl px-4 py-3">
            <Ionicons name="search-outline" size={20} color="#9CA3AF" />
            <TextInput
              placeholder="Search foods..."
              placeholderTextColor="#545b67"
              className="flex-1 ml-3 text-gray-800"
            />
          </View>

          <View className="flex-row mt-4 gap-3">
            <TouchableOpacity className="flex-1 flex-col items-center bg-[#FF5F00] rounded-xl p-4">
              <Ionicons name="scan-outline" size={24} color="white" />
              <Text className="font-semibold text-base mt-1 text-white">Scan</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-col items-center bg-[#EB0071] rounded-xl p-4">
              <Ionicons name="camera-outline" size={24} color="white" />
              <Text className="font-semibold text-base mt-1 text-white">Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-col items-center bg-[#00C9A7] rounded-xl p-4">
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text className="font-semibold text-base mt-1 text-white">Create</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggested Foods */}
        <View className="mt-5">
          <Text className="font-bold text-2xl mb-3">Suggested Foods</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-3">
            {suggestedFoods.map((food, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-xl p-4 w-40 shadow-sm mr-2 ml-1 mb-2"
                onPress={() => setSelectedFood(food)}
              >
                <Text className="font-semibold text-base">{food.name}</Text>
                <Text className="text-gray-500 text-sm mt-1">{food.calories} cal</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Food Preview */}
        {selectedFood && (
          <View className="mt-5 bg-white rounded-xl p-4 shadow-sm">
            <Text className="font-bold text-xl">{selectedFood.name}</Text>
            <Text className="text-gray-500 text-sm mt-1">
              {selectedFood.calories} cal • {selectedFood.protein}g P • {selectedFood.carbs}g C • {selectedFood.fats}g F
            </Text>

            <View className="flex-row items-center mt-3 gap-3">
              <TouchableOpacity
                onPress={() => adjustQuantity(-1)}
                className="flex-1 bg-gray-200 rounded-xl py-3 items-center"
              >
                <Ionicons name="remove-circle-outline" size={20} color="#FF5F00" />
              </TouchableOpacity>
              <Text className="font-bold text-lg">{quantity}</Text>
              <TouchableOpacity
                onPress={() => adjustQuantity(1)}
                className="flex-1 bg-gray-200 rounded-xl py-3 items-center"
              >
                <Ionicons name="add-circle-outline" size={20} color="#00C9A7" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => addToMeal(selectedMeal, selectedFood, quantity)}
              className="mt-4 bg-blue-600 rounded-xl py-3 items-center"
            >
              <Text className="text-white font-semibold text-base">Add to {selectedMeal}</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Log;
