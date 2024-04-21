import Permission from "../../schema/PermissionSchema";
import { IPermission } from "../../interface/Permission";

export class PermissionRepository {
    public async getPermissionListRepository(query: object) {
        try {
            let operationPromise: any;

            operationPromise = await Permission.find(query).populate('permissions');
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: 'Não existe permissions cadastradas', status: 0 });

            return ({ msg: 'Permissions cadastrados', status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async insertPermissionRepository(permission: IPermission) {
        try {
            if (!permission) return ({ msg: 'Permission params undefined or null', status: 0 });

            let operationPromise: any;

            operationPromise = await Permission.find({ name_permission: permission.name_permission });
            if (!operationPromise || operationPromise.length >= 1) return ({ msg: 'Já existe uma Permission com esse nome e code', status: 0 });

            operationPromise = await Permission.create(permission);
            if (!operationPromise) return ({ msg: `Erro ao criar Permissions`, status: 0 });

            return ({ msg: `Permission criada com sucesso`, status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async deletePermissionRepository(id: string) {
        try {
            if (!id) return ({ msg: `Id undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await Permission.find({ _id: id });
            if (!operationPromise || operationPromise <= 0) return ({ msg: 'Não existe uma Permission com esse id', status: 0 });

            operationPromise = await Permission.findOneAndDelete({ _id: id });
            if (!operationPromise) return ({ msg: `Erro ao excluir Permission`, status: 0 });

            return ({ msg: 'Permission deleteada com sucesso', status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async updatePermissionRepository(id: string, permission: IPermission) {
        try {
            if (!id) return ({ msg: `Id undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await Permission.find({ _id: id });
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: `Não existe Permission com esse id`, status: 0 });

            operationPromise = await Permission.findOneAndUpdate({ _id: id }, {
                name_Permission: permission.name_permission,
                permissions: permission.permissions
            });
            if (!operationPromise) return ({ msg: `Erro ao atualizar Permission`, status: 0 });

            operationPromise = await Permission.findOne({ _id: id });
            if (!operationPromise) return ({ msg: `Erro ao buscar Permission atualizada`, status: 0 });

            return ({ msg: `Permission atualizada com sucesso`, status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }
}