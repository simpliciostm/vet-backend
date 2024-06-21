import { ICads, ICadsFilter } from "../../models/interface/Cads"
import { RegisterCadsRepository } from "../../repository/RegisterCadsRepository"

export class RegisterCadsService {
  public async getCadsListService(
    filter: ICadsFilter,
    limit: number,
    skip: number,
  ) {
    try {
      let operationPromise: any

      const userRepository = new RegisterCadsRepository()
      operationPromise = await userRepository.getCadsListRepository(
        filter,
        limit,
        skip,
      )
      if (!operationPromise)
        return { msg: "Erro getCadsListService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async insertCadsrService(cads: ICads) {
    try {
      let operationPromise: any

      const cadsRepository = new RegisterCadsRepository()
      operationPromise = await cadsRepository.insertCadsRepository(cads)
      if (!operationPromise)
        return { msg: "Erro insertCadsrService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async deleteCadsService(id: string) {
    try {
      let operationPromise: any

      const cadsRepository = new RegisterCadsRepository()
      operationPromise = await cadsRepository.deleteCadsrRepository(id)
      if (!operationPromise) return { msg: "Erro deleteCadsService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async updateCadsService(id: string, cads: ICads) {
    try {
      let operationPromise: any

      const cadsRepository = new RegisterCadsRepository()
      operationPromise = await cadsRepository.updateCadsRepository(id, cads)
      if (!operationPromise) return { msg: "Erro updateCadsService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async getCadsService(query: string) {
    try {
      let operationPromise: any

      const cadsRepository = new RegisterCadsRepository()
      operationPromise = await cadsRepository.getCadsRepository(query)
      if (!operationPromise) return { msg: "Erro getCadsService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async getInfoCadsService() {
    try {
      let operationPromise: any

      const cadsRepository = new RegisterCadsRepository()
      operationPromise = await cadsRepository.getInfosCadsRepository()
      if (!operationPromise)
        return { msg: "Erro getInfoCadsService", status: 0 }

      return operationPromise
    } catch (err) {
      return { msg: err }
    }
  }

  public async getInfoCitysService() {
    try {
      let operationPromise: any

      const cadsRepository = new RegisterCadsRepository()
      operationPromise = await cadsRepository.getInfosCitysRepository()
      if (!operationPromise)
        return { msg: "Erro getInfoCitysService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }

  public async getInfoRegisterDateService() {
    try {
      let operationPromise: any

      const cadsRepository = new RegisterCadsRepository()
      operationPromise = await cadsRepository.getInfosRegisterDatesRepository()
      if (!operationPromise)
        return { msg: "Erro getInfoRegisterDateService", status: 0 }

      return operationPromise
    } catch (ex) {
      return { msg: ex }
    }
  }
}
