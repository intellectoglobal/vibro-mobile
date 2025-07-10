import { Stack } from "expo-router";

export default function FormsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false, // Hide header for the initial screen
        }}
      />
      <Stack.Screen
        name="folder-list"
        options={{
          title: "FolderList",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="multi-stage-form"
        options={{
          title: "Stage form",
          headerShown: false,
          animation: "slide_from_right",
        }}
      />
    </Stack>
  );
}
