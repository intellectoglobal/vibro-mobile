// src/components/FormFields/FormulaField.tsx
import React, { useEffect } from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Question } from "../types/formTypes";

interface FormulaFieldProps {
  question: Question;
  control: any;
  errors: any;
  name?: string;
  allValues: any;
  evaluateFormula: (formula: string, values: any) => string;
  setValue: any;
  isCompleted?: boolean;
}

const FormulaField: React.FC<FormulaFieldProps> = ({
  question,
  control,
  errors,
  name = question.question_uuid,
  allValues,
  evaluateFormula,
  setValue,
  isCompleted,
}) => {
  useEffect(() => {
    if (question.formula) {
      const result = evaluateFormula(question.formula, allValues);
      const currentValue = allValues?.[name];
      if (result !== currentValue) {
        setValue(name, result);
      }
    }
  }, [allValues, question.formula, name, evaluateFormula]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {question.question}
        {question.is_required && <Text style={styles.required}> *</Text>}
      </Text>
      <Controller
        control={control}
        render={({ field: { value } }) => (
          <TextInput
            style={[styles.input, styles.formulaInput]}
            value={isCompleted ? question?.answers?.answer : value}
            editable={false}
            placeholder="Calculated automatically"
          />
        )}
        name={name}
        defaultValue=""
      />
      {question.formula && (
        <Text style={styles.formulaText}>Formula: {question.formula}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 10,
    fontSize: 16,
  },
  formulaInput: {
    backgroundColor: "#f5f5f5",
  },
  formulaText: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
});

export default FormulaField;
