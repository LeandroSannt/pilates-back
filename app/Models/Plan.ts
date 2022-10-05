import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Stundent from './Student'

export default class Plan extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public value: number

  @column()
  public percent_rate: number

  @column()
  public name_plan: string

  @column()
  public amount_installments: number

  @hasMany(() => Stundent,{foreignKey:"plan_id"})
  public course: HasMany<typeof Stundent>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
