import { Picker } from "@react-native-picker/picker";
import React from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { mockData } from "../app/screens/forms/mockData";

const formConfig = [
  {
    name: "Stage 1",
    order: 1,
    stage_access: {
      access_type: "organization",
      allow_group: null,
      allow_stage: null,
      allow_user: null,
    },
    questions: [
      {
        question: "Stage 1 - Question 1 - table",
        question_type: "table",
        order: 1,
        is_required: true,
        min_value: 1,
        max_value: 2,
        sub_questions: [
          {
            question: "Stage 1 - Table Child Question 1 - location",
            question_type: "location",
            order: 1,
            is_required: true,
          },
          {
            question: "Stage 1 - Table Child Question 2 - division",
            question_type: "division",
            order: 2,
            is_required: true,
            sub_questions: [
              {
                question: "Check",
                question_type: "checkbox",
                order: 1,
              },
            ],
          },
          {
            question: "Stage 1 - Table Child Question 3 - dropdown",
            question_type: "dropdown",
            question_sub_type: "text",
            order: 3,
            is_required: true,
            is_other: true,
            options: [
              {
                option: "Stage 1 - Table Child Question 3 - Option 1",
                order: 1,
              },
              {
                option: "Stage 1 - Table Child Question 3 - Option 2",
                order: 2,
              },
              {
                option: "Stage 1 - Table Child Question 3 - Option 3",
                order: 3,
              },
            ],
          },
        ],
      },
      {
        question: "Stage 2- Question 2 - location",
        question_type: "location",
        order: 2,
        is_required: true,
      },
    ],
  },
  {
    name: "Stage 1",
    order: 1,
    stage_access: {
      access_type: "organization",
      allow_group: null,
      allow_stage: null,
      allow_user: null,
    },
    questions: [
      {
        question: "Stage 2- Question 2 - location",
        question_type: "location",
        order: 2,
        is_required: true,
      },
    ],
  },
];

const Accordion = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        onPress={() => setOpen((o) => !o)}
        style={styles.accordionHeader}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <Text>{open ? "-" : "+"}</Text>
      </TouchableOpacity>
      {open && <View style={styles.accordionBody}>{children}</View>}
    </View>
  );
};

const RenderQuestion = ({ control, namePrefix, question }: any) => {
  switch (question.question_type) {
    case "location":
    case "division":
      return (
        <Controller
          control={control}
          name={`${namePrefix}`}
          rules={{ required: question.is_required }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text>{question.question}</Text>
              <TextInput
                style={styles.input}
                placeholder={question.question}
                value={value}
                onChangeText={onChange}
              />
            </View>
          )}
        />
      );
    case "dropdown":
      return (
        <Controller
          control={control}
          name={`${namePrefix}`}
          rules={{ required: question.is_required }}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text>{question.question}</Text>
              <Picker
                selectedValue={value}
                onValueChange={onChange}
                style={styles.picker}
              >
                <Picker.Item label="Select..." value="" />
                {question.options.map((opt: any) => (
                  <Picker.Item
                    key={opt.order}
                    label={opt.option}
                    value={opt.option}
                  />
                ))}
                {question.is_other && (
                  <Picker.Item label="Other" value="Other" />
                )}
              </Picker>
              {value === "Other" && (
                <TextInput
                  style={styles.input}
                  placeholder="Please specify"
                  onChangeText={onChange}
                  value={value}
                />
              )}
            </View>
          )}
        />
      );
    case "checkbox":
      return (
        <Controller
          control={control}
          name={`${namePrefix}`}
          render={({ field: { onChange, value } }) => (
            <View style={styles.inputGroup}>
              <Text>{question.question}</Text>
              <Switch value={!!value} onValueChange={onChange} />
            </View>
          )}
        />
      );
    default:
      return null;
  }
};

const RenderTable = ({ control, namePrefix, question }: any) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: namePrefix,
  });

  React.useEffect(() => {
    if (fields.length < question.min_value) {
      for (let i = fields.length; i < question.min_value; i++) {
        append({});
      }
    }
  }, []);

  return (
    <View style={styles.tableContainer}>
      {/* <Text style={styles.tableTitle}>{question.question}</Text> */}
      {fields.map((item, idx) => (
        <View key={item.id} style={styles.tableRow}>
          {question.sub_questions.map((subQ: any, subIdx: number) => (
            <RenderQuestion
              key={subIdx}
              control={control}
              namePrefix={`${namePrefix}[${idx}].${subQ.question.replace(
                /\s+/g,
                "_"
              )}`}
              question={subQ}
            />
          ))}
          {fields.length > question.min_value && (
            <TouchableOpacity
              onPress={() => remove(idx)}
              style={styles.removeBtn}
            >
              <Text style={styles.removeBtnText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
      {fields.length < question.max_value && (
        <TouchableOpacity onPress={() => append({})} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add Row</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const Test = () => {
  const { control, handleSubmit } = useForm({ defaultValues: {} });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {mockData?.stages?.map((stage: any, idx: number) => (
        <>
          <View style={styles.tabsContainer}>
            <View style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabTitle, styles.activeTabTitle]}>
                {stage.name}
              </Text>
            </View>
          </View>
          {stage.questions.map((q: any, qIdx: number) => {
            if (q.question_type === "table") {
              return (
                <>
                  <Accordion key={idx} title={q.question}>
                    <RenderTable
                      key={qIdx}
                      control={control}
                      namePrefix={`stage_${idx}_question_${qIdx}`}
                      question={q}
                    />
                  </Accordion>
                </>
              );
            }
            return (
              <>
                <Accordion key={idx} title={q.question}>
                  <RenderQuestion
                    key={qIdx}
                    control={control}
                    namePrefix={`stage_${idx}_question_${qIdx}`}
                    question={q}
                  />
                </Accordion>
              </>
            );
          })}
        </>
      ))}
      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        style={styles.submitBtn}
      >
        <Text style={styles.submitBtnText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 5 },
  accordionContainer: {
    marginBottom: 12,
    borderWidth: 0,
    borderRadius: 8,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    // Shadow for Android
    elevation: 5,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  accordionTitle: { fontWeight: "bold", fontSize: 16 },
  accordionBody: { padding: 12 },
  inputGroup: { marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginTop: 4,
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginTop: 4,
  },
  tableContainer: { marginBottom: 16 },
  tableTitle: { fontWeight: "bold", marginBottom: 8 },
  tableRow: {
    marginBottom: 8,
    backgroundColor: "#fafafa",
    padding: 8,
    borderRadius: 6,
  },
  addBtn: {
    backgroundColor: "#4caf50",
    padding: 8,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  addBtnText: { color: "#fff" },
  removeBtn: {
    backgroundColor: "#f44336",
    padding: 6,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8,
  },
  removeBtnText: { color: "#fff" },
  submitBtn: {
    backgroundColor: "#2196f3",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  tabsContainer: {
    flexDirection: "row",
    borderBottomWidth: 6,
    borderColor: "#f57f17",
  },
  tab: {
    flex: 0.4,
    paddingVertical: 12,
    alignItems: "center",
    borderColor: "transparent",
    backgroundColor: "#f57f17",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  activeTab: {
    borderColor: "#007AFF",
  },
  tabTitle: {
    color: "#fff",
    fontWeight: "500",
  },
  activeTabTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default Test;
