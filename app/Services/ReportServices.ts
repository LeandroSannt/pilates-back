import { DataFinancialReportProps } from 'App/interfaces';
import moment from 'moment';

import Student from '../Models/Student';
import { countMonths } from './../Helpers/countMonths';
import { PdfService } from './CreatePdfService';

export default class ReportServices {

   calcPercentRate(plan_value:number,amount_installments:number,percent_rate:number){
    const total =((plan_value * amount_installments) * (percent_rate /100)) / 2

    return total
  }

   calcAmountReceivable(plan_value:number){
    const total = ((60 /100) * plan_value)

    return total
  }


  async financialReport(){
    moment.locale('pt-BR');

    let students = await Student
    .query()
    .preload('plan')
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


    const studentExpiration = students.map((student) =>{
      const currentMonth =  countMonths({end:student.plan_expiration_day,date_start_plan:student.date_start_plan,total:student.plan.amount_installments})

      const studentReport = {
        expiration_date:currentMonth >  student.plan.amount_installments ? student.plan.amount_installments : currentMonth,
        //calc_amount_receivable: this.calcAmountReceivable(student.plan.value),
        calc_amount_receivable:this.calcAmountReceivable(student.plan.value),
        total_percent_rate: currentMonth > 1 || currentMonth === 0 ? 0 :
        student.plan.amount_installments === 1 ? 0 :
        this.calcPercentRate(student.plan.value,student.plan.amount_installments,student.plan.percent_rate)
         ,
        ...student.toJSON()
      }

      return studentReport
    })

    var sum_percent_rate = studentExpiration.reduce(function(soma, atual) {
      return soma + atual.total_percent_rate
    }, 0)

    var sum_amount_receivable = studentExpiration.reduce(function(soma, atual) {
      return soma + atual.calc_amount_receivable
    }, 0)

    var sum_value = studentExpiration.reduce(function(soma, atual) {
      return soma + (atual as any).plan.value
    }, 0)

    const receible = sum_amount_receivable - sum_percent_rate

    const data = {
      sum_percent_rate:new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(sum_percent_rate.toFixed(2))),
      sum_amount_receivable:new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(receible.toFixed(2))),
      sum_value:new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(sum_value.toFixed(2))),
      studentExpiration
    }



    return {
      data:data,
      status:201
    }
  }

  async donwloadPdfFinancial(){
      const pdfService = new PdfService()
      const pdf = await this.financialReport()

      const result = await pdfService.createPdf(pdf.data as unknown as DataFinancialReportProps)

      return result

  }

}
