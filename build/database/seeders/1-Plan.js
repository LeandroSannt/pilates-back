"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Plan_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Plan"));
class default_1 extends Seeder_1.default {
    async run() {
        await Plan_1.default.createMany([
            {
                value: 168,
                name_plan: 'Anual',
                amount_installments: 12,
                percent_rate: 3
            },
            {
                value: 189,
                name_plan: 'Semestral',
                amount_installments: 6,
                percent_rate: 2
            },
            {
                value: 209,
                name_plan: 'Quadrimestral',
                amount_installments: 4,
                percent_rate: 1
            },
            {
                value: 240,
                name_plan: 'Mensal',
                amount_installments: 1,
                percent_rate: 0
            },
        ]);
    }
}
exports.default = default_1;
//# sourceMappingURL=1-Plan.js.map