import Accordion from "@/components/Accordion";
import { ALL_FORMS, FOLDERS } from "@/constants/forms";
import * as Api from "@/services";
import {
  FOLDER,
  GETALLASSIGNEDSTAGESACCESSID,
  GETALLASSIGNFORMS,
} from "@/services/constants";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FileList from "../ListItems/FileList";
import FolderList from "../ListItems/FolderList";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import FORMS from "./utility";
import { FormListItem } from "@/components/form/types/formTypes";
import { useDispatch } from "react-redux";
import { fetchFormAssignments } from "@/Redux/actions/formAssignmentActions"; // 👈 action creator

export const DATA = [
  { id: "1", name: "Documents" },
  { id: "2", name: "Pictures" },
  { id: "3", name: "Music" },
  { id: "4", name: "Videos" },
];

export const DATA_FILE = [
  { id: "1", title: "File 1" },
  { id: "2", title: "File 2" },
  { id: "3", title: "File 3" },
  { id: "4", title: "File 4" },
  { id: "5", title: "File 5" },
  { id: "6", title: "File 6" },
  { id: "7", title: "File 7" },
  { id: "8", title: "File 8" },
];

export interface Folder {
  id: string;
  name: string;
}
export interface Form {
  id: string;
  title: string;
}

export default function NewForm() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [forms, setForms] = useState<Form[]>(DATA_FILE);
  const [loading, setLoading] = useState(true);
  const [formRefreshing, setFormRefreshing] = useState(false);
  const [folderRefreshing, setFolderRefreshing] = useState(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  // console.log("user ::", user.id);

  const routeFormsFolder = (folder: any) => {
    router.push({
      pathname: "/(app)/(tabs)/forms/folder-list",
      params: { folderName: folder.name, folderId: folder.id },
    });
  };

  const routeFormsFileList = (form: any) => {
    router.push({
      pathname: "/(app)/(tabs)/forms/multi-stage-form",
      params: { formTitle: form.title, formId: form.id },
    });
  };

  const getOrgFolder = async () => {
    try {
      const response = (await Api.get(FOLDER)) as any;
      console.log("list of folders ::", response);
      setFolders(response || []);
    } catch (error: any) {
      // console.error("Error Occurred in the getOrgFolder ::", error);
    }
  };

  const getAllFormsForUser = async () => {
    try {
      const response = (await Api.get(`${GETALLASSIGNFORMS}`)) as any;
      console.log("list of forms ::", response);
      setForms(response);
    } catch (error: any) {
      console.error(
        "Error Occurred in the getAllFormsForUser ::",
        error.message
      );
    }
  };

  const getAllAssingedStageAccessId = async () => {
    try {
      console.log("userId ::", user.id)
      const response = (await Api.get(
        `${GETALLASSIGNEDSTAGESACCESSID}${user.id}/`
      )) as any;
      console.log("assinment uuidd ::", response)
      dispatch(fetchFormAssignments(response));
    } catch (error: any) {
      console.error(
        "Error Occurred in the getAllFormsForUser ::",
        error.message
      );
    }
  };

  const fetchData = async () => {
    try {
      await getOrgFolder();
      await getAllFormsForUser();
      await getAllAssingedStageAccessId();
    } catch (error: any) {
      console.error("Error while fetching data:", error.message);
    } finally {
      setLoading(false); // ✅ Important fix
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onFolderRefresh = useCallback(async () => {
    setFolderRefreshing(true);
    await getOrgFolder();
    await getAllAssingedStageAccessId();
    setFolderRefreshing(false);
  }, []);

  const onFormRefresh = useCallback(async () => {
    setFormRefreshing(true);
    await getAllFormsForUser();
    await getAllAssingedStageAccessId();
    setFormRefreshing(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  return (
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
          data={folders}
          keyExtractor={(item) => item.id}
          refreshing={folderRefreshing}
          onRefresh={onFolderRefresh}
          renderItem={({ item }) => (
            <FolderList items={item} onClick={routeFormsFolder} />
          )}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              You don’t have any assigned folders.
            </Text>
          }
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
            data={forms}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 50 }}
            refreshing={formRefreshing}
            onRefresh={onFormRefresh}
            renderItem={({ item }) => (
              <FileList items={item} onClick={routeFormsFileList} />
            )}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                You don’t have any assigned forms.
              </Text>
            }
          />
        </Accordion>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    padding: 15,
    textAlign: "center",
    color: "gray",
    fontStyle: "italic",
  },
});
