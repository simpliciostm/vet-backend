export interface ICads {
    _id?: string;
    animal: [{
        species: string;
        sexy: string;
        name: string;
        color: string;
        size: string;
        year: string;
        chip: string;
        intercorrencia: string;
        nis: string;
    }]
    name_tutor: string;
    cpf: string;
    phone: string;
    cep: string;
    city: {
        name: string,
        code: string
    };
    address: string;
    district: string;
    number_residence: number;
    createdAt: string;
    updatedAt: string;
}

export interface ICadsFilter {
    filter: {
        name_tutor: string;
        cpf: string
    }
}