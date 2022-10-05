
import Student from '../Models/Student';
import { BaseServices } from './BaseServices';

export default class FileServices extends BaseServices {
  constructor() {
    super({model: Student,name_model:'Alunos'})
  }

  static randomString (length = 36) {
    return [...Array(length)].map(() => Math.random().toString(36)[3]).join('')
  }

   rename (ext) {
    return `${FileServices.randomString()}.${ext}`
  }


   async updateFileStudent(){
   // const s3 = Drive.use('s3')


    // files.map(async (file) =>{
    // })3

    // const arquivo =  await files.moveToDisk('pilates', {
    //   name: `teste.${files.extname}`
    // },'s3')

    // for (let file of files) {
    //   try{




    //   }catch(err){
    //   console.log(err)
    //   }
    //   // const path = this.rename(file.extname)
    //   // const result = await file.move(Application.tmpPath('uploads'))
    //   // await s3.put(`/${path}`, file.tmpPath)

    //   //console.log(result)
    // }

  }
}
