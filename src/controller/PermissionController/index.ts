import { Request, Response } from 'express';
import { PermissionService } from '../../services/PermissionService';

export class PermissionController {
    public async getPermissionList(req: Request, res: Response) {
        try {
            const query = req.query;

            const permissionService = new PermissionService();

            const execute = await permissionService.getPermissionListService(query)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async insertPermission(req: Request, res: Response) {
        try {
            const data = req.body;

            const permissionService = new PermissionService();

            const execute = await permissionService.insertPermissionService(data)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async deletePermission(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const permissionService = new PermissionService();

            const execute = await permissionService.deletePermissionService(id)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async updatePermission(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;

            const permissionService = new PermissionService();

            const execute = await permissionService.updatePermissionService(id, data)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }
}