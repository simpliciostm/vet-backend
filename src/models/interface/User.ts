export interface IUser {
  _id: string
  idUser?: number
  email: string
  password: string
  name: string
  permissions: string
}

export interface IUserFilter {
  filter: {
    name: string
    email: string
  }
}
