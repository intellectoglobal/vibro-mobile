import { MultiStageFormProps } from "@/types/forms";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity } from "react-native";
import StageAccordion from "./StageAccordion";
import styles from "./styles";

const StageForm: React.FC<MultiStageFormProps> = ({
  stages,
  onSubmit,
  stageLen,
}) => {
  const [activeSections, setActiveSections] = useState<number[]>([]);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [enabledStages, setEnabledStages] = useState<number[]>([]);

  const methods = useForm();

//for prod 
  useEffect(() => {
    const initiallyEnabled = stages.map((stage) => stage.id); // Enable all stages initially or change logic if needed
    setEnabledStages(initiallyEnabled.length > 0 ? [initiallyEnabled[0]] : []);
  }, [stages]);
//for testing
  // useEffect(() => {
  //   const initiallyEnabled = stages.map((stage) => stage.id);
  //   setEnabledStages(initiallyEnabled); // Enables all stages for testing
  // }, [stages]);



  const updateEnabledStages = (completedStageId: number) => {
    const currentIndex = stages.findIndex((stage) => stage.id === completedStageId);
    const nextStage = stages[currentIndex + 1];
    if (nextStage) {
      setEnabledStages((prev) => [...new Set([...prev, nextStage.id])]);
    }
  };

  const toggleSection = (stageId: number) => {
    setActiveSections((prev) =>
      prev.includes(stageId) ? prev.filter((id) => id !== stageId) : [...prev, stageId]
    );
  };

  const handleStageComplete = async (stageId: number) => {
    setCompletedStages((prev) => [...new Set([...prev, stageId])]);
    updateEnabledStages(stageId);
    setActiveSections([]);
  };

  const handleFinalSubmit = (data: any) => {
    onSubmit(data);
    methods.reset();
    setCompletedStages([]);
    setEnabledStages(stages.length > 0 ? [stages[0].id] : []);
  };

  return (
    <FormProvider {...methods}>
      <ScrollView style={styles.container}>
        {stages.map((stage, index) => (
          <StageAccordion
            key={`stage-${stage.id}`} 
            stage={stage}
            index={index}
            isActive={activeSections.includes(stage.id)}
            // isActive={true}
            isEnabled={enabledStages.includes(stage.id)}
            isCompleted={completedStages.includes(stage.id)}
            isLastStage={index === stages.length - 1}
            onToggle={() => toggleSection(stage.id)}
            onCompleteStage={async () => handleStageComplete(stage.id)}
            stageLen={stageLen}
          />
        ))}

        {completedStages.length === stages.length && (
          <TouchableOpacity
            style={[styles.submitButton, styles.finalSubmitButton]}
            onPress={methods.handleSubmit(handleFinalSubmit)}
          >
            <Text style={styles.submitButtonText}>Submit All Data</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </FormProvider>
  );
};

export default StageForm;
