import { ItemServices } from '../services/item.service';
import { ItemSchemaValidate } from '../models/Item';
import { Request, ResponseToolkit } from '@hapi/hapi';

class ItemController {

    create = async (request: Request, h: ResponseToolkit) => {
        const payload = request.payload as { name: string; price: number };

        const { error, value } = ItemSchemaValidate.validate(payload);

        if (error) {
            const formattedError = {
                errors: error.details.map(err => ({
                    field: err.path[0], 
                    message: err.message,
                })),
            };
    
            return h.response(formattedError).code(400);
        }

        const item = await ItemServices.create(value);
        return h.response(item).code(201);
    };

    getAll = async (request: Request, h: ResponseToolkit) => {
        try {
            const items = await ItemServices.getAll();
            return h.response(items).code(200);
        } catch (error) {
            console.error('Error fetching items:', error);
            return h.response({ error: 'Internal Server Error' }).code(500);
        }
    };

    get = async (request: Request, h: ResponseToolkit) => {
        const id = request.params.id;
        const item = await ItemServices.get(id);
        if (!item) {
            return h.response('Item not found').code(404);
        }
        return h.response(item);
    };

    update = async (request: Request, h: ResponseToolkit) => {
        const id = request.params.id;
        const payload = request.payload as { name: string; price: number };

        const { error, value } = ItemSchemaValidate.validate(payload);
        if (error) {
            const formattedError = {
                errors: error.details.map(err => ({
                    field: err.path[0], 
                    message: err.message,
                })),
            };
    
            return h.response(formattedError).code(400);
        }

        const item = await ItemServices.update(id, value);
        return h.response(item).code(200);
    };

    delete = async (request: Request, h: ResponseToolkit) => {
        const id = request.params.id;
        await ItemServices.delete(id);
        return h.response('Item deleted').code(204);
    };

}

export const ItemsController = new ItemController();
