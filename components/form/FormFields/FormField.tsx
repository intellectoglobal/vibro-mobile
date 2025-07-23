import React from "react";
import { Question } from "../types/formTypes";
import {
  CheckboxField,
  DateTimeField,
  DropdownField,
  FileUploadField,
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
}

const FormField: React.FC<FormFieldProps> = ({
  question,
  control,
  errors,
  name = question.question_uuid,
}) => {
  const fieldProps = {
    question,
    control,
    errors,
    name,
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
    default:
      return <TextInputField {...fieldProps} />;
  }
};

export default FormField;
