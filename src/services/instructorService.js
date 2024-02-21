const instructorRepository = require("../repository/instructorRepo");
const { convertTimeToMinutes } = require("../utils/utility");

async function addCheckIn(instructor_id, date, check_in_time) {
  return await instructorRepository.addCheckIn(
    instructor_id,
    date,
    check_in_time
  );
}

async function addCheckOut(instructor_id, date, check_out_time) {
  return await instructorRepository.addCheckOut(
    instructor_id,
    date,
    check_out_time
  );
}

async function isCheckOutPendingForDate(instructor_id, date) {
  return await instructorRepository.isCheckOutPendingForDate(
    instructor_id,
    date
  );
}

async function getMonthlyReport(month) {
  const monthlyReportData = await instructorRepository.getMonthlyReport(month);
  return calculateTotalHoursForInstructors(monthlyReportData, month);
}

async function getCheckInsForDate(instructor_id, date) {
  return await instructorRepository.getCheckInsForDate(instructor_id, date);
}

function calculateTotalHoursForInstructors(instructors, month) {
  return instructors.map((instructor) => ({
    instructor_id: instructor.instructor_id,
    total_hours: instructor.attendance_details
      .reduce((total, entry) => {
        const checkInTime = convertTimeToMinutes(entry.check_in_time);
        const checkOutTime = convertTimeToMinutes(entry.check_out_time);
        return total + (checkOutTime - checkInTime) / 60;
      }, 0)
      .toFixed(2),
    month: month,
  }));
}

module.exports = {
  addCheckIn,
  addCheckOut,
  isCheckOutPendingForDate,
  getMonthlyReport,
  getCheckInsForDate,
};
