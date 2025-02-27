import React, { useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import RN_SplashScreen from "react-native-splash-screen";
import Svg, { Path } from "react-native-svg";

const Logo = ({ width = 120, height = 120, stroke = "#007bff" }) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M12 2 L19 8 L12 14 L5 8 Z" />
      <Path d="M5 8 L12 14 L19 8" />
      <Path d="M12 14 L12 22" />
    </Svg>
  );
};

export const Splash = () => {
  const scaleAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => RN_SplashScreen.hide(), 500);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Logo width={120} height={120} stroke="#007bff" />
      </Animated.View>
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