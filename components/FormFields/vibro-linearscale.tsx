import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Slider } from '@react-native-assets/slider'
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";

interface Option {
  id: number;
  option: string;
  score?: number;
  order?: number;
}

interface LinearScaleProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  options: Option[];
  minValue: number | null;
  maxValue: number |null;
  rules?: any;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  style?: any;
  isRequired?: boolean;
}

const CustomLinearScale: React.FC<LinearScaleProps> = ({
  control,
  name,
  label,
  options,
  minValue,
  maxValue,
  rules,
  disabled = false,
  error,
  style,
  isRequired = false,
}) => {
  return (
    <View style={[styles.questionContainer, style]}>
      {label && (
        <Text style={styles.questionText}>
          {label}
          {isRequired && <Text style={styles.required}> *</Text>}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        defaultValue={minValue}
        render={({ field: { onChange, value } }) => (
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>{value}</Text>

            <Slider
              style={styles.slider}
              minimumValue={minValue?? 0}
              maximumValue={maxValue?? 0}
              step={1}
              value={value}
              onValueChange={onChange}
              minimumTrackTintColor="#007AFF"
              maximumTrackTintColor="#E0E0E0"
              thumbTintColor="#007AFF"
              aria-disabled={disabled}
            />

            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabel}>
                {options[0]?.option || minValue}
              </Text>
              <Text style={styles.sliderLabel}>
                {options[options.length - 1]?.option || maxValue}
              </Text>
            </View>
          </View>
        )}
      />

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

export default CustomLinearScale;

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
  },
  required: {
    color: "#FF3B30",
  },
  sliderContainer: {
    paddingHorizontal: 10,
  },
  sliderValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
    marginBottom: 10,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  sliderLabel: {
    fontSize: 12,
    color: "#666",
  },
  errorText: {
    color: "#FF3B30",
    fontSize: 12,
    marginTop: 5,
  },
});
