import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSagas";
import formAssignmentsSaga from "./formAssignmentsSaga/formAssignmentsSaga";
import formReceivedSaga from "./formReceivedSaga/formReceivedSaga";

// Import other sagas as needed

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(formAssignmentsSaga), // ✅ Add this
    fork(formReceivedSaga)
  ]);
}

export default rootSaga;
