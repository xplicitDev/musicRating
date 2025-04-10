import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";

export const verifyJwt = asyncHandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      (req.header("Authorization") &&
        req.header("Authorization").replace("Bearer ", "").trim());

    console.log("Token received:", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized request: No token provided");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    console.log("User fetched:", user);

    if (!user) {
      throw new ApiError(401, "Invalid Access Token: User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Error:", error);
    if (error.name === "JsonWebTokenError") {
      throw new ApiError(401, "Invalid Access Token: Malformed JWT");
    } else if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Invalid Access Token: Token expired");
    }
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
