import Hapi, { Server } from '@hapi/hapi';
import { db } from './config/db.config';
import { defineRoutes } from './routes/item.routes'; 

export const initializeServer = async (): Promise<Server> => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost',
  });

  defineRoutes(server);

  await db;

  await server.start();
  console.log(`Server running on ${server.info.uri}`);

  return server;
};

if (require.main === module) {
  initializeServer().catch(err => {
    console.error('Error starting the server:', err);
    process.exit(1);
  });
}