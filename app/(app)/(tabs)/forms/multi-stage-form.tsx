import { Header } from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import StepIndicator from "@/components/StepIndicator";
import { Stage } from "@/types/forms";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import StageForm from "../../../screens/forms";
import { stagesData } from "@/app/screens/forms/stageData";
import api from "@/services";

export default function MultiStageForm() {
  const { formTitle, formId } = useLocalSearchParams();
  const [stage, setStage] = useState<Stage[]>([]);
  console.log("forms Details ::", formTitle, formId);

  const getFormStages = async(formId: number) => {
    try {
      const response = await api.get(`form/${formId}/`)
      console.log("response ::", response.data.stages)
      setStage(response.data.stages)
    } catch(error:any) {
      console.error("Error Occurred in the getFormStages ::", error.message)
    }
  }

  useEffect(() => {
    getFormStages(Number(formId))
  },[formId])
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
        <View style={styles.header}>
          <StepIndicator steps={stage} currentStep={0} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SearchBar placeholder="Search..." />
        </View>
        <StageForm
          stages={stage}
          stageLen={stage.length}
          onSubmit={() => {}}
        />
        {/* Uncomment the FlatList when you have the FileList component ready */}
        {/* <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <FileList items={item} onClick={() => {}} />
          )}
        /> */}
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
});
