"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const faker_1 = require("@faker-js/faker");
const Seeder_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Seeder"));
const Student_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Student"));
const moment_1 = __importDefault(require("moment"));
class default_1 extends Seeder_1.default {
    async run() {
        const STUDENTS = [];
        function createRandomStudent() {
            return {
                registration: faker_1.faker.datatype.uuid(),
                name: faker_1.faker.name.fullName(),
                email: faker_1.faker.internet.email(),
                telephone: '99999999',
                telephone_emergency: '99999999',
                birth_date: (0, moment_1.default)(faker_1.faker.date.birthdate()).format(),
                current_month_plan: 1,
                status: "ativo",
                objective: faker_1.faker.lorem.text(),
                plan_id: Math.floor(Math.random() * 4) + 1,
                plan_expiration_day: (Math.floor(Math.random() * 31) + 1).toString()
            };
        }
        Array.from({ length: 25 }).forEach(() => {
            STUDENTS.push(createRandomStudent());
        });
        await Student_1.default.createMany(STUDENTS);
    }
}
exports.default = default_1;
//# sourceMappingURL=2-Student.js.map