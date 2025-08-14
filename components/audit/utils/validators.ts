export const validateRequired = (value: string) => {
  if (!value || value.trim() === "") {
    return "This field is required";
  }
  return true;
};

export const validatePercentage = (value: string) => {
  if (!value) return "Percentage is required";
  const num = Number(value);
  if (isNaN(num)) return "Must be a valid number";
  if (num < 0 || num > 100) return "Must be between 0 and 100";
  return true;
};

export const validateAtLeastOneSelected = (value: string[]) => {
  if (!value || value.length === 0) {
    return "At least one option must be selected";
  }
  return true;
};

export const validateCriticalItems = (value: any, formValues: any) => {
  if (formValues.enableCriticalItems && !value) {
    return "Pass percentage is required when critical items are enabled";
  }
  return true;
};
