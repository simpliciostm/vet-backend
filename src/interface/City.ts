export interface ICity {
    _id: string;
    name: string;
    code: string;
}

export interface ICityFilter {
    filter: {
        name: string;
        code: string
    }
}
