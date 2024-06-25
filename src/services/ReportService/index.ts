import { ReportRepository } from "../../repository/ReportRepository"

export class ReportService {
    public async exportReportServiceCSV(registers: [], columns: []) {
        try {
            let operationPromise: any;

            const reportRepository = new ReportRepository()
            operationPromise = reportRepository.exportReportRepositoyCSV(registers, columns)
            if (!operationPromise || operationPromise.length <= 0) return ({ msg: 'Erro exportReportServiceCSV' });

            return operationPromise
        } catch(err) {
            return({ msg: err })
        }
    }
}