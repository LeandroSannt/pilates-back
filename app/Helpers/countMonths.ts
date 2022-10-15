import moment from "moment";

export const  countMonths = ({end,total}:any) => {
  var date1 = new Date(end)
  var date2 = new Date();

  const diff = moment(date2, 'DD/MM/YYYY').diff(moment(date1, 'DD/MM/YYYY'))
  const months = moment.duration(diff).asMonths()
  const month = (Math.floor(months) * - 1 )

  let result = (total - month) + 1


  return result
}
