import { BaseModel, belongsTo, BelongsTo, column, hasMany, HasMany, scope } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import File from './File'
import Plan from './Plan'
import StudentExchange from './StudentExchange'

export default class Student extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public registration: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public telephone: string

  @column()
  public date_start_plan: string

  @column()
  public telephone_emergency: string

  @column()
  public birth_date: string

  @column()
  public plan_id: number

  @belongsTo(() => Plan,{foreignKey:"plan_id"})
  public plan: BelongsTo<typeof Plan>

  @hasMany(() => File,{foreignKey:"student_id"})
  public file: HasMany<typeof File>

  @hasMany(() => StudentExchange,{foreignKey:"student_id"})
  public exchange: HasMany<typeof StudentExchange>

  @column()
  public plan_expiration_day: string

  @column()
  public month_birth: string

  @column()
  public day_birth: string

  @column()
  public current_month_plan: number

  @column()
  public objective: string

  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime

  @column()
  public total_exchanges: string

  @column()
  public total_percent_rate: number

  @column()
  public calc_amount_receivable: number

  public static existsExganges = scope((query) => {
    query
    .from('student_exchanges')
    .whereColumn('students.id', 'student_exchanges.student_id')
    .andWhere('status','ativo')
    .limit(1)
 })
}
