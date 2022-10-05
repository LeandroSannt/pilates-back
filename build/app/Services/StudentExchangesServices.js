"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gang_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Gang"));
const Student_1 = __importDefault(require("../Models/Student"));
const StudentExchange_1 = __importDefault(require("../Models/StudentExchange"));
const BaseServices_1 = require("./BaseServices");
class StudentExchangeServices extends BaseServices_1.BaseServices {
    constructor() {
        super({ model: StudentExchange_1.default, name_model: 'Reposições' });
    }
    async getAllExchangesPaginated(page, limit, student_id) {
        const students = await Student_1.default
            .query()
            .whereExists((query) => {
            query.withScopes((scope) => scope.existsExganges());
        })
            .preload('exchange', (query) => {
            query.where('status', 'ativo');
            query.preload('gang');
        })
            .withCount('exchange', (query) => {
            query.where('status', 'ativo');
        })
            .where((query) => {
            if (student_id && student_id.toString() !== 'todos') {
                query.where("id", student_id);
            }
        })
            .paginate(page, limit);
        students.forEach((student) => {
            student.total_exchanges = student.$extras.exchange_count;
        });
        return {
            data: students,
            status: 200
        };
    }
    async getAllExchanges() {
        const students = await Student_1.default
            .query()
            .whereExists((query) => {
            query.withScopes((scope) => scope.existsExganges());
        });
        return {
            data: students,
            status: 200
        };
    }
    async finishExchange(id) {
        const exchange = await StudentExchange_1.default.find(id);
        if (exchange) {
            exchange.status = 'concluido';
            exchange.save();
            return {
                data: exchange,
                status: 201
            };
        }
        return {
            data: { err: 'Não foi encontrado a remarcação' },
            status: 404
        };
    }
    async updateDateExchange(id, date) {
        const exchange = await StudentExchange_1.default.find(id);
        if (exchange) {
            exchange.date_exchanges = date;
            exchange.save();
            return {
                data: exchange,
                status: 201
            };
        }
        return {
            data: { err: 'Não foi encontrado a remarcação' },
            status: 404
        };
    }
    async cancelGang(gang_ids, date_lacks, observation) {
        const gangs = await Gang_1.default
            .query()
            .whereIn('id', gang_ids)
            .preload('studentGang', (query) => {
            query.where('student_gangs.status', 'ativo');
        });
        const result = Promise.all(gangs.map(async (gang) => {
            const c = Promise.all(gang.studentGang.map(async (student) => {
                const response = await StudentExchange_1.default.create({
                    gang_id: gang.id,
                    student_id: student.id,
                    date_lacks: date_lacks,
                    observation: observation,
                    canceled: true
                });
                return response.toJSON();
            }));
            return c;
        }));
        return {
            data: result,
            status: 200
        };
    }
}
exports.default = StudentExchangeServices;
//# sourceMappingURL=StudentExchangesServices.js.map