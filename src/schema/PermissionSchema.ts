import mongoose, { model, Schema } from "mongoose"
import { IPermission } from "../interface/Permission"

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

export default model<IPermission>("Permissions", Permission)
