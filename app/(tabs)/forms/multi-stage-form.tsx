import { Header } from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import StepIndicator from "@/components/StepIndicator";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import StageForm from "../../screens/forms/";
import stages from "./ListItems/mockData";
import { Stage } from "@/types/forms";
import axiosInstance from "@/utility/Services";
import { stagesData } from "@/app/screens/forms/stageData";

// const stagesData: Stage[] = [
//   {
//     name: "Personal Information",
//     id: 1,
//     // isStateEnable: true,
//     questions: [
//       {
//         id: 1,
//         question: "Full Name",
//         question_type: "short_answer",
//         // questionType: "text",
//         is_required: true,
//         question_uuid: "",
//         description: null,
//         critical: false,
//         formula: null,
//         question_sub_type: null,
//         question_hint: null,
//         order: 0,
//         require_live: false,
//         number_of_file_allowed: null,
//         min_value: null,
//         max_value: null,
//         max_score: null,
//         is_logic_question: false,
//         is_task_close_question: false,
//         is_audit_info_question: false,
//         is_other: false,
//         form: 0,
//         stage: 0,
//         audit_info: undefined,
//         audit_group: undefined,
//         parent_question: null,
//         sub_questions: [],
//         options: [],
//         logics: []
//       },
//       {
//         id: 2,
//         question: "Email Address",
//         question_type: "short_answer",
//         // input_type: "text",
//         is_required: true,
//         question_uuid: "",
//         description: null,
//         critical: false,
//         formula: null,
//         question_sub_type: null,
//         question_hint: null,
//         order: 0,
//         require_live: false,
//         number_of_file_allowed: null,
//         min_value: null,
//         max_value: null,
//         max_score: null,
//         is_logic_question: false,
//         is_task_close_question: false,
//         is_audit_info_question: false,
//         is_other: false,
//         form: 0,
//         stage: 0,
//         audit_info: undefined,
//         audit_group: undefined,
//         parent_question: null,
//         sub_questions: [],
//         options: [],
//         logics: []
//       },
//     ],
//     order: 0,
//     created_at: "",
//     updated_at: null,
//     form: 0
//   },
//   {
//     name: "Additional Details",
//     id: 2,
//     // isStateEnable: false,
//     questions: [
//       {
//         id: 1,
//         question: "About You",
//         question_type: "long_answer",
//         // input_type: "textarea",
//         is_required: true,
//         question_uuid: "",
//         description: null,
//         critical: false,
//         formula: null,
//         question_sub_type: null,
//         question_hint: null,
//         order: 0,
//         require_live: false,
//         number_of_file_allowed: null,
//         min_value: null,
//         max_value: null,
//         max_score: null,
//         is_logic_question: false,
//         is_task_close_question: false,
//         is_audit_info_question: false,
//         is_other: false,
//         form: 0,
//         stage: 0,
//         audit_info: undefined,
//         audit_group: undefined,
//         parent_question: null,
//         sub_questions: [],
//         options: [],
//         logics: []
//       },
//     ],
//     order: 0,
//     created_at: "",
//     updated_at: null,
//     form: 0
//   },
// ];


export default function MultiStageForm() {
  const { formTitle, formId } = useLocalSearchParams();
  const [stage, setStage] = useState<Stage[]>([]);
  console.log("forms Details ::", formTitle, formId);

  const getFormStages = async(formId: number) => {
    try {
      const response = await axiosInstance.get(`form/${69}/`)
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
          <StepIndicator steps={stages} currentStep={0} />
        </View>
        <View style={{ marginBottom: 16 }}>
          <SearchBar placeholder="Search..." />
        </View>
        <StageForm
          stages={stagesData}
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
