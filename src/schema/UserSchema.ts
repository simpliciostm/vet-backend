import mongoose, { Schema, model } from "mongoose"
import { IUser } from "../models/interface/User"
import mongooseSequence from 'mongoose-sequence'

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    permissions: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permissions",
    },
  },
  {
    timestamps: true,
  },
)

UserSchema.plugin(mongooseSequence(mongoose), { inc_field: "idUser" })
export default model<IUser>("User", UserSchema)
