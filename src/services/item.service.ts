import { Item } from '../models/Item'
export class ItemService {

    async create(data: any) {
        try {
            const newItem = await Item.create(data)
            newItem.id = newItem._id
            return newItem

        } catch (error) {
            throw error
        }
    }

    async getAll() {
        try {
            const items = await Item.find({});
            return items;
        } catch (error) {
            console.error('Error fetching items from database:', error);
            throw new Error('Unable to fetch items');
        }
    }
    
    async get(id: string) {
      
        try {
            const item = await Item.findById(id)
            if (!item) {
                return 'Item not available'
            }
            return item

        } catch (error) {
            throw error
        }
    }

    async update(id: string, data: any) {
        try {
                const Itemz = await Item.findByIdAndUpdate({_id:id}, data, {new: true})                
                if(!Itemz){
                    return "Item not available"
                }
                return Itemz          
        } catch (error) {
            throw error
        }
    }

    async delete(id: string) {
        try {
            const item = await Item.findByIdAndDelete(id)
            if (!item) {
                return 'Item not available'
            }
        } catch (error) {
            throw error
        }
    }
}

export const ItemServices = new ItemService()