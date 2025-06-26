import React from 'react';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { 
  CheckCircleIcon,
  PaperAirplaneIcon,
  BookmarkIcon,
  ChartBarIcon,
  CogIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  BellIcon
} from 'react-native-heroicons/outline';

const Sidebar = () => {
  const menuItems = [
    {
      id: 1,
      title: 'Completed Tasks',
      icon: CheckCircleIcon,
    },
    {
      id: 2,
      title: 'Sent Messages',
      icon: PaperAirplaneIcon,
    },
    {
      id: 3,
      title: 'Bookmarks',
      icon: BookmarkIcon,
    },
    {
      id: 4,
      title: 'Leaderboard',
      icon: ChartBarIcon,
    },
    {
      id: 5,
      title: 'Admin and Settings',
      icon: CogIcon,
    },
    {
      id: 6,
      title: 'Search',
      icon: MagnifyingGlassIcon,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#6b46c1" barStyle="light-content" />
      
      {/* Header Section */}
      <View className="bg-purple px-6 py-6 flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          {/* Profile Avatar */}
          <View className="w-16 h-16 bg-white rounded-full items-center justify-center mr-4">
            <View className="w-12 h-12 bg-black rounded-full items-center justify-center">
              {/* Custom pattern for avatar */}
              <View className="flex-row flex-wrap w-8 h-8">
                <View className="w-2 h-2 bg-white m-0.5 rounded-sm" />
                <View className="w-2 h-2 bg-white m-0.5 rounded-sm" />
                <View className="w-2 h-2 bg-black m-0.5 rounded-sm" />
                <View className="w-2 h-2 bg-white m-0.5 rounded-sm" />
                <View className="w-2 h-2 bg-white m-0.5 rounded-sm" />
                <View className="w-2 h-2 bg-black m-0.5 rounded-sm" />
                <View className="w-2 h-2 bg-black m-0.5 rounded-sm" />
                <View className="w-2 h-2 bg-white m-0.5 rounded-sm" />
              </View>
            </View>
          </View>
          
          {/* User Info */}
          <View className="flex-1">
            <Text className="text-white text-lg font-semibold">Test Test</Text>
            <Text className="text-white text-sm opacity-90">Zepto</Text>
            <Text className="text-white text-sm opacity-90">+918248694043</Text>
          </View>
        </View>
        
        {/* Notification Icon */}
        <TouchableOpacity className="p-2">
          <BellIcon size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Menu Items */}
      <ScrollView className="flex-1 bg-white">
        <View className="py-4">
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              className="flex-row items-center px-6 py-4 active:bg-gray-50"
            >
              <View className="w-10 h-10 items-center justify-center mr-4">
                <item.icon size={24} color="#374151" strokeWidth={1.5} />
              </View>
              <Text className="text-darkGray text-base font-medium flex-1">
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Account Section */}
        <View className="border-t border-gray-200 mt-4">
          <Text className="text-gray text-sm font-medium px-6 py-3 uppercase tracking-wide">
            Account
          </Text>
          
          <TouchableOpacity className="flex-row items-center px-6 py-4 active:bg-gray-50">
            <View className="w-10 h-10 items-center justify-center mr-4">
              <PlusIcon size={24} color="#6b46c1" strokeWidth={2} />
            </View>
            <Text className="text-purple text-base font-medium flex-1">
              Add Account
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Version Info */}
      <View className="px-6 py-4 border-t border-gray-200">
        <Text className="text-red-500 text-sm font-medium text-center">
          r121 v5.37.1
        </Text>
      </View>

      {/* Bottom Navigation Indicator */}
      <View className="h-1 bg-white">
        <View className="w-32 h-1 bg-white rounded-full mx-auto" />
      </View>
    </SafeAreaView>
  );
};

export default Sidebar;