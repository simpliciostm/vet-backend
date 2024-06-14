import mongoose, { model, Schema } from 'mongoose';
import { ICity } from '../models/interface/City';

const City = new Schema({
    name: {
        type: String
    },
    code: {
        type: String
    }
}, {
    timestamps: true
});

export default model<ICity>('City', City);