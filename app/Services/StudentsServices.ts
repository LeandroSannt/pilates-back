import moment from 'moment';

import Student from '../Models/Student';
import { countMonths } from './../Helpers/countMonths';
import { BaseServices } from './BaseServices';

interface StoreStudent{
  name: string;
  registration: string;
  email?: string | null;
  telephone?: string | null;
  telephone_emergency?: string | null;
  birth_date?: string | null;
  objective?: string | null;
  plan_id: number;
  plan_expiration_day?: string | null;
}

export default class StudentsServices extends BaseServices {
  constructor() {
    super({model: Student,name_model:'Alunos'})
  }

  async listStudentsPaginated(page:number,limit:number,status:string,planId:string,name:string){
    moment.locale('pt-BR');

    let students = await Student
    .query()
    .preload('plan')
    .where((query) =>{
      if(status && status !== 'todos'){
        query.where('status',status)
      }
    })
    .whereHas('plan', (planQuery) => {
      if(planId  && planId !== 'todos'){
        planQuery.where('id', planId)
      }
    })
    .where((query) =>{
      if(name){

        query.whereLike('name', `%${name}%`)
      }
    })
    .orderBy([
      {
        column:'status',
        order:'desc'
      },
      {
        column:'id',
        order:"desc"
      }
    ])
    .paginate(page, limit)

    const studentExpiration =Promise.all(
     students.toJSON().data.map(async (student) =>{
      const currentMonth =  countMonths({end:student.plan_expiration_day,date_start_plan:student.date_start_plan,total:student.plan.amount_installments})
      const studentExpiration = {
        expiration_date:currentMonth >  student.plan.amount_installments ? student.plan.amount_installments : currentMonth,
        ...student.toJSON()
      }

      const current = new Date()
      const expirationDate = new Date(student.plan_expiration_day)
      const sevenDaysPrev = new Date(moment(student.plan_expiration_day).subtract(7, 'days').format())

      if(current > expirationDate){
        await Student.query().where({id:student.id}).update({status:'vencido'})
      }else if( current > sevenDaysPrev  &&  current < expirationDate ){
        await Student.query().where({id:student.id}).update({status:'a vencer'})
      }else{
        await Student.query().where({id:student.id}).update({status:'ativo'})
      }
      return studentExpiration
    }))

    const newStudent = {
      meta:students.getMeta(),
      data:await studentExpiration
    }

    return {
      data:newStudent,
      status:201
    }
  }

  async storeStudent(data:StoreStudent):Promise<{data:any,status:number}> {

    const store = await this.Model.create({
      ...data,
      current_month_plan:1,
      status:"ativo",
      date_start_plan:new Date(),

    })

    return {
      data:store,
      status:200,
    }
  }

  async updateStudent(id:number,data:StoreStudent):Promise<{data:any,status:number}>{
    const student = await Student.find(id)

    if(student){
      const sevenAfeterDays =  moment(student.plan_expiration_day).subtract(7, 'days').format('DD/MM/YYYY')
      const currentDate = moment().format('DD/MM/YYYY')
      if(currentDate > sevenAfeterDays){
        await Student.query().where({id}).update({
          ...data,
         status:  'a vencer'
        })
      }else{
        await Student.query().where({id}).update({
          ...data,
         status:  'ativo'
        })
      }
    }

    //so posso atualizar para ativo se a data for menor que a dos 7 dias

    return {
      data:student,
      status:204
    }
  }

  async renovationPlan(id:number){
    await Student.
      query()
      .where('id',id)
      .update({date_start_plan:new Date(),status:'ativo'})

      return {
        data:1,
        status:201,
      }
  }

  async studentsbirthDate(month:number){
    const birthDate = await Student.query()
    .whereRaw('EXTRACT (MONTH FROM cast(birth_date as timestamp)) = ?', [month])
    .whereNot('status','inativo')

    return {
      data:birthDate,
      status:200
    }
  }
}
