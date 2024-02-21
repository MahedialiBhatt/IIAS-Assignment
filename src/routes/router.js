const express = require("express");
const router = express.Router();
const instructorRoutes = require("./instructorRoutes");

router.use("/", instructorRoutes);

module.exports = router;
