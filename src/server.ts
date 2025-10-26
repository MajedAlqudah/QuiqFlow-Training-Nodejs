import express, { Application, Request, Response, NextFunction } from 'express';
import mainRouter from './routes';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import notFound from './middleware/notFound';
import errorHandler from './middleware/error.middleware';


const allowedOrigins = ['http://localhost:3000'];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

class Server {
  private static instance: Server;
  public app: Application;

  private constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.setupErrorHandlers();
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  private config(): void {
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 mins
      max: 100, 
      standardHeaders: true,
      legacyHeaders: false,
      message: 'Too many requests, please try again later.',
    });
    this.app.use(limiter);
  }

  private routes(): void {
    this.app.use('/', mainRouter);
  }

  private setupErrorHandlers(): void {
    this.app.use(notFound);
    this.app.use(errorHandler);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }

}

export default Server.getInstance();
