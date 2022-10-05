"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreatePlanValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/CreatePlanValidator"));
const PlansServices_1 = __importDefault(require("../../Services/PlansServices"));
const BaseController_1 = __importDefault(require("./BaseController"));
class PlansController extends BaseController_1.default {
    constructor() {
        super({
            service: PlansServices_1.default,
            validator: { create: CreatePlanValidator_1.default, update: CreatePlanValidator_1.default }
        });
    }
}
exports.default = PlansController;
//# sourceMappingURL=PlansController.js.map