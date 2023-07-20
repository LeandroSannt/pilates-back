import moment from "moment";

import { BaseServices } from "./BaseServices";
import Payment from "App/Models/Payment";
moment.locale("pt-br");

export default class PaymentServices extends BaseServices {
  constructor() {
    super({ model: Payment, name_model: "pagamento" });
  }

  async getPaymentsByStudent(student_id: string) {
    const payments = await Payment.query().where("student_id", student_id);

    return payments;
  }
}
