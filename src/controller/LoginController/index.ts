import { Request, Response } from 'express';
import { LoginService } from '../../services/LoginService';

export class LoginController {
    public async login(req: Request, res: Response) {
        try {
            const data = req.body;

            const loginService = new LoginService();

            const execute = await loginService.loginService(data);

            res.status(200).json(execute);
        } catch (err) {
            res.status(400).json({ msg: err });
        }
    }
}