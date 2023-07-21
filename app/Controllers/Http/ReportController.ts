import Application from "@ioc:Adonis/Core/Application";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
export default class ReportController {
  async financial({}: HttpContextContract) {}

  async downloadfinancial({ response }: HttpContextContract) {
    //const studentService = new ReportServices()
    //const filePath = await studentService.donwloadPdfFinancial(response)

    //const image = fs.createReadStream('tmp/reports/report.pdf')

    //console.log(image)
    const filePathw = Application.tmpPath("uploads/leandro.pdf");

    response.download(filePathw, true);
  }
}
