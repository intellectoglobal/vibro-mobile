import { ComparisonOperator, LogicType } from "@/services/matchLogicCondition";

export interface Option {
  id: number;
  option: string;
  score: number;
  failed: boolean;
  order: number;
}

export interface Answers {
  Form: number;
  answer: string;
  division: number | null;
  location: number | null;
  organization: number | null;
  question: number | null;
  question_type: string;
  stage: number;
  sub_division: number | null;
  submission: number | null;
  submitted_by: number | null;
  submitted_on: string;
  user: number;
}

export interface Question {
  formula: any;
  is_other: any;
  is_readonly: any;
  question_hint: any;
  number_of_file_allowed: number;
  id: number;
  question_uuid: string;
  question: string;
  description: string | null;
  question_type: string;
  question_sub_type: string | null;
  is_required: boolean;
  min_value?: number | null;
  max_value?: number | null;
  options: Option[];
  sub_questions: Question[];
  logics: Logic[];
  answers: Answers;
  critical: false,
  order: 0,
  require_live: false,
  max_score: 0,
  audit_group: string
  // ... other question properties
}

export interface Logic {
  id: number;
  logic_type: LogicType;
  logic_value: string;
  comparison: ComparisonOperator;
  logic_questions: Question[];
  follow_up: {
    task_close_questions: Question[];
    title: string;
  };
}

export interface Stage {
  completed_on: string;
  completed_by: any;
  form: any;
  assigned_to_user_id: number;
  is_completed: boolean;
  id: number;
  name: string;
  order: number;
  questions: Question[];
}

export interface FormValues {
  [key: string]: any;
}

export interface FormOption {
  option: string;
  order: number;
}

export interface FormType {
  id: string;
  title: string;
  form_type: string;
  created_at: string;
  created_by: number;
  organization: number;
}

export interface FormListItem {
  form: FormType;
  stage_id: number;
  stage_order: number;
  stage_assignment_id: number;
  stage_assignment_uuid: string;
  form_submission_id: number;
  is_stage_submission_pending: boolean;
  is_form_submission_pending: boolean;
}

export interface SubmissionsDetail {
  id: string,
  form: string,
  submission_initiated_stage: string,
  submission_initiated_on: string;
  submission_initiated_by: string
  is_completed: boolean;
  completed_by: string;
  completed_on: string
}