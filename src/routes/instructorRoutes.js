const express = require("express");
const router = express.Router();
const instructorController = require("../controllers/instructorController");

router.post("/checkin", async (req, res) => {
  return await instructorController.addCheckIn(req, res);
});

router.post("/checkout", async (req, res) => {
  return await instructorController.addCheckOut(req, res);
});

router.get("/monthly-report/:month", async (req, res) => {
  return await instructorController.getMonthlyReport(req, res);
});

module.exports = router;
