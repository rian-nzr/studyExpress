import express from 'express';
import { Request, Response } from 'express';
import { PORT } from './secrets';
import rRouter from './routes/index'
import authRouter from './routes/auth';

const app = express();

app.use(express.json());


app.use('/v1', rRouter)

app.get('/', (req: Request, res: Response) => {
  res.send('Application work!');
  console.log('kk');
});

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});