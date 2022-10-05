"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Gang_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Gang"));
class ValidatGang {
    async handle({ request, response }, next) {
        const time = request.input('time');
        const day = request.input('day');
        const gangDay = await Gang_1.default.query()
            .where('day', day)
            .andWhere('time', time)
            .first();
        if (gangDay) {
            return response.forbidden("Já existe uma aula cadastrada com esse horario");
        }
        await next();
    }
}
exports.default = ValidatGang;
//# sourceMappingURL=ValidatGang.js.map