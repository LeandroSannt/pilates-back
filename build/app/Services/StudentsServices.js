"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const getExpirationStudent_1 = require("./../Helpers/getExpirationStudent");
const Student_1 = __importDefault(require("../Models/Student"));
const BaseServices_1 = require("./BaseServices");
class StudentsServices extends BaseServices_1.BaseServices {
    constructor() {
        super({ model: Student_1.default, name_model: 'Alunos' });
    }
    async listStudentsPaginated(page, limit, status, planId, name) {
        moment_1.default.locale('pt-BR');
        let students = await Student_1.default
            .query()
            .preload('plan')
            .where((query) => {
            if (status && status !== 'todos') {
                query.where('status', status);
            }
        })
            .whereHas('plan', (planQuery) => {
            if (planId && planId !== 'todos') {
                planQuery.where('id', planId);
            }
        })
            .where((query) => {
            if (name) {
                query.whereLike('name', `%${name}%`);
            }
        })
            .orderBy([
            {
                column: 'status',
                order: 'desc',
            },
            {
                column: 'id',
                order: 'desc',
            }
        ])
            .paginate(page, limit);
        const studentExpiration = students.toJSON().data.map((student) => {
            const expiration_date = (0, getExpirationStudent_1.getExpirationStudent)(student);
            const studentExpiration = { expiration_date, ...student.toJSON() };
            return studentExpiration;
        });
        const newStudent = {
            meta: students.getMeta(),
            data: studentExpiration
        };
        return {
            data: newStudent,
            status: 201
        };
    }
    async storeStudent(data) {
        const store = await this.Model.create({
            ...data,
            current_month_plan: 1,
            status: "ativo"
        });
        return {
            data: store,
            status: 200,
        };
    }
    async renovationPlan(id) {
        await Student_1.default.
            query()
            .where('id', id)
            .update({ current_month_plan: 1, status: 'ativo' });
        return {
            data: 1,
            status: 201,
        };
    }
}
exports.default = StudentsServices;
//# sourceMappingURL=StudentsServices.js.map