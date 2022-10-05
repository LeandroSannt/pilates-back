import Database from '@ioc:Adonis/Lucid/Database';
import { getExpirationStudent } from 'App/Helpers/getExpirationStudent';
import { DataFinancialReportProps } from 'App/interfaces';
import moment from 'moment';

import Student from '../Models/Student';
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
      const expiration_date = getExpirationStudent(student as any)
      const studentReport = {
        expiration_date,
        //calc_amount_receivable: this.calcAmountReceivable(student.plan.value),
        calc_amount_receivable:this.calcAmountReceivable(student.plan.value),
        total_percent_rate:this.calcPercentRate(student.plan.value,student.plan.amount_installments,student.plan.percent_rate),
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

    const data = {
      sum_percent_rate:new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(sum_percent_rate.toFixed(2))),
      sum_amount_receivable:new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(sum_amount_receivable.toFixed(2))),
      sum_value:new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(sum_value.toFixed(2))),
      studentExpiration
    }



    return {
      data:data,
      status:201
    }
  }


  async birthDateMonth(date:string){
    const student = await Student.query()
    // .raw()
    .whereJson('birth_date',
    Database
    .raw('select *')
    )
  }


  async donwloadPdfFinancial(response:any){
      const pdfService = new PdfService()
      const pdf = await this.financialReport()

      const result = await pdfService.createPdf(pdf.data as unknown as DataFinancialReportProps,response)

      return result

  }

}
