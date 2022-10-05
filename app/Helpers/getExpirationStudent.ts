import Stundent from "App/Models/Student";
import moment from 'moment';

export const getExpirationStudent = (student:Stundent):string =>{

  const month = moment().format('MM')
  const year = moment().format('YYYY')

  const validationDayExpiration = student.plan_expiration_day === '31' ? '1' : student.plan_expiration_day

  const currentMonthExpiration = `${validationDayExpiration}/${month}/${year}`
  const expiration_date = moment(currentMonthExpiration, 'DD/MM/YYYY').add(student.plan.amount_installments, 'months').calendar();

  return expiration_date
}
