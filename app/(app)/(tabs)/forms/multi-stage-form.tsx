import AuditFormWrapper from "@/components/audit/screen/AuditFormWrapper";
import AuditFormScreen from "@/components/form/screens/AudiFormScreen";
import MultiStageFormScreen from "@/components/form/screens/MultiStageFormScreen";
import { Header } from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function MultiStageForm() {
  const { formTitle, formId, submissionId, formType } =
    useLocalSearchParams() as any;
  console.log("formType ::", formType);
  return (
    <>
      {/* <Header
        title={"Forms Stage"}
        showBack
        onBackPress={() => {
          router.back();
        }}
      /> */}
      <View style={styles.container}>
        {formType == "audit" ? (
          <>
            <AuditFormScreen formId={formId} submissionId={submissionId} />
          </>
        ) : (
          <>
            <View style={{ marginBottom: 16 }}>
              <SearchBar placeholder="Search..." />
            </View>
            <MultiStageFormScreen formId={formId} submissionId={submissionId} />
          </>
        )}
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
