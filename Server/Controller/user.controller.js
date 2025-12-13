import userModel from "../models/user.model.js";
import verifyEmailModel from "../models/verifyEmail.model.js";
import sendEamil from "../Lib/sendEmail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

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
    const port = process.env.PORT || 5500;
    const { userName, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user)
      return res
        .status(400)
        .json({ message: "User with this email already exists." });

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

    const verificationLink = `http://localhost:${port}/api/user/verify-email?userID=${id}&token=${token}`;

    const emailHtml = `
            <h1>Welcome to Our App!</h1>
            <p>Please click on the link below to verify your email address:</p>
            <a href="${verificationLink}">Verify My Email</a>
            <p>This link will expire in 2 minutes.</p>
        `;

    await sendEamil(email, "Email Verification", emailHtml);

    res
      .status(201)
      .send(
        "Registration successful. Please check your email to verify your account."
      );
  } catch (error) {
    console.log(`register new user has error: ${error}`);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};

export const verifyUserEmail = async (req, res) => {
  try {
    const { userID, token } = req.query;
    const validUser = await userModel.findById(userID);
    if (!validUser)
      return res.status(400).send("Invalid link: User not found.");

    const verifyToken = await verifyEmailModel.findOne({
      userID: userID,
      token: token,
    });
    if (!verifyToken) {
      await userModel.deleteOne({ _id: userID });
      return res.status(400).send("Invalid or expired link.");
    }

    await Promise.all([
      userModel.updateOne({ _id: userID }, { verified: true }),
      verifyEmailModel.deleteOne({ userID: userID }),
    ]);

    res.status(200).send("Email verified successfully. You can now log in.");
  } catch (error) {
    console.log(`verify user email has error: ${error}`);
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

    const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res
      .header("Authorization", token)
      .send({ message: "Logged in successfully.", token: token });
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
      { ...userInfo }
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
