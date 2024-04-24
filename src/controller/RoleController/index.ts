import { Request, Response } from 'express';
import { RoleService } from '../../services/RoleService';

export class RoleController {
    public async getRoleList(req: Request, res: Response) {
        try {
            const query = req.query;

            const roleService = new RoleService();

            const execute = await roleService.getRoleListService(query)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async insertRole(req: Request, res: Response) {
        try {
            const data = req.body;

            const roleService = new RoleService();

            const execute = await roleService.insertRoleService(data)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async deleteRole(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const roleService = new RoleService();

            const execute = await roleService.deleteRoleService(id)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async updateRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;

            const roleService = new RoleService();

            const execute = await roleService.updateRoleService(id, data)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }
}