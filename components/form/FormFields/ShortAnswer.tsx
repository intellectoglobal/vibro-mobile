import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Question } from "../types/formTypes";

interface ShortAnswerFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const ShortAnswerField: React.FC<ShortAnswerFieldProps> = ({
  question,
  control,
  errors,
  name,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {question.question}
        {question.is_required && <Text style={styles.required}> *</Text>}
      </Text>

      {question.description && (
        <Text style={styles.description}>{question.description}</Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={[styles.input, errors[name] && styles.inputError]}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
            placeholder={question.question_hint || ""}
            placeholderTextColor="#999"
            maxLength={question.max_value || 255}
            accessibilityLabel={question.question}
            accessibilityHint={question.description || ""}
            editable={!question.is_readonly}
          />
        )}
      />

      {errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}

      {question.question_hint && !errors[name] && (
        <Text style={styles.hintText}>{question.question_hint}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
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
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    minHeight: 50,
  },
  inputError: {
    borderColor: "red",
    backgroundColor: "#FFF0F0",
  },
  errorText: {
    color: "red",
    marginTop: 5,
    fontSize: 14,
  },
  hintText: {
    color: "#999",
    fontSize: 12,
    marginTop: 5,
    fontStyle: "italic",
  },
});

export default ShortAnswerField;
