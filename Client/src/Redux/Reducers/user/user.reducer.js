import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  reSendVerifyEmail,
  signinUser,
  signupUser,
  verifyUser,
} from "./user.thunk";

const { IDLE, LOADING, SUCCEEDED, FAILED } = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
};

const token = localStorage.getItem("token");

const initialState = {
  data: { userName: "" },
  token: token || "",
  verifyEmail: {
    status: IDLE,
    successMessage: null,
    error: null,
  },
  signup: {
    status: IDLE,
    successMessage: null,
    error: null,
    cooldownUntil: null,
  },
  signin: {
    status: IDLE,
    successMessage: null,
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    cleanSignin: (state) => {
      state.signin.status = IDLE;
      state.signin.status = null;
      state.signin.error = null;
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    //sign up fulfilled:
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.signup.status = SUCCEEDED;
      state.signup.error = null;
      state.signup.successMessage = action.payload.message;
      state.signup.cooldownUntil = null;
    });
    // resend verify email fulfilled:
    builder.addCase(reSendVerifyEmail.fulfilled, (state, action) => {
      state.signup.status = SUCCEEDED;
      state.signup.successMessage = action.payload.message;
      state.signup.error = null;
      state.signup.cooldownUntil = action.payload.rateLimitReset;
    });

    //verify email pending:
    builder.addCase(verifyUser.pending, (state) => {
      state.verifyEmail.status = LOADING;
      state.verifyEmail.successMessage = null;
      state.verifyEmail.error = null;
    });
    //verify email fulfilled:
    builder.addCase(verifyUser.fulfilled, (state, action) => {
      state.verifyEmail.status = SUCCEEDED;
      state.verifyEmail.successMessage = action.payload.message;
      state.verifyEmail.error = null;
    });
    //verify email rejected:
    builder.addCase(verifyUser.rejected, (state, action) => {
      state.verifyEmail.status = FAILED;
      state.verifyEmail.successMessage = null;
      state.verifyEmail.error = action.payload.message;
    });

    // sign in pendig:
    builder.addCase(signinUser.pending, (state) => {
      state.signin.status = LOADING;
      state.signin.successMessage = null;
      state.signin.error = null;
    });
    // sign in fulfilled:
    builder.addCase(signinUser.fulfilled, (state, action) => {
      state.data.userName = action.payload.info;
      state.token = action.payload.token;
      state.signin.status = SUCCEEDED;
      state.signin.successMessage = action.payload.message;
      state.signin.error = null;
    });
    // sign in rejected:
    builder.addCase(signinUser.rejected, (state, action) => {
      state.signin.status = FAILED;
      state.signin.successMessage = null;
      state.signin.error = action.payload.message;
    });

    //sign up and resend verify email pending:
    builder.addMatcher(
      isAnyOf(signupUser.pending, reSendVerifyEmail.pending),
      (state) => {
        state.signup.status = LOADING;
        state.signup.error = null;
        state.signup.successMessage = null;
        state.signup.cooldownUntil = null;
      },
    );
    //sign up and resend verify email rejected:
    builder.addMatcher(
      isAnyOf(signupUser.rejected, reSendVerifyEmail.rejected),
      (state, action) => {
        state.signup.status = FAILED;
        state.signup.error = action.payload.message;
        state.signup.successMessage = null;
        state.signup.cooldownUntil = null;

        if (action.payload.type === "RATE_LIMIT") {
          state.signup.cooldownUntil = action.payload.rateLimitReset;
        }
      },
    );
  },
});
export const { cleanSignin } = userSlice.actions;
export default userSlice.reducer;
