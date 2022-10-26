const express = require("express");
const router = express.Router();

const adminRoutes = require("./admin.routes");
const airlineRoutes = require("./airline.routes");
const flightRoutes = require("./flight.routes");
const bookingRoutes = require("./booking.routes");

router
  .use("/auth", adminRoutes)
  .use("/airline", airlineRoutes)
  .use("/flight", flightRoutes)
  .use("/booking", bookingRoutes);

module.exports = router;
