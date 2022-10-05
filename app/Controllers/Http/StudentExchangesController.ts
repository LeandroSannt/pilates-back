import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import ExchangesServices from 'App/Services/StudentExchangesServices';
import ExchangesValidator from 'App/Validators/CreateStudentExchangeValidator';

import BaseController from "./BaseController";

export default class StudentExchangesController  extends BaseController {
  constructor(){
    super({
      service:ExchangesServices,
      validator:{create:ExchangesValidator,update:ExchangesValidator}})
   }


   async listPaginated({request,response}:HttpContextContract){
    const page = request.input('page', 1)
    const student_id = request.input('student_id')
    const limit = 10
    const studentService = new ExchangesServices()

    const result = await studentService.getAllExchangesPaginated(page,limit,student_id)

    return response.status(result.status).json(result.data)

  }

  async list({response}:HttpContextContract){

      const studentService = new ExchangesServices()

      const result = await studentService.getAllExchanges()

      return response.status(result.status).json(result.data)

  }

  async finishExchange({request,response}:HttpContextContract){

    const exchangeId = request.input('exchangeId')

    const studentService = new ExchangesServices()

    const result = await studentService.finishExchange(exchangeId)

    return response.status(result.status).json(result.data)
  }

  async updateDateExchange({request,response}:HttpContextContract){

    const {id,date} = request.only(['id','date'])
    const studentService = new ExchangesServices()

    const result = await studentService.updateDateExchange(id,date)

    return response.status(result.status).json(result.data)
  }

  async cancelGang({request,response}:HttpContextContract){

    const {date_lacks,gang_ids,observation} = request.only(['gang_ids','observation','date_lacks'])
    const studentService = new ExchangesServices()

    const result = await studentService.cancelGang(gang_ids,date_lacks,observation)

    return response.status(result.status).json(result.data)
  }
}
