import { Request, Response } from 'express';
import { RegisterCadsService } from '../../services/RegisterCadsService';

export class RegisterCadsController {
    public async getCadsList(req: Request, res: Response) {
        try {
            const { limit, skip } = req.params;
            const filter = req.body;

            const cadsService = new RegisterCadsService();

            const execute = await cadsService.getCadsListService(filter, parseInt(limit), parseInt(skip))

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async insertCads(req: Request, res: Response) {
        try {
            const data = req.body;

            const cadsService = new RegisterCadsService();

            const execute = await cadsService.insertCadsrService(data)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async deleteCads(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const cadsService = new RegisterCadsService();

            const execute = await cadsService.deleteCadsService(id)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;

            const cadsService = new RegisterCadsService();

            const execute = await cadsService.updateCadsService(id, data)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }

    public async getUser(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const cadsService = new RegisterCadsService();

            const execute = await cadsService.getCadsService(id)

            res.status(200).json(execute);
        } catch (ex) {
            res.status(500).json({ Error: ex });
        }
    }
}