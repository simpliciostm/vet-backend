import mongoose, { Schema, model } from 'mongoose';
import { IUser } from '../interface/User';

const UserSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    permissions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permissions'
    }
}, {
    timestamps: true
});

export default model<IUser>('User', UserSchema);