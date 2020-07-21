import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import mongoose from 'mongoose';
import bodyParser from "body-parser";

import { MONGODB_URI, DATABASE_NAME } from './utils/app.secrets';
// import * as routes from './routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connectionString = `${MONGODB_URI}/${DATABASE_NAME}?retryWrites=true&w=majority`;

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then((conn) => {
    // tslint:disable-next-line:no-console
    console.log('Database connection successful');
  })
  .catch((err) => {
    // tslint:disable-next-line:no-console
    console.error('Database connection error');
  });

app.get("/", (req, res) => {
  res.status(200).json({
    app_name: 'Customer Support Ticketing System',
    version: 'v1'
  });
});

// app.use(routes);

// catch 404 and forward to error handler - fix later
app.use('*', (req, res, next) => {
  const err = {
    message: 'URL Not Found',
    status: 404
  };
  next(err);
});


// app.use((err, req: Request, res: Response, next: NextFunction) => {
//   res.status(err.status || 500).json({
//     errors: {
//       message: err.message,
//     },
//   });
// });


export default app;
