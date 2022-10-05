"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const StudentExchange_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/StudentExchange"));
const moment_1 = __importDefault(require("moment"));
class default_1 extends Seeder_1.default {
    async run() {
        const exchange = [];
        function createRandomGangLake() {
            return {
                gang_id: Math.floor(Math.random() * 7) + 1,
                student_id: Math.floor(Math.random() * 25) + 1,
                date_exchanges: (0, moment_1.default)(faker_1.faker.date.recent()).format(),
                date_lacks: (0, moment_1.default)(faker_1.faker.date.recent()).format(),
                observation: faker_1.faker.lorem.text(),
                status: 'ativo',
            };
        }
        Array.from({ length: 25 }).forEach(() => {
            exchange.push(createRandomGangLake());
        });
        await StudentExchange_1.default.createMany(exchange);
    }
}
exports.default = default_1;
//# sourceMappingURL=4-Exchanges.js.map