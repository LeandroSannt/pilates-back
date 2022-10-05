"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const build_1 = require("adonis5-scheduler/build");
const getExpirationStudent_1 = global[Symbol.for('ioc.use')]("App/Helpers/getExpirationStudent");
const moment_1 = __importDefault(require("moment"));
const Student_1 = __importDefault(require("../Models/Student"));
moment_1.default.locale('pt-br');
class WatichingCurrentMonth extends build_1.BaseTask {
    static get schedule() {
        return '* 1 0 * * *';
    }
    static get useLock() {
        return false;
    }
    async handle() {
        const students = await Student_1.default
            .query()
            .preload('plan')
            .where('status', 'ativo');
        const current_day = (0, moment_1.default)().format('DD');
        students.map(async (student) => {
            const expiration_date = (0, getExpirationStudent_1.getExpirationStudent)(student);
            const tomorrowExpirationDate = (0, moment_1.default)(expiration_date, 'DD/MM/YYYY').add(1, 'days').calendar();
            if (student.plan_expiration_day === current_day) {
                if (Number(student.current_month_plan) === student.plan.amount_installments) {
                    await Student_1.default
                        .query()
                        .where('id', student.id)
                        .update('status', 'a vencer');
                }
                else if (Number(student.current_month_plan) < student.plan.amount_installments) {
                    await Student_1.default
                        .query()
                        .where('id', student.id)
                        .update('current_month_plan', student.current_month_plan += 1);
                }
                else if ((0, moment_1.default)().format('DD/MM/YYYY') === tomorrowExpirationDate) {
                    await Student_1.default
                        .query()
                        .where('id', student.id)
                        .update('status', 'vencido');
                }
            }
        });
    }
}
exports.default = WatichingCurrentMonth;
//# sourceMappingURL=WatichingCurrentMonth.js.map