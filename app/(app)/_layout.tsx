import React from "react";
import { Drawer } from "expo-router/drawer";
import AuthWrapper from "../../components/AuthWrapper";
import CustomDrawer from "@/components/CustomDrawer";
import { TouchableOpacity, Platform, StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSegments, router } from "expo-router";

export default function AppLayout() {
  const segments = useSegments();
  const hideHeader = segments[segments.length - 1] === "multi-stage-form";

  return (
    <AuthWrapper>
      {Platform.OS !== "web" && (
        <StatusBar backgroundColor="#2196f3" barStyle="light-content" />
      )}

      <Drawer
        drawerContent={(props) => {
          // Store navigation globally so it can be accessed in headerLeft
          global.drawerNavigation = props.navigation;
          return <CustomDrawer {...props} />;
        }}
        screenOptions={{
          headerShown: true,
          title: "Vibro",
          drawerActiveTintColor: "#ffffff",
          drawerInactiveTintColor: "#64748b",
          drawerStyle: {
            backgroundColor: "#ffffff",
          },
          headerStyle: {
            backgroundColor: "#2196f3",
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: "#ffffff",
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "#ffffff",
            fontSize: 18,
            fontWeight: "600",
          },
          headerLeft: ({ tintColor }) =>
            hideHeader ? (
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ padding: 8, marginLeft: 10 }}
              >
                <Ionicons name="arrow-back" size={24} color={tintColor || "#ffffff"} />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => global.drawerNavigation?.openDrawer()}
                style={{ padding: 8, marginLeft: 10 }}
              >
                <Ionicons name="menu" size={24} color={tintColor || "#ffffff"} />
              </TouchableOpacity>
            ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push("/screens/Notification/notification")}
              style={{ padding: 8, marginRight: 10 }}
            >
              <Ionicons name="notifications-outline" size={24} color="#ffffff" />
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