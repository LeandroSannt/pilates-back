import moment from "moment";

export const  countMonths = ({end,date_start_plan}:any) => {
  var date1 = new Date(end)
  var date2 = new Date(date_start_plan);

  const diff = moment(date2, 'DD/MM/YYYY').diff(moment(date1, 'DD/MM/YYYY'))
  const months = moment.duration(diff).asMonths()

  return (Math.floor(months) * - 1 ) + 1
}
