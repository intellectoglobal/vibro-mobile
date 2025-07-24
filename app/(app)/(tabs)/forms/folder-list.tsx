/* eslint-disable import/no-named-as-default-member */
import { Header } from "@/components/Header";
import api from "@/services";
import { ASSIGNED_FOLDER_FORMS } from "@/services/constants";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import FileList from "./ListItems/FileList";
import { Form } from "./tabs-forms/new-form";

export default function FolderList() {
  const {
    folderId,
    //folderName
  } = useLocalSearchParams();
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const getFolderFormsForUser = async () => {
    try {
      const response = await api.get(`${ASSIGNED_FOLDER_FORMS}/${folderId}/`);
      setForms(response.data.forms);
    } catch (error: any) {
      console.error("Error Occurred in the getOrgFolder ::", error.message);
    } finally {
      setLoading(false);
    }
  };

  const routeFormsFileList = (form: any) => {
    router.push({
      pathname: "/(app)/(tabs)/forms/multi-stage-form",
      params: { formTitle: form.title, formId: form.id },
    });
  };

  useEffect(() => {
    getFolderFormsForUser();
  }, []);

  const refreshControl = async () => {
    setRefreshing(true);
    await getFolderFormsForUser();
    setRefreshing(false);
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
      {!loading ? (
        <View style={styles.container}>
          <FlatList
            data={forms}
            renderItem={({ item }) => (
              <FileList items={item} onClick={routeFormsFileList} />
            )}
            refreshing={refreshing}
            onRefresh={refreshControl}
          />
        </View>
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size={"large"} color="#2196f3" />
        </View>
      )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
