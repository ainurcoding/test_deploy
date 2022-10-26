const express = require("express");
const router = express.Router();
const {
  getBooking,
  getMyBooking,
  getBookingDetail,
  createBooking,
  updateBooking,
  cancelBooking,
} = require("../controller/user/booking.controller");
const jwtAuth = require("../middleware/auth.middleware");

router
  .get("/", jwtAuth, getBooking)
  .get("/my", jwtAuth, getMyBooking)
  .get("/:id", jwtAuth, getBookingDetail)
  .post("/", createBooking)
  .put("/:id", updateBooking)
  .delete("/:id", cancelBooking);

module.exports = router;
