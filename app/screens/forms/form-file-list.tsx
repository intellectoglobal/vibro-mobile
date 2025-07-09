import { Header } from "@/components/Header";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { FlatList, View } from "react-native";
import { FileList } from "./constant";

type FormsListProps = {
  navigation: NativeStackNavigationProp<any>;
};
const DATA = [
  { id: "1", name: "File 1" },
  { id: "2", name: "File 2" },
  { id: "3", name: "File 3" },
  { id: "4", name: "File 4" },
];
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
              <FileList items={item} onClick={handleFileList} />
            )}
          />
        </View>
      </View>
    </>
  );
}

//const styles = StyleSheet.create({});
