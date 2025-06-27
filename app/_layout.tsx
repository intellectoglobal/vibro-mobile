import { Drawer } from 'expo-router/drawer';
import CustomDrawer from '../components/CustomDrawer'; // adjust if needed
import './globals.css';

export default function RootLayout() {
  return (
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
          drawerLabel: 'Main Tabs',
        }}
      />
    </Drawer>
  );
}
