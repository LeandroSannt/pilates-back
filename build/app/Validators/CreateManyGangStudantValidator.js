"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreatePlanValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            student_id: Validator_1.schema.array().members(Validator_1.schema.number([
                Validator_1.rules.exists({ table: 'students', column: "id" })
            ])),
            day: Validator_1.schema.string(),
            time: Validator_1.schema.string(),
        });
        this.messages = {};
    }
}
exports.default = CreatePlanValidator;
//# sourceMappingURL=CreateManyGangStudantValidator.js.map