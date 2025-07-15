// import React from "react";
// import { Control, Controller } from "react-hook-form";
// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

// type CheckboxProps = {
//   name: string;
//   label: string;
//   control: Control<any>;
//   rules?: object;
//   error?: string;
// };

// const Checkbox: React.FC<CheckboxProps> = ({
//   name,
//   label,
//   control,
//   rules,
//   error,
// }) => {
//   return (
//     <Controller
//       control={control}
//       name={name}
//       rules={rules}
//       render={({ field: { onChange, value } }) => (
//         <View style={styles.container}>
//           <TouchableOpacity
//             style={[styles.checkbox, value && styles.checked]}
//             onPress={() => onChange(!value)}
//             accessibilityRole="checkbox"
//             accessibilityState={{ checked: !!value }}
//           >
//             {value && <View style={styles.innerCheck} />}
//           </TouchableOpacity>
//           <Text style={styles.label} onPress={() => onChange(!value)}>
//             {label}
//           </Text>
//           {error ? <Text style={styles.error}>{error}</Text> : null}
//         </View>
//       )}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 8,
//   },
//   checkbox: {
//     width: 24,
//     height: 24,
//     borderWidth: 2,
//     borderColor: "#888",
//     borderRadius: 4,
//     marginRight: 8,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   checked: {
//     borderColor: "#007AFF",
//     backgroundColor: "#007AFF22",
//   },
//   innerCheck: {
//     width: 14,
//     height: 14,
//     backgroundColor: "#007AFF",
//     borderRadius: 2,
//   },
//   label: {
//     fontSize: 16,
//     color: "#222",
//   },
//   error: {
//     color: "red",
//     marginLeft: 8,
//     fontSize: 12,
//   },
// });

// export default Checkbox;

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
import { Checkbox } from "react-native-paper"; // or your preferred checkbox component

// interface Option {
//   label: string;
//   value: string | number;
// }

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

const CustomCheckbox: React.FC<MultiSelectBoxProps> = ({
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
  console.log("options ::", options);

  return (
    <View>
      {label && (
        <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      )}
      <View style={[styles.container, style]}>
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
                  disabled={disabled}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: selectedLabels ? colors.text : colors?.text,
                      },
                    ]}
                  >
                    {selectedLabels || placeholder}
                  </Text>
                </TouchableOpacity>

                {isOpen && (
                  <View
                    style={[styles.dropdown, { borderColor: colors.border }]}
                  >
                    <ScrollView style={{ maxHeight: 200 }}>
                      {options.map((item) => (
                        <TouchableOpacity
                          key={item.id.toString()}
                          style={styles.option}
                          onPress={() => toggleItem(item.id)}
                        >
                          <Checkbox.Android
                            status={
                              selectedValues.includes(item.id)
                                ? "checked"
                                : "unchecked"
                            }
                            onPress={() => toggleItem(item.id)}
                            color={colors.primary}
                            disabled={disabled}
                          />
                          <Text
                            style={[styles.optionText, { color: colors.text }]}
                          >
                            {item.option}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
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

export default CustomCheckbox;
