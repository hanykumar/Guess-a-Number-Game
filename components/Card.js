import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
const Card = (props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};
const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 5,
    shadowOpacity: 0.26,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    // elevation: 5, For Android shadow
  },
});
export default Card;
