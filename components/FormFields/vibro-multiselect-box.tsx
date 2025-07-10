import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Checkbox } from "react-native-paper"; // or your preferred checkbox component

interface Option {
  label: string;
  value: string | number;
}

interface MultiSelectBoxProps {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  options: Option[];
  rules?: any;
  placeholder?: string;
  disabled?: boolean;
  error?: FieldError;
  style?: any;
}

const MultiSelectBox: React.FC<MultiSelectBoxProps> = ({
  control,
  name,
  label,
  options,
  rules,
  placeholder = "Select options",
  disabled = false,
  error,
  style,
}) => {
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}

      <Controller
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedValues = value || [];

          const toggleItem = (itemValue: string | number) => {
            const newValue = selectedValues.includes(itemValue)
              ? selectedValues.filter((v: string | number) => v !== itemValue)
              : [...selectedValues, itemValue];
            onChange(newValue);
          };

          const selectedLabels = options
            .filter((opt) => selectedValues.includes(opt.value))
            .map((opt) => opt.label)
            .join(", ");

          return (
            <View>
              <TouchableOpacity
                style={[
                  styles.dropdownButton,
                  { borderColor: error ? "red" : colors.border },
                  disabled && styles.disabled,
                ]}
                onPress={() => !disabled && setIsOpen(!isOpen)}
                disabled={disabled}
              >
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: selectedLabels ? colors.text : colors?.placeholder,
                    },
                  ]}
                >
                  {selectedLabels || placeholder}
                </Text>
              </TouchableOpacity>

              {isOpen && (
                <View style={[styles.dropdown, { borderColor: colors.border }]}>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item.value.toString()}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.option}
                        onPress={() => toggleItem(item.value)}
                      >
                        <Checkbox.Android
                          status={
                            selectedValues.includes(item.value)
                              ? "checked"
                              : "unchecked"
                          }
                          onPress={() => toggleItem(item.value)}
                          color={colors.primary}
                          disabled={disabled}
                        />
                        <Text
                          style={[styles.optionText, { color: colors.text }]}
                        >
                          {item.label}
                        </Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              )}
            </View>
          );
        }}
        name={name}
        rules={rules}
        defaultValue={[]}
      />

      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: "relative",
    zIndex: 1,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
  },
  dropdownButton: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    minHeight: 50,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 4,
    maxHeight: 200,
    backgroundColor: "white",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
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

export default MultiSelectBox;
