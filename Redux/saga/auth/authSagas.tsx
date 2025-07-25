import { put, takeLatest } from "redux-saga/effects";

import {
  checkRefetchToken,
  logoutRequest,
  refetchTokenSuccess,
  refetchTokenSuccessFailure,
} from "@/Redux/reducer/auth/authSlice";
import { setUserProfile, clearUserProfile } from "@/Redux/reducer/user/userSlice";

import { SecureStoreKeys, SecureStoreService } from "@/services/secureStore";
import { initialState } from "@/Redux/reducer/auth/authTypes";

function* verifyOtpSaga(action: any): Generator<any, void, any> {
  try {
    const { isAuthenticatedVerify = false, ...restPayload } = action?.payload || {};

    let authInfo = (yield SecureStoreService.get(SecureStoreKeys.AUTH_INFO)) as any;

    if (authInfo === null && !isAuthenticatedVerify) {
      const isAuthenticated = true;
      authInfo = { ...restPayload, isAuthenticated };
      yield SecureStoreService.set(SecureStoreKeys.AUTH_INFO, authInfo);
    }

    // 👉 Split tokens to auth slice
    yield put(
      refetchTokenSuccess({
        access: authInfo.access,
        refresh: authInfo.refresh,
        module_permissions: authInfo.module_permissions,
        isAuthenticated: true,
      })
    );

    // 👉 Push user profile to user slice
    if (authInfo.user) {
      yield put(setUserProfile(authInfo.user));
    }
  } catch (error: any) {
    yield put(refetchTokenSuccessFailure(error.message));
  }
}

function* logoutSaga(): Generator<any, void, any> {
  try {
    yield SecureStoreService.remove(SecureStoreKeys.AUTH_INFO);
    yield put(refetchTokenSuccess(initialState));
    yield put(clearUserProfile());
  } catch (error: any) {
    yield put(refetchTokenSuccessFailure(error.message));
  }
}

export default function* authSaga() {
  yield takeLatest(checkRefetchToken.type, verifyOtpSaga);
  yield takeLatest(logoutRequest.type, logoutSaga);
}
