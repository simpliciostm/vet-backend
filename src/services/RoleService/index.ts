import { IRole } from "../../interface/Roles";
import { RoleRepository } from "../../repository/RoleRepository";

export class RoleService {
    public async getRoleListService(query: object) {
        try {
            let operationPromise: any;

            const roleRepository = new RoleRepository();
            operationPromise = await roleRepository.getRoleListRepository(query);
            if (!operationPromise) return ({ msg: 'Erro getRoleListService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async insertRoleService(role: IRole) {
        try {
            let operationPromise: any;

            const roleRepository = new RoleRepository();
            operationPromise = await roleRepository.insertRoleRepository(role);
            if (!operationPromise) return ({ msg: 'Erro insertRoleService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async deleteRoleService(id: string) {
        try {
            let operationPromise: any;

            const roleRepository = new RoleRepository();
            operationPromise = await roleRepository.deleteRoleRepository(id);
            if (!operationPromise) return ({ msg: 'Erro deleteRoleService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async updateRoleService(id: string, role: IRole) {
        try {
            let operationPromise: any;

            const roleRepository = new RoleRepository();
            operationPromise = await roleRepository.updateRoleRepository(id, role);
            if (!operationPromise) return ({ msg: 'Erro updateRoleService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }
}