import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "payments";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");
      table.integer("payment").notNullable();
      table.float("payment_with_machine_interest").notNullable();
      table.string("type_payment").notNullable();

      table
        .integer("student_id")
        .notNullable()
        .unsigned()
        .references("id")
        .inTable("students");

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("created_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
