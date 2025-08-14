import { MaterialIcons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Question } from "../types/formTypes";

interface AuditAccordionProps {
  title: string;
  children: React.ReactNode;
  isCompleted?: boolean;
  questions?: Question[];
}

const AuditAccordion: React.FC<AuditAccordionProps> = ({
  title,
  children,
  isCompleted,
  questions = [],
}) => {
  const [expanded, setExpanded] = useState(true);

  // Calculate group audit score
  const totalMaxScore = useMemo(() => {
    return questions
      .filter((q) => q.question_type === "audit")
      .reduce((sum, q) => sum + (q.max_score || 0), 0);
  }, [questions]);

  // Here we'll assume '0' as obtained score for now
  const obtainedScore = 0; // This will come from answers

  const percentage =
    totalMaxScore > 0 ? (obtainedScore / totalMaxScore) * 100 : 0;

  const isAuditQuestion = questions
    .map((question) => question.question_type === "audit")
    .includes(true);
  console.log("isAuditQuestion ::", isAuditQuestion);

  return (
    <View style={styles.accordionItem}>
      {/* Header */}
      <TouchableOpacity
        style={[styles.header, styles.activeHeader]}
        onPress={() => setExpanded((prev) => !prev)}
      >
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>{title}</Text>
          {isCompleted && (
            <MaterialIcons
              name="check-circle"
              size={20}
              color="#fff"
              style={{ marginLeft: 6 }}
            />
          )}
        </View>
        <MaterialIcons
          name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Score Summary */}
      {isAuditQuestion && (
        <View style={styles.scoreContainer}>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreText}>Score Percentage :</Text>
            <Text style={styles.scoreText}> {percentage.toFixed(1)}%</Text>
          </View>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreText}>Score:</Text>
            <Text style={styles.scoreText}>{`0 / ${totalMaxScore}`}</Text>
          </View>
          <View style={styles.scoreTextContainer}>
            <Text style={styles.scoreText}>Critical Item(s) Failed:</Text>
            <Text style={styles.scoreText}> 0</Text>
          </View>
        </View>
      )}

      {/* Content */}
      {expanded && <View style={styles.content}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accordionItem: {
    marginBottom: 12,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#2196f3",
  },
  activeHeader: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  scoreContainer: {
    backgroundColor: "#f8f9fa",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  scoreTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  scoreText: {
    fontSize: 13,
    color: "#333",
    marginBottom: 3,
  },
  content: {
    padding: 12,
  },
});

export default AuditAccordion;
