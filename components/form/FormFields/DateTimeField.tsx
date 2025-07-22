import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Question } from "../types/formTypes";
import { formatDate, formatDateTime, formatTime } from "../utils/formHelpers";

interface DateQuestionProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const DateTimeField: React.FC<DateQuestionProps> = ({
  question,
  control,
  errors,
  name,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">(
    question.question_type === "time" ? "time" : "date"
  );

  const getDisplayValue = (value: string) => {
    if (!value) return question.question_hint || "Select";

    switch (question.question_type) {
      case "date":
        return formatDate(value);
      case "time":
        return formatTime(value);
      case "datetime":
        return formatDateTime(value);
      default:
        return formatDate(value);
    }
  };

  const handlePickerChange = (
    selectedDate: Date | undefined,
    onChange: (value: string) => void
  ) => {
    setShowPicker(false);

    if (!selectedDate) return;

    if (question.question_type === "datetime" && pickerMode === "date") {
      // For datetime, first show date picker then time picker
      setPickerMode("time");
      setShowPicker(true);
      return;
    }

    onChange(selectedDate.toISOString());
  };

  const getPickerMode = () => {
    if (question.question_type === "datetime") {
      return pickerMode;
    }
    return question.question_type === "time" ? "time" : "date";
  };

  const getIcon = () => {
    switch (question.question_type) {
      case "date":
        return "calendar-today";
      case "time":
        return "access-time";
      case "datetime":
        return "event";
      default:
        return "calendar-today";
    }
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

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              style={[styles.inputContainer, errors[name] && styles.inputError]}
              onPress={() => {
                setPickerMode(
                  question.question_type === "time" ? "time" : "date"
                );
                setShowPicker(true);
              }}
            >
              <Text style={styles.inputText}>{getDisplayValue(value)}</Text>
              <MaterialIcons name={getIcon()} size={20} color="#666" />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode={getPickerMode()}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) =>
                  handlePickerChange(selectedDate, onChange)
                }
                minimumDate={
                  question.min_value ? new Date(question.min_value) : undefined
                }
                maximumDate={
                  question.max_value ? new Date(question.max_value) : undefined
                }
              />
            )}
          </>
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
    fontSize: 11,
    color: "#666",
    marginBottom: 12,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 12,
    color: "#333",
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
});

export default DateTimeField;
