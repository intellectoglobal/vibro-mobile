import Accordion from "@/components/Accordion";
import api from "@/services";
import { RECEIVED } from "@/services/constants";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Received, ReceivedData } from "@/types/received";
import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import FileList from "../ListItems/ReceivedListItems/FileList";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { fetchFormReceived } from "@/Redux/actions/formReceivedActions";

export default function ReceivedForm() {
  const user = useSelector((state: RootState) => state.user);
  const [receivedData, setReceivedData] = useState<ReceivedData[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const getReceivedForms = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${RECEIVED}${user.id}/`);
      const rawData = response.data;
      dispatch(fetchFormReceived(rawData));

      const grouped: { [formId: string]: ReceivedData } = {};

      rawData.forEach((item: any) => {
        // Skip if no form_submission_id
        if (!item.form_submission_id) return;

        const form = item.form;
        const formId = String(form.id);

        if (!grouped[formId]) {
          grouped[formId] = {
            id: formId,
            title: form.title,
            form_type: form.form_type,
            received: [],
          };
        }

        grouped[formId].received.push({
          id: String(item.form_submission_id),
          submission_initiated_on: form.created_at,
          submission_initiated_stage: item.stage_order,
          submission_initiated_by: form.created_by,
          is_completed: !item.is_form_submission_pending,
          completed_by: null,
          completed_on: null,

          is_form_submission_pending: item.is_form_submission_pending,
          is_stage_submission_pending: item.is_stage_submission_pending,
          stage_assignment_id: item.stage_assignment_id,
          stage_assignment_uuid: item.assignment_uuid,
          stage_id: item.stage_id,
          stage_name: item.stage_name,
          stage_order: item.stage_order,
          form_submission_id: item.form_submission_id,
        });
      });

      const finalData = Object.values(grouped);
      setReceivedData(finalData);
      setError(null);
    } catch (err: any) {
      console.log("Error in getReceivedForms", err);
      setError(err.message || "Failed to fetch received forms");
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await getReceivedForms();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    getReceivedForms();
  }, []);

  const routeFormsFileList = (formId: string, submissionId: string, stageId: string, ) => {
    router.push({
      pathname: "/(app)/(tabs)/forms/multi-stage-form",
      params: { formId, submissionId, stageId },
    });
  };

  const renderItem = ({ item }: { item: ReceivedData }) => {
    if (!item.received || item.received.length === 0) return null;
    return (
      <Accordion
        title={item.title}
        containerStyle={styles.accordionContainer}
        headerStyle={styles.accordionHeader}
        iconColor="#6200ee"
        expanded={false}
        onPress={(expanded) => console.log("Accordion expanded:", expanded)}
      >
        {item.received
          .filter(
            (received: Received) =>
              received.is_stage_submission_pending === true
          )
          .map(
            (received: Received) =>
                <FileList
                  key={received.form_submission_id}
                  items={received}
                  formId={item.id}
                  onClick={routeFormsFileList}
                />
          )}
      </Accordion>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" />
      ) : (
        <FlatList
          data={receivedData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListEmptyComponent={
            <Text style={styles.emptyText}>No received forms available.</Text>
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
