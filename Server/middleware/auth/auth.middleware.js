import jwt from "jsonwebtoken";
import userModel from "../../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer"))
      return res.status(401).json({
        status: "fail",
        message: "Access Denied. No token provided or invalid format",
      });

    const token = authHeader.substring(7);
    if (!token)
      return res.status(401).json({
        status: "fail",
        message: "Access Denied. Token is missing.",
      });
    const secretKey = process.env.JWT_SECRET_KEY;
    const { userID } = jwt.verify(token, secretKey);

    const currentUser = await userModel
      .findById({ _id: userID })
      .select("-password");
console.log(userID);

    if (!currentUser)
      return res.status(401).json({
        status: "fail",
        message: "'Invalid Token. User does not exist.",
      });

    req.user = currentUser;
    next();
  } catch (error) {
    console.log(`verify token middleware has error: ${error}`);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
};

export default verifyToken;
