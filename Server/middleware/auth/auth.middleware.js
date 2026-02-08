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
    if (!secretKey) {
      throw new Error("JWT_SECRET_KEY is not defined");
    }
    
    const decode = jwt.verify(token, secretKey);

    const currentUser = await userModel
      .findById({ _id: decode.userID })
      .select("-password");

    if (!currentUser)
      return res.status(401).json({
        status: "fail",
        message: "'Invalid Token. User does not exist.",
      });

    req.user = currentUser._id;
    console.log("auth.mid ok");
    next();
  } catch (error) {
    console.log(error.name);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        status: "fail",
        message: "Token expired. Please login again.",
      });
    }

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        status: "fail",
        message: "Invalid token.",
      });
    }
    console.log(`verify token middleware has error: ${error}`);
    res.status(500).json({ status: "fail", message: "Internal server error" });
  }
};

export default verifyToken;
