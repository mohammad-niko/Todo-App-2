import userModel from "../../models/user.model.js";

export const validUser = async (id) => {
  const validUser = await userModel.findOne({ _id: id });
  return validUser;
};
