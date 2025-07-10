import { Header } from "@/components/Header";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FileList from "./ListItems/FileList";

const DATA = [
  { id: "1", name: "File 1" },
  { id: "2", name: "File 2" },
  { id: "3", name: "File 3" },
  { id: "4", name: "File 4" },
  { id: "5", name: "File 5" },
  { id: "6", name: "File 6" },
  { id: "7", name: "File 7" },
  { id: "8", name: "File 8" },
  { id: "9", name: "File 9" },
  { id: "10", name: "File 10" },
  { id: "11", name: "File 11" },
  { id: "12", name: "File 12" },
  { id: "13", name: "File 13" },
  { id: "14", name: "File 14" },
  { id: "15", name: "File 15" },
  { id: "16", name: "File 16" },
  { id: "17", name: "File 17" },
  { id: "18", name: "File 18" },
  { id: "19", name: "File 19" },
  { id: "20", name: "File 20" },
  { id: "21", name: "File 21" },
  { id: "22", name: "File 22" },
  { id: "23", name: "File 23" },
  { id: "24", name: "File 24" },
  { id: "25", name: "File 25" },
  { id: "26", name: "File 26" },
  { id: "27", name: "File 27" },
  { id: "28", name: "File 28" },
  { id: "29", name: "File 29" },
  { id: "30", name: "File 30" },
];

export default function FolderList() {
  const routeFormsFileList = () => {
    router.push({
      pathname: "/(tabs)/forms/multi-stage-form",
      // params: { folderName: "Documents" }, // Example parameter
    });
  };
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
          data={DATA}
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
