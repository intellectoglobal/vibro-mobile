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

  useEffect(() => {
    const initiallyEnabled = stages
      .filter((stage) => stage.isStateEnable)
      .map((stage) => stage.order - 1);
    setEnabledStages(initiallyEnabled);
  }, [stages]);

  const updateEnabledStages = (completedStageOrder: number) => {
    const nextStageIndex = stages.findIndex(
      (stage) => stage.order === completedStageOrder + 1
    );
    if (nextStageIndex !== -1) {
      setEnabledStages((prev) => [...prev, nextStageIndex]);
    }
  };

  const toggleSection = (index: number) => {
    setActiveSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleStageComplete = async (stageOrder: number) => {
    setCompletedStages((prev) => [...prev, stageOrder - 1]);
    updateEnabledStages(stageOrder);
    setActiveSections([]);
  };

  const handleFinalSubmit = (data: any) => {
    onSubmit(data);
    methods.reset();
    setCompletedStages([]);
    setEnabledStages([0]);
  };

  return (
    <FormProvider {...methods}>
      <ScrollView style={styles.container}>
        {stages.map((stage, index) => (
          <StageAccordion
            key={`stage-${index}`}
            stage={stage}
            index={index}
            isActive={activeSections.includes(index)}
            isEnabled={enabledStages.includes(index)}
            isCompleted={completedStages.includes(index)}
            isLastStage={index === stages.length - 1}
            onToggle={toggleSection}
            onCompleteStage={async () => handleStageComplete(stage.order)}
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
