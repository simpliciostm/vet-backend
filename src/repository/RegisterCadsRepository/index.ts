import CadsSchema from "../../schema/RegisterCads"
import { ICads, ICadsFilter } from "../../models/interface/Cads"
import City from "../../schema/CitySchema"
import moment from "moment"
export class RegisterCadsRepository {
  public async getCadsListRepository(
    query: ICadsFilter,
    limit: number,
    skip: number,
  ) {
    try {
      let operationPromise: any
      const filter = this.filterFormat(query)
      let cads: any

      if (filter) {
        operationPromise = await CadsSchema.find(filter).populate("city")
        if (!operationPromise || operationPromise.length <= 0)
          return { msg: "Não existe registros com esse filtro", status: 0 }
        cads = operationPromise ? operationPromise : null
      } else {
        operationPromise = await CadsSchema.find({})
          .skip(skip)
          .limit(limit)
          .populate("city")
        if (!operationPromise || operationPromise.length <= 0)
          return { msg: "Não existe registros cadastrado", status: 0 }
        cads = operationPromise ? operationPromise : null
      }

      operationPromise = await CadsSchema.find()
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: `Não existe registros cadastrado`, status: 0 }
      const totalCads: number = operationPromise.length

      const columns = [
        "Ações",
        "Espécie",
        "Sexo",
        "Nome",
        "Cor",
        "Peso",
        "Idade",
        "Microchip",
        "Nis",
        "Intercorrência",
        "Criado",
        "Atualizado",
        "Tutor",
        "CEP",
        "CPF",
        "Telefone",
        "Cidade",
        "Endereço",
        "N Resindecial",
        "Bairro",
      ]
      return {
        msg: "Cads cadastrados",
        status: 1,
        data: cads,
        columns: columns,
        total: totalCads,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async insertCadsRepository(cads: ICads) {
    try {
      if (!cads) return { msg: "Cads params undefined or null", status: 0 }

      let operationPromise: any
      let result: any

      if (cads.animal.length >= 1) {
        for (const animals of cads.animal) {
          operationPromise = await CadsSchema.create({
            animal: animals,
            name_tutor: cads.name_tutor,
            cpf: cads.cpf,
            phone: cads.phone,
            city: cads.city,
            address: cads.address,
            district: cads.district,
            cep: cads.cep,
            number_residence: cads.number_residence,
          })
          if (!operationPromise) return { msg: `Erro ao criar Cads`, status: 0 }
          result = operationPromise
        }

        operationPromise = await City.find({ name: cads.city.name })
        if (operationPromise.length <= 0) {
          operationPromise = await City.create({
            name: cads.city.name,
            code: cads.city.code,
          })
          if (!operationPromise)
            return { msg: `Erro ao criar cidade`, status: 0 }
        }
      }
      return { msg: `Cads criado com sucesso`, status: 1, data: result }
    } catch (err) {
      return { msg: err }
    }
  }

  public async deleteCadsrRepository(id: string) {
    try {
      if (!id) return { msg: `Id undefined or null`, status: 0 }

      let operationPromise: any

      operationPromise = await CadsSchema.find({ _id: id })
      if (!operationPromise || operationPromise <= 0)
        return { msg: "Não existe cads com esse id", status: 0 }

      operationPromise = await CadsSchema.findOneAndDelete({ _id: id })
      if (!operationPromise) return { msg: `Erro ao excluir Cads`, status: 0 }

      return {
        msg: "Cads deleteado com sucesso",
        status: 1,
        data: operationPromise,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async updateCadsRepository(id: string, cads: ICads) {
    try {
      if (!id) return { msg: `Id undefined or null`, status: 0 }

      let operationPromise: any

      operationPromise = await CadsSchema.findOne({ _id: id })
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: `Não existe registro com esse id`, status: 0 }
      const result: ICads = operationPromise ? operationPromise : null

      if (result) {
        operationPromise = await CadsSchema.findOneAndUpdate(
          { _id: id },
          {
            animal: {
              species: cads.animal[0].species ? cads.animal[0].species : "",
              sexy: cads.animal[0].sexy ? cads.animal[0].sexy : "",
              name: cads.animal[0].name ? cads.animal[0].name : "",
              color: cads.animal[0].color ? cads.animal[0].color : "",
              size: cads.animal[0].size ? cads.animal[0].size : "",
              chip: cads.animal[0].chip ? cads.animal[0].chip : "",
              intercorrencia: cads.animal[0].intercorrencia
                ? cads.animal[0].intercorrencia
                : "",
              nis: cads.animal[0].nis ? cads.animal[0].nis : "",
            },
            name_tutor: cads.name_tutor ? cads.name_tutor : "",
            cpf: cads.cpf ? cads.cpf : "",
            phone: cads.phone ? cads.phone : "",
            city: cads.city ? cads.city : "",
            address: cads.address ? cads.address : "",
            district: cads.district ? cads.district : "",
          },
        )
        if (!operationPromise)
          return { msg: `Erro ao atualizar registro`, status: 0 }

        operationPromise = await CadsSchema.findOne({ _id: id })
        if (!operationPromise)
          return { msg: `Erro ao buscar registro atualizado`, status: 0 }
      }
      return {
        msg: `Registro atualizado com sucesso`,
        status: 1,
        data: operationPromise,
      }
    } catch (err) {
      return { msg: err }
    }
  }

  public async getCadsRepository(idCads: string) {
    try {
      let operationPromise: any

      operationPromise = await CadsSchema.findOne({ _id: idCads }).populate(
        "city",
      )
      if (!operationPromise || operationPromise.length <= 0)
        return { msg: "Não existe registro cadastrado", status: 0 }

      return { msg: "Registro encontrado", status: 1, data: operationPromise }
    } catch (err) {
      return { msg: err }
    }
  }

  public async getInfosCadsRepository() {
    try {
      let operationPromise: any

      operationPromise = await CadsSchema.find({}).populate("city")
      if (operationPromise.length <= 0)
        return {
          msg: `Não existe informações no sistema de registro`,
          status: 0,
        }
      const cads = operationPromise.length ? operationPromise : null

      let totalRegister = cads.length
      let registerPortSmall: any[] = []
      let registerPortMedium: any[] = []
      let registerPortLarge: any[] = []

      if (cads.length) {
        cads.forEach((cads: any) => {
          if (
            parseInt(cads.animal.size) >= 1 &&
            parseInt(cads.animal.size) <= 5
          )
            registerPortSmall.push(cads)
          else if (
            parseInt(cads.animal.size) >= 6 &&
            parseInt(cads.animal.size) <= 15
          )
            registerPortMedium.push(cads)
          else if (parseInt(cads.animal.size) >= 16)
            registerPortLarge.push(cads)
        })
      }

      return {
        msg: `Informações de Registros`,
        status: 1,
        totalRegister: totalRegister,
        portSmall: registerPortSmall.length,
        portMedium: registerPortMedium.length,
        portLarge: registerPortLarge.length,
      }
    } catch (err) {
      return err
    }
  }

  public async getInfosCitysRepository() {
    try {
      let operationPromise: any
      let result: any[] = []

      operationPromise = await CadsSchema.find({}).populate("city")
      if (operationPromise.length <= 0)
        return {
          msg: `Não existe informações no sistema de registro`,
          status: 0,
        }
      const cads = operationPromise.length ? operationPromise : null

      if (cads && cads.length >= 1) {
        operationPromise = await City.find()
        if (operationPromise.length <= 0) return
        const citysResult = operationPromise ? operationPromise : null

        if (
          citysResult &&
          cads &&
          cads.length >= 1 &&
          citysResult.length >= 1
        ) {
          for (let index = 0; index < citysResult.length; index++) {
            operationPromise = await CadsSchema.find(
              { "city.name": citysResult[index].name },
              { city: 1 },
            ).populate("city")

            operationPromise.forEach((registers) => {
              result.push({
                total: operationPromise.length,
                city: registers.city.name,
              })
            })
          }
        }
      }

      const removeDuplicate = result.filter(
        (obj, index, self) =>
          index ===
          self.findIndex((o) => o.total === obj.total && o.city === obj.city),
      )

      return {
        msg: `Informações de Registros`,
        status: 1,
        infoCitys: removeDuplicate,
      }
    } catch (err) {
      return err
    }
  }

  public async getInfosRegisterDatesRepository() {
    try {
      let operationPromise: any
      let result: any[] = []

      const monthsColumns = [
        {
          name: "Janeiro",
          dateStart: moment()
            .month(0)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(0)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Fevereio",
          dateStart: moment()
            .month(1)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(1)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Março",
          dateStart: moment()
            .month(2)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(2)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Abril",
          dateStart: moment()
            .month(3)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(3)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Maio",
          dateStart: moment()
            .month(4)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(4)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Junho",
          dateStart: moment()
            .month(5)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(5)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Julho",
          dateStart: moment()
            .month(6)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(6)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Agosto",
          dateStart: moment()
            .month(7)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(7)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Setembro",
          dateStart: moment()
            .month(8)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(8)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Outubro",
          dateStart: moment()
            .month(9)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(9)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Novembro",
          dateStart: moment()
            .month(10)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(10)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
        {
          name: "Dezembro",
          dateStart: moment()
            .month(11)
            .startOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
          dateEnd: moment()
            .month(11)
            .endOf("month")
            .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
        },
      ]

      const queries: any[] = []

      monthsColumns.forEach((month) => {
        const startDate = moment(month.dateStart)
        const endDate = moment(month.dateEnd)

        const query = {
          createdAt: {
            $gte: startDate.toDate(),
            $lte: endDate.toDate(),
          },
        }

        queries.push(query)
      })

      operationPromise = await CadsSchema.find({ $or: queries })
      if (operationPromise.length <= 0)
        return { msg: `Registro não cadastrado`, status: 0 }

      if (operationPromise.length >= 1) {
        operationPromise.forEach((registers) => {
          result.push({
            total: operationPromise.length,
            date: moment(registers.createdAt).locale("pt-BR").format("MMMM"),
          })
        })
      }

      const removeDuplicate = result.filter(
        (obj, index, self) =>
          index ===
          self.findIndex((o) => o.total === obj.total && o.city === obj.city),
      )

      return {
        msg: `Informações de Registros`,
        status: 1,
        infoDate: removeDuplicate,
      }
    } catch (err) {
      return err
    }
  }

  private filterFormat(query: ICadsFilter) {
    let filter: any
    if (query.filter.name_tutor || query.filter.cpf) {
      if (query.filter.name_tutor.length >= 1 && query.filter.cpf.length >= 1) {
        filter = {
          $and: [{ cpf: query.filter.cpf }],
        }
      } else {
        filter = {
          $or: [
            { name_tutor: query.filter.name_tutor },
            { cpf: query.filter.cpf },
          ],
        }
      }
    }

    return filter
  }
}
