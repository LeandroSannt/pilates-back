"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class default_1 extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'students';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('registration').unique().unsigned().notNullable();
            table.string('name').notNullable();
            table.string('email').unique();
            table.string('telephone');
            table.string('telephone_emergency');
            table.string('birth_date');
            table.integer('plan_id').notNullable().unsigned().references('id').inTable('plans');
            table.string('plan_expiration_day').notNullable();
            table.integer('current_month_plan').notNullable();
            table.text('objective');
            table.enum('status', ['ativo', 'inativo', 'a vencer', 'vencido']);
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = default_1;
//# sourceMappingURL=1663331041484_stundents.js.map