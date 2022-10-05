"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Application_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Application"));
const ReportServices_1 = __importDefault(require("../../Services/ReportServices"));
class ReportController {
    async financial({ response }) {
        const studentService = new ReportServices_1.default();
        const result = await studentService.financialReport();
        return response.status(result.status).json(result.data);
    }
    async downloadfinancial({ response }) {
        const filePathw = Application_1.default.tmpPath('uploads/leandro.pdf');
        response.download(filePathw, true);
    }
}
exports.default = ReportController;
//# sourceMappingURL=ReportController.js.map