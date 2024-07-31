import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Stack } from "expo-router";
import Header from "../components/Header";
import { PieChart } from "react-native-gifted-charts";
import ExpenseBlock from "../components/ExpenseBlock";
import IncomeBlock from "../components/IncomeBlock";
import SpendingBlock from "../components/SpendingBlock";
import * as Animatable from "react-native-animatable";
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import Sidebar from "../components/Sidebar";

const BusinessOwnerHomeScreen = () => {
  const [percentage, setPercentage] = useState(100);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const animatedPercentage = useSharedValue(0);

  useEffect(() => {
    animatedPercentage.value = withTiming(percentage, {
      duration: 1000,
      easing: Easing.out(Easing.exp),
    });
  }, [percentage]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedPercentage.value}%`,
    };
  });

  const pieData = [
    {
      value: percentage,
      color: "#C500B1",
      focused: true,
      text: `${percentage}%`,
    },
    {
      value: 100 - percentage,
      color: "#E0E0E0",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          header: () => <Header />,
        }}
      />

      <View style={[styles.container, { paddingTop: 40 }]}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setIsSidebarVisible(true)}>
          <Text style={styles.menuButtonText}>Menu</Text>
        </TouchableOpacity>
        <Sidebar
          isVisible={isSidebarVisible}
          onClose={() => setIsSidebarVisible(false)}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
            <View style={{ gap: 10 }}>
              <Text style={{ color: "#FFFFFF", fontSize: 16, marginTop: 15 }}>
                Stock Master{" "}
                <Text style={{ fontWeight: 800, color: "#C500B1" }}>pro</Text>
              </Text>
              <Text
                style={{
                  color: "#FFFFFF",
                  fontSize: 36,
                  fontWeight: 700,
                  width: 150,
                }}>
                $100.<Text style={{ fontSize: 22, fontWeight: 400 }}>00</Text>
              </Text>
            </View>
            <View style={{ paddingVertical: 20, alignItems: "center" }}>
              <Animatable.View
                animation="fadeIn"
                delay={500}
                duration={1000}>
                <PieChart
                  data={pieData}
                  donut
                  showGradient
                  sectionAutoFocus
                  focusOnPress
                  semiCircle
                  radius={70}
                  innerRadius={55}
                  innerCircleColor="#000000"
                  centerLabelComponent={() => {
                    return (
                      <Animated.View
                        style={[
                          {
                            justifyContent: "center",
                            alignItems: "center",
                          },
                          animatedStyle,
                        ]}>
                        <Text
                          style={{
                            fontSize: 22,
                            color: "white",
                            fontWeight: "bold",
                          }}>
                          {percentage}%
                        </Text>
                      </Animated.View>
                    );
                  }}
                />
              </Animatable.View>
            </View>
          </View>

          <ExpenseBlock />

          <IncomeBlock />

          <SpendingBlock />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingHorizontal: 20,
  },
  menuButton: {
    position: "absolute",
    top: 5,
    left: 290,
    zIndex: 15,
    backgroundColor: "transparent",
    padding: 10,
    borderRadius: 5,
    borderColor: "#666",
    borderWidth: 1,
  },
  menuButtonText: {
    color: "#C500B1",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BusinessOwnerHomeScreen;
