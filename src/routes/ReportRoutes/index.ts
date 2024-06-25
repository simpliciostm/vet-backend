import express from 'express';
import { ReportController } from '../../controller/ReportConstroller';

export class ReportRouter {
    public routeReport: express.Router;

    constructor() {
        this.routeReport = express();
        this.initRoutes();
    }

    private initRoutes() {
        const reportController = new ReportController()

        this.routeReport.post('/report/register', reportController.reportExportCSVController)
    }
}

export default new ReportRouter().routeReport