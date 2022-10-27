import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Gang from 'App/Models/Gang';
import CreateClasseValidator from 'App/Validators/CreateClasseValidator';

export default class ValidatGang {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    //nao posso criar uma aula com mesmo dia e mesmo horario
    const {gangs} = await request.validate(CreateClasseValidator)

    Promise.all( gangs.map( async (gang) =>{

      const gangDay = await Gang.query()
      .where('day',gang.day)
      .andWhere('time',gang.time)
      .first()

      if(gangDay){
        return response.forbidden("Já existe uma aula cadastrada com esse horario")
      }else{


        return await next()
      }
    }))
  }
}
