import { IUser } from "../../interface/User";
import { LoginRepository } from "../../repository/LoginRepository";

export class LoginService {
    public async loginService(user: IUser) {
        try {
            if (!user) return ({ msg: `User undefined or null`, status: 0 });

            let operationPromise: any;

            const loginRepostory = new LoginRepository();

            operationPromise = await loginRepostory.login(user);
            if (!operationPromise) return ({ msg: `Erro LoginService`, status: 0 });

            return operationPromise;

        } catch (err) {
            return ({ msg: err });
        }
    }
}