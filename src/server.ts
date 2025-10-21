import express, { Application } from 'express';
import mainRouter from './Routes';

class Server {
  private static instance: Server;
  public app: Application;

  private constructor() {
    this.app = express();
    this.routes();
  }

  public static getInstance(): Server {
    if (!Server.instance) {
      Server.instance = new Server();
    }
    return Server.instance;
  }

  private routes(): void {
    // Use the main router for all incoming requests
    this.app.use('/', mainRouter);
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

export default Server.getInstance();
