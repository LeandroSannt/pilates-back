"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreatePlanValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            value: Validator_1.schema.number(),
            name_plan: Validator_1.schema.string(),
            amount_installments: Validator_1.schema.number(),
        });
        this.messages = {};
    }
}
exports.default = CreatePlanValidator;
//# sourceMappingURL=CreatePlanValidator.js.map