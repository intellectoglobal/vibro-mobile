import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducer/auth/authSlice";
// Import other reducers as needed

const rootReducer = combineReducers({
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
