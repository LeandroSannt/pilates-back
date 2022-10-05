import CreatePlanValidator from 'App/Validators/CreatePlanValidator';

import PlansServices from '../../Services/PlansServices';
import BaseController from "./BaseController";

export default class PlansController extends BaseController {
  constructor(){
    super({
      service:PlansServices,
      validator:{create:CreatePlanValidator,update:CreatePlanValidator}})
    }
}


