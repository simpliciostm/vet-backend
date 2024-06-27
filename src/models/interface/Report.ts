export interface ICastrationReport {
    _id?: string
    idCastration?: number
    animal:
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
}[]