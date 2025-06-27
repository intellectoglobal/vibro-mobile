import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import type { DrawerNavigationProp } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showNotification?: boolean;
}

type RootDrawerParamList = {
  '(tabs)': undefined;
};

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  showNotification = true,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<RootDrawerParamList>>();
  const router = useRouter()

  return (
    <SafeAreaView className="bg-primary">
      <View className="relative flex-row items-center justify-between px-4 py-3 bg-primary">
        {/* Left Icon */}
        <View className="w-10">
          {showBack ? (
            <TouchableOpacity onPress={onBackPress} className="p-2">
              <Icon name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => navigation.openDrawer()} className="p-2">
              <Icon name="menu" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Title */}
        <Text className="left-1/2 -translate-x-1/2  text-lg font-semibold text-white">
          {title}
        </Text>

        {/* Right Icon */}
        <View className="w-10 items-end">
          {showNotification && (
            <TouchableOpacity className="p-2" onPress={() => router.push("/screens/Notification/notification")}>
              <Icon name="notifications" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};
