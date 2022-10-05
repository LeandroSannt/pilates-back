"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Student_1 = __importDefault(require("../Models/Student"));
const BaseServices_1 = require("./BaseServices");
class FileServices extends BaseServices_1.BaseServices {
    constructor() {
        super({ model: Student_1.default, name_model: 'Alunos' });
    }
    static randomString(length = 36) {
        return [...Array(length)].map(() => Math.random().toString(36)[3]).join('');
    }
    rename(ext) {
        return `${FileServices.randomString()}.${ext}`;
    }
    async updateFileStudent() {
    }
}
exports.default = FileServices;
//# sourceMappingURL=FileServices.js.map