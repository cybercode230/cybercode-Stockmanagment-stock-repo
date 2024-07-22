import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#075eec"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
