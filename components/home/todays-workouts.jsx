import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const TodaysWorkouts = ({ COLORS }) => {
  const [expandedWorkouts, setExpandedWorkouts] = useState({});

  const toggleWorkout = (workoutId) => {
    setExpandedWorkouts((prev) => ({
      ...prev,
      [workoutId]: !prev[workoutId],
    }));
  };

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

  return (
    <>
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
    </>
  );
};

export default TodaysWorkouts;
