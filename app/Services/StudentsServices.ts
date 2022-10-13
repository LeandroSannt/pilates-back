import moment from 'moment';

import Student from '../Models/Student';
import { getExpirationStudent } from './../Helpers/getExpirationStudent';
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
      const expiration_date = getExpirationStudent(student as any)
      const studentExpiration = {expiration_date,...student.toJSON()}

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
      status:"ativo"
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
      .update({current_month_plan:1,status:'ativo'})

      return {
        data:1,
        status:201,
      }
  }
}
