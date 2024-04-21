import { model, Schema } from 'mongoose';
import { IRole } from '../interface/Roles';

const Role = new Schema({
    name_role: {
        type: String
    },
    code_role: {
        type: Number
    }
}, {
    timestamps: true
});

export default model<IRole>('Roles', Role);