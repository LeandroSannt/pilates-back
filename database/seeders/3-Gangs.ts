import { faker } from '@faker-js/faker';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Gang from 'App/Models/Gang';
import moment from 'moment';

export default class extends BaseSeeder {
  public async run () {


    const gang: Gang[] = [];
    function createRandomGangLake(): any {
      return {
        gang_id:Math.floor(Math.random() * 7) + 1,
        student_id:Math.floor(Math.random() * 25) + 1,
        date_exchanges:moment(faker.date.recent()).format(),
        date_lacks:moment(faker.date.recent()).format(),
        observation:faker.lorem.text(),
        status:'ativo',
      };
    }

    Array.from({ length: 25 }).forEach(() => {
      gang.push(createRandomGangLake());
    });

    await Gang.createMany([
      {
        day:"segunda",
        time:"7",
      },
      {
        day:"segunda",
        time:"19",
      },
      {
        day:"terca",
        time:"7",
      },
      {
        day:"terca",
        time:"8",
      },
      {
        day:"quarta",
        time:"7",
      },
      {
        day:"quinta",
        time:"7",
      },
      {
        day:"sexta",
        time:"7",
      },
    ])
  }
}
