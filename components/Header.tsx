import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBackPress?: () => void;
  showNotification?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBackPress,
  showNotification = true,
}) => {
  
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
            <TouchableOpacity className="p-2">
              <Icon name="menu" size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
        </View>

        {/* Center Title */}
        <Text className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold text-white">
          {title}
        </Text>

        {/* Right Icon */}
        <View className="w-10 items-end">
          {showNotification ? (
            <TouchableOpacity className="p-2">
              <Icon name="notifications" size={24} color="#ffffff" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </SafeAreaView>
  );
};
