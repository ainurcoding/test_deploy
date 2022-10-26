const express = require("express");
const router = express.Router();

const {
  getFlight,
  getFlightDetail,
  insertFlight,
  updateFlight,
  deleteFlight,
} = require("../controller/user/flight.controller");

router
  .get("/", getFlight)
  .get("/:id", getFlightDetail)
  .post("/", insertFlight)
  .put("/:id", updateFlight)
  .delete("/:id", deleteFlight);
module.exports = router;
