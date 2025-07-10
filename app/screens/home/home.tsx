import { Header } from "@/components/Header";
import React, { useState } from "react";
import { FlatList, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Cards from "./Cards";

type ItemData = {
  id: string;
  title: string;
};

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [data] = useState<ItemData[]>([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
  ]);

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header title={"Vibro"} />

      {/* Search Bar */}
      <View className="bg-white mx-4 mt-4 px-3 py-2.5 rounded-lg flex-row items-center shadow-sm">
        <Icon
          name="search"
          size={20}
          color="#9CA3AF"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
          className="flex-1 text-base text-neutral-800"
          placeholderTextColor="#9CA3AF"
        />
      </View>

      <View className="flex-1 px-4">
        <FlatList
          contentContainerStyle={{ paddingBottom: 30 }}
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <Cards title={item.title} />}
          ListEmptyComponent={
            <Text className="text-center text-neutral-400 mt-10">
              No items found
            </Text>
          }
        />
      </View>
    </>
  );
};

export default Home;
