import { Tabs } from "expo-router";
import React from "react";
import { useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.accent,
        tabBarInactiveTintColor: theme.colors.secondaryText,
        tabBarStyle: {
          backgroundColor: theme.colors.primaryBackground,
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
        },
        headerStyle: {
          backgroundColor: theme.colors.primaryBackground,
        },
        headerTitleStyle: {
          color: theme.colors.primaryText,
          fontFamily: theme.typography.heading.fontFamily,
          fontWeight: theme.typography.heading.fontWeight,
          fontSize: 20,
        },
        headerTintColor: theme.colors.accent,
      }}
      initialRouteName="showcase"
    >
      <Tabs.Screen
        name="showcase"
        options={{
          title: "Showcase",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="diamond-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: "Store",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="co-creator"
        options={{
          title: "Co-Creator",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="color-palette-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="vault"
        options={{
          title: "Vault",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="lock-closed-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="concierge"
        options={{
          title: "Concierge",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}