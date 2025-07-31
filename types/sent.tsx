export interface Submission {
  id: string;
  submission_initiated_on: string; // or number if preferred
  submission_initiated_stage: number;
  submission_initiated_by: number;
  is_completed: boolean;
  completed_by: number | null;
  completed_on: string | null;
}

export interface SubmissionData {
  id: string;
  title: string;
  form_type: string;
  submissions: Submission[];
}

export const mockSentForms: SubmissionData[] = [
  {
    id: "101",
    title: "Factory Safety Audit",
    form_type: "audit",
    submissions: [
      {
        id: "1001",
        submission_initiated_stage: 201,
        submission_initiated_on: "2025-07-25T09:15:00Z",
        submission_initiated_by: 85,
        is_completed: false,
        completed_by: null,
        completed_on: null,
      },
      {
        id: "1002",
        submission_initiated_stage: 202,
        submission_initiated_on: "2025-07-26T10:30:00Z",
        submission_initiated_by: 85,
        is_completed: false,
        completed_by: null,
        completed_on: null,
      },
    ],
  },
  {
    id: "102",
    title: "Warehouse Inspection Checklist",
    form_type: "audit",
    submissions: [
      {
        id: "1003",
        submission_initiated_stage: 203,
        submission_initiated_on: "2025-07-27T11:45:00Z",
        submission_initiated_by: 85,
        is_completed: false,
        completed_by: null,
        completed_on: null,
      },
    ],
  },
  {
    id: "103",
    title: "Electrical Compliance Review",
    form_type: "audit",
    submissions: [
      {
        id: "1004",
        submission_initiated_stage: 204,
        submission_initiated_on: "2025-07-28T13:00:00Z",
        submission_initiated_by: 85,
        is_completed: false,
        completed_by: null,
        completed_on: null,
      },
    ],
  },
];


export interface Sent {
  id: string; // form_submission_id
  submission_initiated_on: string;
  submission_initiated_stage: number;
  submission_initiated_by: number;
  is_completed: boolean;
  completed_by: number | null;
  completed_on: string | null;

  is_form_submission_pending: boolean;
  is_stage_submission_pending: boolean;
  stage_assignment_id: number;
  stage_assignment_uuid: string;
  stage_id: number;
  stage_order: number;
}


export interface SentData {
  id: string; // form id
  title: string;
  form_type: string;
  received: Sent[];
}


