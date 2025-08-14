import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LocationDropdown from "./LocationDropdown";
import { AuditInfo } from "./types/audit";

interface AuditInfoSectionProps {
  auditInfo: AuditInfo;
  control: any;
}

const AuditInfoSection: React.FC<AuditInfoSectionProps> = ({
  auditInfo,
  control,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{auditInfo.name}</Text>

      {auditInfo.questions.map((question) => {
        if (question.question_type === "location") {
          return (
            <LocationDropdown
              key={question.question_uuid}
              control={control}
              name={question.question_uuid}
              label={question.question}
              required={question.is_required}
              locations={["Location 1", "Location 2", "Location 3"]} // Replace with actual locations
            />
          );
        }
        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
});

export default AuditInfoSection;
