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
}

const FormulaField: React.FC<FormulaFieldProps> = ({
  question,
  control,
  errors,
  name = question.question_uuid,
  allValues,
  evaluateFormula,
}) => {
  useEffect(() => {
    if (question.formula && control?.setValue) {
      const result = evaluateFormula(question.formula, allValues);
      control.setValue(name, result);
    }
  }, [allValues, question.formula, control, name, evaluateFormula]);

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { value } }) => (
          <TextInput
            style={[styles.input, styles.formulaInput]}
            value={value}
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
