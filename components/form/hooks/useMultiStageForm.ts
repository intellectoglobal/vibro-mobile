import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Stage } from "../types/formTypes";
import { generateValidationSchema } from "../utils/validationSchemas";

export const useMultiStageForm = (stages: Stage[] | any) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);

  const currentStage = stages[currentStageIndex];
  const isFirstStage = currentStageIndex === 0;
  const isLastStage = currentStageIndex === stages.length - 1;

  const validationSchema = generateValidationSchema(
    currentStage?.questions || []
  );

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    // reset,
    watch,
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const goToNextStage = () => {
    if (currentStageIndex < stages.length - 1) {
      setCurrentStageIndex(currentStageIndex + 1);
      if (!completedStages.includes(currentStageIndex)) {
        setCompletedStages([...completedStages, currentStageIndex]);
      }
    }
  };

  const goToPrevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  const onSubmit = (data: any) => {
    if (!isLastStage) {
      goToNextStage();
    } else {
      // Final submission logic
      console.log("Form submitted:", data);
      if (!completedStages.includes(currentStageIndex)) {
        setCompletedStages([...completedStages, currentStageIndex]);
      }
    }
  };

  return {
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
    goToNextStage,
    watch,
    setValue,
  };
};
