import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import Card from "@/components/Card";
import AccordionForm from "../accordion";
import { ALL_FORMS, FileList, FolderList, NavigationProps } from "../constant";
import axiosInstance from "@/utility/Services";

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

interface Folder {
  id: string;
  name: string;
}
interface Form {
  id: string;
  title: string;
}

export default function NewForm({ navigation }: NavigationProps) {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [Forms, setForms] = useState<Form[]>([]);

  const handleFolderList = (params: any) => {
    console.log("Prams of the folder ::", params)
    navigation.navigate("file-list", params);
  };

  const handleFileList = (params: any) => {
    navigation.navigate("form-accordion", params);
  };

  const getOrgFolder = async () => {
    try {
      const response = await axiosInstance.get("/folder/");
      // console.log("folders ::", response.data);
      setFolders(response.data)
    } catch (error: any) {
      console.error("Error Occurred in the getOrgFolder ::", error.message);
    }
  };

  const getFolderLessFormsForUser = async () => {
    try {
      const response = await axiosInstance.get("/form/form-details/");
      // console.log("Forms ::", response.data);
      setForms(response.data)
    } catch (error: any) {
      console.error("Error Occurred in the getOrgFolder ::", error.message);
    }
  };

  useEffect(() => {
    getOrgFolder();
    getFolderLessFormsForUser()
  }, []);

  return (
    <>
      <View className="bg-white shadow-lg rounded-lg mb-3">
        <AccordionForm title={"Folders"} expandedDefault={true}>
          <FlatList
            style={{ maxHeight: 250 }}
            data={folders}
            renderItem={({ item }) => (
              <FolderList items={item} onClick={handleFolderList} />
            )}
          />
        </AccordionForm>
      </View>
      <View style={{ flex: 1 }}>
        <Card title={ALL_FORMS}>
          <FlatList
            data={Forms}
            renderItem={({ item }) => (
              <FileList items={item} onClick={handleFileList} />
            )}
          />
        </Card>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  accordionStyle : {
    height: 400
  }
})
