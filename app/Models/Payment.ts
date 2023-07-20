import { BaseModel, BelongsTo, belongsTo, column } from "@ioc:Adonis/Lucid/Orm";
import { DateTime } from "luxon";
import Student from "./Student";

export default class Payment extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public payment: number;

  @column()
  public student_id: number;

  @belongsTo(() => Student, { foreignKey: "student_id" })
  public student: BelongsTo<typeof Student>;

  @column()
  public type_payment: string;

  @column()
  public payment_with_machine_interest: number;

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime;
}
