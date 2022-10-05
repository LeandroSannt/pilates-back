"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateStudentValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string(),
            registration: Validator_1.schema.string({}, [
                Validator_1.rules.unique({ table: 'students', column: 'registration' })
            ]),
            email: Validator_1.schema.string.nullableAndOptional({}, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: 'students', column: 'email' })
            ]),
            telephone: Validator_1.schema.string.nullableAndOptional(),
            telephone_emergency: Validator_1.schema.string.nullableAndOptional(),
            birth_date: Validator_1.schema.string.nullableAndOptional(),
            objective: Validator_1.schema.string.nullableAndOptional(),
            plan_id: Validator_1.schema.number([
                Validator_1.rules.exists({ table: 'plans', column: "id" })
            ]),
            plan_expiration_day: Validator_1.schema.string(),
        });
        this.messages = {};
    }
}
exports.default = CreateStudentValidator;
//# sourceMappingURL=CreateStudentValidator.js.map