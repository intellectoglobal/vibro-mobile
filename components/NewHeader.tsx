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

interface NewHeaderProps {
  title: string;
  onMenuPress?: () => void;
  onNotificationPress?: () => void;
}

const NewHeader: React.FC<NewHeaderProps> = ({
  title,
  onMenuPress,
  onNotificationPress,
}) => {
  return (
    <SafeAreaView className="bg-primary">
      <StatusBar barStyle="light-content" className="bg-primary" />
      <View
        style={{ paddingBottom: 15 }}
        className="flex-row items-center justify-between h-14 px-4 bg-primary"
      >
        <TouchableOpacity onPress={onMenuPress} className="p-2">
          <Ionicons name="menu" size={24} color="#fff" />
        </TouchableOpacity>
        <Text
          className="left-1/2 -translate-x-1/2 text-lg font-semibold text-white"
          style={styles.title}
        >
          {title}
        </Text>
        <TouchableOpacity onPress={onNotificationPress} className="p-2">
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NewHeader;

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
