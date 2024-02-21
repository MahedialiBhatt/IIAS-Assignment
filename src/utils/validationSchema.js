const Joi = require("joi");

const checkInSchema = Joi.object({
  instructor_id: Joi.number().integer().min(1).required(),
  date: Joi.string().isoDate().required().messages({
    "string.base": "Invalid type, date must be a string",
    "string.isoDate":
      "Invalid date format, must be in ISO date format (YYYY-MM-DD)",
    "any.required": "Date is required",
  }),
  check_in_time: Joi.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid time format, must be in HH:mm format",
      "any.required": "Check-in time is required",
    }),
});

const checkOutSchema = Joi.object({
  instructor_id: Joi.number().integer().min(1).required(),
  date: Joi.string().isoDate().required().messages({
    "string.base": "Invalid type, date must be a string",
    "string.isoDate":
      "Invalid date format, must be in ISO date format (YYYY-MM-DD)",
    "any.required": "Date is required",
  }),
  check_out_time: Joi.string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .required()
    .messages({
      "string.pattern.base": "Invalid time format, must be in HH:mm format",
      "any.required": "Check-out time is required",
    }),
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
