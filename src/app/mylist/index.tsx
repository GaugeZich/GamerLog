import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../constants/theme";

export default function MiListaScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Vista: Mi Lista (Próximamente)</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.background,
    },
    text: {
        color: theme.colors.text,
        fontSize: theme.fontSize.md,
    },
});