import Toast from "react-native-toast-message";
import { Provider } from "react-redux";

import store from "../store/";
import "./globals.css";
import React from "react";
import { Slot } from "expo-router";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Slot />
      <Toast />
    </Provider>
  );
}
