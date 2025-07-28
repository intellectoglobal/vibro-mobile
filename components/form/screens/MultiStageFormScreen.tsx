import api from "@/services";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Accordion from "../Accordion/Accordion";
import StageIndicator from "../Accordion/StageIndicator";
import FormField from "../FormFields/FormField";
import TableField from "../FormFields/TableField";
import { useMultiStageForm } from "../hooks/useMultiStageForm";
import { Stage } from "../types/formTypes";
import { RootState } from "@/Redux/reducer/rootReducer";
import { useSelector } from "react-redux";
import mockData from "../utils/mockData";
import { ASSIGN_API, USERS_LIST } from "@/services/constants";
import { MaterialIcons } from "@expo/vector-icons";
const MultiStageFormScreen = ({ formId }: any) => {
  const [stages, setStage] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user);
  const [showSendButton, setShowSendButton] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "groups">("users");
  const [formSubmissionId, setFormSubmissionId] = useState<number>(0)

  const [users, setUsers] = useState<any>([])
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const assignments = useSelector((state: RootState) => state.formAssignments.data);

  const getFormStages = async (formId: number) => {
    try {
      const response = await api.get(`/form/${formId}/`);
      if (response.data?.form_type === "audit") {
        setStage(response.data?.audit_group)
      } else {
        setStage(response.data?.stages);
      }
      // console.log("response ::", response.data);
    } catch (error: any) {
      console.error("Error Occurred in the getFormStages ::", error.message);
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      const users = await api.get(USERS_LIST)
      // console.log("users ::", users)
      setUsers(users.data)
    } catch (error: any) {
      console.log("Eroor Occured in the Getusers ::", error.message)
    }
  }

  const toggleSelection = (userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };



  const assingUser = async () => {
    const stageId = stages[currentStageIndex + 1].id
    let stageAssignmentUuid = assignments.filter((a) => a.stageId === currentStage?.id)
    console.log("stageID ::", stages[currentStageIndex + 1].id, "formSubmissionId ::", stageAssignmentUuid[0].formSubmissionId)
    const payload =
      activeTab === "users"
        ? { assign_type: "user", form: formId, ids: selectedUserIds, form_submission_id: stageAssignmentUuid[0].formSubmissionId, stage: stageId }
        : { assign_type: "group", form: formId, ids: selectedUserIds, form_submission_id: stageAssignmentUuid[0].formSubmissionId, stage: stageId };

    console.log("payload for Stage Assing ::", payload)

    try {
      await api.post(ASSIGN_API, payload);
      setShowAssignModal(false);
      setSelectedUserIds([]);
    } catch (error: any) {
      console.log("Error submitting assignment:", error.message);
    }
  };

  const filteredOptions = useMemo(() => {
    console.log("users ::", users)
    return users.filter((user: any) =>
      // console.log("user ::", user)
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    // return []
  }, [searchQuery, users]);

  useEffect(() => {
    getFormStages(Number(formId));
  }, [formId]);

  useEffect(() => {
    getUsers()
  }, [showSendButton])

  const {
    currentStage,
    currentStageIndex,
    isFirstStage,
    isLastStage,
    completedStages,
    control,
    errors,
    isValid,
    handleSubmit,
    onSubmit,
    goToPrevStage,
    // goToNextStage,
    goToStage
  } = useMultiStageForm(stages, setShowSendButton, setFormSubmissionId) as any;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.formContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stageIndicator}>
          <StageIndicator
            stages={stages}
            currentStageIndex={currentStageIndex}
            completedStages={completedStages}
            onStagePress={(index) => goToStage(index)}
          />
        </View>

        <Accordion
          title={currentStage.name}
          isCompleted={completedStages.includes(currentStageIndex)}
        >
          {currentStage.questions.map((question: any) => (
            <View key={question.id}>
              {question.question_type === "table" ? (
                <TableField
                  question={question}
                  control={control}
                  errors={errors}
                />
              ) : (
                <FormField
                  question={question}
                  control={control}
                  errors={errors}
                  name={question.question_uuid}
                />
              )}
            </View>
          ))}
        </Accordion>

        <View style={styles.buttonContainer}>
          {!isFirstStage && (
            <TouchableOpacity style={styles.button} onPress={goToPrevStage}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
          )}

          {showSendButton ? (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#FF9500" }]}
              onPress={() => setShowAssignModal(true)}
            >
              <Text style={styles.buttonText}>Send to Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={
                [
                  styles.button,
                  styles.nextButton,
                  !isValid && styles.disabledButton,
                ]
              }
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              <Text style={styles.buttonText}>
                {"Submit"}
              </Text>
            </TouchableOpacity>
          )
          }
        </View>
      </ScrollView >

      {showAssignModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {activeTab === "users" ? (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => {
                  const fullName = `${item.first_name} ${item.last_name}`;
                  const selected = selectedUserIds.includes(item.id);

                  return (
                    <TouchableOpacity
                      style={[styles.optionItem, selected && styles.selectedOptionItem]}
                      onPress={() => toggleSelection(item.id)}
                    >
                      <Text style={styles.optionText}>{fullName}</Text>
                      {selected && (
                        <MaterialIcons name="check" size={20} color="#007AFF" />
                      )}
                    </TouchableOpacity>
                  );
                }}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No options found</Text>
                  </View>
                }
                ListHeaderComponent={
                  <View>
                    {/* Tabs */}
                    <View style={styles.tabContainer}>
                      <TouchableOpacity
                        onPress={() => setActiveTab("users")}
                        style={[styles.tabButton, activeTab === "users" && styles.activeTab]}
                      >
                        <Text style={styles.tabText}>Users</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => setActiveTab("groups")}
                        style={[styles.tabButton]}
                      >
                        <Text style={styles.tabText}>Groups</Text>
                      </TouchableOpacity>
                    </View>

                    {/* Search Bar */}
                    <TextInput
                      style={styles.searchInput}
                      placeholder="Search..."
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  </View>
                }
                ListFooterComponent={
                  <View>
                    {/* Submit + Close Buttons */}
                    <TouchableOpacity
                      onPress={assingUser}
                      style={[styles.button, { backgroundColor: "#007AFF", marginTop: 10 }]}
                    >
                      <Text style={styles.buttonText}>Assign</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => setShowAssignModal(false)}
                      style={[styles.button, { backgroundColor: "#FF3B30", marginTop: 10 }]}
                    >
                      <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                  </View>
                }
              />
            ) : (
              <View style={{ flex: 1 }}>
                {/* Tabs (still needed in group view) */}
                <View style={styles.tabContainer}>
                  <TouchableOpacity
                    onPress={() => setActiveTab("users")}
                    style={[styles.tabButton]}
                  >
                    <Text style={styles.tabText}>Users</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setActiveTab("groups")}
                    style={[styles.tabButton, activeTab === "groups" && styles.activeTab]}
                  >
                    <Text style={styles.tabText}>Groups</Text>
                  </TouchableOpacity>
                </View>

                <Text style={{ padding: 10 }}>Group list goes here...</Text>

                {/* Submit + Close */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  style={[styles.button, { backgroundColor: "#007AFF", marginTop: 10 }]}
                >
                  <Text style={styles.buttonText}>Assign</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowAssignModal(false)}
                  style={[styles.button, { backgroundColor: "#FF3B30", marginTop: 10 }]}
                >
                  <Text style={styles.buttonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}


    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //padding: 16,
  },
  formContainer: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: "center",
  },
  nextButton: {
    backgroundColor: "#34C759",
  },
  disabledButton: {
    backgroundColor: "#C7C7CC",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  stageIndicator: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 6,
    padding: 10,
    margin: 0,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    height: 210
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomWidth: 2,
    borderColor: "transparent",
  },
  activeTab: {
    borderColor: "#007AFF",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "600",
  },
  optionItem: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOptionItem: {
    backgroundColor: "#F0F7FF",
  },
  optionText: {
    fontSize: 12,
    flex: 1,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginHorizontal: 16,
  },
  emptyContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default MultiStageFormScreen;
