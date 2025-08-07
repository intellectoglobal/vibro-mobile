import React from "react";
import { Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
// import CustomDropdown from "../ui/CustomDropdown";
// import CustomRadioGroup from "../ui/CustomRadioGroup";
import { AuditQuestion } from "./types/audit";
import CustomDropdown from "./ui/CustomDropdown";
import CustomRadioGroup from "./ui/CustomRadioGroup";

interface AuditQuestionItemProps {
  question: AuditQuestion;
  control: any;
}

const AuditQuestionItem: React.FC<AuditQuestionItemProps> = ({
  question,
  control,
}) => {
  const renderQuestionInput = () => {
    switch (question.question_type) {
      case "dropdown":
        return (
          <Controller
            control={control}
            name={question.question_uuid}
            rules={{
              required: question.is_required ? "This field is required" : false,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <CustomDropdown
                  options={question.options.map((opt) => ({
                    label: opt.option,
                    value: opt.option,
                  }))}
                  selectedValue={value}
                  onValueChange={onChange}
                  placeholder={`Select ${question.question}`}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
        );
      case "audit":
        return (
          <Controller
            control={control}
            name={question.question_uuid}
            rules={{
              required: question.is_required ? "This field is required" : false,
            }}
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <>
                <CustomRadioGroup
                  options={question.options.map((opt) => ({
                    label: opt.option,
                    value: opt.option,
                    score: opt.score,
                  }))}
                  selectedValue={value}
                  onSelect={onChange}
                />
                {error && <Text style={styles.error}>{error.message}</Text>}
              </>
            )}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>
        {question.question}
        {question.is_required && <Text style={styles.required}> *</Text>}
      </Text>
      {question.description && (
        <Text style={styles.description}>{question.description}</Text>
      )}
      {renderQuestionInput()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },
  required: {
    color: "red",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  error: {
    color: "red",
    fontSize: 12,
    marginTop: 4,
  },
});

export default AuditQuestionItem;
