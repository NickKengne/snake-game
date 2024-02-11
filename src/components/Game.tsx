import * as React from "react";
import { SafeAreaView, View, StyleSheet, Text } from "react-native";
import { Colors } from "../styles/colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import { Coordinate, Direction, GestureEventType } from "../types/types";
import Snake from "./Snake";
import { checkGameOver } from "../utils/checkGameOver";
import Food from "./Food";
import { checkEatsFood } from "../utils/CheckEatsFood";
import { randomFoodPosition } from "../utils/randomFoodPosition";
import Header from "./Header";

const SNAKE_INITIAL_POSOTION: Coordinate[] = [{ x: 5, y: 5 }];
const FOOD_INITIAL_POSITION: Coordinate = { x: 5, y: 20 };
const GAME_BOUNDS = {
  xMin: 0,
  xMax: 33.5,
  yMin: 0,
  yMax: 52.5,
};
let MOVE_INTERVAL: number = 50;
const SCORE_INCREMENT: number = 5;

export default function Game(): JSX.Element {
  const [direction, setDirection] = React.useState<Direction>(Direction.Right);
  const [snake, setSnake] = React.useState(SNAKE_INITIAL_POSOTION);
  const [food, setFood] = React.useState(FOOD_INITIAL_POSITION);
  const [isGameOver, setIsGameOver] = React.useState<boolean>(false);
  const [isPaused, setIsPaused] = React.useState<boolean>(false);
  const [score, setScore] = React.useState<number>(0);

  React.useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPaused && moveSnake();
      }, MOVE_INTERVAL);
      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPaused]);

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = { ...snakeHead }; // creating a copy

    if (checkGameOver(snakeHead, GAME_BOUNDS)) {
      setIsGameOver((prev: boolean): boolean => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }
    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(score + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    const { translationX, translationY } = event.nativeEvent;
    if (Math.abs(translationX) > Math.abs(translationY)) {
      if (translationX > 0) {
        //moving right
        setDirection(Direction.Right);
      } else {
        //moving left
        setDirection(Direction.Left);
      }
    } else {
      if (translationY > 0) {
        //moving down
        setDirection(Direction.Down);
      } else {
        //moving up
        setDirection(Direction.Up);
      }
    }
  };

  const reloadGame = () => {
    setSnake(SNAKE_INITIAL_POSOTION)
    setFood(FOOD_INITIAL_POSITION)
    setIsGameOver(false)
    setScore(0)
    setDirection(Direction.Right)
    setIsPaused(false)
  }
  const pauseGame = () => {
    setIsPaused(!isPaused)
  }

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <Header reloadGame={reloadGame} pauseGame={pauseGame} isPaused={isPaused}>
            <Text style={{
                fontWeight: "600"
            }}>{score}</Text>
        </Header>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food x={food.x} y={food.y} />
        </View>
      </SafeAreaView>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1
  },
  boundaries: {
    flex: 1,
    borderColor: Colors.primary,
    borderWidth: 10,
    borderRadius: 10,
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: Colors.background,
  },
});
