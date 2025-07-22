import React from "react";
import { Question } from "../types/formTypes";
import {
  CheckboxField,
  DateTimeField,
  DropdownField,
  FileUploadField,
  LinearScaleField,
  TextInputField,
} from "./index";
// import CheckboxField from "./CheckboxField";
// import DateField from "./DateField";
// import DateTimeField from "./DateTimeField";
// import DivisionField from "./DivisionField";
// import DropdownField from "./DropdownField";
// import LinearScaleField from "./LinearScaleField";
// import LocationField from "./LocationField";
// import MultipleChoiceField from "./MultipleChoiceField";
// import SignatureField from "./SignatureField";
// import TextInputField from "./TextInputField";
// import TimeField from "./TimeField";
// import UploadField from "./UploadField";

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
    // case "location":
    //   return <LocationField {...fieldProps} />;
    // case "division":
    // case "sub_division":
    //   return <DivisionField {...fieldProps} />;
    case "dropdown":
      return <DropdownField {...fieldProps} />;
    case "short_answer":
    case "long_answer":
      return <TextInputField {...fieldProps} />;
    // case "date":
    //   return <DateTimeField {...fieldProps} />;
    // case "time":
    //   return <TimeField {...fieldProps} />;
    case "time":
    case "date":
    case "datetime":
      return <DateTimeField {...fieldProps} />;
    case "checkboxes":
      return <CheckboxField {...fieldProps} />;
    case "multiple_choice":
    //   return <MultipleChoiceField {...fieldProps} />;
    case "linear_scale":
      return <LinearScaleField {...fieldProps} />;
    case "upload_image":
    case "upload_file":
    case "upload_video":
      return <FileUploadField {...fieldProps} />;
    // case "signature":
    //   return <SignatureField {...fieldProps} />;
    default:
      return <TextInputField {...fieldProps} />;
  }
};

export default FormField;
