import { LucidModel } from "@ioc:Adonis/Lucid/Orm"

import { ResponseProps, ServiceData, ServicesProps } from '../interfaces'

class BaseServices{
  Model: LucidModel
  name_model:string
  not_found:{
    error:string
  }

  constructor({model,name_model}:ServicesProps){
    this.Model = model
    this.name_model = name_model
  }

  async all():Promise<ResponseProps>{
    const findAll = await this.Model.all()
    return {
      data:findAll,
      status:201,
    }
  }

  async store({data}:ServiceData):Promise<ResponseProps>{
    const result = await this.Model.create(data)
    return {
      data:result,
      status:201,
    }
  }

  async update({data,id}:ServiceData):Promise<ResponseProps>{

    const findModel = await this.Model.findBy('id',id)

    if(!findModel){
      return {
        data:{error:`Não foi encontrado nenhum resultado para ${this.name_model.toLocaleLowerCase()}`},
        status:404,
      }
    }

    findModel.merge(data)

    await findModel.save()
    return {
      data:findModel,
      status:201,
    }

  }

  async destroy({id}:ServiceData):Promise<ResponseProps>{

    const findModel = await this.Model.find(id)

    if(!findModel){
      return {
        data:{error:`Não foi encontrado nenhum resultado para ${this.name_model.toLocaleLowerCase()}`},
        status:404,
      }
    }

    await findModel.delete()

    return {
      status:204,
    }
  }

  async getByIdModel({id}:ServiceData):Promise<ResponseProps>{

    const findModel = await this.Model.find(id)

    if(!findModel){
      return {
        data:{error:`Não foi encontrado nenhum resultado para ${this.name_model.toLocaleLowerCase()}`},
        status:404,
      }
    }

    return {
      data:findModel,
      status:200,
    }
  }

}

export { BaseServices }
