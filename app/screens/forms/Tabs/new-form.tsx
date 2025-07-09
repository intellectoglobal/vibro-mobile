import React from "react";
import { FlatList, View } from "react-native";

import Card from "@/components/Card";
import AccordionForm from "../accordion";
import { ALL_FORMS, FileList, FolderList, NavigationProps } from "../constant";

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
];

export default function NewForm({ navigation }: NavigationProps) {
  const handleFolderList = (params: any) => {
    navigation.navigate("file-list", params);
  };

  const handleFileList = (params: any) => {
    navigation.navigate("form-accordion", params);
  };
  return (
    <>
      <View className="bg-white shadow-lg rounded-lg mb-3">
        <AccordionForm title={"Folders"} expandedDefault={true}>
          <FlatList
            style={{ maxHeight: 100 }}
            data={DATA}
            renderItem={({ item }) => (
              <FolderList items={item} onClick={handleFolderList} />
            )}
          />
        </AccordionForm>
      </View>
      <View style={{ flex: 1 }}>
        <Card title={ALL_FORMS}>
          <FlatList
            data={DATA_FILE}
            renderItem={({ item }) => (
              <FileList items={item} onClick={handleFileList} />
            )}
          />
        </Card>
      </View>
    </>
  );
}
