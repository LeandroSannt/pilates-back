import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm';
import Gang from 'App/Models/Gang';
import Student from 'App/Models/Student';
import { DateTime } from 'luxon';

export default class GangLack extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public student_id: number

  @belongsTo(() => Student,{foreignKey:"student_id"})
  public student: BelongsTo<typeof Student>

  @column()
  public gang_id: number

  @belongsTo(() => Gang,{foreignKey:"gang_id"})
  public gang: BelongsTo<typeof Gang>

  @column()
  public date_lacks: string

  @column()
  public observation: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
