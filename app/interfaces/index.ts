import { Response } from '@adonisjs/core/build/standalone'
import { LucidModel } from "@ioc:Adonis/Lucid/Orm"

export interface ResponseProps{
  data?:Object | Array<Object>
  status:number
}

export interface ServicesProps{
  model:LucidModel
  name_model:string
}

export interface ServiceData{
  data?:any
  id?:number
  response?:Response
}

export interface Dto{
  all():Promise<ResponseProps>
  store(data:ServiceData):Promise<ResponseProps>
  update(data:ServiceData):Promise<ResponseProps>
  destroy(data:ServiceData):Promise<ResponseProps>
  getByIdModel(data:ServiceData):Promise<ResponseProps>
}

export interface ControllerProps{
  service:any
  validator?:{
    create:any
    update?:any
  }
}

interface PlanProps{
  value:number
  name_plan:string
  amount_installments:number
  percent_rate:number
}

interface StudentProps{
  expiration_date:string
  calc_amount_receivable:number
  total_percent_rate:string
  registration:string
  name:string
  plan_expiration_day:string
  current_month_plan:number
  status:string
  plan:PlanProps
}

export interface DataFinancialReportProps{
  sum_percent_rate:string
  sum_amount_receivable:string
  sum_value:string
  studentExpiration:StudentProps[]
}
