import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.text('month_birth')
      table.text('day_birth')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('month_birth')
      table.dropColumn('day_birth')
    })
  }
}
