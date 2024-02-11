import { TouchableOpacity,View,Text ,StyleSheet} from "react-native"
import { Colors } from "../styles/colors"
import {Ionicons,FontAwesome} from "@expo/vector-icons"


interface HeaderProps{
    reloadGame : () => void
    pauseGame: () => void
    children : JSX.Element
    isPaused: boolean
}

export default function Header({
    children,reloadGame,pauseGame,isPaused
}: HeaderProps):JSX.Element  {
    return (
        <View style={styles.conatainerHeader}>
            <TouchableOpacity onPress={reloadGame}>
                <Ionicons name="reload-circle" size={30} color={Colors.primary}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={pauseGame}>
                <FontAwesome name="play-circle" size={30} color={Colors.primary}/>
            </TouchableOpacity>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    conatainerHeader: {
        flex: 0.05,
        flexDirection: 'row',
        alignItems:"center",
        justifyContent:"space-between",
        borderColor:Colors.primary,
        borderWidth: 15,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomWidth: 0,
        padding: 20,
        backgroundColor:Colors.background
    }
})