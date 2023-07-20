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

  async getPaymentsByStudent({ response, params }: HttpContextContract) {
    const paymentService = new PaymentServices();

    const { student_id } = params;

    const result = await paymentService.getPaymentsByStudent(student_id);

    return response.ok(result);
  }
}
