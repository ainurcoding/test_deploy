const createError = require("http-errors");
const { v4: uuid } = require("uuid");
const { hash, compare } = require("bcryptjs");

const adminModel = require("../../model/admin/admin.model");

const adminController = {
  register: async (req, res, next) => {
    try {
      const id = uuid();
      const { username, email, password } = req.body;
      const date = new Date();
      const hashedPassword = await hash(password, 10);

      await adminModel.register(id, username, email, hashedPassword, date);

      return res.json({
        msg: "admin account registered, please login to start managing flights",
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const data = await adminModel.emailCheck(email);
      const savedPassword = data.rows[0].password;
      console.log(password, savedPassword);

      const valid = await compare(password, savedPassword);
      console.log(valid);

      if (valid) {
        return res.json({
          msg: `welcome, ${data.rows[0].username}`,
        });
      }

      return res.json({
        msg: "invalid",
      });
    } catch (error) {
      console.log(error);
      next(new createError.InternalServerError());
    }
  },
};

module.exports = adminController;
