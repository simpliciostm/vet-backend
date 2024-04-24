import { IUser } from "../../interface/User";
import UserSchema from "../../schema/UserSchema";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export class LoginRepository {
    public async login(user: IUser) {
        try {
            if (!user) return ({ msg: `User undefined or null`, status: 0 });

            let operationPromise: any;

            operationPromise = await UserSchema.findOne({ email: user.email }).populate('permissions');
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: `Usuario não encontrado com esse email`, status: 0 });
            const result = operationPromise ? operationPromise : null;

            const isValidPassword = await bcrypt.compareSync(user.password, result.password);
            if (!isValidPassword) return ({ msg: `Password não confere com email de usuario`, status: 0 });
            else if (isValidPassword) {
                const payload = result.email;
                const mysceret = process.env.MY_SECRET;
                const token = jwt.sign(payload, `${mysceret}`);
                operationPromise = token;
            }

            return ({ msg: `Usuario logado com sucesso`, status: 1, idUser: result._id, token: operationPromise, auth: true, permission: result.permissions.name_permission });

        } catch (err) {
            return ({ msg: err });
        }
    }
}