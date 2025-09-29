import { NextFunction, Request, Response } from "express";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let errStatusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";

  res.status(errStatusCode).json({
    success: false,
    message,
  });
};
export default errorHandler;
