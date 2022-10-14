import { faker } from '@faker-js/faker';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Student from 'App/Models/Student';
import moment from 'moment';

import { } from '../../app/interfaces';

export default class extends BaseSeeder {
  public async run () {

     const STUDENTS: Student[] = [];


    function createRandomStudent(): any {
      return {
        registration:faker.datatype.uuid(),
        name:faker.name.fullName(),
        email:faker.internet.email(),
        telephone:'99999999',
        telephone_emergency:'99999999',
        birth_date:moment(faker.date.birthdate()).format(),
        current_month_plan:1,
        status:"ativo",
        objective:faker.lorem.text(),
        plan_id:Math.floor(Math.random() * 4) + 1,
        plan_expiration_day:faker.date.recent(),
        date_start_plan:new Date()
      };
    }

    Array.from({ length: 25 }).forEach(() => {
      STUDENTS.push(createRandomStudent());
    });

    await Student.createMany(STUDENTS)
  }
}
