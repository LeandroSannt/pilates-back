import { BaseTask } from 'adonis5-scheduler/build';
import { getExpirationStudent } from 'App/Helpers/getExpirationStudent';
import moment from 'moment';
import Student from '../Models/Student';

moment.locale('pt-br')

export default class WatichingCurrentMonth extends BaseTask {
	public static get schedule() {
		return '10 * * * * *'
	}
	/**
	 * Set enable use .lock file for block run retry task
	 * Lock file save to `build/tmpTaskLock`
	 */
	public static get useLock() {
		return false
	}

	public async handle() {
    //ler todos os alunos com plano

    const students = await Student
    .query()
    .preload('plan')
    .where('status','ativo')

    //verificar se o plan_expiration_day é igual ao dia de hoje
    const current_day = moment().format('DD')

    students.map(async(student) =>{
      const expiration_date = getExpirationStudent(student)
      const tomorrowExpirationDate = moment(expiration_date,'DD/MM/YYYY').add(1, 'days').calendar();


      if(moment(student.plan_expiration_day).format('DD') === current_day){
        if(Number(student.current_month_plan) === student.plan.amount_installments){
          await Student
          .query()
          .where('id', student.id)
          .update('status', 'a vencer')
        }else if(Number(student.current_month_plan) < student.plan.amount_installments){
          await Student
          .query()
          .where('id', student.id)
          .update('current_month_plan', student.current_month_plan +=1)

        }else if(moment().format('DD/MM/YYYY') === tomorrowExpirationDate){
          await Student
          .query()
          .where('id', student.id)
          .update('status', 'vencido')
        }
      }
    })



    //verifica isso todos os dias meia noite


  	}
}
