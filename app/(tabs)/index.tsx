import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/home/home';

const Index = () => {

  return (
    <SafeAreaView className="flex-1 bg-neutral-50">
      <Home />
    </SafeAreaView>
  );
};

export default Index;