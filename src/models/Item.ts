import { Schema, model } from 'mongoose';
import Joi from 'joi';

export const ItemSchemaValidate = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required().positive(),
});

interface IItem {
  id: String;
  name: string;
  price: number;
}

const itemSchema = new Schema<IItem>({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min:0,
  },
});

export const Item = model<IItem>('Item', itemSchema);