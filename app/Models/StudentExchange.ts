import { BaseModel, beforeCreate, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'
import Gang from './Gang'

export default class StudentExchange extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date_exchanges: string

  @column()
  public date_lacks: string

  @column()
  public gang_id: number

  @belongsTo(() => Gang,{foreignKey:"gang_id"})
  public gang: BelongsTo<typeof Gang>


  @column()
  public student_id: number

  @column()
  public observation: string

  @column()
  public status: string

  @column()
  public canceled: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime


  @beforeCreate()
  public static activeStatus(exchange: StudentExchange) {
    exchange.status = 'ativo'
  }

}
