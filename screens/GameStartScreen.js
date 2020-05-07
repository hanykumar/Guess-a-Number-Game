import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import Card from "../components/Card";
import Colors from "../constants/Colors";
import Input from "../components/Input";
import BodyText from "../components/BodyText";

const GameStartScreen = (props) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();
  const [buttonWidth, setButtonWidth] = useState(
    Dimensions.get("window").width / 1.3
  );

  useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(Dimensions.get("window").width / 1.3);
    };
    Dimensions.addEventListener("change", updateLayout);
    return () => {
      Dimensions.removeEventListener("change", updateLayout);
    };
  });

  const numberInputHandler = (inputText) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ""));
  };
  const resetInputHandler = () => {
    setEnteredValue("");
    setConfirmed(false);
  };
  const confirmInputHandler = (input) => {
    const chooseNumber = parseInt(enteredValue);
    if (isNaN(chooseNumber) || chooseNumber <= 0 || chooseNumber > 99) {
      Alert.alert("Invalid Number!", "Number should be between 1-99", [
        {
          Text: "Okay",
          style: "destructive",
          onPress: resetInputHandler,
        },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chooseNumber);
    setEnteredValue("");
    Keyboard.dismiss();
  };

  let confirmedOutput;
  if (confirmed) {
    confirmedOutput = (
      <Card style={{ marginVertical: 20 }}>
        <BodyText style={{ textAlign: "center" }}>You Selected</BodyText>
        <View style={{ marginVertical: 10, alignItems: "center" }}>
          <Text>{selectedNumber}</Text>
        </View>
        <Button
          title="Start the game "
          onPress={() => props.onStartGame(selectedNumber)}
        />
      </Card>
    );
  }
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={20}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.screen}>
            <Text style={styles.title}>Start a new Game hany</Text>
            <Card style={{ width: buttonWidth, alignItems: "center" }}>
              <BodyText>Select a Number</BodyText>
              {/* <Input style={styles.Input} maxLength={2} keyBoardType="number-pad" /> */}
              <Input
                style={styles.input}
                blurOnSubmit
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="number-pad"
                maxLength={2}
                onChangeText={numberInputHandler}
                value={enteredValue}
              />
              <View style={styles.buttonContainer}>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Reset"
                    color={Colors.accent}
                    onPress={resetInputHandler}
                  />
                </View>
                <View style={{ width: buttonWidth }}>
                  <Button
                    title="Confirm"
                    onPress={confirmInputHandler}
                    color={Colors.primary}
                  />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    marginVertical: 10,
  },
  // imputContainer: {
  //   width: 300,
  //   width: buttonWidth,
  //   alignItems: "center",
  // },
  title: {
    fontSize: 20,
    marginVertical: 10,
    fontFamily: "open-sans-bold",
  },
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    paddingHorizontal: 15,
  },
  input: {
    width: 50,
    textAlign: "center",
  },
});

export default GameStartScreen;
