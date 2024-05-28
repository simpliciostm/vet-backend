export interface ICads {
    _id?: string;
    species: string; 
    sexy: string; 
    name: string; 
    color: string; 
    size: string; 
    chip: string; 
    intercorrencia: string; 
    date: string;
    name_tutor: string; 
    cpf: string; 
    phone: string; 
    city: string; 
    address: string; 
    district: string; 
}

export interface ICadsFilter {
    filter: {
        name_tutor: string;
        cpf: string
    }
}