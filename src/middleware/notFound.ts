import { type Request, type Response, type NextFunction } from 'express';

const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error('api not found') as Error & { status?: number };
  error.status = 404;

  res.status(404).json({
    message: error.message,
  });
};

export default notFound;