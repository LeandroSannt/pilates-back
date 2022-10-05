"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GangsLakeServices_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Services/GangsLakeServices"));
const CreateGangLakeValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreateGangLakeValidator"));
const BaseController_1 = __importDefault(require("./BaseController"));
class GangLacksController extends BaseController_1.default {
    constructor() {
        super({ service: GangsLakeServices_1.default, validator: { create: CreateGangLakeValidator_1.default, update: CreateGangLakeValidator_1.default } });
    }
    async listRelashionships({ request, response }) {
        const lakes = new GangsLakeServices_1.default();
        const { student_id, date_lacks } = request.only(['student_id', 'date_lacks']);
        const page = request.input('page', 1);
        const limit = 10;
        const result = await lakes.listRelashionships(page, limit, student_id, date_lacks);
        return response.status(result.status).json(result.data);
    }
}
exports.default = GangLacksController;
//# sourceMappingURL=GangLacksController.js.map