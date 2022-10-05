import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Plan from 'App/Models/Plan'

export default class extends BaseSeeder {
  public async run () {

    await Plan.createMany([
      {
        value:168,
        name_plan:'Anual',
        amount_installments:12,
        percent_rate:3

      },
      {
        value:189,
        name_plan:'Semestral',
        amount_installments:6,
        percent_rate:2

      },
      {
        value:209,
        name_plan:'Quadrimestral',
        amount_installments:4,
        percent_rate:1

      },
      {
        value:240,
        name_plan:'Mensal',
        amount_installments:1,
        percent_rate:0
      },
    ])
    // Write your database queries inside the run method
  }
}
