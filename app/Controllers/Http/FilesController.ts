import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import FileServices from 'App/Services/FileServices';

export default class FilesController {

  async updateFileStudant({request}:HttpContextContract){
   const files = request.file('prontuarios')
    const fileServices = new FileServices()

    const postData = await request.validate({
       schema:schema.create({
        file:schema.file({
          size:'2mb',
          extnames:['pdf']
        })
       })
    })

    try{
      // const i = await files?.moveToDisk('pilates',{},'s3')
      const i = await postData.file.moveToDisk('teste',{},'s3')
      console.log(i)
    }catch(err){
      console.log(err)
    }

    if(files){
      await fileServices.updateFileStudent(files)
    }
  }
}
