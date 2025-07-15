import React from "react";
import { Slot } from "expo-router";
import { Provider } from "react-redux";
import Toast from "react-native-toast-message";
import "./globals.css"

import store from "@/store"; // ✅ Use absolute import if your project is configured for it

export default function RootLayout() {
  return (
    <Provider store={store}>
      {/* 👇 SafeAreaProvider prevents layout issues on devices */}
      <Slot />
      <Toast />
    </Provider>
  );
}
