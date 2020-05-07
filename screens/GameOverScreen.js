import React from "react";
import { TextInput, StyleSheet, View, Text, Button, Image } from "react-native";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
const Input = (props) => {
  return (
    <View style={styles.container}>
      <Card style={{ width: "100%" }}>
        <BodyText style={{ fontSize: 20, textAlign: "center" }}>
          The Game is over!
        </BodyText>
        <View style={styles.imageContainer}>
          <Image
            fadeDuration={2000}
            style={styles.image}
            source={require("../assets/hany.jpg")}
          />
        </View>
        <BodyText style={{ fontSize: 16, textAlign: "center" }}>
          Total Rounds: {props.roundsNumber}
        </BodyText>
        <BodyText style={{ fontSize: 16, textAlign: "center" }}>
          Number was: {props.userNumber}
        </BodyText>
      </Card>
      <Button title="New Game" onPress={props.startNewGame} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "green",
    width: 350,
    height: 350,
    borderRadius: 170,
    overflow: "hidden",
    marginVertical: 20,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default Input;
