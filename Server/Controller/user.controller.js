import userModel from "../models/user.model.js";
import verifyEmailModel from "../models/verifyEmail.model.js";
import sendEmail from "../Lib/sendEmail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dirModel from "../models/directory.model.js";

const capitalized = (name) => {
  return name[0].toUpperCase() + name.substring(1);
};

export const getAllUser = async (req, res) => {
  try {
    const users = await userModel.find().select("-__v");

    res.status(200).json({ status: "success", users: users });
  } catch (error) {
    console.log(`get all user has error: ${error}`);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const registerNewUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user)
      return res.status(400).json({
        status: "fail",
        message: "User with this email already exists.",
      });

    console.log({ userName, email, password });
    const newUser = {
      userName: userName,
      email: email,
      password: password,
      verified: false,
    };
    const { _id: id } = await userModel.create(newUser);

    const { token } = await verifyEmailModel.create({
      userID: id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    console.log("token created: " + token);

    const verificationLink = `${process.env.CLIENT_URL}/auth/verify-email?userid=${id}&token=${token}`;

    const emailHtml = `
            <h1>Welcome to Our App!</h1>
            <p>Please click on the link below to verify your email address:</p>
            <a href="${verificationLink}">Verify My Email</a>
            <p>This link will expire in 2 minutes.</p>
        `;

    await sendEmail(email, "Email Verification", emailHtml);
console.log("email sended successfuly");
    //default directory:
    await dirModel.create({
      directoryName: capitalized("main"),
      path: `/directory/main`,
      userID: id,
    });

    console.log("dir created:");

    res.status(201).json({
      status: "success",
      message:
        "Registration successful. Please check your email to verify your account.",
    });
  } catch (error) {
    console.log(`register controller new user has error: ${error}`);
    console.log("error:");
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const verifyUserEmail = async (req, res) => {
  try {
    const { userid, token } = req.validatedQuery;
    const validUser = await userModel.findById(userid);
    if (!validUser)
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid link: User not found." });

    const verifyToken = await verifyEmailModel.findOne({
      userID: userid,
      token: token,
    });

    if (!verifyToken) {
      return res.status(validUser.verified ? 200 : 400).json({
        status: validUser.verified ? "success" : "fail",
        message: validUser.verified
          ? "Your email is already verified. You can sign in."
          : "Invalid or expired verification link.",
      });
    }

    await Promise.all([
      userModel.updateOne({ _id: userid }, { verified: true }),
      verifyEmailModel.deleteOne({ userID: userid }),
    ]);

    res.status(200).json({
      status: "success",
      message: "Email verified successfully. You can now Sign in.",
    });
  } catch (error) {
    console.log(`verify user email has error: ${error}`);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const resendVerificationEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });

    //if user don't sign up
    if (!user)
      return res
        .status(400)
        .json({ status: "fail", message: "you should sign up first." });

    const { _id: id, verified } = user;

    // if user verified
    if (verified === true)
      return res
        .status(400)
        .json({ status: "fail", message: "your email already verified." });

    // remove old tokens
    await verifyEmailModel.deleteMany({ userID: id });

    const { token } = await verifyEmailModel.create({
      userID: id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    const verificationLink = `${process.env.CLIENT_URL}/auth/verify-email?userid=${id}&token=${token}`;

    const emailHtml = `
            <h1>Welcome to Our App!</h1>
            <p>Please click on the link below to verify your email address:</p>
            <a href="${verificationLink}">Verify My Email</a>
            <p>This link will expire in 2 minutes.</p>
        `;

    await sendEmail(email, "Email Verification", emailHtml);

    res.status(201).json({
      status: "success",
      message: "Verification link has been sent to your email.",
    });
  } catch (error) {
    console.log(`redend link email controller has new error: ${error}`);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(404).json({
        status: "fail",
        message: "Authentication failed. you should Signup first",
      });

    if (!user.verified)
      return res.status(400).send("Please verify your email first.");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send("Authentication failed.");

    console.log("valied login");

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).header("Authorization", token).json({
      status: "success",
      info: user.userName,
      message: "Logged in successfully.",
      token: token,
    });
  } catch (error) {
    console.log(`Login User has error: ${error}`);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { userID } = req.user;
    const userInfo = req.body;

    const user = await userModel.findOne({ _id: userID });
    if (!user)
      return res
        .status(404)
        .json({ status: "fail", message: "user not found" });

    const update = await userModel.findByIdAndUpdate(
      { _id: id },
      { ...userInfo },
    );

    res
      .status(200)
      .json({ status: "success", message: "user update successfully" });
  } catch (error) {
    console.log(`update user has error: ${error}`);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;

    await userModel.findByIdAndDelete({ _id: id });

    res
      .status(200)
      .json({ status: "success", message: "user deleted successfully" });
  } catch (error) {
    console.log(`delete user has error: ${error}`);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};
