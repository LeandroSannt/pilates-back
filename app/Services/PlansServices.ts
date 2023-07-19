import Plan from "../Models/Plan";
import { BaseServices } from "./BaseServices";
import moment from "moment";

moment.locale("pt-br");

export default class PlansServices extends BaseServices {
  constructor() {
    super({ model: Plan, name_model: "Planos" });
  }

  async getExpiryPeriod(id: string) {
    const plan = await Plan.findOrFail(id);

    const currentDay = moment().format("DD");

    const monthExpiryPeriod = moment().add(plan.amount_installments, "months");
    // Obter o primeiro dia do mês
    const startPeriod = monthExpiryPeriod
      .startOf("month")
      .add(currentDay, "day")
      .format("YYYY-MM-DD");

    // Obter o último dia do mês
    const endPeriod = monthExpiryPeriod
      .startOf("month")
      .endOf("month")
      .format("YYYY-MM-DD");

    return { startPeriod, endPeriod };
  }
}
