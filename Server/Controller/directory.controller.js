import { validUser } from "../common/utils/index.js";
import dirModel from "../models/directory.model.js";

export const listDirs = async (req, res) => {
  try {
    const { userID } = req.user;

    validUser(userID);

    const dirList = await dirModel.find({ userID: userID }).select("-__v");

    return res.status(200).json({ status: "success", directories: dirList });
  } catch (error) {
    console.error({ message: "list dir have error", error: error });
    return res
      .status(500)
      .json({ status: "fail", message: "Internal Server Error" });
  }
};

export const createDir = async (req, res) => {
  try {
    const { userID } = req.params;
    const { directoryName } = req.body;

    validUser(userID);

    const createDir = await dirModel.create({
      directoryName,
      path: `/directory/${directoryName}`,
      userID: userID,
    });

    return res.status(201).json({
      status: "success",
      message: "dir added successfully",
      directory: createDir,
    });
  } catch (error) {
    console.error({ message: "create dir have error", error: error });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateDir = async (req, res) => {
  try {
    const { userID } = req.user;
    const { id } = req.params;
    const paylaoud = req.body;

    const updatedDirectory = await dirModel.findByIdAndUpdate(
      { _id: id, userID: userID },
      paylaoud,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedDirectory)
      return res.status(404).json({ message: "Directory not found" });

    return res.status(200).json({
      status: "success",
      message: "dir update successfully",
      directory: updatedDirectory,
    });
  } catch (error) {
    console.error({ message: "update dir have error", error: error });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteDir = async (req, res) => {
  try {
    const { userID } = req.user;
    const { id } = req.params;

    const deleted = await dirModel.findByIdAndDelete({
      _id: id,
      userID: userID,
    });
    if (!deleted)
      return res.status(404).json({
        status: "fail",
        message: "Directory with this id not found",
      });

    return res.status(200).json({
      status: "success",
      message: "dir deleted successfully",
    });
  } catch (error) {
    console.error({ message: "delete dir have error", error: error });
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
