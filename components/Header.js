import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";

const Header = (props) => {
  return (
    <View
      style={{
        ...styles.HeaderBase,
        ...Platform.select({
          ios: styles.HeaderIOS,
          android: styles.HeaderAndroid,
        }),
      }}
    >
      <Text style={styles.Title}>{props.title}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  HeaderBase: {
    height: 90,
    width: "100%",
    paddingTop: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  HeaderIOS: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  HeaderAndroid: {
    backgroundColor: Colors.primary,
  },
  Title: {
    fontSize: 26,
    color: Platform.OS === "ios" ? Colors.primary : "white",
    fontFamily: "open-sans-bold",
  },
});

export default Header;
