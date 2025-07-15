import { all, fork } from "redux-saga/effects";
import authSaga from "./auth/authSagas";
// Import other sagas as needed

export function* rootSaga() {
  yield all([
    fork(authSaga),
    // Add other sagas here
  ]);
}

export default rootSaga;
