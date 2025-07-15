import React from "react";

import AuthWrapper from "../../components/AuthWrapper";
import { Drawer } from "expo-router/drawer";
import CustomDrawer from "@/components/CustomDrawer";

export default function AppLayout() {
  return (
    <AuthWrapper>
      <Drawer
        drawerContent={(props) => <CustomDrawer {...props} />}
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            width: 280,
          },
        }}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            drawerLabel: "Main Tabs",
          }}
        />
      </Drawer>
    </AuthWrapper>
  );
}
