import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Gang from 'App/Models/Gang';

export default class ValidatGang {
  public async handle({request,response}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL

    //nao posso criar uma aula com mesmo dia e mesmo horario

    const time = request.input('time')
    const day = request.input('day')

    const gangDay = await Gang.query()
    .where('day',day)
    .andWhere('time',time)
    .first()

    if(gangDay){
      return response.forbidden("Já existe uma aula cadastrada com esse horario")
    }

    await next()
  }
}
