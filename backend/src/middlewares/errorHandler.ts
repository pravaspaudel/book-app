import { NextFunction, Request, Response } from "express";
import { success, ZodError } from "zod";

const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let errStatusCode = err.statusCode || 500;
  let message = err.message || "something went wrong";

  if (err instanceof ZodError) {
    message = `errorfromzod ${err.issues[0].message}`;
  }

  res.status(errStatusCode).json({
    success: false,
    message,
  });
};
export default errorHandler;
