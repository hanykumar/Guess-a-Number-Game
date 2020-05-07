import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Alert,
  ScrollView,
  Dimensions,
} from "react-native";
import { ScreenOrientation } from "expo";

import Card from "../components/Card";
import BodyText from "../components/BodyText";
const generateRandomNumber = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNumber(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  // ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);

  const initialGuess = generateRandomNumber(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  // const [rounds, setRounds] = useState(0);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const { userChoice, onGameOver } = props;

  useEffect(() => {
    if (currentGuess === props.userChoice) {
      props.onGameOver(pastGuesses.length);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "LOWER" && currentGuess < props.userChoice) ||
      (direction === "GREATER" && currentGuess > props.userChoice)
    ) {
      return Alert.alert("Don't cheat me!");
    }
    if (direction === "LOWER") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomNumber(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );
    setCurrentGuess(nextNumber);
    // setRounds((curRound) => curRound + 1);
    setPastGuesses((currPassGuess) => [nextNumber, ...currPassGuess]);
  };
  return (
    <View style={styles.container}>
      <BodyText style={{ fontSize: 20 }}>
        Opponent Guess: {currentGuess}
      </BodyText>
      <Card style={styles.buttonContainer}>
        <Button title="LOWER" onPress={nextGuessHandler.bind(this, "LOWER")} />
        <Button
          title="GREATER"
          onPress={nextGuessHandler.bind(this, "GREATER")}
        />
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) => (
            <View key={guess} style={styles.listItem}>
              <Text>#{pastGuesses.length - index}. </Text>
              <Text>{guess}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: Dimensions.get("window").height > 600 ? 10 : 5,
    // width: 300,
  },
  list: {
    flex: 1,
    width: "80%",
  },
  listItem: {
    borderColor: "#ccc",
    borderWidth: 1,
    flexDirection: "row",
    marginVertical: 10,
    padding: 15,
    justifyContent: "space-between",
  },
});
export default GameScreen;
