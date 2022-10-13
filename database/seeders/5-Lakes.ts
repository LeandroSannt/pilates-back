import { faker } from '@faker-js/faker';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import GangLack from 'App/Models/GangLack';
import moment from 'moment';

import { } from '../../app/interfaces';

export default class extends BaseSeeder {
  public async run () {

     const Lakes: GangLack[] = [];


    function createRandomGangLake(): any {
      return {
        gang_id:Math.floor(Math.random() * 7) + 1,
        student_id:Math.floor(Math.random() * 25) + 1,
        date_lacks:moment(faker.date.recent()).format(),
        observation:faker.lorem.text()
      };
    }

    Array.from({ length: 25 }).forEach(() => {
      Lakes.push(createRandomGangLake());
    });

    await GangLack.createMany(Lakes)
  }
}
