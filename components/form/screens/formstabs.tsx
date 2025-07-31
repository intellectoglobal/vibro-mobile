import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

interface Draft {
  formId: string;
  submissionId?: string;
  formSubmissionId?: number;
  formValues: any;
  currentStageIndex: number;
  timestamp: string;
}

const DraftsForm: React.FC = () => {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch drafts from AsyncStorage
  const fetchDrafts = useCallback(async () => {
    try {
      setLoading(true);
      const keys = await AsyncStorage.getAllKeys();
      const draftKeys = keys.filter((key) => key.startsWith("draft_"));
      const draftItems = await AsyncStorage.multiGet(draftKeys);
      const parsedDrafts = draftItems
        .map(([_, value]) => (value ? JSON.parse(value) : null))
        .filter((draft) => draft !== null)
        .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      setDrafts(parsedDrafts);
    } catch (error: any) {
      console.error("Error fetching drafts:", error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  // Handle resuming a draft
  const handleResumeDraft = (draft: Draft) => {
    router.push({
      pathname: "/(app)/(tabs)/forms/multi-stage-form",
      params: {
        formId: draft.formId,
        formSubmissionId: draft.formSubmissionId || draft.submissionId,
      },
    });
  };

  // Render a preview of form values
  const renderFormValuesPreview = (formValues: any) => {
    const filledValues = Object.entries(formValues)
      .filter(([_, value]) => value !== undefined && value !== null && value !== "")
      .map(([key, value]) => `${key}: ${value}`)
      .slice(0, 3)
      .join(", ");
    return filledValues || "No values filled";
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={drafts}
        keyExtractor={(item) => `draft_${item.formId}_${item.formSubmissionId || item.submissionId || item.timestamp}`}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.draftItem}
            onPress={() => handleResumeDraft(item)}
          >
            <View style={styles.draftInfo}>
              <Text style={styles.draftTitle}>Form ID: {item.formId}</Text>
              <Text style={styles.draftTimestamp}>
                Saved: {new Date(item.timestamp).toLocaleString()}
              </Text>
              <Text style={styles.draftValues} numberOfLines={2}>
                Values: {renderFormValuesPreview(item.formValues)}
              </Text>
            </View>
            <MaterialIcons name="arrow-forward" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No drafts found</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  draftItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  draftInfo: {
    flex: 1,
    marginRight: 10,
  },
  draftTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  draftTimestamp: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  draftValues: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 20,
  },
});

export default DraftsForm;