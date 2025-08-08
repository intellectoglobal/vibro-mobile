import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import AuditInfoSection from "../AuditInfoSection";
import AuditQuestionGroup from "../AuditQuestionGroup";
import CriticalItemsSection from "../CriticalItemsSection";
import FormProgress from "../form/FormProgress";
import { useAuditForm } from "../hooks/useAuditForm";
import PreviewSection from "../PreviewSection";

const AuditFormScreen = ({ route }: any) => {
  const formData = route.params.formData;
  const { control, handleSubmit, calculateGroupScore, isSubmitting } =
    useAuditForm(formData);

  return (
    <ScrollView style={styles.container}>
      {/* <FormProgress currentStep={1} totalSteps={4} /> */}

      <AuditInfoSection auditInfo={formData.audit_info} control={control} />

      {formData.audit_group.map((group: any) => (
        <AuditQuestionGroup
          key={group.id}
          group={group}
          control={control}
          calculateScore={() => calculateGroupScore(group.id)}
        />
      ))}

      <CriticalItemsSection
        hasCriticalItems={formData.audit_group.some((g: { questions: any[]; }) =>
          g.questions.some((q: any) => q.critical)
        )}
        control={control}
      />

      <PreviewSection
        formData={formData}
        control={control}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default AuditFormScreen;
