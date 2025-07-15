import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

export interface NavigationProps {
  navigation: NativeStackNavigationProp<any>;
}

export interface ItemType {
  id: string;
  title?: string;
  name?: string;
}

export interface ItemsProps {
  items: ItemType;
  onClick?: (id: string) => void;
}

export type QuestionType =
  | "short_answer"
  | "long_answer"
  | "dropdown"
  | "checkbox"
  | "radio";
export type InputType = "text" | "textarea" | "dropdown" | "checkbox" | "radio";

export interface QuestionValidation {
  pattern?: {
    value: RegExp;
    message: string;
  };
  minLength?: {
    value: number;
    message?: string;
  };
  maxLength?: {
    value: number;
    message?: string;
  };
  requiredMessage?: string;
  custom?: (value: any, allValues?: any, fieldName?: string) => true | string;
}

export interface Question {
  id: string;
  question: string;
  question_type: QuestionType;
  input_type: InputType;
  is_required: boolean;
  options?: string[];
  validation?: QuestionValidation;
}

  export interface Stage {
    name: string;
    order: number;
    isStateEnable: boolean;
    questions: Question[];
  }

  export interface MultiStageFormProps {
    stages: Stage[];
    stageLen?: number;
    onSubmit: (data: any) => void;
  }

export type FieldRendererProps = {
  control: any;
  question: Question;
  stageOrder: number;
  errors: any;
  isEnabled: boolean;
};
