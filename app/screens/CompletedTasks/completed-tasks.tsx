import React from "react";
import { StatusBar, View, Text, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const CompletedTasks = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="light-content" className="bg-primary" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-5 bg-primary shadow-md border-b border-gray-100 mt-9">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-3">
          <View className="flex-row items-center justify-center gap-10">
            <Icon name="arrow-back" color="white" size={20} />
            <Text className="text-lg font-semibold text-white">Completed Tasks Screen</Text>
          </View>
        </TouchableOpacity>
      </View>


      {/* Search Bar */}
      <View className="mx-4 mt-4 px-3 py-2.5 rounded-lg flex-row items-center shadow-sm bg-white">
        <Icon name="search" size={20} color="#9CA3AF" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Search"
          className="flex-1 text-base text-neutral-800"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      {/* Main Content */}
      <View className="mt-10 items-center">
        <Text className="text-2xl text-secondary font-bold">
          Completed Tasks Screen!
        </Text>
      </View>
    </View>
  );
};

export default CompletedTasks;
