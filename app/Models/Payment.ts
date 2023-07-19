import { BaseModel, column, hasMany, HasMany } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Student from "./Student";

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public payment: number;

  @column()
  public student_id: number;

  @column()
  public payment_with_machine_interest: number;

  @hasMany(() => Student, { foreignKey: "student_id" })
  public student: HasMany<typeof Student>;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;
}
