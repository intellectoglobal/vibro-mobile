import { createNativeStackNavigator as realCreateNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import FormAccordionList from "./form-accordion-list";
import FormFileList from "./form-file-list";
import FormsTabs from "./forms-tabs";

const Stack = createNativeStackNavigator();

export default function FormStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={FormsTabs}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="file-list"
        component={FormFileList}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="form-accordion"
        component={FormAccordionList}
      />
    </Stack.Navigator>
  );
}

function createNativeStackNavigator() {
  return realCreateNativeStackNavigator();
}
