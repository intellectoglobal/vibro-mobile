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
import { formatDate } from "../utils/formHelpers";

interface DateQuestionProps {
  question: Question;
  control: any;
  errors: any;
  name: string;
}

const DateQuestion: React.FC<DateQuestionProps> = ({
  question,
  control,
  errors,
  name,
}) => {
  const [showPicker, setShowPicker] = useState(false);

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
              style={[styles.dateInput, errors[name] && styles.inputError]}
              onPress={() => setShowPicker(true)}
            >
              <Text style={styles.dateText}>
                {value
                  ? formatDate(value)
                  : question.question_hint || "Select date"}
              </Text>
              <MaterialIcons name="calendar-today" size={20} color="#666" />
            </TouchableOpacity>

            {showPicker && (
              <DateTimePicker
                value={value ? new Date(value) : new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(event, selectedDate) => {
                  setShowPicker(false);
                  if (selectedDate) {
                    onChange(selectedDate.toISOString());
                  }
                }}
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
    fontSize: 16,
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
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
  },
  dateText: {
    fontSize: 16,
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

export default DateQuestion;
