import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const CalendarView = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const screenWidth = Dimensions.get("window").width - 65;
  const numColumns = 7;
  const gap = 4; // spacing between cells
  const itemWidth = (screenWidth - gap * (numColumns - 1)) / numColumns;

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendarDays = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <View style={styles.container}>
      {/* Weekday Labels */}
      <View style={styles.weekdayRow}>
        {weekdays.map((day, index) => (
          <View
            key={day}
            style={[
              styles.weekdayCell,
              {
                width: itemWidth,
                marginRight: index < numColumns - 1 ? gap : 0,
              },
            ]}
          >
            <Text style={styles.weekdayText}>{day}</Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {calendarDays.map((day, index) => {
          let bgColor = "transparent";
          let textColor = "#4B5563";
          let fontWeight = "normal";

          if (day !== null) {
            if (day < today) {
              bgColor = "#FF6900"; // past days
              textColor = "#fff";
            } else if (day === today) {
              bgColor = "#2563EB"; // today
              textColor = "#fff";
              fontWeight = "bold";
            } else {
              bgColor = "#E5E7EB"; // future days
              textColor = "#4B5563";
            }
          }

          return (
            <View
              key={index}
              style={[
                styles.dayCell,
                {
                  width: itemWidth,
                  height: itemWidth,
                  backgroundColor: bgColor,
                  marginRight: (index + 1) % numColumns === 0 ? 0 : gap,
                  marginBottom: gap,
                },
              ]}
            >
              {day !== null && (
                <Text
                  style={[styles.dayText, { color: textColor, fontWeight }]}
                >
                  {day}
                </Text>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: Dimensions.get("window").width - 40,
  },
  weekdayRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  weekdayCell: {
    alignItems: "center",
    justifyContent: "center",
  },
  weekdayText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4B5563",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  dayCell: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  dayText: {
    fontSize: 14,
  },
});

export default CalendarView;
