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
import { Question } from "../types/formTypes";

interface CheckboxesQuestionProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const CheckboxField: React.FC<CheckboxesQuestionProps> = ({
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
        rules={{
          validate: (value) =>
            !question.is_required ||
            (value && value.length > 0) ||
            "At least one option must be selected",
        }}
        render={({ field: { onChange, value } }) => (
          <View style={styles.optionsContainer}>
            {question.options.map((option) => {
              const isSelected = value?.includes(option.id);

              return (
                <TouchableOpacity
                  key={option.id}
                  style={styles.optionButton}
                  onPress={() => {
                    const newValue = value ? [...value] : [];
                    if (isSelected) {
                      // Remove if already selected
                      onChange(newValue.filter((id) => id !== option.id));
                    } else {
                      // Add if not selected
                      onChange([...newValue, option.id]);
                    }
                  }}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isSelected && styles.checkboxSelected,
                    ]}
                  >
                    {isSelected && (
                      <MaterialIcons name="check" size={16} color="white" />
                    )}
                  </View>
                  <Text style={styles.optionText}>{option.option}</Text>
                </TouchableOpacity>
              );
            })}

            {question.is_other && (
              <View style={styles.otherOptionContainer}>
                <TouchableOpacity
                  style={styles.optionButton}
                  onPress={() => {
                    const newValue = value ? [...value] : [];
                    const otherOptionId = -1; // Special ID for "other"
                    const isOtherSelected = value?.includes(otherOptionId);

                    if (isOtherSelected) {
                      onChange(newValue.filter((id) => id !== otherOptionId));
                    } else {
                      onChange([...newValue, otherOptionId]);
                    }
                  }}
                >
                  <View
                    style={[
                      styles.checkbox,
                      value?.includes(-1) && styles.checkboxSelected,
                    ]}
                  >
                    {value?.includes(-1) && (
                      <MaterialIcons name="check" size={16} color="white" />
                    )}
                  </View>
                  <Text style={styles.optionText}>Other</Text>
                </TouchableOpacity>

                {value?.includes(-1) && (
                  <Controller
                    control={control}
                    name={`${name}_other`}
                    rules={{
                      required: value?.includes(-1) ? "Please specify" : false,
                    }}
                    render={({
                      field: { onChange: onOtherChange, value: otherValue },
                    }) => (
                      <View style={styles.otherInputContainer}>
                        <TextInput
                          style={[
                            styles.otherInput,
                            errors[`${name}_other`] && styles.inputError,
                          ]}
                          onChangeText={onOtherChange}
                          value={otherValue}
                          placeholder="Please specify..."
                          placeholderTextColor="#999"
                        />
                        {errors[`${name}_other`] && (
                          <Text style={styles.errorTextSmall}>
                            {errors[`${name}_other`].message}
                          </Text>
                        )}
                      </View>
                    )}
                  />
                )}
              </View>
            )}
          </View>
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
    marginBottom: 20,
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
    marginBottom: 12,
  },
  optionsContainer: {
    marginTop: 8,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  optionText: {
    fontSize: 11,
    flex: 1,
  },
  otherOptionContainer: {
    marginTop: 8,
  },
  otherInputContainer: {
    marginLeft: 34,
    marginTop: 8,
  },
  otherInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
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
  errorTextSmall: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
});

export default CheckboxField;
