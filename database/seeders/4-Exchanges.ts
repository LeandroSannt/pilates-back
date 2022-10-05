import { faker } from '@faker-js/faker';
import BaseSeeder from '@ioc:Adonis/Lucid/Seeder';
import Exchange from 'App/Models/StudentExchange';
import moment from 'moment';

import {  } from '../../app/interfaces';

export default class extends BaseSeeder {
  public async run () {

     const exchange: Exchange[] = [];


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
      exchange.push(createRandomGangLake());
    });

    await Exchange.createMany(exchange)
  }
}
