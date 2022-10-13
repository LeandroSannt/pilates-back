import Stundent from "App/Models/Student";
import moment from 'moment';

export const getExpirationStudent = (student:Stundent):string =>{

  const month = moment().format('MM')
  const year = moment().format('YYYY')
  const getDay = moment(student.plan_expiration_day).format('DD')

  const validationDayExpiration = getDay === '31' ? '1' : getDay

  const currentMonthExpiration = `${validationDayExpiration}/${month}/${year}`
  const expiration_date = moment(currentMonthExpiration, 'DD/MM/YYYY').add(student.plan.amount_installments, 'months').calendar();

  return expiration_date
}
