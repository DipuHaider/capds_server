import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';

let server: Server;

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`CAPDS_Server is listening on port ${config.port} 😃`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', (err) => {
  console.log(`unhandledRejection is detected, shutting Down ... : ${err}`);
  if (server) {
    server.close(() => {
      console.log('Server closed gracefully.');
      process.exit(1);
    });
  }
});

process.on('uncaughtException', (err) => {
  console.log(`uncaughtException is detected, shutting Down ... : ${err}`);
  process.exit(1);
});
