import { Server } from '@hapi/hapi';
import { ItemsController } from '../controllers/item.controller';

export const defineRoutes = (server: Server) => {
  server.route({
    method: 'GET',
    path: '/ping',
    handler: async (request, h) => {
        return {
            ok: true
        }
    }
})  
    server.route({
        method: 'POST',
        path: '/items',
        handler: ItemsController.create,
    });

    server.route({
        method: 'GET',
        path: '/items',
        handler: ItemsController.getAll,
    });

    server.route({
        method: 'GET',
        path: '/items/{id}',
        handler: ItemsController.get,
    });

    server.route({
        method: 'PUT',
        path: '/items/{id}',
        handler: ItemsController.update,
    });

    server.route({
        method: 'DELETE',
        path: '/items/{id}',
        handler: ItemsController.delete,
    });
};
