import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'students'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('registration').unique().unsigned().notNullable()
      table.string('name').notNullable()
      table.string('email').unique()
      table.string('telephone')
      table.string('telephone_emergency')
      table.string('birth_date')
      table.integer('plan_id').notNullable().unsigned().references('id').inTable('plans')
      table.string('plan_expiration_day')
      table.integer('current_month_plan')
      table.text('objective')
      table.enum('status',['ativo','inativo','a vencer','vencido'])

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
