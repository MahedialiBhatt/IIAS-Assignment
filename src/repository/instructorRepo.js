const { mySqlConnectionPool } = require("../configs/db.config");

async function addCheckIn(instructor_id, date, check_in_time) {
  const result = await mySqlConnectionPool.query(
    "INSERT INTO attendance (instructor_id, date, check_in_time) VALUES (?, ?, ?)",
    [instructor_id, date, check_in_time]
  );
  return result[0].insertId;
}

async function addCheckOut(instructor_id, date, check_out_time) {
  const result = await mySqlConnectionPool.query(
    "UPDATE attendance SET check_out_time = ? WHERE instructor_id = ? AND date = ? AND check_out_time IS NULL",
    [check_out_time, instructor_id, date]
  );
  return result[0].affectedRows > 0;
}

async function isCheckOutPendingForDate(instructor_id, date) {
  const [result] = await mySqlConnectionPool.query(
    "SELECT check_in_time, check_out_time FROM attendance WHERE instructor_id = ? AND date = ? AND check_out_time IS NULL",
    [instructor_id, date]
  );
  return result.length > 0;
}

async function getMonthlyReport(month) {
  const [result] = await mySqlConnectionPool.query(
    `SELECT
    instructor_id,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'check_in_time', check_in_time,
        'check_out_time', check_out_time
      )
    ) AS attendance_details
  FROM
    attendance
  WHERE
    MONTH(date) = ? AND check_out_time IS NOT NULL
  GROUP BY
    instructor_id;`,
    [month]
  );
  return result;
}

async function getCheckInsForDate(instructor_id, date) {
  const [result] = await mySqlConnectionPool.query(
    "SELECT check_in_time, check_out_time FROM attendance WHERE instructor_id = ? AND date = ?",
    [instructor_id, date.toString()]
  );
  return result;
}

module.exports = {
  addCheckIn,
  addCheckOut,
  isCheckOutPendingForDate,
  getMonthlyReport,
  getCheckInsForDate,
};
