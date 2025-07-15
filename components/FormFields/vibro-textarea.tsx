import React from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { StyleSheet, Text, TextInput, View } from "react-native";

type TextareaProps = {
  name: string;
  control: Control<any>;
  label?: string;
  placeholder?: string;
  rules?: object;
  error?: FieldError;
  numberOfLines?: number;
  style?: object;
  isRequired?: boolean;
} & React.ComponentProps<typeof TextInput>;

const Textarea: React.FC<TextareaProps> = ({
  name,
  control,
  label,
  placeholder,
  rules,
  error,
  style,
  numberOfLines = 4,
  isRequired,
  ...textAreaProps
}) => (
  <View style={styles.container}>
    {label && (
      <Text style={styles.label}>
        {label}
        {isRequired && <Text style={styles.required}> *</Text>}
      </Text>
    )}
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          style={[styles.textarea, error ? styles.errorBorder : null, style]}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          placeholder={placeholder}
          multiline
          numberOfLines={numberOfLines}
          {...textAreaProps}
        />
      )}
    />
    {error && <Text style={styles.errorText}>{error.message}</Text>}
  </View>
);

const styles = StyleSheet.create({
  container: { marginVertical: 8 },
  label: { marginBottom: 4, fontWeight: "bold" },
  textarea: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    minHeight: 80,
    textAlignVertical: "top",
    fontSize: 16,
  },
  errorBorder: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 12,
  },
  required: {
    color: "red",
  },
});

export default Textarea;
