import PaymentServices from "App/Services/PaymentServices";
import CreatePaymentValidator from "App/Validators/CreatePaymentValidator";
import BaseController from "./BaseController";
import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

export default class StudentsController extends BaseController {
  constructor() {
    super({
      service: PaymentServices,
      validator: {
        create: CreatePaymentValidator,
        update: CreatePaymentValidator,
      },
    });
  }

  async getPaymentsByStudent({
    response,
    request,
    params,
  }: HttpContextContract) {
    const paymentService = new PaymentServices();

    const { student_id } = params;

    const { finalDate, initialDate } = request.only([
      "initialDate",
      "finalDate",
    ]);

    const result = await paymentService.getPaymentsByStudent(
      student_id,
      initialDate,
      finalDate
    );

    return response.ok(result);
  }
}
