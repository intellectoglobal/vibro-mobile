import { put, takeLatest } from "redux-saga/effects";

import {
  checkRefetchToken,
  logoutRequest,
  refetchTokenSuccess,
  refetchTokenSuccessFailure,
} from "@/Redux/reducer/auth/authSlice";
import { SecureStoreKeys, SecureStoreService } from "@/services/secureStore";
import { initialState } from "@/Redux/reducer/auth/authTypes";

function* verifyOtpSaga(action: any): Generator<any, void, any> {
  try {
    const { isAuthenticatedVerify = false, ...restPayload } =
      action?.payload || {};
    let authInfo = (yield SecureStoreService.get(
      SecureStoreKeys.AUTH_INFO
    )) as any;
    if (authInfo === null && !isAuthenticatedVerify) {
      const isAuthenticated = true;
      (yield SecureStoreService.set(SecureStoreKeys.AUTH_INFO, {
        ...restPayload,
        isAuthenticated,
      })) as any;
      authInfo = { ...restPayload, isAuthenticated };
    }
    yield put(refetchTokenSuccess(authInfo || {}));
  } catch (error: any) {
    yield put(refetchTokenSuccessFailure(error.message));
  }
}

function* logoutSaga(action: any): Generator<any, void, any> {
  try {
    yield SecureStoreService.remove(SecureStoreKeys.AUTH_INFO);
    yield put(refetchTokenSuccess(initialState));
  } catch (error: any) {
    yield put(refetchTokenSuccessFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(checkRefetchToken.type, verifyOtpSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
}
