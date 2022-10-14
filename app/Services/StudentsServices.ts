import moment from 'moment';

import Student from '../Models/Student';
import { countMonths } from './../Helpers/countMonths';
import { updateCurrentMonth } from './../Helpers/updateCurrentMonth';
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
  plan_expiration_day: string;
}

export default class StudentsServices extends BaseServices {
  constructor() {
    super({model: Student,name_model:'Alunos'})
  }

  async listStudentsPaginated(page:number,limit:number,status:string,planId:string,name:string){
    moment.locale('pt-BR');

    await updateCurrentMonth()

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
        column: 'status',
        order: 'desc',
      },
      {
        column: 'id',
        order: 'desc',
      }
    ])
    .paginate(page, limit)

    const studentExpiration = students.toJSON().data.map((student) =>{
      const currentMonth =  countMonths({end:student.plan_expiration_day,date_start_plan:student.date_start_plan})
      const studentExpiration = {
        expiration_date:currentMonth >  student.plan.amount_installments ? student.plan.amount_installments : currentMonth,
        ...student.toJSON()
      }
      return studentExpiration
    })

    const newStudent = {
      meta:students.getMeta(),
      data:studentExpiration
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
      date_start_plan:new Date()
    })

    return {
      data:store,
      status:200,
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
}
