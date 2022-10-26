const express = require("express");

const {
  register,
  login,
  getUser,
  getUserDetail,
  updateUser,
  deleteUser,
} = require("../controller/user/user.controller");
const upload = require("../middleware/upload.user");
// const remove = require("../middleware/delete.user");

const router = express.Router();

router
  .post("/register", register)
  .post("/login", login)
  .get("/", getUser)
  .get("/:id", getUserDetail)
  .put("/:id", upload, updateUser)
  .delete("/:id", deleteUser);
module.exports = router;
