/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|

*/


import Route from '@ioc:Adonis/Core/Route';

Route.resource('plans', 'PlansController').except(['create', 'edit'])

Route.group(()=>{
  Route.get('/gangs', 'GangsController.index')
  Route.get('/gangs/:id', 'GangsController.show')
  Route.post('/gangs/', 'GangsController.store')
  Route.put('/gangs/:id', 'GangsController.update')
  Route.delete('/gangs/:id', 'GangsController.destroy')
  Route.post('/gangs/store-many', 'GangsController.storeMany')
  Route.get('/gangStudents/get-gang-students', 'GangsController.getGangsStudent')
  Route.post('/gangStudents/add-gang-students', 'GangsController.addStudentGang')
  Route.delete('/gangStudents/delete-gang-students', 'GangsController.deleteStudentGang')
})

Route.group(() =>{
  Route.get('/students', 'StudentsController.index')
  Route.get('/students/paginated', 'StudentsController.listStudentPaginated')
  Route.get('/students/:id', 'StudentsController.show')
  Route.post('students/', 'StudentsController.store')
  Route.put('/students/:id', 'StudentsController.update')
  Route.delete('/students/:id', 'StudentsController.destroy')
  Route.put('/students/:id/updateStatus', 'StudentsController.updateStudent')
  Route.post('/students/store-current-month', 'StudentsController.storeStudent')
  Route.patch('/students/renovation-plan', 'StudentsController.renovationPlan')
})

Route.group(() =>{
  Route.put('/files', 'FilesController.updateFileStudant')
})

Route.group(() =>{
  Route.post('/gangLakes', 'GangLacksController.store')
  Route.get('/gangLakes/listPaginated', 'GangLacksController.listRelashionships')
})

Route.group(() =>{
  Route.post('/exchanges', 'StudentExchangesController.store')
  Route.get('/exchanges/listPaginated', 'StudentExchangesController.listPaginated')
  Route.get('/exchanges/list', 'StudentExchangesController.list')
  Route.patch('/exchanges/finish', 'StudentExchangesController.finishExchange')
  Route.patch('/exchanges/update-day', 'StudentExchangesController.updateDateExchange')
  Route.post('/exchanges/update-cancel-gangs', 'StudentExchangesController.cancelGang')
})

Route.group(() =>{
  Route.get('/report/financial', 'ReportController.financial')
  Route.get('/report/financial-download', 'ReportController.downloadfinancial')
})


Route.group(() =>{
  Route.post('/classes/storeGangs', 'ClassesController.storeClassGangs').middleware('validateGang')
  Route.get('/classes/getClasseGangs', 'ClassesController.getClassesGangs')
  Route.post('/classes/store', 'ClassesController.store')
})





