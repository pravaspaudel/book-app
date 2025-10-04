import { Request, Response, NextFunction } from "express";
import {
  loginSchema,
  loginType,
  userSchema,
  UserType,
} from "../middlewares/userValidator";
import bcrypt from "bcrypt";
import userModel from "../models/userModels";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig";
import { Types } from "mongoose";

type resType = {
  success: boolean;
  message: string;
  result?: UserType & { _id: Types.ObjectId };
  token?: string;
};

const signUp = async (
  req: Request<{}, {}, UserType>,
  res: Response<resType>,
  next: NextFunction
) => {
  try {
    console.log("signup hit");
    console.log(userSchema.parse(req.body));
    const validate = userSchema.parse(req.body);

    const { username, email, password } = validate;

    const findExistingUser = await userModel.findOne({
      email,
    });

    console.log(`FindExisting User returns ${findExistingUser}`);

    if (findExistingUser) {
      return res.status(409).json({
        success: false,
        message: "user already exists",
      });
    }

    const salt_round = 10;
    const salt = await bcrypt.genSalt(salt_round);

    const hashedPassword = await bcrypt.hash(password, salt);

    const createdUser = await userModel.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: createdUser._id, username: createdUser.username },
      JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.status(201).json({
      success: true,
      message: "user created successfully",
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

const login = async (
  req: Request<{}, {}, loginType>,
  res: Response<resType>,
  next: NextFunction
) => {
  try {
    const validateLogin = loginSchema.parse(req.body);

    const { email, password } = validateLogin;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.status(201).json({
      success: true,
      message: "Login successful",
      result: user.toObject(),
      token,
    });
  } catch (err) {
    next(err);
  }
};

export { signUp, login };
