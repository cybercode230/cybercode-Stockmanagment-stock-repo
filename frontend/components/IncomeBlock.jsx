import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DollarIcon from "../assets/icons/dollar-line.svg";
import WalletAddMoneyIcon from "../assets/icons/add-money-wallet-icon.svg";
import WalletCardIcon from "../assets/icons/wallet-credit-card.svg";
import { Feather } from "@expo/vector-icons";

const IncomeBlock = ({ navigation }) => {
  const items = [
    {
      id: "1",
      name: "Financial Report",
      amount: "1,500.00",
    },
    {
      id: "2",
      name: "I/O Money",
      amount: "850.99",
    },
    {
      id: "3",
      name: "New Arrival Products",
      amount: "200.95",
    },
  ];

  const renderItem = ({ item }) => {
    let backgroundColor, textColor, amountColor, icon;

    switch (item.name) {
      case "I/O Money":
        icon = (
          <WalletCardIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
        backgroundColor = "#C500B1";
        textColor = "#FCFCFC";
        amountColor = "#C500B1";
        break;
      case "My Wallet":
        icon = (
          <WalletAddMoneyIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
        backgroundColor = "#FCFCFC";
        textColor = "#FCFCFC";
        amountColor = "#723FEB";
        break;
      default:
        icon = (
          <DollarIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
        backgroundColor = "#723FEB";
        textColor = "#FCFCFC";
        amountColor = "#723FEB";
        break;
    }

    const [amountWhole, amountDecimal] = item.amount.split(".");

    return (
      <TouchableOpacity
        style={styles.incomeBlock}
        onPress={() => navigation.navigate("IncomeDetailPage", { item })}>
        <View style={[styles.incomeBlockIcon, { backgroundColor }]}>
          {icon}
        </View>
        <View>
          <Text style={[styles.incomeBlockTxt1, { color: textColor }]}>
            {item.name}
          </Text>
          <Text style={[styles.incomeBlockTxt2, { color: amountColor }]}>
            ${amountWhole}.
            <Text style={styles.incomeBlockTxt2Span}>{amountDecimal}</Text>
          </Text>
        </View>
        <Feather
          name="more-vertical"
          size={20}
          color="#242424"
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ paddingVertical: 20 }}>
      <Text style={{ color: "#FCFCFC", fontSize: 16, marginBottom: 20 }}>
        My{" "}
        <Text style={{ fontWeight: "700" }}>
          Stock Exchange Transaction (I/O)
        </Text>{" "}
      </Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default IncomeBlock;

const styles = StyleSheet.create({
  incomeBlock: {
    backgroundColor: "#1A1A1A",
    width: 270,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginRight: 20,
    gap: 8,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  incomeBlockIcon: {
    padding: 10,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  incomeBlockTxt1: {
    color: "#FCFCFC",
    fontSize: 14,
    marginBottom: 3,
  },
  incomeBlockTxt2: {
    color: "#FCFCFC",
    fontSize: 16,
    fontWeight: "600",
  },
  incomeBlockTxt2Span: {
    fontSize: 12,
    fontWeight: "400",
  },
});
