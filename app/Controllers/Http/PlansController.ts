import CreatePlanValidator from "App/Validators/CreatePlanValidator";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import PlansServices from "../../Services/PlansServices";
import BaseController from "./BaseController";

export default class PlansController extends BaseController {
  constructor() {
    super({
      service: PlansServices,
      validator: { create: CreatePlanValidator, update: CreatePlanValidator },
    });
  }

  async getExpiryPeriod({ response, params }: HttpContextContract) {
    const plansService = new PlansServices();

    const { id } = params;

    const result = await plansService.getExpiryPeriod(id);

    return response.ok(result);
  }
}
