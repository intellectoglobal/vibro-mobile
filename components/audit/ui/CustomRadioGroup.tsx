import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

interface RadioOption {
  label: string;
  value: string;
  score?: number;
}

interface CustomRadioGroupProps {
  options: RadioOption[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
}

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  options,
  selectedValue,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={styles.optionContainer}
          onPress={() => onSelect(option.value)}
        >
          <View style={styles.radioCircle}>
            {selectedValue === option.value && (
              <Icon name="radio-button-checked" size={24} color="#007AFF" />
            )}
            {selectedValue !== option.value && (
              <Icon name="radio-button-unchecked" size={24} color="#888" />
            )}
          </View>
          <Text style={styles.optionLabel}>{option.label}</Text>
          {option.score !== undefined && (
            <Text style={styles.optionScore}>{option.score} pts</Text>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 8,
  },
  radioCircle: {
    marginRight: 12,
  },
  optionLabel: {
    fontSize: 16,
    flex: 1,
  },
  optionScore: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
  },
});

export default CustomRadioGroup;
