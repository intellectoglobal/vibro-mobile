import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  disabled?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  error,
  disabled = false,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.checkbox,
          checked && styles.checked,
          disabled && styles.disabled,
        ]}
        onPress={() => !disabled && onChange(!checked)}
        activeOpacity={0.8}
        disabled={disabled}
      >
        {checked && <View style={styles.inner} />}
      </TouchableOpacity>
      <Text style={[styles.label, disabled && styles.labelDisabled]}>
        {label}
      </Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const BOX_SIZE = 24;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginVertical: 8,
  },
  checkbox: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    borderWidth: 2,
    borderColor: "#888",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  checked: {
    borderColor: "#007AFF",
    backgroundColor: "#E6F0FF",
  },
  inner: {
    width: BOX_SIZE - 10,
    height: BOX_SIZE - 10,
    backgroundColor: "#007AFF",
    borderRadius: 2,
  },
  label: {
    marginLeft: 32,
    marginTop: -BOX_SIZE,
    marginBottom: 4,
    fontSize: 16,
    color: "#222",
  },
  labelDisabled: {
    color: "#aaa",
  },
  error: {
    color: "#d32f2f",
    fontSize: 13,
    marginLeft: 2,
    marginTop: 2,
  },
  disabled: {
    backgroundColor: "#f2f2f2",
    borderColor: "#ccc",
  },
});

export default Checkbox;
