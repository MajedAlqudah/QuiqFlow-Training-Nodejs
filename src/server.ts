import express, { Application } from 'express';
import mainRouter from './routes';

class Server {
  private static instance: Server;
  public app: Application;

  private constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  private config(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use('/', mainRouter);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

export default Server.getInstance();
