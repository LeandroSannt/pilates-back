"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateStudentValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateStudentValidator"));
const UpdateStudentValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/UpdateStudentValidator"));
const StudentsServices_1 = __importDefault(require("../../Services/StudentsServices"));
const BaseController_1 = __importDefault(require("./BaseController"));
class StudentsController extends BaseController_1.default {
    constructor() {
        super({
            service: StudentsServices_1.default,
            validator: { create: CreateStudentValidator_1.default, update: UpdateStudentValidator_1.default }
        });
    }
    async listStudentPaginated({ request, response }) {
        const page = request.input('page', 1);
        const status = request.input('status');
        const planId = request.input('planId');
        const name = request.input('name');
        const limit = 10;
        const studentService = new StudentsServices_1.default();
        const result = await studentService.listStudentsPaginated(page, limit, status, planId, name);
        return response.status(result.status).json(result.data);
    }
    async storeStudent({ request, response }) {
        const data = await request.validate(CreateStudentValidator_1.default);
        const studentService = new StudentsServices_1.default();
        const result = await studentService.storeStudent(data);
        return response.status(result.status).json(result.data);
    }
    async renovationPlan({ request, response }) {
        const id = request.input('id');
        const studentService = new StudentsServices_1.default();
        const result = await studentService.renovationPlan(id);
        return response.status(result.status).json(result.data);
    }
}
exports.default = StudentsController;
//# sourceMappingURL=StudentsController.js.map