import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ScoreIndicatorProps {
  score: number;
  requiredScore?: number;
  passed?: boolean;
}

const ScoreIndicator: React.FC<ScoreIndicatorProps> = ({
  score,
  requiredScore,
  passed,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Score: {score}%</Text>
        {requiredScore !== undefined && (
          <Text style={styles.requiredText}>Required: {requiredScore}%</Text>
        )}
      </View>

      {requiredScore !== undefined && (
        <View
          style={[
            styles.statusIndicator,
            passed ? styles.passed : styles.failed,
          ]}
        >
          <Text style={styles.statusText}>{passed ? "PASSED" : "FAILED"}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scoreContainer: {
    flexDirection: "row",
  },
  scoreText: {
    fontSize: 16,
    fontWeight: "500",
    marginRight: 12,
  },
  requiredText: {
    fontSize: 16,
    color: "#666",
  },
  statusIndicator: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  passed: {
    backgroundColor: "#d4edda",
  },
  failed: {
    backgroundColor: "#f8d7da",
  },
  statusText: {
    fontWeight: "bold",
    color: "#155724",
  },
});

export default ScoreIndicator;
