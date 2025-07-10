import React from "react";
import { Text, View } from "react-native";

import { Textarea, Textbox } from "@/components/FormFields";
import styles from "./styles";

import { FieldRendererProps } from "@/types/forms";
import getValidationRules from "./validation";

const FieldRenderer: React.FC<FieldRendererProps> = ({
  control,
  question,
  stageOrder,
  errors,
  isEnabled,
}) => {
  const fieldName = `stage-${stageOrder}-${question.id}`;
  const error = errors[fieldName];
  const validationRules = getValidationRules(question);

  const renderInput1 = () => {
    switch (question.input_type) {
      case "text":
        return (
          <Textbox
            control={control}
            style={styles.textInput}
            placeholder={`Enter ${question.question.toLowerCase()}`}
            editable={isEnabled}
            name={fieldName}
            rules={validationRules}
            error={error}
            isRequired={question.is_required}
            label={question.question}
          />
        );
      case "textarea":
        return (
          <Textarea
            control={control}
            style={[styles.textInput, styles.textArea]}
            placeholder={`Enter ${question.question.toLowerCase()}`}
            editable={isEnabled}
            name={fieldName}
            rules={validationRules}
            error={error}
            isRequired={question.is_required}
            label={question.question}
          />
        );
      case "dropdown":
        return (
          <View style={styles.dropdown}>
            <Text>Checkboxes will be rendered here</Text>
          </View>
        );
      case "checkbox":
        return (
          <View style={styles.checkboxContainer}>
            <Text>Checkboxes will be rendered here</Text>
          </View>
        );
      case "radio":
        return (
          <View style={styles.radioContainer}>
            <Text>Radio buttons will be rendered here</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.questionContainer}>
      {renderInput1()}
      {/* <Text style={styles.questionText}>
        {question.question}
        {question.is_required && <Text style={styles.required}> *</Text>}
      </Text>

      {error && <Text style={styles.errorText}>{error.message}</Text>}

      <Controller
        control={control}
        name={fieldName}
        defaultValue=""
        rules={validationRules}
        render={({ field: { onChange, onBlur, value } }) => {
          switch (question.input_type) {
            case "text":
            case "textarea":
              return (
                <TextInput
                  style={[
                    styles.textInput,
                    question.input_type === "textarea" && styles.textArea,
                  ]}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  placeholder={`Enter ${question.question.toLowerCase()}`}
                  editable={isEnabled}
                  multiline={question.input_type === "textarea"}
                  numberOfLines={question.input_type === "textarea" ? 4 : 1}
                />
              );
            case "dropdown":
              return (
                <View style={styles.dropdown}>
                  <Text>Dropdown: {value || "Select an option"}</Text>
                </View>
              );
            case "checkbox":
              return (
                <View style={styles.checkboxContainer}>
                  <Text>Checkboxes will be rendered here</Text>
                </View>
              );
            case "radio":
              return (
                <View style={styles.radioContainer}>
                  <Text>Radio buttons will be rendered here</Text>
                </View>
              );
            default:
              return null;
          }
        }}
      /> */}
    </View>
  );
};

export default FieldRenderer;
