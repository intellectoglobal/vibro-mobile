import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Question } from "../types/formTypes";

interface TextareaFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const TextareaField: React.FC<TextareaFieldProps> = ({
  question,
  control,
  errors,
  name,
}) => {
  const characterLimit = question.max_value || (null as any);
  const [characterCount, setCharacterCount] = React.useState(0);

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required: question.is_required ? "This field is required" : false,
        maxLength: characterLimit
          ? {
              value: characterLimit,
              message: `Maximum ${characterLimit} characters allowed`,
            }
          : undefined,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={styles.container}>
          <Text style={styles.label}>
            {question.question}
            {question.is_required && <Text style={styles.required}> *</Text>}
          </Text>

          {question.description && (
            <Text style={styles.description}>{question.description}</Text>
          )}

          <TextInput
            style={[
              styles.textarea,
              errors[name] && styles.inputError,
              { height: question.question_type === "long_answer" ? 150 : 80 },
            ]}
            onChangeText={(text) => {
              onChange(text);
              setCharacterCount(text.length);
            }}
            onBlur={onBlur}
            value={value}
            placeholder={question.question_hint || ""}
            placeholderTextColor="#999"
            multiline
            numberOfLines={question.question_type === "long_answer" ? 4 : 3}
            textAlignVertical="top"
            maxLength={characterLimit}
          />

          <View style={styles.footer}>
            {errors[name] ? (
              <Text style={styles.errorText}>{errors[name].message}</Text>
            ) : (
              question.question_hint && (
                <Text style={styles.hintText}>{question.question_hint}</Text>
              )
            )}

            {characterLimit && (
              <Text style={styles.counterText}>
                {characterCount}/{characterLimit}
              </Text>
            )}
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  textarea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    textAlignVertical: "top", // Android fix for multiline
  },
  inputError: {
    borderColor: "red",
    backgroundColor: "#FFF0F0",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    flex: 1,
  },
  hintText: {
    color: "#999",
    fontSize: 12,
    fontStyle: "italic",
    flex: 1,
  },
  counterText: {
    color: "#666",
    fontSize: 12,
    marginLeft: 8,
  },
});

export default TextareaField;
