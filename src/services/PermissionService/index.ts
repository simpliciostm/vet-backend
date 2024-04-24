import { IPermission } from "../../interface/Permission";
import { PermissionRepository } from "../../repository/PermissionRepository";

export class PermissionService {
    public async getPermissionListService(query: object) {
        try {
            let operationPromise: any;

            const permissionRepository = new PermissionRepository();
            operationPromise = await permissionRepository.getPermissionListRepository(query);
            if (!operationPromise) return ({ msg: 'Erro getPermissionListService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async insertPermissionService(Permission: IPermission) {
        try {
            let operationPromise: any;

            const permissionRepository = new PermissionRepository();
            operationPromise = await permissionRepository.insertPermissionRepository(Permission);
            if (!operationPromise) return ({ msg: 'Erro insertPermissionService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async deletePermissionService(id: string) {
        try {
            let operationPromise: any;

            const permissionRepository = new PermissionRepository();
            operationPromise = await permissionRepository.deletePermissionRepository(id);
            if (!operationPromise) return ({ msg: 'Erro deletePermissionService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async updatePermissionService(id: string, Permission: IPermission) {
        try {
            let operationPromise: any;

            const permissionRepository = new PermissionRepository();
            operationPromise = await permissionRepository.updatePermissionRepository(id, Permission);
            if (!operationPromise) return ({ msg: 'Erro updatePermissionService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }
}