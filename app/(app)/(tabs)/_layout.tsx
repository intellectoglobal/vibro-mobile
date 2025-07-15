import { Tabs } from "expo-router";
import React from "react";
import Icon from "react-native-vector-icons/MaterialIcons";

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          //   backgroundColor: '#bfdbff', // Tailwind `secondary`
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB", // neutral gray
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={24}
              color={focused ? "#2662f0" : "#9CA3AF"}
            />
          ),
          tabBarLabelStyle: { fontSize: 10, color: "#2662f0" }, // `primary`
        }}
      />
      <Tabs.Screen
        name="forms"
        options={{
          title: "Forms",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="assignment"
              size={24}
              color={focused ? "#2662f0" : "#9CA3AF"}
            />
          ),
          tabBarLabelStyle: { fontSize: 10, color: "#2662f0" },
        }}
      />

      <Tabs.Screen
        name="todo"
        options={{
          title: "To-Do",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="check-circle-outline"
              size={24}
              color={focused ? "#2662f0" : "#9CA3AF"}
            />
          ),
          tabBarLabelStyle: { fontSize: 10, color: "#2662f0" },
        }}
      />

      <Tabs.Screen
        name="learn"
        options={{
          title: "Learn",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="school"
              size={24}
              color={focused ? "#2662f0" : "#9CA3AF"}
            />
          ),
          tabBarLabelStyle: { fontSize: 10, color: "#2662f0" },
        }}
      />

      <Tabs.Screen
        name="guides"
        options={{
          title: "Guides",
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Icon
              name="help-outline"
              size={24}
              color={focused ? "#2662f0" : "#9CA3AF"}
            />
          ),
          tabBarLabelStyle: { fontSize: 10, color: "#2662f0" },
        }}
      />
    </Tabs>
  );
};

export default _layout;
