"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const StudentExchangesServices_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/StudentExchangesServices"));
const CreateStudentExchangeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateStudentExchangeValidator"));
const BaseController_1 = __importDefault(require("./BaseController"));
class StudentExchangesController extends BaseController_1.default {
    constructor() {
        super({
            service: StudentExchangesServices_1.default,
            validator: { create: CreateStudentExchangeValidator_1.default, update: CreateStudentExchangeValidator_1.default }
        });
    }
    async listPaginated({ request, response }) {
        const page = request.input('page', 1);
        const student_id = request.input('student_id');
        const limit = 10;
        const studentService = new StudentExchangesServices_1.default();
        const result = await studentService.getAllExchangesPaginated(page, limit, student_id);
        return response.status(result.status).json(result.data);
    }
    async list({ response }) {
        const studentService = new StudentExchangesServices_1.default();
        const result = await studentService.getAllExchanges();
        return response.status(result.status).json(result.data);
    }
    async finishExchange({ request, response }) {
        const exchangeId = request.input('exchangeId');
        const studentService = new StudentExchangesServices_1.default();
        const result = await studentService.finishExchange(exchangeId);
        return response.status(result.status).json(result.data);
    }
    async updateDateExchange({ request, response }) {
        const { id, date } = request.only(['id', 'date']);
        const studentService = new StudentExchangesServices_1.default();
        const result = await studentService.updateDateExchange(id, date);
        return response.status(result.status).json(result.data);
    }
    async cancelGang({ request, response }) {
        const { date_lacks, gang_ids, observation } = request.only(['gang_ids', 'observation', 'date_lacks']);
        const studentService = new StudentExchangesServices_1.default();
        const result = await studentService.cancelGang(gang_ids, date_lacks, observation);
        return response.status(result.status).json(result.data);
    }
}
exports.default = StudentExchangesController;
//# sourceMappingURL=StudentExchangesController.js.map