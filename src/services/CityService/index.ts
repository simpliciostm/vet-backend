import { ICity, ICityFilter } from "../../models/interface/City"
import { CityRepository } from "../../repository/CityRepository"

export class CityService {
  public async getCityListService(
    query: ICityFilter,
    limit: number,
    skip: number,
  ) {
    try {
      let operationPromise: any

      const cityRepository = new CityRepository()
      operationPromise = await cityRepository.getCityListRepository(
        query,
        limit,
        skip,
      )
      if (!operationPromise)
        return { msg: "Erro getCityListService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async insertCityService(city: ICity) {
    try {
      let operationPromise: any

      const cityRepository = new CityRepository()
      operationPromise = await cityRepository.insertCityRepository(city)
      if (!operationPromise) return { msg: "Erro insertCityService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async deleteCityService(id: string) {
    try {
      let operationPromise: any

      const cityRepository = new CityRepository()
      operationPromise = await cityRepository.deleteCityRepository(id)
      if (!operationPromise) return { msg: "Erro deleteCityService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async updateCityService(id: string, city: ICity) {
    try {
      let operationPromise: any

      const cityRepository = new CityRepository()
      operationPromise = await cityRepository.updateCityRepository(id, city)
      if (!operationPromise) return { msg: "Erro updateCityService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async getCityService(query: string) {
    try {
      let operationPromise: any

      const cityRepository = new CityRepository()
      operationPromise = await cityRepository.getCityRepository(query)
      if (!operationPromise) return { msg: "Erro getCityService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }
}
