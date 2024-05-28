import CadsSchema from '../../schema/RegisterCads';
import { ICads, ICadsFilter } from '../../interface/Cads';

export class RegisterCadsRepository {
    public async getCadsListRepository(query: ICadsFilter, limit: number, skip: number) {
        try {
            let operationPromise: any;
            const filter = this.filterFormat(query);
            let cads: any

            if (filter) {
                operationPromise = await CadsSchema.find(filter);
                if (!operationPromise || operationPromise.length <= 0) return ({ msg: 'Não existe registros com esse filtro', status: 0 });
                cads = operationPromise ? operationPromise : null;
            } else {
                operationPromise = await CadsSchema.find({}).skip(skip).limit(limit);
                if (!operationPromise || operationPromise.length <= 0) return ({ msg: 'Não existe registros cadastrado', status: 0 });
                cads = operationPromise ? operationPromise : null;
            }

            operationPromise = await CadsSchema.find();
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: `Não existe registros cadastrado`, status: 0 });
            const totalCads: number = operationPromise.length;

            const columns = [
                'Espécie',
                'Sexo',
                'Nome',
                'Cor',
                'Peso',
                'Microship',
                'Intercorrência',
                'Data',
                'Nome Tutor',
                'CPF',
                'Telefone',
                'Cidade',
                'Endereço',
                'Bairro',
                'Acões',
            ]
            return ({ msg: 'Cads cadastrados', status: 1, data: cads, columns: columns, total: totalCads });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async insertCadsRepository(cads: ICads) {
        try {
            if (!cads) return ({ msg: 'Cads params undefined or null', status: 0 });

            let operationPromise: any;

            operationPromise = await CadsSchema.create(cads);
            if (!operationPromise) return ({ msg: `Erro ao criar Cads`, status: 0 });

            return ({ msg: `Cads criado com sucesso`, status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async deleteCadsrRepository(id: string) {
        try {
            if (!id) return ({ msg: `Id undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await CadsSchema.find({ _id: id });
            if (!operationPromise || operationPromise <= 0) return ({ msg: 'Não existe cads com esse id', status: 0 });

            operationPromise = await CadsSchema.findOneAndDelete({ _id: id });
            if (!operationPromise) return ({ msg: `Erro ao excluir Cads`, status: 0 });

            return ({ msg: 'Cads deleteado com sucesso', status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async updateCadsRepository(id: string, cads: ICads) {
        try {
            if (!id) return ({ msg: `Id undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await CadsSchema.findOne({ _id: id });
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: `Não existe registro com esse id`, status: 0 });
            const result: ICads = operationPromise ? operationPromise : null;

            if (result) {
                operationPromise = await CadsSchema.findOneAndUpdate({ _id: id }, {
                    species: cads.species ? cads.species : '',
                    sexy: cads.sexy ? cads.sexy : '',
                    name: cads.name ? cads.name : '',
                    color: cads.color ? cads.color : '',
                    size: cads.size ? cads.size : '',
                    chip: cads.chip ? cads.chip : '',
                    intercorrencia: cads.intercorrencia ? cads.intercorrencia : '',
                    date: cads.date ? cads.date : null,
                    name_tutor: cads.name_tutor ? cads.name_tutor : '',
                    cpf: cads.cpf ? cads.cpf : '',
                    phone: cads.phone ? cads.phone : '',
                    city: cads.city ? cads.city : '',
                    address: cads.address ? cads.address : '',
                    district: cads.district ? cads.district : ''
                });
                if (!operationPromise) return ({ msg: `Erro ao atualizar registro`, status: 0 });

                operationPromise = await CadsSchema.findOne({ _id: id });
                if (!operationPromise) return ({ msg: `Erro ao buscar registro atualizado`, status: 0 });
            }
            return ({ msg: `Registro atualizado com sucesso`, status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async getCadsRepository(idCads: string) {
        try {
            let operationPromise: any;

            operationPromise = await CadsSchema.findOne({ _id: idCads });
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: 'Não existe registro cadastrado', status: 0 });

            return ({ msg: 'Registro encontrado', status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    private filterFormat(query: ICadsFilter) {
        let filter: any;
        if (query.filter.name_tutor || query.filter.cpf) {
            if (query.filter.name_tutor.length >= 1
                && query.filter.cpf.length >= 1) {
                filter = {
                    $and: [
                        { cpf: query.filter.cpf }
                    ]
                }
            } else {
                filter = {
                    $or: [
                        { name_tutor: query.filter.name_tutor },
                        { cpf: query.filter.cpf }
                    ]
                }
            }
        }

        return filter
    }
}