import Accordion from "@/components/Accordion";
import { ALL_FORMS, FOLDERS } from "@/constants/forms";
import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import FileList from "../ListItems/FileList";
import FolderList from "../ListItems/FolderList";

const DATA = [
  { id: "1", name: "Documents" },
  { id: "2", name: "Pictures" },
  { id: "3", name: "Music" },
  { id: "4", name: "Videos" },
];

const DATA_FILE = [
  { id: "1", name: "File 1" },
  { id: "2", name: "File 2" },
  { id: "3", name: "File 3" },
  { id: "4", name: "File 4" },
  { id: "5", name: "File 5" },
  { id: "6", name: "File 6" },
  { id: "7", name: "File 7" },
  { id: "8", name: "File 8" },
];

export default function NewForm() {
  const routeFormsFolder = () => {
    router.push({
      pathname: "/(tabs)/forms/folder-list",
      params: { folderName: "Documents" }, // Example parameter
    });
  };
  const routeFormsFileList = () => {
    router.push({
      pathname: "/(tabs)/forms/multi-stage-form",
      // params: { folderName: "Documents" }, // Example parameter
    });
  };
  return (
    <>
      <View style={styles.container}>
        <Accordion
          title={FOLDERS}
          containerStyle={styles.accordionContainer}
          headerStyle={styles.accordionHeader}
          titleStyle={styles.accordionTitle}
          iconColor="#6200ee"
          expanded={true}
          onPress={(expanded) => console.log("Accordion expanded:", expanded)}
        >
          <FlatList
            style={{ maxHeight: 125 }}
            data={DATA}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <FolderList items={item} onClick={routeFormsFolder} />
            )}
          />
        </Accordion>
        <View style={{ flex: 3, marginBottom: 35 }}>
          <Accordion
            title={ALL_FORMS}
            containerStyle={styles.accordionContainer}
            headerStyle={styles.accordionHeader}
            titleStyle={styles.accordionTitle}
            iconColor="#6200ee"
            expanded={true}
            onPress={(expanded) => console.log("Accordion expanded:", expanded)}
          >
            <FlatList
              data={DATA_FILE}
              contentContainerStyle={{ paddingBottom: 50 }}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <FileList items={item} onClick={routeFormsFileList} />
              )}
            />
          </Accordion>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    //backgroundColor: "#f5f5f5",
  },
  accordionContainer: {
    marginBottom: 10,
  },
  accordionHeader: {
    backgroundColor: "#e3f2fd",
  },
  accordionTitle: {
    color: "#6200ee",
    fontWeight: "bold",
  },
  contentText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
});
