import React from "react";
import { Drawer } from "expo-router/drawer";
import AuthWrapper from "../../components/AuthWrapper";
import CustomDrawer from "@/components/CustomDrawer";
import { TouchableOpacity, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSegments } from "expo-router";

export default function AppLayout() {
  const segments = useSegments();
  console.log("Current path segments:", segments);
  // Check if the last segment is "multi-stage-form"
  const hideHeader = segments[segments.length - 1] === "multi-stage-form";

  return (
    <AuthWrapper>
      {/* Platform-specific StatusBar handling */}
      {Platform.OS !== "web" && (
        <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
      )}

      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: !hideHeader,
          title: "Vibro",
          drawerActiveTintColor: "#ffffff",
          drawerInactiveTintColor: "#64748b",
          drawerStyle: {
            backgroundColor: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#2196f3",
            elevation: 0, // remove Android shadow
            shadowOpacity: 0, // remove iOS shadow
          },
          headerTintColor: "#ffffff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "600",
          },
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/screens/Notification/notification")}
              style={{ padding: 8, marginRight: 10 }}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>
          ),
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            drawerLabel: "Main Tabs",
          }}
        />
      </Drawer>
    </AuthWrapper>
  );
}
