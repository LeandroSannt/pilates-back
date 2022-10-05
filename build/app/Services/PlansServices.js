"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Plan_1 = __importDefault(require("../Models/Plan"));
const BaseServices_1 = require("./BaseServices");
class PlansServices extends BaseServices_1.BaseServices {
    constructor() {
        super({ model: Plan_1.default, name_model: 'Planos' });
    }
    async teste() {
    }
}
exports.default = PlansServices;
//# sourceMappingURL=PlansServices.js.map