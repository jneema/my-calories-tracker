import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AddFoodModal = ({ visible, onClose, onSave }) => {
  const [food, setFood] = useState({
    name: "",
    calories: "",
    protein: "",
    carbs: "",
    fats: "",
  });

  const handleSave = () => {
    if (!food.name) return alert("Please enter food name");
    onSave({
      ...food,
      calories: food.calories || 0,
      protein: food.protein || 0,
      carbs: food.carbs || 0,
      fats: food.fats || 0,
    });
    setFood({ name: "", calories: "", protein: "", carbs: "", fats: "" });
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl" style={{ maxHeight: "80%" }}>
          {/* Header */}
          <View className="flex-row items-center justify-between p-5 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                <Ionicons name="restaurant-outline" size={20} color="#0369a1" />
              </View>
              <Text className="text-2xl font-bold text-gray-900">Add Food</Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
            >
              <Ionicons name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView
            className="px-5"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}
          >
            {/* Food Name */}
            <View className="mt-5">
              <Text className="text-base font-bold text-gray-900 mb-2">
                Food Name
              </Text>
              <TextInput
                placeholder="e.g. Grilled Chicken"
                placeholderTextColor="#9CA3AF"
                value={food.name}
                onChangeText={(text) =>
                  setFood((prev) => ({ ...prev, name: text }))
                }
                className="bg-gray-50 rounded-2xl p-4 text-gray-900"
              />
            </View>

            {/* Calories */}
            <View className="mt-4">
              <Text className="text-base font-bold text-gray-900 mb-2">
                Calories (kcal)
              </Text>
              <TextInput
                placeholder="e.g. 250"
                keyboardType="numeric"
                placeholderTextColor="#9CA3AF"
                value={food.calories}
                onChangeText={(text) =>
                  setFood((prev) => ({ ...prev, calories: text }))
                }
                className="bg-gray-50 rounded-2xl p-4 text-gray-900"
              />
            </View>

            {/* Protein, Carbs, Fats */}
            <View className="mt-4 flex-row justify-between">
              <View className="flex-1 mr-2">
                <Text className="text-base font-bold text-gray-900 mb-2">
                  Protein (g)
                </Text>
                <TextInput
                  placeholder="e.g. 25"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                  value={food.protein}
                  onChangeText={(text) =>
                    setFood((prev) => ({ ...prev, protein: text }))
                  }
                  className="bg-gray-50 rounded-2xl p-4 text-gray-900"
                />
              </View>
              <View className="flex-1 mx-1">
                <Text className="text-base font-bold text-gray-900 mb-2">
                  Carbs (g)
                </Text>
                <TextInput
                  placeholder="e.g. 30"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                  value={food.carbs}
                  onChangeText={(text) =>
                    setFood((prev) => ({ ...prev, carbs: text }))
                  }
                  className="bg-gray-50 rounded-2xl p-4 text-gray-900"
                />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-base font-bold text-gray-900 mb-2">
                  Fats (g)
                </Text>
                <TextInput
                  placeholder="e.g. 10"
                  keyboardType="numeric"
                  placeholderTextColor="#9CA3AF"
                  value={food.fats}
                  onChangeText={(text) =>
                    setFood((prev) => ({ ...prev, fats: text }))
                  }
                  className="bg-gray-50 rounded-2xl p-4 text-gray-900"
                />
              </View>
            </View>
          </ScrollView>

          {/* Footer Save Button */}
          <View className="p-5 border-t border-gray-100">
            <TouchableOpacity
              onPress={handleSave}
              className="rounded-xl py-4 items-center"
              style={{ backgroundColor: "#0369a1" }}
            >
              <Text className="font-bold text-base text-white">Add Food</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddFoodModal;
