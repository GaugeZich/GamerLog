import { Tabs } from 'expo-router';
import { SymbolView, SymbolViewProps } from 'expo-symbols';
import { ColorValue } from 'react-native';
import { COLORS } from '../../src/constants/theme';

type TabIconProps = {
  name: SymbolViewProps['name'];
  color: string | ColorValue;
};

const TabIcon = ({ name, color }: TabIconProps) => (
  <SymbolView
    name={name}
    size={24}
    tintColor={color as string}
    weight="regular"
  />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.darkCard,
          borderTopColor: COLORS.secondary,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.secondary,
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color }) => (
            <TabIcon name="house.fill" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarLabel: 'Explorar',
          tabBarIcon: ({ color }) => (
            <TabIcon name="magnifyingglass" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mylist"
        options={{
          tabBarLabel: 'Mi lista',
          tabBarIcon: ({ color }) => (
            <TabIcon name="bookmark.fill" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}