"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class CreateOrUpdateGangValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            time: Validator_1.schema.enum(['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19']),
            day: Validator_1.schema.enum(['segunda', 'terca', 'quarta', 'quinta', 'sexta']),
        });
        this.messages = {};
    }
}
exports.default = CreateOrUpdateGangValidator;
//# sourceMappingURL=CreateOrUpdateGangValidator.js.map