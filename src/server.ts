import express, { Express, Request, Response } from 'express';
import { AppDataSource } from './data-source';

AppDataSource.initialize().then(() => {
  const SERVER_PORT = process.env.SERVER_PORT;
  const app: Express = express();

  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    return res.json('tudo certo');
  });

  app.listen(SERVER_PORT, () => {
    console.log('Server rodando em http://localhost:3000');
  });
});
