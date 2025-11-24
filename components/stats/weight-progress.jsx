import { View, Text } from "react-native";
import React from "react";
import Svg, { Polyline, Circle, Line } from "react-native-svg";

const WeightProgress = ({ selectedTimePeriod, data }) => {
  return (
    <>
      <View className="mt-8 bg-white rounded-2xl p-5 shadow-sm">
        <View className="flex-col justify-between items-left mb-5">
          <Text className="font-bold text-lg text-gray-800">
            {selectedTimePeriod === "Week"
              ? "Daily"
              : selectedTimePeriod === "Month"
                ? "Weekly"
                : "Monthly"}
            Weight Progress
          </Text>
          <Text className="text-[10px] text-green-600 font-semibold">
            Goal: {data.weightGoal} lbs
          </Text>
        </View>

        {/* Compute min and max weight for scaling */}
        {(() => {
          const weights = data.chartData.map(
            (item) => item.weight ?? data.weight
          );
          const minWeight = Math.min(...weights, data.weightGoal) - 2; // padding
          const maxWeight = Math.max(...weights, data.weightGoal) + 2; // padding
          const chartHeight = 220;
          const chartWidth = 300;

          return (
            <View
              style={{
                height: chartHeight,
                flexDirection: "row",
                alignItems: "flex-end",
              }}
            >
              {/* Y-axis labels */}
              <View
                style={{
                  width: 40,
                  height: "100%",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  marginRight: 5,
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = Math.round(
                    minWeight + ((maxWeight - minWeight) / 4) * (4 - i)
                  );
                  return (
                    <Text key={i} className="text-[10px] text-gray-500">
                      {value} lbs
                    </Text>
                  );
                })}
              </View>

              {/* Line chart */}
              <View style={{ flex: 1 }}>
                <Svg height={chartHeight} width="100%">
                  {/* Draw line */}
                  <Polyline
                    points={data.chartData
                      .map((item, i) => {
                        const x =
                          (i / (data.chartData.length - 1)) * chartWidth;
                        const weight = item.weight ?? data.weight;
                        const y =
                          chartHeight -
                          ((weight - minWeight) / (maxWeight - minWeight)) *
                            chartHeight;
                        return `${x},${y}`;
                      })
                      .join(" ")}
                    fill="none"
                    stroke="#ec4899"
                    strokeWidth="3"
                  />

                  {/* Draw dots */}
                  {data.chartData.map((item, i) => {
                    const x = (i / (data.chartData.length - 1)) * chartWidth;
                    const weight = item.weight ?? data.weight;
                    const y =
                      chartHeight -
                      ((weight - minWeight) / (maxWeight - minWeight)) *
                        chartHeight;
                    return (
                      <Circle key={i} cx={x} cy={y} r={4} fill="#ec4899" />
                    );
                  })}

                  {/* Goal line */}
                  <Line
                    x1="0"
                    y1={
                      chartHeight -
                      ((data.weightGoal - minWeight) /
                        (maxWeight - minWeight)) *
                        chartHeight
                    }
                    x2={chartWidth}
                    y2={
                      chartHeight -
                      ((data.weightGoal - minWeight) /
                        (maxWeight - minWeight)) *
                        chartHeight
                    }
                    stroke="#10b981"
                    strokeWidth="1"
                    strokeDasharray="4,2"
                  />
                </Svg>

                {/* X-axis labels */}
                <View className="flex-row justify-between mt-2">
                  {data.chartData.map((item, i) => (
                    <Text key={i} className="text-[10px] text-gray-500">
                      {item.label}
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          );
        })()}
      </View>
    </>
  );
};

export default WeightProgress;
