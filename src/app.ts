import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from "body-parser";

import { MONGODB_URI } from './utils/app.secrets';
import routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectionString = `${MONGODB_URI}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(async (conn) => {
    // tslint:disable-next-line:no-console
    console.log('Database connection successful');

  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.error('Database connection error', err);
  });

app.get("/", (req, res) => {
  res.status(200).json({
    app_name: 'Customer Support Ticketing System',
    version: 'v1'
  });
});

app.use(routes);


// catch 404 and forward to error handler - fix later
app.use('*', (req, res, next) => {
  const err = {
    message: 'URL Not Found',
    status: 404
  };
  next(err);
});

interface Error {
  status: number,
  message: string
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message,
  });
});


export default app;
