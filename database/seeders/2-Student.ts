import { faker } from "@faker-js/faker";
import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";
import Student from "App/Models/Student";
import Plan from "App/Models/Plan";
import moment from "moment";

import {} from "../../app/interfaces";

export default class extends BaseSeeder {
  public async run() {
    const STUDENTS: Student[] = [];

    async function createRandomStudent(): Promise<any> {
      const plan_id = Math.floor(Math.random() * 6) + 1;

      const plan = await Plan.findBy("id", plan_id);
      plan?.amount_installments;

      const plan_expiration_day = moment()
        .add(plan?.amount_installments, "months")
        .format("YYYY-MM-DD");

      return {
        name: faker.name.fullName(),
        email: faker.internet.email(),
        telephone: "99999999",
        telephone_emergency: "99999999",
        birth_date: moment(faker.date.birthdate()).format(),
        current_month_plan: 1,
        status: "ativo",
        objective: faker.lorem.text(),
        plan_id,
        plan_expiration_day,
        date_start_plan: new Date(),
      };
    }

    Array.from({ length: 25 }).forEach(async () => {
      STUDENTS.push(await createRandomStudent());
    });

    await Student.createMany(STUDENTS);
  }
}
