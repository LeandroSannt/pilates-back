import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FileServices from 'App/Services/FileServices'

export default class FilesController {

  async updateFileStudant({request}:HttpContextContract){
    const files = request.file('prontuarios')
    const fileServices = new FileServices()

    if(files){
      await fileServices.updateFileStudent(files)
    }
  }
}
