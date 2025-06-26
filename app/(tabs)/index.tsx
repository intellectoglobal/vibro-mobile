import { Header } from '@/componets/Header';
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Index = () => {

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      {/* Header */}
      {/* <View className="bg-primary flex-row justify-between items-center px-4 py-3">
        <View className="flex-row items-center">
          <Icon name="menu" size={24} color="white" />
          <Text className="text-white text-lg font-semibold ml-3">Zepto QMS</Text>
        </View>
        <Icon name="notifications" size={24} color="white" />
      </View> */}
      <Header title={'Vibro'}/>

      {/* Search Bar */}
      <View className="bg-white mx-4 mt-4 px-3 py-2.5 rounded-lg flex-row items-center shadow-sm">
        <Icon name="search" size={20} color="#9CA3AF" className="mr-2" />
        <Text className="text-neutral-400 text-base">Search</Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {/* News Section */}
        <Text className="text-neutral-700 text-base font-semibold mt-5 mb-3">News</Text>

        {/* News Item */}
        <View className="bg-white rounded-xl p-4 shadow-md">
          <View className="flex-row items-center mb-3">
            <View className="w-10 h-10 rounded-full bg-avatar justify-center items-center">
              <Text className="text-white font-semibold text-sm">NM</Text>
            </View>
            <View className="ml-3">
              <Text className="text-neutral-700 text-sm font-semibold">Naveenkumar M</Text>
              <Text className="text-neutral-400 text-xs mt-0.5">12 Jun</Text>
            </View>
          </View>

          <View className="mt-2">
            <View className="flex-row items-center mb-2">
              <Icon name="check-circle" size={16} color="#10B981" />
              <Text className="text-neutral-700 text-sm font-semibold ml-1.5">
                Your Compliance Training Assessment is Ready!
              </Text>
            </View>

            <Text className="text-neutral-700 text-sm mb-1">Hi All,</Text>
            <Text className="text-neutral-500 text-sm leading-5 mb-4">
              Your Compliance Training Assessment is now live in the KNOW app!
            </Text>

            <TouchableOpacity className="flex-row items-center bg-neutral-100 px-4 py-2.5 rounded-lg justify-between">
              <Icon name="play-circle-outline" size={20} color="#6B46C1" />
              <Text className="text-primary text-sm font-medium flex-1 ml-2">Launch Course</Text>
              <Icon name="chevron-right" size={20} color="#6B46C1" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Document Section */}
        <View className="bg-primary rounded-xl h-32 mt-5 justify-center items-center">
          <View className="bg-accent w-20 h-20 rounded-lg justify-center items-center">
            <Icon name="description" size={60} color="white" />
          </View>
        </View>

        {/* Engagement Bar */}
        <View className="flex-row items-center bg-white py-3 px-4 mt-4 rounded-lg">
          <View className="flex-row items-center mr-5">
            <Icon name="favorite-border" size={16} color="#9CA3AF" />
            <Text className="text-neutral-400 text-sm ml-1">0</Text>
          </View>
          <View className="flex-row items-center mr-5">
            <Icon name="chat-bubble-outline" size={16} color="#9CA3AF" />
            <Text className="text-neutral-400 text-sm ml-1">0</Text>
          </View>
          <Icon name="bookmark-border" size={16} color="#9CA3AF" />
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

export default Index;