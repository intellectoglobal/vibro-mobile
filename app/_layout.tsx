import { Drawer } from "expo-router/drawer";
import { Provider } from "react-redux";
import CustomDrawer from "../components/CustomDrawer"; // adjust if needed
import store from "../store/";
import "./globals.css";

export default function RootLayout() {
  return (
    <Provider store={store}>
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
    </Provider>
  );
}
