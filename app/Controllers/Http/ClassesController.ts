import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ClassesServices from 'App/Services/ClassesServices';

import CreateClasseValidator from '../../Validators/CreateClasseValidator';
import CreateClasseValidatorDefault from '../../Validators/CreateClasseValidatorDefault';
import BaseController from './BaseController';

export default class FilesController extends BaseController {
  constructor(){
    super({service:ClassesServices,validator:{create:CreateClasseValidatorDefault,update:CreateClasseValidatorDefault}})
  }

  async storeClassGangs({request,response}:HttpContextContract){
    const {gangs,student_id} = await request.validate(CreateClasseValidator)

    const classes = new ClassesServices()
    const result = await classes.storeClassGangsService({gangs,student_id})

    return response.status(result.status).json(result.data)

  }

  async getClassesGangs({request,response}:HttpContextContract){
    const {day,time} = request.only(['day','time'])

    const classes = new ClassesServices()

    const result = await classes.getClasseGangs(day,time)

    return response.status(result.status).json(result.data)

  }



}
