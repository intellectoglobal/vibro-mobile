import { Header } from "@/components/Header";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { FileList } from "./constant";
import axiosInstance from "@/utility/Services";
import { useSearchParams } from "expo-router/build/hooks";
import { RouteProp } from "@react-navigation/native";

export type Folder = {
  id: number;
  name: string;
  description: string;
  created_at: string;
  updated_at: string | null;
};


type RootStackParamList = {
  "file-list": Folder;
  "form-accordion" : any
};

type FormsListProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, "file-list">;
  route: RouteProp<RootStackParamList, "file-list">;
};

const DATA = [
  { id: "1", title: "File 1" },
  { id: "2", title: "File 2" },
  { id: "3", title: "File 3" },
  { id: "4", title: "File 4" },
];

interface Form {
  id: string;
  title: string;
}

export default function FormFileList({ navigation, route }: FormsListProps) {

  const {id} = route.params
  console.log("File_params ::", id)
  const [forms, setForms] = useState<Form[]>([]);

  const getFolderLessFormsForUser = async () => {
    try {
      const response = await axiosInstance.get(`user/assigned-forms/${id}/`);
      console.log("Forms of the folder ::", response.data.forms);
      setForms(response.data.forms);
    } catch (error: any) {
      console.error("Error Occurred in the getOrgFolder ::", error.message);
    }
  };

  const handleFileList = (params: any) => {
    navigation.navigate("form-accordion", params);
  };

  useEffect(() => {
    getFolderLessFormsForUser();
  }, []);

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
            data={forms}
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
