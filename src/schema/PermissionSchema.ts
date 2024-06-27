import mongoose, { model, Schema } from "mongoose"
import { IPermission } from "../models/interface/Permission"
import mongooseSequence from 'mongoose-sequence'

const Permission = new Schema(
  {
    name_permission: {
      type: String,
    },
    permissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Roles",
      },
    ],
  },
  {
    timestamps: true,
  },
)

Permission.plugin(mongooseSequence(mongoose), { inc_field: "idPermission" })
export default model<IPermission>("Permissions", Permission)
