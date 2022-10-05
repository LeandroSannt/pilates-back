
 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { ControllerProps, Dto } from '../../interfaces';


export default class BaseController{
  fillable:any
  Service:any
  validator?:{
    create:any
    update?:any
  }

  constructor({service,validator}:ControllerProps){
    this.Service = service
    this.validator = validator
  }

  async index({response}:HttpContextContract){
    const service:Dto = new this.Service()
    const result = await service.all()

    return response.status(result.status).json(result.data)
  }

  async store({request,response}:HttpContextContract){
    const service:Dto = new this.Service()
    const data = await request.validate(this.validator?.create)

    const result = await service.store({data})

    return response.status(result.status).json(result.data)
  }

  async update({request,params,response}:HttpContextContract){
    const service:Dto = new this.Service()

    const data = await request.validate(this.validator?.update)
    const {id} = params

    const result = await service.update({data,id})

    return response.status(result.status).json(result.data)
  }

  async destroy({params,response}:HttpContextContract){
    const service:Dto = new this.Service()
    const {id} = params

    const result = await service.destroy(id)

    return response.status(result.status).json(result.data)
  }

  async show({params,response}:HttpContextContract){
    const service:Dto = new this.Service()
    const {id} = params

    const result = await service.getByIdModel({id})

    return response.status(result.status).json(result.data)
  }
}

