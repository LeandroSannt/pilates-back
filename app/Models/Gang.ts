import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm';
import Student from 'App/Models/Student';
import { DateTime } from 'luxon';

export default class Gang extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public time: string

  @column()
  public day: string

  @column()
  public classe_id: number

  @manyToMany(() => Student, {
    pivotTable: 'student_gangs',
    pivotColumns: ['student_id', 'gang_id'],
    onQuery(query) {
      query.select('id','name','status')
    }

  })
  public studentGang: ManyToMany<typeof Student>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
