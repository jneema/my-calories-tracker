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
import { LinearGradient } from "expo-linear-gradient";

const Log = () => {
  const meals = ["Breakfast", "Lunch", "Dinner", "Snack"];
  const [selectedMeal, setSelectedMeal] = useState("Breakfast");
  const [waterIntake, setWaterIntake] = useState(5);
  const waterGoal = 8;
  const waterPercentage = Math.round((waterIntake / waterGoal) * 100);

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

  const suggestedFoods = [
    {
      name: "Oatmeal with Berries",
      calories: 280,
      protein: 8,
      carbs: 45,
      fats: 5,
    },
    { name: "Greek Yogurt", calories: 120, protein: 10, carbs: 5, fats: 4 },
    { name: "Orange Juice", calories: 120, protein: 2, carbs: 28, fats: 0 },
    {
      name: "Grilled Chicken Salad",
      calories: 420,
      protein: 35,
      carbs: 15,
      fats: 18,
    },
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
        {/* Header */}
        <View className="flex flex-row items-center justify-between mt-5">
          <View className="flex flex-row items-center space-x-2">
            {/* <Ionicons name="chevron-back" size={22} color="black" /> */}
            <Text className="text-5xl font-bold">Log Food</Text>
          </View>
          <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
        </View>

        {/* Meal Selector */}
        <View className="mt-1">
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
                    isSelected ? "bg-[#0c4a6e]" : "bg-gray-200"
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
            <TouchableOpacity className="flex-1 flex-col items-center bg-[#0c4a6e] rounded-xl p-4">
              <Ionicons name="scan-outline" size={24} color="white" />
              <Text className="font-semibold text-base mt-1 text-white">
                Scan
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-col items-center bg-[#0369a1] rounded-xl p-4">
              <Ionicons name="camera-outline" size={24} color="white" />
              <Text className="font-semibold text-base mt-1 text-white">
                Photo
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-1 flex-col items-center bg-[#0891b2] rounded-xl p-4">
              <Ionicons name="add-circle-outline" size={24} color="white" />
              <Text className="font-semibold text-base mt-1 text-white">
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Suggested Foods */}
        <View className="mt-5">
          <Text className="font-bold text-2xl mb-3">Suggested Foods</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="flex-row gap-3"
          >
            {suggestedFoods.map((food, index) => (
              <TouchableOpacity
                key={index}
                className="bg-white rounded-xl p-4 w-40 shadow-sm mr-2 ml-1 mb-2"
                onPress={() => setSelectedFood(food)}
              >
                <Text className="font-semibold text-base">{food.name}</Text>
                <Text className="text-gray-500 text-sm mt-1">
                  {food.calories} cal
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Selected Food Preview */}
        {selectedFood && (
          <View className="mt-5 bg-white rounded-xl p-4 shadow-sm">
            <Text className="font-bold text-xl">{selectedFood.name}</Text>
            <Text className="text-gray-500 text-sm mt-1">
              {selectedFood.calories} cal • {selectedFood.protein}g P •{" "}
              {selectedFood.carbs}g C • {selectedFood.fats}g F
            </Text>

            <View className="flex-row items-center mt-3 gap-3">
              <TouchableOpacity
                onPress={() => adjustQuantity(-1)}
                className="flex-1 bg-gray-200 rounded-xl py-3 items-center"
              >
                <Ionicons
                  name="remove-circle-outline"
                  size={20}
                  color="#0c4a6e"
                />
              </TouchableOpacity>
              <Text className="font-bold text-lg">{quantity}</Text>
              <TouchableOpacity
                onPress={() => adjustQuantity(1)}
                className="flex-1 bg-gray-200 rounded-xl py-3 items-center"
              >
                <Ionicons name="add-circle-outline" size={20} color="#0891b2" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => addToMeal(selectedMeal, selectedFood, quantity)}
              className="mt-4 bg-[#0369a1] rounded-xl py-3 items-center"
            >
              <Text className="text-white font-semibold text-base">
                Add to {selectedMeal}
              </Text>
            </TouchableOpacity>
          </View>
        )}
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
                  Great job! You've reached your daily goal!
                </Text>
              </View>
            )}
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Log;