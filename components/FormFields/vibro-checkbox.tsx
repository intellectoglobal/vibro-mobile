import React from "react";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CheckboxProps = {
  name: string;
  label: string;
  control: Control<any>;
  rules?: object;
  error?: string;
};

const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  control,
  rules,
  error,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value } }) => (
        <View style={styles.container}>
          <TouchableOpacity
            style={[styles.checkbox, value && styles.checked]}
            onPress={() => onChange(!value)}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: !!value }}
          >
            {value && <View style={styles.innerCheck} />}
          </TouchableOpacity>
          <Text style={styles.label} onPress={() => onChange(!value)}>
            {label}
          </Text>
          {error ? <Text style={styles.error}>{error}</Text> : null}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 4,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checked: {
    borderColor: "#007AFF",
    backgroundColor: "#007AFF22",
  },
  innerCheck: {
    width: 14,
    height: 14,
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  label: {
    fontSize: 16,
    color: "#222",
  },
  error: {
    color: "red",
    marginLeft: 8,
    fontSize: 12,
  },
});

export default Checkbox;
