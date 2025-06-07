import express from 'express';
import { randomUUID } from 'node:crypto';

const app = express();

app.use((req, res, next) => {
  req.id = randomUUID();
  next(new Error('Test Error'));
});

app.get('/', (req, res, next) => {
  res.json({
    message: 'Hello world',
    id: req.id,
  });
});

app.use((error, req, res, next) => {
  res.json({
    errorMessage: error.message,
    id: req.id,
  });
});

app.listen(3000, () => {
  console.log('Server is listening to port 3000');
});
