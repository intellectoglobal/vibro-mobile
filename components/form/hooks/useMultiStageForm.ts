import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Stage } from "../types/formTypes";
import { generateValidationSchema } from "../utils/validationSchemas";
import api from "@/services";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { router } from "expo-router";
import { fetchFormAssignments } from "@/Redux/actions/formAssignmentActions";
import { GETALLASSIGNEDSTAGESACCESSID, RECEIVED } from "@/services/constants";
import { useDispatch } from "react-redux";
import { Alert } from "react-native";
import { fetchFormReceived } from "@/Redux/actions/formReceivedActions";

export const useMultiStageForm = (stages: Stage[] | any, setShowSendButton: any, setFormSubmissionId: any) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const assignments = useSelector((state: RootState) => state.formAssignments.data);
  const receivedAssignment = useSelector((state: RootState) => state.formReceived.data);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

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
    console.log("stage index ::", index)
    if (index >= 0 && index < stages.length) {
      setCurrentStageIndex(index);
      // if (!completedStages.includes(index)) {
      //   setCompletedStages([...completedStages, index]);
      // }
    }
  };

  const getStageAssignUuid = async () => {
    const response = (await api.get(`${GETALLASSIGNEDSTAGESACCESSID}${user.id}/`)) as any;
    console.log("stage access  ::", response.data)
    dispatch(fetchFormAssignments(response.data));
  }
  const getReceivedStageAssignUuid = async () => {
    const response = (await api.get(`${RECEIVED}${user.id}/`)) as any;
    console.log("stage access  ::", response.data)
    dispatch(fetchFormReceived(response.data));
  }



  const onSubmit = async (data: any) => {
    console.log("📤 Submitting form stage...");
    console.log("🔎 Form data:", data);

    try {
      const extractId = (val: any) =>
        typeof val === "object" && val !== null && "id" in val ? val.id : val;
      console.log("assignments ::", assignments)

      const stageAssignmentUuid = (currentStageIndex === 0 ? assignments : receivedAssignment).filter(
        (a) => a.stageId === currentStage?.id
      );

      console.log("🔗 Matching assignment:", stageAssignmentUuid);

      const form = currentStage.form;
      const stageId = currentStage.id;
      const questions = currentStage.questions;

      const payload = {
        form,
        stage: stageId,
        stage_assignment_uuid: stageAssignmentUuid[0].stageAssignmentUUID,
        form_submission_id: stageAssignmentUuid[0].formSubmissionId,
        answers: [] as any[],
      };

      for (const [question_uuid, value] of Object.entries(data)) {
        const questionMeta = questions.find(
          (q: any) => q.question_uuid === question_uuid
        );
        if (!questionMeta) {
          console.warn(`⚠️ Skipping unknown question_uuid: ${question_uuid}`);
          continue;
        }

        if (questionMeta.question_type === "table" && Array.isArray(value)) {
          console.log(`📋 Processing table question: ${questionMeta.question}`);
          for (const row of value) {
            for (const [subQUuid, subValue] of Object.entries(row)) {
              const subMeta = questionMeta.sub_questions.find(
                (sq: any) => sq.question_uuid === subQUuid
              );
              if (!subMeta) {
                console.warn(`⚠️ Skipping unknown sub-question: ${subQUuid}`);
                continue;
              }

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
              console.log("✅ Sub-answer added:", subAnswer);
            }
          }
        } else {
          console.log(`📝 Processing question: ${questionMeta.question}`);

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
          console.log("✅ Answer added:", item);
        }
      }

      console.log("📦 Final Payload:", payload);

      if (!completedStages.includes(currentStageIndex)) {
        setCompletedStages([...completedStages, currentStageIndex]);
        console.log(`🟢 Marked stage ${currentStageIndex} as completed.`);
      }

      console.log("🚀 Sending POST request to /form/submit-answer/...");
      const res = await api.post("/form/submit-answer/", payload);

      console.log("✅ API Response:", res.data);

      if (res?.data?.next_stage_assigning_required) {
        console.log("🧭 Next stage assignment required.");
        setFormSubmissionId(res?.data?.form_submission_id);
        setShowSendButton(true);
        getStageAssignUuid();
        getReceivedStageAssignUuid()
      } else {
        console.log("✅ Form completed. Redirecting to form list...");
        router.replace("/(app)/(tabs)/forms");
      }
    } catch (error: any) {
      console.error("❌ Error in onSubmit:", error.message || error);
      Alert.alert("Submission Failed", error?.message || "An error occurred. Please try again.");
    } finally {
      console.log("🔚 Form submit process finished.");
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
    goToStage,
    visibleQuestions,
    activeModal,
  };
};
