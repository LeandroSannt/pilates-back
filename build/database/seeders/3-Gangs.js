"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Gang_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Gang"));
const moment_1 = __importDefault(require("moment"));
class default_1 extends Seeder_1.default {
    async run() {
        const gang = [];
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
            gang.push(createRandomGangLake());
        });
        await Gang_1.default.createMany([
            {
                day: "segunda",
                time: "7",
            },
            {
                day: "segunda",
                time: "19",
            },
            {
                day: "terca",
                time: "7",
            },
            {
                day: "terca",
                time: "8",
            },
            {
                day: "quarta",
                time: "7",
            },
            {
                day: "quinta",
                time: "7",
            },
            {
                day: "sexta",
                time: "7",
            },
        ]);
    }
}
exports.default = default_1;
//# sourceMappingURL=3-Gangs.js.map