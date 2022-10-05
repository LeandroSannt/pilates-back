"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AddStudentGangValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/AddStudentGangValidator"));
const CreateManyGangStudantValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateManyGangStudantValidator"));
const CreateOrUpdateGangValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateOrUpdateGangValidator"));
const GangsServices_1 = __importDefault(require("../../Services/GangsServices"));
const BaseController_1 = __importDefault(require("./BaseController"));
class GangsController extends BaseController_1.default {
    constructor() {
        super({ service: GangsServices_1.default, validator: { create: CreateOrUpdateGangValidator_1.default, update: CreateOrUpdateGangValidator_1.default } });
    }
    async storeMany({ request, response }) {
        const gangs = new GangsServices_1.default();
        const { day, student_id, time } = await request.validate(CreateManyGangStudantValidator_1.default);
        const result = await gangs.storeMany({ day, student_id, time });
        return response.status(result.status).json(result.data);
    }
    async getGangsStudent({ request, response }) {
        const gangs = new GangsServices_1.default();
        const { day, time } = request.only(['day', 'time']);
        const result = await gangs.getGangsStudent(day, time);
        return response.ok(result);
    }
    async addStudentGang({ request, response }) {
        const { gang_id, student_id } = await request.validate(AddStudentGangValidator_1.default);
        const gangs = new GangsServices_1.default();
        const result = await gangs.addStudentforGang(student_id, gang_id);
        return response.status(result.status).json(result.data);
    }
}
exports.default = GangsController;
//# sourceMappingURL=GangsController.js.map