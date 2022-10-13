import { getExpirationStudent } from 'App/Helpers/getExpirationStudent';
import moment from 'moment';

import Student from '../Models/Student';

export const updateCurrentMonth = async () => {
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

    if(student.plan_expiration_day === current_day){
      if(Number(student.current_month_plan) === student.plan.amount_installments){
        //se a quantdade de meses for iguaal ao total de meses coloque a vencer
        await Student
        .query()
        .where('id', student.id)
        .update('status', 'a vencer')
      }else if(Number(student.current_month_plan) < student.plan.amount_installments){
        //se o a quantidade de meses for menor que a quantidade total de meses do plano adiciona mais u
        await Student
        .query()
        .where('id', student.id)
        .update('current_month_plan', student.current_month_plan +=1)

      }else if(moment().format('DD/MM/YYYY') === tomorrowExpirationDate){
        //se a data de hoje for igual a data de um dia depois do vencimento atualiza para vencido
        await Student
        .query()
        .where('id', student.id)
        .update('status', 'vencido')
      }
    }
  })

  //verifica isso todos os dias meia noite


}
