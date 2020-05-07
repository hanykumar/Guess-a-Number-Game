import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";

import Header from "./components/Header";
import GameStartScreen from "./screens/GameStartScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("./assets/Fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/Fonts/OpenSans-Bold.ttf"),
  });
};
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={() => console.log("Error")}
      />
    );
  }

  const configNewGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };
  const gameOverHandler = (rounds) => {
    setGuessRounds(rounds);
  };

  let content = <GameStartScreen onStartGame={startGameHandler} />;
  // let content = (
  //   <GameOverScreen
  //     userNumber="3"
  //     roundsNumber="3"
  //     startNewGame={configNewGameHandler}
  //   />
  // );
  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        startNewGame={configNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
