import mongoose, { Schema, model } from 'mongoose';
import { ICads } from '../models/interface/Cads';

const CadsSchema = new Schema({
    species: {
        type: String
    },
    sexy: {
        type: String
    },
    name: {
        type: String
    },
    color: {
        type: String
    },
    size: {
        type: String
    },
    chip: {
        type: String
    },
    intercorrencia: {
        type: String
    },
    date: {
        type: Date
    },
    name_tutor: {
        type: String
    },
    cpf: {
        type: String
    },
    phone: {
        type: String
    },
    cep: {
        type: String
    },
    city: {
        name: {
            type: String
        },
        code: {
            type: String
        }
    },
    address: {
        type: String
    },
    district: {
        type: String
    },
    nis: {
        type: String
    }
}, {
    timestamps: true
});

export default model<ICads>('Cads', CadsSchema);