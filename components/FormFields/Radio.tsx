import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type RadioOption = {
  label: string;
  value: string;
};

type RadioProps = {
  options: RadioOption[];
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

const Radio: React.FC<RadioProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.radioContainer}
          onPress={() => !disabled && onChange(option.value)}
          disabled={disabled}
          accessibilityRole="radio"
          accessibilityState={{ selected: value === option.value, disabled }}
        >
          <View
            style={[
              styles.outerCircle,
              value === option.value && styles.selectedOuter,
            ]}
          >
            {value === option.value && <View style={styles.innerCircle} />}
          </View>
          <Text style={[styles.label, disabled && styles.disabledLabel]}>
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const CIRCLE_SIZE = 20;
const INNER_CIRCLE_SIZE = 10;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  outerCircle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderWidth: 2,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  selectedOuter: {
    borderColor: "#007AFF",
  },
  innerCircle: {
    width: INNER_CIRCLE_SIZE,
    height: INNER_CIRCLE_SIZE,
    borderRadius: INNER_CIRCLE_SIZE / 2,
    backgroundColor: "#007AFF",
  },
  label: {
    fontSize: 16,
    color: "#222",
  },
  disabledLabel: {
    color: "#aaa",
  },
});

export default Radio;
