import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Controller } from "react-hook-form";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Option, Question } from "../types/formTypes";

interface MultipleChoiceFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
  isCompleted?: boolean;
}

const MultipleChoiceField: React.FC<MultipleChoiceFieldProps> = ({
  question,
  control,
  errors,
  name,
  isCompleted,
}) => {
  const isCheckbox = question.question_type === "checkboxes";
  const hasOtherOption = question.is_other;

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) =>
          !question.is_required ||
          (value && (isCheckbox ? value.length > 0 : true)) ||
          "Please select at least one option",
      }}
      render={({ field: { onChange, value } }) => {
        // Handle "Other" option separately
        const otherValue =
          value?.find((item: any) => item?.isOther)?.text || "";

        const handleOptionPress = (option: Option) => {
          if (isCheckbox) {
            // For checkboxes, toggle selection
            const currentValue = Array.isArray(value) ? [...value] : [];
            const optionIndex = currentValue.findIndex((item: any) =>
              item?.id ? item.id === option.id : item === option.id
            );

            if (optionIndex >= 0) {
              currentValue.splice(optionIndex, 1);
            } else {
              currentValue.push({ id: option.id });
            }
            onChange(currentValue);
          } else {
            // For radio buttons, select only one
            onChange([{ id: option.id }]);
          }
        };

        const handleOtherTextChange = (text: string) => {
          const currentValue = Array.isArray(value) ? [...value] : [];
          const otherIndex = currentValue.findIndex(
            (item: any) => item?.isOther
          );

          if (text) {
            const otherItem = { isOther: true, text };
            if (otherIndex >= 0) {
              currentValue[otherIndex] = otherItem;
            } else {
              currentValue.push(otherItem);
            }
          } else if (otherIndex >= 0) {
            currentValue.splice(otherIndex, 1);
          }
          onChange(currentValue);
        };

        const isOptionSelected = (optionId: number | string) => {
          if (isCompleted) {
            return optionId === Number(question?.answers?.answer);
          }
          return value?.some((item: any) =>
            item?.id ? item.id === optionId : item === optionId
          );
        };

        return (
          <View style={styles.container}>
            <Text style={styles.label}>
              {question.question}
              {question.is_required && <Text style={styles.required}> *</Text>}
            </Text>

            {question.description && (
              <Text style={styles.description}>{question.description}</Text>
            )}

            <View style={styles.optionsContainer}>
              {question.options.map((option) => (
                <TouchableOpacity
                  disabled={isCompleted}
                  key={option.id}
                  style={[
                    styles.optionButton,
                    isOptionSelected(option.id) && styles.optionSelected,
                  ]}
                  onPress={() => handleOptionPress(option)}
                >
                  <View style={styles.optionContent}>
                    {isCheckbox ? (
                      <MaterialIcons
                        name={
                          isOptionSelected(option.id)
                            ? "check-box"
                            : "check-box-outline-blank"
                        }
                        size={24}
                        color={isOptionSelected(option.id) ? "#007AFF" : "#666"}
                      />
                    ) : (
                      <MaterialIcons
                        name={
                          isOptionSelected(option.id)
                            ? "radio-button-checked"
                            : "radio-button-unchecked"
                        }
                        size={24}
                        color={isOptionSelected(option.id) ? "#007AFF" : "#666"}
                      />
                    )}
                    <Text style={styles.optionText}>{option.option}</Text>
                  </View>
                </TouchableOpacity>
              ))}

              {hasOtherOption && (
                <View style={styles.otherOptionContainer}>
                  <TouchableOpacity
                    style={[
                      styles.optionButton,
                      otherValue && styles.optionSelected,
                      styles.otherOptionButton,
                    ]}
                    onPress={() => {
                      if (!otherValue) handleOtherTextChange(" ");
                    }}
                  >
                    <View style={styles.optionContent}>
                      {isCheckbox ? (
                        <MaterialIcons
                          name={
                            otherValue ? "check-box" : "check-box-outline-blank"
                          }
                          size={24}
                          color={otherValue ? "#007AFF" : "#666"}
                        />
                      ) : (
                        <MaterialIcons
                          name={
                            otherValue
                              ? "radio-button-checked"
                              : "radio-button-unchecked"
                          }
                          size={24}
                          color={otherValue ? "#007AFF" : "#666"}
                        />
                      )}
                      <Text style={styles.optionText}>Other</Text>
                    </View>
                  </TouchableOpacity>

                  {otherValue !== undefined && (
                    <TextInput
                      style={[
                        styles.otherInput,
                        errors[`${name}_other`] && styles.inputError,
                      ]}
                      placeholder="Please specify..."
                      value={otherValue}
                      onChangeText={handleOtherTextChange}
                      onFocus={() => {
                        if (!otherValue) handleOtherTextChange(" ");
                      }}
                    />
                  )}
                </View>
              )}
            </View>

            {errors[name] && (
              <Text style={styles.errorText}>{errors[name].message}</Text>
            )}
          </View>
        );
      }}
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
    marginBottom: 16,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  optionSelected: {
    borderColor: "#007AFF",
    backgroundColor: "#F0F7FF",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 12,
    flex: 1,
  },
  otherOptionContainer: {
    marginTop: 8,
  },
  otherOptionButton: {
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  otherInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderTopWidth: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "red",
    backgroundColor: "#FFF0F0",
  },
  errorText: {
    color: "red",
    marginTop: 8,
    fontSize: 14,
  },
});

export default MultipleChoiceField;
