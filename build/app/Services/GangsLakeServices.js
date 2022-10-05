"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const GangLack_1 = __importDefault(require("../Models/GangLack"));
const BaseServices_1 = require("./BaseServices");
class GangLakeServices extends BaseServices_1.BaseServices {
    constructor() {
        super({ model: GangLack_1.default, name_model: 'Falta' });
    }
    async listRelashionships(page, limit, student_id, date) {
        const lacks = await GangLack_1.default
            .query()
            .preload('gang')
            .preload('student', (query) => {
            query.select('name', 'telephone', 'registration', 'email');
        })
            .where((query) => {
            if (student_id && student_id.toString() !== 'todos') {
                query.where('student_id', student_id);
            }
        })
            .where((query) => {
            if (date) {
                query.whereLike('date', `%${(0, moment_1.default)(date).format('YYYY-MM-DD')}%`);
            }
        })
            .orderBy('created_at', 'desc')
            .paginate(Number(page), Number(limit));
        return {
            data: lacks,
            status: 200
        };
    }
}
exports.default = GangLakeServices;
//# sourceMappingURL=GangsLakeServices.js.map