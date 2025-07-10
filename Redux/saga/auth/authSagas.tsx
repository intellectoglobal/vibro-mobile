import { put, takeLatest } from "redux-saga/effects";
import { loginFailure, loginRequest } from "../../reducer/auth/authSlice";
// import { loginApi } from "../../services/api";

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    console.log("handleLogin", action);
    // const { email, password } = action.payload;
    // const response: { token: string } = yield call(loginApi, {
    //   email,
    //   password,
    // });
    // yield put(loginSuccess({ token: response.token }));
  } catch (error: any) {
    yield put(loginFailure(error.message));
  }
}

export function* authSaga() {
  yield takeLatest(loginRequest.type, handleLogin);
}

export default authSaga;
