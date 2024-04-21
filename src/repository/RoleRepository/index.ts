import RolesSchema from "../../schema/RolesSchema";
import { IRole } from "../../interface/Roles";

export class RoleRepository {
    public async getRoleListRepository(query: object) {
        try {
            let operationPromise: any;

            operationPromise = await RolesSchema.find(query);
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: 'Não existe roles cadastradas', status: 0 });

            return ({ msg: 'Roles cadastrados', status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async insertRoleRepository(role: IRole) {
        try {
            if (!role) return ({ msg: 'Role params undefined or null', status: 0 });

            let operationPromise: any;

            operationPromise = await RolesSchema.find({ $and: [{ name_role: role.name_role }, { code_role: role.code_role }] });
            if (!operationPromise || operationPromise.length >= 1) return ({ msg: 'Já existe uma role com esse nome e code', status: 0 });

            operationPromise = await RolesSchema.create(role);
            if (!operationPromise) return ({ msg: `Erro ao criar Roles`, status: 0 });

            return ({ msg: `Role criada com sucesso`, status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async deleteRoleRepository(id: string) {
        try {
            if (!id) return ({ msg: `Id undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await RolesSchema.find({ _id: id });
            if (!operationPromise || operationPromise <= 0) return ({ msg: 'Não existe uma role com esse id', status: 0 });

            operationPromise = await RolesSchema.findOneAndDelete({ _id: id });
            if (!operationPromise) return ({ msg: `Erro ao excluir role`, status: 0 });

            return ({ msg: 'Role deleteada com sucesso', status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async updateRoleRepository(id: string, role: IRole) {
        try {
            if (!id) return ({ msg: `Id undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await RolesSchema.find({ _id: id });
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: `Não existe role com esse id`, status: 0 });

            operationPromise = await RolesSchema.findOneAndUpdate({ _id: id }, {
                name_role: role.name_role,
                code_role: role.code_role
            });
            if (!operationPromise) return ({ msg: `Erro ao atualizar role`, status: 0 });

            operationPromise = await RolesSchema.findOne({ _id: id });
            if (!operationPromise) return ({ msg: `Erro ao buscar role atualizada`, status: 0 });

            return ({ msg: `Role atualizada com sucesso`, status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }
}