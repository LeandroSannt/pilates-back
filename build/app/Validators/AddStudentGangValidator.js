"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateManyGangStudantValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            student_id: Validator_1.schema.number([
                Validator_1.rules.exists({ table: 'students', column: "id" })
            ]),
            gang_id: Validator_1.schema.number([
                Validator_1.rules.exists({ table: 'students', column: "id" })
            ]),
        });
    }
}
exports.default = CreateManyGangStudantValidator;
//# sourceMappingURL=AddStudentGangValidator.js.map