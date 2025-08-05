import React from "react";
import { useFormulaCalculation } from "../hooks/useMultiStageFormula";
import { Question } from "../types/formTypes";
import {
  CheckboxField,
  DateTimeField,
  DropdownField,
  FileUploadField,
  FormulaField,
  LinearScaleField,
  MultipleChoiceField,
  QRScannerField,
  SignatureField,
  TextareaField,
  TextInputField,
} from "./index";
interface FormFieldProps {
  question: Question;
  control: any;
  errors: any;
  name?: string;
  isCompleted?: boolean;
  allValues?: any;
  allQuestions?: Question[];
}

const FormField: React.FC<FormFieldProps> = ({
  question,
  control,
  errors,
  name = question.question_uuid,
  isCompleted,
  allValues = {},
  allQuestions = [],
}) => {
  const { evaluateFormula } = useFormulaCalculation(control, [
    { questions: allQuestions || [] },
  ]);

  const fieldProps = {
    question,
    control,
    errors,
    name,
    isCompleted,
    allValues,
    evaluateFormula,
  };

  switch (question.question_type) {
    case "user":
    case "division":
    case "sub_division":
    case "location":
    case "dropdown":
      return <DropdownField {...fieldProps} />;
    case "long_answer":
    case "title_and_description":
      return <TextareaField {...fieldProps} />;
    case "time":
    case "date":
    case "datetime":
      return <DateTimeField {...fieldProps} />;
    case "checkboxes":
      return <CheckboxField {...fieldProps} />;
    case "multiple_choice":
      return <MultipleChoiceField {...fieldProps} />;
    case "linear_scale":
      return <LinearScaleField {...fieldProps} />;
    case "upload_image":
    case "upload_file":
    case "upload_video":
    case "upload_audio":
      return <FileUploadField {...fieldProps} />;
    case "signature":
      return <SignatureField {...fieldProps} />;
    case "qr_code":
      return <QRScannerField {...fieldProps} />;
    case "formula":
      return <FormulaField {...fieldProps} />;
    default:
      return <TextInputField {...fieldProps} />;
  }
};

export default FormField;
