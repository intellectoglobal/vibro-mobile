export const mockData = {
  form_type: "standard",
  title: "Health & Safety Checklist1",
  folder: 18,
  prefix: "HSC",
  GPS: true,
  share_reponse: false,
  allow_editing: true,
  can_edit_previos_state: false,
  auto_share_reponse: false,
  pass_percentage: 80,
  max_score: 100,
  form_admin: 45,
  stages: [
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
      name: "Stage 2",
      order: 2,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 2 - Question 1 - division",
          question_type: "division",
          order: 1,
          is_required: true,
        },
        {
          question: "Stage 2 - Question 2 - sub_division",
          question_type: "sub_division",
          order: 2,
          is_required: true,
        },
      ],
    },
    {
      name: "Stage 3",
      order: 3,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 3 - Question 1 - title_and_description",
          question_type: "title_and_description",
          description: "Question Description",
          order: 1,
          is_required: true,
        },
        {
          question: "Stage 3 - Question 2 - short_answer",
          question_type: "short_answer",
          question_hint: "Question Hint",
          order: 2,
          is_required: true,
        },
      ],
    },
    {
      name: "Stage 4",
      order: 4,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 4 - Question 1 - long_answer",
          question_type: "long_answer",
          question_hint: "Question Hint",
          order: 1,
          is_required: true,
        },
        {
          question: "Stage 4 - Question 2 - multiple_choice",
          question_type: "multiple_choice",
          question_sub_type: "text",
          order: 2,
          is_required: true,
          is_other: true,
          options: [
            { option: "Stage 4 - Question 2 - Option 1", order: 1 },
            { option: "Stage 4 - Question 2 - Option 2", order: 2 },
            { option: "Stage 4 - Question 2 - Option 3", order: 3 },
          ],
        },
      ],
    },
    {
      name: "Stage 5",
      order: 5,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 5 - Question 1 - checkboxes",
          question_type: "checkboxes",
          order: 1,
          is_required: true,
          is_other: false,
          options: [
            { option: "Stage 5 - Question 1 - Option 1", order: 1 },
            { option: "Stage 5 - Question 1 - Option 2", order: 2 },
            { option: "Stage 5 - Question 1 - Option 3", order: 3 },
          ],
        },
        {
          question: "Stage 5 - Question 2 - dropdown",
          question_type: "dropdown",
          question_sub_type: "text",
          order: 2,
          is_required: true,
          is_other: true,
          options: [
            { option: "Stage 5 - Question 2 - Option 1", order: 1 },
            { option: "Stage 5 - Question 2 - Option 2", order: 2 },
            { option: "Stage 5 - Question 2 - Option 3", order: 3 },
          ],
        },
      ],
    },
    {
      name: "Stage 6",
      order: 6,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 6 - Question 1 - linear_scale",
          question_type: "linear_scale",
          order: 1,
          is_required: true,
          min_value: 1,
          max_value: 2,
          options: [
            { option: "Stage 6 - Question 1 - Option 1", order: 1 },
            { option: "Stage 6 - Question 1 - Option 2", order: 2 },
          ],
        },
        {
          question: "Stage 6 - Question 2 - datetime",
          question_type: "datetime",
          order: 2,
          is_required: true,
        },
      ],
    },
    {
      name: "Stage 7",
      order: 7,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 7 - Question 1 - date",
          question_type: "date",
          order: 1,
          is_required: true,
        },
        {
          question: "Stage 7 - Question 2 - time",
          question_type: "time",
          order: 2,
          is_required: true,
        },
      ],
    },
    {
      name: "Stage 8",
      order: 8,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 8 - Question 1 - signature",
          question_type: "signature",
          order: 1,
          is_required: true,
        },
        {
          question: "Stage 8 - Question 2 - upload_image",
          question_type: "upload_image",
          require_live: true,
          number_of_file_allowed: 5,
          order: 2,
          is_required: true,
        },
      ],
    },
    {
      name: "Stage 9",
      order: 9,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 9 - Question 1 - upload_video",
          question_type: "upload_video",
          order: 1,
          is_required: true,
          require_live: true,
        },
        {
          question: "Stage 9 - Question 2 - upload_file",
          question_type: "upload_file",
          number_of_file_allowed: 3,
          order: 2,
          is_required: true,
        },
      ],
    },
    {
      name: "Stage 10",
      order: 10,
      stage_access: {
        access_type: "organization",
        allow_group: null,
        allow_stage: null,
        allow_user: null,
      },
      questions: [
        {
          question: "Stage 10 - Question 1 - qr_code",
          question_type: "qr_code",
          question_hint: "Stage 10 - Question 1 - qr_code - Question Hint",
          order: 1,
          is_required: true,
        },
        {
          question: "Stage 10 - Question 2 - formula",
          question_type: "formula",
          order: 2,
          is_required: true,
        },
        {
          question: "Stage 10 - Question 3 - user",
          question_type: "user",
          order: 3,
          is_required: true,
        },
      ],
    },
  ],
};
