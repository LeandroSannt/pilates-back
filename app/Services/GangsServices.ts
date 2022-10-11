import Student from 'App/Models/Student';
import StudentGang from 'App/Models/StudentGang';

import Gang from '../Models/Gang';
import { BaseServices } from './BaseServices';

interface GangManyProps{
  student_id:number[]
  time:string
  day:string
}

export default class GangsServices extends BaseServices {
  constructor() {
    super({model: Gang,name_model:'Aulas'})
  }

  async storeMany({day,student_id,time}:GangManyProps){

    if(student_id.length > 5){
      return {
        data:{err:'Não é possivel resgistrar mais de 5 alunos por aula'},
        status:403,
      }
    }

    const students = await Student
    .query()
    .from('students')
    .whereIn('id', student_id)

    const gang = await Gang
      .create({
        day,
        time,
      })

     const r = students.map((student) =>{
      const obj = {
        student_id:student.id,
        gang_id:gang.id,
        status:'ativo'
      }

      return obj
     })

     const studentGang = await StudentGang
     .createMany(r)

     return {
      data:studentGang,
      status:200,
    }
  }

  async getGangsStudent(day:string,time:string){
    const gang =  Gang.query()
    .preload("studentGang")
    .select('id','time','day')
    .where((query) =>{
      if(day && day !== 'todos'){
        query.where('day',day)
      }
    })
    .where((query) =>{
      if(time){
        query.where('time',time)
      }
    })

    return gang
  }

  async addStudentforGang(student_id:number,gang_id:number){

    const create = await StudentGang.create({
      gang_id:gang_id,
      student_id:student_id,
      status:'ativo'
    })

    return {
      data:create,
      status:201,
    }
  }

  async deleteStudentForGang(student_id:number,gang_id:number){
    await StudentGang.query()
    .where({student_id})
    .andWhere({gang_id})
    .delete()

    return {
      data:'Aluno removido',
      status:200
    }
  }
}
