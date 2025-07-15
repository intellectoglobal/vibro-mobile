import { Option } from "@/types/forms";
import { useTheme } from "@react-navigation/native";
import React, { useState } from "react";
import { Control, Controller, FieldError, FieldValues } from "react-hook-form";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { RadioButton } from "react-native-paper";

interface MultiRadioStyleSelectProps {
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

const MultiRadioStyleSelect: React.FC<MultiRadioStyleSelectProps> = ({
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
  const [isOpen, setIsOpen] = useState(true);

  return (
    <View>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <View style={[styles.container, style]}>
        <Controller
          control={control}
          name={name}
          rules={rules}
          defaultValue={[]}
          render={({ field: { value, onChange } }) => {
            const selectedValues: (string | number)[] = value || [];

            const toggleItem = (itemId: string | number) => {
              const newValue = selectedValues.includes(itemId)
                ? selectedValues.filter((id) => id !== itemId)
                : [...selectedValues, itemId];
              onChange(newValue);
            };

            const selectedLabels = options
              .filter((opt) => selectedValues.includes(opt.id))
              .map((opt) => opt.option)
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
                >
                  <Text style={[styles.buttonText, { color: colors.text }]}>
                    {selectedLabels || placeholder}
                  </Text>
                </TouchableOpacity>

                {isOpen && (
                  <View style={[styles.dropdown, { borderColor: colors.border }]}>
                    <ScrollView style={{ maxHeight: 200 }}>
                      {options.map((item) => {
                        const selected = selectedValues.includes(item.id);
                        return (
                          <TouchableOpacity
                            key={item.id.toString()}
                            style={styles.option}
                            onPress={() => toggleItem(item.id)}
                          >
                            <RadioButton
                              value={item.id.toString()}
                              status={selected ? "checked" : "unchecked"}
                              onPress={() => toggleItem(item.id)}
                              color={colors.primary}
                              disabled={disabled}
                            />
                            <Text style={[styles.optionText, { color: colors.text }]}>
                              {item.option}
                            </Text>
                          </TouchableOpacity>
                        );
                      })}
                    </ScrollView>

                  </View>
                )}
              </View>
            );
          }}
        />

        {error && <Text style={styles.errorText}>{error.message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  dropdownButton: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 14,
    minHeight: 48,
    justifyContent: "center",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 15,
  },
  dropdown: {
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 4,
    maxHeight: 200,
    backgroundColor: "#fff",
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  optionText: {
    marginLeft: 8,
    fontSize: 15,
  },
  disabled: {
    opacity: 0.6,
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "red",
  },
});

export default MultiRadioStyleSelect;
