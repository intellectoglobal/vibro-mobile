import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSagas";
import formAssignmentsSaga from "./formAssignmentsSaga/formAssignmentsSaga";

// Import other sagas as needed

export function* rootSaga() {
  yield all([
    fork(authSaga),
    fork(formAssignmentsSaga), // ✅ Add this
  ]);
}

export default rootSaga;
