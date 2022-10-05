
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import CreateStudentValidator from 'App/Validators/CreateStudentValidator';
import UpdateStudentValidator from 'App/Validators/UpdateStudentValidator';
import StudentsServices from '../../Services/StudentsServices';
import BaseController from "./BaseController";



export default class StudentsController extends BaseController  {
  constructor(){
    super({
      service:StudentsServices,
      validator:{create:CreateStudentValidator,update:UpdateStudentValidator}})
  }


  async listStudentPaginated({request,response}:HttpContextContract){
    const page = request.input('page', 1)
    const status = request.input('status')
    const planId = request.input('planId')
    const name = request.input('name')
    const limit = 10
    const studentService = new StudentsServices()

    const result = await studentService.listStudentsPaginated(page,limit,status,planId,name)

    return response.status(result.status).json(result.data)

  }

  async storeStudent({request,response}:HttpContextContract){
    const data = await request.validate(CreateStudentValidator)
    const studentService = new StudentsServices()
    const result = await studentService.storeStudent(data)

    return response.status(result.status).json(result.data)

  }

  async renovationPlan({request,response}:HttpContextContract){
    const id = request.input('id')
    const studentService = new StudentsServices()

    const result = await studentService.renovationPlan(id)

    return response.status(result.status).json(result.data)

  }
}
