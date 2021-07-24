import 'reflect-metadata'; // We need this in order to use @Decorators

import config from './config';

import express from 'express';
import * as http from "http";
import Logger from './loaders/logger';

// private sockets(): void {
  
// }

async function startServer() {
  const app = express();
  app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

  /**
   * A little hack here
   * Import/Export can only be used in 'top-level code'
   * Well, at least in node 10 without babel and at the time of writing
   * So we are using good old require.
   **/
  await require('./loaders').default({ expressApp: app });

  // this.server = http.createServer(this.app);
  // this.io = require("socket.io").listen(this.server, { origins: '*:*'});

  // this.io.on("connect", (socket: any) => {
  //   console.log("Connected client on port %s.", this.port);
  //   socket.on("message", (m: any) => {
  //     console.log("[server](message): %s", JSON.stringify(m));
  //     this.io.emit("message", m);
  //   });
  // })

  app.listen(config.port, () => {
    Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
  }).on('error', err => {
    Logger.error(err);
    process.exit(1);
  });

}

startServer();
