import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Question } from "../types/formTypes";

interface TextInputFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
  isCompleted?: boolean;
}

const TextInputField: React.FC<TextInputFieldProps> = ({
  question,
  control,
  errors,
  name,
  isCompleted,
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
      {question.question_hint && (
        <Text style={styles.hint}>{question.question_hint}</Text>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            onChangeText={onChange}
            onBlur={onBlur}
            inputMode={question?.question_sub_type === "number" ? "numeric": "text" }
            value={question?.answers?.answer?? value}
            placeholder={question.question_hint || ""}
            multiline={question.question_type === "long_answer"}
            numberOfLines={question.question_type === "long_answer" ? 4 : 1}
            editable={!isCompleted}
          />
        )}
      />

      {errors[name] && (
        <Text style={styles.errorText}>{errors[name].message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 8,
  },
  required: {
    color: "red",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  hint: {
    fontSize: 12,
    color: "#999",
    marginBottom: 5,
    fontStyle: "italic",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    fontSize: 12,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
});

export default TextInputField;
