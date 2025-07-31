import React, { FC } from "react";
import { View, Text, TextInput } from "react-native";
import { Controller } from "react-hook-form";

interface FormFieldProps {
  question: any;
  control: any;
  errors: any;
  isCompleted: boolean;
  name: string;
  onChange?: () => void;
}

const FormField: FC<FormFieldProps> = ({
  question,
  control,
  errors,
  isCompleted,
  name,
  onChange,
}) => {
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={{ fontSize: 13, fontWeight: "bold", marginBottom: 5 }}>
        {question.label}
      </Text>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange: onFieldChange, value } }) => (
          <TextInput
            value={value}
            onChangeText={(text) => {
              onFieldChange(text);
              if (onChange) {
                onChange(); // Call parent onChange
              }
            }}
            editable={!isCompleted}
            style={{ borderWidth: 1, padding: 8, borderRadius: 5 }}
          />
        )}
      />
      {errors[name] && (
        <Text style={{ color: "red", marginTop: 5 }}>
          {errors[name].message}
        </Text>
      )}
    </View>
  );
};

export default FormField;