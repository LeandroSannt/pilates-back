
import Application from '@ioc:Adonis/Core/Application';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import ReportServices from '../../Services/ReportServices';


export default class ReportController {
  async financial({response}:HttpContextContract){
    const studentService = new ReportServices()
    const result = await studentService.financialReport()

    return response.status(result.status).json(result.data)
  }

  async downloadfinancial({response}:HttpContextContract){
    //const studentService = new ReportServices()
    //const filePath = await studentService.donwloadPdfFinancial(response)

    //const image = fs.createReadStream('tmp/reports/report.pdf')

    //console.log(image)
    const filePathw = Application.tmpPath('uploads/leandro.pdf')

    response.download(filePathw,true)

  }
}
