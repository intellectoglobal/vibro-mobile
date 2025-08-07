import { AuditGroup, FormValues } from "../types/audit";

export const calculateGroupPercentage = (
  group: AuditGroup,
  formValues: FormValues
): number => {
  let totalScore = 0;
  let maxPossibleScore = 0;

  group.questions.forEach((question) => {
    if (question.question_type === "audit" && question.options.length > 0) {
      const selectedOptionValue = formValues[question.question_uuid];
      const selectedOption = question.options.find(
        (opt) => opt.option === selectedOptionValue
      );

      if (selectedOption) {
        totalScore += selectedOption.score;
      }

      const maxOptionScore = Math.max(
        ...question.options.map((opt) => opt.score),
        0
      );
      maxPossibleScore += maxOptionScore;
    }
  });

  if (maxPossibleScore === 0) return 0;

  return Math.round((totalScore / maxPossibleScore) * 100);
};

export const hasCriticalItemsFailed = (
  groups: AuditGroup[],
  formValues: FormValues
): boolean => {
  return groups.some((group) => {
    if (!group.pass_percentage) return false;

    const groupScore = calculateGroupPercentage(group, formValues);
    return groupScore < group.pass_percentage;
  });
};
