import mongoose, { Schema, model } from "mongoose"
import { ICastration } from "../models/interface/Castration"
import mongooseSequence from 'mongoose-sequence'

const CastrationSchema = new Schema(
  {
    animal: {
      species: {
        type: String,
      },
      sexy: {
        type: String,
      },
      name: {
        type: String,
      },
      color: {
        type: String,
      },
      size: {
        type: String,
      },
      year: {
        type: String,
      },
      chip: {
        type: String,
      },
      intercorrencia: {
        type: String,
      },
      nis: {
        type: String,
      },
    },
    date: {
      type: Date,
    },
    name_tutor: {
      type: String,
    },
    cpf: {
      type: String,
    },
    phone: {
      type: String,
    },
    cep: {
      type: String,
    },
    city: {
      name: {
        type: String,
      },
      code: {
        type: String,
      },
    },
    address: {
      type: String,
    },
    district: {
      type: String,
    },
    number_residence: {
      type: Number,
    },
  },
  {
    timestamps: true,
  },
)

CastrationSchema.plugin(mongooseSequence(mongoose), { inc_field: "idCastration" })
export default model<ICastration>("Castration", CastrationSchema)
