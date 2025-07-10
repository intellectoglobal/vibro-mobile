export interface AuthState {
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginSuccessPayload {
  token: string;
}
