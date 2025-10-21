import { Router, Request, Response } from 'express';
import pingRouter from './ping';

const router = Router();

// Home page route
router.get('/', (req: Request, res: Response) => {
  res.status(200).send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Express Server</title>
    </head>
    <body>
      <h1>Welcome to the Express Server!</h1>
      <p>Routes are now separated into their own folder.</p>
      <a href="/ping">Ping</a>
    </body>
    </html>
  `);
});

// Mount the ping router
router.use('/ping', pingRouter);

export default router;
