import { createAsyncThunk } from "@reduxjs/toolkit";
import { getEmailVerify, postUser, resendEmail, signin } from "./user-service";

export const signupUser = createAsyncThunk(
  "user/signup",
  async ({ data, URL }, { rejectWithValue }) => {
    try {
      const res = await postUser(data, URL);

      //set countdown for resend email
      const cooldownUntil = Date.now() + 120 * 1000;
      localStorage.setItem("cooldownUntil", cooldownUntil);
      return res;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Singup Failed.",
      });
    }
  }
);

export const verifyUser = createAsyncThunk(
  "user/verifyEmail",
  async (URL, { rejectWithValue }) => {
    try {
      const res = await getEmailVerify(URL);

      return res;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Verify Email Failed.",
      });
    }
  }
);

export const reSendVerifyEmail = createAsyncThunk(
  "user/resendVerifyEmail",
  async ({ data, URL }, { rejectWithValue }) => {
    try {
      const res = await resendEmail(data, URL);

      //set countdown for resend email
      const remaining = Math.max(
        Math.floor((res.rateLimitReset - Date.now()) / 1000),
        0
      );
      localStorage.setItem("cooldownUntil", remaining);

      return { message: res.message, rateLimitReset: res.rateLimitReset };
    } catch (error) {
      if (error.response?.status === 429) {
        console.log(error.response.headers);
        return rejectWithValue({
          type: "RATE_LIMIT",
          message: error.response?.data?.message,
          rateLimitReset: error.response?.headers?.["ratelimit-reset"]
            ? Number(error.response.headers["ratelimit-reset"])
            : null,
        });
      }

      return rejectWithValue({
        type: "GENERIC_ERROR",
        message:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  }
);

export const signinUser = createAsyncThunk(
  "user/signin",
  async ({ data, URL }, { rejectWithValue }) => {
    try {
      const res = await signin(data, URL);

      localStorage.setItem("token",res.token)

      return res;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Singip Failed.",
      });
    }
  }
);