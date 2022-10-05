import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'student_exchanges'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('date_exchanges')
      table.string('date_lacks')
      table.integer('gang_id').notNullable().unsigned().references('id').inTable('gangs')
      table.integer('student_id').notNullable().unsigned().references('id').inTable('students')
      table.text('observation')
      table.boolean('canceled')
      table.string('status')

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
