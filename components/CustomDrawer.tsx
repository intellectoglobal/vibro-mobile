import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import React, { memo, useCallback } from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import ReactIcon from "../assets/images/react-logo.png";

// Define types for better type safety
interface DrawerItemConfig {
  label: string;
  iconName: string;
  route: string;
}

interface UserProfile {
  name: string;
  company: string;
  phone: string;
  avatar: any;
}

const CustomDrawer: React.FC<DrawerContentComponentProps> = memo((props) => {
  // User profile data - could come from props or context
  const userProfile: UserProfile = {
    name: "Test Test",
    company: "Vibro",
    phone: "+918248694043",
    avatar: ReactIcon,
  };

  // Helper to navigate and close drawer on web
  const navigateAndClose = (route: string) => {
    props.navigation.navigate(route);
    if (Platform.OS === "web") {
      props.navigation.closeDrawer();
    }
  };

  // Drawer items configuration
  const drawerItems: DrawerItemConfig[] = [
    {
      label: "Completed Tasks",
      iconName: "check-circle",
      route: "screens/CompletedTasks/completed-tasks",
    },
    {
      label: "Sent Messages",
      iconName: "send",
      route: "screens/Sentmessage/sentmessage",
    },
    {
      label: "Bookmarks",
      iconName: "bookmark",
      route: "screens/Bookmarks/bookmarks",
    },
    {
      label: "Leaderboard",
      iconName: "bar-chart",
      route: "screens/Leaderboard/leaderboard",
    },
    {
      label: "Admin and Settings",
      iconName: "settings",
      route: "screens/Settings/settings",
    },
    {
      label: "Search",
      iconName: "search",
      route: "screens/Search/search",
    },
  ];

  const handleAddAccount = useCallback(() => {
    props.navigation.navigate("screens/Login/login");
    if (Platform.OS === "web") {
      props.navigation.closeDrawer();
    }
  }, []);

  const renderIcon = useCallback((iconName: string) => {
    const IconRenderer = ({ color, size }: { color: string; size: number }) => (
      <Icon name={iconName} color={color} size={size} />
    );
    IconRenderer.displayName = `DrawerIcon-${iconName}`;
    return IconRenderer;
  }, []);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Section */}
      <View className="flex flex-row items-center p-4">
        <Image
          source={userProfile.avatar}
          className="w-16 h-16 rounded-full mr-4"
          resizeMode="cover"
        />
        <View>
          <Text className="text-black text-base font-bold mb-0.5">
            {userProfile.name}
          </Text>
          <Text className="text-black text-sm mb-0.5">
            {userProfile.company}
          </Text>
          <Text className="text-black text-xs">{userProfile.phone}</Text>
        </View>
      </View>

      {/* Drawer Items */}
      <View className="p-1">
        {drawerItems.map((item, index) => (
          <DrawerItem
            key={`${item.label}-${index}`}
            label={item.label}
            icon={renderIcon(item.iconName)}
            onPress={() => navigateAndClose(item.route)}
            activeTintColor="#2662f0"
            inactiveTintColor="#666"
          />
        ))}
      </View>

      {/* Add Account Section */}
      <View className="border-t border-gray-300 px-4 py-3 mt-auto">
        <Text className="text-gray-500 text-sm mb-2">Account</Text>
        <TouchableOpacity
          className="flex-row items-center py-1"
          onPress={handleAddAccount}
          activeOpacity={0.7}
        >
          <Icon name="add" size={24} color="#2662f0" />
          <Text className="ml-2 text-purple-800 text-base">Add Account</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
});

CustomDrawer.displayName = "CustomDrawer";

export default CustomDrawer;
