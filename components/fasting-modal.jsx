import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const FastingModal = ({ visible, onClose }) => {
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [startTime, setStartTime] = useState("8:00 PM");
  const [isActive, setIsActive] = useState(false);
  const [currentHours, setCurrentHours] = useState(0);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);

  const durations = [
    { id: "12", hours: 12, label: "12 Hours" },
    { id: "24", hours: 24, label: "24 Hours" },
    { id: "36", hours: 36, label: "36 Hours" },
    { id: "48", hours: 48, label: "48 Hours" },
  ];

  const timeOptions = [
    "12:00 AM",
    "1:00 AM",
    "2:00 AM",
    "3:00 AM",
    "4:00 AM",
    "5:00 AM",
    "6:00 AM",
    "7:00 AM",
    "8:00 AM",
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
    "5:00 PM",
    "6:00 PM",
    "7:00 PM",
    "8:00 PM",
    "9:00 PM",
    "10:00 PM",
    "11:00 PM",
  ];

  const handleStartFast = () => {
    setIsActive(true);
    // Start timer and save to storage
  };

  const handleEndFast = () => {
    setIsActive(false);
    setCurrentHours(0);
    setSelectedDuration(null);
    // Stop timer and save record
  };

  const calculateEndTime = (start, hours) => {
    const [time, period] = start.split(" ");
    const [hour, minute] = time.split(":");
    let startHour = parseInt(hour);

    if (period === "PM" && startHour !== 12) startHour += 12;
    if (period === "AM" && startHour === 12) startHour = 0;

    let endHour = (startHour + hours) % 24;
    const endPeriod = endHour >= 12 ? "PM" : "AM";
    if (endHour > 12) endHour -= 12;
    if (endHour === 0) endHour = 12;

    return `${endHour}:${minute} ${endPeriod}`;
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-3xl" style={{ maxHeight: "90%" }}>
          {/* Header */}
          <View className="flex-row items-center justify-between p-5 border-b border-gray-100">
            <View className="flex-row items-center">
              <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center mr-3">
                <Ionicons name="timer" size={20} color="#0369a1" />
              </View>
              <Text className="text-2xl font-bold text-gray-900">
                Fasting Tracker
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 rounded-full bg-gray-100 items-center justify-center"
            >
              <Ionicons name="close" size={20} color="#374151" />
            </TouchableOpacity>
          </View>

          <ScrollView className="px-5" showsVerticalScrollIndicator={false}>
            {/* Active Fast Display */}
            {isActive && (
              <View className="mt-5 mb-5">
                <LinearGradient
                  colors={["#082f49", "#0c4a6e"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    borderRadius: 16,
                    padding: 24,
                  }}
                >
                  <View className="items-center">
                    <Text className="text-white/80 text-xs font-semibold mb-2">
                      FASTING IN PROGRESS
                    </Text>
                    <Text className="text-white text-6xl font-bold mb-1">
                      {currentHours}
                    </Text>
                    <Text className="text-white/90 text-lg mb-4">
                      of {selectedDuration?.hours} hours
                    </Text>

                    <View className="w-full h-2 bg-white/30 rounded-full overflow-hidden mb-5">
                      <View
                        style={{
                          width: `${Math.min((currentHours / selectedDuration?.hours) * 100, 100)}%`,
                          height: "100%",
                          backgroundColor: "white",
                          borderRadius: 9999,
                        }}
                      />
                    </View>

                    {/* Last Meal & ETA */}
                    <View className="w-full mb-4">
                      <View className="bg-white/20 rounded-xl px-4 py-3 mb-2">
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <Ionicons
                              name="restaurant-outline"
                              size={16}
                              color="white"
                            />
                            <Text className="text-white/80 text-sm ml-2">
                              Last meal
                            </Text>
                          </View>
                          <Text className="text-white font-semibold text-sm">
                            {startTime}
                          </Text>
                        </View>
                      </View>
                      <View className="bg-white/20 rounded-xl px-4 py-3">
                        <View className="flex-row items-center justify-between">
                          <View className="flex-row items-center">
                            <Ionicons
                              name="flag-outline"
                              size={16}
                              color="white"
                            />
                            <Text className="text-white/80 text-sm ml-2">
                              Fast ends
                            </Text>
                          </View>
                          <Text className="text-white font-semibold text-sm">
                            {calculateEndTime(
                              startTime,
                              selectedDuration?.hours || 12
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity
                      onPress={handleEndFast}
                      className="w-full bg-white rounded-xl py-3.5 items-center"
                    >
                      <Text className="text-gray-900 font-bold text-base">
                        End Fast Early
                      </Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>
              </View>
            )}

            {/* Setup Fast */}
            {!isActive && (
              <>
                {/* Start Time Dropdown */}
                <View className="mt-5">
                  <Text className="text-base font-bold text-gray-900 mb-3">
                    Last meal time
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowTimePicker(!showTimePicker);
                      setShowDurationPicker(false);
                    }}
                    className="bg-gray-50 rounded-2xl p-4 flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center">
                        <Ionicons
                          name="time-outline"
                          size={20}
                          color="#0369a1"
                        />
                      </View>
                      <Text className="text-base text-gray-600 ml-3">
                        Start time
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-xl font-bold text-gray-900 mr-2">
                        {startTime}
                      </Text>
                      <Ionicons
                        name={showTimePicker ? "chevron-up" : "chevron-down"}
                        size={20}
                        color="#9ca3af"
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Time Picker Dropdown */}
                  {showTimePicker && (
                    <View className="bg-gray-50 rounded-2xl mt-2 p-3 max-h-48">
                      <ScrollView showsVerticalScrollIndicator={false}>
                        {timeOptions.map((time) => (
                          <TouchableOpacity
                            key={time}
                            onPress={() => {
                              setStartTime(time);
                              setShowTimePicker(false);
                            }}
                            className="py-3 px-4 rounded-xl"
                            style={{
                              backgroundColor:
                                startTime === time ? "#eff6ff" : "transparent",
                            }}
                          >
                            <Text
                              className="text-base text-center"
                              style={{
                                color:
                                  startTime === time ? "#0369a1" : "#374151",
                                fontWeight: startTime === time ? "600" : "400",
                              }}
                            >
                              {time}
                            </Text>
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </View>
                  )}
                </View>

                {/* Duration Dropdown */}
                <View className="mt-4">
                  <Text className="text-base font-bold text-gray-900 mb-3">
                    Fasting duration
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setShowDurationPicker(!showDurationPicker);
                      setShowTimePicker(false);
                    }}
                    className="bg-gray-50 rounded-2xl p-4 flex-row items-center justify-between"
                  >
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-full bg-blue-50 items-center justify-center">
                        <Ionicons
                          name="hourglass-outline"
                          size={20}
                          color="#0369a1"
                        />
                      </View>
                      <Text className="text-base text-gray-600 ml-3">
                        Duration
                      </Text>
                    </View>
                    <View className="flex-row items-center">
                      <Text className="text-xl font-bold text-gray-900 mr-2">
                        {selectedDuration
                          ? `${selectedDuration.hours} hrs`
                          : "Select"}
                      </Text>
                      <Ionicons
                        name={
                          showDurationPicker ? "chevron-up" : "chevron-down"
                        }
                        size={20}
                        color="#9ca3af"
                      />
                    </View>
                  </TouchableOpacity>

                  {/* Duration Picker Dropdown */}
                  {showDurationPicker && (
                    <View className="bg-gray-50 rounded-2xl mt-2 p-3">
                      {durations.map((duration) => (
                        <TouchableOpacity
                          key={duration.id}
                          onPress={() => {
                            setSelectedDuration(duration);
                            setShowDurationPicker(false);
                          }}
                          className="py-3 px-4 rounded-xl"
                          style={{
                            backgroundColor:
                              selectedDuration?.id === duration.id
                                ? "#eff6ff"
                                : "transparent",
                          }}
                        >
                          <Text
                            className="text-base text-center"
                            style={{
                              color:
                                selectedDuration?.id === duration.id
                                  ? "#0369a1"
                                  : "#374151",
                              fontWeight:
                                selectedDuration?.id === duration.id
                                  ? "600"
                                  : "400",
                            }}
                          >
                            {duration.label}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* End Time Preview */}
                {selectedDuration && (
                  <View className="bg-blue-50 rounded-2xl p-4 mt-4 mb-4">
                    <View className="flex-row items-center justify-center">
                      <Ionicons
                        name="information-circle"
                        size={20}
                        color="#0369a1"
                      />
                      <Text className="text-sm text-gray-700 ml-2">
                        Your fast will end at{" "}
                        <Text className="font-bold text-gray-900">
                          {calculateEndTime(startTime, selectedDuration.hours)}
                        </Text>
                      </Text>
                    </View>
                  </View>
                )}
              </>
            )}
          </ScrollView>

          {/* Footer Button */}
          {!isActive && (
            <View className="p-5 border-t border-gray-100">
              <TouchableOpacity
                onPress={handleStartFast}
                disabled={!selectedDuration}
                className="rounded-xl py-4 items-center"
                style={{
                  backgroundColor: selectedDuration ? "#0369a1" : "#e5e7eb",
                }}
              >
                <Text
                  className="font-bold text-base"
                  style={{
                    color: selectedDuration ? "white" : "#9ca3af",
                  }}
                >
                  Start Fasting
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default FastingModal;
