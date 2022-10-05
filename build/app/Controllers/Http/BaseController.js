"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseController {
    constructor({ service, validator }) {
        this.Service = service;
        this.validator = validator;
    }
    async index({ response }) {
        const service = new this.Service();
        const result = await service.all();
        return response.status(result.status).json(result.data);
    }
    async store({ request, response }) {
        const service = new this.Service();
        const data = await request.validate(this.validator?.create);
        const result = await service.store({ data });
        return response.status(result.status).json(result.data);
    }
    async update({ request, params, response }) {
        const service = new this.Service();
        const data = await request.validate(this.validator?.update);
        const { id } = params;
        const result = await service.update({ data, id });
        return response.status(result.status).json(result.data);
    }
    async destroy({ params, response }) {
        const service = new this.Service();
        const { id } = params;
        const result = await service.destroy(id);
        return response.status(result.status).json(result.data);
    }
    async show({ params, response }) {
        const service = new this.Service();
        const { id } = params;
        const result = await service.getByIdModel({ id });
        return response.status(result.status).json(result.data);
    }
}
exports.default = BaseController;
//# sourceMappingURL=BaseController.js.map