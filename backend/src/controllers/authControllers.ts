import { Request, Response, NextFunction } from "express";
import { userSchema, UserType } from "../middlewares/userValidator";

const signUp = async (
  req: Request<{}, {}, UserType>,
  res: Response,
  next: NextFunction
) => {
  try {
    const validate = userSchema.parse(req.body);

    const { username, email, password } = req.body;
  } catch (err) {
    next(err);
  }
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    next(err);
  }
};

export { signUp };
