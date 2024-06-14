export interface ICads {
    _id?: string;
    species: string; 
    sexy: string; 
    name: string; 
    color: string; 
    size: string; 
    chip: string; 
    intercorrencia: string; 
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
    nis: string;
    createdAt: string;
    updatedAt: string;
}

export interface ICadsFilter {
    filter: {
        name_tutor: string;
        cpf: string
    }
}