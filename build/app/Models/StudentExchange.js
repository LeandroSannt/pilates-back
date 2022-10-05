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
const Gang_1 = __importDefault(require("./Gang"));
class StudentExchange extends Orm_1.BaseModel {
    static activeStatus(exchange) {
        exchange.status = 'ativo';
    }
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], StudentExchange.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], StudentExchange.prototype, "date_exchanges", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], StudentExchange.prototype, "date_lacks", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], StudentExchange.prototype, "gang_id", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Gang_1.default, { foreignKey: "gang_id" }),
    __metadata("design:type", Object)
], StudentExchange.prototype, "gang", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], StudentExchange.prototype, "student_id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], StudentExchange.prototype, "observation", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], StudentExchange.prototype, "status", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Boolean)
], StudentExchange.prototype, "canceled", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], StudentExchange.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], StudentExchange.prototype, "updatedAt", void 0);
__decorate([
    (0, Orm_1.beforeCreate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [StudentExchange]),
    __metadata("design:returntype", void 0)
], StudentExchange, "activeStatus", null);
exports.default = StudentExchange;
//# sourceMappingURL=StudentExchange.js.map