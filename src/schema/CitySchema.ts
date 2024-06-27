import mongoose, { model, Schema } from "mongoose"
import { ICity } from "../models/interface/City"
import mongooseSequence from 'mongoose-sequence'

const City = new Schema(
  {
    name: {
      type: String,
    },
    code: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
)

City.plugin(mongooseSequence(mongoose), { inc_field: "idCity" })
export default model<ICity>("City", City)
