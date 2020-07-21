import express from 'express';
import errorHandler from "errorhandler";


import app from "./app";
import { SERVER_PORT, ENVIRONMENT } from './utils/app.secrets';

if(ENVIRONMENT !== 'production'){
  app.use(errorHandler());
}

/**
 * Start Server
 */
const server = app.listen(SERVER_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`App Listening on port ${SERVER_PORT}`);

  // tslint:disable-next-line:no-console
  console.log("  Press CTRL-C to stop\n");
});

export default server;
