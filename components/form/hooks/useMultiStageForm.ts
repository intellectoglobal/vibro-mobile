import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Stage } from "../types/formTypes";
import { generateValidationSchema } from "../utils/validationSchemas";
import api from "@/services";
import uuid from 'react-native-uuid';
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { router } from "expo-router";
import { fetchFormAssignments } from "@/Redux/actions/formAssignmentActions";
import { ASSIGNED_FOLDER_FORMS } from "@/services/constants";
import { useDispatch } from "react-redux";

export const useMultiStageForm = (stages: Stage[] | any, setShowSendButton: any, setFormSubmissionId: any) => {
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const assignments = useSelector((state: RootState) => state.formAssignments.data);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);


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
    console.log("stage index ::", index)
    if (index >= 0 && index < stages.length) {
      setCurrentStageIndex(index);
      // if (!completedStages.includes(index)) {
      //   setCompletedStages([...completedStages, index]);
      // }
    }
  };

  const getStageAssingUuid = async () => {
    const response = (await api.get(`${ASSIGNED_FOLDER_FORMS}${user.id}/`)) as any;
    console.log("stage access  ::", response.data)
    dispatch(fetchFormAssignments(response.data));
  }



  const onSubmit = async (data: any) => {
    // console.log("cuurent uuids ::", assignments)
    const extractId = (val: any) =>
      typeof val === "object" && val !== null && "id" in val ? val.id : val;

    let stageAssignmentUuid = assignments.filter((a) => a.stageId === currentStage?.id)
    // console.log("stageAssignmentUuid ::", stageAssignmentUuid)

    const form = currentStage.form;
    const stageId = currentStage.id;
    const questions = currentStage.questions;

    const payload = {
      form,
      stage: currentStage?.id,
      stage_assignment_uuid: stageAssignmentUuid[0].stageAssignmentUUID,
      form_submission_id: stageAssignmentUuid[0].formSubmissionId,
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
                ["dropdown", "checkboxes", "multiple_choice"].includes(subMeta.question_type)
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
            ["dropdown", "checkboxes", "multiple_choice"].includes(questionMeta.question_type)
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

    // console.log("📦 Final Flat Payload:", payload);

    if (!completedStages.includes(currentStageIndex)) {
      setCompletedStages([...completedStages, currentStageIndex]);
    }

    // 👉 Call your form submission API
    // submitForm(payload);

    await api.post("/form/submit-answer/", payload).then((res: any) => {
      console.log("response ::", res.data)
      if (res?.data?.next_stage_assigning_required) {
        setFormSubmissionId(res?.data?.form_submission_id)
        setShowSendButton(true); // show "Send to Next" button
        getStageAssingUuid()
      } else {
        router.replace("/(app)/(tabs)/forms"); // go back to form list
      }
    }).catch((error: any) => {
      console.log("erorr Occured in the Onsubmit ::", error.message)
    })

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
    goToStage,
  };
};
