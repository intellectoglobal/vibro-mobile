export interface AuditOption {
  id: number;
  option: string;
  score: number;
  failed: boolean;
  order: number;
}

export interface AuditQuestion {
  id: number;
  question_uuid: string;
  question: string;
  description: string | null;
  question_type: string;
  question_sub_type: string | null;
  is_required: boolean;
  critical: boolean;
  options: AuditOption[];
  max_score: number | null;
  logics: AuditLogic[];
  sub_questions: AuditQuestion[];
}

export interface AuditLogic {
  id: number;
  logic_type: string;
  logic_value: string;
  logic_questions: AuditQuestion[];
}

export interface AuditGroup {
  id: number;
  name: string;
  questions: AuditQuestion[];
  pass_percentage?: number;
}

export interface AuditInfo {
  id: number;
  name: string;
  questions: AuditQuestion[];
}

export interface AuditFormData {
  id: number;
  title: string;
  pass_percentage: number;
  max_score: number;
  audit_info: AuditInfo;
  audit_group: AuditGroup[];
}

export interface FormValues {
  [key: string]: any;
}

export interface AuditFormContextType {
  formData: AuditFormData;
  formValues: FormValues;
  setFormValues: (values: FormValues) => void;
  calculateGroupScore: (groupId: number) => number;
  handleSubmit: () => Promise<void>;
  isSubmitting: boolean;
}
