import { Response, Request, NextFunction } from "express";
import Error from "../interfaces/error.interface";

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const statusCode = err.status || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    message,
  });
};

export default errorHandler;