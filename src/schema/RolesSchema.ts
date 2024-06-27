import mongoose, { model, Schema } from "mongoose"
import { IRole } from "../models/interface/Roles"
import mogooseSequence from 'mongoose-sequence'

const Role = new Schema(
  {
    name_role: {
      type: String,
    },
    code_role: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

Role.plugin(mogooseSequence(mongoose), { inc_field: "idRole" })
export default model<IRole>("Roles", Role)
