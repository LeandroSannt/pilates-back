import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'gangs'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('classe_id').unsigned().references('id').inTable('classes')

    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('classe_id')
    })
  }
}
