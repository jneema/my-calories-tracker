import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";

const COLORS = {
  primary: {
    dark: "#0c4a6e",
    main: "#0369a1",
    light: "#0891b2",
  },
  accent: {
    orange: "#f97316",
    pink: "#ec4899",
    purple: "#9810FA",
  },
  gray: {
    light: "#E5E7EB",
    medium: "#9CA3AF",
    dark: "#4B5563",
  },
};

const CalendarView = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const missedDays = [2, 5, 7]; // Hardcoded missed days

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const screenWidth = Dimensions.get("window").width - 65;
  const numColumns = 7;
  const gap = 4;
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
            <Text style={[styles.weekdayText, { color: COLORS.gray.dark }]}>
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View style={styles.grid}>
        {calendarDays.map((day, index) => {
          let bgColor = "transparent";
          let textColor = COLORS.gray.dark;
          let fontWeight = "normal";

          if (day !== null) {
            if (day < today) {
              if (missedDays.includes(day)) {
                // Missed day
                bgColor = COLORS.primary.light + "10"; // muted/faded teal
                textColor = COLORS.primary.dark; // slightly darker text
              } else {
                // Logged past day
                bgColor = COLORS.primary.light + "90"; // faded teal
                textColor = COLORS.primary.main; // main teal text
              }
            } else if (day === today) {
              // Today
              bgColor = COLORS.primary.main;
              textColor = "#fff";
              fontWeight = "bold";
            } else {
              // Future days
              bgColor = COLORS.primary.light + "20"; // very faint teal
              textColor = COLORS.gray.dark;
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
