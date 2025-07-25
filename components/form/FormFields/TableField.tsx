import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Question } from "../types/formTypes";
import FormField from "./FormField";

interface TableFieldProps {
  question: Question;
  control: any;
  errors: any;
}

const TableField: React.FC<TableFieldProps> = ({
  question,
  control,
  errors,
}) => {
  const minRows = question.min_value || 1;
  const maxRows = question.max_value || 10;

  const { fields, append, remove } = useFieldArray({
    control,
    name: question.question_uuid,
  });

  // Initialize with minimum required rows
  useEffect(() => {
    if (fields.length < minRows) {
      const rowsToAdd = minRows - fields.length;
      for (let i = 0; i < rowsToAdd; i++) {
        append(createEmptyRow(question.sub_questions));
      }
    }
  }, [fields.length, minRows, append, question.sub_questions]);

  const createEmptyRow = (subQuestions: Question[]) => {
    return subQuestions.reduce((acc, subQ) => {
      acc[subQ.question_uuid] = "";
      return acc;
    }, {} as any);
  };

  const addRow = () => {
    if (fields.length < maxRows) {
      append(createEmptyRow(question.sub_questions));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{question.question}</Text>
      {question.description && (
        <Text style={styles.description}>{question.description}</Text>
      )}

      {fields.map((item, index) => (
        <View key={item.id} style={styles.rowContainer}>
          <View style={styles.rowHeader}>
            <Text style={styles.rowTitle}>Row {index + 1}</Text>
            {fields.length > minRows && (
              <TouchableOpacity onPress={() => remove(index)}>
                <MaterialIcons name="delete" size={24} color="red" />
              </TouchableOpacity>
            )}
          </View>

          {question.sub_questions.map((subQuestion) => (
            <FormField
              key={`${subQuestion.id}-${index}`}
              question={subQuestion}
              control={control}
              errors={errors}
              name={`${question.question_uuid}.${index}.${subQuestion.question_uuid}`}
            />
          ))}
        </View>
      ))}

      {fields.length < maxRows && (
        <TouchableOpacity style={styles.addButton} onPress={addRow}>
          <Text style={styles.addButtonText}>+ Add Row</Text>
        </TouchableOpacity>
      )}

      {errors[question.question_uuid] && (
        <Text style={styles.errorText}>
          {errors[question.question_uuid].message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  label: {
    // fontSize: 14,
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 11,
    color: "#666",
    marginBottom: 10,
  },
  rowContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  rowTitle: {
    fontSize: 11,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#333",
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default TableField;
