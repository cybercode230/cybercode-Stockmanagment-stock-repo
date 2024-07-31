import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const Sidebar = ({ isVisible, onClose }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [animation] = useState(new Animated.Value(1));

  if (!isVisible) return null;

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handlePress = (item) => {
    setActiveItem(item);
    Animated.timing(animation, {
      toValue: 0.8,
      duration: 150,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    });
  };

  const getItemStyle = (item) => ({
    backgroundColor: activeItem === item ? "#242424" : "#1A1A1A",
  });

  return (
    <View style={styles.sidebar}>
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={onClose}>
        <Ionicons
          name="close"
          size={24}
          color="#FCFCFC"
        />
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.userInfoWrapper}>
          <Image
            source={require("../assets/images/sam.jpg")}
            style={styles.userImg}
          />
          <View style={styles.userTxtWrapper}>
            <Text style={styles.userText}>Hi, Josue</Text>
            <Text style={styles.userText}>
              Stock <Text style={styles.boldText}>manager</Text>
            </Text>
          </View>
        </View>
        <View style={styles.separator} />
        <Animated.View style={[styles.menuItem, getItemStyle("Dashboard")]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handlePress("Dashboard")}>
            <Ionicons
              name="home"
              size={20}
              color="#FCFCFC"
            />
            <Text style={styles.menuText}>Dashboard</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.menuItem, getItemStyle("Stock Report")]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handlePress("Stock Report")}>
            <Ionicons
              name="stats-chart"
              size={20}
              color="#FCFCFC"
            />
            <Text style={styles.menuText}>Stock Report</Text>
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={toggleDropdown}>
          <Ionicons
            name="cube"
            size={20}
            color="#FCFCFC"
          />
          <Text style={styles.menuText}>Product Management</Text>
          <Ionicons
            name={isDropdownVisible ? "chevron-up" : "chevron-down"}
            size={20}
            color="#FCFCFC"
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
        {isDropdownVisible && (
          <View style={styles.subMenuContainer}>
            {[
              "Add New",
              "View Lists",
              "View All Stock",
              "Create New Employee",
            ].map((item) => (
              <TouchableOpacity
                key={item}
                style={[styles.subMenuItem, getItemStyle(item)]}
                onPress={() => handlePress(item)}>
                <MaterialIcons
                  name={
                    item === "Add New"
                      ? "add"
                      : item === "View Lists"
                      ? "list"
                      : item === "View All Stock"
                      ? "visibility"
                      : "person-add"
                  }
                  size={18}
                  color="#FCFCFC"
                />
                <Text
                  style={[
                    styles.subMenuText,
                    activeItem === item && styles.activeSubMenuText,
                  ]}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        <View style={styles.separator} />
        <Animated.View style={[styles.menuItem, getItemStyle("Logout")]}>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => handlePress("Logout")}>
            <Ionicons
              name="log-out"
              size={20}
              color="#FCFCFC"
            />
            <Text style={styles.menuText}>Logout</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "80%",
    backgroundColor: "#1A1A1A",
    zIndex: 10,
    padding: 20,
    paddingTop: 40,
  },
  closeBtn: {
    position: "absolute",
    top: 30,
    right: 20,
  },
  userInfoWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userTxtWrapper: {
    flexDirection: "column",
  },
  userText: {
    color: "#FCFCFC",
    fontSize: 16,
  },
  boldText: {
    fontWeight: "700",
  },
  separator: {
    height: 1,
    backgroundColor: "#2A2A2A",
    marginVertical: 15,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  menuItem: {
    marginBottom: 10,
  },
  menuButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  menuText: {
    color: "#FCFCFC",
    fontSize: 16,
    marginLeft: 10,
  },
  subMenuContainer: {
    marginLeft: 10,
    marginTop: 5,
  },
  subMenuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  subMenuText: {
    color: "#FCFCFC",
    fontSize: 14,
    marginLeft: 10,
  },
  activeSubMenuText: {
    fontWeight: "700",
  },
  dropdownIcon: {
    marginLeft: "auto",
  },
});

export default Sidebar;
