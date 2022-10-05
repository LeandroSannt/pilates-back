import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gangs'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.enum('time',['6','7','8','9','10','11','12','13','14','15','16','17','18','19']).notNullable()
      table.enum('day',['segunda','terca','quarta','quinta','sexta']).notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
