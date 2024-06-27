export interface ICastration {
  _id?: string
  idC?: number,
  animal: [
    {
      species: string
      sexy: string
      name: string
      color: string
      size: string
      year: string
      chip: string
      intercorrencia: string
      nis: string
    },
  ]
  name_tutor: string
  cpf: string
  phone: string
  cep: string
  city: {
    name: string
    code: string
  }
  address: string
  district: string
  number_residence: number
  createdAt: string
  updatedAt: string
}

export interface ICastrationFilter {
  filter: {
    idCastration: string
    name_tutor: string
    cpf: string
    city: string
    tutor: string
  }
}
