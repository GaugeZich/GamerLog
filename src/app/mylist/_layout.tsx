import { Stack } from "expo-router";
import { theme } from "../../constants/theme";

export default function MyListLayout() {
    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: theme.colors.background,
                },
                headerTintColor: theme.colors.primary,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: theme.fontSize.lg,
                },
                contentStyle: {
                    backgroundColor: theme.colors.background,
                },
            }}
        >
            <Stack.Screen
                name="index"
                options={{ title: "MI LISTA" }}
            />
            <Stack.Screen
                name="review"
                options={{ title: "RESEÑA" }}
            />
        </Stack>
    );
}