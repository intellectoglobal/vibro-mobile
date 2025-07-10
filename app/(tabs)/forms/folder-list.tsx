import { Header } from "@/components/Header";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FileList from "./ListItems/FileList";
import { useLocalSearchParams, useSearchParams } from "expo-router/build/hooks";
import axiosInstance from "@/utility/Services";
import { Form } from "./tabs-forms/new-form";

const DATA = [
  { id: "1", title: "File 1" },
  { id: "2", title: "File 2" },
  { id: "3", title: "File 3" },
  { id: "4", title: "File 4" },
  { id: "5", title: "File 5" },
  { id: "6", title: "File 6" },
  { id: "7", title: "File 7" },
  { id: "8", title: "File 8" },
  { id: "9", title: "File 9" },
  { id: "10", title: "File 10" },
  { id: "11", title: "File 11" },
  { id: "12", title: "File 12" },
  { id: "13", title: "File 13" },
  { id: "14", title: "File 14" },
  { id: "15", title: "File 15" },
  { id: "16", title: "File 16" },
  { id: "17", title: "File 17" },
  { id: "18", title: "File 18" },
  { id: "19", title: "File 19" },
  { id: "20", title: "File 20" },
  { id: "21", title: "File 21" },
  { id: "22", title: "File 22" },
  { id: "23", title: "File 23" },
  { id: "24", title: "File 24" },
  { id: "25", title: "File 25" },
  { id: "26", title: "File 26" },
  { id: "27", title: "File 27" },
  { id: "28", title: "File 28" },
  { id: "29", title: "File 29" },
  { id: "30", title: "File 30" },
];

export default function FolderList() {
  const { folderId, folderName } = useLocalSearchParams();
  const [forms, setForms] = useState<Form[]>([]);

  const getFolderFormsForUser = async () => {
    try {
      const response = await axiosInstance.get(
        `user/assigned-forms/${folderId}/`
      );
      console.log("Forms of the folder ::", response.data.forms);
      setForms(response.data.forms);
    } catch (error: any) {
      console.error("Error Occurred in the getOrgFolder ::", error.message);
    }
  };

  const routeFormsFileList = () => {
    router.push({
      pathname: "/(tabs)/forms/multi-stage-form",
      // params: { folderName: "Documents" }, // Example parameter
    });
  };

  useEffect(() => {
    getFolderFormsForUser();
  }, []);
  
  return (
    <>
      <Header
        title={"File List"}
        showBack
        onBackPress={() => {
          router.back();
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={forms}
          renderItem={({ item }) => (
            <FileList items={item} onClick={routeFormsFileList} />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  folderContent: {
    fontSize: 16,
    color: "#666",
  },
});
