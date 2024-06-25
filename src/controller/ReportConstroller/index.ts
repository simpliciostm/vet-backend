import { Request, Response } from 'express';
import { ReportService } from '../../services/ReportService';

export class ReportController {
    public async reportExportCSVController(req: Request, res: Response) {
        try {
            const {registers, columns} = req.body

            const reportService = new ReportService()

            const execute = await reportService.exportReportServiceCSV(registers, columns)
            res.attachment("test.csv")
            res.status(200).send(execute.reportText)

        } catch (err) {
            return res.status(400).json(err);
        }
    }
}