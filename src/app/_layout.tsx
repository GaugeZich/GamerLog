import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaProvider, useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../constants/theme";

function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,

                    // Altura dinámica respetando safe area
                    height: 60 + insets.bottom,

                    // Padding inferior según dispositivo
                    paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
                    paddingTop: 8,
                },

                tabBarActiveTintColor: theme.colors.neon,
                tabBarInactiveTintColor: theme.colors.textMuted,

                headerStyle: {
                    backgroundColor: theme.colors.background,
                    borderBottomColor: theme.colors.border,
                    shadowOpacity: 0,
                    elevation: 0,
                },

                headerTintColor: theme.colors.neon,

                headerTitleAlign: "center",

                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: theme.font.lg,
                },

                sceneStyle: {
                    backgroundColor: theme.colors.background,
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Inicio",
                    headerTitle: "GAMERLOG",

                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="games"
                options={{
                    title: "Explorar",
                    headerShown: false,

                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "search" : "search-outline"}
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name="mylist"
                options={{
                    title: "Mi lista",
                    headerShown: false,

                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons
                            name={focused ? "bookmark" : "bookmark-outline"}
                            size={22}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}

export default function RootLayout() {
    return (
        <SafeAreaProvider>
            <TabsLayout />
        </SafeAreaProvider>
    );
}