import { Option } from "@/types/forms";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import { Platform, StyleSheet, Text, View } from "react-native";

interface SelectBoxProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  // options: { label: string; value: string | number }[];
  options: Option[];
  rules?: any;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  style?: any;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  control,
  name,
  label,
  options,
  rules,
  placeholder = "Select an option",
  disabled = false,
  error,
  style,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <View
            style={[
              styles.pickerContainer,
              { borderColor: error ? "red" : colors.border },
              disabled && styles.disabled,
            ]}
          >
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => onChange(itemValue)}
              style={[styles.picker, { color: colors.text }]}
              enabled={!disabled}
              dropdownIconColor={colors.text}
            >
              <Picker.Item label={placeholder} value="" />
              {options.map((option) => (
                <Picker.Item
                  key={option.id.toString()}
                  label={option.option}
                  value={option.id}
                />
              ))}
            </Picker>
          </View>
        )}
        name={name}
        rules={rules}
        defaultValue=""
      />

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "bold",
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 4,
    overflow: "hidden",
    ...Platform.select({
      ios: {
        height: 100,
      },
      android: {
        height: 50,
      },
    }),
  },
  picker: {
    height: 50,
  },
  disabled: {
    opacity: 0.5,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default SelectBox;
