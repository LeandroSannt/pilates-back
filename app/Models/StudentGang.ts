import { BaseModel, beforeCreate, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

export default class StudentGang extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public status: string

  @beforeCreate()
  public static activeStatus(gang: StudentGang) {
    gang.status = 'ativo'
  }

  @column()
  public gang_id: number

  @column()
  public student_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
