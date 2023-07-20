import moment from "moment";

import { BaseServices } from "./BaseServices";
import Payment from "App/Models/Payment";
moment.locale("pt-br");

export default class PaymentServices extends BaseServices {
  constructor() {
    super({ model: Payment, name_model: "pagamento" });
  }

  async getPaymentsByStudent(
    student_id: string,
    initialDate: string,
    finalDate: string
  ) {
    const payments = await Payment.query()
      .where("student_id", student_id)
      .andWhere((query) => {
        if (initialDate && finalDate) {
          query.whereBetween("created_at", [
            `${initialDate}T00:00:00.000-03:00`,
            `${finalDate}T23:59:59.000-03:00`,
          ]);
        }
      })
      .preload("student", (query) => {
        query.preload("plan");
      });

    const paymentsNew = payments.map((payment) => {
      const parcelValue =
        payment.payment_with_machine_interest /
        payment.student.plan.amount_installments;

      return {
        ...payment.serialize(),
        parcel: parcelValue,
      };
    });

    const sumParcels = paymentsNew.reduce(
      (acumulador, valorAtual) => acumulador + valorAtual.parcel,
      0
    );

    const sumPayments = await Payment.query()
      .where("student_id", student_id)
      .andWhere((query) => {
        if (initialDate && finalDate) {
          query.whereBetween("created_at", [
            `${initialDate}T00:00:00.000-03:00`,
            `${finalDate}T23:59:59.000-03:00`,
          ]);
        }
      })
      .sum("payment_with_machine_interest as sum_payments_machine")
      .sum("payment as payment_total")
      .first();

    if (sumPayments) {
      sumPayments.$extras.sumParcels = sumParcels;

      return { paymentsNew, sumPayments: sumPayments?.$extras };
    }
  }
}
