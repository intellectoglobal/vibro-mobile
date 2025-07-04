import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export const FormTextInput: React.FC<InputProps> = ({
  label,
  error,
  ...props
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput style={[styles.input, error && styles.inputError]} {...props} />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

export const FormTextArea: React.FC<InputProps> = ({
  label,
  error,
  numberOfLines = 4,
  ...props
}) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={[styles.input, styles.textarea, error && styles.inputError]}
      multiline
      numberOfLines={numberOfLines}
      {...props}
    />
    {error ? <Text style={styles.error}>{error}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    color: "#333",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#bbb",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "red",
  },
  error: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
});
