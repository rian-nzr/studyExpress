import express from 'express';
import { Request, Response } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Application korks!jjjj');
  console.log('kk');
  
});

app.listen(3000, () => {
  console.log('Application started on port 3000!');
  console.log('apm')
});