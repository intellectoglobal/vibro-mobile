import { Question } from "@/types/forms";

const getValidationRules = (question: Question) => {
  const rules: Record<string, any> = {};

  // Required validation
  if (question.is_required) {
    rules.required = {
      value: true,
      message:
        question?.validation?.requiredMessage || "This field is required",
    };
  }

  // Pattern validation (for emails, phone numbers, etc.)
  if (question.validation?.pattern) {
    rules.pattern = {
      value: question.validation.pattern.value,
      message: question.validation.pattern.message,
    };
  }

  // Minimum length validation
  if (question.validation?.minLength) {
    rules.minLength = {
      value: question.validation.minLength.value,
      message:
        question.validation.minLength.message ||
        `Must be at least ${question.validation.minLength.value} characters`,
    };
  }

  // Maximum length validation
  if (question.validation?.maxLength) {
    rules.maxLength = {
      value: question.validation.maxLength.value,
      message:
        question.validation.maxLength.message ||
        `Cannot exceed ${question.validation.maxLength.value} characters`,
    };
  }

  // Custom validation function
  if (question.validation?.custom) {
    rules.validate = question.validation.custom;
  }

  return rules;
};

export default getValidationRules;
