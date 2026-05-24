import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { theme } from "../constants/theme";

export default function RootLayout() {
    return (
        <Tabs
            screenOptions={{
                // Color de fondo de la barra de navegación inferior
                tabBarStyle: {
                    backgroundColor: theme.colors.surface,
                    borderTopColor: theme.colors.border,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                // Color del ícono y texto activo/inactivo
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textMuted,

                // Configuración por defecto de las cabeceras (headers)
                headerStyle: {
                    backgroundColor: theme.colors.background,
                    borderBottomColor: theme.colors.border,
                    shadowOpacity: 0, // Remueve la sombra en iOS
                    elevation: 0,     // Remueve la sombra en Android
                },
                headerTintColor: theme.colors.primary,
                headerTitleAlign: "center",
                headerTitleStyle: {
                    fontWeight: "bold",
                    fontSize: theme.fontSize.lg,
                },
                // SOLUCIÓN: Usamos sceneStyle en lugar de contentStyle para el fondo de los Tabs
                sceneStyle: {
                    backgroundColor: theme.colors.background,
                }
            }}
        >
            {/* 1. Pestaña de Inicio */}
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

            {/* 2. Pestaña de Explorar */}
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

            {/* 3. Pestaña de Mi Lista */}
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