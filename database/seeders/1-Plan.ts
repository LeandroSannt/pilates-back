import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Plan from "App/Models/Plan";

export default class extends BaseSeeder {
  public async run() {
    await Plan.createMany([
      {
        value: 200,
        name_plan: "Semestral 2x na semana",
        amount_installments: 6,
      },
      {
        value: 220,
        name_plan: "Quadrimestral 2x na semana",
        amount_installments: 4,
      },
      {
        value: 240,
        name_plan: "Mensal 2x na semana",
        amount_installments: 1,
      },

      {
        value: 300,
        name_plan: "Semestral 3x na semana",
        amount_installments: 6,
      },
      {
        value: 330,
        name_plan: "Quadrimestral 3x na semana",
        amount_installments: 4,
      },
      {
        value: 360,
        name_plan: "Mensal 3x na semana",
        amount_installments: 1,
      },
    ]);
    // Write your database queries inside the run method
  }
}
