import UserSchema from "../../schema/UserSchema";
import { IUser } from "../../interface/User";
import bcrypt from 'bcrypt';

export class UserRepository {
    public async getUserListRepository(query: object) {
        try {
            let operationPromise: any;

            operationPromise = await UserSchema.find(query);
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: 'Não existe Usuário cadastrado', status: 0 });

            return ({ msg: 'Usuarios cadastrados', status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async insertUserRepository(user: IUser) {
        try {
            if (!user) return ({ msg: 'User params undefined or null', status: 0 });
            console.log('user',user)

            let operationPromise: any;

            operationPromise = await UserSchema.find({ email: user.email });
            if (!operationPromise || operationPromise.length >= 1) return ({ msg: 'Já existe um usuário com esse email', status: 0 });

            const salt = 7
            const password = bcrypt.hashSync(user.password, salt);
            user.password = password;

            operationPromise = await UserSchema.create(user);
            if (!operationPromise) return ({ msg: `Erro ao criar Usuario`, status: 0 });

            return ({ msg: `Usuario criado com sucesso`, status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async deleteUserRepository(id: string) {
        try {
            if (!id) return ({ msg: `Id undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await UserSchema.find({ _id: id });
            if (!operationPromise || operationPromise <= 0) return ({ msg: 'Não existe usuario com esse id', status: 0 });

            operationPromise = await UserSchema.findOneAndDelete({ _id: id });
            if (!operationPromise) return ({ msg: `Erro ao excluir Usuario`, status: 0 });

            return ({ msg: 'Usuario deleteado com sucesso', status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }

    public async updateUserRepository(id: string, user: IUser) {
        try {
            if (!id) return ({ msg: `Id undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await UserSchema.find({ _id: id });
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: `Não existe usuario com esse id`, status: 0 });

            const salt = 7;
            const password = bcrypt.hashSync(user.password, salt);
            user.password = password;

            operationPromise = await UserSchema.findOneAndUpdate({ _id: id }, {
                email: user.email,
                name: user.name,
                password: user.password
            });
            if (!operationPromise) return ({ msg: `Erro ao atualizar usuario`, status: 0 });

            operationPromise = await UserSchema.findOne({ _id: id });
            if (!operationPromise) return ({ msg: `Erro ao buscar usuario atualizado`, status: 0 });

            return ({ msg: `Usuario atualizado com sucesso`, status: 1, data: operationPromise });
        } catch (err) {
            return ({ msg: err });
        }
    }
}