export interface ICity {
  _id: string
  idCity?: number
  name: string
  code: string
}

export interface ICityFilter {
  filter: {
    name: string
    code: string
  }
}
