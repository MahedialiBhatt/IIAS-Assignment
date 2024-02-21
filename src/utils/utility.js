require("dotenv").config();

function writeResponse(err, data, res) {
  if (err) {
    res.status(err.code && Number.isInteger(err.code) ? err.code : 500);
    return res.json({
      status: "error",
      message: err.message,
    });
  }
  res.status(200);
  const response = {
    status: "Success",
    data: data,
  };
  return res.json(response);
}

function convertTimeToMinutes(timeString) {
  if (!timeString) return null;
  const [hours, minutes, seconds] = timeString.split(":").map(Number);
  return hours * 60 + minutes;
}

function isOverlapping(checkInOrOut, existingCheckIns) {
  const newCheckInTime = convertTimeToMinutes(checkInOrOut + ":00");

  for (let i = 0; i < existingCheckIns.length; i++) {
    const oldCheckInTime = convertTimeToMinutes(
      existingCheckIns[i].check_in_time
    );
    const oldCheckoutTime = convertTimeToMinutes(
      existingCheckIns[i].check_out_time
    );

    if (
      oldCheckInTime &&
      oldCheckoutTime &&
      oldCheckInTime <= newCheckInTime &&
      newCheckInTime <= oldCheckoutTime
    ) {
      return true;
    } else if (!oldCheckoutTime && oldCheckInTime == newCheckInTime) {
      return true;
    }
  }
  return false;
}

module.exports = {
  writeResponse,
  isOverlapping,
};
