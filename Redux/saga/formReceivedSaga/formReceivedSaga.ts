// Redux/sagas/formAssignmentsSaga.ts
import { put, takeLatest } from "redux-saga/effects";
import { FETCH_FORM_RECEIVED } from "@/Redux/actions/formReceivedActions";
import { setFormReceived } from "@/Redux/reducer/formReceived/formReceivedSlice";

function* fetchFormReceivedSaga(action: any): Generator<any, void, any> {
  try {
    const rawData = action.payload;


    const transformedData = rawData.map((item: any) => ({
      formId: item.form.id,
      stageId: item.stage_id,
      stageAssignmentUUID: item.assignment_uuid,
      formSubmissionId: item.form_submission_id,
    }));

    yield put(setFormReceived(transformedData));
  } catch (error: any) {
    console.error("Error in fetchFormReceivedSaga:", error.message);
  }
}

export default function* formReceivedSaga() {
  yield takeLatest(FETCH_FORM_RECEIVED, fetchFormReceivedSaga);
}
