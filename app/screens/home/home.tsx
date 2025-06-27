import { Header } from '@/componets/Header';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Cards from './Cards';

type ItemData = {
  id: string;
  title: string;
};


const Home = () => {

  const DATA: ItemData[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  return (
    <>
      <Header title={'Vibro'} />

      {/* Search Bar */}
      <View className="bg-white mx-4 mt-4 px-3 py-2.5 rounded-lg flex-row items-center shadow-sm">
        <Icon name="search" size={20} color="#9CA3AF" className="mr-2" />
        <Text className="text-neutral-400 text-base">Search</Text>
      </View>
      <View className='flex-1 px-4'>
        <FlatList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={DATA}
          renderItem={({ item, index, separators }) => (
            <Cards />
          )}
        />
      </View>

    </>
  );
};

export default Home;