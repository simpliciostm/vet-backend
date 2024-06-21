import UserSchema from "../../schema/UserSchema"
import { IUser, IUserFilter } from "../../models/interface/User"
import bcrypt from "bcrypt"

export class UserRepository {
  public async getUserListRepository(
    query: IUserFilter,
    limit: number,
    skip: number,
  ) {
    try {
      let operationPromise: any
      const filter = this.filterFormat(query)
      let users: any

      if (filter) {
        operationPromise = await UserSchema.find(filter).populate(
          "permissions",
          "name_permission",
        )
        if (!operationPromise || operationPromise.length <= 0)
          return { msg: "Não existe usuário com esse filtro", status: 0 }
        users = operationPromise ? operationPromise : null
      } else {
        operationPromise = await UserSchema.find({})
          .populate("permissions", "name_permission")
          .skip(skip)
          .limit(limit)
        if (!operationPromise || operationPromise.length <= 0)
          return { msg: "Não existe Usuário cadastrado", status: 0 }
        users = operationPromise ? operationPromise : null
      }

      operationPromise = await UserSchema.find()
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: `Não existe Usuário cadastrado`, status: 0 }
      const totalUsers: number = operationPromise.length

      const columns = ["Ações", "Nome", "Email", "Tipo de Usuário"]

      return {
        msg: "Usuarios cadastrados",
        status: 1,
        data: users,
        columns: columns,
        total: totalUsers,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async insertUserRepository(user: IUser) {
    try {
      if (!user) return { msg: "User params undefined or null", status: 0 }

      let operationPromise: any

      operationPromise = await UserSchema.find({ email: user.email })
      if (!operationPromise || operationPromise.length >= 1)
        return { msg: "Já existe um usuário com esse email", status: 0 }

      const salt = 7
      const password = bcrypt.hashSync(user.password, salt)
      user.password = password

      operationPromise = await UserSchema.create(user)
      if (!operationPromise) return { msg: `Erro ao criar Usuario`, status: 0 }

      return {
        msg: `Usuario criado com sucesso`,
        status: 1,
        data: operationPromise,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async deleteUserRepository(id: string) {
    try {
      if (!id) return { msg: `Id undefined or null`, status: 0 }

      let operationPromise: any

      operationPromise = await UserSchema.find({ _id: id })
      if (!operationPromise || operationPromise <= 0)
        return { msg: "Não existe usuario com esse id", status: 0 }

      operationPromise = await UserSchema.findOneAndDelete({ _id: id })
      if (!operationPromise)
        return { msg: `Erro ao excluir Usuario`, status: 0 }

      return {
        msg: "Usuario deleteado com sucesso",
        status: 1,
        data: operationPromise,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async updateUserRepository(id: string, user: IUser) {
    try {
      if (!id) return { msg: `Id undefined or null`, status: 0 }

      let operationPromise: any

      operationPromise = await UserSchema.findOne({ _id: id })
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: `Não existe usuario com esse id`, status: 0 }
      const result: IUser = operationPromise ? operationPromise : null

      if (result) {
        let changePassword = false

        if (user) {
          if (user.password) changePassword = true

          if (changePassword) {
            const salt = 7
            const password = bcrypt.hashSync(user.password, salt)
            user.password = password
          }
        }

        operationPromise = await UserSchema.findOneAndUpdate(
          { _id: id },
          {
            email: user.email ? user.email : result.email,
            name: user.name ? user.name : result.name,
            password: changePassword ? user.password : result.password,
            permissions: user.permissions ? user.permissions : user.permissions,
          },
        )

        if (!operationPromise)
          return { msg: `Erro ao atualizar usuario`, status: 0 }

        operationPromise = await UserSchema.findOne({ _id: id })
        if (!operationPromise)
          return { msg: `Erro ao buscar usuario atualizado`, status: 0 }
      }
      return {
        msg: `Usuario atualizado com sucesso`,
        status: 1,
        data: operationPromise,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async getUserRepository(idUser: string) {
    try {
      let operationPromise: any

      operationPromise = await UserSchema.findOne({ _id: idUser }).populate(
        "permissions",
      )
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: "Não existe Usuário cadastrado", status: 0 }

      return { msg: "Usuario encontrado", status: 1, data: operationPromise }
    } catch (err) {
      return { msg: err }
    }
  }

  private filterFormat(query: IUserFilter) {
    let filter: any
    if (query.filter.name || query.filter.email) {
      if (query.filter.name.length >= 1 && query.filter.email.length >= 1) {
        filter = {
          $and: [{ name: query.filter.name }, { email: query.filter.email }],
        }
      } else {
        filter = {
          $or: [{ name: query.filter.name }, { email: query.filter.email }],
        }
      }
    }

    return filter
  }
}
