import type { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/MaterialIcons";

interface HeaderProps {
  title: string;
  showBack?: boolean;
  showNotification?: boolean;
  onMenuPress?: () => void;
  onBackPress?: () => void;
  onNotificationPress?: () => void;
}

type RootDrawerParamList = {
  "(tabs)": undefined;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  // onMenuPress,
  onBackPress,
  showNotification = true,
  showBack = false,
  // onNotificationPress,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const router = useRouter();
  return (
    <SafeAreaView className="bg-primary">
      <StatusBar barStyle="light-content" className="bg-primary" />
      <View
        style={{ paddingBottom: 15 }}
        className="flex-row items-center justify-between h-14 px-4 bg-primary"
      >
        {showBack ? (
          <TouchableOpacity onPress={onBackPress} className="p-2">
            <Icon name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            className="p-2"
          >
            <Ionicons name="menu" size={24} color="#fff" />
          </TouchableOpacity>
        )}

        <Text
          className="left-1/2 -translate-x-1/2 text-lg font-semibold text-white"
          style={styles.title}
        >
          {title}
        </Text>
        {showNotification && (
          <TouchableOpacity
            onPress={() => router.push("/screens/Notification/notification")}
            className="p-2"
          >
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: "#fff",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 56,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  iconButton: {
    padding: 8,
  },
  title: {
    color: "#fff",
  },
});
