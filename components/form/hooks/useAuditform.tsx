import { fetchFormAssignments } from "@/Redux/actions/formAssignmentActions";
import { fetchFormReceived } from "@/Redux/actions/formReceivedActions";
import api from "@/services";
import { GETALLASSIGNEDSTAGESACCESSID, RECEIVED } from "@/services/constants";
import { RootState } from "@/store";
import { router } from "expo-router";
import { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Question, Stage, SubmissionsDetail } from "../types/formTypes";
import { generateValidationSchema } from "../utils/validationSchemas";
import Toast from "react-native-toast-message";

interface AuditScoreInfo {
  groupId: string;
  groupTitle?: string;
  maxScore: number;
  userScore: number;
  percentage: number;
  questions: Question[];
}

export const useAuditForm = (
  stages: Stage[] | any,
  setShowSendButton: any,
  setFormSubmissionId: any,
  submissionsDetail?: SubmissionsDetail,
  questions?: Question[]
) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const [selectedScores, setSelectedScores] = useState<Record<string, number>>(
    {}
  );

  // 1. Helper: Get max score for a single question
  const getMaxScoreForQuestion = (question: Question) => {
    if (!question.options || question.options.length === 0) return 0;
    return Math.max(...question.options.map((opt) => opt.score || 0));
  };

  // 2. Group questions and calculate scores
  const groupScores: AuditScoreInfo[] = useMemo(() => {
    const groupsMap: Record<string, AuditScoreInfo> = {};

    questions?.forEach((q) => {
      if (!q.audit_group) return; // ignore if no group

      const maxScore = getMaxScoreForQuestion(q);
      const userScore = selectedScores[q.id] || 0;

      if (!groupsMap[q.audit_group]) {
        groupsMap[q.audit_group] = {
          groupId: q.audit_group,
          // groupTitle: q.groupTitle || "Untitled Group",
          maxScore: 0,
          userScore: 0,
          percentage: 0,
          questions: [],
        };
      }

      groupsMap[q.audit_group].maxScore += maxScore;
      groupsMap[q.audit_group].userScore += userScore;
      groupsMap[q.audit_group].questions.push(q);
    });

    // Calculate percentages
    Object.values(groupsMap).forEach((group) => {
      group.percentage =
        group.maxScore > 0
          ? Math.round((group.userScore / group.maxScore) * 100)
          : 0;
    });

    return Object.values(groupsMap);
  }, [questions, selectedScores]);

  // 3. Form totals
  const formMaxScore = useMemo(
    () => groupScores.reduce((sum, g) => sum + g.maxScore, 0),
    [groupScores]
  );

  const formUserScore = useMemo(
    () => groupScores.reduce((sum, g) => sum + g.userScore, 0),
    [groupScores]
  );

  const formPercentage = formMaxScore
    ? Math.round((formUserScore / formMaxScore) * 100)
    : 0;

  // 4. Update user score when selecting an option
  const updateScore = (questionId: string, score: number) => {
    setSelectedScores((prev) => ({ ...prev, [questionId]: score }));
  };

  const assignments = useSelector(
    (state: RootState) => state.formAssignments.data
  );
  const receivedAssignment = useSelector(
    (state: RootState) => state.formReceived.data
  );
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const allQuestions = (stages || []).flatMap(
    (stage: any) => stage?.questions || []
  );

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

  const goToPrevStage = () => {
    if (currentStageIndex > 0) {
      setCurrentStageIndex(currentStageIndex - 1);
    }
  };

  const goToStage = (index: number) => {
    // console.log("stage index ::", index)
    if (index >= 0 && index < stages.length) {
      setCurrentStageIndex(index);
      // if (!completedStages.includes(index)) {
      //   setCompletedStages([...completedStages, index]);
      // }
    }
  };

  const getStageAssignUuid = async () => {
    const response = (await api.get(
      `${GETALLASSIGNEDSTAGESACCESSID}${user.id}/`
    )) as any;
    console.log("stage access  ::", response.data);
    dispatch(fetchFormAssignments(response.data));
  };
  const getReceivedStageAssignUuid = async () => {
    const response = (await api.get(`${RECEIVED}${user.id}/`)) as any;
    console.log("stage access  ::", response.data);
    dispatch(fetchFormReceived(response.data));
  };

  const onSubmit = async (data: any) => {
    setSubmitting(true);
    console.log("📤 Submitting form stage...");
    console.log("🔎 Form data:", data);

    try {
      const extractId = (val: any) =>
        typeof val === "object" && val !== null && "id" in val ? val.id : val;
      const sourceArray =
        currentStageIndex === 0 ? assignments : receivedAssignment;

      const stageAssignmentUuid = sourceArray?.find((a) =>
        currentStageIndex === 0
          ? a.stageId === currentStage?.id
          : a.stageId === currentStage?.id &&
            a.formSubmissionId === Number(submissionsDetail?.id)
      );

      const form = currentStage.form;
      const stageId = currentStage.id;
      const questions = currentStage.questions;

      const payload = {
        form,
        stage: stageId,
        stage_assignment_uuid: stageAssignmentUuid?.stageAssignmentUUID,
        form_submission_id: stageAssignmentUuid?.formSubmissionId,
        answers: [] as any[],
      };

      const handleAnswer = (meta: any, val: any) => {
        const answerValue =
          Array.isArray(val) &&
          ["dropdown", "checkboxes", "multiple_choice"].includes(
            meta.question_type
          )
            ? val.map(extractId).join("|")
            : String(extractId(val));

        const answer: any = {
          question_uuid: meta.question_uuid,
          question: meta.id,
          question_type: meta.question_type,
          answer: answerValue,
          stage: stageId,
          group: null,
          division: null,
          sub_division: null,
          location: null,
          user: null,
        };

        switch (meta.question_type) {
          case "division":
            answer.division = extractId(val);
            break;
          case "sub_division":
            answer.sub_division = extractId(val);
            break;
          case "location":
            answer.location = extractId(val);
            break;
          case "user":
            answer.user = extractId(val);
            break;
        }

        if (
          !payload.answers.some(
            (ans: any) => ans.question_uuid === meta.question_uuid
          )
        ) {
          payload.answers.push(answer);
          console.log("✅ Answer added:", answer);
        } else {
          console.log(
            `ℹ️ Skipping duplicate answer for question_uuid: ${meta.question_uuid}`
          );
        }
      };

      for (const [question_uuid, value] of Object.entries(data)) {
        let questionMeta = questions.find(
          (q: any) => q.question_uuid === question_uuid
        );

        // Not a direct question? Could be a logic question inside some parent
        if (!questionMeta) {
          for (const q of questions) {
            const logicQuestion = q?.logics
              ?.flatMap((logic: any) => logic.logic_questions)
              ?.find((lq: any) => lq.question_uuid === question_uuid);
            if (logicQuestion) {
              questionMeta = logicQuestion;
              break;
            }
          }
        }

        if (!questionMeta) {
          console.warn(`⚠️ Skipping unknown question_uuid: ${question_uuid}`);
          continue;
        }

        // Table questions
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
              handleAnswer(subMeta, subValue);
            }
          }
        } else {
          console.log(`📝 Processing question: ${questionMeta.question}`);
          handleAnswer(questionMeta, value);
        }
      }

      console.log("📦 Final Payload:", payload);

      if (!completedStages.includes(currentStageIndex)) {
        setCompletedStages([...completedStages, currentStageIndex]);
        console.log(`🟢 Marked stage ${currentStageIndex} as completed.`);
      }

      console.log("🚀 Sending POST request to /form/submit-answer/...");
      const res = await api.post("/form/stage/submit-answer/", payload);
      console.log("✅ API Response:", res.data?.message);

      setTimeout(() => {
        Toast.show({
          type: "success",
          text1: "Form submitted successfully",
          position: "top",
        });
      }, 2);
      if (res?.data?.next_stage_assigning_required) {
        console.log("🧭 Next stage assignment required.");
        setFormSubmissionId(res?.data?.form_submission_id);
        setShowSendButton(true);
        getStageAssignUuid();
        getReceivedStageAssignUuid();
      } else {
        console.log("✅ Form completed. Redirecting to form list...");
        router.replace("/(app)/(tabs)/forms");
      }
    } catch (error: any) {
      console.error("❌ Error in onSubmit:", error.message || error);
      Alert.alert(
        "Submission Failed",
        error?.error || "An error occurred. Please try again."
      );
      setSubmitting(false);
      throw error;
    } finally {
      console.log("🔚 Form submit process finished.");
      setSubmitting(false);
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
    watch,
    setValue,
    submitting,
    groupScores, // [{ groupId, groupTitle, maxScore, userScore, percentage, questions }]
    formMaxScore,
    formUserScore,
    formPercentage,
    updateScore,
    selectedScores,
  };
};
