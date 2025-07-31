// _layout.tsx
import { Tabs, usePathname, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import BackNavigationPrompt from "@/components/form/screens/popup";
import { useNavigationContainerRef } from "@react-navigation/native";

const _layout = () => {
  const pathname = usePathname();
  const router = useRouter();
  const prevPathRef = useRef(pathname);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isFormFilling, setIsFormFilling] = useState(false);
  const [formData, setFormData] = useState<any>({});

  // Called from the form screen when a user is filling
  global.setFormFillingStatus = (status: boolean, data?: any) => {
    setIsFormFilling(status);
    if (data) setFormData(data);
  };

  useEffect(() => {
    if (prevPathRef.current.startsWith("/(app)/(tabs)/forms") &&
        !pathname.startsWith("/(app)/(tabs)/forms") &&
        isFormFilling) {
      // Trying to leave forms tab
      setShowPrompt(true);
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  const handleLeaveTab = () => {
    setShowPrompt(false);
    global.setFormFillingStatus(false);
    router.push(pathname); // proceed to intended page
  };

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
