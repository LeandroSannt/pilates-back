"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.resource('plans', 'PlansController').except(['create', 'edit']);
Route_1.default.group(() => {
    Route_1.default.get('/gangs', 'GangsController.index');
    Route_1.default.get('/gangs/:id', 'GangsController.show');
    Route_1.default.post('/gangs/', 'GangsController.store').middleware('validateGang');
    Route_1.default.put('/gangs/:id', 'GangsController.update').middleware('validateGang');
    Route_1.default.delete('/gangs/:id', 'GangsController.destroy');
    Route_1.default.post('/gangs/store-many', 'GangsController.storeMany').middleware('validateGang');
    Route_1.default.get('/gangStudents/get-gang-students', 'GangsController.getGangsStudent');
    Route_1.default.post('/gangStudents/add-gang-students', 'GangsController.addStudentGang');
});
Route_1.default.group(() => {
    Route_1.default.get('/students', 'StudentsController.index');
    Route_1.default.get('/students/paginated', 'StudentsController.listStudentPaginated');
    Route_1.default.get('/students/:id', 'StudentsController.show');
    Route_1.default.post('students/', 'StudentsController.store');
    Route_1.default.put('/students/:id', 'StudentsController.update');
    Route_1.default.delete('/students/:id', 'StudentsController.destroy');
    Route_1.default.post('/students/store-current-month', 'StudentsController.storeStudent');
    Route_1.default.patch('/students/renovation-plan', 'StudentsController.renovationPlan');
});
Route_1.default.group(() => {
    Route_1.default.put('/files', 'FilesController.updateFileStudant');
});
Route_1.default.group(() => {
    Route_1.default.post('/gangLakes', 'GangLacksController.store');
    Route_1.default.get('/gangLakes/listPaginated', 'GangLacksController.listRelashionships');
});
Route_1.default.group(() => {
    Route_1.default.post('/exchanges', 'StudentExchangesController.store');
    Route_1.default.get('/exchanges/listPaginated', 'StudentExchangesController.listPaginated');
    Route_1.default.get('/exchanges/list', 'StudentExchangesController.list');
    Route_1.default.patch('/exchanges/finish', 'StudentExchangesController.finishExchange');
    Route_1.default.patch('/exchanges/update-day', 'StudentExchangesController.updateDateExchange');
    Route_1.default.post('/exchanges/update-cancel-gangs', 'StudentExchangesController.cancelGang');
});
Route_1.default.group(() => {
    Route_1.default.get('/report/financial', 'ReportController.financial');
    Route_1.default.get('/report/financial-download', 'ReportController.downloadfinancial');
});
//# sourceMappingURL=routes.js.map