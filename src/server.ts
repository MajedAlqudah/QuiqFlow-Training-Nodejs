import express, {Request , Response} from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Express Server</title>
    </head>
    <body>
      <h1>Welcome to the Express Server!</h1>
      <a href="/ping">Ping</a>
    </body>
    </html>
  `);
});

app.get('/ping', (req : Request, res : Response) => {
  res.status(200).send('pong');
});

export default app;

