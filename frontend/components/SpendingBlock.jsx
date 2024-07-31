import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DollarIcon from "../assets/icons/dollar-line.svg";
// import WalletAddMoneyIcon from "../assets/icons/add-money-wallet-icon.svg";
// import WalletCardIcon from "../assets/icons/wallet-credit-card.svg";
import AmazonIcon from "../assets/icons/amazon-outlined.svg";
// import UberIcon from "../assets/icons/brand-uber.svg";
import AirbnbIcon from "../assets/icons/bxl-airbnb.svg";
// import DollarSignIcon from "../assets/icons/dollar-sign.svg";
import FigmaIcon from "../assets/icons/logo-figma.svg";
import ShoppingCartIcon from "../assets/icons/shopping-cart-line.svg";
import SpotifyIcon from "../assets/icons/spotify-logo-light.svg";
import NetflixIcon from "../assets/icons/netflix.svg";

const SpendingBlock = () => {
  const data = [
    {
      id: "1",
      name: "Ropes 12x17",
      amount: "100.00",
      date: "2024-05-01",
    },
    {
      id: "2",
      name: "Bags 200mmx100mm",
      amount: "100.99",
      date: "2024-05-02",
    },
    {
      id: "3",
      name: "Ropes 12x17",
      amount: "100.00",
      date: "2024-05-01",
    },
  ];

  const getIcon = (name) => {
    switch (name) {
      case "AirBnB Rent":
        return (
          <AirbnbIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
      case "Netflix":
        return (
          <NetflixIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
      case "Spotify":
        return (
          <SpotifyIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
      case "Amazon":
        return (
          <AmazonIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
      case "Figma":
        return (
          <FigmaIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
      case "Online Shopping":
        return (
          <ShoppingCartIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
      default:
        return (
          <DollarIcon
            width={22}
            height={22}
            color="#FCFCFC"
          />
        );
    }
  };

  return (
    <View style={styles.spendingSectionWrapper}>
      <Text style={styles.sectionTitle}>
        July <Text style={{ fontWeight: "700" }}>Product Lists</Text>
      </Text>

      {data.map((item) => (
        <View
          style={styles.spendingWrapper}
          key={item.id}>
          <View style={styles.iconWrapper}>{getIcon(item.name)}</View>
          <View style={styles.textWrapper}>
            <View style={{ gap: 5 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={{ color: "#FCFCFC" }}>{item.date}</Text>
            </View>
            <Text style={styles.itemName}>${item.amount}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

export default SpendingBlock;

const styles = StyleSheet.create({
  spendingSectionWrapper: {
    marginVertical: 20,
    alignItems: "flex-start",
  },
  sectionTitle: {
    color: "#FCFCFC",
    fontSize: 16,
    marginBottom: 20,
  },
  spendingWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  iconWrapper: {
    backgroundColor: "#242424",
    padding: 15,
    borderRadius: 50,
    marginRight: 10,
  },
  textWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemName: {
    color: "#FCFCFC",
    fontSize: 16,
    fontWeight: "600",
  },
});
