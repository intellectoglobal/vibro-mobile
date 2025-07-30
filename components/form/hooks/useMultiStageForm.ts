import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Stage } from "../types/formTypes";
import { generateValidationSchema } from "../utils/validationSchemas";

export const useMultiStageForm = (stages: Stage[] | any) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [visibleQuestions, setVisibleQuestions] = useState<Set<string>>(
    new Set()
  );
  const [activeModal, setActiveModal] = useState<any>(null);

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
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    // resolver: yupResolver(validationSchema),
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

  // Initialize visible questions
  useEffect(() => {
    const initialVisible = new Set<string>();
    currentStage?.questions?.forEach((question: any) => {
      initialVisible.add(question.question_uuid);
    });
    setVisibleQuestions(initialVisible);
  }, [currentStage]);

  // Watch for changes to evaluate logic
  useEffect(() => {
    const subscription = watch((formValues) => {
      const newVisible = new Set(visibleQuestions);
      let hasChanges = false;

      currentStage?.questions?.forEach((question: any) => {
        // Evaluate logics for each question
        question.logics?.forEach((logic: any) => {
          const shouldTrigger = evaluateLogic(logic, formValues);

          if (shouldTrigger) {
            // Show follow-up questions
            logic.logic_questions?.forEach((logicQuestion: any) => {
              if (!newVisible.has(logicQuestion.question_uuid)) {
                newVisible.add(logicQuestion.question_uuid);
                hasChanges = true;
              }
            });
          } else {
            // Hide follow-up questions if logic no longer applies
            logic.logic_questions?.forEach((logicQuestion: any) => {
              if (newVisible.has(logicQuestion.question_uuid)) {
                newVisible.delete(logicQuestion.question_uuid);
                hasChanges = true;
              }
            });
          }
        });
      });

      if (hasChanges) {
        setVisibleQuestions(newVisible);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, currentStage, visibleQuestions]);

  const evaluateLogic = (logic: any, formValues: any): boolean => {
    return logic.logic_questions.every((logicQuestion: any) => {
      const answer = formValues[logicQuestion.question_uuid];
      console.log("answeranswer", answer);
      if (answer === undefined || answer === null) return false;

      switch (logic.logic_type) {
        case "is":
          return String(answer) === String(logic.logic_value);
        case "contains":
          return String(answer).includes(String(logic.logic_value));
        case "greater_than":
          return Number(answer) > Number(logic.logic_value);
        case "less_than":
          return Number(answer) < Number(logic.logic_value);
        default:
          return false;
      }
    });
  };

  const goToPrevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  const goToStage = (index: number) => {
    console.log("stage index ::", index);
    if (index >= 0 && index < stages.length) {
      setCurrentStageIndex(index);
      // if (!completedStages.includes(index)) {
      //   setCompletedStages([...completedStages, index]);
      // }
    }
  };

  const onSubmit = (data: any) => {
    const extractId = (val: any) =>
      typeof val === "object" && val !== null && "id" in val ? val.id : val;

    const Form = currentStage.form;
    const stageId = currentStage.id;
    const questions = currentStage.questions;

    const payload = {
      Form,
      answers: [] as any[],
    };

    for (const [question_uuid, value] of Object.entries(data)) {
      const questionMeta = questions.find(
        (q: any) => q.question_uuid === question_uuid
      );
      if (!questionMeta) continue;

      // === 🧩 TABLE QUESTION HANDLING ===
      if (questionMeta.question_type === "table" && Array.isArray(value)) {
        for (const row of value) {
          for (const [subQUuid, subValue] of Object.entries(row)) {
            const subMeta = questionMeta.sub_questions.find(
              (sq: any) => sq.question_uuid === subQUuid
            );
            if (!subMeta) continue;

            const answerValue =
              Array.isArray(subValue) &&
              ["dropdown", "checkboxes", "multiple_choice"].includes(
                subMeta.question_type
              )
                ? subValue.map(extractId).join("|")
                : String(extractId(subValue));

            const subAnswer: any = {
              question: subMeta.id,
              question_uuid: subQUuid,
              question_type: subMeta.question_type,
              answer: answerValue,
              stage: stageId,
              group: null,
              division: null,
              sub_division: null,
              location: null,
              user: null,
            };

            // Assign IDs to their respective fields
            switch (subMeta.question_type) {
              case "division":
                subAnswer.division = extractId(subValue);
                break;
              case "sub_division":
                subAnswer.sub_division = extractId(subValue);
                break;
              case "location":
                subAnswer.location = extractId(subValue);
                break;
              case "user":
                subAnswer.user = extractId(subValue);
                break;
            }

            payload.answers.push(subAnswer);
          }
        }
      }

      // === 🧩 NORMAL QUESTION HANDLING ===
      else {
        const answerValue =
          Array.isArray(value) &&
          ["dropdown", "checkboxes", "multiple_choice"].includes(
            questionMeta.question_type
          )
            ? value.map(extractId).join("|")
            : String(extractId(value));

        const item: any = {
          question_uuid,
          question: questionMeta.id,
          question_type: questionMeta.question_type,
          answer: answerValue,
          stage: stageId,
          group: null,
          division: null,
          sub_division: null,
          location: null,
          user: null,
        };

        switch (questionMeta.question_type) {
          case "division":
            item.division = extractId(value);
            break;
          case "sub_division":
            item.sub_division = extractId(value);
            break;
          case "location":
            item.location = extractId(value);
            break;
          case "user":
            item.user = extractId(value);
            break;
        }

        payload.answers.push(item);
      }
    }
    // goToNextStage();

    console.log("📦 Final Flat Payload:", payload);

    if (!completedStages.includes(currentStageIndex)) {
      setCompletedStages([...completedStages, currentStageIndex]);
    }

    // 👉 Call your form submission API
    // submitForm(payload);

    // const res = api.post("/form/submit-answer/", payload)
    // console.log("response ::", res)
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
    goToStage,
    visibleQuestions,
    activeModal,
  };
};
