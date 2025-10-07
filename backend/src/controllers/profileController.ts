import { NextFunction, Response } from "express";
import { AuthRequest } from "../middlewares/authMiddlewares";
import userModel from "../models/userModels";

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("this is getprofile controller");
    console.log(req.user);
    const userId = req.user?.id;

    if (!userId) {
      return res.status(400).json({
        message: "invalid token",
      });
    }

    const user = await userModel.findById(userId).select("-password"); //'-' deselects password
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    next();
  }
};
