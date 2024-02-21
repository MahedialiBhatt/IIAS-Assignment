const Joi = require("joi");

const checkInSchema = Joi.object({
  instructor_id: Joi.number().integer().required(),
  date: Joi.string().isoDate().required(),
  check_in_time: Joi.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),
});

const checkOutSchema = Joi.object({
  instructor_id: Joi.number().integer().required(),
  date: Joi.string().isoDate().required(),
  check_out_time: Joi.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required(),
});

const monthlyReportSchema = Joi.object({
  month: Joi.number().integer().min(1).max(12).required(),
});

function validateCheckIn(data) {
  return checkInSchema.validate(data);
}

function validateCheckOut(data) {
  return checkOutSchema.validate(data);
}

function validateMonthlyReport(data) {
  return monthlyReportSchema.validate(data);
}

module.exports = {
  validateCheckIn,
  validateCheckOut,
  validateMonthlyReport,
};
