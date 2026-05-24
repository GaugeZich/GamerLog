import { Stack } from 'expo-router';
import { COLORS } from '../src/constants/theme';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: COLORS.dark },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: true }} />
      <Stack.Screen name="game/[id]" options={{ headerShown: true}} />
      <Stack.Screen name="review" options={{ headerShown: true }} />
    </Stack>
  );
}