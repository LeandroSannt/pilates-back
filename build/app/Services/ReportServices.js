"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getExpirationStudent_1 = global[Symbol.for('ioc.use')]("App/Helpers/getExpirationStudent");
const moment_1 = __importDefault(require("moment"));
const Student_1 = __importDefault(require("../Models/Student"));
const CreatePdfService_1 = require("./CreatePdfService");
class ReportServices {
    calcPercentRate(plan_value, amount_installments, percent_rate) {
        const total = ((plan_value * amount_installments) * (percent_rate / 100)) / 2;
        return total;
    }
    calcAmountReceivable(plan_value) {
        const total = ((60 / 100) * plan_value);
        return total;
    }
    async financialReport() {
        moment_1.default.locale('pt-BR');
        let students = await Student_1.default
            .query()
            .preload('plan')
            .orderBy([
            {
                column: 'status',
                order: 'desc',
            },
            {
                column: 'id',
                order: 'desc',
            }
        ]);
        const studentExpiration = students.map((student) => {
            const expiration_date = (0, getExpirationStudent_1.getExpirationStudent)(student);
            const studentReport = {
                expiration_date,
                calc_amount_receivable: this.calcAmountReceivable(student.plan.value),
                total_percent_rate: this.calcPercentRate(student.plan.value, student.plan.amount_installments, student.plan.percent_rate),
                ...student.toJSON()
            };
            return studentReport;
        });
        var sum_percent_rate = studentExpiration.reduce(function (soma, atual) {
            return soma + atual.total_percent_rate;
        }, 0);
        var sum_amount_receivable = studentExpiration.reduce(function (soma, atual) {
            return soma + atual.calc_amount_receivable;
        }, 0);
        var sum_value = studentExpiration.reduce(function (soma, atual) {
            return soma + atual.plan.value;
        }, 0);
        const data = {
            sum_percent_rate: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(sum_percent_rate.toFixed(2))),
            sum_amount_receivable: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(sum_amount_receivable.toFixed(2))),
            sum_value: new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(sum_value.toFixed(2))),
            studentExpiration
        };
        return {
            data: data,
            status: 201
        };
    }
    async donwloadPdfFinancial() {
        const pdfService = new CreatePdfService_1.PdfService();
        const pdf = await this.financialReport();
        const result = await pdfService.createPdf(pdf.data);
        return result;
    }
}
exports.default = ReportServices;
//# sourceMappingURL=ReportServices.js.map