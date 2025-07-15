import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import { Controller, Control, FieldValues, FieldError } from "react-hook-form";
import DatePicker from "react-native-date-picker";

interface DateTimeProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  style?: any;
  question_type: "date" | "time" | "datetime"; // required to determine picker mode
  isRequired?: boolean;
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
}) => {
  const [open, setOpen] = useState(false);

  const getMode = () => {
    if (question_type === "datetime") return "datetime";
    return question_type;
  };

  const formatDisplay = (date: Date | null) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions =
      question_type === "date"
        ? { year: "numeric", month: "short", day: "numeric" }
        : question_type === "time"
        ? { hour: "2-digit", minute: "2-digit" }
        : {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          };
    return new Intl.DateTimeFormat("en-IN", options).format(date);
  };

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={styles.label}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        defaultValue={null}
        render={({ field: { onChange, value } }) => (
          <>
            <TouchableOpacity
              onPress={() => !disabled && setOpen(true)}
              style={[styles.input, error && styles.inputError, disabled && styles.disabled]}
              disabled={disabled}
            >
              <Text style={styles.inputText}>
                {value ? formatDisplay(new Date(value)) : placeholder}
              </Text>
            </TouchableOpacity>

            <DatePicker
              modal
              open={open}
              mode={getMode()}
              date={value ? new Date(value) : new Date()}
              onConfirm={(selectedDate:any) => {
                setOpen(false);
                onChange(selectedDate.toISOString());
              }}
              onCancel={() => setOpen(false)}
            />
          </>
        )}
      />

      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
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
