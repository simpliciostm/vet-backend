import { Request, Response } from 'express';
import { UserService } from '../../services/UserService';

export class UserController {
    public async getUserList(req: Request, res: Response) {
        try {
            const { limit, skip } = req.params;
            const filter = req.body;

            const userService = new UserService();

            const execute = await userService.getUserListService(filter, parseInt(limit), parseInt(skip))

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async insertUser(req: Request, res: Response) {
        try {
            const data = req.body;

            const userService = new UserService();

            const execute = await userService.insertUserService(data)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async deleteUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userService = new UserService();

            const execute = await userService.deleteUserService(id)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;

            const userService = new UserService();

            const execute = await userService.updateUserService(id, data)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const userService = new UserService();

            const execute = await userService.getUserService(id)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }
}