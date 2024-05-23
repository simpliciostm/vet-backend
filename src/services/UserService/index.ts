import { IUser, IUserFilter } from "../../interface/User";
import { UserRepository } from "../../repository/UserRepository";

export class UserService {
    public async getUserListService(filter: IUserFilter, limit: number, skip: number) {
        try {
            let operationPromise: any;

            const userRepository = new UserRepository();
            operationPromise = await userRepository.getUserListRepository(filter, limit, skip);
            if (!operationPromise) return ({ msg: 'Erro getUserListService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async insertUserService(user: IUser) {
        try {
            let operationPromise: any;

            const userRepository = new UserRepository();
            operationPromise = await userRepository.insertUserRepository(user);
            if (!operationPromise) return ({ msg: 'Erro insertUserService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async deleteUserService(id: string) {
        try {
            let operationPromise: any;

            const userRepository = new UserRepository();
            operationPromise = await userRepository.deleteUserRepository(id);
            if (!operationPromise) return ({ msg: 'Erro deleteUserService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async updateUserService(id: string, user: IUser) {
        try {
            let operationPromise: any;

            const userRepository = new UserRepository();
            operationPromise = await userRepository.updateUserRepository(id, user);
            if (!operationPromise) return ({ msg: 'Erro updateUserService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }

    public async getUserService(query: string) {
        try {
            let operationPromise: any;

            const userRepository = new UserRepository();
            operationPromise = await userRepository.getUserRepository(query);
            if (!operationPromise) return ({ msg: 'Erro getUserService', status: 0 });

            return operationPromise
        } catch (ex) {
            return ({ msg: ex });
        }
    }
}