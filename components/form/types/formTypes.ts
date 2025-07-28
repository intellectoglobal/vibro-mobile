export interface Option {
  id: number;
  option: string;
  score: number;
  failed: boolean;
  order: number;
}

export interface Question {
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
  // ... other question properties
}

export interface Logic {
  id: number;
  logic_type: string;
  logic_value: string;
  logic_questions: Question[];
  follow_up: {
    task_close_questions: Question[];
    title: string;
  };
}

export interface Stage {
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
