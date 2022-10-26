const express = require("express");
const {
  insertAirline,
  getAirline,
  getAirlineDetail,
  updateAirline,
  removeAirline,
} = require("../../controller/admin/airline.controller");
const router = express.Router();

// middleware
const uploadLogo = require("../../middleware/upload.airline");
const deleteAirline = require("../../middleware/delete.airline");

router
  .get("/", getAirline)
  .get("/:id", getAirlineDetail)
  .post("/", uploadLogo, insertAirline)
  .put("/:id", uploadLogo, updateAirline)
  .delete("/:id", deleteAirline, removeAirline);

module.exports = router;
