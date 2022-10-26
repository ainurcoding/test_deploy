const {
  failed,
  success,
  succesWithToken,
} = require("../../helper/response.helper");
const userModel = require("../../model/user/user.model");
const { v4: uuid } = require("uuid");
const bcrypt = require("bcryptjs");
const jwtToken = require("../../helper/auth.helper");

const userController = {
  register: (req, res) => {
    try {
      const { username, email, phone, password } = req.body;
      const id = uuid();

      bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "fail hash password");
        }
        console.log("ini di controller");

        const data = {
          id,
          username,
          email,
          phone,
          password: hash,
        };

        userModel
          .register(data)
          .then(() => {
            delete data.password;
            success(res, data, "success", "register success");
          })
          .catch((err) => {
            failed(res, err.message, "failed", "register fail");
          });
      });
    } catch (err) {
      failed(res, err.message, "failed", "internal server error");
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    userModel
      .checkEmail(email)
      .then((result) => {
        const user = result.rows[0];
        if (result.rowCount > 0) {
          bcrypt
            .compare(password, result.rows[0].password)
            .then(async (result) => {
              if (result) {

                const token = await jwtToken({
                  id: user.user_id,
                  email: user.email,
                });
                
                delete user.password;
                
                succesWithToken(
                  res,
                  { token, data: user },
                  "success",
                  "login success"
                );
              } else {
                // ketika password salah
                failed(res, null, "failed", "email or password is wrong");
              }
            });
        } else {
          //ketika username salah
          failed(res, null, "failed", "username wrong");
        }
      })
      .catch((err) => {
        failed(res, err, "failed", "internal server error");
      });
  },

  getUser: (req, res) => {
    userModel
      .getUser()
      .then((result) => {
        success(res, result.rows, "success", "get all user succes");
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message, "failed", "get all user failed");
      });
  },

  getUserDetail: (req, res) => {
    const id = req.params.id;

    userModel
      .getUserDetail(id)
      .then((result) => {
        success(res, result.rows[0], "success", "request by id user success");
      })
      .catch((err) => {
        // res.json(err)
        failed(res, err.message, "failed", "request by id user failed");
      });
  },

  updateUser: (req, res) => {
    const id = req.params.id;
    const date = new Date();
    let avatar;

    if (req.file) {
      avatar = req.file.filename;
    }

    const data = {
      id,
      date,
      username: req.body.username,
      email: req.body.email,
      phone: req.body.phone,
      city: req.body.city,
      address: req.body.address,
      postcode: req.body.postcode,
    };
    userModel
      .updateUser(data, avatar)
      .then(async () => {
        const result = await userModel.getUserDetail(id);
        success(res, result.rows[0], "success", "data has been update");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },

  deleteUser: async (req, res) => {
    const id = req.params.id;
    const data = await userModel.getUserDetail(id);
    userModel
      .deleteUser(id)
      .then(() => {
        success(res, data.rows[0], "data has been deleted");
      })
      .catch((err) => {
        failed(res, err.message, "failed", "internal server error");
      });
  },
};

module.exports = userController;
