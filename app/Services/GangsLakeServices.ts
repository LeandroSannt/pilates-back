
import moment from 'moment';
import GangLack from '../Models/GangLack';
import { BaseServices } from './BaseServices';

export default class GangLakeServices extends BaseServices {
  constructor() {
    super({model: GangLack,name_model:'Falta'})
  }

  async listRelashionships(page:number,limit:number,student_id:number,date:string){

    const lacks = await GangLack
    .query()
    .preload('gang')
    .preload('student', (query) =>{
      query.select('name','telephone','registration','email')
    } )
    .where((query) =>{
      if(student_id && student_id.toString() !== 'todos'){
        query.where('student_id',student_id)
      }
    })
    .where((query) =>{
      if(date){
        query.whereLike('date',`%${moment(date).format('YYYY-MM-DD')}%`)
      }
    })
    .orderBy('created_at','desc')
    .paginate(Number(page), Number(limit))


    return {
      data:lacks,
      status:200
    }
  }
}
