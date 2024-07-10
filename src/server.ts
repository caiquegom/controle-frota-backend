import cors from 'cors';
import express, { Express, NextFunction, Request, Response } from 'express';
import { AppDataSource } from './data-source';
import router from './routes';

AppDataSource.initialize().then(() => {
  const SERVER_PORT = process.env.SERVER_PORT;
  const app: Express = express();

  app.use(express.json());
  app.use(cors());
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
  app.use('/api', router);

  app.listen(SERVER_PORT, () => {
    console.log(`Server rodando em http://localhost:${SERVER_PORT}`);
  });
});
