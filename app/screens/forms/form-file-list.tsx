import { Header } from "@/components/Header";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import FeatherIcon from "react-native-vector-icons/Feather";
import SimpleLineIconsIcon from "react-native-vector-icons/SimpleLineIcons";

type FormsListProps = {
  navigation: NativeStackNavigationProp<any>;
};

interface ItemType {
  id: string;
  name: string;
}

interface ItemsProps {
  items: ItemType;
  onClick?: (id: string) => void;
}

const DATA = [
  { id: "1", name: "File 1" },
  { id: "2", name: "File 2" },
  { id: "3", name: "File 3" },
  { id: "4", name: "File 4" },
];

const Item = (props: ItemsProps) => (
  <TouchableOpacity
    onPress={() => {
      props.onClick?.(props.items as any);
    }}
    className="flex-row items-center justify-between pt-4 pb-4 border-b border-[#D3D3D3]"
  >
    <View className="flex-row items-center">
      <FeatherIcon name="file-text" size={24} color="#6b7280" />
      <Text className="text-base text-gray-800 pl-2">{props.items.name}</Text>
    </View>
    <SimpleLineIconsIcon name="arrow-right" size={22} color="#6b7280" />
  </TouchableOpacity>
);

export default function FormFileList({ navigation }: FormsListProps) {
  const handleFileList = (params: any) => {
    navigation.navigate("form-accordion", params);
  };
  return (
    <>
      <Header
        title={"File List"}
        showBack
        onBackPress={() => {
          navigation?.goBack();
        }}
      />
      <View className="flex-1 items-center rounded-lg bg-white m-2 shadow-lg">
        <View style={{ width: "100%", padding: 10 }}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <Item items={item} onClick={handleFileList} />
            )}
          />
        </View>
      </View>
    </>
  );
}

//const styles = StyleSheet.create({});
