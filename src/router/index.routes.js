const express = require("express");
const router = express.Router();

const userRoutes = require("./user.routes");
const adminRoutes = require("./admin/index.routes");
const flightRoutes = require("./flight.routes");
const bookingRoutes = require("./booking.routes");

router
  .use("/user", userRoutes)
  .use("/admin", adminRoutes)
  .use("/flight", flightRoutes)
  .use("/booking", bookingRoutes);

module.exports = router;
