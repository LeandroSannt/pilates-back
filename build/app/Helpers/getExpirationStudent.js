"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpirationStudent = void 0;
const moment_1 = __importDefault(require("moment"));
const getExpirationStudent = (student) => {
    const month = (0, moment_1.default)().format('MM');
    const year = (0, moment_1.default)().format('YYYY');
    const validationDayExpiration = student.plan_expiration_day === '31' ? '1' : student.plan_expiration_day;
    const currentMonthExpiration = `${validationDayExpiration}/${month}/${year}`;
    const expiration_date = (0, moment_1.default)(currentMonthExpiration, 'DD/MM/YYYY').add(student.plan.amount_installments, 'months').calendar();
    return expiration_date;
};
exports.getExpirationStudent = getExpirationStudent;
//# sourceMappingURL=getExpirationStudent.js.map