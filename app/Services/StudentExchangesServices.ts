import Gang from 'App/Models/Gang'
import Student from '../Models/Student'
import { default as Exchange, default as StudentExchange } from '../Models/StudentExchange'
import { BaseServices } from './BaseServices'

export default class StudentExchangeServices extends BaseServices {
  constructor() {
    super({model: StudentExchange,name_model:'Reposições'})
  }

  async getAllExchangesPaginated(page:number,limit:number,student_id:number){
    const students = await Student
    .query()
    .whereExists((query) => {
      query.withScopes((scope) =>scope.existsExganges())
    })
    .preload('exchange', (query) =>{
      query.where('status','ativo')
      query.preload('gang')
    })
    .withCount('exchange',(query) =>{
      query.where('status','ativo')
    })
    .where((query) =>{
      if(student_id && student_id.toString() !== 'todos'){
        query.where("id",student_id)
      }
    })
    .paginate(page, limit)

    students.forEach((student) => {
      student.total_exchanges = student.$extras.exchange_count
    })

    return {
      data:students,
      status:200
    }
  }

  async getAllExchanges(){
    const students = await Student
    .query()
    .whereExists((query) => {
      query.withScopes((scope) =>scope.existsExganges())
    })

    return {
      data:students,
      status:200
    }
  }

  async finishExchange(id:number){
    const exchange = await Exchange.find(id)
    if(exchange){
      exchange.status = 'concluido'

      exchange.save()

      return {
        data:exchange,
        status:201
      }
    }

    return {
      data:{err:'Não foi encontrado a remarcação'},
      status:404
    }

  }

  async updateDateExchange(id:number,date:string){
    const exchange = await Exchange.find(id)

    if(exchange){
      exchange.date_exchanges = date

      exchange.save()

      return {
        data:exchange,
        status:201
      }
    }

    return {
      data:{err:'Não foi encontrado a remarcação'},
      status:404
    }

  }

  async cancelGang(gang_ids:Array<number>,date_lacks:string,observation:string){

    const gangs = await Gang
    .query()
    .whereIn('id',gang_ids)
    .preload('studentGang', (query) =>{
      query.where('student_gangs.status','ativo')
    })

   const result = Promise.all( gangs.map(async(gang) =>{
      const c = Promise.all( gang.studentGang.map(async(student) =>{

       const response =  await StudentExchange.create({
          gang_id:gang.id,
          student_id:student.id,
          date_lacks:date_lacks,
          observation:observation,
          canceled:true
        })

        return response.toJSON()

      }))

      return c
    }))

    return {
      data:result,
      status:200
    }
  }
}
