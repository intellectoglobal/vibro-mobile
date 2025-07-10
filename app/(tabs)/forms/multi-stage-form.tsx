import { Header } from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import StepIndicator from "@/components/StepIndicator";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";
import StageForm from "../../screens/forms/";
import stages from "./ListItems/mockData";

const stagesData = [
  {
    name: "Personal Information",
    order: 1,
    isStateEnable: true,
    questions: [
      {
        id: "name",
        question: "Full Name",
        question_type: "short_answer",
        input_type: "text",
        is_required: true,
        validation: {
          minLength: {
            value: 3,
            message: "Name must be at least 3 characters",
          },
        },
      },
      {
        id: "email",
        question: "Email Address",
        question_type: "short_answer",
        input_type: "text",
        is_required: true,
        validation: {
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Enter a valid email address",
          },
        },
      },
    ],
  },
  {
    name: "Additional Details",
    order: 2,
    isStateEnable: false,
    questions: [
      {
        id: "bio",
        question: "About You",
        question_type: "long_answer",
        input_type: "textarea",
        is_required: true,
      },
    ],
  },
];

export default function MultiStageForm() {
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
          stageLen={stagesData.length}
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
