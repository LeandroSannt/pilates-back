import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

import GangLakesServices from 'App/Services/GangsLakeServices';
import CreateGangLakeValidator from 'App/Validators/CreateGangLakeValidator';
import BaseController from "./BaseController";

export default class GangLacksController  extends BaseController {
  constructor(){
    super({service:GangLakesServices,validator:{create:CreateGangLakeValidator,update:CreateGangLakeValidator}})
  }

  async listRelashionships({request,response}:HttpContextContract){
    const lakes = new GangLakesServices()

    const {student_id,date_lacks} = request.only(['student_id','date_lacks'])

    const page = request.input('page', 1)

    const limit = 10

    const result = await lakes.listRelashionships(page,limit,student_id,date_lacks)

    return response.status(result.status).json(result.data)
  }
}
