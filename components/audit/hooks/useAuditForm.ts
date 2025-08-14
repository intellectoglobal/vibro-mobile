import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { AuditFormData, FormValues } from "../types/audit";
import { calculateGroupPercentage } from "../utils/calculations";

export const useAuditForm = (formData: AuditFormData) => {
  const { control, handleSubmit, watch, setValue } = useForm<FormValues>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const calculateGroupScore = useCallback(
    (groupId: number): number => {
      const group = formData.audit_group.find((g) => g.id === groupId);
      if (!group) return 0;

      return calculateGroupPercentage(group, watch());
    },
    [formData.audit_group, watch]
  );

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      // Submit logic here
      console.log("Form submitted:", data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    control,
    handleSubmit: handleSubmit(onSubmit),
    watch,
    setValue,
    calculateGroupScore,
    isSubmitting,
  };
};
