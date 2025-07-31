/* eslint-disable import/no-named-as-default-member */
import { RootState } from "@/Redux/reducer/rootReducer";
import api from "@/services";
import {
  ASSIGN_API,
  FORM,
  GETFORMSUBMISSIONDETAILS,
  USERS_LIST,
} from "@/services/constants";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
import { useSelector } from "react-redux";
import Accordion from "../Accordion/Accordion";
import StageIndicator from "../Accordion/StageIndicator";
import FormField from "../FormFields/FormField";
import TableField from "../FormFields/TableField";
import { useMultiStageForm } from "../hooks/useMultiStageForm";
import { Stage } from "../types/formTypes";
import mockData2 from "../utils/mockData2";

interface MultiStageFormScreenProps {
  formId: string;
  submissionId?: string;
}

interface User {
  phone: string;
  department_details: any;
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
}

const MultiStageFormScreen: React.FC<MultiStageFormScreenProps> = ({
  formId,
  submissionId,
}) => {
  const [stages, setStages] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSendButton, setShowSendButton] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"users" | "groups">("users");
  const [formSubmissionId, setFormSubmissionId] = useState<number>(0);
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<number[]>([]);

  const [searchQuery, setSearchQuery] = useState("");

  const user = useSelector((state: RootState) => state.user);
  const assignments = useSelector(
    (state: RootState) => state.formAssignments.data
  );
  const receivedAssignment = useSelector(
    (state: RootState) => state.formReceived.data
  );

  console.log("assignments ::", assignments);
  console.log("receivedAssignment ::", receivedAssignment);

  // Fetch form stages
  const getFormStages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(
        submissionId
          ? `${GETFORMSUBMISSIONDETAILS}${formId}/${submissionId}`
          : `${FORM}${formId}/`
      );
      const data = response.data;
      // console.log("stages ::", response.data);
      setStages(data.form_type === "audit" ? data.audit_group : data.stages);
    } catch (error: any) {
      setError("Failed to load form stages");
      console.error("Error in getFormStages:", error.message);
    } finally {
      setLoading(false);
    }
  }, [formId, submissionId]);

  // Fetch users
  const getUsers = useCallback(async () => {
    try {
      const response = await api.get(USERS_LIST);
      setUsers(response.data);
    } catch (error: any) {
      console.error("Error in getUsers:", error.message);
    }
  }, []);

  // Toggle user selection
  const toggleSelection = useCallback((userId: number) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  }, []);

  // Assign users or groups
  const assignUser = useCallback(async () => {
    console.log("assign user payload ::");
    if (!stages[currentStageIndex + 1]?.id) return;
    const stageId = stages[currentStageIndex + 1].id;
    const stageAssignment = assignments.find(
      (a) => a.stageId === currentStage?.id
    );

    const payload = {
      assign_type: activeTab,
      form: formId,
      ids: selectedUserIds,
      form_submission_id: stageAssignment?.formSubmissionId,
      stage: stageId,
    };
    console.log("assign user payload ::", payload);
    try {
      console.log("assign user payload ::", payload);
      const res = await api.post(ASSIGN_API, payload);
      console.log("assign user payload ::", payload);
      console.log("response ::", res.data);
      // setShowAssignModal(false);
      // setSelectedUserIds([]);
      // router.replace("/(app)/(tabs)/forms");
    } catch (error: any) {
      console.error("Error submitting assignment:", error.message);
    }
  }, [activeTab, formId, selectedUserIds, assignments, stages]);

  // Memoized filtered users
  const filteredOptions = useMemo(() => {
    return users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Fetch data on mount
  useEffect(() => {
    getFormStages();
    getUsers();
  }, [getFormStages]);

  // useEffect(() => {
  //   if (showSendButton) {
  //     getUsers();
  //   }
  // }, [showSendButton, getUsers]);

  // Form hook
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
    goToStage,
    visibleQuestions,
  } = useMultiStageForm(stages, setShowSendButton, setFormSubmissionId);
  const renderQuestion = (question: any) => {
    if (!visibleQuestions.has(question.question_uuid)) return null;

    return question.question_type === "table" ? (
      <TableField
        key={question.question_uuid}
        question={question}
        control={control}
        errors={errors}
        isCompleted={currentStage?.is_completed}
      />
    ) : (
      <FormField
        key={question.question_uuid}
        question={question}
        control={control}
        errors={errors}
        isCompleted={currentStage?.is_completed}
      />
    );
  };

  // Determine if submit button should be shown
  const shouldShowSubmitButton = useCallback(() => {
    if (submissionId) {
      return !stages[currentStageIndex]?.is_completed;
    }
    return currentStageIndex === 0;
  }, [submissionId, stages, currentStageIndex]);

  // Memoized completed by user
  const completedByUser = useMemo(() => {
    if (!stages[currentStageIndex]?.completed_by) return null;
    console.log(
      "stages[currentStageIndex]?.completed_by ::",
      stages[currentStageIndex]?.completed_by
    );
    const userId = stages[currentStageIndex]?.completed_by;
    return users.find((u) => u.id === userId);
  }, [stages, currentStageIndex, users]);

  console.log("completedByUser ::", completedByUser);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196f3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={getFormStages}>
          <Text style={styles.buttonText}>Retry</Text>
        </TouchableOpacity>
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
            onStagePress={goToStage}
          />
        </View>

        <Accordion
          title={currentStage.name}
          isCompleted={completedStages.includes(currentStageIndex)}
        >
          {currentStage.questions.map((question: any) => (
            <View key={question.question_uuid}>{renderQuestion(question)}</View>
          ))}
          {/* {currentStage.questions.map((question: any) => (
            <View key={question.id}>
              {question.question_type === "table" ? (
                <TableField
                  question={question}
                  control={control}
                  errors={errors}
                  isCompleted={stages[currentStageIndex]?.is_completed}
                />
              ) : (
                <FormField
                  question={question}
                  control={control}
                  errors={errors}
                  isCompleted={stages[currentStageIndex]?.is_completed}
                  name={question.question_uuid}
                />
              )}
            </View>
          ))} */}
        </Accordion>

        <View style={styles.buttonContainer}>
          {!completedByUser && !isFirstStage && (
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
            shouldShowSubmitButton() && (
              <TouchableOpacity
                style={[
                  styles.button,
                  styles.nextButton,
                  !isValid && styles.disabledButton,
                ]}
                onPress={handleSubmit(onSubmit)}
                disabled={!isValid}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
            )
          )}
        </View>
        {completedByUser && (
          <View style={styles.completedInfo}>
            <View style={styles.completedInfoRow}>
              <MaterialIcons
                name="person"
                size={20}
                color="#007AFF"
                style={styles.completedInfoIcon}
              />
              <Text style={styles.completedText}>
                Completed by:{" "}
                {`${completedByUser.username}, ${
                  completedByUser.department_details?.description || "N/A"
                }`}
              </Text>
            </View>
            <View style={styles.completedInfoRow}>
              <MaterialIcons
                name="event"
                size={20}
                color="#007AFF"
                style={styles.completedInfoIcon}
              />
              <Text style={styles.completedText}>
                Completed on:{" "}
                {new Date(
                  stages[currentStageIndex].completed_on ?? ""
                ).toLocaleString() || "N/A"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {showAssignModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.headerContainer}>
              <View style={styles.tabContainer}>
                <TouchableOpacity
                  onPress={() => setActiveTab("users")}
                  style={[
                    styles.tabButton,
                    activeTab === "users" && styles.activeTab,
                  ]}
                >
                  <Text style={styles.tabText}>Users</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setActiveTab("groups")}
                  style={[
                    styles.tabButton,
                    activeTab === "groups" && styles.activeTab,
                  ]}
                >
                  <Text style={styles.tabText}>Groups</Text>
                </TouchableOpacity>
              </View>

              {activeTab === "users" && (
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search..."
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              )}
            </View>

            {activeTab === "users" ? (
              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item.id.toString()}
                style={styles.list}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.optionItem,
                      selectedUserIds.includes(item.id) &&
                        styles.selectedOptionItem,
                    ]}
                    onPress={() => toggleSelection(item.id)}
                  >
                    <Text
                      style={styles.optionText}
                    >{`${item.first_name} ${item.last_name}`}</Text>
                    {selectedUserIds.includes(item.id) && (
                      <MaterialIcons name="check" size={20} color="#007AFF" />
                    )}
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No users found</Text>
                  </View>
                }
              />
            ) : (
              <View style={styles.groupListContainer}>
                <Text style={styles.placeholderText}>
                  Group list goes here...
                </Text>
              </View>
            )}

            <View style={styles.footerContainer}>
              <TouchableOpacity
                onPress={assignUser}
                style={styles.assignButton}
              >
                <Text style={styles.footerButtonText}>Assign</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowAssignModal(false)}
                style={styles.closeButton}
              >
                <Text style={styles.footerButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
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
    margin: 10,
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
    height: "70%",
  },
  headerContainer: {
    backgroundColor: "#fff",
    zIndex: 1,
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
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
    color: "#333",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    marginHorizontal: 10,
    fontSize: 14,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
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
    fontSize: 14,
    color: "#333",
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
    flex: 1,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  assignButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginHorizontal: 5,
  },
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  groupListContainer: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 14,
    color: "#999",
  },
  completedInfo: {
    // alignItems:"center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#F9FAFB",
    marginHorizontal: 5,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    // Shadow for Android
    elevation: 3,
    width: "98%",
  },
  completedInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  completedInfoIcon: {
    marginRight: 10,
  },
  completedText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    // flex: 1, // Ensure text takes available space
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
});

export default MultiStageFormScreen;
