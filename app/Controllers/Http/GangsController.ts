import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import AddStudentGangValidator from "App/Validators/AddStudentGangValidator";
import CreateManyGangStudantValidator from "App/Validators/CreateManyGangStudantValidator";
import CreateOrUpdateGangValidator from "App/Validators/CreateOrUpdateGangValidator";
import GangsServices from "../../Services/GangsServices";
import BaseController from "./BaseController";

export default class GangsController extends BaseController {
  constructor() {
    super({
      service: GangsServices,
      validator: {
        create: CreateOrUpdateGangValidator,
        update: CreateOrUpdateGangValidator,
      },
    });
  }

  async storeMany({ request, response }: HttpContextContract) {
    const gangs = new GangsServices();
    const { day, student_id, time } = await request.validate(
      CreateManyGangStudantValidator
    );

    const result = await gangs.storeMany({ day, student_id, time });
    return response.status(result.status).json(result.data);
  }

  async getGangsStudent({ request, response }: HttpContextContract) {
    const gangs = new GangsServices();
    const { day, time } = request.only(["day", "time"]);
    const result = await gangs.getGangsStudent(day, time);

    return response.ok(result);
  }

  async addStudentGang({ request, response }: HttpContextContract) {
    const { gang_id, student_id } = await request.validate(
      AddStudentGangValidator
    );
    const gangs = new GangsServices();
    const result = await gangs.addStudentforGang(student_id, gang_id);

    return response.status(result.status).json(result.data);
  }

  async deleteStudentGang({ request, response }: HttpContextContract) {
    const { gang_id, student_id } = await request.validate(
      AddStudentGangValidator
    );
    const gangs = new GangsServices();
    const result = await gangs.deleteStudentForGang(student_id, gang_id);

    return response.status(result.status).json(result.data);
  }

  async teste({ request, response }: HttpContextContract) {
    return response.json({ ok: true });
  }
}
