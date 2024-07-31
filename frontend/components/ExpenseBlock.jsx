import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";

const ExpenseBlock = () => {
  const data = [
    {
      id: "1",
      name: "stock total",
      amount: "200,000.95",
      percentage: "95",
    },
    {
      id: "2",
      name: "bags",
      amount: "300.55",
      percentage: "19",
    },
    {
      id: "3",
      name: "Ropes",
      amount: "955.75",
      percentage: "61",
    },
  ];

  const renderItem = ({ item }) => {
    let amount = item.amount.split(".");

    return (
      <View
        style={[
          styles.expenseBlock,
          {
            backgroundColor:
              item.name === "Food"
                ? "#C500B1"
                : item.name === "Saving"
                ? "#FCFCFC"
                : "#723FEB",
          },
        ]}>
        <Text
          style={[
            styles.expenseBlockTxt1,
            {
              color:
                item.name === "Food"
                  ? "#1A1A1A"
                  : item.name === "Saving"
                  ? "#1A1A1A"
                  : "#FCFCFC",
            },
          ]}>
          {item.name}
        </Text>
        <Text
          style={[
            styles.expenseBlockTxt2,
            {
              color:
                item.name === "Food"
                  ? "#1A1A1A"
                  : item.name === "Saving"
                  ? "#1A1A1A"
                  : "#FCFCFC",
            },
          ]}>
          ${amount[0]}.
          <Text style={styles.expenseBlockTxt2Span}>{amount[1]}</Text>
        </Text>
        <View style={styles.expenseBlock3View}>
          <Text
            style={[
              styles.expenseBlockTxt1,
              {
                color:
                  item.name === "Food"
                    ? "#1A1A1A"
                    : item.name === "Saving"
                    ? "#1A1A1A"
                    : "#FCFCFC",
              },
            ]}>
            {item.percentage}%
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={{ paddingVertical: 20 }}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ExpenseBlock;

const styles = StyleSheet.create({
  expenseBlock: {
    backgroundColor: "#C500B1",
    width: 120,
    padding: 15,
    borderRadius: 15,
    marginRight: 20,
    gap: 8,
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  expenseBlockTxt1: {
    color: "#FCFCFC",
    fontSize: 14,
  },
  expenseBlockTxt2: {
    color: "#FCFCFC",
    fontSize: 16,
    fontWeight: "600",
  },
  expenseBlockTxt2Span: {
    fontSize: 12,
    fontWeight: "400",
  },
  expenseBlock3View: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 5,
    paddingVertical: 3,
    borderRadius: 10,
  },
});
