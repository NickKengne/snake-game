import { StyleSheet , View,Text } from "react-native";
import { Coordinate } from "../types/types";

function getRandomFruitsEmoji () : string{
    const fruitEmoji = ["🍑", "🍅", "🍎", "🍓"]
    const randomIndex = Math.floor(Math.random() * fruitEmoji.length)
    return fruitEmoji[randomIndex]
}

export default function Food ({x,y} : Coordinate):JSX.Element{
    return (
        <Text style={[{top: y*10 , left: x*10}, styles.food]}>
            🍅
        </Text>
    )
}

const styles = StyleSheet.create({
    food: {
        width: 20,
        aspectRatio: 1,
        borderRadius: 7,
        position: "absolute"
    }
})