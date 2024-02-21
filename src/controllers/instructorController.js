const instructorService = require("../services/instructorService");
const { isOverlapping, writeResponse } = require("../utils/utility");
const {
  validateCheckIn,
  validateCheckOut,
  validateMonthlyReport,
} = require("../utils/validationSchema");

async function addCheckIn(req, res) {
  try {
    const { instructor_id, date, check_in_time } = req.body;

    const { error, value } = validateCheckIn(req.body);

    if (error) {
      return writeResponse(
        {
          code: 400,
          message: `Bad Request: ${error.details[0].message}`,
        },
        null,
        res
      );
    }

    const isCheckOutPendingForDate =
      await instructorService.isCheckOutPendingForDate(instructor_id, date);

    if (isCheckOutPendingForDate) {
      return writeResponse(
        {
          code: 400,
          message:
            "Previous check-out is pending for the same date. Cannot check-in again.",
        },
        null,
        res
      );
    }

    const existingCheckIns = await instructorService.getCheckInsForDate(
      instructor_id,
      date
    );

    if (isOverlapping(check_in_time, existingCheckIns)) {
      return writeResponse(
        {
          code: 400,
          message: "Check-in time overlaps with existing entries",
        },
        null,
        res
      );
    }

    const result = await instructorService.addCheckIn(
      instructor_id,
      date,
      check_in_time
    );

    return writeResponse(null, result, res);
  } catch (error) {
    console.error("Error adding check-in:", error);
    return writeResponse(
      {
        code: 500,
        message: "Internal Server Error",
      },
      null,
      res
    );
  }
}

async function addCheckOut(req, res) {
  try {
    const { instructor_id, date, check_out_time } = req.body;

    const { error, value } = validateCheckOut(req.body);

    if (error) {
      return writeResponse(
        {
          code: 400,
          message: `Bad Request: ${error.details[0].message}`,
        },
        null,
        res
      );
    }

    const isCheckOutPendingForDate =
      await instructorService.isCheckOutPendingForDate(instructor_id, date);

    if (!isCheckOutPendingForDate) {
      return writeResponse(
        {
          code: 400,
          message:
            "Previous check-out has already been completed for the same date. Cannot check out again.",
        },
        null,
        res
      );
    }

    const existingCheckIns = await instructorService.getCheckInsForDate(
      instructor_id,
      date
    );

    if (isOverlapping(check_out_time, existingCheckIns)) {
      return writeResponse(
        {
          code: 400,
          message: "Check-out time overlaps with existing entries",
        },
        null,
        res
      );
    }

    const result = await instructorService.addCheckOut(
      instructor_id,
      date,
      check_out_time
    );

    return writeResponse(null, result, res);
  } catch (error) {
    console.error("Error adding check-out:", error);
    return writeResponse(
      {
        code: 500,
        message: "Internal Server Error",
      },
      null,
      res
    );
  }
}

async function getMonthlyReport(req, res) {
  try {
    const month = req.params.month;

    const { error, value } = validateMonthlyReport(req.params);

    if (error) {
      return writeResponse(
        {
          code: 400,
          message: `Bad Request: ${error.details[0].message}`,
        },
        null,
        res
      );
    }

    const result = await instructorService.getMonthlyReport(month);
    return writeResponse(null, result, res);
  } catch (error) {
    console.error("Error getting monthly report:", error);
    return writeResponse(
      {
        code: 500,
        message: "Internal Server Error",
      },
      null,
      res
    );
  }
}

module.exports = {
  addCheckIn,
  addCheckOut,
  getMonthlyReport,
};
