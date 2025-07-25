import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../reducer/auth/authSlice";
import userReducer from "../reducer/user/userSlice"; // ✅ Import the new user slice

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer, // ✅ Add user slice to root reducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
