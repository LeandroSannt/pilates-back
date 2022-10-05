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
const Gang_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Gang"));
const Student_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Student"));
const luxon_1 = require("luxon");
class GangLack extends Orm_1.BaseModel {
}
__decorate([
    (0, Orm_1.column)({ isPrimary: true }),
    __metadata("design:type", Number)
], GangLack.prototype, "id", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], GangLack.prototype, "student_id", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Student_1.default, { foreignKey: "student_id" }),
    __metadata("design:type", Object)
], GangLack.prototype, "student", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", Number)
], GangLack.prototype, "gang_id", void 0);
__decorate([
    (0, Orm_1.belongsTo)(() => Gang_1.default, { foreignKey: "gang_id" }),
    __metadata("design:type", Object)
], GangLack.prototype, "gang", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], GangLack.prototype, "date_lacks", void 0);
__decorate([
    (0, Orm_1.column)(),
    __metadata("design:type", String)
], GangLack.prototype, "observation", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], GangLack.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], GangLack.prototype, "updatedAt", void 0);
exports.default = GangLack;
//# sourceMappingURL=GangLack.js.map