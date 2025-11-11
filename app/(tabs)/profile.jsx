import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useStoredItems from "../../hooks/useStoredItem";

const Profile = () => {
  const storedData = useStoredItems([
    "guestMode",
    "userFormData",
    "userName",
    "calorieTarget",
  ]);
  const currentWeight = storedData?.userFormData?.weight || "Not set";
  const currentHeight = storedData?.userFormData?.height || "Not set";
  const weightGoal = storedData?.userFormData?.goal;
  // console.log("Stored values:", storedData);
  const guestName = storedData?.userFormData?.firstName
    ? `${storedData.userFormData.firstName} ${storedData.userFormData.lastName}`.trim()
    : "Guest User";

  const streakAmount = 7;
  const mealsAmount = 156;

  const stats = [
    {
      title: `${streakAmount > 1 ? "days" : "day"} streak`,
      icon: "rocket",
      amount: streakAmount,
      color: "#FF5F00",
    },
    {
      title: "Kgs Lost",
      icon: "body",
      amount: -5,
      color: "#EB0071",
    },
    {
      title: `${mealsAmount > 1 ? "meals" : "meal"} logged`,
      icon: "restaurant",
      amount: 156,
      color: "#00C9A7",
    },
  ];

  const goals = [
    {
      id: 1,
      name: "Current Weight",
      value: `${currentWeight} kg`,
    },
    {
      id: 2,
      name: "Height",
      value: `${currentHeight} cm`,
    },
    {
      id: 3,
      name: "Weight Goal",
      value: weightGoal,
    },
    {
      id: 4,
      name: "Daily Calorie Target",
      value: `${storedData?.calorieTarget} kcal` || "Not set",
    },
  ];

  const settings = [
    {
      id: 1,
      name: "Profile Settings",
      icon: "person-circle",
      iconColor: "#007bff",
      enabled: true,
    },
    {
      id: 2,
      name: "Nutrition Goals",
      icon: "fitness",
      iconColor: "#f43f5e",
      enabled: true,
    },
    {
      id: 3,
      name: "Notifications",
      icon: "notifications",
      iconColor: "#FF9500",
      enabled: true,
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-5 bg-gray-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={{ paddingBottom: 40 }}
      >
        <View className="flex-1 items-center justify-center bg-transparent mt-5">
          <View
            className="bg-blue-600 rounded-full  items-center justify-center"
            style={{ width: 100, height: 100 }}
          >
            <Text className="text-white font-semibold text-5xl">
              {storedData?.guestMode
                ? guestName?.[0]?.toUpperCase() || "G"
                : storedData?.userName?.[0]?.toUpperCase() || "U"}
            </Text>
          </View>
          <View className="mt-2 flex-col gap-1 items-center">
            <Text className="font-bold text-2xl">
              {storedData?.guestMode
                ? guestName || "Guest User"
                : storedData?.userName || "User"}
            </Text>
            <Text className="text-gray-500">
              {" "}
              {storedData?.guestMode ? "Guest Mode" : "User Mode"}
            </Text>
          </View>
        </View>

        <View className="flex-row mt-5 gap-3 w-full">
          {stats.map((item) => {
            return (
              <View
                key={item.title}
                className="flex-1 bg-white rounded-xl p-3"
                style={{ height: 140 }}
              >
                <View className="flex flex-col items-center">
                  <View
                    className="p-3 rounded-xl mb-10"
                    style={{ backgroundColor: item.color }}
                  >
                    <Ionicons name={item.icon} size={24} color="#fff" />
                  </View>
                </View>

                <View className="mt-auto">
                  <Text className="text-center text-xl font-semibold">
                    {item.amount}
                  </Text>
                </View>

                <View className="mt-auto">
                  <Text className="text-gray-400 text-sm uppercase text-center">
                    {item.title}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View className="mt-6 bg-white rounded-xl p-4">
          <Text className="font-bold text-2xl mb-3">Your Goals</Text>

          {goals.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-gray-50 rounded-xl p-4 mb-3"
              activeOpacity={0.7}
              // onPress={() => toggleMeal(meal.id)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View className="ml-3 flex-1 flex-col gap-1">
                    <Text className="font-semibold text-base">{item.name}</Text>
                    <Text className="text-gray-500">{item.value}</Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <Text className="text-blue-400">Edit</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View className="mt-6">
          <Text className="font-bold text-2xl mb-3">Settings</Text>

          {settings.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="bg-white rounded-xl p-4 mb-3"
              activeOpacity={0.7}
              // onPress={() => toggleMeal(meal.id)}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center flex-1">
                  <View
                    className="w-10 h-10 rounded-full items-center justify-center"
                    style={{ backgroundColor: `${item.iconColor}20` }}
                  >
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={item.iconColor}
                    />
                  </View>

                  <View className="ml-3 flex-1">
                    <Text className="font-semibold text-base">{item.name}</Text>
                  </View>
                </View>

                <View className="flex-row items-center">
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
