import * as json2csv from 'json2csv'
import { ICastrationReport } from '../../models/interface/Report'

export class ReportRepository {
    public async exportReportRepositoyCSV(registers: ICastrationReport[], columns: []) {
        try {

            const fields = columns
            fields.shift()
            const opts = { fields }
            let data: any[] = []

            for (let index = 0; index < registers.length; index++) {
                data.push({
                    "Número": registers[index].idCastration ? registers[index].idCastration : '',
                    "Tutor": registers[index].name_tutor ? registers[index].name_tutor : '',
                    "CEP": registers[index].cep ? registers[index].cep : '',
                    "CPF": registers[index].cpf ? registers[index].cpf : '',
                    "Telefone": registers[index].phone ? registers[index].phone : '',
                    "Cidade": registers[index].city.name ? registers[index].city.name : '',
                    "Endereço": registers[index].address ? registers[index].address : '',
                    "N Resindecial": registers[index].number_residence ? registers[index].number_residence : '',
                    "Bairro": registers[index].district ? registers[index].district : '',
                    "Espécie": registers[index].animal.species ? registers[index].animal.species : '',
                    "Sexo": registers[index].animal.sexy ? registers[index].animal.sexy : '',
                    "Nome": registers[index].animal.name ? registers[index].animal.name : '',
                    "Cor": registers[index].animal.color ? registers[index].animal.color : '',
                    "Peso": registers[index].animal.size ? registers[index].animal.size : '',
                    "Idade": registers[index].animal.year ? registers[index].animal.year : '',
                    "Microchip": registers[index].animal.chip ? registers[index].animal.chip : '',
                    "Nis": registers[index].animal.nis ? registers[index].animal.nis : '',
                    "Intercorrência": registers[index].animal.intercorrencia ? registers[index].animal.intercorrencia : '',
                    "Criado": registers[index].createdAt ? registers[index].createdAt : '',
                    "Atualizado": registers[index].updatedAt ? registers[index].updatedAt : ''
                })
            }

            const csv = json2csv.parseAsync(data, opts)
            const teste = await csv

            return ({ reportText: teste })

        } catch (err) {
            console.log(err);
        }
    }
}