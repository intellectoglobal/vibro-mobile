import { Stack } from "expo-router";
import "./globals.css";
import { HeaderShownContext } from "@react-navigation/elements";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen 
      name="(tabs)" 
      options={{headerShown: false}}
    />
  </Stack>;
}
