"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Student"));
const StudentGang_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/StudentGang"));
const Gang_1 = __importDefault(require("../Models/Gang"));
const BaseServices_1 = require("./BaseServices");
class GangsServices extends BaseServices_1.BaseServices {
    constructor() {
        super({ model: Gang_1.default, name_model: 'Aulas' });
    }
    async storeMany({ day, student_id, time }) {
        if (student_id.length > 5) {
            return {
                data: { err: 'Não é possivel resgistrar mais de 5 alunos por aula' },
                status: 403,
            };
        }
        const students = await Student_1.default
            .query()
            .from('students')
            .whereIn('id', student_id);
        const gang = await Gang_1.default
            .create({
            day,
            time,
        });
        const r = students.map((student) => {
            const obj = {
                student_id: student.id,
                gang_id: gang.id,
                status: 'ativo'
            };
            return obj;
        });
        const studentGang = await StudentGang_1.default
            .createMany(r);
        return {
            data: studentGang,
            status: 200,
        };
    }
    async getGangsStudent(day, time) {
        const gang = Gang_1.default.query()
            .preload("studentGang")
            .select('id', 'time', 'day')
            .where((query) => {
            if (day && day !== 'todos') {
                query.where('day', day);
            }
        })
            .where((query) => {
            if (time) {
                query.where('time', time);
            }
        });
        return gang;
    }
    async addStudentforGang(student_id, gang_id) {
        const create = await StudentGang_1.default.create({
            gang_id: gang_id,
            student_id: student_id,
            status: 'ativo'
        });
        return {
            data: create,
            status: 201,
        };
    }
}
exports.default = GangsServices;
//# sourceMappingURL=GangsServices.js.map