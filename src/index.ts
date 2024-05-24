import express from 'express';
import { Request, Response } from 'express';
import { PORT } from './secrets';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Application work!');
  console.log('kk');

});

app.listen(PORT, () => {
  console.log(`Application started on port ${PORT}!`);
});