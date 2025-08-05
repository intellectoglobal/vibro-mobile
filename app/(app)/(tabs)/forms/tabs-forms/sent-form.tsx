import Accordion from "@/components/Accordion";
import api from "@/services";
import { GETALLASSIGNFORMS, GETSENTFORMS } from "@/services/constants";
import { RootState } from "@/store";
import {SubmissionData } from "@/types/sent";
import React, { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, Text, View, RefreshControl, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import FileList from "../ListItems/SentListItems/FileList";
import { router } from "expo-router";

export default function SentForm() {
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [sentData, setSentData] = useState<SubmissionData[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const getSentForms = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${GETALLASSIGNFORMS}`);
      const forms = response.data.map((form: any) => form.id);

      const submissions = await api.get(`${GETSENTFORMS}${user.id}/submission-history/`);
      setSentData(submissions.data);
      setLoading(false)
    } catch (error: any) {
      console.log("Error in getSentForms", error);
    } 
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getSentForms();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getSentForms();
  }, []);

  const routeFormsFileList = (formId: any, submissionId: any) => {
    
    router.push({
      pathname: "/(app)/(tabs)/forms/multi-stage-form",
      params: { formId: formId, submissionId: submissionId },
    });
  };

  const renderItem = ({ item }: { item: SubmissionData }) => (
    <Accordion
      title={item.form.title}
      containerStyle={styles.accordionContainer}
      headerStyle={styles.accordionHeader}
      iconColor="#6200ee"
      expanded={false}
      onPress={(expanded) => console.log("Accordion expanded:", expanded)}
    >
      {item.submissions.map((submission) => (
        <FileList
          key={submission.form_submission_id}
          items={submission}
          formId={item.form.id}
          onClick={routeFormsFileList}
        />
      ))}
    </Accordion>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          data={sentData}
          keyExtractor={(item) => item.form.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No sent forms available.</Text>
          }
        />
      )}
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
  emptyText: {
    padding: 15,
    textAlign: "center",
    color: "gray",
    fontStyle: "italic",
  },
});
