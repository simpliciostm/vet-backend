import City from "../../schema/CitySchema"
import { ICity, ICityFilter } from "../../models/interface/City"

export class CityRepository {
  public async getCityListRepository(
    query: ICityFilter,
    limit: number,
    skip: number,
  ) {
    try {
      let operationPromise: any
      const filter = this.filterFormat(query)
      let cads: any

      if (filter) {
        operationPromise = await City.find(filter)
        if (!operationPromise || operationPromise.length <= 0)
          return { msg: "Não existe cidade com esse filtro", status: 0 }
        cads = operationPromise ? operationPromise : null
      } else {
        operationPromise = await City.find({}).skip(skip).limit(limit)
        if (!operationPromise || operationPromise.length <= 0)
          return { msg: "Não existe cidade cadastrado", status: 0 }
        cads = operationPromise ? operationPromise : null
      }

      operationPromise = await City.find()
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: `Não existe cidade cadastrado`, status: 0 }
      const totalCads: number = operationPromise.length

      const columns = ["Cidade", "Estado", "Criado", "Atualizado", "Acões"]
      return {
        msg: "Cidades cadastradas",
        status: 1,
        data: cads,
        columns: columns,
        total: totalCads,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async insertCityRepository(city: ICity) {
    try {
      if (!city) return { msg: "City params undefined or null", status: 0 }

      let operationPromise: any

      let filter = {
        $and: [{ name: city.name }, { code: city.code }],
      }

      operationPromise = await City.find(filter)
      if (!operationPromise || operationPromise.length >= 1)
        return { msg: "Já existe uma Cidade com esse nome", status: 0 }

      operationPromise = await City.create(city)
      if (!operationPromise) return { msg: `Erro ao criar Cidade`, status: 0 }

      return {
        msg: `Cidade criada com sucesso`,
        status: 1,
        data: operationPromise,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async deleteCityRepository(id: string) {
    try {
      if (!id) return { msg: `Id undefined or null`, status: 0 }

      let operationPromise: any

      operationPromise = await City.find({ _id: id })
      if (!operationPromise || operationPromise <= 0)
        return { msg: "Não existe uma Cidade com esse id", status: 0 }

      operationPromise = await City.findOneAndDelete({ _id: id })
      if (!operationPromise) return { msg: `Erro ao excluir Cidade`, status: 0 }

      return {
        msg: "Cidade deleteada com sucesso",
        status: 1,
        data: operationPromise,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async updateCityRepository(id: string, city: ICity) {
    try {
      if (!id) return { msg: `Id undefined or null`, status: 0 }

      let operationPromise: any

      operationPromise = await City.find({ _id: id })
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: `Não existe Cidade com esse id`, status: 0 }

      operationPromise = await City.findOneAndUpdate(
        { _id: id },
        {
          name: city.name,
          code: city.code,
        },
      )
      if (!operationPromise)
        return { msg: `Erro ao atualizar Cidade`, status: 0 }

      operationPromise = await City.findOne({ _id: id })
      if (!operationPromise)
        return { msg: `Erro ao buscar Cidade atualizada`, status: 0 }

      return {
        msg: `Cidade atualizada com sucesso`,
        status: 1,
        data: operationPromise,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async getCityRepository(idCity: string) {
    try {
      let operationPromise: any

      operationPromise = await City.findOne({ _id: idCity })
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: "Não existe registro cadastrado", status: 0 }

      return { msg: "Registro encontrado", status: 1, data: operationPromise }
    } catch (err) {
      return { msg: err }
    }
  }

  private filterFormat(query: ICityFilter) {
    let filter: any
    if (query.filter.name || query.filter.code) {
      if (query.filter.name.length >= 1 && query.filter.code.length >= 1) {
        filter = {
          $and: [{ code: query.filter.code }],
        }
      } else {
        filter = {
          $or: [{ name: query.filter.name }, { code: query.filter.code }],
        }
      }
    }

    return filter
  }
}
