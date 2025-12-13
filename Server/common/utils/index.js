import userModel from "../../models/user.model.js";

export const validUser = async (id) => {
  const validUser = await userModel.findOne({ _id: id });
  if (!validUser)
    return res
      .status(404)
      .json({ status: "fail", message: "user not't found" });
};
