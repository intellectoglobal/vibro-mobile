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
import { matchLogicCondition } from "@/services/matchLogicCondition";
import TableField from "./TableField";
import FormField from "./FormField";

interface MultipleChoiceFieldProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
  isCompleted?: boolean;
  allValues? : any
}

const AuditField: React.FC<MultipleChoiceFieldProps> = ({
  question,
  control,
  errors,
  name,
  isCompleted,
  allValues
}) => {
  const isCheckbox = question.question_type === "checkboxes";
  const hasOtherOption = question.is_other;

  const getVisibleLogicIndexes = (selectedValues: any[]): number[] => {
    // Return empty array if no logics or options are defined
    if (!question?.logics?.length || !question?.options?.length) return [];

    const visibleLogicIndexes: number[] = [];

    // Get all selected option values
    const selectedOptionValues = selectedValues
      .filter((item) => item?.id) // Filter out invalid items
      .map((item) => question.options.find((opt) => opt.id === item.id)?.option)
      .filter((value) => value !== undefined); // Filter out undefined values

    // Check each logic condition
    question.logics.forEach((logic, index) => {
      const passes = selectedOptionValues.some((selectedValue) =>
        matchLogicCondition(selectedValue, logic.logic_value, logic.logic_type)
      );
      if (passes) {
        visibleLogicIndexes.push(index);
      }
    });

    return visibleLogicIndexes;
  };

  console.log("subQues ::", allValues)

  return (
    <Controller
      control={control}
      name={name}
      rules={{
        validate: (value) =>
          !question.is_required ||
          (value && (isCheckbox ? value.length > 0 : !!value)) ||
          "Please select at least one option",
      }}
      render={({ field: { onChange, value } }) => {
        // Initialize value as array if undefined
        const currentValue = Array.isArray(value) ? value : [];

        // Calculate visible logic indexes based on selected values
        let visibleLogicIndexes: number[] = isCompleted
          ? getVisibleLogicIndexes(
              question?.answers?.answer
                ? [{ id: Number(question.answers.answer) }]
                : []
            )
          : getVisibleLogicIndexes(currentValue);

        // Handle "Other" option value
        const otherValue =
          currentValue.find((item: any) => item?.isOther)?.text || "";

        const handleOptionPress = (option: Option) => {
          if (isCompleted) return; // Prevent changes if completed

          if (isCheckbox) {
            const newValue = [...currentValue];
            const optionIndex = newValue.findIndex(
              (item: any) => item?.id === option.id
            );

            if (optionIndex >= 0) {
              newValue.splice(optionIndex, 1); // Deselect
            } else {
              newValue.push({ id: option.id }); // Select
            }
            onChange(newValue);
          } else {
            onChange([{ id: option.id }]); // Select single option
          }
        };

        const handleOtherTextChange = (text: string) => {
          if (isCompleted) return; // Prevent changes if completed

          const newValue = [...currentValue];
          const otherIndex = newValue.findIndex((item: any) => item?.isOther);

          if (text.trim()) {
            const otherItem = { isOther: true, text: text.trim() };
            if (otherIndex >= 0) {
              newValue[otherIndex] = otherItem;
            } else {
              newValue.push(otherItem);
            }
          } else if (otherIndex >= 0) {
            newValue.splice(otherIndex, 1); // Remove empty "Other" value
          }
          onChange(newValue);
        };

        const isOptionSelected = (optionId: number | string) => {
          if (isCompleted && question?.answers?.answer) {
            return optionId === Number(question.answers.answer);
          }
          return currentValue.some(
            (item: any) => item?.id === optionId || item === optionId
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
              {question.options?.map((option) => (
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
                    disabled={isCompleted}
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

                  {otherValue && (
                    <TextInput
                      style={[
                        styles.otherInput,
                        errors[`${name}_other`] && styles.inputError,
                      ]}
                      placeholder="Please specify..."
                      value={otherValue}
                      onChangeText={handleOtherTextChange}
                      editable={!isCompleted}
                    />
                  )}
                </View>
              )}
            </View>

            {question.sub_questions.map((subQues) => (
              <FormField
                key={subQues.question_uuid}
                question={subQues}
                control={control}
                errors={errors}
                isCompleted={isCompleted}
              />
            ))}

            {visibleLogicIndexes.length > 0 && (
              <View>
                {question.logics?.map(
                  (logic, logicIndex) =>
                    visibleLogicIndexes.includes(logicIndex) &&
                    logic?.logic_questions?.map((logicQuestion) =>
                      logicQuestion.question_type === "table" ? (
                        <TableField
                          key={logicQuestion.question_uuid}
                          question={logicQuestion}
                          control={control}
                          errors={errors}
                          isCompleted={isCompleted}
                        />
                      ) : (
                        <FormField
                          key={logicQuestion.question_uuid}
                          question={logicQuestion}
                          control={control}
                          errors={errors}
                          isCompleted={isCompleted}
                        />
                      )
                    )
                )}
              </View>
            )}

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

export default AuditField;
