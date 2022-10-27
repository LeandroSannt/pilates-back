import ClasseGang from 'App/Models/Classe';
import Gang from 'App/Models/Gang';
import StudentGang from 'App/Models/StudentGang';

import { BaseServices } from './BaseServices';

interface StoreClasseGang{
  name:string
  student_id:Array<number>
  gangs:Array<{
    day:string
    time:string
  }>
}

export default class GangsServices extends BaseServices {
  constructor() {
    super({model: ClasseGang,name_model:'Turmas'})
  }
  async getClasseGangs(day:string,time:string){
    const gang = await  ClasseGang.query()
    .preload("gangs", (query) =>{
      query.preload("studentGang",(query) =>{
        query.orderBy('id','asc')
      })
      query.where((query) =>{
        if(day && day !== 'todos'){
          query.where('day',day)
        }
        if(time){
          query.where('time',time)
        }
      })
    })

    return {
      data:gang,
      status:200
    }
  }

  async storeClassGangsService({gangs,name,student_id}:StoreClasseGang){

    //criar turma com name
    const classe = await ClasseGang.create({
      name,
      status:'ativo'
    })

    //cria gangs com os gangs

   const gangsCreated= Promise.all(gangs.map(async (gang) =>{
      return await Gang.create({
        ...gang,
        classe_id:classe.id
      })

    }))

    Promise.all( (await gangsCreated).map( async(gang) =>{
      return  student_id.map(async(id) =>{
          return await StudentGang.create({
            gang_id:gang.id,
            student_id:id,
            status:'ativo'
          })
        })
    }))

    //pegar todos os alunos recebios e criar em student_gangs com id das aulas criadas

    return {
      data:classe,
      status:201
    }

  }

}
