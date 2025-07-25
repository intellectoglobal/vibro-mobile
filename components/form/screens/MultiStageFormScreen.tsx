import api from "@/services";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
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
const MultiStageFormScreen = ({ formId }: any) => {
  const [stages, setStage] = useState<Stage[]>([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state: RootState) => state.user)
  console.log("user ::", user.id)
  const getFormStages = async (formId: number) => {
    try {
      const response = await api.get(`form/${formId}/`);
      setStage(response.data?.stages);
      console.log("response ::", response.data?.stages)
    } catch (error: any) {
      console.error("Error Occurred in the getFormStages ::", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFormStages(Number(formId));
  }, [formId]);

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
  } = useMultiStageForm(mockData) as any;

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
            stages={mockData}
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

          <TouchableOpacity
            style={[
              styles.button,
              styles.nextButton,
              !isValid && styles.disabledButton,
            ]}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          >
            <Text style={styles.buttonText}>
              {isLastStage ? "Submit" : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
});

export default MultiStageFormScreen;
