import MultiStageFormScreen from "@/components/form/screens/MultiStageFormScreen";
import { Header } from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import api from "@/services";
import { Stage } from "@/types/forms";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function MultiStageForm() {
  const { formTitle, formId } = useLocalSearchParams();
  const [stages, setStage] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("forms Details ::", formTitle, formId);

  const getFormStages = async (formId: number) => {
    try {
      const response = await api.get(`form/${formId}/`);
      console.log("response ::", response.data.stages);
      setStage(response.data?.stages);
    } catch (error: any) {
      console.error("Error Occurred in the getFormStages ::", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFormStages(Number(formId));
  }, [formId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  return (
    <>
      <Header
        title={"Forms Stage"}
        showBack
        onBackPress={() => {
          router.back();
        }}
      />
      <View style={styles.container}>
        {/* <View style={styles.header}>
          <StepIndicator steps={stage} currentStep={0} />
        </View> */}
        <View style={{ marginBottom: 16 }}>
          <SearchBar placeholder="Search..." />
        </View>
        {stages?.length > 0 && !loading && (
          <MultiStageFormScreen stages={stages} />
        )}
        {/* <StageForm stages={stage} stageLen={stage.length} onSubmit={() => {}} /> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // margin: 10,
    // backgroundColor: "#fff",
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
