import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const DashboardScreen = () => {

  return (
    <View style={styles.container}>
        <Text>DASHBOARD!!!!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
});