import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AuditFormData } from "./types/audit";

interface PreviewSectionProps {
  formData: AuditFormData;
  control: any;
  onSubmit: () => void;
  isSubmitting: boolean;
}

const PreviewSection: React.FC<PreviewSectionProps> = ({
  formData,
  onSubmit,
  isSubmitting,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Preview & Submit</Text>

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryTitle}>Form Summary</Text>
        <Text style={styles.summaryText}>Title: {formData.title}</Text>
        <Text style={styles.summaryText}>
          Required Pass Percentage: {formData.pass_percentage}%
        </Text>

        {formData.audit_group.map((group) => (
          <View key={group.id} style={styles.groupSummary}>
            <Text style={styles.groupTitle}>{group.name}</Text>
            <Text style={styles.groupScore}>
              Score: Calculated score would appear here
            </Text>
            <Text style={styles.groupStatus}>
              Status: Calculated status would appear here
            </Text>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          isSubmitting && styles.submitButtonDisabled,
        ]}
        onPress={onSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.submitButtonText}>
          {isSubmitting ? "Submitting..." : "Submit Audit"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  summaryContainer: {
    marginBottom: 20,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 8,
  },
  groupSummary: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 4,
  },
  groupScore: {
    fontSize: 14,
    color: "#555",
  },
  groupStatus: {
    fontSize: 14,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonDisabled: {
    backgroundColor: "#A0C3FF",
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default PreviewSection;
