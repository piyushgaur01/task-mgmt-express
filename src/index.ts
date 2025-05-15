import express, { Request, Response } from 'express';

import router from './routes/tasks';

const app = express();
const port = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});