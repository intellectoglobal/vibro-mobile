import { post } from ".";
import { AUTH_REQUEST_OPT, AUTH_VERIFY_OTP } from "./constants";

export const Api = {
  async verifyEmail(data: any): Promise<string | void> {
    try {
      const res = (await post(AUTH_REQUEST_OPT, data)) as any;
      return res;
    } catch (error: any) {
      let message = "";
      // console.log("error?.data", error?.data?.email[0]);
      if (error?.data) {
        message = error?.data?.email[0];
      } else {
        message = error?.data?.message || error?.message;
      }
      return { message, isAxiosError: error?.isAxiosError } as any;
    }
  },

  async verifyOTP(data: any): Promise<string | void> {
    try {
      const res = (await post(AUTH_VERIFY_OTP, data)) as any;
      return res;
    } catch (error: any) {
      let message = "";
      if (error?.data) {
        message = error?.data?.error;
      } else {
        message = error?.data?.message || error?.message;
      }
      return { message, isAxiosError: error?.isAxiosError } as any;
    }
  },

  async verifyOtp(otp: any): Promise<string> {
    // Implement your API call to verify OTP
    console.log("Verifying OTP:", otp);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "mock-auth-token";
  },
};
