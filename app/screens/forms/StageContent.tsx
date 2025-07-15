import { Stage } from "@/types/forms"; // Adjust the import path as necessary
import React from "react";
import { useFormContext } from "react-hook-form";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import FieldRenderer from "./FieldRenderer";
import styles from "./styles";

interface StageContentProps {
  stage: Stage;
  isEnabled: boolean;
  isLastStage: boolean;
  onCompleteStage: () => Promise<void>;
}

const StageContent: React.FC<StageContentProps> = ({
  stage,
  isEnabled,
  isLastStage,
  onCompleteStage,
}) => {
  const {
    trigger,
    control,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleStageSubmit = async () => {
    const fieldNames = stage.questions.map(
      (q) => `stage-${stage.id}-${q.id}`
    );

    const isValid = await trigger(fieldNames);

    if (isValid) {
      const values = getValues();
      console.log("Stage values:", values);
      await onCompleteStage();
      Alert.alert("Success", `Stage ${stage.id} completed!`);
    }
  };

  if (!isEnabled) {
    return (
      <View style={styles.disabledContent}>
        <Text>Complete previous stages to unlock this section.</Text>
      </View>
    );
  }

  return (
    <View style={styles.content}>
      {stage.questions.map((question) => (
        <FieldRenderer
          key={`${stage.id}-${question.id}`}
          question={question}
          stageOrder={stage.id}
          isEnabled={isEnabled}
          control={control}
          errors={errors}
        />
      ))}

      <TouchableOpacity style={styles.submitButton} onPress={handleStageSubmit}>
        <Text style={styles.submitButtonText}>
          {isLastStage ? "Submit All" : `Complete Stage ${stage.id}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default StageContent;
