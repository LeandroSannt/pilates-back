"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const luxon_1 = require("luxon");
const File_1 = __importDefault(require("./File"));
const Plan_1 = __importDefault(require("./Plan"));
const StudentExchange_1 = __importDefault(require("./StudentExchange"));
class Student extends Orm_1.BaseModel {
}
Student.existsExganges = (0, Orm_1.scope)((query) => {
    query
        .from('student_exchanges')
        .whereColumn('students.id', 'student_exchanges.student_id')
        .andWhere('status', 'ativo')
        .limit(1);
});
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], Student.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "registration", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "name", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "email", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "telephone", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "telephone_emergency", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "birth_date", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Student.prototype, "plan_id", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Plan_1.default, { foreignKey: "plan_id" }),
    __metadata("design:type", Object)
], Student.prototype, "plan", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => File_1.default, { foreignKey: "student_id" }),
    __metadata("design:type", Object)
], Student.prototype, "file", void 0);
__decorate([
    (0, Orm_1.hasMany)(() => StudentExchange_1.default, { foreignKey: "student_id" }),
    __metadata("design:type", Object)
], Student.prototype, "exchange", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "plan_expiration_day", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Student.prototype, "current_month_plan", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "objective", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "status", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Student.prototype, "created_at", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Student.prototype, "updated_at", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], Student.prototype, "total_exchanges", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Student.prototype, "total_percent_rate", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], Student.prototype, "calc_amount_receivable", void 0);
exports.default = Student;
//# sourceMappingURL=Student.js.map