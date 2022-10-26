const express = require("express");
const { register, login } = require("../../controller/admin/admin.controller");
const router = express.Router();

router
.post("/register", register)
.post("/", login);

module.exports = router;