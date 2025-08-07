import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AuditQuestionItem from "./AuditQuestionItem";
import ScoreIndicator from "./ScoreIndicator";
import { AuditGroup } from "./types/audit";

interface AuditQuestionGroupProps {
  group: AuditGroup;
  control: any;
  calculateScore: () => number;
}

const AuditQuestionGroup: React.FC<AuditQuestionGroupProps> = ({
  group,
  control,
  calculateScore,
}) => {
  const score = calculateScore();
  const passed = group.pass_percentage ? score >= group.pass_percentage : true;

  return (
    <View style={styles.container}>
      <Text style={styles.groupTitle}>{group.name}</Text>

      {group.questions.map((question) => (
        <AuditQuestionItem
          key={question.question_uuid}
          question={question}
          control={control}
        />
      ))}

      <ScoreIndicator
        score={score}
        requiredScore={group.pass_percentage}
        passed={passed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  groupTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default AuditQuestionGroup;
