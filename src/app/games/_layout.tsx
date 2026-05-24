import { Stack } from "expo-router";
import { theme } from "../../constants/theme";

export default function GamesLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.neon,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: theme.font.lg,
                },
                contentStyle: {
                    backgroundColor: theme.colors.background,
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: "EXPLORAR" }}
            />
            <Stack.Screen
                name="[id]"
                options={{ title: "DETALLE" }}
            />
        </Stack>
    );
}