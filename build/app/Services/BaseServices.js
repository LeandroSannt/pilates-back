"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseServices = void 0;
class BaseServices {
    constructor({ model, name_model }) {
        this.Model = model;
        this.name_model = name_model;
    }
    async all() {
        const findAll = await this.Model.all();
        return {
            data: findAll,
            status: 201,
        };
    }
    async store({ data }) {
        const result = await this.Model.create(data);
        return {
            data: result,
            status: 201,
        };
    }
    async update({ data, id }) {
        const findModel = await this.Model.findBy('id', id);
        if (!findModel) {
            return {
                data: { error: `Não foi encontrado nenhum resultado para ${this.name_model.toLocaleLowerCase()}` },
                status: 404,
            };
        }
        findModel.merge(data);
        await findModel.save();
        return {
            data: findModel,
            status: 201,
        };
    }
    async destroy({ id }) {
        const findModel = await this.Model.find(id);
        if (!findModel) {
            return {
                data: { error: `Não foi encontrado nenhum resultado para ${this.name_model.toLocaleLowerCase()}` },
                status: 404,
            };
        }
        await findModel.delete();
        return {
            status: 204,
        };
    }
    async getByIdModel({ id }) {
        const findModel = await this.Model.find(id);
        if (!findModel) {
            return {
                data: { error: `Não foi encontrado nenhum resultado para ${this.name_model.toLocaleLowerCase()}` },
                status: 404,
            };
        }
        return {
            data: findModel,
            status: 200,
        };
    }
}
exports.BaseServices = BaseServices;
//# sourceMappingURL=BaseServices.js.map