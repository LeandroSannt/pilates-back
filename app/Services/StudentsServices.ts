import moment from "moment";

import Student from "../Models/Student";
import { countMonths } from "./../Helpers/countMonths";
import { BaseServices } from "./BaseServices";
import { paymentWithFees } from "App/Helpers/paymentWithFees";
moment.locale("pt-br");

interface StoreStudent {
  name: string;
  email?: string | null;
  telephone?: string | null;
  telephone_emergency?: string | null;
  birth_date?: string | null;
  objective?: string | null;
  plan_id: number;
  plan_expiration_day?: string | null;
  month_birth?: string | null;
  day_birth?: string | null;
}

export default class StudentsServices extends BaseServices {
  constructor() {
    super({ model: Student, name_model: "Alunos" });
  }

  async listStudentsPaginated(
    page: number,
    limit: number,
    status: string,
    planId: string,
    name: string
  ) {
    let students = await Student.query()
      .preload("plan")
      .where((query) => {
        if (status && status !== "todos") {
          query.where("status", status);
        }
      })
      .whereHas("plan", (planQuery) => {
        if (planId && planId !== "todos") {
          planQuery.where("id", planId);
        }
      })
      .where((query) => {
        if (name) {
          query.whereILike("name", `%${name}%`);
        }
      })
      .orderBy([
        {
          column: "id",
          order: "desc",
        },
      ])
      .paginate(page, limit);

    const studentExpiration = Promise.all(
      students.toJSON().data.map(async (student) => {
        const currentMonth = countMonths({
          end: student.plan_expiration_day,
          date_start_plan: student.date_start_plan,
          total: student.plan.amount_installments,
        });
        const studentExpiration = {
          expiration_date:
            currentMonth > student.plan.amount_installments
              ? student.plan.amount_installments
              : currentMonth,
          ...student.toJSON(),
        };

        const sevenDaysPrev = moment(student.plan_expiration_day)
          .subtract(7, "days")
          .format();

        const currentTime = moment();
        const expiredTime = moment(student.plan_expiration_day).add(1, "days");

        //primeiro maior que segundo
        const isExpires = currentTime.isAfter(expiredTime);

        //primeiro maior que segundo entre os 7 dias
        const isExpiredPerSevenDays = currentTime.isSameOrAfter(sevenDaysPrev);
        // const isExpired = currentTime.isSameOrBefore(expiredTime);

        if (isExpires) {
          await Student.query()
            .where({ id: student.id })
            .update({ status: "vencido" });
          studentExpiration.status = "vencido";
        } else if (isExpiredPerSevenDays) {
          await Student.query()
            .where({ id: student.id })
            .update({ status: "a vencer" });
          studentExpiration.status = "a vencer";
        } else {
          await Student.query()
            .where({ id: student.id })
            .update({ status: "ativo" });
          studentExpiration.status = "ativo";
        }
        return studentExpiration;
      })
    );

    const newStudent = {
      meta: students.getMeta(),
      data: await studentExpiration,
    };

    return {
      data: newStudent,
      status: 201,
    };
  }

  async storeStudent(
    data: StoreStudent
  ): Promise<{ data: any; status: number }> {
    const store = await this.Model.create({
      ...data,
      current_month_plan: 1,
      status: "ativo",
      date_start_plan: new Date(),
    });

    return {
      data: store,
      status: 200,
    };
  }

  async updateStudent(
    id: number,
    data: StoreStudent
  ): Promise<{ data: any; status: number }> {
    const student = await Student.find(id);

    if (student) {
      const sevenAfeterDays = moment(student.plan_expiration_day)
        .subtract(7, "days")
        .format("DD/MM/YYYY");
      const currentDate = moment().format("DD/MM/YYYY");
      await Student.query()
        .where({ id })
        .update({
          ...data,
          status: currentDate > sevenAfeterDays ? "a vencer" : "ativo",
        });
    }

    return {
      data: student,
      status: 204,
    };
  }

  async renovationPlan(id: number, typeTransaction: string) {
    const student = await Student.query().where({ id }).preload("plan").first();

    if (student) {
      // student.date_start_plan = moment().format();
      // student.status = "ativo";
      // student.plan_expiration_day = moment(student.plan_expiration_day)
      //   .add(student.plan.amount_installments, "months")
      //   .format("YYYY-MM-DD");

      // await student.save();

      const paymentReceived =
        student.plan.value * student.plan.amount_installments;
      const paymentReceivedInterest = paymentWithFees(
        typeTransaction,
        paymentReceived,
        student.plan.amount_installments
      );

      await student.related("payment").create({
        payment: student.plan.value * student.plan.amount_installments,
        payment_with_machine_interest: paymentReceivedInterest,
      });

      return {
        data: student,
        status: 201,
      };
    }
  }

  async studentsbirthDate(month: string) {
    const birthDate = await Student.query().where({ month_birth: month });

    return {
      data: birthDate,
      status: 200,
    };
  }
}
