import Plan from '../Models/Plan'
import { BaseServices } from './BaseServices'

export default class PlansServices extends BaseServices {
  constructor() {
    super({model: Plan,name_model:'Planos'})
  }

  async teste(){

  }
}
