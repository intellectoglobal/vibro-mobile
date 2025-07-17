import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  SafeAreaView,
} from "react-native";
import { Controller, Control, FieldValues, FieldError } from "react-hook-form";
import DateTimePicker from '@react-native-community/datetimepicker';

interface DateTimeProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  style?: any;
  question_type: "date" | "time" | "datetime";
  isRequired?: boolean;
  initialDate?: Date; // New prop for initial date
}

const CustomDateAndTime: React.FC<DateTimeProps> = ({
  control,
  name,
  label,
  placeholder = "Select",
  disabled = false,
  error,
  style,
  question_type,
  isRequired = false,
  initialDate = new Date(),
}) => {
  const [show, setShow] = useState(false);
  
  // Determine picker mode based on question_type
  const getPickerMode = () => {
    switch (question_type) {
      case "date":
        return "date";
      case "time":
        return "time";
      case "datetime":
        return Platform.OS === "ios" ? "datetime" : "date";
      default:
        return "date";
    }
  };

  const formatDisplayDate = (date: Date | undefined) => {
    if (!date) return placeholder;
    
    switch (question_type) {
      case "date":
        return date.toLocaleDateString();
      case "time":
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case "datetime":
        return date.toLocaleString();
      default:
        return date.toLocaleString();
    }
  };

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => (
        <View style={[styles.container, style]}>
          {label && (
            <Text style={styles.label}>
              {label}
              {isRequired && <Text style={styles.required}> *</Text>}
            </Text>
          )}

          <TouchableOpacity
            style={[
              styles.input,
              disabled && styles.disabled,
              error && styles.inputError,
            ]}
            onPress={() => !disabled && setShow(true)}
            disabled={disabled}
          >
            <Text style={styles.inputText}>
              {formatDisplayDate(value || initialDate)}
            </Text>
          </TouchableOpacity>

          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={value || initialDate}
              mode={getPickerMode()}
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShow(Platform.OS === "ios");
                if (selectedDate) {
                  onChange(selectedDate);
                  // For datetime on Android, show time picker after date
                  if (question_type === "datetime" && Platform.OS === "android" && event.type === "set" && getPickerMode() === "date") {
                    setShow(true);
                    setTimeout(() => setShow(true), 100);
                  }
                }
              }}
            />
          )}

          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default CustomDateAndTime;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  required: {
    color: "red",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    backgroundColor: "#fff",
  },
  inputText: {
    fontSize: 16,
    color: "#333",
  },
  inputError: {
    borderColor: "red",
  },
  disabled: {
    backgroundColor: "#f0f0f0",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginTop: 4,
  },
});